import { useEffect, useState } from "react";
import { SlidersHorizontal, Check, Bell, Tag, Truck } from "lucide-react";

interface PrefOption {
  id: string;
  label: string;
  description: string;
}

const INTEREST_OPTIONS: PrefOption[] = [
  { id: "Audio", label: "Audio", description: "Kufje, altoparlantë dhe pajisje zëri" },
  { id: "Wearables", label: "Wearables", description: "Orë inteligjente dhe gjurmues aktiviteti" },
  { id: "Foto & Video", label: "Foto & Video", description: "Kamera dhe aksesorë xhirimi" },
  { id: "Aksesorë", label: "Aksesorë", description: "Çanta, syze dhe gjëra të përditshme" },
];

const NOTIFY_OPTIONS: PrefOption[] = [
  { id: "offers", label: "Oferta dhe zbritje", description: "Merrni njoftime për kuponë dhe promocione" },
  { id: "newProducts", label: "Produkte të reja", description: "Të jeni të parët që shihni koleksionet e reja" },
  { id: "orderUpdates", label: "Gjendja e porosisë", description: "Përditësime për dërgesën dhe pagesën" },
];

const CONTACT_METHODS: PrefOption[] = [
  { id: "email", label: "Email", description: "" },
  { id: "whatsapp", label: "WhatsApp", description: "" },
  { id: "phone", label: "Telefon", description: "" },
];

interface Preferences {
  interests: string[];
  notifications: string[];
  contactMethod: string;
}

const STORAGE_KEY = "user-preferences";

const DEFAULT_PREFS: Preferences = {
  interests: [],
  notifications: ["orderUpdates"],
  contactMethod: "email",
};

function loadPrefs(): Preferences {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<Preferences> | null;
    return {
      interests: Array.isArray(parsed?.interests) ? parsed!.interests! : DEFAULT_PREFS.interests,
      notifications: Array.isArray(parsed?.notifications) ? parsed!.notifications! : DEFAULT_PREFS.notifications,
      contactMethod: parsed?.contactMethod ?? DEFAULT_PREFS.contactMethod,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function cardClass(isOn: boolean): string {
  return (
    "w-full min-h-[48px] text-left p-4 rounded-xl border transition flex items-start gap-3 " +
    (isOn
      ? "border-teal-300 bg-teal-50 text-teal-700"
      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50")
  );
}

function CheckMark({ isOn }: { isOn: boolean }) {
  return (
    <span
      className={
        "mt-0.5 w-5 h-5 shrink-0 rounded-md border flex items-center justify-center " +
        (isOn ? "bg-teal-600 border-teal-600 text-white" : "border-slate-200 bg-white text-transparent")
      }
    >
      <Check className="w-3.5 h-3.5" />
    </span>
  );
}

export default function PreferencesSection() {
  const [prefs, setPrefs] = useState<Preferences>(loadPrefs);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [saved]);

  const toggleIn = (key: "interests" | "notifications", id: string) => {
    setPrefs((prev) => {
      const list = prev?.[key] ?? [];
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      return { ...prev, [key]: next };
    });
    setSaved(false);
  };

  const handleSave = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
    setSaved(true);
  };

  const handleReset = () => {
    setPrefs(DEFAULT_PREFS);
    setSaved(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="preferencat" className="bg-white border-t border-slate-200 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Preferencat
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Personalizoni përvojën tuaj</h2>
          <p className="mt-2 text-sm text-slate-500">
            Zgjidhni çfarë ju intereson dhe si dëshironi të njoftoheni nga UnikFlow.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
              <Tag className="w-4 h-4 text-teal-600" /> Kategoritë që më interesojnë
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(INTEREST_OPTIONS ?? []).map((interestOpt) => {
                const interestOn = (prefs?.interests ?? []).includes(interestOpt?.id);
                return (
                  <button
                    key={interestOpt?.id}
                    type="button"
                    role="checkbox"
                    aria-checked={interestOn}
                    onClick={() => toggleIn("interests", interestOpt?.id)}
                    className={cardClass(interestOn)}
                  >
                    <CheckMark isOn={interestOn} />
                    <span>
                      <span className="block text-sm font-bold">{interestOpt?.label ?? ""}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{interestOpt?.description ?? ""}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
              <Bell className="w-4 h-4 text-teal-600" /> Njoftimet
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {(NOTIFY_OPTIONS ?? []).map((notifyOpt) => {
                const notifyOn = (prefs?.notifications ?? []).includes(notifyOpt?.id);
                return (
                  <button
                    key={notifyOpt?.id}
                    type="button"
                    role="checkbox"
                    aria-checked={notifyOn}
                    onClick={() => toggleIn("notifications", notifyOpt?.id)}
                    className={cardClass(notifyOn)}
                  >
                    <CheckMark isOn={notifyOn} />
                    <span>
                      <span className="block text-sm font-bold">{notifyOpt?.label ?? ""}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{notifyOpt?.description ?? ""}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
              <Truck className="w-4 h-4 text-teal-600" /> Mënyra e preferuar e kontaktit
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {(CONTACT_METHODS ?? []).map((methodOpt) => {
                const methodOn = prefs?.contactMethod === methodOpt?.id;
                return (
                  <button
                    key={methodOpt?.id}
                    type="button"
                    role="radio"
                    aria-checked={methodOn}
                    onClick={() => {
                      setPrefs((prev) => ({ ...prev, contactMethod: methodOpt?.id }));
                      setSaved(false);
                    }}
                    className={
                      "min-h-[48px] px-3 py-3 rounded-xl border text-sm font-bold text-center transition " +
                      (methodOn
                        ? "border-teal-600 bg-teal-50 text-teal-700"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50")
                    }
                  >
                    {methodOpt?.label ?? ""}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition"
          >
            Ruaj Preferencat
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm transition"
          >
            Rivendos
          </button>
        </div>

        {saved && (
          <div
            role="status"
            className="mt-5 flex items-center justify-center gap-2 text-sm font-bold text-teal-600"
          >
            <Check className="w-4 h-4" /> Preferencat u ruajtën me sukses!
          </div>
        )}
      </div>
    </section>
  );
}
