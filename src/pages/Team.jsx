import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { Icon, BrandIcon } from "../components/Icon";
import { PageHero, SectionHead, Grad, Stats, CTABanner } from "../components/ui";
import { LEADERSHIP, MANAGERS, TEAM_STATS } from "../data/team";

const initials = (n) => n.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function Member({ m, large }) {
  return (
    <article className={`member hue-${m.hue || 1}${large ? " member--lg" : ""}`} data-tilt="5">
      <div className="member__photo">
        {m.photo ? <img src={m.photo} alt={m.name} loading="lazy" width="320" height="320" /> : <span className="member__initials">{initials(m.name)}</span>}
        <i className="member__ring" aria-hidden="true" />
      </div>
      <h3 className="member__name">{m.name}</h3>
      <div className="member__role">{m.role}</div>
      {m.bio && <p className="member__bio">{m.bio}</p>}
      {m.linkedin && <a className="member__link" href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}><BrandIcon name="linkedin" /></a>}
    </article>
  );
}

export default function Team() {
  useSeo({ path: "/team", crumb: "Our Team", title: "Our Team | Leadership & Campaign Managers | MAK BPO & Telecommunications", description: "Meet the leadership, campaign managers, quality, HR, telecom and partnership team behind MAK BPO & Telecommunications in Rawalpindi — the people who run our US insurance campaigns every night.", keywords: "MAK BPO team, call center leadership Rawalpindi, BPO management team" });
  return (
    <>
      <PageHero eyebrow="Our team" crumb="Our Team" title="The people behind every call" lead="Closers, validators, coaches and managers who run US insurance campaigns from Rawalpindi every night — led by people who started on the phones themselves." />
      <section className="section section--tight"><div className="container"><Stats items={TEAM_STATS} /></div></section>
      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Leadership" title={<>Accountable, awake and <Grad>reachable</Grad></>} lead="Every partner has a named owner at each layer — these are the people who answer the phone." />
          <div className="grid grid--4 team-grid" data-stagger>{LEADERSHIP.map((m, i) => <Member m={m} key={i} large />)}</div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <SectionHead center eyebrow="Campaign & operations" title={<>The managers who <Grad>run the floor</Grad></>} />
          <div className="grid grid--4 team-grid" data-stagger>{MANAGERS.map((m, i) => <Member m={m} key={i} />)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__body" data-reveal="left">
              <span className="eyebrow">Join the team</span>
              <h2 className="mt-1 mb-1">Your name could be <Grad>on this page</Grad></h2>
              <p className="lead">We promote from within. Junior Closers become Closers, Closers become Team Leads, and Team Leads become the managers you see here. We're hiring 50+ people this season for our US Final Expense campaign.</p>
              <div className="mt-2"><Link className="btn btn--primary" to="/careers">See Open Positions <Icon name="arrow-right" /></Link> <Link className="btn btn--ghost" to="/life-at-mak">Life at MAK BPO</Link></div>
            </div>
            <div className="split__media" data-reveal="right">
              <div className="perks">
                <div className="perk"><Icon name="trending" /><b>Promotion track</b><small>Closer → Lead → Manager</small></div>
                <div className="perk"><Icon name="dollar" /><b>Heavy bonuses</b><small>Weekly &amp; monthly</small></div>
                <div className="perk"><Icon name="book" /><b>Paid training</b><small>Before your first call</small></div>
                <div className="perk"><Icon name="moon" /><b>US hours</b><small>6 PM – 5 AM PKT</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTABanner eyebrow="Talk to us" title="Want to meet the team behind your campaign?" text="Book a discovery call and your campaign manager, QA lead and partnerships manager will be on it." primary={{ label: "Book a Discovery Call", to: "/contact#quote" }} />
    </>
  );
}
