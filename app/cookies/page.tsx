"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider, useLang } from "@/i18n/useTranslations";

const sections = [
  {
    key: "cookies.1_title",
    title: "What Cookies & Storage We Use",
    content_key: "cookies.1_content",
  },
  {
    key: "cookies.2_title",
    title: "Language Preference",
    content_key: "cookies.2_content",
  },
  {
    key: "cookies.3_title",
    title: "No Tracking or Analytics",
    content_key: "cookies.3_content",
  },
  {
    key: "cookies.4_title",
    title: "Managing Your Data",
    content_key: "cookies.4_content",
  },
  {
    key: "cookies.5_title",
    title: "Third-Party Cookies",
    content_key: "cookies.5_content",
  },
];

function CookiesPage() {
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
                {t("cookies.badge") || "Legal"}
              </span>
              <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {t("cookies.title")}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
                {t("cookies.subtitle")}
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
            <h2 className="text-xl font-semibold text-slate-900">{t("cookies.contact_title") || "Contact"}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {t("cookies.contact_text") || "If you have any questions about our use of cookies, please contact us at "}
              <a href="mailto:privacy@freeai.example" className="text-blue-600 hover:underline">
                privacy@freeai.example
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

export default function CookiesPageWrapper() {
  return (
    <LangProvider>
      <CookiesPage />
    </LangProvider>
  );
}
