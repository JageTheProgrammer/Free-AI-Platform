"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/useTranslations";

const links = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.contact", href: "/contact" },
  { key: "nav.terms", href: "/terms" },
  { key: "nav.cookies", href: "/cookies" },

];

const langs = [
  { code: "en", label: "EN" },
  { code: "fi", label: "FI" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled
          ? "border-b border-slate-200/60 bg-white/80 shadow-[0_1px_12px_rgba(148,163,184,0.1)] backdrop-blur-md"
          : "border-b border-slate-100 bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-white shadow-lg shadow-blue-500/25">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </span>
          <span className="bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">
            {t("nav.logo")}
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 after:absolute after:bottom-1.5 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-gradient-to-r after:from-blue-500 after:to-violet-500 after:transition-all hover:after:w-1/2 after:absolute dark:text-slate-500 dark:hover:text-slate-300"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Lang selector */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/50 px-3 py-1.5 text-xs font-semibold text-slate-600 backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white hover:text-slate-800"
              aria-expanded={open}
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {lang === "fi" ? "FI" : "EN"}
              <svg className="h-3 w-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-1.5 min-w-[88px] overflow-hidden rounded-lg border border-slate-200 bg-white/95 p-1 shadow-xl shadow-slate-200/50 backdrop-blur-md">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                      lang === l.code
                        ? "bg-gradient-to-r from-blue-50 to-violet-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    {lang === l.code && (
                      <svg className="h-3.5 w-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA button */}
          <Link href="/chat" className="rounded-xl bg-gradient-to-r from-blue-600 to-gray-100 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:brightness-110 active:scale-[0.98]">
            {t("nav.chat")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <MobileMenu />
      </div>
    </nav>
  );
}

function MobileMenu() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        aria-label="Toggle menu"
      >
        <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute right-4 top-[64px] z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-200/60 backdrop-blur-md">
          <div className="flex flex-col gap-0.5">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="my-2 border-t border-slate-100" />
            <Link href="/chat" className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-gray-100 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
              {t("nav.chat")}
            </Link>
            <div className="mt-3 flex gap-2">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-center text-xs font-semibold transition-colors ${
                    lang === l.code
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
