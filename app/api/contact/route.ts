import { NextRequest, NextResponse } from "next/server";
import ratelimit, { getContactLimiter } from "@/lib/ratelimit";
import nodemailer from "nodemailer";

interface ContactBody {
  name: unknown;
  email: unknown;
  message: unknown;
  honeypot?: unknown;
}

// Strip carriage returns and newlines to prevent SMTP header injection
function sanitizeCRLF(input: string): string {
  return input.replace(/[\r\n]/g, "");
}

// Escape HTML entities to prevent XSS in email templates
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER ?? "",
    pass: process.env.SMTP_PASS ?? "",
  },
});

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export async function POST(req: NextRequest) {
  // Rate limiting — 10 requests per minute per IP
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limiterKey = `contact_${ip}`;
  const contactLimiter = getContactLimiter();
  const { success } = await contactLimiter.limit(limiterKey);
  if (!success) {
    return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
  }

  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name : "";
  const email = typeof body.email === "string" ? body.email : "";
  const message = typeof body.message === "string" ? body.message : "";
  const honeypot = typeof body.honeypot === "string" ? body.honeypot : "";

  // Reject honeypot (bot submission)
  if (honeypot) {
    return NextResponse.json({ error: "Validation failed." }, { status: 400 });
  }

  // Required field validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // Email format validation
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
  }

  // Length limits
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return NextResponse.json({ error: "Input exceeds maximum length." }, { status: 400 });
  }

  // Sanitize
  const safeName = sanitizeCRLF(name.trim());
  const safeEmail = sanitizeCRLF(email.trim());
  const safeMessage = sanitizeCRLF(message);

  // SMTP must be configured server-side; don't allow client to set recipients
  if (!process.env.SMTP_TO) {
    console.error("SMTP_TO environment variable is not configured");
    return NextResponse.json({ error: "Server misconfiguration. Please try again later." }, { status: 503 });
  }

  try {
    // Escape HTML before embedding in email template
    const escapedName = escapeHtml(safeName);
    const escapedEmail = escapeHtml(safeEmail);
    const escapedMessage = escapeHtml(safeMessage);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Free AI Contact" <noreply@freeai.example>`,
      to: process.env.SMTP_TO,
      subject: `New contact message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;">
          <h2 style="margin-bottom:8px;">New contact message</h2>
          <p><strong>Name:</strong> ${escapedName}</p>
          <p><strong>Email:</strong> ${escapedEmail}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
          <p style="white-space:pre-wrap;">${escapedMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    console.error("Failed to send contact email");
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 502 });
  }
}
