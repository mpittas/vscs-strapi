#!/usr/bin/env node
/**
 * Stdio MCP bridge for Cursor → local Strapi MCP (loads token from .env.local).
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadToken() {
  for (const envFile of ['.env.local', '.env']) {
    const envPath = path.join(root, envFile);
    if (!fs.existsSync(envPath)) continue;

    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('STRAPI_MCP_ADMIN_TOKEN=')) continue;
      return trimmed.slice('STRAPI_MCP_ADMIN_TOKEN='.length).trim();
    }
  }

  throw new Error('Missing STRAPI_MCP_ADMIN_TOKEN in .env.local');
}

const token = loadToken();
const url = process.env.STRAPI_MCP_URL || 'http://localhost:1337/mcp';

const child = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['-y', 'mcp-remote', url, '--header', `Authorization: Bearer ${token}`],
  { stdio: 'inherit', env: process.env },
);

child.on('exit', (code) => process.exit(code ?? 1));
