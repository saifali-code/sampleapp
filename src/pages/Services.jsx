import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { Icon } from "../components/Icon";
import { PageHero, SectionHead, Grad, Card, ServiceBlock, CTABanner } from "../components/ui";
import Accordion from "../components/Accordion";
import { INSURANCE, CORE } from "../data/services";
import config from "../config";

const MINI_FAQ = [
  { q: "How fast can a campaign go live?", a: "Support desks and simple outbound programs typically launch within 7–14 days of signing. Final Expense, IUL, ACA and other insurance campaigns take 10–21 days to allow for product and compliance certification." },
  { q: "What is the minimum team size?", a: "We recommend starting with a 5-seat pilot so there is enough data to calibrate scripts and QA; many partners expand to a full floor within the first quarter." },
  { q: "Do you work on US time zones?", a: "Yes — exclusively. Our floor runs on US business hours: 6:00 PM – 5:00 AM Pakistan time (PKT), which covers US Eastern through Pacific. We do not run daytime shifts in Pakistan." },
  { q: "Can we use our own dialer and CRM?", a: "Absolutely. Our agents work inside your systems whenever you prefer; otherwise we provide dialer, recording and reporting from our own stack." },
];

const SERVICES_JSONLD = { "@context": "https://schema.org", "@type": "ItemList", "name": "MAK BPO Services", "itemListElement": [...INSURANCE, ...CORE].map((s, i) => ({ "@type": "ListItem", "position": i + 1, "item": { "@type": "Service", "name": s.eyebrow, "serviceType": s.eyebrow, "provider": { "@id": config.siteUrl + "/#organization" }, "areaServed": "US", "url": config.siteUrl + "/services#" + s.id, "description": s.lead } })) };

export default function Services() {
  useSeo({ path: "/services", crumb: "Services", pageType: "CollectionPage", title: "BPO & Call Center Services | Final Expense, IUL, ACA, Auto, Inbound, Outbound | MAK BPO", description: "Explore MAK BPO's services: Final Expense, IUL, ACA and Auto insurance campaigns, US-hours inbound customer support, outbound telesales, lead generation, quality assurance & validation, retention, back-office, live chat and telecom infrastructure.", keywords: "BPO services, call center services Pakistan, final expense campaign, IUL telesales, ACA enrollment call center, auto insurance leads, inbound call center, back office outsourcing", jsonld: [SERVICES_JSONLD] });
  return (
    <>
      <PageHero eyebrow="Services" crumb="Services" title="BPO & call center services built around your KPIs" lead="Final Expense, IUL, ACA and Auto insurance campaigns, inbound support, outbound sales, lead generation, validation, back-office and the telecom stack that powers it all — delivered on US business hours from Rawalpindi on the engagement model that fits your business." />

      <section className="section section--tight">
        <div className="container">
          <SectionHead center eyebrow="Engagement models" title={<>Choose how you want to <Grad>work with us</Grad></>} lead="Flexible commercial models — switch as your campaign matures." />
          <div className="grid grid--4" data-stagger>
            <Card icon="users" title="Dedicated team" text="Named agents, team lead and QA working only on your campaign, billed per seat per month." items={["Full control of scripts & hours", "Weekly performance reviews"]} />
            <Card icon="clock" title="Hourly / shared" text="Flexible coverage for support desks and overflow, billed per productive hour." items={["Scale up or down weekly", "Ideal for inbound & chat"]} />
            <Card icon="percent" title="Pay-per-performance" text="Pay for validated sales, appointments or qualified leads — fixed payout or commission." items={["Aligned incentives", "Our flagship Final Expense model"]} />
            <Card icon="shuffle" title="Pre-closed deals" text="Buy validated, pre-closed Final Expense deals produced by our floor under a sales-sharing agreement." items={["Deal-by-deal validation", "Transparent recordings"]} />
          </div>
        </div>
      </section>

      <section className="section section--alt section--glow" id="insurance">
        <div className="container">
          <SectionHead center eyebrow="Insurance sales campaigns" title={<>US insurance programs we <Grad>run every night</Grad></>} lead="Final Expense, IUL, ACA and Auto — four insurance campaigns with trained closers, licensed-agent hand-offs, independent validation and daily reporting. Offered on fixed-payout, commission, per-seat or pre-closed-deal models." />
          <div className="grid grid--4" data-stagger>
            <Card icon="umbrella" title="Final Expense" text="Phone-closable burial / funeral cover for US seniors — our flagship closing floor." link="#final-expense" linkText="Details" />
            <Card icon="trending" title="IUL" text="Indexed Universal Life — consultative, appointment-driven sales to working-age families." link="#iul" linkText="Details" />
            <Card icon="heart" title="ACA Health" text="Marketplace enrollment: eligibility screening, subsidy explanation and certified-agent transfers." link="#aca" linkText="Details" />
            <Card icon="truck" title="Auto Insurance" text="Quote generation, qualification and warm transfers for P&C agencies and comparison platforms." link="#auto" linkText="Details" />
          </div>
        </div>
      </section>
      {INSURANCE.map((s) => <ServiceBlock key={s.id} {...s} title={<>{s.title[0]}<Grad>{s.title[1]}</Grad></>} />)}

      <section className="section section--tight"><div className="container"><SectionHead center eyebrow="Core services" title={<>Everything else a growing business <Grad>needs to outsource</Grad></>} /></div></section>
      {CORE.map((s) => <ServiceBlock key={s.id} {...s} title={<>{s.title[0]}<Grad>{s.title[1]}</Grad></>} />)}

      <section className="section section--alt">
        <div className="container">
          <SectionHead center eyebrow="Campaigns we run" title={<>Vertical expertise, <Grad>ready to launch</Grad></>} lead="Pre-built scripts, rebuttals and compliance guardrails for the programs our partners ask for most." />
          <div className="grid grid--4" data-stagger>
            <Card icon="umbrella" title="Final Expense" text="Our flagship US life-insurance telesales pipeline." link="/campaigns#final-expense" linkText="Campaign details" />
            <Card icon="trending" title="IUL" text="Indexed Universal Life appointment setting and consultative closing." link="/campaigns#iul" linkText="Campaign details" />
            <Card icon="shield" title="ACA / Health" text="Marketplace enrollment assistance and eligibility pre-screening." link="/campaigns#aca" linkText="Campaign details" />
            <Card icon="truck" title="Auto Insurance" text="Quote qualification and warm transfers to licensed P&C agents." link="/campaigns#auto" linkText="Campaign details" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="Pricing & FAQs" title={<>Straight answers about <Grad>cost and commitment</Grad></>} />
          <div className="pricing-note mb-2" data-reveal>Pricing depends on the service, hours, seat count and model (per seat, per hour or per validated result). Every quote includes management, QA, telecom and reporting — there are no hidden setup fees for standard campaigns.</div>
          <div data-reveal><Accordion items={MINI_FAQ} openFirst /></div>
          <p className="mt-2" data-reveal><Link className="link-arrow" to="/faq">Read all FAQs <Icon name="arrow-right" /></Link></p>
        </div>
      </section>
      <CTABanner eyebrow="Get started" title="Tell us what you need to outsource" text="Share a few details and receive a tailored proposal with team structure, pricing model and launch timeline within one business day." primary={{ label: "Request a Quote", to: "/contact#quote" }} />
    </>
  );
}
