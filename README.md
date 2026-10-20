# SpeedLora — Brand and shared identity

**SpeedLora** is the umbrella for an engineering portfolio, personal operating tools and independent technical research. The professional story leads with **PHP/Laravel Backend and Full Stack (Vue.js/TypeScript)**; Python, AWS, coding-agent evaluation and research add technical depth. The brand does not imply that all prototypes are finished or that experiments have been independently validated.

## Repositories and responsibility

| Repository | Responsibility | Visibility |
|---|---|---|
| `speedlora` | Official identity, approved artwork, app-specific design tokens, brand source checks | Public |
| `speedlora-research` | Public portfolio, approved case studies, research publications and private editing/admin | Public site; protected admin |
| `speedlora-life` | Tasks, Routines, Courses, Projects, Gates, Today/Week, private planning | Private application/repo |
| `speedlora-english` | Separate English-learning product under development; Life integration is future work | Independent; do not assume deployed |

The Research public site is associated with `https://speedlora.com`. The Life and Research projects are deployed independently and keep their own SQLite data, authentication and secrets. This repository is **not** an orchestrator and must not contain personal task YAML, customer data or server secrets.

## Current identity (15 October 2026)

- The canonical active logo and neon-robot mascot live under [`brand/`](brand/README.md). Historical mascot and character imagery stays in the archive, not in live pages.
- Exactly **two** approved appearance choices: **SoftLight** (default light theme) and **SpeedLora** (blue-violet dark theme), stored per origin under `speedlora.colorScheme.v2`. Previous v1 preferences migrate locally.
- Life and Research have **different, legitimate overrides**. The canonical, **app-specific snapshots** live under `brand/design-system/apps/{life,research}/`. Do not overwrite one app's theme with the other's palette.
- Research Q7.11 includes a project-image carousel (3 s for multiple images, still image for single cover, arrows and zoom). This is product UI; no changes to the brand artwork are needed.

## Safe verification and synchronization

In a folder containing sibling repositories `speedlora`, `speedlora-life` and `speedlora-research`:

```bash
node speedlora/scripts/check-brand-source.mjs
node speedlora/scripts/sync-brand-assets.mjs --check
node speedlora/scripts/sync-themes.mjs --check
node speedlora/scripts/test-brand-assets.mjs
node speedlora/scripts/test-themes.mjs
```

Both `sync-themes.mjs` and `sync-brand-assets.mjs` are **check-only by default**. After visually and technically reviewing a snapshot diff, explicitly run `--apply --confirm-reviewed`. Never run the retired 3-theme synchronizer: it could replace newly approved palettes. Syncing assets is a local copy/check operation, **not a deployment**.

For a standalone checkout of just `speedlora`, the GitHub Actions workflow checks canonical assets and source contracts; cross-repository parity requires the sibling projects checked out at matching revisions.

The applications have their own tests, build and manual deployment gates. Pushing `speedlora` or an application repository does not prove its VPS site is running. Do not publish the experimental 10,002-simulation (~45%) benchmark as reproduced until code, seeds, warmup, environment and repeated results are publicly available.

See [`brand/DESIGN_IMPLEMENTATION.md`](brand/DESIGN_IMPLEMENTATION.md), [`brand/design-system/SCHEMES.md`](brand/design-system/SCHEMES.md), [`brand/BRAND_ASSET_MANIFEST.md`](brand/BRAND_ASSET_MANIFEST.md).
