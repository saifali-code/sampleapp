import useSeo from "../hooks/useSeo";
import { Icon } from "../components/Icon";
import { PageHero, CTABanner } from "../components/ui";
import Html from "../utils/html";
import { ARTICLES } from "../data/site";
import config from "../config";

const JSONLD = ARTICLES.map((a) => ({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": a.title, "datePublished": a.date, "dateModified": a.date, "author": { "@type": "Organization", "name": config.company.name }, "publisher": { "@id": config.siteUrl + "/#organization" }, "mainEntityOfPage": config.siteUrl + "/insights#" + a.slug, "description": a.excerpt, "image": config.siteUrl + "/img/og-image.jpg", "inLanguage": "en-US" }));

export default function Insights() {
  useSeo({ path: "/insights", crumb: "Insights", pageType: "CollectionPage", title: "Insights | Final Expense, Outsourcing & Call Center Guides | MAK BPO", description: "Articles and guides from MAK BPO on Final Expense insurance telesales, choosing a call center partner in Pakistan, inbound vs outbound, validation, persistency and call-center careers.", keywords: "final expense guide, call center partner Pakistan, inbound vs outbound call center, BPO blog", jsonld: JSONLD });
  return (
    <>
      <PageHero eyebrow="Insights" crumb="Insights" title="Articles & guides from the MAK BPO floor" lead="Practical thinking on Final Expense telesales, outsourcing, quality assurance and building call-center careers in Pakistan." />
      <section className="section section--tight">
        <div className="container">
          <div className="post-grid" data-stagger>
            {ARTICLES.map((a) => (
              <article className="card post-card" data-tilt="5" key={a.slug}>
                <div className="post-card__cover"><Icon name={a.icon} /></div>
                <time dateTime={a.date}>{a.date} · {a.read} read</time>
                <h3 className="card__title mt-1" style={{ fontSize: "1.15rem" }}><a href={`#${a.slug}`}>{a.title}</a></h3>
                <p className="card__text">{a.excerpt}</p>
                <a className="link-arrow" href={`#${a.slug}`}>Read article <Icon name="arrow-right" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container container--narrow">
          {ARTICLES.map((a) => (
            <article className="article prose" id={a.slug} data-reveal key={a.slug}>
              <div className="article__meta"><span><Icon name="calendar" /> <time dateTime={a.date}>{a.date}</time></span><span><Icon name="clock" /> {a.read} read</span><span><Icon name="user" /> MAK BPO Editorial Team</span></div>
              <h2>{a.title}</h2>
              <Html as="div" html={a.body} />
            </article>
          ))}
        </div>
      </section>
      <CTABanner eyebrow="Put it into practice" title="Ready to build a campaign on these principles?" text="Our team will design a pipeline, scripts and reporting pack for your market." primary={{ label: "Talk to Us", to: "/contact" }} />
    </>
  );
}
