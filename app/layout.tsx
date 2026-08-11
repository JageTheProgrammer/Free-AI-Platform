import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Free AI — AI for Everyone",
    template: "%s | Free AI",
  },
  description:
    "Access powerful artificial intelligence tools completely free. No sign-up, no credit card — just type and get answers from Groq's LLaMA models directly in your browser.",
  keywords: [
    "free AI",
    "AI chat",
    "Groq",
    "LLaMA",
    "open source AI",
    "free AI assistant",
    "no signup AI",
    "AI tool",
    "chatbot",
    "language model",
    "machine learning",
    "Jaakko Maatiala",
    "Maatiala",
    "AI for everyone",
    "AI for free",
  ],
  authors: [{ name: "Free AI Contributors - Jaakko Maatiala" }],
  creator: "Jaakko Maatiala",
  publisher: "Jaakko Maatiala",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ai.maatiala.dev"
  ),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fi: "/",
    },
  },
  openGraph: {
    title: "Free AI — AI for Everyone",
    description:
      "Powerful AI tools, completely free. No sign-up required — start chatting with Groq's LLaMA models in under 10 seconds.",
    type: "website",
    locale: "en_US",
    siteName: "Free AI",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Free AI — AI for Everyone",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI — AI for Everyone",
    description:
      "Access powerful AI tools completely free. No sign-up, no credit card.",
    images: ["/og.png"],
    creator: "@free_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}