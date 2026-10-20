import { useSyncExternalStore } from "react";
import { readColorScheme, setColorScheme, subscribeColorScheme, type ColorScheme } from "./theme";

const labels: Record<ColorScheme, string> = {
  softlight: "SoftLight",
  speedlora: "SpeedLora",
};

/** Accessible in both app headers. Native select supports keyboard and touch. */
export function ThemeSwitcher() {
  const selected = useSyncExternalStore(subscribeColorScheme, readColorScheme, () => "softlight");
  return (
    <label className="sl-theme-picker">
      <span className="sl-theme-picker-label">Appearance</span>
      <select
        aria-label="Appearance theme"
        value={selected}
        onChange={(event) => setColorScheme(event.target.value as ColorScheme)}
      >
        {(Object.keys(labels) as ColorScheme[]).map((scheme) => (
          <option key={scheme} value={scheme}>{labels[scheme]}</option>
        ))}
      </select>
    </label>
  );
}
