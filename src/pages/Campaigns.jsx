import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { Icon } from "../components/Icon";
import { PageHero, SectionHead, Grad, Card, Steps, CTABanner, CheckList, Kpis } from "../components/ui";
import { CAMPAIGNS } from "../data/services";

const PIPELINE = [
  { icon: "user", title: "Fronters", text: "Open the conversation, build rapport, confirm eligibility and interest, then transfer a warm, engaged prospect to a closer." },
  { icon: "award", title: "Closers", text: "Present coverage options, handle objections, run the application interview and close the sale on the call." },
  { icon: "shield-check", title: "Validators", text: "Independently re-contact or review every sale, verify intent, details and consent, and clear the deal for submission." },
  { icon: "repeat", title: "Retention", text: "Welcome calls, draft-date reminders and persistency follow-ups that protect advances and commissions." },
];
const COMPLIANCE = [["mic", "100% recorded", "Every call is recorded and retained so disputes are settled with facts, not opinions."], ["check-square", "Independent validation", "Validators sit apart from sales and clear each deal on intent, accuracy and consent."], ["file", "Compliant scripting", "Consent-first scripts, mandatory disclosures and rebuttals reviewed with partners before launch."], ["bell", "DNC & TCPA awareness", "Agents are trained on do-not-call handling and calling-hour rules for US campaigns."], ["lock", "Data protection", "NDAs, role-based access and no personal devices on the production floor."], ["bar-chart", "Transparent reporting", "Daily production, QA and persistency reports — the same numbers we manage by."]];

export default function Campaigns() {
  useSeo({ path: "/campaigns", crumb: "Campaigns", pageType: "CollectionPage", title: "Final Expense, IUL, ACA, Auto & Medicare Campaigns | MAK BPO Call Center Campaigns", description: "MAK BPO runs US Final Expense telesales and closing, IUL appointment setting, ACA Marketplace enrollment, Auto & Home insurance, Medicare Advantage, solar, home improvement, debt relief and MVA intake campaigns with fronters, closers, validators and retention.", keywords: "final expense campaign, IUL campaign, ACA campaign, auto insurance campaign, medicare call center, insurance telesales outsourcing" });
  return (
    <>
      <PageHero eyebrow="Campaigns" crumb="Campaigns" title="US insurance & sales campaigns we run every night" lead="Our flagship Final Expense program plus IUL, ACA, Auto and a growing portfolio of telesales, enrollment and appointment-setting campaigns — each with proven scripts, compliance guardrails and validation built in." />
      <section className="section" id="final-expense">
        <div className="container">
          <div className="split">
            <div className="split__body" data-reveal="left">
              <span className="tag tag--accent mb-1">Flagship campaign</span>
              <h2 className="mt-1 mb-1">Final Expense <Grad>telesales &amp; closing</Grad></h2>
              <p className="lead">Final Expense (burial / funeral cover) is a high-volume, phone-closable life-insurance product for US seniors — and the campaign MAK BPO is best known for. We run the entire pipeline from first dial to validated, persistent policy.</p>
              <ul className="check-list">
                <li><strong>Lead types handled:</strong> TV and Facebook leads, live transfers, direct-mail callbacks and aged data</li>
                <li><strong>Commercial models:</strong> fixed payout per validated deal, percentage commission, or pre-closed deal supply under a sales-sharing agreement</li>
                <li><strong>Compliance:</strong> consent-first scripts, recorded calls, DNC awareness, no misrepresentation — validators clear every sale before it is submitted to the agency</li>
                <li><strong>Reporting:</strong> daily deal sheets with recordings, weekly QA scorecards and monthly persistency reviews</li>
              </ul>
              <div className="mt-2"><Link className="btn btn--primary" to="/partnership">Partner on Final Expense <Icon name="arrow-right" /></Link> <Link className="btn btn--ghost" to="/careers">Join as a Closer</Link></div>
            </div>
            <div className="split__media" data-reveal="right">
              <div className="card card--featured card--flat" style={{ padding: "2.2rem" }}>
                <h3 className="card__title">What a partner receives</h3>
                <CheckList items={["A dedicated fronter/closer pod with a team lead", "Independent validation on 100% of sales", "Retention officer coverage for the first 90 days", "Call recordings and QA scorecards shared daily", "Weekly calibration call with campaign management", "Transparent payout statements per validated deal"]} />
                <div className="divider" />
                <Kpis items={[["Validation", "on every deal"], ["Persistency", "tracked monthly"], ["Night shift", "6 PM – 5 AM PKT"]]} />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <SectionHead center eyebrow="The pipeline" title={<>Four specialist roles, <Grad>one accountable floor</Grad></>} />
            <Steps items={PIPELINE} className="steps--4" />
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <SectionHead center eyebrow="More campaigns" title={<>Programs we run or are <Grad>ready to launch</Grad></>} lead="Each campaign ships with scripts, rebuttals, compliance guardrails and a reporting pack. Don't see yours? We build new programs in 2–3 weeks." />
          <div className="grid grid--4" data-stagger>
            {CAMPAIGNS.map((c) => <div id={c.id} style={{ scrollMarginTop: 100 }} key={c.id}><Card icon={c.icon} title={c.title} text={c.text} items={c.items} link="/contact#quote" linkText="Discuss this campaign" /></div>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Compliance & quality" title={<>Sales you can <Grad>submit with confidence</Grad></>} />
          <div className="grid grid--3" data-stagger>{COMPLIANCE.map(([i, t, d]) => <Card key={t} icon={i} title={t} text={d} />)}</div>
        </div>
      </section>
      <CTABanner eyebrow="Partner with us" title="Have leads, an agency or a campaign to scale?" text="We work with insurance agencies, IMOs, lead providers and businesses that need a closing floor they can trust." primary={{ label: "Explore Partnership Models", to: "/partnership" }} />
    </>
  );
}
