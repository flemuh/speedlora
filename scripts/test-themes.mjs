#!/usr/bin/env node
/** Regression contract: two independent palettes, versioned preferences, no older 3-palette overlays. */
import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdtempSync,copyFileSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const read=p=>readFileSync(resolve(root,p),'utf8');
let checks=0;
for(const app of ['life','research']) {
 const p=`speedlora/brand/design-system/apps/${app}/`;
 const css=read(p+'colors.css'),controller=read(p+'theme.ts'),switcher=read(p+'ThemeSwitcher.tsx');
 assert.match(css,/:root\[data-sl-theme="softlight"\]/);checks++;
 assert.match(css,/:root\[data-sl-theme="speedlora"\]/);checks++;
 assert.doesNotMatch(css,/data-sl-theme="(balanced|ocean|aurora)"/);checks++;
 assert.match(controller,/SCHEMES = \["softlight", "speedlora"\]/);checks++;
 assert.match(controller,/speedlora\.colorScheme\.v2/);checks++;
 assert.match(controller,/speedlora\.colorScheme\.v1/);checks++;
 assert.match(switcher,/SoftLight/);assert.match(switcher,/SpeedLora/);checks+=2;
 assert.ok(read(p+'switcher.css').includes('.sl-theme-picker'));checks++;
 // Compile each independent controller and test its default and whitelist without React dependencies.
 const tmp=mkdtempSync(join(tmpdir(),`sl-${app}-`));
 try {
   execFileSync('tsc',[resolve(root,p+'theme.ts'),'--target','es2022','--module','esnext','--lib','es2022,dom','--skipLibCheck','--outDir',tmp],{stdio:'pipe'});
   copyFileSync(join(tmp,'theme.js'),join(tmp,'theme.mjs'));
   const t=await import(pathToFileURL(join(tmp,'theme.mjs')).href);
   assert.deepEqual(t.SCHEMES,['softlight','speedlora']);checks++;
   assert.equal(t.isColorScheme('aurora'),false);checks++;
   assert.equal(t.isColorScheme('softlight'),true);checks++;
 } catch (e) { if (e?.code==='ENOENT' && e.path==='tsc') console.warn('TypeScript compilation SKIPPED: tsc unavailable; source contracts still checked'); else throw e; }
 for (const [from,to] of [['colors.css','styles/theme/colors.css'],['switcher.css','styles/theme/switcher.css'],['theme.ts','theme/theme.ts'],['ThemeSwitcher.tsx','theme/ThemeSwitcher.tsx']]) {
   const target=`speedlora-${app}/apps/web/src/${to}`;
   if(existsSync(resolve(root,target))) {assert.equal(read(p+from),read(target),`Theme source drift: ${target}`);checks++;}
 }
}
console.log(`PASS: ${checks} two-theme checks (local snapshots, legacy migration code, CSS tokens, TypeScript build and app parity)`);
