"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider, useLang } from "@/i18n/useTranslations";

const sections = [
  {
    key: "terms.1_title",
    title: "Acceptance of Terms",
    content_key: "terms.1_content",
  },
  {
    key: "terms.2_title",
    title: "Free Access",
    content_key: "terms.2_content",
  },
  {
    key: "terms.3_title",
    title: "Your API Key",
    content_key: "terms.3_content",
  },
  {
    key: "terms.4_title",
    title: "No Warranty",
    content_key: "terms.4_content",
  },
  {
    key: "terms.5_title",
    title: "Limitation of Liability",
    content_key: "terms.5_content",
  },
  {
    key: "terms.6_title",
    title: "User Obligations",
    content_key: "terms.6_content",
  },
  {
    key: "terms.7_title",
    title: "Intellectual Property",
    content_key: "terms.7_content",
  },
  {
    key: "terms.8_title",
    title: "Termination",
    content_key: "terms.8_content",
  },
];

function TermsPage() {
  const { t } = useLang();

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
                {t("terms.badge") || "Legal"}
              </span>
              <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {t("terms.title")}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
                {t("terms.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-3xl px-4 pb-28 sm:px-6 lg:px-8">
          {sections.map((s, i) => (
            <div
              key={s.key}
              className={`${i > 0 ? "mt-10" : ""} pt-10 first:mt-0 first:border-t first:border-slate-100`}
            >
              <h2 className="text-xl font-semibold text-slate-900">{t(s.title)}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t(s.content_key)}</p>
            </div>
          ))}

          <div className="mt-14 border-t border-slate-100 pt-8">
            <h2 className="text-xl font-semibold text-slate-900">{t("terms.contact_title") || "Contact"}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {t("terms.contact_text") || "If you have any questions about these Terms of Service, please contact us at "}
              <a href="mailto:legal@freeai.example" className="text-blue-600 hover:underline">
                legal@freeai.example
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function TermsPageWrapper() {
  return (
    <LangProvider>
      <TermsPage />
    </LangProvider>
  );
}
