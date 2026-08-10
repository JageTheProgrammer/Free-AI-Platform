"use client";

import { useLang } from "@/i18n/useTranslations";
import Link from "next/link";

const sections = [
  {
    title: "Product",
    links: [
      { key: "footer.features", href: "/about#features" },
      { key: "footer.changelog", href: "/about#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { key: "footer.about", href: "/about" },
      { key: "footer.newsletter", href: "/newsletter" },
      { key: "footer.contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { key: "footer.privacy", href: "/privacy" },
      { key: "footer.terms", href: "/terms" },
      { key: "footer.license", href: "/license" },
      { key: "footer.cookies", href: "/cookies" },
    ],
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/80">
      {/* Subtle top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand column — spans 4 cols */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-gray-200 shadow-md shadow-blue-500/20">
                <svg className="h-4.5 w-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">
                Free AI
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              {t("footer.tagline") || "Powerful artificial intelligence tools, completely free. No sign-up required — start creating and building today."}
            </p>
            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {sections.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">{section.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                    >
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Stay updated</h3>
            <p className="mt-4 text-sm text-slate-500">Get the latest AI tools and updates delivered to your inbox.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@email.com"
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-gradient-to-r from-blue-600 to-gray-200 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.97]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {year} Free AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
