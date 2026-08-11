# Free AI

A 100% free, open-source web application that gives anyone instant access to powerful artificial intelligence — no sign-up, no credit card, no limits.

Chat with Groq's LLaMA models directly from your browser using your own API key. Your key never leaves your device.

---

## Features

- **No sign-up required** — open the page and start chatting immediately
- **Privacy-first** — your Groq API key is stored only in your browser's `localStorage`, never sent to any server other than Groq
- **Multi-language support** — English and Finnish UI with locale-aware translations
- **Open-source** — released under the MIT License
- **Responsive design** — works on desktop and mobile

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, social proof |
| `/chat` | AI chat interface — paste your Groq API key and start chatting |
| `/about` | About Free AI — how it works, why it exists |
| `/contact` | Contact form backed by SMTP (Nodemailer) with anti-spam honeypot |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/cookies` | Cookies & Storage Policy |
| `/license` | MIT License text |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/postcss` |
| Fonts | [Geist](https://vercel.com/font) Sans + Mono via `next/font/google` |
| Email | [Nodemailer](https://nodemailer.com/) for contact form delivery |
| AI Provider | [Groq API](https://groq.com/) — LLaMA-3.3 70B with streaming SSE responses |
| Security | Rate limiting, input sanitization, CSP/HTTP security headers, honeypot anti-spam, API key expiry |

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- A Groq API key — get one free at [console.groq.com/keys](https://console.groq.com/keys)
- SMTP credentials (optional, for contact form)

### Installation

```bash
git clone https://github.com/yourusername/free-ai.git
cd free-ai
npm install
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Deploy

```bash
npm run build   # Optimized production build
npm start        # Start the server
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SMTP_HOST` | No | SMTP host (default: `smtp.gmail.com`) |
| `SMTP_PORT` | No | SMTP port (default: `587`) |
| `SMTP_SECURE` | No | Use SSL/TLS (default: `false`) |
| `SMTP_USER` | No | SMTP username |
| `SMTP_PASS` | No | SMTP password (App Password) |
| `SMTP_FROM` | No | Sender address for contact emails |
| `SMTP_TO` | No | Recipient address for contact form submissions |

---

## Security Features

- **Rate limiting** on all public API routes — 30 req/min for chat, 10 req/min for contact
- **CSP + HTTP security headers** — prevents XSS, clickjacking, MIME sniffing
- **Input sanitization** — HTML escaping, CRLF stripping, length limits on all inputs
- **Honeypot anti-spam** on the contact form
- **Groq error mapping** — raw provider errors are never shown to end users
- **API key expiry** — stored keys automatically expire after 30 days

---

## How It Works

1. User visits `/chat` and enters their own Groq API key → stored in browser `localStorage`
2. When sending a message, the key travels from the client through our serverless route (`/api/chat`) to Groq's streaming API
3. Responses stream back via Server-Sent Events for instant display

Your API key **never touches our servers** — it travels only: your browser → our proxy → Groq → back. We have no access to it.

---

## License

[MIT](https://opensource.org/licenses/MIT) — free to use, modify, and distribute.
