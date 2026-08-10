"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider, useLang } from "@/i18n/useTranslations";

function LicensePage() {
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
                {t("license.badge") || "Open Source"}
              </span>
              <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {t("license.title")}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">
                {t("license.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-3xl px-4 pb-28 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-slate-900">{t("license.1_title") || "MIT License"}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{t("license.1_content") || "Copyright (c) {year} Free AI"}</p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-100 bg-slate-50/80 p-5">
            <pre className="text-xs leading-7 text-slate-600 whitespace-pre-wrap break-all">
{`MIT License

Copyright (c) 2026 Free AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
            </pre>
          </div>

          <div className="mt-14 border-t border-slate-100 pt-8">
            <h2 className="text-xl font-semibold text-slate-900">{t("license.contact_title") || "Questions?"}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {t("license.contact_text") || "If you have questions about this license, please see the "}
              <a href="/contact" className="text-blue-600 hover:underline">
                {t("nav.contact") || "Contact"}
              </a>
              {" "}
              {t("license.or_email_text") || "page or email us at "}
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

export default function LicensePageWrapper() {
  return (
    <LangProvider>
      <LicensePage />
    </LangProvider>
  );
}
