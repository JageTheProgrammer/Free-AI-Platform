"use client";

import Link from "next/link";
import { useLang } from "@/i18n/useTranslations";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const { t } = useLang();
  const aboutT = (key: string) => (t(`about.${key}` as never) as string) || "";

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-br from-blue-100/40 via-violet-100/30 to-transparent blur-3xl" />
            <div className="absolute top-20 left-[-10%] h-80 w-80 rounded-full bg-sky-100/25 blur-3xl" />
          </div>

          <div className="mx-auto max-w-4xl px-4 py-28 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                {aboutT("badge") || "About Free AI"}
              </span>

              <h1 className="mx-auto mt-8 max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                {aboutT("title")}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl">
                {aboutT("subtitle")}
              </p>

              <div className="mt-10 flex justify-center">
                <Link
                  href="/chat"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-gray-200 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-500/20 transition-all hover:shadow-2xl hover:shadow-blue-500/30 hover:brightness-110 active:scale-[0.98]"
                >
                  {aboutT("cta_start")}
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div> 
            </div>
          </div>
        </section>

        {/* Core values */}
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                ),
                gradient: "from-emerald-500 to-teal-600",
                shadow: "shadow-emerald-500/20",
                title: aboutT("value_1_title"),
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                ),
                gradient: "from-blue-500 to-indigo-600",
                shadow: "shadow-blue-500/20",
                title: aboutT("value_2_title"),
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
                gradient: "from-violet-500 to-purple-600",
                shadow: "shadow-violet-500/20",
                title: aboutT("value_3_title"),
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg ${item.shadow}`}
                >
                  <svg className="h-5.5 w-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {item.icon}
                  </svg>
                </span>
                <h3 className="mt-5 text-base font-semibold text-slate-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* What is Free AI */}
        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">{aboutT("what_title")}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500">
            {aboutT("what_content")}
          </p>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">{aboutT("how_title")}</h2>

          <div className="mt-10 space-y-6">
            {[
              { step: "1", title: aboutT("step_1_title"), desc: aboutT("step_1_desc") },
              { step: "2", title: aboutT("step_2_title"), desc: aboutT("step_2_desc") },
              { step: "3", title: aboutT("step_3_title"), desc: aboutT("step_3_desc") },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-gray-300 text-lg font-bold text-white shadow-lg shadow-blue-500/25">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">{aboutT("features_title")}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500">
            {aboutT("features_subtitle")}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
                title: aboutT("feature_1_title"),
                desc: aboutT("feature_1_desc"),
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
                ),
                title: aboutT("feature_2_title"),
                desc: aboutT("feature_2_desc"),
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: aboutT("feature_3_title"),
                desc: aboutT("feature_3_desc"),
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
                title: aboutT("feature_4_title"),
                desc: aboutT("feature_4_desc"),
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-blue-500/20">
                  <svg className="h-5.5 w-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {item.icon}
                  </svg>
                </span>
                <h3 className="mt-5 text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Changelog */}
        <section id="changelog" className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">{aboutT("changelog_title")}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500">
            {aboutT("changelog_subtitle")}
          </p>

          <div className="mt-8 space-y-6 border-l-2 border-slate-100 pl-6">
            {[
              { version: aboutT("changelog_1_version"), date: aboutT("changelog_1_date"), desc: aboutT("changelog_1_desc") },
              { version: aboutT("changelog_2_version"), date: aboutT("changelog_2_date"), desc: aboutT("changelog_2_desc") },
              { version: aboutT("changelog_3_version"), date: aboutT("changelog_3_date"), desc: aboutT("changelog_3_desc") },
            ].map((item, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-sm font-semibold text-blue-600">{item.version}</span>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API Key section */}
        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">{aboutT("api_title")}</h2>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-8">
            <p className="text-base leading-7 text-slate-600">{aboutT("api_content_1")}</p>
            <p className="mt-4 text-base leading-7 text-slate-600">{aboutT("api_content_2")}</p>
            <div className="mt-6 rounded-xl border border-blue-200 bg-white/80 p-5">
              <h4 className="text-sm font-semibold text-slate-900">{aboutT("api_how_to_get_title")}</h4>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-7 text-slate-600">
                <li>{aboutT("api_how_to_get_1")}</li>
                <li>{aboutT("api_how_to_get_2")}</li>
                <li>{aboutT("api_how_to_get_3")}</li>
              </ol>
              <div className="mt-4">
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-500"
                >
                  {aboutT("api_how_to_get_link")}
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-amber-200 bg-white/80 p-5">
              <h4 className="text-sm font-semibold text-slate-900">{aboutT("api_paid_note_title")}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600">{aboutT("api_paid_note")}</p>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              {aboutT("api_note")}
            </p>
          </div>
        </section>

        {/* Why Free AI */}
        <section className="mx-auto max-w-4xl px-4 pb-28 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">{aboutT("why_title")}</h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                ),
                title: aboutT("why_1_title"),
                desc: aboutT("why_1_desc"),
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
                title: aboutT("why_2_title"),
                desc: aboutT("why_2_desc"),
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                ),
                title: aboutT("why_3_title"),
                desc: aboutT("why_3_desc"),
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                ),
                title: aboutT("why_4_title"),
                desc: aboutT("why_4_desc"),
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-gray-300 shadow-lg shadow-blue-500/20">
                  <svg className="h-5.5 w-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {item.icon}
                  </svg>
                </span>
                <h3 className="mt-5 text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-28 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-300 via-blue-600 to-gray-200 px-6 py-16 shadow-2xl shadow-blue-500/20 sm:px-16 sm:py-20">
            <div className="absolute inset-0 -z-10 opacity-10">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-about" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-about)" />
              </svg>
            </div>

            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">{aboutT("cta_title")}</h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-blue-100">
                {aboutT("cta_desc")}
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-blue-600 shadow-xl shadow-black/10 transition-all hover:shadow-2xl hover:brightness-95 active:scale-[0.98]"
                >
                  {aboutT("cta_start")}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
