#!/usr/bin/env node
/**
 * Cross-platform one-step setup for Windows and macOS.
 * Installs dependencies, creates env files, and prints next steps.
 */

const { execSync } = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const backend = path.join(root, "backend");

const isMac = process.platform === "darwin";
const isWindows = process.platform === "win32";

function log(msg) {
  console.log(msg);
}

function fail(msg) {
  console.error(`\n✗ ${msg}`);
  process.exit(1);
}

function run(command, cwd = root) {
  log(`\n> ${command}`);
  execSync(command, { cwd, stdio: "inherit", shell: true });
}

function checkNode() {
  const version = process.versions.node;
  const major = parseInt(version.split(".")[0], 10);

  if (major < 20 || major > 24) {
    fail(
      `Node.js ${version} is not supported. Install Node 20, 22, or 24 (see .nvmrc).`,
    );
  }

  log(`✓ Node.js ${version}`);
}

function checkBuildTools() {
  if (isMac) {
    log("ℹ macOS: If backend install fails, run: xcode-select --install");
  }
  if (isWindows) {
    log(
      "ℹ Windows: If backend install fails, install Visual Studio Build Tools (C++ workload).",
    );
  }
}

function randomSecret() {
  return crypto.randomBytes(32).toString("base64url");
}

function createEnvFile(examplePath, targetPath, transform) {
  const targetName = path.relative(root, targetPath);

  if (fs.existsSync(targetPath)) {
    log(`✓ ${targetName} already exists — skipped`);
    return;
  }

  if (!fs.existsSync(examplePath)) {
    fail(`Missing template: ${path.relative(root, examplePath)}`);
  }

  let content = fs.readFileSync(examplePath, "utf8");
  if (transform) {
    content = transform(content);
  }

  fs.writeFileSync(targetPath, content, "utf8");
  log(`✓ Created ${targetName}`);
}

function setupFrontendEnv() {
  createEnvFile(
    path.join(root, ".env.example"),
    path.join(root, ".env.local"),
  );
}

function setupBackendEnv() {
  const revalidateSecret = randomSecret();

  createEnvFile(
    path.join(backend, ".env.example"),
    path.join(backend, ".env"),
    (content) =>
      content
        .replace(
          "APP_KEYS=toBeModified1,toBeModified2",
          `APP_KEYS=${randomSecret()},${randomSecret()}`,
        )
        .replace(/API_TOKEN_SALT=tobemodified/g, `API_TOKEN_SALT=${randomSecret()}`)
        .replace(
          /ADMIN_JWT_SECRET=tobemodified/g,
          `ADMIN_JWT_SECRET=${randomSecret()}`,
        )
        .replace(
          /TRANSFER_TOKEN_SALT=tobemodified/g,
          `TRANSFER_TOKEN_SALT=${randomSecret()}`,
        )
        .replace(
          /ENCRYPTION_KEY=tobemodified/g,
          `ENCRYPTION_KEY=${randomSecret()}`,
        )
        .replace(
          "WEBHOOK_TOKEN=dev-secret-change-me",
          `WEBHOOK_TOKEN=${revalidateSecret}`,
        ),
  );

  const frontendEnvPath = path.join(root, ".env.local");
  if (fs.existsSync(frontendEnvPath)) {
    let frontendEnv = fs.readFileSync(frontendEnvPath, "utf8");
    if (frontendEnv.includes("REVALIDATE_SECRET=dev-secret-change-me")) {
      frontendEnv = frontendEnv.replace(
        "REVALIDATE_SECRET=dev-secret-change-me",
        `REVALIDATE_SECRET=${revalidateSecret}`,
      );
      fs.writeFileSync(frontendEnvPath, frontendEnv, "utf8");
      log("✓ Synced REVALIDATE_SECRET between frontend and backend");
    }
  }
}

function main() {
  log("VSCS — project setup\n");

  checkNode();
  checkBuildTools();

  log("\nInstalling frontend dependencies…");
  run("npm install", root);

  log("\nInstalling backend dependencies…");
  run("npm install", backend);

  log("\nCreating environment files…");
  setupFrontendEnv();
  setupBackendEnv();

  log(`
Setup complete!

Next steps:
  1. Start both servers:  npm run dev
  2. Open frontend:       http://localhost:3000
  3. Open Strapi admin:   http://localhost:1337/admin
     (create an admin account on first visit)

Optional:
  - Frontend only:  npm run dev:frontend
  - Backend only:   npm run dev:backend
  - Strapi config:  see STRAPI_SETUP.md

Requirements: Node.js 20–24 (22 recommended — see .nvmrc)
`);
}

main();
