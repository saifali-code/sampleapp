import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { Icon } from "../components/Icon";
import { PageHero, SectionHead, Grad, Card, CTABanner, Timeline, BuildingPicture } from "../components/ui";
import Testimonials from "../components/Testimonials";
import { TEAM_VOICES } from "../data/site";
import config from "../config";

const PERKS = [["dollar", "Heavy bonuses", "Weekly and monthly performance bonuses on top of salary — top closers out-earn most office jobs in the city."], ["coffee", "Dinner & tea, daily", "A proper dinner meal and tea served on every shift. Nobody closes deals hungry."], ["trending", "Promotion track", "Junior Closer → Closer → Senior Closer → Team Lead → Manager. We promote from within, on merit."], ["book", "Paid training", "Scripts, product knowledge, objection handling and compliance — taught before you take a live call."], ["users", "Supportive leads", "Team leads who coach on calls, not just count them. Daily huddles, honest feedback, real wins."], ["building", "Modern office", "Our own five-storey building in Satellite Town with bright floors, rest areas and secure entry."], ["moon", "Night-shift friendly", "Shift timings set for US hours (6 PM – 5 AM PKT) with consistent schedules you can plan around."], ["gift", "Recognition", "Monthly top-performer awards, shout-outs and incentives that make the scoreboard worth chasing."]];
const PATH = [{ when: "Week 1", title: "Onboarding & training", text: "Product, compliance, scripts and mock calls with a certified trainer." }, { when: "Month 1", title: "First live deals", text: "Supervised calls, daily coaching and your first bonus cycle." }, { when: "Month 3", title: "Full closer status", text: "Own targets, full commission structure, awards eligibility." }, { when: "Month 6+", title: "Leadership track", text: "Senior closer, mentor, team lead — the path is yours to earn." }];

export default function Life() {
  useSeo({ path: "/life-at-mak", crumb: "Life at MAK BPO", title: "Life at MAK BPO | Culture, Bonuses, Perks & Career Growth in Rawalpindi", description: "Discover life at MAK BPO & Telecommunications: heavy weekly and monthly bonuses, daily dinner and tea, paid training, a clear promotion track and a modern five-storey office in Satellite Town, Rawalpindi.", keywords: "life at MAK BPO, call center culture Rawalpindi, night shift jobs Rawalpindi" });
  return (
    <>
      <PageHero eyebrow="Life at MAK BPO" crumb="Life at MAK BPO" title="Where night shifts feel like a team sport" lead="Bonuses that actually get paid, dinner on the house, managers who coach instead of shout, and a promotion track you can see from day one." />
      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Perks & culture" title={<>Why people <Grad>stay and grow</Grad> here</>} />
          <div className="grid grid--4" data-stagger>{PERKS.map(([i, t, d]) => <Card key={t} icon={i} title={t} text={d} />)}</div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <SectionHead center eyebrow="Our space" title={<>A look <Grad>inside and out</Grad></>} />
          <div className="gallery" data-stagger>
            <div className="gallery__item gallery__item--wide gallery__item--tall"><BuildingPicture alt="MAK BPO & Telecommunications headquarters at dusk, Satellite Town, Rawalpindi" /><div className="gallery__cap">Headquarters, Satellite Town</div></div>
            <div className="gallery__item gallery__item--abstract gallery__item--g1"><Icon name="headset" /><div className="gallery__cap">Operations floors</div></div>
            <div className="gallery__item"><img src="/img/crop-glow.jpg" alt="Warm lights of the MAK BPO building at night" loading="lazy" width="1000" height="218" /><div className="gallery__cap">Night shift, lights on</div></div>
            <div className="gallery__item gallery__item--abstract gallery__item--g2"><Icon name="award" /><div className="gallery__cap">Monthly awards night</div></div>
            <div className="gallery__item"><img src="/img/crop-signboard.jpg" alt="MAK BPO signboard on the building facade" loading="lazy" width="500" height="190" /><div className="gallery__cap">Our signboard</div></div>
            <div className="gallery__item gallery__item--abstract gallery__item--g3"><Icon name="coffee" /><div className="gallery__cap">Dinner &amp; tea break</div></div>
            <div className="gallery__item gallery__item--wide"><img src="/img/crop-entrance.jpg" alt="Entrance of the MAK BPO building" loading="lazy" width="1000" height="270" /><div className="gallery__cap">Reception &amp; entrance</div></div>
            <div className="gallery__item gallery__item--abstract gallery__item--g1"><Icon name="book" /><div className="gallery__cap">Training room</div></div>
          </div>
          {config.social.instagram && <p className="center muted mt-2" data-reveal>Follow <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="link-arrow">@makbpoofficial on Instagram <Icon name="external" /></a> for daily life on the floor.</p>}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__body" data-reveal="left">
              <span className="eyebrow">Your career path</span>
              <h2 className="mt-1 mb-1">Start as a Junior Closer. <Grad>Finish as a leader.</Grad></h2>
              <p className="lead">Every manager on our floor started on the phones. Promotions are decided by numbers and attitude — not by who you know.</p>
              <ul className="check-list">
                <li><strong>Junior Closer</strong> — learn the product, the script and the rhythm of US calls with a mentor beside you</li>
                <li><strong>Closer</strong> — own a full pipeline, earn full commissions and compete for monthly awards</li>
                <li><strong>Senior / Self Closer</strong> — close from your own fronting, train juniors, lead calibration sessions</li>
                <li><strong>Team Lead</strong> — coach a pod, run huddles, own a floor target</li>
                <li><strong>Manager</strong> — run campaigns, hire, report to partners and shape the company</li>
              </ul>
              <Link className="btn btn--primary mt-2" to="/careers">See Open Positions <Icon name="arrow-right" /></Link>
            </div>
            <div className="split__media" data-reveal="right"><Timeline items={PATH} /></div>
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container container--narrow">
          <SectionHead eyebrow="Team voices" title={<>In their <Grad>own words</Grad></>} />
          <Testimonials items={TEAM_VOICES} stars={false} />
        </div>
      </section>
      <CTABanner eyebrow="Join us" title="Your next career move is a 2-minute application away" text="No CV needed. Tell us who you are and which role you want — HR will call you." primary={{ label: "Apply Now", to: "/careers#apply" }} />
    </>
  );
}
