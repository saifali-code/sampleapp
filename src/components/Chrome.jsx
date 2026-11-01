import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon, BrandIcon } from "./Icon";
import WaLink from "./WaLink";
import config from "../config";

/* ---------- Custom cursor (desktop only) ---------- */
export function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches, rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || rm || !dot.current || !ring.current) return;
    document.body.classList.add("has-cursor");
    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0, alive = true;
    const move = (e) => { mx = e.clientX; my = e.clientY; };
    const hoverSel = "a, button, .card, .job-card, input, select, textarea, [data-tilt]";
    const over = (e) => { if (e.target.closest && e.target.closest(hoverSel)) ring.current && ring.current.classList.add("is-active"); };
    const out = (e) => { if (e.target.closest && e.target.closest(hoverSel)) ring.current && ring.current.classList.remove("is-active"); };
    const loop = () => { if (!alive) return; rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
    document.addEventListener("mousemove", move); document.addEventListener("mouseover", over); document.addEventListener("mouseout", out); loop();
    return () => { alive = false; cancelAnimationFrame(raf); document.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); document.body.classList.remove("has-cursor"); };
  }, []);
  return <><div className="cursor" ref={dot} aria-hidden="true" /><div className="cursor-ring" ref={ring} aria-hidden="true" /></>;
}

/* ---------- Scroll progress + back-to-top ---------- */
export function ScrollUi() {
  const [p, setP] = useState(0);
  const [top, setTop] = useState(false);
  useEffect(() => {
    const on = () => { const h = document.documentElement.scrollHeight - document.documentElement.clientHeight; setP(h > 0 ? window.scrollY / h : 0); setTop(window.scrollY > 600); };
    on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <div className="scroll-progress" style={{ width: `${(p * 100).toFixed(2)}%` }} aria-hidden="true" />
      <button className={`to-top${top ? " is-visible" : ""}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><Icon name="arrow-up" /></button>
    </>
  );
}

/* ---------- Floating WhatsApp + call buttons ---------- */
export function FloatingButtons() {
  return (
    <>
      <WaLink className="fab-wa" aria-label="Chat with us on WhatsApp"><BrandIcon name="whatsapp" /><span>WhatsApp Us</span></WaLink>
      <a className="fab-wa__call" href={`tel:${config.company.phoneHref}`} aria-label={`Call ${config.company.phone}`}><Icon name="phone" /></a>
    </>
  );
}

/* ---------- Preloader (first load) ---------- */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const start = Date.now(); let finished = false;
    const finish = () => { if (finished) return; finished = true; const wait = Math.max(0, 900 - (Date.now() - start)); setTimeout(() => { setDone(true); document.body.classList.add("is-loaded"); setTimeout(() => setGone(true), 800); }, wait); };
    if (document.readyState === "complete") finish(); else window.addEventListener("load", finish);
    const t = setTimeout(finish, 2600);
    return () => { clearTimeout(t); window.removeEventListener("load", finish); };
  }, []);
  if (gone) return null;
  return (
    <div className={`preloader${done ? " is-done" : ""}`} aria-hidden="true">
      <div className="preloader__box">
        <div className="preloader__logo"><img src="/img/logo-white.png" alt="" width="1463" height="1042" /></div>
        <div className="preloader__bar"><i /></div>
        <div className="preloader__text">Loading experience</div>
      </div>
    </div>
  );
}

/* ---------- Scroll restoration + hash scrolling on route change ---------- */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const go = () => { const el = document.querySelector(hash); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" }); };
      const t = setTimeout(go, 120); const t2 = setTimeout(go, 500);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}
