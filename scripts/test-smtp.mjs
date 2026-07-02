import { loadEnvConfig } from "@next/env";
import nodemailer from "nodemailer";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
loadEnvConfig(process.cwd());

const host = process.env.SMTP_HOST?.trim();
const port = Number.parseInt(process.env.SMTP_PORT || "587", 10);
const user = process.env.SMTP_USER?.trim();
const pass = process.env.SMTP_PASS?.trim();
const tlsServername = process.env.SMTP_TLS_SERVERNAME?.trim();

const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"]
  .filter((name) => !process.env[name]?.trim());

if (missing.length > 0) {
  console.error(`Missing: ${missing.join(", ")}`);
  console.error("Add them to .env.local (copy SMTP_PASS from Vercel production env vars).");
  process.exit(1);
}

const transport = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
  requireTLS: port === 587,
  ...(tlsServername ? { tls: { servername: tlsServername } } : {}),
});

try {
  await transport.verify();
  console.log("SMTP connection OK");
  console.log(`  host: ${host}:${port}`);
  console.log(`  user: ${user}`);
  if (tlsServername) console.log(`  tls servername: ${tlsServername}`);
} catch (error) {
  console.error("SMTP connection failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
