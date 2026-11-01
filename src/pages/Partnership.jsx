import useSeo from "../hooks/useSeo";
import { PageHero, SectionHead, Grad, Card, Steps, CTABanner, CheckList } from "../components/ui";
import { PartnershipForm } from "../components/forms/Forms";
import config from "../config";

const STEPS = [{ title: "Intro call", text: "Goals, volumes, models and compliance in 30 minutes." }, { title: "Agreement", text: "Simple written terms: payouts, reporting, responsibilities." }, { title: "Pilot", text: "A 2–4 week pilot with daily reporting and calibration." }, { title: "Scale", text: "Expand seats and campaigns as validated results prove out." }];

export default function Partnership() {
  useSeo({ path: "/partnership", crumb: "Partnership", title: "Partner with MAK BPO | Insurance Agencies, Lead Providers & Outsourcing Clients", description: "Partner with MAK BPO & Telecommunications: Final Expense, IUL, ACA and Auto closing for insurance agencies and IMOs, sales-sharing for lead providers, dedicated outsourcing teams and referral partnerships. Submit a partnership request online.", keywords: "final expense partnership, lead provider partnership, call center partnership Pakistan, pre-closed deals" });
  return (
    <>
      <PageHero eyebrow="Partnership" crumb="Partnership" title="Partner with a closing floor you can trust" lead="Whether you are an insurance agency, a lead provider, a business that needs support and sales capacity, or a referral partner — we have a model built for you." />
      <section className="section section--tight">
        <div className="container">
          <SectionHead center eyebrow="Partnership models" title={<>Four ways to <Grad>grow together</Grad></>} />
          <div className="grid grid--4" data-stagger>
            <Card icon="umbrella" title="Insurance agencies & IMOs" text="Plug our fronter/closer/validator pods into your Final Expense, IUL, ACA, Auto or Medicare book. Fixed payout or commission per validated deal." items={["Licensed-agent ready hand-offs", "Validation on 100% of sales", "Retention coverage"]} />
            <Card icon="target" title="Lead providers" text="We outsource our Final Expense campaign to strong partners and quality lead providers on a fixed payout or percentage-commission basis. Send TV, Facebook, live-transfer or aged leads and get paid on validated closes under a transparent sales-sharing agreement." items={["Fixed payout or % commission", "Recordings for every sale", "Fast, clear settlements"]} />
            <Card icon="headset" title="Outsourcing clients" text="Dedicated inbound support, outbound sales, back-office or chat teams for your business — on seat, hourly or performance pricing." items={["Go-live in 14 days", "Daily reports", "Scale on demand"]} />
            <Card icon="share" title="Referral & reseller partners" text="Introduce clients or resell our capacity to your network and earn recurring referral commissions." items={["Recurring commissions", "Co-branded proposals", "Dedicated partner manager"]} />
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="split">
            <div className="split__body" data-reveal="left">
              <span className="eyebrow">Why partners choose us</span>
              <h2 className="mt-1 mb-1">Verified deals, <Grad>visible numbers</Grad>, reachable people</h2>
              <p className="lead">Partnerships fail on trust. Ours are built on recordings, validation and daily reporting — plus a management team that answers WhatsApp at 2 AM your time.</p>
              <CheckList items={["Written sales-sharing or service agreements with clear payout terms", "Independent validation before any deal reaches you", "Daily production reports and recordings, weekly calibration calls", "Compliance-first scripts reviewed with you before launch", "Capacity to grow from a 5-seat pilot to a full floor"]} />
            </div>
            <div className="split__media" data-reveal="right"><Steps items={STEPS} className="steps--2" /></div>
          </div>
        </div>
      </section>
      <section className="section" id="partner-form">
        <div className="container container--narrow">
          <div className="form-card" data-reveal="zoom">
            <div className="form-card__head"><span className="eyebrow">Partnership enquiry</span><h3 className="mt-1">Tell us about your business</h3><p>Our partnerships team replies within 24–48 hours with a proposed model, pilot plan and next steps. Prefer messaging? Partnerships line: <a href={`https://wa.me/${config.company.partnershipsLine.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer">{config.company.partnershipsLine}</a> (WhatsApp / messages).</p></div>
            <PartnershipForm />
          </div>
        </div>
      </section>
      <CTABanner eyebrow="Prefer to talk?" title="Jump on WhatsApp with our partnerships team" text="Share your lead flow or campaign details and we'll outline a model on the spot." primary={{ label: `Call ${config.company.phone}`, href: `tel:${config.company.phoneHref}` }} />
    </>
  );
}
