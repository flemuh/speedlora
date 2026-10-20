# SpeedLora™ Brand Assets

This directory contains the official public brand assets for SpeedLora™.

SpeedLora is an independent AI-focused engineering and research ecosystem combining proprietary products, public technical work, experimentation, evaluation, and evidence-driven learning.

The visual identity is built around themes such as:

- artificial intelligence;
- research;
- experimentation;
- discovery;
- learning;
- evaluation;
- engineering;
- progress.

---

## Official assets

### Logo

`speedlora-logo.svg`

The primary SpeedLora logo and wordmark. It is the neutral umbrella identifier for the whole ecosystem and is intended for headers, footers and product identity without a product-specific tagline.

### Active mascot — Neon Robot with Tablet (Brand v6)

`speedlora-mascot.png` is the current canonical web-optimized **transparent PNG** mascot: a friendly white-and-blue robot with blue neon accents, star-shaped ear displays, the SpeedLora emblem, and a tablet. It replaces the former mascot as the active product character.

The exact submitted original image is preserved at `assets/mascot/current/mascot-neon-tablet-source.png`. The root PNG is a display derivative with transparent margins trimmed; the artwork itself has not been redesigned. Life references the display PNG on its Today hero. Research references it on the research index, while the Research home background already includes the same robot — **do not overlay a second robot on the homepage hero**.

### Research home cosmic background — Brand v6

`assets/backgrounds/research-hero-cosmic.webp` is the web-optimized active Research hero background; `assets/backgrounds/research-hero-space-source.png` preserves the full supplied illustration. The composition leaves reading space on the left and shows the new robot, tablet and planet on the right. Research keeps a deployed copy at `apps/web/public/brand/research-hero-cosmic.webp`.

### Archived identities (not active mascots)

- `assets/mascot/legacy/speedlora-mascot-v5.png`: former canonical robot.
- `assets/characters/archive/speedlora-female-ambassador-v5.png`: professional female character, preserved **only** in central brand archive. It must not be imported into active Life/Research pages or used as a mascot.
- `assets/backgrounds/legacy/research-hero-cosmic-v5.webp`: former Research landing background.

These assets are retained for history and controlled future brand reference, not as current interface artwork.

### Current two-mode visual system

`design-system/apps/{life,research}/` holds the approved current tokens and runtime theme controllers for the two independent applications. They intentionally differ in some surface, status, focus and accessibility tokens; never replace them with one obsolete shared file.

### Asset roles

- **Logo / wordmark:** primary identifier; appropriate for headers, footers, navigation and product identity.
- **Mascot:** friendly product/learning character; use selectively where a warmer brand presence helps the experience.
- **Archived female ambassador:** preserved in the brand archive only; not used in current product interfaces.

These roles remain separate: **logo ≠ active mascot ≠ archived characters**. See `BRAND_ASSET_MANIFEST.md` for deployment copy checks.

---

## Research identity

> **Research at AI speed.**

Supporting principle:

> **Test. Measure. Learn. Publish.**

Public research is selectively released. This does not imply that private product source code, the complete Master Plan, internal datasets, personal learning data, proprietary infrastructure, or all research implementation is public.

---

## Brand status

These files represent the current public SpeedLora visual identity. Future revisions may refine the brand while Git history preserves earlier releases.

---

## Usage

The SpeedLora™ name, logo, symbol, mascot, visual identity, and associated brand assets are proprietary brand identifiers.

Publication of these files does not grant permission to copy, modify, redistribute, sublicense, commercially exploit, or use these assets in connection with another product, service, company, website, application, or organization.

See:

- [`../LICENSE`](../LICENSE)
- [`../TRADEMARK.md`](../TRADEMARK.md)

---

## Official websites

- https://speedlora.com
- https://speedlora.app
- https://speedlora.com.br

The primary public domain is **https://speedlora.com**.

---

© 2026 Fernando Humel Procópio. All rights reserved.

### Two selectable themes (current)

**SoftLight** (default light) and **SpeedLora** (dark blue/violet) are the two active themes in Life and Research. Product-specific, approved theme snapshots are versioned under `design-system/apps/life/` and `design-system/apps/research/`. The former three-theme common palette is retired and **must not** overwrite the current CSS. See [`design-system/SCHEMES.md`](design-system/SCHEMES.md).
