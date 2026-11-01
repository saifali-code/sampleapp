import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { Icon } from "../components/Icon";
import { PageHero, SectionHead, Grad, Card, CTABanner } from "../components/ui";
import { INDUSTRIES } from "../data/services";

export default function Industries() {
  useSeo({ path: "/industries", crumb: "Industries", pageType: "CollectionPage", title: "Industries We Serve | Insurance, Healthcare, Telecom, E-commerce & More | MAK BPO", description: "MAK BPO delivers call center and back-office outsourcing for insurance, healthcare, telecom, e-commerce, real estate, financial services, solar, home improvement, SaaS, travel, education and logistics.", keywords: "BPO for insurance, healthcare call center outsourcing, ecommerce customer support outsourcing, solar lead generation" });
  return (
    <>
      <PageHero eyebrow="Industries" crumb="Industries" title="Industries we serve from Rawalpindi" lead="Sector-specific scripts, compliance know-how and agents who already speak your customers' language." />
      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Sector expertise" title={<>Built for the industries that <Grad>run on conversations</Grad></>} />
          <div className="grid grid--4" data-stagger>{INDUSTRIES.map(([i, t, d, items]) => <Card key={t} icon={i} title={t} text={d} items={items} />)}</div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="split">
            <div className="split__body" data-reveal="left">
              <span className="eyebrow">Don't see your industry?</span>
              <h2 className="mt-1 mb-1">We build new programs <Grad>in weeks</Grad></h2>
              <p className="lead">Our onboarding playbook turns any customer-facing process into a trained, measured campaign: we learn your product, write the scripts with you, certify the agents and launch with daily calibration.</p>
              <Link className="btn btn--primary" to="/process">See how onboarding works <Icon name="arrow-right" /></Link>
            </div>
            <div className="split__media" data-reveal="right">
              <div className="stats stats--2">
                <div className="stat"><div className="stat__value">12+</div><div className="stat__label">Industries with ready scripts</div></div>
                <div className="stat"><div className="stat__value">6PM–5AM</div><div className="stat__label">PKT — full US business-day coverage</div></div>
                <div className="stat"><div className="stat__value">EN</div><div className="stat__label">Fluent English, neutral accent</div></div>
                <div className="stat"><div className="stat__value">US</div><div className="stat__label">Primary market focus</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTABanner eyebrow="Your industry, our floor" title="Let's design a campaign for your market" text="Share your use-case and we'll propose the team, scripts and KPIs within one business day." primary={{ label: "Request a Proposal", to: "/contact#quote" }} />
    </>
  );
}
