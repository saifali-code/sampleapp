import { Link } from "react-router-dom";
import { Icon, BrandIcon } from "./Icon";
import useInView from "../hooks/useInView";
import { useEffect, useState } from "react";
import WaLink from "./WaLink";

/* ---------- Split text (letter-by-letter reveal) ---------- */
export function SplitText({ text, as: Tag = "h1", className = "" }) {
  let c = 0;
  const words = text.split(" ");
  return (
    <Tag className={`split-text ${className}`}>
      {words.map((w, wi) => (
        <span key={wi}><span className="word" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {Array.from(w).map((ch, i) => <span key={i} className="char" style={{ "--c": c++ }}>{ch}</span>)}
        </span>{wi < words.length - 1 ? " " : ""}</span>
      ))}
    </Tag>
  );
}

/* ---------- Page hero (inner pages) ---------- */
export function PageHero({ eyebrow, title, lead, crumb }) {
  return (
    <section className="page-hero">
      <div className="page-hero__orb" aria-hidden="true"><i /></div>
      <div className="container">
        <div className="page-hero__inner">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumbs"><li><Link to="/">Home</Link></li><li aria-current="page">{crumb}</li></ol>
          </nav>
          <span className="eyebrow mt-1">{eyebrow}</span>
          <SplitText text={title} className="page-hero__title" />
          <p className="page-hero__lead" data-reveal>{lead}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section head ---------- */
export function SectionHead({ eyebrow, title, lead, center }) {
  return (
    <div className={center ? "section-head section-head--center" : "section-head"}>
      <span className="eyebrow" data-reveal>{eyebrow}</span>
      <h2 data-reveal style={{ "--d": 60 }}>{title}</h2>
      {lead && <p className="lead" data-reveal style={{ "--d": 120 }}>{lead}</p>}
    </div>
  );
}
export const Grad = ({ children }) => <span className="text-gradient">{children}</span>;

/* ---------- Card ---------- */
export function Card({ icon, title, text, link, linkText = "Learn more", className = "", num, items, children, tilt = 6 }) {
  const isHash = link && link.startsWith("#");
  const LinkEl = link ? (isHash ? "a" : Link) : null;
  const linkProps = link ? (isHash ? { href: link } : { to: link }) : {};
  return (
    <article className={`card ${className}`} data-tilt={tilt}>
      {num && <span className="card__num">{num}</span>}
      {icon && <div className="card__icon"><Icon name={icon} /></div>}
      <h3 className="card__title">{title}</h3>
      {text && <p className="card__text">{text}</p>}
      {items && <ul className="check-list">{items.map((i, k) => <li key={k}>{i}</li>)}</ul>}
      {children}
      {link && <LinkEl className="link-arrow" {...linkProps}>{linkText} <Icon name="arrow-right" /></LinkEl>}
    </article>
  );
}

export const Tags = ({ items, accent }) => <div className="tags">{items.map((t, i) => <span key={i} className={`tag${accent ? " tag--accent" : ""}`}>{t}</span>)}</div>;
export const CheckList = ({ items }) => <ul className="check-list">{items.map((i, k) => <li key={k}>{i}</li>)}</ul>;
export const Kpis = ({ items }) => <div className="kpi-row">{items.map(([b, v], i) => <span key={i} className="kpi"><b>{b}</b> {v}</span>)}</div>;

/* ---------- Counter ---------- */
export function Counter({ end, prefix = "", suffix = "", decimals = 0, duration = 1800 }) {
  const [ref, inView] = useInView(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) { setVal(end); return; }
    let raf, t0;
    const step = (ts) => { if (!t0) t0 = ts; const p = Math.min(1, (ts - t0) / duration), e = 1 - Math.pow(1 - p, 3); setVal(end * e); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return <span ref={ref} className="counter-wrap">{prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{suffix}</span>;
}

/* ---------- Stats ---------- */
export function Stats({ items, className = "" }) {
  return (
    <div className={`stats ${className}`} data-stagger>
      {items.map((s, i) => (
        <div className="stat" key={i}>
          <div className="stat__value">{s.value}</div>
          <div className="stat__label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Steps / Timeline ---------- */
export function Steps({ items, className = "" }) {
  return (
    <div className={`steps ${className}`} data-stagger>
      {items.map((s, i) => (
        <div className="step" key={i}>
          <div className="step__num">{s.icon ? <Icon name={s.icon} /> : String(i + 1).padStart(2, "0")}</div>
          <h4>{s.title}</h4><p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}
export function Timeline({ items }) {
  return (
    <div className="timeline" data-stagger>
      {items.map((t, i) => (
        <div className="timeline__item" key={i}>
          {t.when && <span className="when">{t.when}</span>}
          <h4>{t.title}</h4><p>{t.text}</p>
          {t.tags && <div className="mt-1"><Tags items={t.tags} /></div>}
        </div>
      ))}
    </div>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-label="Our capabilities">
      <div className="marquee__track">{doubled.map((t, i) => <span className="marquee__item" key={i}>{t}</span>)}</div>
    </div>
  );
}

/* ---------- CTA banner ---------- */
export function CTABanner({ eyebrow, title, text, primary, secondary }) {
  const p = primary || { label: "Start a Partnership", to: "/partnership" };
  const PrimaryEl = p.href ? "a" : Link;
  const pProps = p.href ? { href: p.href } : { to: p.to };
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-banner" data-reveal="zoom">
          <div className="cta-banner__rings" aria-hidden="true"><i /><i /><i /></div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="cta-banner__actions">
            <PrimaryEl className="btn btn--primary btn--lg" {...pProps}>{p.label} <Icon name="arrow-right" /></PrimaryEl>
            {secondary ? <Link className="btn btn--ghost" to={secondary.to}>{secondary.label}</Link> : <WaLink className="btn btn--wa"><BrandIcon name="whatsapp" /> Talk to Us on WhatsApp</WaLink>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Feature row ---------- */
export function FeatureRow({ icon, title, text }) {
  return (
    <div className="feature-row"><div className="feature-row__icon"><Icon name={icon} /></div><div><h4>{title}</h4><p>{text}</p></div></div>
  );
}

/* ---------- Service block (services page) ---------- */
export function ServiceBlock({ id, eyebrow, title, lead, included, ideal, kpis, icon, reverse }) {
  const media = (
    <div className="split__media" data-reveal={reverse ? "right" : "left"}>
      <div className="card card--flat" style={{ padding: "2.2rem" }}>
        <div className="card__icon"><Icon name={icon} /></div>
        <h3 className="card__title">What's included</h3>
        <CheckList items={included} />
        <div className="divider" />
        <h4 className="mb-1">KPIs we track</h4>
        <Kpis items={kpis} />
      </div>
    </div>
  );
  const body = (
    <div className="split__body" data-reveal={reverse ? "left" : "right"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-1 mb-1">{title}</h2>
      <p className="lead">{lead}</p>
      <h4 className="mb-1 mt-2">Ideal for</h4>
      <div className="mb-2"><Tags items={ideal} /></div>
      <Link className="btn btn--primary btn--sm" to="/contact#quote">Get a quote for this service <Icon name="arrow-right" /></Link>
    </div>
  );
  return (
    <section className="section section--tight" id={id}>
      <div className="container"><div className="split">{reverse ? <>{body}{media}</> : <>{media}{body}</>}</div></div>
    </section>
  );
}

/* ---------- Picture helper ---------- */
export function BuildingPicture({ alt, className = "" }) {
  return (
    <picture>
      <source srcSet="/img/building-800.webp" type="image/webp" />
      <img className={className} src="/img/building-800.jpg" alt={alt} width="800" height="1067" loading="lazy" />
    </picture>
  );
}
