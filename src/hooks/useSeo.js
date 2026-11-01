import { useEffect } from "react";
import config from "../config";

const BRAND = "MAK BPO & Telecommunications";

function setMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) { el = document.createElement("meta"); Object.entries(attrs).forEach(([k, v]) => { if (k !== "content") el.setAttribute(k, v); }); document.head.appendChild(el); }
  el.setAttribute("content", attrs.content);
}
function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

/**
 * Per-page SEO: title, description, keywords, canonical, Open Graph, Twitter and JSON-LD structured data.
 * @param {{title:string, description:string, keywords?:string, path:string, jsonld?:object[]}} seo
 */
export default function useSeo(seo) {
  useEffect(() => {
    const url = config.siteUrl.replace(/\/$/, "") + (seo.path === "/" ? "/" : seo.path);
    document.title = seo.title;
    setMeta('meta[name="description"]', { name: "description", content: seo.description });
    if (seo.keywords) setMeta('meta[name="keywords"]', { name: "keywords", content: seo.keywords + ", MAK BPO, call center Rawalpindi, BPO Pakistan" });
    setMeta('meta[name="robots"]', { name: "robots", content: seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1" });
    setLink("canonical", url);
    setMeta('meta[property="og:url"]', { property: "og:url", content: url });
    setMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((s) => s.remove());
    const base = [
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": config.siteUrl + "/" }, ...(seo.path === "/" ? [] : [{ "@type": "ListItem", "position": 2, "name": seo.crumb || seo.title.split("|")[0].trim(), "item": url }])] },
      { "@context": "https://schema.org", "@type": seo.pageType || "WebPage", "@id": url + "#webpage", "url": url, "name": seo.title, "description": seo.description, "isPartOf": { "@id": config.siteUrl + "/#website" }, "about": { "@id": config.siteUrl + "/#organization" }, "inLanguage": "en-US" },
    ];
    [...base, ...(seo.jsonld || [])].forEach((obj) => {
      const s = document.createElement("script"); s.type = "application/ld+json"; s.setAttribute("data-seo-jsonld", "1"); s.textContent = JSON.stringify(obj); document.head.appendChild(s);
    });
  }, [seo.title, seo.description, seo.keywords, seo.path, seo.noindex]); // eslint-disable-line react-hooks/exhaustive-deps
}

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": config.siteUrl + "/#organization",
  "name": BRAND,
  "legalName": config.company.legalName,
  "alternateName": ["MAK BPO", "MAK BPO and Telecommunications", "MAK BPO & Telecommunication Pvt Ltd"],
  "url": config.siteUrl + "/",
  "logo": config.siteUrl + "/img/icon-512.png",
  "image": [config.siteUrl + "/img/building-1200.jpg", config.siteUrl + "/img/og-image.jpg"],
  "description": "MAK BPO & Telecommunications is an insurance-expert call center and business process outsourcing company in Rawalpindi, Pakistan, working US business hours (6 PM – 5 AM PKT): Final Expense, IUL, ACA and Auto insurance campaigns, inbound support, outbound telesales, lead generation, validation and back-office services.",
  "telephone": config.company.phone,
  "email": config.company.email,
  "priceRange": "$$",
  "address": { "@type": "PostalAddress", "streetAddress": "1st Floor, Building 4, Street 1, Changezi Street, B Block, Satellite Town", "addressLocality": "Rawalpindi", "addressRegion": "Punjab", "postalCode": "46300", "addressCountry": "PK" },
  "geo": { "@type": "GeoCoordinates", "latitude": config.company.geo.lat, "longitude": config.company.geo.lng },
  "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "18:00", "closes": "05:00" }],
  "areaServed": [{ "@type": "Country", "name": "United States" }, { "@type": "Country", "name": "Pakistan" }, { "@type": "Country", "name": "United Kingdom" }, { "@type": "Country", "name": "Canada" }, { "@type": "Country", "name": "Australia" }],
  "sameAs": [...Object.values(config.social).filter(Boolean), ...(config.group.enabled ? [config.group.url] : [])],
  "contactPoint": [{ "@type": "ContactPoint", "telephone": config.company.phone, "contactType": "sales", "email": config.company.email, "availableLanguage": ["English", "Urdu"] }],
  "knowsAbout": ["Business Process Outsourcing", "Call Center Services", "Final Expense Insurance Telesales", "Indexed Universal Life", "ACA Health Insurance", "Auto Insurance", "Lead Generation", "Customer Support Outsourcing"],
  "slogan": "Pakistan's Insurance-Expert Call Center & BPO Partner",
};
export const WEBSITE_JSONLD = { "@context": "https://schema.org", "@type": "WebSite", "@id": config.siteUrl + "/#website", "url": config.siteUrl + "/", "name": BRAND, "publisher": { "@id": config.siteUrl + "/#organization" }, "inLanguage": "en-US" };
