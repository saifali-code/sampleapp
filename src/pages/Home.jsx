import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useSeo, { ORG_JSONLD, WEBSITE_JSONLD } from "../hooks/useSeo";
import Hero3D from "../components/Hero3D";
import { Icon } from "../components/Icon";
import { SectionHead, Grad, Card, Marquee, Counter, Steps, CTABanner, Tags, CheckList, BuildingPicture, Kpis } from "../components/ui";
import Testimonials from "../components/Testimonials";
import { TESTIMONIALS } from "../data/site";

const TITLE = "Pakistan's Insurance-Expert Call Center & BPO Partner";
const ROTATOR = ["Final Expense Closing", "IUL Appointments", "ACA Enrollment", "Auto Insurance Transfers", "Inbound Support", "Outbound Sales", "Lead Generation"];
const MARQUEE = ["Inbound Customer Support", "Outbound Telesales", "Final Expense Closing", "IUL Appointments", "ACA Enrollment", "Auto Insurance Transfers", "Lead Generation", "Appointment Setting", "Live Chat & Email", "Data Validation", "Back-Office Processing", "Quality Assurance", "Retention & Follow-ups", "Telecom & VoIP"];

function HeroTitle() {
  let c = 0;
  return (
    <h1 className="hero__title">
      <span className="line">
        {TITLE.split(" ").map((w, wi) => (
          <span key={wi}><span className="word" style={{ animation: "none", transform: "none" }}>
            {Array.from(w).map((ch, i) => <span key={i} className="char" style={{ "--c": c++ }}>{ch}</span>)}
          </span>{" "}</span>
        ))}
      </span>
    </h1>
  );
}

