"use client";


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/useTranslations";
import Link from "next/dist/client/link";

export default function Home() {
  const { t } = useLang();

  return (
    <>
      <div className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero section */}
          <section className="relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-br from-blue-100/40 via-violet-100/30 to-transparent blur-3xl" />
              <div className="absolute -top-20 right-[-5%] h-64 w-64 rounded-full bg-violet-100/30 blur-3xl" />
              <div className="absolute top-20 left-[-10%] h-80 w-80 rounded-full bg-sky-100/25 blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
              <div className="text-center">
                {/* Badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 px-4 py-1.5 text-xs font-semibold text-gray-600 backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                  </span>
                  {t("page.hero_badge") || "100% Free — BYOK (Bring Your Own Key)"}
                </span>

                {/* Heading */}
                <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                  {t("page.hero_title")}
                </h1>

                {/* Subtitle */}
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl">
                  {t("page.hero_description") || "Bring your own Groq API key and use powerful AI models directly from your browser — no sign-up, no credit card, no limits. Your data stays on your device."}
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href="/chat"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-500/20 transition-all hover:shadow-2xl hover:shadow-blue-500/30 hover:brightness-110 active:scale-[0.98]"
                  >
                    {t("page.cta_start")}
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href="#features"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-8 py-3.5 text-base font-semibold text-slate-700 backdrop-blur-sm shadow-sm transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 hover:shadow-md active:scale-[0.98]"
                  >
                    <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t("page.cta_explore") || "Explore features"}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* BYOK Callout — Bring Your Own Key */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-8 sm:p-10 shadow-sm">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3 3V9" />
                  </svg>
                  {t("page.byok_badge") || "Bring Your Own Key"}
                </span>
                <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {t("page.byok_title")}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">
                  {t("page.byok_desc")}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {t("page.byok_key") || "Your Groq key stays in your browser"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {t("page.byok_no_server") || "Never stored on any server"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {t("page.byok_quota") || "You control your own Groq quota"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy — the differentiator */}
          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50/70 px-4 py-1.5 text-xs font-semibold text-violet-700">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {t("page.privacy_badge") || "Privacy First"}
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t("page.privacy_title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
                {t("page.privacy_desc")}
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  ),
                  gradient: "from-violet-500 to-purple-600",
                  shadow: "shadow-violet-500/20",
                  title: t("page.privacy_feature_1_title"),
                  desc: t("page.privacy_feature_1_desc"),
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  ),
                  gradient: "from-blue-500 to-indigo-600",
                  shadow: "shadow-blue-500/20",
                  title: t("page.privacy_feature_2_title"),
                  desc: t("page.privacy_feature_2_desc"),
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  ),
                  gradient: "from-emerald-500 to-teal-600",
                  shadow: "shadow-emerald-500/20",
                  title: t("page.privacy_feature_3_title"),
                  desc: t("page.privacy_feature_3_desc"),
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
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison — Why Free AI vs ChatGPT / Claude / Gemini */}
          <section id="features" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                {t("page.features_label") || "Comparison"}
              </span>
              <h2 className="mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t("page.comparison_title")}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-500">
                {t("page.comparison_subtitle")}
              </p>
            </div>

            {/* Comparison table */}
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 pl-4 text-left font-semibold text-slate-500"></th>
                    {["Free AI", "ChatGPT", "Claude", "Gemini"].map((name) => (
                      <th key={name} className={`py-3 text-center font-semibold ${name === "Free AI" ? "text-blue-600" : "text-slate-400"}`}>
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    {
                      check: true,
                      claim: t("page.comp_no_account"),
                      chatgpt: t("page.comp_chatgpt_account"),
                      claude: t("page.comp_claude_account"),
                      gemini: t("page.comp_gemini_account"),
                    },
                    {
                      check: true,
                      claim: t("page.comp_no_tracking"),
                      chatgpt: t("page.comp_chatgpt_track"),
                      claude: t("page.comp_claude_track"),
                      gemini: t("page.comp_gemini_track"),
                    },
                    {
                      check: true,
                      claim: t("page.comp_byok"),
                      chatgpt: t("page.comp_chatgpt_quota"),
                      claude: t("page.comp_claude_quota"),
                      gemini: t("page.comp_gemini_quota"),
                    },
                    {
                      check: true,
                      claim: t("page.comp_no_key"),
                      chatgpt: t("page.comp_chatgpt_key"),
                      claude: t("page.comp_claude_quota_model"),
                      gemini: t("page.comp_gemini_key"),
                    },
                    {
                      check: true,
                      claim: t("page.comp_groq_speed"),
                      chatgpt: t("page.comp_chatgpt_speed"),
                      claude: t("page.comp_claude_speed"),
                      gemini: t("page.comp_gemini_speed"),
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-4 pl-4 pr-3 text-slate-700">{row.claim}</td>
                      {row.check ? (
                        <>
                          <td className="py-4 text-center">
                            <svg className="mx-auto h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </td>
                          <td className="py-4 text-center text-slate-400">{row.chatgpt}</td>
                          <td className="py-4 text-center text-slate-400">{row.claude}</td>
                          <td className="py-4 text-center text-slate-400">{row.gemini}</td>
                        </>
                      ) : (
                        <>
                          <td className="py-4 text-center"><svg className="mx-auto h-5 w-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></td>
                          <td className="py-4 text-center text-slate-400">{row.chatgpt}</td>
                          <td className="py-4 text-center text-slate-400">{row.claude}</td>
                          <td className="py-4 text-center text-slate-400">{row.gemini}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Comparison footnote */}
            <p className="mt-6 text-center text-xs text-slate-400">
              {t("page.comparison_note") || "Free AI gives you the same powerful models without the middleman. You pay Groq directly only if you exceed their free tier — and Groq's free tier is very generous."}
            </p>
          </section>

          {/* Groq upgrade note */}
          <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/60 to-orange-50/40 p-8 sm:p-10">
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-amber-700">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {t("page.groq_upgrade_badge") || "Groq Quota"}
                </span>
                <h2 className="mx-auto mt-5 max-w-xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {t("page.groq_upgrade_title")}
                </h2>
                <p className="mx-auto mt-3 text-base leading-7 text-slate-600">
                  {t("page.groq_upgrade_desc")}
                </p>
                <div className="mt-5">
                  <a
                    href="https://console.groq.com/billing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 underline decoration-amber-300 underline-offset-2 hover:decoration-amber-500"
                  >
                    {t("page.groq_upgrade_link") || "View Groq pricing →"}
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Features — what you get */}
          <section id="features" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center">
              <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                {t("page.features_label") || "Features"}
              </span>
              <h2 className="mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t("page.features_title") || "What You Get"}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-500">
                {t("page.features_subtitle") || "Everything Free AI gives you — no hidden catch, just your own Groq API key powering the magic."}
              </p>
            </div>

            {/* Feature grid */}
            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  ),
                  gradient: "from-emerald-500 to-teal-600",
                  shadow: "shadow-emerald-500/20",
                  title: t("page.feature_1_title"),
                  desc: t("page.feature_1_desc") || "Powered by your own Groq API key — completely free as long as you have a Groq account with available quota.",
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  ),
                  gradient: "from-sky-500 to-blue-600",
                  shadow: "shadow-sky-500/20",
                  title: t("page.feature_2_title"),
                  desc: t("page.feature_2_desc") || "No account needed — just paste your Groq API key and start using AI instantly.",
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  ),
                  gradient: "from-blue-500 to-indigo-600",
                  shadow: "shadow-blue-500/20",
                  title: t("page.feature_3_title"),
                  desc: t("page.feature_3_desc"),
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  ),
                  gradient: "from-violet-500 to-purple-600",
                  shadow: "shadow-violet-500/20",
                  title: t("page.feature_4_title"),
                  desc: t("page.feature_4_desc"),
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-xl"
                >

                  {/* Icon */}
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.shadow} transition-transform group-hover:scale-110`}
                  >
                    <svg className="h-5.5 w-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {feature.icon}
                    </svg>
                  </span>

                  {/* Content */}
                  <h3 className="mt-5 text-base font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.desc}</p>

                  {/* Arrow on hover */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link href="/about" className="text-blue-600 hover:text-blue-700">
                      Learn more
                    </Link>
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-400 to-gray-200 px-6 py-16 shadow-2xl shadow-blue-500/20 sm:px-16 sm:py-20">
              {/* Background pattern */}
              <div className="absolute inset-0 -z-10 opacity-10">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {t("page.cta_title") || "Ready to try Free AI?"}
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white">
                  {t("page.cta_description") || "Get your free Groq API key in 30 seconds, paste it here, and start chatting. No account on our end — just you, your key, and powerful AI."}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href="/chat"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-blue-600 shadow-xl shadow-black/10 transition-all hover:shadow-2xl hover:brightness-95 active:scale-[0.98]"
                  >
                    {t("page.cta_start") || "Get started for free"}
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
