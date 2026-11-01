import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV } from "../data/nav";
import { Icon, BrandIcon } from "./Icon";
import ThemeSwitch from "./ThemeSwitch";
import WaLink from "./WaLink";
import config from "../config";

const BRAND = config.company.name;
const SOCIALS = ["facebook", "instagram", "linkedin", "tiktok", "youtube", "x"];

function Logo({ className = "logo" }) {
  return (
    <Link className={className} to="/" aria-label={`${BRAND} — Home`}>
      <img className="logo__light" src="/img/logo-white-sm.png" alt={`${BRAND} logo`} width="225" height="160" />
      <img className="logo__dark" src="/img/logo-dark-sm.png" alt={`${BRAND} logo`} width="225" height="160" />
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const esc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("keydown", esc); document.body.classList.remove("menu-open"); };
  }, [open]);

  const isActive = (to) => { const base = to.split("#")[0]; return base === "/" ? pathname === "/" : pathname.startsWith(base); };
  const subActive = (n) => n.sub && n.sub.some((s) => isActive(s.to));

  return (
    <>
      <header className={`header${scrolled || open ? " is-scrolled" : ""}`} id="top">
        <div className="container header__inner">
          <Logo />
          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {NAV.map((n) => (
                <li key={n.label} className={`nav__item${n.sub ? " nav__item--has-sub" : ""}`}>
                  <NavLink className={({ isActive: a }) => `nav__link${a || subActive(n) ? " is-active" : ""}`} to={n.to} end={n.to === "/"} aria-haspopup={n.sub ? "true" : undefined}>
                    {n.label}{n.sub && <Icon name="chevron-down" />}
                  </NavLink>
                  {n.sub && (
                    <div className="nav__sub">
                      {n.sub.map((s) => (
                        <Link key={s.to} to={s.to} className={isActive(s.to) && !s.to.includes("#") ? "is-active" : ""}>
                          <Icon name={s.icon} /><span>{s.title}<small>{s.desc}</small></span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__actions">
            <Link className="btn btn--primary btn--sm header__cta" to="/contact#quote">Get a Quote <Icon name="arrow-right" /></Link>
            <ThemeSwitch />
            <button className={`burger${open ? " is-open" : ""}`} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${open ? " is-open" : ""}`} id="mobile-nav" aria-label="Mobile navigation">
        <div className="container">
          <ul className="mobile-nav__list">
            {NAV.map((n, i) => (
              <li key={n.label} style={{ "--i": i }}>
                <Link className={`mobile-nav__link${isActive(n.to) || subActive(n) ? " is-active" : ""}`} to={n.to} onClick={() => setOpen(false)}>{n.label}<Icon name="chevron-right" /></Link>
                {n.sub && <div className="mobile-nav__sub">{n.sub.map((s) => <Link key={s.to} to={s.to} className={isActive(s.to) && !s.to.includes("#") ? "is-active" : ""} onClick={() => setOpen(false)}>{s.title}</Link>)}</div>}
              </li>
            ))}
          </ul>
          <div className="mobile-nav__foot">
            <Link className="btn btn--primary btn--block" to="/contact#quote" onClick={() => setOpen(false)}>Get a Quote</Link>
            <WaLink className="btn btn--wa btn--block"><BrandIcon name="whatsapp" /> Chat on WhatsApp</WaLink>
            <a className="btn btn--ghost btn--block" href={`tel:${config.company.phoneHref}`}><Icon name="phone" /> {config.company.phone}</a>
            <div className="socials socials--center" aria-label="Social media">
              {SOCIALS.filter((k) => config.social[k]).map((k) => <a key={k} href={config.social[k]} target="_blank" rel="noopener noreferrer" aria-label={k}><BrandIcon name={k} /></a>)}
            </div>
            <p className="mobile-nav__hours"><Icon name="clock" /> {config.company.hours.label} · US business hours</p>
          </div>
        </div>
      </div>
    </>
  );
}