function HeroRotator() {
  const [i, setI] = useState(0);
  const [active, setActive] = useState(true);
  useEffect(() => {
    const id = setInterval(() => { setActive(false); setTimeout(() => { setI((v) => (v + 1) % ROTATOR.length); setActive(true); }, 380); }, 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="hero__rotator" style={{ fontWeight: 700 }}>
      {ROTATOR.map((w, k) => <span key={w} className={`text-gradient${k === i && active ? " is-active" : ""}`}>{w}</span>)}
    </span>
  );
}

const STEPS = [
  { title: "Discovery", text: "We map your goals, volumes, markets and compliance needs in a 30-minute call." },
  { title: "Campaign design", text: "Scripts, rebuttals, KPIs, dialer setup and reporting templates built for your offer." },
  { title: "Team & training", text: "Hand-picked agents complete product, compliance and mock-call certification." },
  { title: "Launch", text: "Soft launch with daily calibration, then full go-live — typically within 14 days." },
  { title: "Optimize & scale", text: "Weekly QA reviews, A/B tested scripts and seat expansion as results prove out." },
];
const WHY = [
  ["award", "Performance-bred closers", "Agents are recruited for English fluency and sales aptitude, then trained on real campaigns with weekly and monthly performance bonuses."],
  ["shield-check", "Compliance & QA first", "Call recording, consent scripting, DNC scrubbing awareness and independent validation keep every sale clean."],
  ["cpu", "Modern telecom stack", "Predictive dialers, VoIP trunks, CRM integrations and recording systems maintained by our in-house telecom team."],
  ["bar-chart", "Transparent reporting", "Daily production reports, QA scorecards and recordings shared with you — no black boxes."],
  ["dollar", "Cost efficiency", "Offshore delivery from Rawalpindi lowers your cost per sale and per contact without lowering standards."],
  ["trending", "Scale on demand", "Four operations floors let us grow a pilot team into a full campaign floor in weeks."],
  ["lock", "Data security", "Access-controlled floors, CCTV, NDAs and role-based system permissions protect your customer data."],
  ["users", "Dedicated management", "A campaign manager, team leads and QA analysts own your KPIs and talk to you every day."],
];
const TECH = [["phone-out", "Predictive Dialer", "Max talk-time, min idle"], ["wifi", "VoIP / SIP Trunks", "Redundant carriers"], ["database", "CRM & Lead Routing", "Your CRM or ours"], ["mic", "100% Call Recording", "Searchable archive"], ["check-square", "QA Scorecards", "Calibrated weekly"], ["bar-chart", "Live Dashboards", "Daily KPI reporting"]];
const ORBIT = (a, text) => { const x = 50 + 50 * Math.cos((a * Math.PI) / 180), y = 50 + 50 * Math.sin((a * Math.PI) / 180); return <span key={text} style={{ left: `${x.toFixed(1)}%`, top: `${y.toFixed(1)}%` }}>{text}</span>; };

export default function Home() {
  useSeo({
    path: "/",
    title: "MAK BPO & Telecommunications | Call Center & BPO Outsourcing in Rawalpindi, Pakistan",
    description: "MAK BPO & Telecommunications is an insurance-expert call center and BPO company in Rawalpindi, Pakistan working US business hours — inbound support, outbound sales, Final Expense, IUL, ACA and Auto insurance campaigns, lead generation, validation and back-office outsourcing for US clients.",
    keywords: "call center Rawalpindi, BPO company Pakistan, final expense closers, IUL campaign, ACA call center, outsourcing partner, telesales outsourcing",
    jsonld: [ORG_JSONLD, WEBSITE_JSONLD],
  });
  const heroRef = useRef(null);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero" id="hero" ref={heroRef}>
        <Hero3D heroRef={heroRef} />
        <div className="hero__veil" aria-hidden="true" />
        <div className="container">
          <div className="hero__content">
            <div className="hero__eyebrow"><span className="dot" /> Live on US hours &nbsp;·&nbsp; Call Center &amp; BPO<span className="hide-xs"> &nbsp;·&nbsp; Rawalpindi, Pakistan</span></div>
            <HeroTitle />
            <p className="hero__lead"><strong>MAK BPO &amp; Telecommunications</strong> is a Rawalpindi call center built around US insurance sales — <strong>Final Expense, IUL, ACA and Auto</strong> — with trained closers, independent validators and daily reporting. We work exclusively on US business hours, 6:00 PM – 5:00 AM PKT, from our own five-storey headquarters in Satellite Town.</p>
            <p className="hero__lead" style={{ animationDelay: ".8s" }}>Experts in <HeroRotator /></p>
            <div className="hero__actions">
              <Link className="btn btn--primary btn--lg" to="/partnership">Start a Partnership <Icon name="arrow-right" /></Link>
              <Link className="btn btn--ghost btn--lg" to="/services">Explore Services</Link>
            </div>
            <div className="hero__badges">
              <span><Icon name="clock" /> US Business Hours (6 PM – 5 AM PKT)</span>
              <span><Icon name="globe" /> US-focused Campaigns</span>
              <span><Icon name="shield-check" /> QA &amp; Validation Built-in</span>
              <span><Icon name="building" /> Registered Pvt. Ltd.</span>
            </div>
          </div>
        </div>
        <div className="hero__stats" aria-hidden="true">
          <div className="hero__stat" style={{ "--i": 0 }}><b>5-Storey HQ</b><small>Satellite Town, Rawalpindi</small></div>
          <div className="hero__stat" style={{ "--i": 1 }}><b>US Hours Only</b><small>6 PM – 5 AM PKT, every shift</small></div>
          <div className="hero__stat" style={{ "--i": 2 }}><b>In-house Teams</b><small>Closers, validators, QA, HR</small></div>
        </div>
        <div className="hero__scroll" aria-hidden="true"><span>Scroll</span><i /></div>
      </section>
      <Marquee items={MARQUEE} />

      {/* ---------------- STATS ---------------- */}
      <section className="section section--tight">
        <div className="container">
          <div className="stats" data-stagger>
            <div className="stat"><div className="stat__value"><Counter end={100} suffix="+" /></div><div className="stat__label">Agent seats across four operations floors</div></div>
            <div className="stat"><div className="stat__value">6PM–5AM</div><div className="stat__label">PKT — live on US business hours, every shift</div></div>
            <div className="stat"><div className="stat__value"><Counter end={95} suffix="%" /></div><div className="stat__label">QA pass-rate target on every campaign</div></div>
            <div className="stat"><div className="stat__value"><Counter end={14} prefix="≤" suffix=" days" /></div><div className="stat__label">From discovery call to campaign go-live</div></div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__media" data-reveal="left">
              <div className="media-frame media-frame--glow">
                <BuildingPicture alt="MAK BPO & Telecommunications head office building in Satellite Town, Rawalpindi at dusk" />
                <div className="media-frame__caption"><div><b>Head Office</b><small>B Block, Satellite Town, Rawalpindi</small></div><span className="tag">Since day one</span></div>
              </div>
              <div className="floating-card floating-card--tl"><Icon name="users" /><div><b>In-house teams</b><small>Closers · Validators · QA</small></div></div>
              <div className="floating-card floating-card--br"><Icon name="activity" /><div><b>Real-time reporting</b><small>Daily dashboards</small></div></div>
            </div>
            <div className="split__body" data-reveal="right">
              <span className="eyebrow">About MAK BPO</span>
              <h2 className="mt-1 mb-1">Built in Rawalpindi.<br /><Grad>Trusted across the US.</Grad></h2>
              <p className="lead">MAK BPO &amp; Telecommunications is a private limited BPO and call center company headquartered in a purpose-built five-storey facility in Satellite Town, Rawalpindi. We combine disciplined people, modern telecom infrastructure and a performance-driven culture to deliver measurable results for our partners.</p>
              <p>From inbound customer support to high-ticket Final Expense closing, every campaign is run by trained, English-fluent agents, monitored by a dedicated quality team and reported transparently — so our partners always know exactly what they are getting.</p>
              <CheckList items={["Purpose-built headquarters with four operations floors", "Trained closers, fronters, validators and retention officers", "Night-shift coverage aligned to US Eastern to Pacific time", "Call recording, QA scorecards and compliance-first scripting"]} />
              <div className="mt-2"><Link className="btn btn--primary" to="/about">Our Story <Icon name="arrow-right" /></Link> <Link className="btn btn--ghost" to="/life-at-mak">Life at MAK BPO</Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="section section--alt section--glow" id="services">
        <div className="container">
          <SectionHead center eyebrow="What we do" title={<>End-to-end BPO services, <Grad>engineered for outcomes</Grad></>} lead="Everything a growing business needs to acquire, serve and retain customers — delivered by one accountable team in Rawalpindi." />
          <div className="bento" data-stagger>
            <article className="card card--featured bento--wide" data-tilt="5">
              <span className="tag tag--accent">Flagship campaigns</span>
              <div className="card__icon mt-1"><Icon name="umbrella" /></div>
              <h3 className="card__title">Final Expense, IUL, ACA &amp; Auto Insurance Campaigns</h3>
              <p className="card__text">Complete US insurance telesales pipelines: Final Expense closing for seniors, consultative IUL appointment setting, ACA Marketplace enrollment support and auto-insurance quote transfers — fronters, closers, validators and retention under one roof. Offered on fixed-payout, commission, per-seat or pre-closed-deal models.</p>
              <div className="mb-1"><Tags items={["Final Expense", "IUL", "ACA Health", "Auto Insurance"]} /></div>
              <CheckList items={["Fronter → Closer → Validator → Retention pipeline", "TV, Facebook, live-transfer and aged lead handling", "Daily deal reports, recordings and QA scorecards"]} />
              <Link className="link-arrow" to="/services#insurance">Explore insurance campaigns <Icon name="arrow-right" /></Link>
            </article>
            <Card icon="shield-check" title="Quality Assurance & Validation" text="Independent validators and QA analysts audit calls, verify customer intent and score every agent against campaign-specific rubrics, so compliance and conversion rise together." link="/services#qa" />
            <Card icon="headset" title="Inbound Customer Support" text="Multichannel support desks on US business hours — voice, live chat and email — staffed by friendly, English-fluent agents with first-call-resolution targets." link="/services#inbound" />
            <Card icon="phone-out" title="Outbound Sales & Telemarketing" text="Script-driven, dialer-powered outbound teams for telesales, up-selling, win-back, surveys and warm-transfer programs across any vertical." link="/services#outbound" />
            <Card icon="target" title="Lead Generation & Appointment Setting" text="B2B and B2C prospecting that fills pipelines with qualified, consent-verified leads and calendar-ready appointments for your sales team." link="/services#leads" />
            <Card icon="database" title="Back-Office & Data Operations" text="Data entry, CRM hygiene, order processing, document handling and transcription delivered with accuracy targets and turnaround SLAs." link="/services#backoffice" className="bento--half" />
            <Card icon="wifi" title="Telecommunications & Dialer Infrastructure" text="Enterprise VoIP, predictive dialers, call recording and reporting stacks that we run for our own floors — and can run for your campaign." link="/technology" className="bento--half" />
          </div>
          <p className="center mt-3" data-reveal><Link className="btn btn--ghost" to="/services">See all services &amp; engagement models <Icon name="arrow-right" /></Link></p>
        </div>
      </section>

      {/* ---------------- CAMPAIGN SPOTLIGHT ---------------- */}
      <section className="section" id="campaigns">
        <div className="container">
          <div className="split split--reverse">
            <div className="split__media" data-reveal="right">
              <div className="orbit-visual" aria-hidden="true">
                <div className="orbit-visual__ring">{ORBIT(-90, "Fronters")}{ORBIT(30, "Closers")}{ORBIT(150, "Validators")}</div>
                <div className="orbit-visual__ring orbit-visual__ring--2">{ORBIT(-30, "Retention")}{ORBIT(90, "QA Team")}{ORBIT(210, "Lead Providers")}</div>
                <div className="orbit-visual__core">Final Expense Campaign Engine</div>
              </div>
            </div>
            <div className="split__body" data-reveal="left">
              <span className="eyebrow">Campaign spotlight</span>
              <h2 className="mt-1 mb-1">A complete <Grad>Final Expense</Grad> sales pipeline — under one roof</h2>
              <p className="lead">We operate one of Rawalpindi's most structured Final Expense programs for US life-insurance partners: our fronters warm up leads, our closers present coverage and close on the phone, independent validators confirm every sale, and retention officers protect your persistency.</p>
              <div className="mb-2"><Kpis items={[["Fixed payout", "or commission"], ["Pre-closed", "deal supply"], ["Live-transfer", "& TV/FB leads"], ["Daily", "deal reporting"]]} /></div>
              <p>Alongside Final Expense we run <strong>IUL</strong> (Indexed Universal Life) appointment setting, <strong>ACA</strong> Marketplace enrollment support and <strong>Auto insurance</strong> quote transfers — plus Medicare Advantage, solar, home-improvement, debt relief and MVA intake. Every campaign ships with scripts, rebuttals, compliance guardrails and a reporting pack.</p>
              <div className="mt-2"><Link className="btn btn--primary" to="/campaigns">All Campaigns <Icon name="arrow-right" /></Link> <Link className="btn btn--ghost" to="/partnership">Become a Lead Provider</Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="section section--alt" id="process">
        <div className="container">
          <SectionHead center eyebrow="How we work" title={<>From first call to <Grad>go-live in days</Grad>, not months</>} lead="A proven onboarding playbook that keeps you in control at every step." />
          <Steps items={STEPS} />
          <p className="center mt-3" data-reveal><Link className="link-arrow" to="/process">See the full onboarding process <Icon name="arrow-right" /></Link></p>
        </div>
      </section>

      {/* ---------------- WHY ---------------- */}
      <section className="section" id="why">
        <div className="container">
          <SectionHead eyebrow="Why MAK BPO" title={<>The partner that treats your KPIs <Grad>as its own</Grad></>} lead="Eight reasons growing companies and insurance agencies choose MAK BPO over larger, slower vendors." />
          <div className="grid grid--4" data-stagger>{WHY.map(([i, t, d]) => <Card key={t} icon={i} title={t} text={d} />)}</div>
        </div>
      </section>

      {/* ---------------- TECH ---------------- */}
      <section className="section section--tight">
        <div className="container">
          <SectionHead center eyebrow="Technology" title={<>Enterprise-grade <Grad>telecom &amp; tooling</Grad></>} />
          <div className="tech-strip" data-stagger>{TECH.map(([i, b, s]) => <div className="tech-item" key={b}><Icon name={i} /><b>{b}</b><small>{s}</small></div>)}</div>
          <p className="center mt-2" data-reveal><Link className="link-arrow" to="/technology">Explore our infrastructure <Icon name="arrow-right" /></Link></p>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="section section--alt" id="testimonials">
        <div className="container container--narrow">
          <SectionHead eyebrow="Partner feedback" title={<>What partners say about <Grad>working with us</Grad></>} />
          <Testimonials items={TESTIMONIALS} />
        </div>
      </section>

      {/* ---------------- CAREERS TEASER ---------------- */}
      <section className="section" id="careers-teaser">
        <div className="container">
          <div className="split">
            <div className="split__body" data-reveal="left">
              <span className="eyebrow">We're hiring</span>
              <h2 className="mt-1 mb-1">Join the fastest-growing <Grad>BPO team in Rawalpindi</Grad></h2>
              <p className="lead">Night-shift roles on our US Final Expense campaign with heavy weekly and monthly bonuses, daily dinner and tea, structured training and a real promotion track.</p>
              <div className="mb-2"><Tags items={["Junior Closer", "Closer", "Validator"]} /></div>
              <Link className="btn btn--primary" to="/careers">View Open Positions <Icon name="arrow-right" /></Link>
            </div>
            <div className="split__media" data-reveal="right">
              <div className="perks">
                <div className="perk"><Icon name="dollar" /><b>Heavy bonuses</b><small>Weekly &amp; monthly</small></div>
                <div className="perk"><Icon name="coffee" /><b>Dinner &amp; tea</b><small>Served daily on shift</small></div>
                <div className="perk"><Icon name="trending" /><b>Promotion track</b><small>Closer → Team Lead → Manager</small></div>
                <div className="perk"><Icon name="book" /><b>Paid training</b><small>Scripts, product &amp; compliance</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner eyebrow="Let's talk" title="Ready to launch your next campaign with MAK BPO?" text="Tell us about your volumes and goals. We'll reply within one business day with a tailored plan, pricing model and go-live timeline." />
    </>
  );
}
