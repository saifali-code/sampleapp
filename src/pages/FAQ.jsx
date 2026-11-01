import useSeo from "../hooks/useSeo";
import { PageHero, CTABanner } from "../components/ui";
import Accordion from "../components/Accordion";
import { FAQS } from "../data/site";

const FAQ_JSONLD = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQS.flatMap((g) => g.items.map((it) => ({ "@type": "Question", "name": it.q, "acceptedAnswer": { "@type": "Answer", "text": it.a } }))) };

export default function FAQ() {
  useSeo({ path: "/faq", crumb: "FAQ", pageType: "FAQPage", title: "FAQ | Pricing, Timelines, Shifts, Compliance & Careers | MAK BPO", description: "Answers to frequently asked questions about MAK BPO's services, pricing models, campaign go-live timelines, Final Expense, IUL, ACA and Auto partnerships, reporting, shifts and job applications.", keywords: "BPO FAQ, call center outsourcing questions, final expense campaign FAQ, MAK BPO jobs FAQ", jsonld: [FAQ_JSONLD] });
  return (
    <>
      <PageHero eyebrow="FAQ" crumb="FAQ" title="Frequently asked questions" lead="Straight answers for clients, partners and candidates. Can't find what you need? Message us on WhatsApp and a real person will reply." />
      <section className="section section--tight">
        <div className="container container--narrow">
          {FAQS.map((g) => (
            <div className="mb-2" data-reveal key={g.group}>
              <h2 style={{ fontSize: "1.4rem" }} className="mb-1">{g.group}</h2>
              <Accordion items={g.items} single={false} />
            </div>
          ))}
        </div>
      </section>
      <CTABanner eyebrow="Still have questions?" title="Ask us anything — we reply fast" text="Our team answers partner and candidate questions on WhatsApp every day." primary={{ label: "Contact Us", to: "/contact" }} />
    </>
  );
}
