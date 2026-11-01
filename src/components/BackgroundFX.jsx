import { useEffect, useRef } from "react";

/** Ambient background: drifting colour blobs, grid, noise and a twinkling starfield with shooting stars. */
export default function BackgroundFX() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const root = document.documentElement;
    let W = 0, H = 0, stars = [], shots = [], mx = 0, my = 0, sy = 0, lastShot = 0, raf = 0, alive = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const count = window.innerWidth < 768 ? 110 : 220;
    const color = () => { const t = root.getAttribute("data-theme"); return t === "solar" ? "40,60,140" : t === "aurora" ? "150,240,225" : "190,210,255"; };
    let col = color();
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: count }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.3, a: Math.random() * Math.PI * 2, s: 0.4 + Math.random() * 0.9, d: Math.random() * 0.6 + 0.2 }));
    };
    const onMouse = (e) => { mx = e.clientX / W - 0.5; my = e.clientY / H - 0.5; };
    const onScroll = () => { sy = window.scrollY; };
    const onTheme = () => { col = color(); };
    const spawn = () => { const left = Math.random() > 0.5; shots.push({ x: left ? -40 : Math.random() * W, y: Math.random() * H * 0.5, vx: (left ? 1 : -1) * (9 + Math.random() * 7), vy: 5 + Math.random() * 4, life: 1, len: 90 + Math.random() * 90 }); };
    const frame = (ts) => {
      if (!alive) return;
      if (document.hidden) { raf = requestAnimationFrame(frame); return; }
      ctx.clearRect(0, 0, W, H);
      const px = mx * 18, py = my * 12 - ((sy * 0.04) % H);
      for (const st of stars) {
        st.a += 0.02 * st.s; const tw = 0.55 + Math.sin(st.a) * 0.45;
        const x = st.x + px * st.d, y = (st.y + py * st.d + H) % H;
        ctx.beginPath(); ctx.fillStyle = `rgba(${col},${(tw * 0.9).toFixed(2)})`; ctx.arc(x, y, st.r, 0, Math.PI * 2); ctx.fill();
        if (st.r > 1.2) { ctx.beginPath(); ctx.fillStyle = `rgba(${col},${(tw * 0.12).toFixed(2)})`; ctx.arc(x, y, st.r * 4, 0, Math.PI * 2); ctx.fill(); }
      }
      if (!rm) {
        if (ts - lastShot > 2600 + Math.random() * 3000) { lastShot = ts; spawn(); }
        for (let j = shots.length - 1; j >= 0; j--) {
          const sh = shots[j]; sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.018;
          const tx = sh.x - sh.vx * (sh.len / 12), ty = sh.y - sh.vy * (sh.len / 12);
          const g = ctx.createLinearGradient(sh.x, sh.y, tx, ty); g.addColorStop(0, `rgba(${col},${sh.life.toFixed(2)})`); g.addColorStop(1, `rgba(${col},0)`);
          ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(tx, ty); ctx.stroke();
          if (sh.life <= 0 || sh.x < -200 || sh.x > W + 200 || sh.y > H + 100) shots.splice(j, 1);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    resize();
    window.addEventListener("resize", resize);
    if (fine) window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("themechange", onTheme);
    raf = requestAnimationFrame(frame);
    return () => { alive = false; cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); window.removeEventListener("scroll", onScroll); window.removeEventListener("themechange", onTheme); };
  }, []);
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-fx__blob bg-fx__blob--1" />
      <div className="bg-fx__blob bg-fx__blob--2" />
      <div className="bg-fx__blob bg-fx__blob--3" />
      <div className="bg-fx__grid" />
      <canvas className="bg-fx__stars" ref={canvasRef} />
      <div className="bg-fx__noise" />
    </div>
  );
}
