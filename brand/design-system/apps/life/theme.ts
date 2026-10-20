/** Site-local appearance controller. Palette IDs v2; legacy v1 values are migrated. */
export const SCHEMES = ["softlight", "speedlora"] as const;
export type ColorScheme = (typeof SCHEMES)[number];
export const SCHEME_KEY = "speedlora.colorScheme.v2";
const LEGACY_KEY = "speedlora.colorScheme.v1";
const CHANGE_EVENT = "speedlora:color-scheme-changed";
const DEFAULT_SCHEME: ColorScheme = "softlight";
let memoryScheme: ColorScheme = DEFAULT_SCHEME;
let storageUnavailable = false;

export function isColorScheme(value: unknown): value is ColorScheme {
  return typeof value === "string" && SCHEMES.some((scheme) => scheme === value);
}

/** Old Balanced was blue-violet; old Ocean was light; old Aurora is retired. */
export function migrateLegacyScheme(value: unknown): ColorScheme {
  if (value === "balanced" || value === "speedlora") return "speedlora";
  return DEFAULT_SCHEME;
}

/** Invalid preferences are restored to SoftLight. No private data is touched. */
export function readColorScheme(): ColorScheme {
  try {
    const stored = window.localStorage.getItem(SCHEME_KEY);
    if (stored !== null) {
      memoryScheme = isColorScheme(stored) ? stored : DEFAULT_SCHEME;
      storageUnavailable = false;
      return memoryScheme;
    }
    const old = window.localStorage.getItem(LEGACY_KEY);
    memoryScheme = migrateLegacyScheme(old);
    if (old !== null) {
      // Only remove the old setting after the new one has been stored safely.
      window.localStorage.setItem(SCHEME_KEY, memoryScheme);
      window.localStorage.removeItem(LEGACY_KEY);
    }
    storageUnavailable = false;
    return memoryScheme;
  } catch {
    storageUnavailable = true;
    return memoryScheme;
  }
}

function applyScheme(scheme: ColorScheme): void {
  document.documentElement.dataset.slTheme = scheme;
}

export function setColorScheme(scheme: ColorScheme): void {
  if (!isColorScheme(scheme)) return;
  memoryScheme = scheme;
  applyScheme(scheme);
  try { window.localStorage.setItem(SCHEME_KEY, scheme); storageUnavailable = false; } catch { storageUnavailable = true; }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Call before React mounts, so saved preference takes effect before first paint. */
export function bootstrapColorScheme(): () => void {
  applyScheme(readColorScheme());
  const onStorage = (event: StorageEvent) => {
    if (event.key === SCHEME_KEY || event.key === LEGACY_KEY || event.key === null) {
      if (!storageUnavailable || event.key !== null) applyScheme(readColorScheme());
      else applyScheme(memoryScheme);
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
