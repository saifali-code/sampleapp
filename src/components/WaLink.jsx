import config from "../config";

/** WhatsApp link built from config (optionally with a custom pre-filled message). */
export function waUrl(message) {
  const w = config.whatsapp;
  const text = message || w.message;
  return `https://wa.me/${w.number}${text ? "?text=" + encodeURIComponent(text) : ""}`;
}

export default function WaLink({ message, className = "", children, ...rest }) {
  return (
    <a className={className} href={waUrl(message)} target="_blank" rel="noopener noreferrer" data-wa {...rest}>{children}</a>
  );
}
