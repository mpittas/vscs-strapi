#!/usr/bin/env node
/**
 * One-step setup for Windows and macOS:
 * checks Node, installs deps, restores env secrets if possible.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const backend = path.join(root, "backend");

function run(command, cwd) {
  console.log(`\n> ${command}`);
  execSync(command, { cwd, stdio: "inherit", shell: true });
}

// Node version
const major = parseInt(process.versions.node.split(".")[0], 10);
if (major < 20 || major > 24) {
  console.error(`✗ Node.js ${process.versions.node} is not supported. Use Node 20-24 (see .nvmrc).`);
  process.exit(1);
}
console.log(`✓ Node.js ${process.versions.node}`);

if (process.platform === "darwin") {
  console.log("ℹ macOS: if backend install fails, run: xcode-select --install");
}
if (process.platform === "win32") {
  console.log("ℹ Windows: if backend install fails, install VS Build Tools (C++ workload).");
}

console.log("\nInstalling frontend dependencies…");
run("npm install", root);

console.log("\nInstalling backend dependencies…");
run("npm install", backend);

// Restore env secrets from the encrypted bundle if a key is available
console.log("\nRestoring env secrets…");
try {
  run("node scripts/env.js pull", root);
} catch {
  console.log(`
⚠ Env secrets not restored. To fix:
  1. Copy .env.key from your other machine into the project root
  2. Run: npm run env:pull
  (Or create .env.local and backend/.env manually from the .example files.)`);
}

console.log(`
Setup complete!

  npm run dev
    Frontend:  http://localhost:3000
    Strapi:    http://localhost:1337/admin
`);
