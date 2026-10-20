# SpeedLora Brand v6 — Media Asset Manifest

This is the source of truth for the **active** mascot and Research hero image. The active SpeedLora logo is preserved. Legacy Balanced/Ocean/Aurora themes were replaced by two current SoftLight/SpeedLora palettes.

| Source (in `speedlora/brand/`) | Installed destination | Usage |
|---|---|---|
| `speedlora-mascot.png` | `speedlora-life/apps/web/public/brand/speedlora-mascot.png` | Canonical mascot copy; current Today hero may use the optimized composite instead |
| `speedlora-mascot.png` | `speedlora-research/apps/web/public/brand/speedlora-mascot.png` | Canonical mascot copy; current pages may use a separate optimized WebP derivative |
| `assets/backgrounds/research-hero-cosmic.webp` | `speedlora-research/apps/web/public/brand/research-hero-cosmic.webp` | Research Home cosmic hero background (contains robot) |

## Originals and archive

- `assets/mascot/current/mascot-neon-tablet-source.png`: untouched supplied robot artwork with transparent canvas.
- `assets/backgrounds/research-hero-space-source.png`: untouched supplied cosmic composition.
- `assets/mascot/legacy/speedlora-mascot-v5.png`: previous robot, **inactive**.
- `assets/characters/archive/speedlora-female-ambassador-v5.png`: former secondary character, **inactive**; never import into current Life/Research pages.
- `assets/backgrounds/legacy/research-hero-cosmic-v5.webp`: former hero, **inactive**.

For deliberate visual changes, review the canonical asset and all destination diffs. Both tools are non-mutating checks by default; only use `--apply --confirm-reviewed` after visual approval:

```bash
node speedlora/scripts/sync-brand-assets.mjs --check
node speedlora/scripts/sync-themes.mjs --check
node speedlora/scripts/test-themes.mjs
# After explicit review only:
# node speedlora/scripts/sync-brand-assets.mjs --apply --confirm-reviewed
```

These commands operate on the cumulative ecosystem folder containing the four sibling repositories. They do not push to GitHub automatically. Keep branding distinct from research claims: no synthetic benchmark results should appear in public Research materials.
