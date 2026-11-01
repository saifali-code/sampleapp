import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

/** Auto-advancing testimonial slider with dots, arrows and swipe. */
export default function Testimonials({ items, stars = true }) {
  const [i, setI] = useState(0);
  const timer = useRef();
  const sx = useRef(0);
  const rm = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const go = (n) => setI(((n % items.length) + items.length) % items.length);
  useEffect(() => {
    if (rm || items.length < 2) return;
    timer.current = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(timer.current);
  }, [i, items.length, rm]);
  return (
    <div className="testimonials" data-reveal onTouchStart={(e) => { sx.current = e.touches[0].clientX; }} onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - sx.current; if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1); }}>
      <div className="slider__arrows">
        <button type="button" onClick={() => go(i - 1)} aria-label="Previous"><Icon name="chevron-left" /></button>
        <button type="button" onClick={() => go(i + 1)} aria-label="Next"><Icon name="chevron-right" /></button>
      </div>
      <div className="testimonials__track">
        {items.map((t, k) => (
          <div className={`testimonial${k === i ? " is-active" : ""}`} key={k}>
            {stars && <div className="stars">★★★★★</div>}
            <p className="testimonial__quote">{t.quote}</p>
            <div className="testimonial__who"><div className="testimonial__avatar">{t.initials}</div><div><b>{t.who}</b><small>{t.company}</small></div></div>
          </div>
        ))}
      </div>
      <div className="slider__dots">{items.map((_, k) => <button key={k} type="button" className={k === i ? "is-active" : ""} aria-label={`Show testimonial ${k + 1}`} onClick={() => go(k)} />)}</div>
    </div>
  );
}
