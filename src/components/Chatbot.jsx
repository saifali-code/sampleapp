import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, BrandIcon } from "./Icon";
import Html from "../utils/html";
import { waUrl } from "./WaLink";
import config from "../config";
import { KNOWLEDGE, CHIP_MAP, FALLBACKS } from "../data/chatbot";

const C = config.company;
const ACTIONS = {
  call: { label: "Call us", href: `tel:${C.phoneHref}`, icon: "phone" },
  wa: { label: "WhatsApp", href: waUrl("Hello MAK BPO! I have a question."), icon: "whatsapp", brand: true, external: true },
  email: { label: "Email", href: `mailto:${C.email}`, icon: "mail" },
  careers: { label: "Open positions", to: "/careers#positions", icon: "briefcase" },
  apply: { label: "Apply now", to: "/careers#apply", icon: "send" },
  services: { label: "All services", to: "/services", icon: "layers" },
  campaigns: { label: "Campaigns", to: "/campaigns", icon: "target" },
  partner: { label: "Partnership form", to: "/partnership#partner-form", icon: "share" },
  quote: { label: "Get a quote", to: "/contact#quote", icon: "edit" },
  map: { label: "Open map", to: "/contact#map", icon: "pin" },
  directions: { label: "Directions", href: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(C.address), icon: "map", external: true },
  faq: { label: "Read FAQ", to: "/faq", icon: "chat" },
  life: { label: "Life at MAK BPO", to: "/life-at-mak", icon: "smile" },
  tech: { label: "Technology", to: "/technology", icon: "cpu" },
  about: { label: "About us", to: "/about", icon: "building" },
};
const DEFAULT_CHIPS = ["Our services", "Final Expense campaign", "Jobs & hiring", "Pricing", "Where are you located?"];
const SOCIALS = ["facebook", "instagram", "linkedin", "tiktok", "youtube", "x"];

function normalize(s) { return (s || "").toLowerCase().replace(/[^a-z0-9&\s'-]/g, " ").replace(/\s+/g, " ").trim(); }
function match(q) {
  const n = normalize(q); let best = null, bestScore = 0;
  for (const k of KNOWLEDGE) {
    let score = 0;
    for (let w of k.kw) { w = w.toLowerCase(); if (n === w) score += 6; else if (n.includes(w)) score += (w.length > 4 ? 3 : 2) + (w.includes(" ") ? 2 : 0); }
    if (score > bestScore) { bestScore = score; best = k; }
  }
  return bestScore >= 2 ? best : null;
}
const escapeHtml = (s) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));


/* ---------- Location & time awareness ---------- */
const PKT_OFFSET = 5; // Pakistan Standard Time is UTC+5 all year
function pktNow() { const d = new Date(); return { hour: (d.getUTCHours() + PKT_OFFSET) % 24, minute: d.getUTCMinutes(), date: d }; }
function fmtIn(tz, utcHour) { try { const d = new Date(); d.setUTCHours(utcHour, 0, 0, 0); return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz }).format(d); } catch (e) { return ""; } }
export function shiftStatus() {
  const { hour } = pktNow();
  const open = hour >= C.hours.start || hour < C.hours.end;
  const tz = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) { return ""; } })();
  const pktLabel = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Karachi" }).format(new Date());
  const local = tz && tz !== "Asia/Karachi" ? ` — that's <strong>${fmtIn(tz, 13)} – ${fmtIn(tz, 0)}</strong> in your time zone (${tz.replace(/_/g, " ")})` : "";
  const hoursUntil = open ? 0 : ((C.hours.start - hour + 24) % 24);
  const html = open
    ? `🟢 <strong>We're live right now</strong> — it's ${pktLabel} in Rawalpindi and our floor is on shift. Our hours are ${C.hours.label}${local}. Call or WhatsApp us and a real person will answer.`
    : `🔴 Our floor is <strong>off-shift</strong> right now (it's ${pktLabel} in Rawalpindi). We work US business hours only: <strong>${C.hours.label}</strong>${local} — next shift starts in about ${hoursUntil} hour${hoursUntil === 1 ? "" : "s"}. Leave a WhatsApp message and we'll reply as soon as the shift begins.`;
  return { open, html };
}
function haversine(lat1, lon1, lat2, lon2) { const R = 6371, dLat = ((lat2 - lat1) * Math.PI) / 180, dLon = ((lon2 - lon1) * Math.PI) / 180; const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(a)); }
function distanceAnswer() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve({ html: `I can't read your location in this browser, but here is how to find us: ${C.landmarks}.`, actions: ["directions", "map"] });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: la, longitude: lo } = pos.coords; const km = haversine(la, lo, C.geo.lat, C.geo.lng);
        const dir = `https://www.google.com/maps/dir/?api=1&origin=${la.toFixed(5)},${lo.toFixed(5)}&destination=${encodeURIComponent(C.mapQuery)}`;
        const far = km > 300;
        resolve({ html: far ? `You're about <strong>${Math.round(km).toLocaleString()} km</strong> (${Math.round(km * 0.621).toLocaleString()} miles) from our Rawalpindi office — no need to travel, everything from discovery call to daily reporting happens online, on your time zone.` : `You're about <strong>${km < 10 ? km.toFixed(1) : Math.round(km)} km</strong> from our office in Satellite Town. We're ${C.landmarks}. <a href="${dir}" target="_blank" rel="noopener">Open turn-by-turn directions from your location</a>. Visit during shift hours (6 PM – 5 AM PKT).`, actions: far ? ["wa", "quote"] : ["directions", "wa"] });
      },
      () => resolve({ html: `No problem — location access was declined. We're ${C.landmarks}: <strong>${C.address}</strong>.`, actions: ["directions", "map"] }),
      { timeout: 8000, maximumAge: 300000 }
    );
  });
}
const RE_OPEN = /(open now|online now|available now|right now|working now|are you open|currently open|still open|what time is it|time in pakistan|time in rawalpindi|open today|open\?$)/i;
const RE_DIST = /(how far|distance|near me|nearest|from my location|my location|closest|directions from)/i;
const RE_SOCIAL = /(social|instagram|facebook|linkedin|tiktok|youtube|twitter|\bx\.com|follow you|your page|reels)/i;
const SOCIAL_LABEL = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn", tiktok: "TikTok", youtube: "YouTube", x: "X (Twitter)" };
function socialAnswer() {
  const links = SOCIALS.filter((k) => config.social[k]).map((k) => `<a href="${config.social[k]}" target="_blank" rel="noopener noreferrer">${SOCIAL_LABEL[k]}</a>`);
  return links.length ? `Follow MAK BPO on ${links.join(" · ")} — we post daily life on the floor, awards nights and hiring drives. The icons at the top of this chat open the same pages.` : "Our social pages are coming soon — meanwhile call or WhatsApp us any time during shift hours.";
}

