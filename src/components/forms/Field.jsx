import { Icon } from "../Icon";

/** Form field (input / select / textarea) with label, required marker and inline error. */
export function Field({ name, label, type = "text", placeholder = "", required = true, full = false, options, rows, autoComplete, error, onClear, value, onChange }) {
  const cls = `field${full ? " field--full" : ""}${options ? " field--select" : ""}${error ? " is-invalid" : ""}`;
  const common = { id: name, name, required, "data-label": label, "aria-invalid": error ? "true" : undefined, onInput: () => onClear && onClear(name) };
  return (
    <div className={cls}>
      <label className="field__label" htmlFor={name}>{label}{required && <span className="req"> *</span>}</label>
      {options ? (
        <select className="field__select" {...common} {...(value === undefined ? { defaultValue: "" } : { value, onChange: onChange || (() => {}) })}>
          <option value="" disabled>{placeholder || "Select"}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : rows ? (
        <textarea className="field__textarea" rows={rows} placeholder={placeholder} {...common} />
      ) : (
        <input className="field__input" type={type} placeholder={placeholder} autoComplete={autoComplete} {...common} />
      )}
      {error && <div className="field__error">{error}</div>}
    </div>
  );
}

export const Honeypot = () => (
  <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input type="text" name="website_url" tabIndex={-1} autoComplete="off" /></label></div>
);

export function FormStatus({ status }) {
  if (!status) return null;
  return <div className={`form__status is-${status.type}`} role="alert" dangerouslySetInnerHTML={{ __html: status.html }} />;
}

export function FormSuccess({ visible, text, onReset }) {
  if (!visible) return null;
  return (
    <div className="form__success is-visible">
      <div>
        <div className="checkmark"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></div>
        <h3>Message sent successfully!</h3>
        <p>{text}</p>
        <button type="button" className="btn btn--ghost btn--sm mt-1" onClick={onReset}>Send another</button>
      </div>
    </div>
  );
}

export function SubmitButton({ loading, label }) {
  return (
    <button className={`btn btn--primary btn--lg${loading ? " is-loading" : ""}`} type="submit" disabled={loading}>
      <span className="spinner" /><span className="btn__label">{label}</span> <Icon name="send" />
    </button>
  );
}
