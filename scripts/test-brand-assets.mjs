#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const read = path => readFileSync(resolve(root, path));
const text = path => read(path).toString('utf8');
const mascot = read('speedlora/brand/speedlora-mascot.png');
const hero = read('speedlora/brand/assets/backgrounds/research-hero-cosmic.webp');
const tests = [
 ['active logo preserved', ()=> assert.ok(existsSync(resolve(root,'speedlora/brand/speedlora-logo.svg')))],
 ['canonical mascot is PNG', ()=> assert.equal(mascot.subarray(0,8).toString('hex'),'89504e470d0a1a0a')],
 ['canonical cosmic image is WebP', ()=> {assert.equal(hero.toString('ascii',0,4),'RIFF');assert.equal(hero.toString('ascii',8,12),'WEBP');}],
 ['Life mascot copy synced', ()=> assert.ok(mascot.equals(read('speedlora-life/apps/web/public/brand/speedlora-mascot.png')))],
 ['Research mascot copy synced', ()=> assert.ok(mascot.equals(read('speedlora-research/apps/web/public/brand/speedlora-mascot.png')))],
 ['Research hero copy synced', ()=> assert.ok(hero.equals(read('speedlora-research/apps/web/public/brand/research-hero-cosmic.webp')))],
 ['female preserved in archive',()=>assert.ok(existsSync(resolve(root,'speedlora/brand/assets/characters/archive/speedlora-female-ambassador-v5.png')))],
 ['female absent from active brand + Research',()=>{assert.equal(existsSync(resolve(root,'speedlora/brand/speedlora-secondary-character.png')),false);assert.equal(existsSync(resolve(root,'speedlora-research/apps/web/public/brand/speedlora-secondary-character.png')),false);}],
 ['previous robot preserved in archive',()=>assert.ok(existsSync(resolve(root,'speedlora/brand/assets/mascot/legacy/speedlora-mascot-v5.png')))],
 ['old Research hero preserved',()=>assert.ok(existsSync(resolve(root,'speedlora/brand/assets/backgrounds/legacy/research-hero-cosmic-v5.webp')))],
 ['unaltered robot source retained',()=>assert.ok(existsSync(resolve(root,'speedlora/brand/assets/mascot/current/mascot-neon-tablet-source.png')))],
 ['unaltered cosmic source retained',()=>assert.ok(existsSync(resolve(root,'speedlora/brand/assets/backgrounds/research-hero-space-source.png')))],
 ['Life hero avoids redundant mascot markup when original cosmic image includes mascot',()=> { const today=text('speedlora-life/apps/web/src/views/TodayView.tsx');assert.doesNotMatch(today,/<img[^>]+today-hero-mascot/); assert.match(text('speedlora-life/apps/web/src/styles/theme/overrides.css'),/life-hero-space\.webp/); }],
 ['Research tablet mascot exists as optimized WebP',()=> { const img=read('speedlora-research/apps/web/public/brand/speedlora-mascot-tablet.webp');assert.equal(img.toString('ascii',0,4),'RIFF');assert.equal(img.toString('ascii',8,12),'WEBP'); }],
 ['Life cosmic hero loads optimized source without double mascot',()=> {assert.match(text('speedlora-life/apps/web/src/styles/theme/overrides.css'),/life-hero-space\.webp/);assert.match(text('speedlora-life/apps/web/src/styles/theme/overrides.css'),/today-hero-mascot \{ display:none; \}/);const img=read('speedlora-life/apps/web/public/brand/life-hero-space.webp');assert.equal(img.toString('ascii',0,4),'RIFF');assert.equal(img.toString('ascii',8,12),'WEBP');}],
 ['Research homepage uses canonical cosmic image',()=>{ assert.match(text('speedlora-research/apps/web/src/styles/pages/home.css'),/research-hero-cosmic\.webp/); }],
 ['no active character references',()=> {
  for (const p of ['speedlora-life/apps/web/src/views/TodayView.tsx','speedlora-research/apps/web/src/pages/HomePage.tsx','speedlora-research/apps/web/src/pages/ResearchPage.tsx'])
   assert.equal(text(p).includes('speedlora-secondary-character'),false);
 }],
 ['brand source documented',()=>assert.match(text('speedlora/brand/BRAND_ASSET_MANIFEST.md'),/mascot-neon-tablet-source\.png/)],
];
let passed=0;
for (const [label,fn] of tests) {try {fn();passed++; console.log('PASS',label)}catch(e){console.error('FAIL',label,e.message);process.exitCode=1;}}
console.log(`${passed}/${tests.length} brand asset checks PASS`);
