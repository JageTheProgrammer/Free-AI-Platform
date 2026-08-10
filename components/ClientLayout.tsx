"use client";

import { LangProvider } from "../i18n/useTranslations";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <LangProvider>{children}</LangProvider>;
}