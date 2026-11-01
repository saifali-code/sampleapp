import useSeo from "../hooks/useSeo";
import { Icon } from "../components/Icon";
import { PageHero, SectionHead, Grad, Card, FeatureRow, Timeline, CTABanner, BuildingPicture } from "../components/ui";
import config from "../config";

const VALUES = [["I", "Integrity", "Clean sales, honest numbers, compliant scripts. We would rather lose a deal than mislead a customer."], ["P", "Performance", "Every seat has a target, every target has a coach, and every month has a scoreboard worth winning."], ["R", "Respect", "For customers on the line, for partners who trust us, and for the people who do the work every night."], ["G", "Growth", "Agents become closers, closers become team leads, team leads become managers. We promote from within."]];
const TEAM = [["briefcase", "Campaign management", "Your single point of contact. Owns targets, reporting cadence and escalations."], ["users", "Team leads", "Floor coaching, live monitoring, daily huddles and script calibration."], ["shield-check", "QA & validation", "Independent call audits, deal verification and compliance scoring."], ["user", "HR & training", "Recruitment, onboarding, certification and ongoing skills development."], ["cpu", "Telecom & IT", "Dialer, VoIP, CRM and workstation uptime — maintained in-house."], ["repeat", "Retention", "Post-sale follow-ups, persistency protection and win-back calls."], ["bar-chart", "Reporting & analytics", "Daily production packs, weekly reviews and monthly business reviews."], ["chat", "Partner success", "Onboarding, expansion planning and new campaign design."]];
const JOURNEY = [
  { when: "Foundation", title: "A single international campaign", text: "MAK BPO begins with a small closing team, a dialer and a commitment to verified, compliant sales." },
  { when: "Growth", title: "Multiple campaigns, dedicated QA", text: "Inbound support and lead-generation programs join the floor; an independent validation and QA desk is created." },
  { when: "Flagship", title: "Final Expense program at scale", text: "Fronters, closers, validators and retention officers are organised into one end-to-end US Final Expense pipeline, joined by IUL, ACA and Auto insurance campaigns." },
  { when: "Headquarters", title: "Our own building in Satellite Town", text: "MAK BPO moves into a purpose-built five-storey head office with four operations floors and the signboard you see on our homepage." },
  { when: "Today", title: "Hiring, expanding and partnering", text: "Recruiting closers and validators, launching new campaigns and opening partnership models for agencies and lead providers worldwide." },
];

