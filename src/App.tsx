import { useState, useMemo, useEffect, useRef } from "react";
import {
  ChevronLeft, ChevronRight,
  Sun, Moon,
  ShoppingBag, Search, Star, Trash2, Plus, Minus, ArrowRight,
  ShieldCheck, Truck, RefreshCw, X, Check, Heart, MessageCircle, ExternalLink, ChevronDown, HelpCircle, Send, Mail, Briefcase
} from "lucide-react";

import ContactSection from "./ContactSection";
import PreferencesSection from "./PreferencesSection";

const DARK_CSS = `
.theme-dark { background:#0f172a; color:#e2e8f0; color-scheme:dark; }
.theme-dark .bg-white, .theme-dark [class~="bg-white/95"] { background-color:#1e293b; }
.theme-dark .bg-slate-50 { background-color:#0f172a; }
.theme-dark .bg-slate-100 { background-color:#334155; }
.theme-dark .from-white { background-image:none; background-color:#0f172a; }
.theme-dark button.bg-slate-900:not(:hover) { background-color:#334155; }
.theme-dark footer.bg-slate-900 { background-color:#020617; }
.theme-dark .hover\\:bg-slate-50:hover, .theme-dark .hover\\:bg-slate-100:hover, .theme-dark .hover\\:bg-slate-200:hover { background-color:#475569; }
.theme-dark .focus\\:bg-white:focus { background-color:#1e293b; }
.theme-dark .text-slate-900 { color:#f1f5f9; }
.theme-dark .text-slate-800 { color:#e2e8f0; }
.theme-dark .text-slate-700 { color:#cbd5e1; }
.theme-dark .text-slate-600 { color:#a9b6c9; }
.theme-dark .text-slate-500 { color:#94a3b8; }
.theme-dark .border-slate-200 { border-color:#334155; }
.theme-dark .border-slate-100 { border-color:#1e293b; }
.theme-dark .bg-teal-50, .theme-dark [class~="bg-teal-50/40"] { background-color:rgba(99,102,241,.15); }
.theme-dark .text-teal-700 { color:#a5b4fc; }
.theme-dark .text-teal-600 { color:#818cf8; }
.theme-dark .border-teal-200, .theme-dark .border-teal-300 { border-color:#4338ca; }
.theme-dark .bg-teal-50, .theme-dark .bg-teal-100 { background-color:rgba(34,197,94,.15); }
.theme-dark .text-teal-700, .theme-dark .text-teal-600 { color:#6ee7b7; }
.theme-dark .border-teal-200 { border-color:#065f46; }
.theme-dark .border-teal-600 { border-color:#10b981; }
.theme-dark .text-rose-600 { color:#fda4af; }
.theme-dark input, .theme-dark textarea, .theme-dark select { color:#e2e8f0; }
.theme-dark input::placeholder, .theme-dark textarea::placeholder { color:#64748b; }
.theme-dark select option { background:#1e293b; color:#e2e8f0; }
`;

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  { id: "f1", question: "Sa kohë zgjat dërgesa e porosisë?", answer: "Porositë dërgohen brenda 24 orëve pune. Në Shqipëri mmbërrijnë zakonisht brenda 1–2 ditëve, ndërsa në Kosovë dhe Maqedoninë e Veriut brenda 2–4 ditëve." },
  { id: "f2", question: "A është transporti falas?", answer: "Po, transporti është falas për të gjitha porositë në Shqipëri, Kosovë dhe Maqedoninë e Veriut, pa kërkuar vlerë minimale blerjeje." },
  { id: "f3", question: "Cilat mënyra pagese pranohen?", answer: "Mund të paguani me kesh në dorëzim, me kartë krediti ose duke e përfunduar porosinë nëpërmjet WhatsApp me ekipin tonë." },
  { id: "f4", question: "A janë produktet origjinale?", answer: "Të gjitha produktet janë 100% origjinale, të verifikuara dhe të certifikuara nga prodhuesi ose distributori zyrtar." },
  { id: "f5", question: "Sa zgjat garancia?", answer: "Çdo produkt vjen me garanci 2-vjeçare që mbulon defektet e prodhimit. Ruani faturën si dëshmi blerjeje." },
  { id: "f6", question: "Si mund ta kthej një produkt?", answer: "Keni 14 ditë kohë për ta kthyer produktin në gjendjen origjinale. Na kontaktoni dhe do t'ju rimbursojmë shumën e plotë pa pyetje shtesë." },
  { id: "f7", question: "Si e përdor kodin e kuponit?", answer: "Hapni shportën, shkruani kodin (p?.sh. UNIK10 ose SUPREME20) në fushën e kuponit dhe shtypni “Apliko”. Zbritja shfaqet menjëherë në total." },
  { id: "f8", question: "Si mund të kontaktoj mbështetjen e klientit?", answer: "Na shkruani në WhatsApp ose na telefononi çdo ditë nga ora 09:00 deri në 20:00. Ekipi ynë do t'ju përgjigjet sa më shpejt të jetë e mundur." },
];

