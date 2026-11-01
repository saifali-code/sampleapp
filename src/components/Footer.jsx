import { Link } from "react-router-dom";
import { Icon, BrandIcon } from "./Icon";
import config from "../config";

const C = config.company;
const SOCIALS = ["facebook", "instagram", "linkedin", "tiktok", "youtube", "x"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img className="logo__light" src="/img/logo-white-sm.png" alt={C.name} width="225" height="160" loading="lazy" />
            <img className="logo__dark" src="/img/logo-dark-sm.png" alt={C.name} width="225" height="160" loading="lazy" />
            <p>A Rawalpindi-based BPO &amp; call center partner delivering inbound support, outbound sales, Final Expense, IUL, ACA and Auto insurance campaigns and back-office operations for clients across the United States and beyond.</p>
            <div className="socials">
              {SOCIALS.filter((k) => config.social[k]).map((k) => (
                <a key={k} href={config.social[k]} target="_blank" rel="noopener noreferrer" aria-label={k}><BrandIcon name={k} /></a>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/life-at-mak">Life at MAK BPO</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/partnership">Partnership</Link></li>
              <li><Link to="/insights">Insights</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services#inbound">Inbound Customer Support</Link></li>
              <li><Link to="/services#outbound">Outbound Sales &amp; Telemarketing</Link></li>
              <li><Link to="/services#final-expense">Final Expense Campaign</Link></li>
              <li><Link to="/services#iul">IUL (Indexed Universal Life)</Link></li>
              <li><Link to="/services#aca">ACA Health Insurance</Link></li>
              <li><Link to="/services#auto">Auto Insurance</Link></li>
              <li><Link to="/services#leads">Lead Generation &amp; Appointments</Link></li>
              <li><Link to="/services#qa">Quality Assurance &amp; Validation</Link></li>
              <li><Link to="/technology">Telecom &amp; Infrastructure</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <ul className="footer__contact">
              <li><Icon name="pin" /><span>{C.address}</span></li>
              <li><Icon name="phone" /><a href={`tel:${C.phoneHref}`}>{C.phone}</a></li>
              <li><Icon name="mail" /><a href={`mailto:${C.email}`}>{C.email}</a></li>
              <li><Icon name="clock" /><span>We work US business hours only: night shift 6:00 PM – 5:00 AM PKT</span></li>
              {config.group.enabled && <li><Icon name="globe" /><span>US group company: <a href={config.group.url} target="_blank" rel="noopener noreferrer">{config.group.name}</a></span></li>}
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div>© {year} {C.legalName} All rights reserved.</div>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
