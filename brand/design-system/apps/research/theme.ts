/** Origin-local theme selection, including migration of legacy preferences. */
export const SCHEMES = ["softlight", "speedlora"] as const;
export type ColorScheme = (typeof SCHEMES)[number];
export const SCHEME_KEY = "speedlora.colorScheme.v2";
const PREVIOUS_SCHEME_KEY = "speedlora.colorScheme.v1";
const CHANGE_EVENT = "speedlora:color-scheme-changed";
let memoryScheme: ColorScheme = "softlight";

export function isColorScheme(value: unknown): value is ColorScheme {
  return typeof value === "string" && SCHEMES.some((scheme) => scheme === value);
}

/**
 * Upgrade preferences without recoloring a user's existing selection.
 * Legacy blue-violet becomes SpeedLora; legacy light becomes SoftLight;
 * the removed scheme resolves safely to SoftLight.
 */
function upgradeLegacyScheme(value: string | null): ColorScheme {
  if (value === "balanced") return "speedlora";
  if (value === "ocean") return "softlight";
  return "softlight";
}

/** Invalid or blocked browser storage must not prevent the app from loading. */
export function readColorScheme(): ColorScheme {
  try {
    const stored = window.localStorage.getItem(SCHEME_KEY);
    if (isColorScheme(stored)) {
      memoryScheme = stored;
      return memoryScheme;
    }
    if (stored !== null) {
      // A stale or corrupted new-format preference must not override the default.
      memoryScheme = "softlight";
      return memoryScheme;
    }
    const old = window.localStorage.getItem(PREVIOUS_SCHEME_KEY);
    memoryScheme = upgradeLegacyScheme(old);
    if (old !== null) {
      window.localStorage.setItem(SCHEME_KEY, memoryScheme);
      window.localStorage.removeItem(PREVIOUS_SCHEME_KEY);
    }
    return memoryScheme;
  } catch {
    return memoryScheme;
  }
}

function applyScheme(scheme: ColorScheme): void {
  document.documentElement.dataset.slTheme = scheme;
  const themeMeta = document.querySelector?.('meta[name="theme-color"]');
  themeMeta?.setAttribute('content', scheme === "softlight" ? "#f5f8ff" : "#081128");
}

export function setColorScheme(scheme: ColorScheme): void {
  if (!isColorScheme(scheme)) return;
  memoryScheme = scheme;
  applyScheme(scheme);
  try {
    window.localStorage.setItem(SCHEME_KEY, scheme);
    window.localStorage.removeItem(PREVIOUS_SCHEME_KEY);
  } catch { /* private-mode storage may be disabled */ }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Set before React mounts to avoid a flash of the wrong palette. */
export function bootstrapColorScheme(): () => void {
  applyScheme(readColorScheme());
  const onStorage = (event: StorageEvent) => {
    if (event.key === SCHEME_KEY || event.key === PREVIOUS_SCHEME_KEY || event.key === null) {
      applyScheme(readColorScheme());
      window.dispatchEvent(new Event(CHANGE_EVENT));
    }
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

export function subscribeColorScheme(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}
