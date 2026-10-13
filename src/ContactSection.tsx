import { useState } from "react";
import { Send, Mail, Check, X } from "lucide-react";

type ContactErrors = { name?: string; email?: string; phone?: string; city?: string; message?: string };
type ContactField = "name" | "email" | "phone" | "city" | "message";
type ContactValues = { name: string; email: string; phone: string; city: string; message: string };

const EMPTY_VALUES: ContactValues = { name: "", email: "", phone: "", city: "", message: "" };

function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = (values?.name ?? "").trim();
  const email = (values?.email ?? "").trim();
  const phone = (values?.phone ?? "").trim();
  const message = (values?.message ?? "").trim();

  if (!name) errors.name = "Emri është i detyrueshëm.";
  else if (name.length < 2) errors.name = "Emri duhet të ketë të paktën 2 shkronja.";

  if (!email) errors.email = "Email-i është i detyrueshëm.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Shkruani një email të vlefshëm (p.sh. emri@shembull.com).";

  if (phone && !/^\+?[0-9\s\-()]{6,20}$/.test(phone)) errors.phone = "Shkruani një numër telefoni të vlefshëm (p.sh. +355 69 123 4567).";

  if (!message) errors.message = "Mesazhi është i detyrueshëm.";
  else if (message.length < 10) errors.message = "Mesazhi duhet të ketë të paktën 10 karaktere.";

  if (!values.city) errors.city = "Qyteti është i detyrueshëm.";

  return errors;
}

export default function ContactSection() {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; phone?: boolean; city?: boolean; message?: boolean }>({});
  const [sent, setSent] = useState(false);

  const handleChange = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validateContact(next));
  };

  const handleBlur = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateContact(values));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, city: true, message: true });
    if (Object.keys(found).length > 0) return;
    setSent(true);
    setValues(EMPTY_VALUES);
    setTouched({});
    setErrors({});
  };

  const inputClass = (field: ContactField) =>
    "w-full min-h-[48px] px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 transition " +
    (touched[field] && errors[field]
      ? "border-rose-400 focus:ring-rose-200"
      : "border-slate-200 focus:border-teal-500 focus:ring-teal-100");

  return (
    <section id="kontakt" className="bg-slate-50 border-t border-slate-200 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 mb-3">
            <Mail className="w-3.5 h-3.5" /> Kontakt
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Na kontaktoni</h2>
          <p className="mt-2 text-sm text-slate-500">Keni pyetje? Dërgoni një mesazh dhe do t'ju përgjigjemi sa më shpejt.</p>
        </div>

        {sent && (
          <div role="status" className="mb-5 flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm text-teal-700">
            <Check className="w-5 h-5 shrink-0" />
            <div className="flex-1">
              <p className="font-bold">Mesazhi u dërgua me sukses!</p>
              <p className="text-xs mt-0.5">Faleminderit që na shkruat. Do t'ju kthejmë përgjigje së shpejti.</p>
            </div>
            <button type="button" onClick={() => setSent(false)} aria-label="Mbyll" className="text-teal-600 hover:text-teal-800">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-5">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1.5">Emri *</label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder="p.sh. Alban Hoxha"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className={inputClass("name")}
            />
            {touched.name && errors.name && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1.5">Email *</label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="emri@shembull.com"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={inputClass("email")}
            />
            {touched.email && errors.email && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="contact-city" className="block text-xs font-bold text-slate-700 mb-1.5">Qyteti</label>
            <input
              id="contact-city"
              type="text"
              autoComplete="address-level2"
              placeholder="p.sh. Tiranë"
              value={values.city}
              onChange={(e) => handleChange("city", e.target.value)}
              onBlur={() => handleBlur("city")}
              className={inputClass("city")}
            />
            {touched.city && errors.city && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 mb-1.5">Telefon</label>
            <input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+355 69 123 4567"
              value={values.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              className={inputClass("phone")}
            />
            {touched.phone && errors.phone && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1.5">Mesazhi *</label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Shkruani mesazhin tuaj këtu..."
              value={values.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
              className={inputClass("message") + " resize-y"}
            ></textarea>
            {touched.message && errors.message && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Dërgo Mesazhin
          </button>
        </form>
      </div>
    </section>
  );
}