function ActionButton({ k }) {
  const a = ACTIONS[k]; if (!a) return null;
  const inner = <>{a.brand ? <BrandIcon name={a.icon} /> : <Icon name={a.icon} />}<span>{a.label}</span></>;
  if (a.to) return <Link className="chatbot__action" to={a.to}>{inner}</Link>;
  return <a className="chatbot__action" href={a.href} target={a.external ? "_blank" : undefined} rel={a.external ? "noopener noreferrer" : undefined}>{inner}</a>;
}

/** "MAK Assistant" — rule-based chatbot that runs fully in the browser. */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => { try { return JSON.parse(sessionStorage.getItem("mak-chat") || "[]"); } catch (e) { return []; } });
  const [chips, setChips] = useState(DEFAULT_CHIPS);
  const [typing, setTyping] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [input, setInput] = useState("");
  const [badge, setBadge] = useState(() => { try { return !sessionStorage.getItem("mak-chat"); } catch (e) { return true; } });
  const listRef = useRef(null), inputRef = useRef(null);

  const push = (who, html, actions = []) => setMessages((m) => { const next = [...m, { who, html, actions }].slice(-40); try { sessionStorage.setItem("mak-chat", JSON.stringify(next)); } catch (e) { /* ignore */ } return next; });

  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [messages, typing, open]);
  useEffect(() => { document.body.classList.toggle("chat-open", open); return () => document.body.classList.remove("chat-open"); }, [open]);
  useEffect(() => {
    let teased = false; try { teased = sessionStorage.getItem("mak-chat-teased") === "1"; } catch (e) { /* ignore */ }
    if (teased) return;
    const t1 = setTimeout(() => { setTeaser(true); try { sessionStorage.setItem("mak-chat-teased", "1"); } catch (e) { /* ignore */ } }, 3500);
    const t2 = setTimeout(() => setTeaser(false), 14000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  useEffect(() => { const esc = (e) => { if (e.key === "Escape") setOpen(false); }; document.addEventListener("keydown", esc); return () => document.removeEventListener("keydown", esc); }, []);

  const greet = () => {
    const k = KNOWLEDGE[0];
    push("bot", k.a);
    const st = shiftStatus();
    push("bot", st.html + " Quick links — call, WhatsApp, email and our social pages — are at the top of this chat.", st.open ? ["call", "wa"] : ["wa", "email"]);
    setChips(["Our services", "Final Expense campaign", "Jobs & hiring", "How far am I?", "Pricing"]);
  };
  const toggle = (force) => {
    const next = typeof force === "boolean" ? force : !open;
    setOpen(next); setTeaser(false);
    if (next) { setBadge(false); if (messages.length === 0) greet(); setTimeout(() => { if (window.innerWidth > 640 && inputRef.current) inputRef.current.focus(); }, 200); }
  };
  const ask = (text) => {
    const q = (text || "").trim(); if (!q) return;
    push("user", escapeHtml(q)); setChips([]); setTyping(true);
    const key = CHIP_MAP[q] || q;
    if (RE_DIST.test(key)) { distanceAnswer().then((r) => { setTyping(false); push("bot", r.html, r.actions); setChips(["Are you open now?", "Contact details", "Jobs & hiring"]); }); return; }
    setTimeout(() => {
      setTyping(false);
      if (RE_OPEN.test(key)) { const st = shiftStatus(); push("bot", st.html, st.open ? ["call", "wa"] : ["wa", "email"]); setChips(["Where are you located?", "Contact details", "Our services"]); return; }
      if (RE_SOCIAL.test(key)) { push("bot", socialAnswer(), ["wa"]); setChips(["Jobs & hiring", "Our services", "Where are you located?"]); return; }
      const k = match(key);
      if (k) { push("bot", k.a, k.actions || []); setChips(k.chips || ["Our services", "Jobs & hiring", "Contact details"]); }
      else { push("bot", FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)], ["wa", "call"]); setChips(DEFAULT_CHIPS); }
    }, 550 + Math.random() * 450);
  };
  const submit = (e) => { e.preventDefault(); const v = input; setInput(""); ask(v); };

  return (
    <div className={`chatbot${open ? " is-open" : ""}`} id="chatbot">
      <div className={`chatbot__bubble${teaser && !open ? " is-visible" : ""}`} role="button" tabIndex={0} onClick={() => toggle(true)} onKeyDown={(e) => e.key === "Enter" && toggle(true)}>👋 Hi! Need help with services, pricing or jobs? Ask me anything.</div>
      <button className="chatbot__launcher" type="button" aria-label="Chat with MAK Assistant" aria-expanded={open} aria-controls="chatbot-window" onClick={() => toggle()}>
        <span className="chatbot__avatar"><Icon name="headset" /></span><span className="chatbot__launcher-text">Chat with us</span>{badge && <i className="chatbot__badge">1</i>}
      </button>
      {open && (
        <div className="chatbot__window" id="chatbot-window" role="dialog" aria-label="MAK Assistant chat">
          <div className="chatbot__head">
            <span className="chatbot__head-avatar"><Icon name="headset" /></span>
            <div><b>MAK Assistant</b><small>Online · replies instantly</small></div>
            <button className="chatbot__close" type="button" aria-label="Close chat" onClick={() => toggle(false)}><Icon name="x" /></button>
          </div>
          <div className="chatbot__quick">
            <a className="qbtn" href={`tel:${C.phoneHref}`}><Icon name="phone" /> Call</a>
            <a className="qbtn qbtn--wa" href={waUrl("Hello MAK BPO! I have a question.")} target="_blank" rel="noopener noreferrer"><BrandIcon name="whatsapp" /> WhatsApp</a>
            <a className="qbtn" href={`mailto:${C.email}`}><Icon name="mail" /> Email</a>
            <div className="chatbot__socials" aria-label="Social media">
              {SOCIALS.filter((k) => config.social[k]).map((k) => <a key={k} href={config.social[k]} target="_blank" rel="noopener noreferrer" aria-label={k} title={k}><BrandIcon name={k} /></a>)}
            </div>
          </div>
          <div className="chatbot__messages" aria-live="polite" ref={listRef}>
            {messages.map((m, i) => (
              <div className={`chatbot__msg chatbot__msg--${m.who}`} key={i}>
                {m.who === "bot" && <span className="chatbot__msg-avatar"><Icon name="headset" /></span>}
                <div className="chatbot__bubble-msg">
                  <Html html={m.html} />
                  {m.actions && m.actions.length > 0 && <div className="chatbot__actions-row">{m.actions.map((k) => <ActionButton k={k} key={k} />)}</div>}
                </div>
              </div>
            ))}
            {typing && <div className="chatbot__msg chatbot__msg--bot"><span className="chatbot__msg-avatar"><Icon name="headset" /></span><div className="chatbot__bubble-msg"><span className="chatbot__typing"><i /><i /><i /></span></div></div>}
          </div>
          <div className="chatbot__chips">{chips.map((c) => <button key={c} type="button" className="chatbot__chip" onClick={() => ask(c)}>{c}</button>)}</div>
          <form className="chatbot__form" autoComplete="off" onSubmit={submit}>
            <label className="sr-only" htmlFor="chatbot-input">Type your question</label>
            <input className="chatbot__input" id="chatbot-input" type="text" placeholder="Type your question…" maxLength={300} value={input} onChange={(e) => setInput(e.target.value)} ref={inputRef} />
            <button className="chatbot__send" type="submit" aria-label="Send"><Icon name="send" /></button>
          </form>
          <div className="chatbot__foot">Automated assistant · For anything else, WhatsApp us</div>
        </div>
      )}
    </div>
  );
}
