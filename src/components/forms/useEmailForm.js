import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import config from "../../config";
import toast from "../../utils/toast";
import { waUrl } from "../WaLink";

const EJ = config.emailjs;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s().-]{6,}$/;
const isPlaceholder = (v) => !v || /^YOUR_/i.test(String(v));
export const isEmailConfigured = () => !isPlaceholder(EJ.publicKey) && !isPlaceholder(EJ.serviceId);
const templateFor = (kind) => (isPlaceholder(EJ.templates[kind]) ? null : EJ.templates[kind]);

const SUCCESS_COPY = {
  contact: "Thank you for reaching out. Our team will respond within one business day.",
  careers: "Your application has been received. Our HR team will contact you by phone or email shortly.",
  partnership: "Thank you for your interest in partnering with MAK BPO. Our partnerships team will get back to you within 24–48 hours.",
};

function validate(form) {
  const errors = {};
  let first = null;
  Array.from(form.querySelectorAll("input, select, textarea")).forEach((input) => {
    if (input.type === "hidden" || input.closest(".honeypot") || !input.name) return;
    const v = (input.value || "").trim();
    let msg = "";
    if (input.required && (input.type === "checkbox" ? !input.checked : !v)) msg = "This field is required.";
    else if (v && input.type === "email" && !EMAIL_RE.test(v)) msg = "Please enter a valid email address.";
    else if (v && input.type === "tel" && !PHONE_RE.test(v)) msg = "Please enter a valid phone number.";
    else if (v && input.minLength > 0 && v.length < input.minLength) msg = `Please enter at least ${input.minLength} characters.`;
    if (msg) { errors[input.name] = msg; if (!first) first = input; }
  });
  if (first) first.focus();
  return errors;
}

function collect(form) {
  const data = {}, lines = [];
  Array.from(form.elements).forEach((el) => {
    if (!el.name || el.closest(".honeypot") || el.type === "submit" || el.type === "button") return;
    const val = el.type === "checkbox" ? (el.checked ? "Yes" : "No") : (el.value || "").trim();
    data[el.name] = val;
    lines.push(`${el.getAttribute("data-label") || el.name}: ${val || "-"}`);
  });
  data.summary = lines.join("\n");
  return data;
}

function mailto(kind, data) {
  const subjects = { contact: "Website enquiry", careers: `Job application — ${data.position || ""}`, partnership: `Partnership request — ${data.company_name || ""}` };
  return `mailto:${EJ.toEmail || config.company.email}?subject=${encodeURIComponent(subjects[kind] || "Website message")}&body=${encodeURIComponent(data.summary || "")}`;
}

/**
 * Handles validation, EmailJS delivery, success / error states and the no-config fallback for one form.
 * Usage: const f = useEmailForm("contact"); <form ref={f.formRef} onSubmit={f.onSubmit} noValidate>…
 */
export default function useEmailForm(kind) {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const clearError = (name) => setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  const reset = () => { if (formRef.current) formRef.current.reset(); setSuccess(false); setStatus(null); setErrors({}); };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current; if (!form) return;
    setStatus(null);
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const hp = form.querySelector(".honeypot input");
    if (hp && hp.value) { setSuccess(true); return; } /* bot trap */

    const data = collect(form);
    data.form_type = kind.charAt(0).toUpperCase() + kind.slice(1) + " form";
    data.to_email = EJ.toEmail || config.company.email;
    data.page_url = window.location.href;
    data.submitted_at = new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi" }) + " (PKT)";
    data.summary += `\n\nSubmitted: ${data.submitted_at}\nPage: ${data.page_url}`;

    const templateId = templateFor(kind);
    if (!isEmailConfigured() || !templateId) {
      const m = mailto(kind, data);
      setStatus({ type: "info", html: `Email delivery is not configured yet. You can <a href="${m}">send this message via your email app</a> or <a href="${waUrl(data.summary)}" target="_blank" rel="noopener">send it on WhatsApp</a>.` });
      window.location.href = m;
      return;
    }
    setLoading(true);
    try {
      await emailjs.send(EJ.serviceId, templateId, data, { publicKey: EJ.publicKey });
      setLoading(false); setSuccess(true); form.reset();
      toast("Sent successfully — thank you!", "success");
    } catch (err) {
      setLoading(false);
      const reason = (err && (err.text || err.message)) || "network error";
      setStatus({ type: "error", html: `We couldn't send your message right now (${reason}). Please <a href="${mailto(kind, data)}">email us</a> or <a href="${waUrl(data.summary)}" target="_blank" rel="noopener">message us on WhatsApp</a>.` });
      toast("Sending failed — please try again or use WhatsApp.", "error");
    }
  };

  return { formRef, errors, status, loading, success, successText: SUCCESS_COPY[kind] || SUCCESS_COPY.contact, onSubmit, reset, clearError };
}
