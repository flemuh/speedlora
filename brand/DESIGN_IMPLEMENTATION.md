# SpeedLora — current design implementation

Visual reference: [approved Figma Life + Research design](https://www.figma.com/design/Bn9oPA0pQtgVSm7urSC6gs). Compare **actual runtime** screenshots, not just code or simulated mocks.

## Identity and approved themes

- **SoftLight** `softlight`: default, light backgrounds and restrained blue/violet contrast.
- **SpeedLora** `speedlora`: navy/dark, blue, violet and neon accents.
- `balanced`, `ocean`, `aurora`: legacy storage values only, not selectable options.
- The new robot and cosmic Research hero live in the brand manifest. Preserve logo, favicon, mascot and original artwork. The former female character remains archived.

Life: Today, Tasks, Routines, Projects, Week, Courses, Review and Settings. Career positioning belongs to Life **tasks**, not a new Career screen. Do not add English mastery dashboards or AI assistant panels to the MVP.

Research: Home, Projects, project detail and Results, Research, CV, Experience and protected Admin. Q7.11's existing project-cover space rotates uploaded photos (no separate gallery), supports manual arrows, single image fallback, and enlarged lightbox. Publication and privacy status control which media may be visible; no invented metrics.

## Rules

Use product-local approved CSS as the reference. Snapshot it in `design-system/apps/{life,research}` and run parity checks; never sync a generic palette onto both sites. Preserve private data, real APIs and review/approval before publication. Test keyboard navigation, reduced motion, contrast, mobile header/sidebar, media states and actual deployment separately from screenshot appearance.
