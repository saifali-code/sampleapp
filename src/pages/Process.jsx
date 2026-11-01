import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { Icon } from "../components/Icon";
import { PageHero, SectionHead, Grad, Card, Timeline, CTABanner, CheckList } from "../components/ui";

const PHASES = [
  { when: "Day 1–2", title: "Discovery & scoping", text: "A 30-minute call to understand your product, markets, volumes, hours, systems and compliance requirements. You receive a written scope, team structure and commercial proposal.", tags: ["Scope document", "Team & shift plan", "Pricing model"] },
  { when: "Day 3–5", title: "Campaign design", text: "We draft scripts, rebuttals, qualification criteria and disclosures with you, define KPIs and build dialer, CRM and reporting templates.", tags: ["Approved scripts", "KPI sheet & SLAs", "Dialer / CRM setup"] },
  { when: "Day 5–9", title: "Recruitment & training", text: "Agents are hand-picked from our floors or recruited for your profile, then complete product, compliance and mock-call certification with a pass mark.", tags: ["Certified agent roster", "Mock-call recordings", "QA rubric"] },
  { when: "Day 10–12", title: "Soft launch", text: "A limited-volume launch with live monitoring, same-day coaching and script calibration based on real customer responses.", tags: ["Daily calibration notes", "Script v2", "Go/no-go review"] },
  { when: "Day 13–14", title: "Full go-live", text: "Volume ramps to the agreed seat count with daily production reports, recordings and QA scorecards flowing to your inbox.", tags: ["Daily report pack", "Recording access", "Escalation path"] },
  { when: "Ongoing", title: "Optimise & scale", text: "Weekly QA reviews, A/B tested scripts, monthly business reviews and seat expansion as results prove out.", tags: ["Weekly QA review", "Monthly business review", "Expansion plan"] },
];
const HOWTO = { "@context": "https://schema.org", "@type": "HowTo", "name": "How MAK BPO launches a campaign in 14 days", "step": PHASES.map((p) => ({ "@type": "HowToStep", "name": p.title, "text": p.text })) };

export default function Process() {
  useSeo({ path: "/process", crumb: "How We Work", title: "How We Work | 14-Day Campaign Onboarding Process | MAK BPO", description: "See MAK BPO's six-phase onboarding playbook — discovery, campaign design, recruitment & training, soft launch, go-live and optimisation — that takes campaigns live in about 14 days.", keywords: "call center onboarding process, outsourcing process, campaign launch timeline", jsonld: [HOWTO] });
  return (
    <>
      <PageHero eyebrow="How we work" crumb="How We Work" title="From discovery call to go-live in 14 days" lead="A transparent, repeatable onboarding playbook — so you always know what happens next, who owns it and what 'done' looks like." />
      <section className="section"><div className="container container--narrow"><SectionHead eyebrow="Onboarding playbook" title={<>Six phases, <Grad>zero surprises</Grad></>} /><Timeline items={PHASES} /></div></section>
      <section className="section section--alt">
        <div className="container">
          <SectionHead center eyebrow="Day-to-day operations" title={<>What a campaign looks like <Grad>once it is live</Grad></>} />
          <div className="grid grid--4" data-stagger>
            <Card icon="sun" title="Daily" text="Pre-shift huddle, live monitoring, end-of-shift production report with recordings and validated results." />
            <Card icon="calendar" title="Weekly" text="QA calibration with your team, script and rebuttal updates, agent coaching plans and KPI review." />
            <Card icon="pie" title="Monthly" text="Business review: conversion, quality, persistency, cost per result and the expansion roadmap." />
            <Card icon="bell" title="Anytime" text="Named campaign manager on WhatsApp and email, with a defined escalation path to leadership." />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__media" data-reveal="left">
              <div className="card card--flat" style={{ padding: "2.2rem" }}>
                <div className="card__icon"><Icon name="check-square" /></div>
                <h3 className="card__title">What we need from you</h3>
                <CheckList items={["Product or offer details and any existing scripts", "Target market, hours and expected volumes", "Access to your CRM / dialer, or a decision to use ours", "Compliance requirements and mandatory disclosures", "A point of contact for weekly calibration"]} />
              </div>
            </div>
            <div className="split__body" data-reveal="right">
              <span className="eyebrow">Partnership, not vendorship</span>
              <h2 className="mt-1 mb-1">You stay in control, <Grad>we do the heavy lifting</Grad></h2>
              <p className="lead">Our process is designed so a busy owner or operations lead can launch a campaign with a few hours of involvement — and still see every call, every deal and every score.</p>
              <p>Change a script on Monday, see the impact in Tuesday's report. Expand seats when the numbers say so. Pause, pivot or scale with notice, not penalties.</p>
              <Link className="btn btn--primary" to="/contact#quote">Start Discovery <Icon name="arrow-right" /></Link>
            </div>
          </div>
        </div>
      </section>
      <CTABanner eyebrow="Ready when you are" title="Book your discovery call this week" text="Fourteen days from now your campaign could be live. Let's start the clock." primary={{ label: "Contact Us", to: "/contact" }} />
    </>
  );
}
