import nextEnv from "@next/env";
import nodemailer from "nodemailer";

const { loadEnvConfig } = nextEnv;

process.env.NODE_ENV = process.env.NODE_ENV || "development";
loadEnvConfig(process.cwd());

const host = process.env.SMTP_HOST?.trim();
const port = Number.parseInt(process.env.SMTP_PORT || "587", 10);
const tlsServername = process.env.SMTP_TLS_SERVERNAME?.trim();

const mailboxes = [
  {
    label: "office (contact + consultation)",
    user: process.env.SMTP_OFFICE_USER?.trim() || process.env.SMTP_USER?.trim(),
    pass:
      process.env.SMTP_OFFICE_PASS?.trim() || process.env.SMTP_PASS?.trim(),
  },
  {
    label: "jobs (job applications)",
    user: process.env.SMTP_JOBS_USER?.trim(),
    pass: process.env.SMTP_JOBS_PASS?.trim(),
  },
].filter((mailbox) => mailbox.user && mailbox.pass);

if (!host || mailboxes.length === 0) {
  console.error("Missing SMTP_HOST or mailbox credentials.");
  console.error(
    "Set SMTP_HOST plus SMTP_OFFICE_* / SMTP_JOBS_* in .env.local.",
  );
  process.exit(1);
}

let failed = false;

for (const mailbox of mailboxes) {
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: mailbox.user, pass: mailbox.pass },
    requireTLS: port === 587,
    ...(tlsServername ? { tls: { servername: tlsServername } } : {}),
  });

  try {
    await transport.verify();
    console.log(`SMTP connection OK (${mailbox.label})`);
    console.log(`  host: ${host}:${port}`);
    console.log(`  user: ${mailbox.user}`);
    if (tlsServername) console.log(`  tls servername: ${tlsServername}`);
  } catch (error) {
    failed = true;
    console.error(`SMTP connection failed (${mailbox.label}):`);
    console.error(error instanceof Error ? error.message : error);
  }
}

process.exit(failed ? 1 : 0);
