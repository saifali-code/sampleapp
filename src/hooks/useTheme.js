import { useCallback, useEffect, useState } from "react";
import config from "../config";

export const THEMES = [
  { id: "midnight", name: "Midnight Signal", desc: "Deep navy · cobalt · cyan" },
  { id: "aurora", name: "Aurora Teal", desc: "Charcoal · teal · violet" },
  { id: "solar", name: "Solar Light", desc: "Light · indigo · gold" },
];
const IDS = THEMES.map((t) => t.id);

function read() {
  try { const t = localStorage.getItem("mak-theme"); if (IDS.includes(t)) return t; } catch (e) { /* ignore */ }
  return IDS.includes(config.defaultTheme) ? config.defaultTheme : "midnight";
}

export function applyTheme(id) {
  const root = document.documentElement;
  root.setAttribute("data-theme", id);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg").trim() || "#060a14");
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: id } }));
}

/** Current theme + setter (persisted in localStorage, broadcast via the "themechange" event for the 3D scene). */
export default function useTheme() {
  const [theme, setThemeState] = useState(read);
  useEffect(() => { applyTheme(theme); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const setTheme = useCallback((id) => {
    if (!IDS.includes(id)) return;
    setThemeState(id); applyTheme(id);
    try { localStorage.setItem("mak-theme", id); } catch (e) { /* ignore */ }
  }, []);
  return [theme, setTheme];
}