export default function About() {
  useSeo({ path: "/about", crumb: "About Us", pageType: "AboutPage", title: "About MAK BPO & Telecommunications | Our Story, Mission & Rawalpindi Headquarters", description: "Learn about MAK BPO & Telecommunications: a private limited BPO and call center company headquartered in a purpose-built five-storey facility in Satellite Town, Rawalpindi, serving US and international clients.", keywords: "about MAK BPO, BPO company Rawalpindi, call center Satellite Town" });
  return (
    <>
      <PageHero eyebrow="About us" crumb="About Us" title="The people, the place and the purpose behind MAK BPO" lead="MAK BPO & Telecommunications is a Rawalpindi-born business process outsourcing company with one obsession: turning conversations into measurable business results for our partners." />
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__body" data-reveal="left">
              <span className="eyebrow">Our story</span>
              <h2 className="mt-1 mb-1">From a single campaign floor to a <Grad>five-storey headquarters</Grad></h2>
              <p className="lead">We started the way most great BPO companies do — with a small team of determined closers, one international campaign and a conviction that Rawalpindi's talent could compete with any contact center in the world.</p>
              <p>That first campaign taught us what partners really want: agents who sound confident and genuine, numbers they can verify, and a management team that answers the phone. We built MAK BPO &amp; Telecommunications around those three promises and have grown campaign by campaign ever since.</p>
              <p>Today we operate from our own purpose-built building in B Block, Satellite Town — four operations floors above a street-level reception — running inbound support, outbound sales, Final Expense, IUL, ACA and Auto insurance campaigns, validation and back-office programs for clients in the United States and other international markets.</p>
              <div className="badge-row mt-2"><span><Icon name="building" /> Registered private limited company</span><span><Icon name="pin" /> Satellite Town, Rawalpindi</span><span><Icon name="clock" /> US hours: 6 PM – 5 AM PKT</span></div>
            </div>
            <div className="split__media" data-reveal="right">
              <div className="gallery" style={{ gridAutoRows: "180px" }}>
                <div className="gallery__item gallery__item--wide"><img src="/img/crop-facade-top.jpg" alt="Upper floors of the MAK BPO building with blue glass windows and warm wall lights" loading="lazy" width="1000" height="582" /><div className="gallery__cap">Four operations floors</div></div>
                <div className="gallery__item"><img src="/img/crop-signboard.jpg" alt="MAK BPO & Telecommunications Pvt. Ltd. signboard" loading="lazy" width="500" height="190" /><div className="gallery__cap">Our signboard</div></div>
                <div className="gallery__item"><img src="/img/crop-entrance.jpg" alt="Street-level entrance of the MAK BPO head office" loading="lazy" width="1000" height="270" /><div className="gallery__cap">Reception &amp; entrance</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <SectionHead center eyebrow="Mission, vision & values" title={<>What we <Grad>stand for</Grad></>} />
          <div className="grid grid--3" data-stagger>
            <Card icon="compass" title="Our mission" text="To deliver outsourcing that is honest, measurable and relentlessly focused on our partners' revenue and customer experience — while creating well-paid, respected careers in Rawalpindi." />
            <Card icon="eye" title="Our vision" text="To become Pakistan's most trusted BPO partner for US insurance and customer-experience programs, recognised for closing quality, compliance and transparent reporting." />
            <Card icon="heart" title="Our promise" text="No black boxes. You see every call recording, every validated deal and every QA score — and you always have a manager you can reach." />
          </div>
          <div className="grid grid--4 mt-2" data-stagger>{VALUES.map(([l, t, d]) => <div className="value-card" data-letter={l} key={t}><h4>{t}</h4><p>{d}</p></div>)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="split split--reverse">
            <div className="split__media" data-reveal="right">
              <div className="media-frame"><BuildingPicture alt="MAK BPO & Telecommunications headquarters building in Rawalpindi" /><div className="media-frame__caption"><div><b>MAK BPO Headquarters</b><small>1st Floor, Building 4, Street 1, Changezi Street</small></div></div></div>
            </div>
            <div className="split__body" data-reveal="left">
              <span className="eyebrow">Our facility</span>
              <h2 className="mt-1 mb-1">A building designed <Grad>for campaigns</Grad></h2>
              <p className="lead">Our head office was fitted out specifically for contact-center work: open operations floors with ribbon windows and daylight, quiet validation desks, training rooms and management offices.</p>
              <FeatureRow icon="layers" title="Four operations floors" text="Dedicated floors let us isolate campaigns, keep noise down and scale a pilot into a full floor without moving anyone." />
              <FeatureRow icon="battery" title="Power & connectivity resilience" text="Backup power and redundant internet links keep dialers up through load-shedding and ISP outages." />
              <FeatureRow icon="lock" title="Secure, access-controlled floors" text="CCTV coverage, controlled entry and role-based system access protect partner and customer data." />
              <FeatureRow icon="coffee" title="Built for night shifts" text="Dinner and tea service, rest areas and transport-friendly timings keep agents sharp through US business hours." />
            </div>
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <SectionHead center eyebrow="How we are organised" title={<>A management structure that <Grad>owns your KPIs</Grad></>} lead="Every campaign gets a named owner at each layer — so there is always someone accountable, awake and reachable." />
          <div className="grid grid--4" data-stagger>{TEAM.map(([i, t, d]) => <Card key={t} icon={i} title={t} text={d} />)}</div>
        </div>
      </section>
      {config.group.enabled && (
        <section className="section section--tight">
          <div className="container">
            <div className="group-card" data-reveal="zoom">
              <div className="group-card__icon"><Icon name="globe" /></div>
              <div>
                <span className="eyebrow">US presence</span>
                <h3 className="mt-1 mb-1">{config.group.name}</h3>
                <p className="muted">{config.group.tagline}. Having our own US agency means our Rawalpindi floor is trained on real carrier requirements, real compliance and real persistency targets — the same standards we apply to every partner's campaign.</p>
                <div className="badge-row mt-1"><a href={config.group.url} target="_blank" rel="noopener noreferrer"><Icon name="external" /> {config.group.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a><a href={`tel:${config.group.phone.replace(/[^\d+]/g, "")}`}><Icon name="phone" /> {config.group.phone}</a><a href={`mailto:${config.group.email}`}><Icon name="mail" /> {config.group.email}</a></div>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="Our journey" title={<>Milestones that <Grad>shaped MAK BPO</Grad></>} />
          <Timeline items={JOURNEY} />
        </div>
      </section>
      <CTABanner eyebrow="Work with us" title="See the building, meet the team, launch a campaign" text="Book a discovery call or visit us in Satellite Town — we love showing partners around the floor." primary={{ label: "Contact Us", to: "/contact" }} />
    </>
  );
}
