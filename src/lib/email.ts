import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { NextRequest } from "next/server";

const DEFAULT_RECIPIENT = "office@vscs-bg.com";
const MAX_TEXT_LENGTH = 10_000;
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const ALLOWED_ATTACHMENT_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const rateLimitStore = new Map<string, number[]>();

let transporter: Transporter<SMTPTransport.SentMessageInfo> | null = null;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizeField(
  value: FormDataEntryValue | string | null | undefined,
  maxLength = 500,
): string {
  if (value == null) return "";
  const text = String(value).trim();
  return text.slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return false;
}

export function isHoneypotTriggered(value: string | null | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

export function getFormRecipients(): string[] {
  const configured = process.env.SMTP_TO?.trim() || DEFAULT_RECIPIENT;

  const recipients = configured
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  return recipients.length > 0 ? recipients : [DEFAULT_RECIPIENT];
}

export function getFormBccRecipients(): string[] {
  const configured = process.env.SMTP_BCC?.trim() || "";

  if (!configured) {
    return [];
  }

  return configured
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function getSmtpConfig(): SMTPTransport.Options {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number.parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const tlsServername = process.env.SMTP_TLS_SERVERNAME?.trim();

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured");
  }

  const config: SMTPTransport.Options = {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    requireTLS: port === 587,
  };

  if (tlsServername) {
    config.tls = { servername: tlsServername };
  }

  return config;
}

export function getMailTransporter(): Transporter<SMTPTransport.SentMessageInfo> {
  if (!transporter) {
    transporter = nodemailer.createTransport(getSmtpConfig());
  }

  return transporter;
}

export function buildHtmlEmail(
  title: string,
  fields: Array<{ label: string; value: string }>,
): string {
  const rows = fields
    .filter((field) => field.value.length > 0)
    .map(
      (field) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;">${escapeHtml(field.label)}</td><td style="padding:8px 12px;white-space:pre-wrap;">${escapeHtml(field.value)}</td></tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="bg">
  <body style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.5;">
    <h2 style="margin:0 0 16px;">${escapeHtml(title)}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:640px;">
      <tbody>${rows}</tbody>
    </table>
  </body>
</html>
  `.trim();
}

export function buildPlainTextEmail(
  title: string,
  fields: Array<{ label: string; value: string }>,
): string {
  const rows = fields
    .filter((field) => field.value.length > 0)
    .map((field) => `${field.label}: ${field.value}`)
    .join("\n");

  return `${title}\n\n${rows}`;
}

export async function validateAttachment(file: File | null): Promise<{
  filename: string;
  content: Buffer;
} | null> {
  if (!file || file.size === 0) {
    return null;
  }

  if (file.size > MAX_ATTACHMENT_BYTES) {
    throw new Error("Attachment is too large");
  }

  if (!ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
    throw new Error("Unsupported attachment type");
  }

  const filename = file.name.replace(/[^\w.\-() ]+/g, "_").slice(0, 120);
  const bytes = await file.arrayBuffer();

  return {
    filename,
    content: Buffer.from(bytes),
  };
}

export async function sendFormEmail(options: {
  subject: string;
  title: string;
  fields: Array<{ label: string; value: string }>;
  replyTo?: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
}): Promise<void> {
  const smtpUser = process.env.SMTP_USER?.trim() || "office@vscs-bg.com";
  const from =
    process.env.SMTP_FROM?.trim() || `"VSCS Website" <${smtpUser}>`;
  const transporterInstance = getMailTransporter();
  const bcc = getFormBccRecipients();

  await transporterInstance.sendMail({
    from,
    to: getFormRecipients(),
    bcc: bcc.length > 0 ? bcc : undefined,
    replyTo: options.replyTo,
    subject: options.subject.slice(0, 200),
    html: buildHtmlEmail(options.title, options.fields),
    text: buildPlainTextEmail(options.title, options.fields),
    attachments: options.attachments,
  });
}

export function validateMessageLength(message: string): boolean {
  return message.length <= MAX_TEXT_LENGTH;
}
