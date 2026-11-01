import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundFX from "./BackgroundFX";
import Chatbot from "./Chatbot";
import Toast from "./Toast";
import { Cursor, ScrollUi, FloatingButtons, Preloader, ScrollManager } from "./Chrome";
import useUiEffects from "../hooks/useUiEffects";

/**
 * App shell: background FX, header, animated page transitions, footer, floating buttons, chatbot.
 * Page content is rendered through `children` with a wipe transition on every route change.
 */
export default function Layout({ children }) {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const [phase, setPhase] = useState("idle"); // idle | leaving | entering
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useUiEffects(shown.pathname);

  useEffect(() => {
    if (location.pathname === shown.pathname) { setShown(location); return; }
    if (reduce) { setShown(location); return; }
    setPhase("leaving");
    const t1 = setTimeout(() => { setShown(location); setPhase("entering"); }, 420);
    const t2 = setTimeout(() => setPhase("idle"), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.classList.toggle("is-leaving", phase === "leaving");
    document.body.classList.toggle("is-entering", phase === "entering");
    document.body.classList.toggle("is-ready", phase === "entering");
  }, [phase]);

  return (
    <>
      <Preloader />
      <BackgroundFX />
      <Cursor />
      <ScrollUi />
      <Header />
      <main id="main">{typeof children === "function" ? children(shown) : children}</main>
      <Footer />
      <FloatingButtons />
      <Chatbot />
      <div className="page-transition" aria-hidden="true" />
      <Toast />
      <ScrollManager />
    </>
  );
}
