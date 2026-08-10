/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useContext, useState, useEffect, useCallback, createContext } from "react";
import en from "../texts/en.json";
import fi from "../texts/fi.json";

function flatten(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      result[fullKey] = value;
    } else if (typeof value === "object" && value !== null) {
      Object.assign(result, flatten(value as Record<string, unknown>, fullKey));
    }
  }
  return result;
}

const dictEn = flatten(en);
const dictFi = flatten(fi);

interface LangContextValue {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("free-ai-lang");
    if (stored === "en" || stored === "fi") {
      setLangState(stored);
    }
  }, []);

  const setLang = useCallback((newLang: string) => {
    setLangState(newLang);
    localStorage.setItem("free-ai-lang", newLang);
  }, []);

  // t() now depends on `lang` directly — no stale ref, always in sync with render
  const t = useCallback(
    (key: string): string => {
      const dict = lang === "fi" ? dictFi : dictEn;
      return dict[key] ?? key;
    },
    [lang],
  );

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}