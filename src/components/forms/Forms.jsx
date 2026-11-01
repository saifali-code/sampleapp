import { useEffect, useState } from "react";
import useEmailForm from "./useEmailForm";
import { Field, Honeypot, FormStatus, FormSuccess, SubmitButton } from "./Field";
import config from "../../config";

/* ---------- Contact ---------- */
export function ContactForm() {
  const f = useEmailForm("contact");
  return (
    <form className="form" id="contact-form" ref={f.formRef} onSubmit={f.onSubmit} noValidate>
      <Honeypot />
      <div className="form__grid">
        <Field name="from_name" label="Full name" placeholder="Your full name" autoComplete="name" error={f.errors.from_name} onClear={f.clearError} />
        <Field name="from_email" label="Email address" type="email" placeholder="you@example.com" autoComplete="email" error={f.errors.from_email} onClear={f.clearError} />
        <Field name="phone" label="Phone / WhatsApp" type="tel" placeholder="Include country code" autoComplete="tel" error={f.errors.phone} onClear={f.clearError} />
        <Field name="subject" label="I'm contacting you about" placeholder="Select a topic" options={["Getting a quote", "Outsourcing customer support", "Outsourcing sales / telemarketing", "Final Expense partnership", "IUL / ACA / Auto insurance campaign", "Lead provider partnership", "Careers / jobs", "Something else"]} error={f.errors.subject} onClear={f.clearError} />
        <Field name="message" label="Message" rows={5} placeholder="Tell us about your goals, volumes and timeline…" full error={f.errors.message} onClear={f.clearError} />
      </div>
      <div className="form__actions">
        <SubmitButton loading={f.loading} label="Send Message" />
        <span className="form__note">We reply within one business day.</span>
      </div>
      <FormStatus status={f.status} />
      <FormSuccess visible={f.success} text={f.successText} onReset={f.reset} />
    </form>
  );
}

/* ---------- Careers (position can be prefilled from the job cards) ---------- */
export function CareersForm({ position, onPositionChange }) {
  const f = useEmailForm("careers");
  const [pos, setPos] = useState(position || "");
  useEffect(() => { if (position) setPos(position); }, [position]);
  return (
    <form className="form" id="careers-form" ref={f.formRef} onSubmit={f.onSubmit} noValidate>
      <Honeypot />
      <div className="form__grid">
        <Field name="from_name" label="Full name" placeholder="Your full name" autoComplete="name" error={f.errors.from_name} onClear={f.clearError} />
        <Field name="phone" label="Phone / WhatsApp" type="tel" placeholder="+92 3xx xxxxxxx" autoComplete="tel" error={f.errors.phone} onClear={f.clearError} />
        <Field name="from_email" label="Email address" type="email" placeholder="you@example.com" autoComplete="email" error={f.errors.from_email} onClear={f.clearError} />
        <Field name="position" label="Position applying for" placeholder="Select a position" options={config.openPositions} value={pos} onChange={(e) => { setPos(e.target.value); onPositionChange && onPositionChange(e.target.value); }} error={f.errors.position} onClear={f.clearError} />
        <Field name="experience" label="Call-center / sales experience" placeholder="Select experience" options={["Fresh (no experience)", "Less than 6 months", "6 months – 1 year", "1 – 2 years", "2+ years"]} error={f.errors.experience} onClear={f.clearError} />
        <Field name="city" label="Current city" placeholder="e.g. Rawalpindi" autoComplete="address-level2" error={f.errors.city} onClear={f.clearError} />
        <Field name="night_shift" label="Available for night shift (6 PM – 5 AM)?" placeholder="Select" options={["Yes", "Not sure", "No"]} error={f.errors.night_shift} onClear={f.clearError} />
        <Field name="english_level" label="Spoken English level" placeholder="Select" options={["Fluent", "Good", "Intermediate"]} error={f.errors.english_level} onClear={f.clearError} />
        <Field name="message" label="Tell us about yourself" rows={4} placeholder="Previous campaigns, achievements, why you want this role…" required={false} full error={f.errors.message} onClear={f.clearError} />
      </div>
      <div className="form__actions">
        <SubmitButton loading={f.loading} label="Submit Application" />
        <span className="form__note">We usually call applicants within 2 working days.</span>
      </div>
      <FormStatus status={f.status} />
      <FormSuccess visible={f.success} text={f.successText} onReset={f.reset} />
    </form>
  );
}

/* ---------- Partnership ---------- */
export function PartnershipForm() {
  const f = useEmailForm("partnership");
  return (
    <form className="form" id="partnership-form" ref={f.formRef} onSubmit={f.onSubmit} noValidate>
      <Honeypot />
      <div className="form__grid">
        <Field name="company_name" label="Company / agency name" placeholder="Your company" autoComplete="organization" error={f.errors.company_name} onClear={f.clearError} />
        <Field name="from_name" label="Contact person" placeholder="Your full name" autoComplete="name" error={f.errors.from_name} onClear={f.clearError} />
        <Field name="from_email" label="Work email" type="email" placeholder="you@company.com" autoComplete="email" error={f.errors.from_email} onClear={f.clearError} />
        <Field name="phone" label="Phone / WhatsApp" type="tel" placeholder="+1 (___) ___-____" autoComplete="tel" error={f.errors.phone} onClear={f.clearError} />
        <Field name="country" label="Country" placeholder="e.g. United States" autoComplete="country-name" error={f.errors.country} onClear={f.clearError} />
        <Field name="website" label="Website" placeholder="https://" required={false} autoComplete="url" error={f.errors.website} onClear={f.clearError} />
        <Field name="partnership_type" label="Partnership type" placeholder="Select" options={["Insurance agency / IMO", "Lead provider", "Outsource support / sales to MAK BPO", "Referral / reseller partner", "Telecom / infrastructure", "Other"]} error={f.errors.partnership_type} onClear={f.clearError} />
        <Field name="campaign" label="Campaign of interest" placeholder="Select" options={["Final Expense", "IUL (Indexed Universal Life)", "ACA / Health", "Auto / Home insurance", "Medicare Advantage", "Solar / Home improvement", "Debt relief", "Customer support / back-office", "Other"]} error={f.errors.campaign} onClear={f.clearError} />
        <Field name="volume" label="Expected monthly volume" placeholder="Select" options={["Pilot (up to 5 seats / 500 leads)", "Growing (5–15 seats / 500–2,000 leads)", "Scale (15+ seats / 2,000+ leads)", "Not sure yet"]} error={f.errors.volume} onClear={f.clearError} />
        <Field name="start_date" label="Preferred start" placeholder="Select" options={["As soon as possible", "Within 30 days", "Within 90 days", "Just exploring"]} error={f.errors.start_date} onClear={f.clearError} />
        <Field name="message" label="Tell us more" rows={5} placeholder="Lead sources, carriers, states, current vendors, goals…" full error={f.errors.message} onClear={f.clearError} />
      </div>
      <div className="form__actions">
        <SubmitButton loading={f.loading} label="Send Partnership Request" />
        <span className="form__note">Or email <a href={`mailto:${config.company.email}`}>{config.company.email}</a></span>
      </div>
      <FormStatus status={f.status} />
      <FormSuccess visible={f.success} text={f.successText} onReset={f.reset} />
    </form>
  );
}
