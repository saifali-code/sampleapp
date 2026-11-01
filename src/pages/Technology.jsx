import useSeo from "../hooks/useSeo";
import { PageHero, SectionHead, Grad, Card, FeatureRow, CTABanner } from "../components/ui";

export default function Technology() {
  useSeo({ path: "/technology", crumb: "Technology", title: "Technology & Infrastructure | Dialers, VoIP, Call Recording, QA & Security | MAK BPO", description: "MAK BPO's telecom stack: predictive dialers, redundant VoIP/SIP trunks, 100% call recording, CRM & lead routing, QA tooling, dashboards, backup power, redundant internet and secure monitored floors.", keywords: "call center technology, predictive dialer, VoIP call center Pakistan, contact center infrastructure" });
  return (
    <>
      <PageHero eyebrow="Technology & infrastructure" crumb="Technology" title="The telecom stack behind every call we make" lead="We run our own dialers, VoIP trunks, recording and reporting systems — maintained by an in-house telecom team so campaigns stay up, clear and measurable." />
      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Platform" title={<>Everything a modern contact center <Grad>needs to perform</Grad></>} />
          <div className="grid grid--3" data-stagger>
            <Card icon="phone-out" title="Predictive & power dialers" text="Campaign-level pacing, list management, DNC scrubbing hooks, dispositions and callbacks — tuned to maximise agent talk-time." />
            <Card icon="wifi" title="VoIP & SIP trunking" text="Redundant carriers and routes for crystal-clear US calling, with failover so a carrier issue never stops a shift." />
            <Card icon="mic" title="Call recording & storage" text="100% of calls recorded, indexed by agent, campaign and disposition, searchable for QA and dispute resolution." />
            <Card icon="database" title="CRM & lead routing" text="We work inside your CRM or provide ours; leads route by source, state and agent skill with full audit trails." />
            <Card icon="check-square" title="QA & validation tooling" text="Scorecards, calibration workflows and validation queues keep quality independent from sales pressure." />
            <Card icon="bar-chart" title="Reporting & dashboards" text="Daily production, QA, persistency and cost-per-result dashboards delivered automatically." />
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="split">
            <div className="split__body" data-reveal="left">
              <span className="eyebrow">Facility infrastructure</span>
              <h2 className="mt-1 mb-1">Built to stay online <Grad>through anything</Grad></h2>
              <p className="lead">Rawalpindi can be hard on infrastructure. Our building is set up so power cuts and ISP issues become non-events for your campaign.</p>
              <FeatureRow icon="battery" title="Backup power" text="Generator and UPS coverage keep workstations, networking and cooling running during outages." />
              <FeatureRow icon="wifi" title="Redundant connectivity" text="Multiple internet links with automatic failover for voice and data traffic." />
              <FeatureRow icon="monitor" title="Standardised workstations" text="Noise-cancelling headsets, dual-screen setups where needed and locked-down images for security." />
              <FeatureRow icon="camera" title="Monitored floors" text="CCTV, controlled access and a no-personal-device policy on production floors." />
            </div>
            <div className="split__media" data-reveal="right">
              <div className="media-frame"><img src="/img/crop-windows.jpg" alt="Lit operations floor windows of the MAK BPO building at night" loading="lazy" width="1000" height="262" /><div className="media-frame__caption"><div><b>Operations floors</b><small>Lit up every night for US business hours</small></div></div></div>
              <div className="stats stats--3 mt-1">
                <div className="stat"><div className="stat__value">100%</div><div className="stat__label">Calls recorded</div></div>
                <div className="stat"><div className="stat__value">2+</div><div className="stat__label">Internet links</div></div>
                <div className="stat"><div className="stat__value">US</div><div className="stat__label">Hours, every shift</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Security & data protection" title={<>Your customer data, <Grad>handled responsibly</Grad></>} />
          <div className="grid grid--4" data-stagger>
            <Card icon="lock" title="Access control" text="Role-based permissions, unique logins and immediate de-provisioning when roles change." />
            <Card icon="file" title="NDAs & policies" text="Every team member signs confidentiality agreements and follows written data-handling policies." />
            <Card icon="shield" title="Clean-desk floors" text="No personal phones, USB devices or printing on production floors." />
            <Card icon="eye" title="Audit trails" text="System and recording access is logged so partners can audit who touched what, and when." />
          </div>
          <div className="compare-wrap mt-3" data-reveal>
            <table className="compare">
              <thead><tr><th>Capability</th><th>Run on our stack</th><th>Run inside your systems</th></tr></thead>
              <tbody>
                <tr><td>Dialer &amp; call routing</td><td>Configured and managed by MAK BPO</td><td>Agents log into your dialer</td></tr>
                <tr><td>Recording &amp; QA</td><td>Our recording and scorecard tools</td><td>Your recordings; our QA process</td></tr>
                <tr><td>CRM / lead data</td><td>Our CRM with export to you</td><td>Your CRM, your data never leaves</td></tr>
                <tr><td>Reporting</td><td>Automated daily packs</td><td>Combined from your reports + ours</td></tr>
                <tr><td>Best for</td><td>Fast launches, lead providers</td><td>Regulated programs, enterprise clients</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CTABanner eyebrow="Infrastructure as a service" title="Need a telecom stack for your own team?" text="We configure and manage dialers, VoIP and recording for in-house sales teams and agencies too." primary={{ label: "Talk to Our Telecom Team", to: "/contact" }} />
    </>
  );
}
