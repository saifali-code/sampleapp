import { useEffect, useRef, useState } from "react";

/** The animated 3D head-office model that lives behind the home-page hero.
 *  three.js and the scene are loaded on demand (separate chunk) so the rest of the site never pays for them.
 *  Falls back to the real photo without WebGL or if the chunk fails to load. */
export default function Hero3D({ heroRef }) {
  const canvasRef = useRef(null), wrapRef = useRef(null);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    let scene = null, cancelled = false;
    import("../three/buildingScene")
      .then((mod) => {
        if (cancelled) return;
        scene = mod.default({ canvas: canvasRef.current, wrap: wrapRef.current, hero: heroRef ? heroRef.current : null, onFallback: () => setFallback(true) });
      })
      .catch(() => setFallback(true));
    return () => { cancelled = true; if (scene) scene.dispose(); };
  }, [heroRef]);
  return (
    <div className="hero__canvas-wrap" ref={wrapRef} aria-hidden="true">
      <div className={`hero__fallback${fallback ? " is-visible" : ""}`} />
      <canvas id="building-canvas" className="hero__canvas" ref={canvasRef} />
    </div>
  );
}
