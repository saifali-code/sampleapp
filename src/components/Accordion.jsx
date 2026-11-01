import { useState } from "react";
import { Icon } from "./Icon";
import Html from "../utils/html";

/** Accordion: items = [{ q, a }] (a may contain HTML). single = only one open at a time. */
export default function Accordion({ items, single = true, openFirst = false }) {
  const [open, setOpen] = useState(() => (openFirst ? new Set([0]) : new Set()));
  const toggle = (k) => setOpen((prev) => { const next = new Set(single ? [] : prev); if (!prev.has(k)) next.add(k); else next.delete(k); return next; });
  return (
    <div className="accordion">
      {items.map((it, k) => {
        const isOpen = open.has(k);
        return (
          <div className={`accordion__item${isOpen ? " is-open" : ""}`} key={k}>
            <button className="accordion__btn" type="button" aria-expanded={isOpen} onClick={() => toggle(k)}>
              {it.q}<span className="icon"><Icon name="plus" /></span>
            </button>
            <div className="accordion__panel" style={{ maxHeight: isOpen ? "1000px" : 0 }}>
              <Html as="div" className="accordion__panel-inner" html={it.a} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
