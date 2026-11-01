import { useState } from "react";
import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { Icon } from "../components/Icon";
import { PageHero, SectionHead, Grad, CheckList } from "../components/ui";
import { CareersForm } from "../components/forms/Forms";
import WaLink from "../components/WaLink";
import toast from "../utils/toast";
import { JOBS } from "../data/site";
import config from "../config";

const today = new Date().toISOString().slice(0, 10);
const valid = new Date(Date.now() + 90 * 864e5).toISOString().slice(0, 10) + "T23:59:59";
const JOB_JSONLD = JOBS.map((j) => ({ "@context": "https://schema.org", "@type": "JobPosting", "title": j.title, "description": `${j.summary} Requirements: ${j.reqs.join("; ")}. We offer: ${j.offer.join("; ")}.`, "datePosted": today, "validThrough": valid, "employmentType": "FULL_TIME", "industry": "Business Process Outsourcing", "hiringOrganization": { "@type": "Organization", "name": config.company.name, "sameAs": config.siteUrl + "/", "logo": config.siteUrl + "/img/icon-512.png" }, "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "streetAddress": "1st Floor, Building 4, Street 1, Changezi Street, B Block, Satellite Town", "addressLocality": "Rawalpindi", "addressRegion": "Punjab", "postalCode": "46300", "addressCountry": "PK" } }, "jobLocationType": "ONSITE", "workHours": "Night shift 6 PM – 5 AM PKT", "directApply": true, "url": config.siteUrl + "/careers#apply" }));

export default function Careers() {
  useSeo({ path: "/careers", crumb: "Careers", title: "Careers at MAK BPO | Junior Closer, Closer & Validator Jobs in Rawalpindi", description: "Apply online for open positions at MAK BPO & Telecommunications in Rawalpindi: Junior Closer, Closer and Validator roles on our US Final Expense campaign. Night shift, heavy bonuses, daily dinner, paid training. No CV required.", keywords: "call center jobs Rawalpindi, closer jobs Rawalpindi, final expense closer job, validator job, BPO jobs Pakistan", jsonld: JOB_JSONLD });
  const [position, setPosition] = useState("");
  const apply = (title) => {
    setPosition(title);
    const form = document.getElementById("careers-form");
    if (form) window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
    toast(`Position selected: ${title} — complete the form below`, "success");
  };
  return (
    <>
      <PageHero eyebrow="Careers" crumb="Careers" title="Open positions at MAK BPO" lead="We are hiring high-skilled, English-fluent individuals for our US Final Expense campaign in Rawalpindi. Pick a role below and apply in two minutes — no CV required." />
      <section className="section section--tight" id="positions">
        <div className="container container--narrow">
          <SectionHead eyebrow="Open roles" title={<>Currently hiring <Grad>{JOBS.length} positions</Grad></>} lead="We are recruiting 50+ team members this season. All roles are onsite at our Satellite Town headquarters on US business hours — 6:00 PM to 5:00 AM PKT (no daytime shift). We also periodically hire Retention Officers, Team Leads, HR and Managers — choose 'Other' in the form to send your profile." />
          <div className="jobs">
            {JOBS.map((j) => (
              <article className="job-card" data-reveal key={j.title}>
                <div>
                  <div className="job-card__head"><h3>{j.title}</h3><span className="tag">{j.tag}</span></div>
                  <p>{j.summary}</p>
                  <div className="job-card__meta"><span><Icon name="briefcase" /> {j.type}</span><span><Icon name="moon" /> {j.shift}</span><span><Icon name="dollar" /> {j.pay}</span><span><Icon name="pin" /> Satellite Town, Rawalpindi</span></div>
                  <details><summary>Requirements &amp; what we offer</summary>
                    <div className="grid grid--2 mt-1"><div><h4>Requirements</h4><CheckList items={j.reqs} /></div><div><h4>What we offer</h4><CheckList items={j.offer} /></div></div>
                  </details>
                </div>
                <button className="btn btn--primary" type="button" onClick={() => apply(j.title)}>Apply for {j.title} <Icon name="arrow-right" /></button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <SectionHead center eyebrow="Why MAK BPO" title={<>More than a job — <Grad>a track</Grad></>} />
          <div className="perks" data-stagger>
            <div className="perk"><Icon name="dollar" /><b>Heavy bonuses</b><small>Weekly &amp; monthly, paid on time</small></div>
            <div className="perk"><Icon name="coffee" /><b>Dinner &amp; tea</b><small>Served daily on shift</small></div>
            <div className="perk"><Icon name="book" /><b>Paid training</b><small>Before your first live call</small></div>
            <div className="perk"><Icon name="trending" /><b>Promotion track</b><small>Closer → Lead → Manager</small></div>
          </div>
          <p className="center mt-2" data-reveal><Link className="link-arrow" to="/life-at-mak">Explore life at MAK BPO <Icon name="arrow-right" /></Link></p>
        </div>
      </section>
      <section className="section" id="apply">
        <div className="container container--narrow">
          <div className="form-card" data-reveal="zoom">
            <div className="form-card__head"><span className="eyebrow">Apply now</span><h3 className="mt-1">Job application</h3><p>Fill in your details and select the position you're applying for. Our HR team will call you to schedule an interview. No CV upload needed.</p></div>
            <CareersForm position={position} onPositionChange={setPosition} />
          </div>
          <p className="center muted mt-2" data-reveal>Prefer WhatsApp? <WaLink className="link-arrow" message="Hello MAK BPO, I would like to apply for a job. Which positions are open?">Message HR on WhatsApp <Icon name="arrow-right" /></WaLink> &nbsp;·&nbsp; HR lines: {config.company.hrPhones.map((p, i) => <span key={p}>{i > 0 && " / "}<a href={`tel:${p.replace(/\s+/g, "")}`}>{p}</a></span>)}</p>
        </div>
      </section>
    </>
  );
}
