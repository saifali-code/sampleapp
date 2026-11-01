import { useEffect, useRef, useState } from "react";

export default function Toast() {
  const [state, setState] = useState({ message: "", type: "", visible: false });
  const timer = useRef();
  useEffect(() => {
    const on = (e) => {
      clearTimeout(timer.current);
      setState({ message: e.detail.message, type: e.detail.type || "", visible: true });
      timer.current = setTimeout(() => setState((s) => ({ ...s, visible: false })), 4200);
    };
    window.addEventListener("mak:toast", on);
    return () => { window.removeEventListener("mak:toast", on); clearTimeout(timer.current); };
  }, []);
  return <div className={`toast${state.type ? " toast--" + state.type : ""}${state.visible ? " is-visible" : ""}`} role="status" aria-live="polite">{state.message}</div>;
}
