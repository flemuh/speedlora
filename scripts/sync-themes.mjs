#!/usr/bin/env node
/** Explicit two-mode application snapshots. Never overwrite independently evolved apps by default. */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const ecosystem = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const manifest = ['colors.css','switcher.css','theme.ts','ThemeSwitcher.tsx'];
const destinations = {
  'colors.css':'styles/theme/colors.css',
  'switcher.css':'styles/theme/switcher.css',
  'theme.ts':'theme/theme.ts',
  'ThemeSwitcher.tsx':'theme/ThemeSwitcher.tsx',
};
const apply = process.argv.includes('--apply');
if (apply && !process.argv.includes('--confirm-reviewed')) {
  console.error('Refusing overwrite: review all diffs first, then pass --apply --confirm-reviewed.');
  process.exit(2);
}
let drift=0, missing=0;
for (const app of ['life','research']) {
  for (const name of manifest) {
    const from=resolve(ecosystem,`speedlora/brand/design-system/apps/${app}/${name}`);
    const to=resolve(ecosystem,`speedlora-${app}/apps/web/src/${destinations[name]}`);
    if (!existsSync(to)) { missing++; console.error(`MISSING sibling destination: ${to}`); continue; }
    const expected=readFileSync(from), current=readFileSync(to);
    if (!expected.equals(current)) {
      drift++;
      console.log(`DIFF ${app}/${name}: ${to}`);
      if (apply) { mkdirSync(dirname(to),{recursive:true});writeFileSync(to,expected); }
    }
  }
}
if (missing) process.exitCode=2;
else if (drift && !apply) { console.error(`${drift} snapshots differ. No modifications made.`); process.exitCode=1; }
else console.log(`${apply?'Explicitly synchronized':'Matched'} 8/8 app-specific source snapshots; no palette overwritten in check mode.`);
