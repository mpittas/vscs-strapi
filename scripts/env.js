#!/usr/bin/env node
/**
 * Env secrets sync via encrypted file in git (dotenvx-style).
 *
 *   node scripts/env.js push   Encrypt .env files -> env.enc.json (commit it)
 *   node scripts/env.js pull   Decrypt env.enc.json -> .env files
 *
 * The encryption key lives in .env.key (gitignored). It is generated on the
 * first `push` and must be copied once to each new machine.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const ENV_FILES = [
  { id: "frontend", file: ".env.local" },
  { id: "frontendProduction", file: ".env.production" },
  { id: "backend", file: "backend/.env" },
];

const ENC_FILE = path.join(root, "env.enc.json");
const KEY_FILE = path.join(root, ".env.key");

// ---------------------------------------------------------------- crypto

function deriveKey(password, salt) {
  return crypto.scryptSync(password, salt, 32, {
    N: 16384,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024,
  });
}

function encrypt(plaintext, password) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", deriveKey(password, salt), iv);
  const data = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return {
    v: 1,
    salt: salt.toString("base64"),
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    data: data.toString("base64"),
  };
}

function decrypt(box, password) {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    deriveKey(password, Buffer.from(box.salt, "base64")),
    Buffer.from(box.iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(box.tag, "base64"));
  try {
    return Buffer.concat([
      decipher.update(Buffer.from(box.data, "base64")),
      decipher.final(),
    ]).toString("utf8");
  } catch {
    throw new Error("Decryption failed — wrong key in .env.key (or corrupted env.enc.json).");
  }
}

// ------------------------------------------------------------------ key

function readKey() {
  if (process.env.ENV_KEY) return process.env.ENV_KEY.trim();
  if (fs.existsSync(KEY_FILE)) {
    return fs.readFileSync(KEY_FILE, "utf8").replace(/^\uFEFF/, "").trim();
  }
  return null;
}

function ensureKey() {
  const existing = readKey();
  if (existing) return { key: existing, created: false };

  const key = crypto.randomBytes(32).toString("base64url");
  fs.writeFileSync(KEY_FILE, `${key}\n`, "utf8");
  return { key, created: true };
}

// ------------------------------------------------------------- commands

function push() {
  const files = {};
  for (const { id, file } of ENV_FILES) {
    const abs = path.join(root, file);
    if (fs.existsSync(abs)) {
      files[id] = { file, content: fs.readFileSync(abs, "utf8").replace(/\r\n/g, "\n") };
    }
  }

  if (Object.keys(files).length === 0) {
    console.error("✗ No env files found (.env.local, .env.production, backend/.env).");
    process.exit(1);
  }

  const { key, created } = ensureKey();
  const payload = JSON.stringify({ exportedAt: new Date().toISOString(), files });
  fs.writeFileSync(ENC_FILE, `${JSON.stringify(encrypt(payload, key), null, 2)}\n`, "utf8");

  console.log("Encrypted env -> env.enc.json\n");
  for (const { file } of Object.values(files)) console.log(`  ✓ ${file}`);
  if (created) {
    console.log(`\n  Generated new key: .env.key (gitignored)`);
    console.log("  Copy .env.key once to your other machine (AirDrop, password manager).");
  }
  console.log(`\nNext:
  git add env.enc.json
  git commit -m "Update env secrets"
  git push`);
}

function pull({ force = false, quiet = false } = {}) {
  if (!fs.existsSync(ENC_FILE)) {
    if (quiet) return;
    console.error("✗ env.enc.json not found. Run `npm run env:push` on the machine that has the secrets.");
    process.exit(1);
  }

  const key = readKey();
  if (!key) {
    if (quiet) return;
    console.error(`✗ Missing .env.key — copy it from your other machine into the project root.
  (Or set the ENV_KEY environment variable.)`);
    process.exit(1);
  }

  let payload;
  try {
    payload = JSON.parse(decrypt(JSON.parse(fs.readFileSync(ENC_FILE, "utf8")), key));
  } catch (error) {
    if (quiet) return;
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }

  const written = [];
  const skipped = [];

  for (const { id, file } of ENV_FILES) {
    const entry = payload.files?.[id];
    if (!entry?.content) continue;

    const abs = path.join(root, file);
    if (fs.existsSync(abs) && !force) {
      skipped.push(file);
      continue;
    }
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, entry.content, "utf8");
    written.push(file);
  }

  if (quiet) return;

  console.log("Restored env from env.enc.json\n");
  for (const file of written) console.log(`  ✓ ${file}`);
  if (skipped.length) {
    console.log(`\n  Skipped (already exist — use \`npm run env:pull -- --force\` to overwrite):`);
    for (const file of skipped) console.log(`    - ${file}`);
  }
  console.log("\nNext: npm run dev");
}

// ---------------------------------------------------------------- main

const [cmd, ...rest] = process.argv.slice(2);
const force = rest.includes("--force") || rest.includes("-f");
const quiet = rest.includes("--quiet");

if (cmd === "push") push();
else if (cmd === "pull") pull({ force, quiet });
else {
  console.log(`Usage:
  npm run env:push              Encrypt env files -> env.enc.json (then commit)
  npm run env:pull              Restore env files (skips existing)
  npm run env:pull -- --force   Restore and overwrite existing`);
  process.exit(cmd ? 1 : 0);
}
