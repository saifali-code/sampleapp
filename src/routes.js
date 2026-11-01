import { lazy } from "react";
import Home from "./pages/Home";

/* Every page except Home is code-split: Vite emits one small chunk per route so first paint stays fast.
   `load` is kept so chunks can be prefetched on link hover / idle time — navigation then feels instant. */
const page = (load) => ({ load, Component: lazy(load) });

export const ROUTES = [
  { path: "/", Component: Home },
  { path: "/about", ...page(() => import("./pages/About")) },
  { path: "/services", ...page(() => import("./pages/Services")) },
  { path: "/campaigns", ...page(() => import("./pages/Campaigns")) },
  { path: "/industries", ...page(() => import("./pages/Industries")) },
  { path: "/process", ...page(() => import("./pages/Process")) },
  { path: "/technology", ...page(() => import("./pages/Technology")) },
  { path: "/life-at-mak", ...page(() => import("./pages/Life")) },
  { path: "/team", ...page(() => import("./pages/Team")) },
  { path: "/careers", ...page(() => import("./pages/Careers")) },
  { path: "/partnership", ...page(() => import("./pages/Partnership")) },
  { path: "/contact", ...page(() => import("./pages/Contact")) },
  { path: "/faq", ...page(() => import("./pages/FAQ")) },
  { path: "/insights", ...page(() => import("./pages/Insights")) },
  { path: "/privacy-policy", ...page(() => import("./pages/Privacy")) },
  { path: "/terms", ...page(() => import("./pages/Terms")) },
  { path: "*", ...page(() => import("./pages/NotFound")) }
];

const loaded = new Set();
/** Prefetch the chunk for a path (no-op if already loaded). */
export function preloadRoute(path) {
  const r = ROUTES.find((x) => x.path === path && x.load);
  if (!r || loaded.has(r.path)) return;
  loaded.add(r.path);
  r.load().catch(() => loaded.delete(r.path));
}
/** Warm every route chunk while the browser is idle (after the first page has fully loaded). */
export function preloadAllRoutes() {
  const run = () => ROUTES.forEach((r, i) => r.load && setTimeout(() => preloadRoute(r.path), 250 * i));
  if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 4000 }); else setTimeout(run, 2500);
}
