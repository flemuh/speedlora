# SpeedLora — two production appearance modes (15/10/2026)

| Stored ID | Display | Role |
|---|---|---|
| `softlight` | SoftLight | Default light palette in Life and Research |
| `speedlora` | SpeedLora | Dark/navy, blue-violet palette in Life and Research |

The local storage key is `speedlora.colorScheme.v2`; legacy `v1` values (balanced/ocean/aurora) are mapped safely by each application's controller. Theme preferences are origin-local, not synchronized between Life and Research.

## Source of truth

The historical common `colors.css`/runtime under this brand repository represented three deprecated themes and is no longer safe to copy. The **live** two-theme implementation has product-specific differences (especially accessibility, status colors and surface tokens). This repo now versions **separate snapshots** of `colors.css`, `switcher.css`, `theme.ts` and `ThemeSwitcher.tsx` per application:

- `brand/design-system/apps/life/`
- `brand/design-system/apps/research/`

These are snapshots of the approved current source, not an instruction to merge CSS, remove features or replace runtime behavior. Compare differences, verify in the browser, then explicitly apply if intended.

```bash
node speedlora/scripts/sync-themes.mjs --check
# Only after diff review:
node speedlora/scripts/sync-themes.mjs --apply --confirm-reviewed
node speedlora/scripts/test-themes.mjs
```

The menu border, icons, project image carousel and other page-specific styles are owned by the individual applications; they are not copied by the shared theme script. Test both themes in actual Chromium at 375/768/1024/1440 px before approval.
