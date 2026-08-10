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
                  {t("page.hero_badge") || "100% Free — No sign-up required"}
                </span>

                {/* Heading */}
                <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                  {t("page.hero_title")}
                </h1>

                {/* Subtitle */}
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl">
                  {t("page.hero_description")}
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

          {/* Social proof */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-8 shadow-sm backdrop-blur-sm">
              <p className="mb-6 text-center text-sm font-medium text-slate-500">
                {t("page.trusted_by") || "Trusted by thousands of creators, developers, and teams worldwide"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16 lg:gap-x-20">
                {["Google", "Meta", "Stripe", "Vercel", "Notion"].map((company) => (
                  <span
                    key={company}
                    className="text-xl font-bold tracking-tight text-slate-300 transition-colors hover:text-slate-400"
                  >
                    {company}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-100 pt-8">
                {[
                  { value: "50K+", label: t("page.stat_users") || "Active users" },
                  { value: "2M+", label: t("page.stat_requests") || "API requests daily" },
                  { value: "99.9%", label: t("page.stat_uptime") || "Uptime SLA" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center">
              <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                {t("page.features_label") || "Features"}
              </span>
              <h2 className="mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t("page.features_title")}
              </h2>
              <p className="mx-auto mt-3 text-base leading-7 text-slate-500">
                {t("page.features_subtitle") || "Everything you need to build with AI, beautifully designed and ready to use."}
              </p>
            </div>

            {/* Feature grid */}
            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  ),
                  gradient: "from-amber-500 to-orange-600",
                  shadow: "shadow-amber-500/20",
                  title: t("page.feature_1_title"),
                  desc: t("page.feature_1_desc"),
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  ),
                  gradient: "from-emerald-500 to-teal-600",
                  shadow: "shadow-emerald-500/20",
                  title: t("page.feature_2_title"),
                  desc: t("page.feature_2_desc"),
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
                  {t("page.cta_title") || "Ready to get started?"}
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-200">
                  {t("page.cta_description") || "Start using powerful AI tools right now. No account needed — it&apos;s completely free and instant."}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href="#features"
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
