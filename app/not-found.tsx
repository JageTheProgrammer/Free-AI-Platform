/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider, useLang } from "@/i18n/useTranslations";

function NotFoundPage() {
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
          <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-28 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* 404 badge */}
              <span className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-400 to-gray-300 shadow-lg shadow-blue-500/10 text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-gray-300 bg-clip-text select-none">
                404
              </span>

              <h1 className="mx-auto mt-8 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {t("not_found.title")}
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-500">
                {t("not_found.subtitle")}
              </p>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-gray-100 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  {t("not_found.home_button")}
                </a>
                <a
                  href="/chat"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-8 py-3.5 text-base font-semibold text-slate-700 backdrop-blur-sm shadow-sm transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 hover:shadow-md active:scale-[0.98]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  {t("not_found.chat_button") || "Try Chat"}
                </a>
              </div>

              {/* Small hint */}
              <p className="mt-12 text-xs font-medium text-slate-400">
                {t("not_found.hint") || "The page you&apos;re looking for doesn&apos;t exist or has been moved."}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function NotFoundPageWrapper() {
  return (
    <LangProvider>
      <NotFoundPage />
    </LangProvider>
  );
}
