"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider, useLang } from "@/i18n/useTranslations";

type FormStatus = "idle" | "sending" | "sent" | "error";

function ContactPage() {
  const { t } = useLang();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("sending");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-br from-blue-100/40 via-violet-100/30 to-transparent blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                {t("contact.badge") || "Contact"}
              </span>
              <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {t("contact.title")}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
                {t("contact.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-2xl px-4 pb-28 sm:px-6 lg:px-8">
          {status === "sent" ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-10 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-7 w-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">{t("contact.success_title") || "Message sent!"}</h2>
              <p className="mt-2 text-sm text-slate-500">{t("contact.success_desc") || "Thanks for reaching out. We&apos;ll get back to you soon."}</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-200 active:scale-[0.98]"
              >
                {t("contact.send_another") || "Send another message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm backdrop-blur-sm sm:p-10">
              {status === "error" && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50/70 p-4 text-sm text-red-600">
                  {t("contact.error") || "Something went wrong. Please try again."}
                </div>
              )}

              <div className="mb-5">
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  {t("contact.form_name") || "Name"}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("contact.form_name_placeholder") || "Your name"}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                  {t("contact.form_email") || "Email"}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("contact.form_email_placeholder") || "you@example.com"}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                  {t("contact.form_message") || "Message"}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t("contact.form_message_placeholder") || "Write your message here..."}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-gray-100 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                    </svg>
                    {t("contact.form_sending") || "Sending..."}
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    {t("contact.form_submit") || "Send message"}
                  </>
                )}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function ContactPageWrapper() {
  return (
    <LangProvider>
      <ContactPage />
    </LangProvider>
  );
}
