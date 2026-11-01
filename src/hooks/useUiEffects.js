import { useEffect } from "react";
import { preloadRoute, preloadAllRoutes } from "../routes";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Global, dependency-free animation engine:
 *  - scroll-reveal for [data-reveal] / [data-stagger] / .split-text (re-scanned on every route change)
 *  - card spotlight + 3D tilt, magnetic buttons, click ripples, parallax, smooth anchor scrolling
 */
export default function useUiEffects(pathname) {
  /* ---------- once ---------- */
  useEffect(() => {
    document.body.classList.remove("js-off");
    const doc = document, fine = finePointer(), rm = reduceMotion();

    const onMove = (e) => {
      const card = e.target.closest && e.target.closest(".card, .form-card, .job-card");
      if (card) { const r = card.getBoundingClientRect(); card.style.setProperty("--mx", e.clientX - r.left + "px"); card.style.setProperty("--my", e.clientY - r.top + "px"); }
      if (rm) return;
      const tilt = e.target.closest && e.target.closest("[data-tilt]");
      if (tilt) {
        const max = parseFloat(tilt.getAttribute("data-tilt")) || 8, r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateY(-6px)`;
      }
      const mag = e.target.closest && e.target.closest(".btn--primary, .btn--accent, .fab-wa");
      if (mag) { const r = mag.getBoundingClientRect(); const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2; mag.style.transform = `translate(${x * 0.18}px, ${y * 0.18 - 2}px)`; }
    };
    const onOut = (e) => {
      const tilt = e.target.closest && e.target.closest("[data-tilt]");
      if (tilt && !(e.relatedTarget && tilt.contains(e.relatedTarget))) tilt.style.transform = "";
      const mag = e.target.closest && e.target.closest(".btn--primary, .btn--accent, .fab-wa");
      if (mag && !(e.relatedTarget && mag.contains(e.relatedTarget))) mag.style.transform = "";
    };
    const onClick = (e) => {
      /* ripple */
      const b = e.target.closest && e.target.closest(".btn, .chatbot__chip, .tabs__btn");
      if (b && !rm) {
        const r = b.getBoundingClientRect(), size = Math.max(r.width, r.height), rp = doc.createElement("span");
        rp.className = "ripple"; rp.style.width = rp.style.height = size + "px"; rp.style.left = e.clientX - r.left - size / 2 + "px"; rp.style.top = e.clientY - r.top - size / 2 + "px";
        b.appendChild(rp); setTimeout(() => rp.remove(), 650);
      }
      /* smooth same-page anchors */
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (a && !a.hasAttribute("data-wa")) {
        const id = a.getAttribute("href"); if (!/^#[A-Za-z][\w-]*$/.test(id)) return;
        let t = null; try { t = doc.querySelector(id); } catch (err) { t = null; }
        if (!t) return;
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 90, behavior: rm ? "auto" : "smooth" });
        history.replaceState(null, "", id);
      }
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking || rm) return; ticking = true;
      requestAnimationFrame(() => {
        ticking = false; const vh = window.innerHeight;
        doc.querySelectorAll("[data-parallax]").forEach((el) => {
          const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
          const speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
          el.style.transform = `translate3d(0,${((r.top + r.height / 2 - vh / 2) * -speed).toFixed(1)}px,0)`;
        });
      });
    };
    if (fine) { doc.addEventListener("mousemove", onMove); doc.addEventListener("mouseout", onOut); }
    doc.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    /* route prefetch: on link hover/touch, and all routes once the browser is idle */
    const onOver = (e) => { const a = e.target.closest && e.target.closest('a[href^="/"]'); if (a) { try { preloadRoute(new URL(a.href, location.href).pathname.replace(/\/$/, "") || "/"); } catch (err) { /* ignore */ } } };
    doc.addEventListener("pointerover", onOver, { passive: true });
    doc.addEventListener("touchstart", onOver, { passive: true });
    const idle = () => preloadAllRoutes();
    if (document.readyState === "complete") idle(); else window.addEventListener("load", idle, { once: true });
    return () => { doc.removeEventListener("mousemove", onMove); doc.removeEventListener("mouseout", onOut); doc.removeEventListener("click", onClick); window.removeEventListener("scroll", onScroll); doc.removeEventListener("pointerover", onOver); doc.removeEventListener("touchstart", onOver); window.removeEventListener("load", idle); };
  }, []);

  /* ---------- per route: scroll reveal ---------- */
  useEffect(() => {
    const rm = reduceMotion();
    let io;
    const scan = () => {
      const targets = document.querySelectorAll("[data-reveal], [data-stagger], .split-text, .section, .section-head h2");
      if (!("IntersectionObserver" in window) || rm) { targets.forEach((t) => t.classList.add("is-visible")); return; }
      if (io) io.disconnect();
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      targets.forEach((t) => { if (!t.classList.contains("is-visible")) io.observe(t); });
    };
    const t1 = setTimeout(scan, 60);
    const t2 = setTimeout(scan, 600); /* catch late-rendered sections */
    let t3; const mo = new MutationObserver(() => { clearTimeout(t3); t3 = setTimeout(scan, 80); }); /* lazy route chunks mount later */
    mo.observe(document.getElementById("main") || document.body, { childList: true, subtree: true });
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); mo.disconnect(); if (io) io.disconnect(); };
  }, [pathname]);
}
