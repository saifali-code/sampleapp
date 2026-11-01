import { useEffect, useRef, useState } from "react";
import useTheme, { THEMES } from "../hooks/useTheme";
import { Icon } from "./Icon";
import config from "../config";

export default function ThemeSwitch() {
  const [theme, setTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", close); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); };
  }, [open]);
  if (config.showThemeSwitcher === false) return null;
  return (
    <div className={`theme-switch${open ? " is-open" : ""}`} ref={ref}>
      <button className="theme-switch__btn" type="button" aria-label="Choose colour theme" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Icon name="sun" />
      </button>
      <div className="theme-switch__menu" role="menu" aria-label="Colour themes">
        {THEMES.map((t) => (
          <button key={t.id} type="button" role="menuitem" data-set-theme={t.id} className={theme === t.id ? "is-active" : ""} onClick={() => { setTheme(t.id); setOpen(false); }}>
            <i /><span>{t.name}<small>{t.desc}</small></span>
          </button>
        ))}
      </div>
    </div>
  );
}
