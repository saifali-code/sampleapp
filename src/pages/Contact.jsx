import useSeo from "../hooks/useSeo";
import { Icon, BrandIcon } from "../components/Icon";
import { PageHero, SectionHead, Grad, Card } from "../components/ui";
import { ContactForm } from "../components/forms/Forms";
import WaLink, { waUrl } from "../components/WaLink";
import toast from "../utils/toast";
import config from "../config";

const C = config.company;
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(C.mapQuery)}&output=embed&z=16`;
const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(C.mapQuery)}`;

export default function Contact() {
  useSeo({ path: "/contact", crumb: "Contact", pageType: "ContactPage", title: "Contact MAK BPO & Telecommunications | Rawalpindi Call Center — Phone, WhatsApp, Map", description: `Contact MAK BPO & Telecommunications: ${C.address}. Call ${C.phone}, WhatsApp or email ${C.email}. Map and directions included.`, keywords: "contact MAK BPO, call center Satellite Town Rawalpindi address, MAK BPO phone number" });
  const copy = () => { if (navigator.clipboard) navigator.clipboard.writeText(C.address).then(() => toast("Address copied", "success")).catch(() => {}); };
  return (
    <>
      <PageHero eyebrow="Contact" crumb="Contact" title="Let's talk about your next campaign" lead="Call, WhatsApp, email or drop by our Satellite Town headquarters — we respond to every enquiry within one business day." />
      <section className="section section--tight" id="quote">
        <div className="container">
          <div className="contact-grid">
            <div className="form-card" data-reveal="left">
              <div className="form-card__head"><span className="eyebrow">Send a message</span><h3 className="mt-1">Get a quote or ask a question</h3><p>Tell us what you need and we'll reply with a tailored plan and pricing.</p></div>
              <ContactForm />
            </div>
            <div className="contact-cards" data-stagger>
              <div className="contact-card"><div className="contact-card__icon"><Icon name="pin" /></div><div><b>Visit our head office</b><span>{C.address}</span><small>Street-level reception; operations on floors 1–4</small></div></div>
              <div className="contact-card"><div className="contact-card__icon"><Icon name="phone" /></div><div><b>Call us</b><a href={`tel:${C.phoneHref}`}>{C.phone}</a><small>Sales &amp; partnerships · best reached 6:00 PM – 5:00 AM PKT (US business hours)</small></div></div>
              <div className="contact-card"><div className="contact-card__icon" style={{ color: "#25d366" }}><BrandIcon name="whatsapp" /></div><div><b>WhatsApp</b><a href={waUrl()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a><small>Fastest way to reach our team — usually within minutes</small></div></div>
              <div className="contact-card"><div className="contact-card__icon"><Icon name="mail" /></div><div><b>Email</b><a href={`mailto:${C.email}`}>{C.email}</a><small>For proposals, documents and partnership agreements</small></div></div>
              <div className="contact-card"><div className="contact-card__icon"><Icon name="clock" /></div><div><b>Working hours (US timing)</b><span>Night shift 6:00 PM – 5:00 AM PKT — aligned to US business hours</span><small>We do not operate during Pakistan daytime. Office visits and interviews by appointment during shift hours.</small></div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="map">
        <div className="container">
          <SectionHead center eyebrow="Find us" title={<>Satellite Town, <Grad>Rawalpindi</Grad></>} lead="Our head office is in B Block, Satellite Town — a few minutes from 6th Road and Commercial Market." />
          <div className="map-card" data-reveal="zoom">
            <div className="map-pin"><i /> MAK BPO &amp; Telecommunications</div>
            <div className="map-frame">
              <iframe title={`Map: ${C.name} office in Satellite Town, Rawalpindi`} src={mapSrc} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
              <div className="map-overlay"><b>Head office</b><small>{C.address}</small><small>{C.landmarks}</small><span className="tag">{C.hours.label} · US hours</span></div>
            </div>
            <div className="map-card__bar">
              <div><b>{C.name}</b><small>{C.address}</small></div>
              <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
                <a className="btn btn--primary btn--sm" href={directions} target="_blank" rel="noopener noreferrer"><Icon name="map" /> Get Directions</a>
                <button className="btn btn--ghost btn--sm" type="button" onClick={copy}><Icon name="clipboard" /> Copy Address</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--3" data-stagger>
            <Card icon="briefcase" title="Looking for a job?" text="We're hiring Junior Closers, Closers and Validators for our US campaign." link="/careers" linkText="See open positions" />
            <Card icon="share" title="Want to partner?" text="Agencies, lead providers and resellers — explore our partnership models." link="/partnership" linkText="Partnership models" />
            <Card icon="chat" title="Have a quick question?" text="Check our FAQ for answers on pricing, timelines, shifts and compliance." link="/faq" linkText="Read the FAQ" />
          </div>
          <p className="center mt-2" data-reveal><WaLink className="btn btn--wa"><BrandIcon name="whatsapp" /> Message us on WhatsApp</WaLink></p>
        </div>
      </section>
    </>
  );
}
