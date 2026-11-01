import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { Icon, BrandIcon } from "../components/Icon";
import WaLink from "../components/WaLink";

export default function NotFound() {
  useSeo({ path: "/404", crumb: "Not found", noindex: true, title: "Page Not Found | MAK BPO & Telecommunications", description: "The page you requested could not be found." });
  return (
    <section className="error-page">
      <div className="container">
        <div className="code" data-reveal="zoom">404</div>
        <h1 className="mt-1 mb-1" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>This line is disconnected</h1>
        <p className="lead" style={{ maxWidth: 520, margin: "0 auto 1.6rem" }}>The page you're looking for doesn't exist or has moved. Let's get you back to a live operator.</p>
        <div className="cta-banner__actions">
          <Link className="btn btn--primary" to="/">Back to Home <Icon name="arrow-right" /></Link>
          <Link className="btn btn--ghost" to="/contact">Contact Us</Link>
          <WaLink className="btn btn--wa"><BrandIcon name="whatsapp" /> WhatsApp</WaLink>
        </div>
      </div>
    </section>
  );
}