function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("f1");

  return (
    <section id="pyetje" className="bg-white border-t border-slate-200 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Ndihmë
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Pyetje të shpeshta</h2>
          <p className="mt-2 text-sm text-slate-500">Gjeni përgjigjet më të shpejta për blerjet tuaja në UnikFlow.</p>
        </div>

        <div className="space-y-3">
          {(FAQS ?? []).map((faq) => {
            const isOpen = openId === faq?.id;
            return (
              <div
                key={faq?.id}
                className={`rounded-2xl border transition-colors ${
                  isOpen ? "border-teal-300 bg-teal-50/40" : "border-slate-200 bg-white"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : faq?.id ?? null)}
                  className="w-full min-h-[48px] px-5 py-4 flex items-center justify-between gap-4 text-left"
                >
                  <span className="text-sm font-bold text-slate-900">{faq?.question ?? ""}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-teal-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 -mt-1 text-sm text-slate-600 leading-relaxed">
                    {faq?.answer ?? ""}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CareersSection() {
  return (
    <section id="karriera" className="bg-slate-50 border-t border-slate-200 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 mb-3">
          <Briefcase className="w-3.5 h-3.5" /> Punësim
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Karriera</h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Bashkohuni me ekipin e UnikFlow Commerce dhe ndihmoni në ndërtimin e përvojës më të mirë të blerjes online.
          Ne kërkojmë njerëz të motivuar, kureshtarë dhe të apasionuar pas teknologjisë, që duan të rriten bashkë me ne.
        </p>
      </div>
    </section>
  );
}

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isNew?: boolean;
  inStock: boolean;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Kufje Wireless Pro Studio",
    brand: "SonicMaster",
    category: "Audio",
    price: 189,
    oldPrice: 249,
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    isNew: true,
    inStock: true,
    description: "Izolim aktiv i zhurmës, bateri 40 orë dhe akustikë e kalibruar për studio."
  },
  {
    id: "p2",
    name: "Orë Inteligjente Apex Ultra 49mm",
    brand: "ChronoTech",
    category: "Wearables",
    price: 329,
    oldPrice: 399,
    rating: 4.8,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    description: "Kornizë titani, sensorë të avancuar shëndeti dhe rezistencë ndaj ujit 100m."
  },
  {
    id: "p3",
    name: "Kamera Kompakte Vintage 4K",
    brand: "Lumina",
    category: "Foto & Video",
    price: 649,
    rating: 5.0,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
    isNew: true,
    inStock: true,
    description: "Sensor CMOS 24MP, regjistrim 4K 60fps dhe dizajn klasik prej alumini."
  },
  {
    id: "p4",
    name: "Syze Dielli Polarizuara Minimalist",
    brand: "Solara",
    category: "Aksesorë",
    price: 79,
    oldPrice: 110,
    rating: 4.7,
    reviewsCount: 83,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    description: "Mbrojtje 100% UV400 me skelet ultra të lehtë dhe rezistent."
  },
  {
    id: "p5",
    name: "Çantë Shpine Urban Commuter Waterproof",
    brand: "NomadCraft",
    category: "Aksesorë",
    price: 119,
    rating: 4.8,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    description: "Ndarje e mbrojtur për laptop 16-inç dhe material kundër ujit."
  },
  {
    id: "p6",
    name: "Altoparlant Portativ Waterproof 360",
    brand: "Acoustix",
    category: "Audio",
    price: 89,
    oldPrice: 129,
    rating: 4.6,
    reviewsCount: 57,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    description: "Zë rrethues 360-gradë, mbrojtje IPX7 dhe 18 orë dëgjim pa ndërprerje."
  }
];

const CATEGORIES = ["Të gjitha", "Audio", "Wearables", "Foto & Video", "Aksesorë"];

function FeaturedCarousel({ items }: { items: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const COPIES = 3;
  const baseItems = items ?? [];
  const count = baseItems.length;

  // Width of one full set of cards (including gaps) = distance between a card and its clone.
  const getLoopWidth = (node: HTMLDivElement): number => {
    if (count === 0) return 0;
    const firstCard = node.children[0] as HTMLElement | undefined;
    const cloneCard = node.children[count] as HTMLElement | undefined;
    if (!firstCard || !cloneCard) return 0;
    return cloneCard.offsetLeft - firstCard.offsetLeft;
  };

  // Keep scroll position inside the middle copies so the loop is seamless in both directions.
  const normalize = (node: HTMLDivElement) => {
    const width = getLoopWidth(node);
    if (width <= 0) return;
    if (node.scrollLeft >= width * 2) node.scrollLeft -= width;
    else if (node.scrollLeft < width * 0.5) node.scrollLeft += width;
  };

  const scrollByCard = (dir: 1 | -1) => {
    const trackNode = trackRef.current;
    if (!trackNode) return;
    normalize(trackNode);
    const card = trackNode.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 256) + 16;
    trackNode.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Start in the middle copy so we can scroll infinitely in both directions.
  useEffect(() => {
    const initNode = trackRef.current;
    if (!initNode) return;
    const initWidth = getLoopWidth(initNode);
    if (initWidth > 0) initNode.scrollLeft = initWidth;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // Continuous auto-scroll (requestAnimationFrame, time-based, seamless wrap-around).
  useEffect(() => {
    if (paused || count === 0) return;
    const reduce =
      typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const SPEED = 45; // px per second
    let raf = 0;
    let last = performance.now();
    let pos = trackRef.current?.scrollLeft ?? 0;

    const tick = (now: number) => {
      const el = trackRef.current;
      const dt = Math.min(now - last, 64);
      last = now;
      if (el) {
        // Resync if something else moved the scroll position (arrows, manual swipe)
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
        pos += (SPEED * dt) / 1000;
        const loop = getLoopWidth(el);
        if (loop > 0 && pos >= loop * 2) pos -= loop;
        el.scrollLeft = pos;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, count]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => window.setTimeout(() => setPaused(false), 4000)}
    >
      <button
        type="button"
        aria-label="Prapa"
        onClick={() => scrollByCard(-1)}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-12 h-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-lg text-slate-800 hover:bg-slate-100 transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Para"
        onClick={() => scrollByCard(1)}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-12 h-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-lg text-slate-800 hover:bg-slate-100 transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        ref={trackRef}
        onScroll={(e) => {
          if (paused) normalize(e.currentTarget);
        }}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          baseItems.map((product) => ({ product, copy }))
        ).map(({ product, copy }) => (
          <div
            key={`${copy}-${product?.id}`}
            aria-hidden={copy === 0 ? undefined : true}
            className="flex-shrink-0 w-64"
          >
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={product?.image} alt={product?.name ?? ""} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-slate-900 text-base line-clamp-1">{product?.name ?? ""}</h3>
                <p className="mt-1 text-sm text-slate-500">€{((product?.price ?? 0) * 1.3).toFixed(0)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Arben K.", city: "Tiranë", rating: 5, text: "Kufjet mbërritën brenda një dite dhe cilësia e zërit është fantastike. Shërbim shumë profesional!" },
  { id: "t2", name: "Elira M.", city: "Prishtinë", rating: 5, text: "Porosia ime erdhi e paketuar mirë dhe produkti ishte 100% origjinal. Do të blej përsëri me siguri." },
  { id: "t3", name: "Besnik D.", city: "Shkup", rating: 4, text: "Çmime të mira dhe transport falas. Ekipi i mbështetjes m'u përgjigj shpejt në WhatsApp." },
];

function TestimonialsSection() {
  return (
    <section id="deshmite" className="bg-white border-t border-slate-200 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Dëshmitë</h2>
          <p className="mt-2 text-sm text-slate-500">Çfarë thonë klientët tanë për përvojën e blerjes në UnikFlow</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(TESTIMONIALS ?? []).map((t) => (
            <div key={t?.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md">
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < (t?.rating ?? 0) ? "fill-current" : ""}`} />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">“{t?.text ?? ""}”</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="w-10 h-10 shrink-0 rounded-full bg-teal-600 text-white text-sm font-black flex items-center justify-center">
                  {(t?.name ?? "?").trim().charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t?.name ?? ""}</p>
                  <p className="text-xs text-slate-500">{t?.city ?? ""}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <section id="rreth-nesh" className="bg-white py-14 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
      <div className="max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 mb-4">
          Rreth Nesh
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Rreth UnikFlow Commerce</h1>
        <p className="mt-5 text-base text-slate-600 leading-relaxed">
          UnikFlow Commerce është një dyqan online i krijuar për t'ju sjellë pajisje dhe aksesorë të verifikuar,
          100% origjinalë, me garanci 2-vjeçare, dërgesë të shpejtë brenda 24 orëve dhe transport falas në Shqipëri,
          Kosovë dhe Maqedoninë e Veriut. Misioni ynë është t'ju ofrojmë një përvojë blerjeje të thjeshtë, të sigurt
          dhe plot besim, me mbështetje të vazhdueshme nga ekipi ynë.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-8 min-h-[48px] px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition"
        >
          ← Kthehu te Kreu
        </button>
      </div>
    </section>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* ignore */
    }
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  const [page, setPage] = useState<"home" | "about">("home");
  const goTo = (target: "home" | "about", anchor?: string) => {
    setPage(target);
    setTimeout(() => {
      if (anchor) {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };
  const [selectedCategory, setSelectedCategory] = useState("Të gjitha");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: "",
    phone: "",
    city: "Tiranë",
    address: "",
    paymentMethod: "cod"
  });

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === "Të gjitha" || item?.category === selectedCategory;
      const matchesSearch = item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item?.brand?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item?.product?.id === product?.id);
      if (existing) {
        return prev.map((item) =>
          item?.product?.id === product?.id ? { ...item, quantity: item?.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item?.product?.id === id) {
            const newQty = item?.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item?.product?.id !== id));
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item?.product?.price * item?.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const total = useMemo(() => {
    const calculated = subtotal - discountAmount;
    return calculated > 0 ? calculated : 0;
  }, [subtotal, discountAmount]);

  const totalCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item?.quantity, 0);
  }, [cart]);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "UNIK10") {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else if (couponCode.trim().toUpperCase() === "SUPREME20") {
      setDiscountPercent(20);
      setCouponApplied(true);
    } else {
      alert("Kodi i kuponit nuk është i vlefshëm! Provoni 'UNIK10' ose 'SUPREME20'");
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.fullName || !checkoutForm.phone || !checkoutForm.address) {
      alert("Ju lutem plotësoni të gjitha fushat e detyrueshme!");
      return;
    }

    if (checkoutForm.paymentMethod === "whatsapp") {
      const itemsList = cart.map(c => `• ${c?.product?.name} x${c?.quantity ?? ""} (€${c?.product?.price * c?.quantity})`).join("\n");
      const text = encodeURIComponent(
        `Përshëndetje UnikFlow Commerce!\n\nPorosi e re nga: ${checkoutForm.fullName}\nTelefon: ${checkoutForm.phone || ''}\nQyteti: ${checkoutForm.city}\nAdresa: ${checkoutForm.address}\n\nProduktet:\n${itemsList}\n\nTotali: €${total}`
      );
      window.open(`https://wa.me/355690000000?text=${text}`, "_blank");
    }

    setOrderComplete(true);
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Banner */}
      <div className="bg-teal-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span>🚀 Transport falas në të gjithë Shqipërinë, Kosovën dhe Maqedoninë e Veriut!</span>
        <span className="hidden sm:inline bg-teal-500 px-2 py-0.5 rounded text-[11px] font-bold">Kupon: UNIK10 (-10%)</span>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-teal-600 text-white font-black flex items-center justify-center text-lg">U</span>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-none">UnikFlow</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">Commerce Store</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 ml-10">
            <button type="button" onClick={() => goTo("home")} className={`text-sm font-medium transition ${page === "home" ? "text-teal-600" : "text-slate-600 hover:text-teal-600"}`}>Kreu</button>
            <button type="button" onClick={() => goTo("home", "katalogu")} className="text-sm font-medium text-slate-600 hover:text-teal-600 transition">Katalogu</button>
            <button type="button" onClick={() => goTo("home")} className="text-sm font-medium text-slate-600 hover:text-teal-600 transition">Oferta</button>
            <button type="button" className="px-3 py-1.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition">Shiko Ofertat</button>
            <button type="button" onClick={() => goTo("home", "pyetje")} className="text-sm font-medium text-slate-600 hover:text-teal-600 transition">Pyetje</button>
            <button type="button" onClick={() => goTo("about")} className={`text-sm font-medium transition ${page === "about" ? "text-teal-600 font-bold" : "text-slate-600 hover:text-teal-600"}`}>Rreth Nesh</button>
          </nav>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Kërko produkte, kategori ose brande..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-full text-sm focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select className="appearance-none bg-slate-100 border border-transparent rounded-full pl-3 pr-8 py-2 text-xs font-medium text-slate-700 focus:bg-white focus:border-teal-500 focus:outline-none transition-all">
                <option value="sq" key="sq">SQ</option>
                <option value="en" key="en">EN</option>
              </select>
              <svg className="pointer-events-none absolute inset-y-0 right-2 flex items-center w-4 h-full text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-teal-600" />
              <span className="text-xs font-bold hidden sm:inline">Shporta</span>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>


      {/* Hero Showcase */}

      <section className="bg-gradient-to-b from-white to-slate-100/50 py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 mb-4">
              ✨ Koleksioni i ri 2026
            </span>
            <p className="text-sm text-teal-600 font-bold mb-2">Dërgesa falas mbi 50€</p>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Blej me siguri
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Zbuloni pajisjet dhe aksesorët më të fundit të verifikuara me garanci origjinale dhe dërgesë të shpejtë brenda 24 orëve.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#katalogu"
                                 className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-200 transition"
               >
                 Eksploro Katalogun
              </a>
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition"
              >
                Shiko Shportën ({totalCount})
              </button>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="min-h-[48px] px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-200 transition"
              >
                Regjistrohu Tani
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
                alt="Headphones"
                className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md mt-6">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"
                alt="Smartwatch"
                className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-teal-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-teal-500 text-white">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Dërgesë e Shpejtë 24h</p>
              <p className="text-xs text-teal-100">Në Shqipëri, Kosovë dhe rajon</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-teal-500 text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Garanci 2-Vjeçare</p>
              <p className="text-xs text-teal-100">Produkt origjinal i certifikuar</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-teal-500 text-white">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Kthim i Lehtë 14 Ditë</p>
              <p className="text-xs text-teal-100">Rimbursim i plotë pa pyetje</p>
            </div>
          </div>
        </div>
      </section>



      {/* Produktet e Përzgjedhura Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 mb-3">
            ⭐ Të Preferuara
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Produktet e Përzgjedhura</h2>
          <p className="mt-2 text-sm text-slate-500">Zgjidhni nga koleksioni ynë më i mirë me pajisje dhe aksesorë të verifikuara</p>
        </div>

        {/* Carousel */}
        <FeaturedCarousel items={PRODUCTS.slice(0, 5)} />
        
      </section>

      {/* Dëshmitë Section */}
      <TestimonialsSection />

      {/* Catalog & Filter Bar */}
      <main id="katalogu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-900">Katalog</h3>
            <p className="text-xs text-slate-500 mt-1">Po shfaqen {filteredProducts.length} produkte aktive</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-teal-600 text-white shadow-md shadow-teal-100"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p?.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video sm:aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={p?.image}
                    alt={p?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p?.oldPrice && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow">
                      -{Math.round(((p?.oldPrice - p?.price) / p?.oldPrice) * 100)}%
                    </span>
                  )}
                  {p?.isNew && (
                    <span className="absolute top-3 right-3 bg-teal-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                      NEW
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="font-semibold text-teal-600">{p?.brand ?? ""}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {p?.rating ?? ""} ({p?.reviewsCount ?? ""})
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-teal-600 transition">
                    {p?.name ?? ""}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {p?.description ?? ""}
                  </p>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900">€{(p?.price * 1.30).toFixed(0)}</span>
                    {p?.oldPrice && (
                      <span className="text-xs text-slate-400 line-through">€{p?.oldPrice ?? ""}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => addToCart(p)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Shto në Shportë
                </button>
                <button
                  onClick={() => { /* Handle preference logic */ }}
                  className="w-full py-2.5 mt-2 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-600 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Shto te Preferuarat
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Preferences */}
      <PreferencesSection />

      {/* Careers */}
      <CareersSection />

      {/* Contact */}
      <ContactSection />

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-teal-600" />
                  <h3 className="font-black text-lg text-slate-900">Shporta Juaj ({totalCount})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-20 text-center">
                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-bold text-slate-700">Shporta juaj është bosh</p>
                    <p className="text-xs text-slate-400 mt-1">Zgjidhni artikuj nga katalogu për të filluar blerjen.</p>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div key={product?.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <img src={product?.image} alt={product?.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{product?.name ?? ""}</h4>
                        <p className="text-xs font-black text-teal-600 mt-1">€{product?.price * quantity}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(product?.id, -1)}
                            className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-xs font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-800">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product?.id, 1)}
                            className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-xs font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(product?.id)}
                            className="ml-auto text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="p?.sh. UNIK10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs uppercase tracking-wider focus:outline-none focus:border-teal-600"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
                    >
                      Apliko
                    </button>
                  </div>

                  {couponApplied && (
                    <div className="text-xs text-teal-600 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Zbritja {discountPercent}% u aplikua me sukses!
                    </div>
                  )}

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Nëntotali:</span>
                      <span className="font-bold">€{subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-teal-600">
                        <span>Zbritja ({discountPercent}%):</span>
                        <span className="font-bold">-€{discountAmount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Dërgesa:</span>
                      <span className="font-bold text-teal-600">FALAS</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                      <span>Totali:</span>
                      <span className="text-teal-600 text-base">€{total.toFixed(0)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-200 transition flex items-center justify-center gap-2"
                  >
                    Vazhdo te Pagesa (€{total.toFixed(0)})
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-1">Përfundo Porosinë</h3>
            <p className="text-xs text-slate-500 mb-6">Plotësoni të dhënat e dorëzimit dhe zgjidhni mënyrën e pagesës.</p>

            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Emri dhe Mbiemri *</label>
                <input
                  type="text"
                  required
                  placeholder="p?.sh. Alban Hoxha"
                  value={checkoutForm.fullName}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Numri i Telefonit *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+355 69..."
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Qyteti *</label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.city}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Adresa e Plotë *</label>
                <input
                  type="text"
                  required
                  placeholder="Rruga, pallati, hyrja..."
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Mënyra e Pagesës</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: "cod" })}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition ${
                      checkoutForm.paymentMethod === "cod"
                        ? "border-teal-600 bg-teal-50 text-teal-700"
                        : "border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    💵 Kesh në Dorëzim
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: "card" })}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition ${
                      checkoutForm.paymentMethod === "card"
                        ? "border-teal-600 bg-teal-50 text-teal-700"
                        : "border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    💳 Kartë Krediti
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: "whatsapp" })}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition ${
                      checkoutForm.paymentMethod === "whatsapp"
                        ? "border-teal-600 bg-teal-50 text-teal-700"
                        : "border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    💬 WhatsApp
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Totali për pagesë:</span>
                  <p className="text-lg font-black text-slate-900">€{total.toFixed(0)}</p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition"
                >
                  Konfirmo Porosinë
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Confirmed Banner */}
      {orderComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-lg">Porosia u regjistrua me sukses!</h4>
            <p className="text-xs text-slate-500 mt-2">
              Faleminderit! Ekipi i UnikFlow do t'ju kontaktojë së shpejti për konfirmimin e dërgesës.
            </p>
            <button
              onClick={() => setOrderComplete(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              Mbyll
            </button>
          </div>
        </div>
      )}

      <FaqSection />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">U</span>
                <span className="text-white font-bold text-lg">UnikFlow</span>
              </div>
              <p className="text-sm">Zbuloni pajisjet dhe aksesorët më të fundit me garanci origjinale dhe dërgesë të shpejtë.</p>
              <div className="flex gap-3">
                <a href="#" className="text-slate-400 hover:text-white transition"><Mail className="w-4 h-4" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition"><MessageCircle className="w-4 h-4" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition"><ExternalLink className="w-4 h-4" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-4">Lidhje të Shpejta</h4>
              <ul className="space-y-2">
                <li><a href="#katalogu" className="hover:text-white transition">Katalogu</a></li>
                <li><a href="#pyetje" className="hover:text-white transition">Pyetje të Shpeshta</a></li>
                <li><a href="#rreth-nesh" className="hover:text-white transition">Rreth Nesh</a></li>
                <li><a href="#karriera" className="hover:text-white transition">Karriera</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-4">Shërbimet</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Transporti</a></li>
                <li><a href="#" className="hover:text-white transition">Kthimet</a></li>
                <li><a href="#" className="hover:text-white transition">Garancia</a></li>
                <li><a href="#" className="hover:text-white transition">Pagesat</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-4">Kontakt</h4>
              <ul className="space-y-2">
                <li><p>Rr. Durrësit, Nr. 123, Tiranë</p></li>
                <li><p>+355 69 123 4567</p></li>
                <li><p>info@unikflow.com</p></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p>© 2026 UnikFlow Ecosystem. Të gjitha të drejtat të rezervuara.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
