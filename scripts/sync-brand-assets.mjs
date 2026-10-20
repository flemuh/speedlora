#!/usr/bin/env node
/** Copy/check only active canonical image assets into separately deployable apps. */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const mappings = [
  ["speedlora/brand/speedlora-mascot.png", "speedlora-life/apps/web/public/brand/speedlora-mascot.png"],
  ["speedlora/brand/speedlora-mascot.png", "speedlora-research/apps/web/public/brand/speedlora-mascot.png"],
  ["speedlora/brand/assets/backgrounds/research-hero-cosmic.webp", "speedlora-research/apps/web/public/brand/research-hero-cosmic.webp"],
];
const apply = process.argv.includes('--apply');
if (apply && !process.argv.includes('--confirm-reviewed')) {
  console.error('Refusing media overwrite until --apply --confirm-reviewed is passed.');
  process.exit(2);
}
const check = !apply; // review-only unless explicit consent
let drift = 0;
for (const [source, dest] of mappings) {
  const bytes = readFileSync(resolve(root, source));
  let current;
  try { current = readFileSync(resolve(root, dest)); } catch { current = null; }
  if (!current || !bytes.equals(current)) {
    drift++;
    if (!check) { mkdirSync(dirname(resolve(root, dest)), {recursive: true}); writeFileSync(resolve(root, dest), bytes); }
    console.log(`${check ? "OUT OF SYNC" : "SYNCED"}: ${dest}`);
  }
}
if (drift === 0) console.log("Brand media copies match canonical files (3/3).");
if (check && drift) process.exitCode = 1;
