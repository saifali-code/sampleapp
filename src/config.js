/* =====================================================================
   MAK BPO & Telecommunications — site configuration
   This is the ONLY file you need to edit to go live.
   ===================================================================== */
const config = {
  /* Live domain (used for canonical / share links). Also update public/sitemap.xml + robots.txt if different. */
  siteUrl: "https://www.makbpotelecommunications.com",

  company: {
    name: "MAK BPO & Telecommunications",
    legalName: "MAK BPO & Telecommunications Pvt. Ltd.",
    phone: "+92 336 4703667",
    phoneHref: "+923364703667",
    email: "info@makbpotelecommunications.com",
    address: "1st Floor, Building 4, Street 1, Changezi Street, B Block, Satellite Town, Rawalpindi, Pakistan 46300",
    addressShort: "B Block, Satellite Town, Rawalpindi",
    mapQuery: "1st Floor, Building 4, Street 1, Changezi Street, B Block, Satellite Town, Rawalpindi 46300, Pakistan",
    geo: { lat: 33.6412, lng: 73.0623 },
    landmarks: "a few minutes from 6th Road and Commercial Market, near the Rawalpindi–Islamabad Metro Bus corridor, about 25 minutes from Islamabad",
    /* We work US business hours only (no Pakistan daytime shift) */
    hours: { label: "6:00 PM – 5:00 AM PKT", start: 18, end: 5, note: "US business hours — Monday to Friday nights, Pakistan time" },
    /* Extra numbers (shown on Careers / Partnership pages and used by the chatbot) */
    hrPhones: ["+92 336 4703667", "+92 331 6416444"],
    partnershipsLine: "+92 348 6565467",
  },

  /* Group / sister company in the USA (set enabled:false to hide everywhere) */
  group: {
    enabled: true,
    name: "MAK Life Insurance Group",
    tagline: "Our US-based final expense insurance agency",
    url: "https://maklifeinsurancegroup.com/",
    phone: "+1 (434) 849-6895",
    email: "info@maklifeinsurancegroup.com",
  },

  /* ------------------------------------------------------------------
     EmailJS — every form delivers straight to your inbox (no backend)
     1. https://www.emailjs.com  → create a free account
     2. Email Services → Add service (Gmail etc.) → copy the SERVICE ID
     3. Email Templates → create a template (variables listed in README.md) → copy the TEMPLATE ID
        (you may use ONE template for all three forms — {{summary}} contains every field)
     4. Account → General → copy your PUBLIC KEY
     5. Paste the values below, save, done.
     ------------------------------------------------------------------ */
  emailjs: {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    templates: {
      contact: "YOUR_CONTACT_TEMPLATE_ID",
      careers: "YOUR_CAREERS_TEMPLATE_ID",
      partnership: "YOUR_PARTNERSHIP_TEMPLATE_ID",
    },
    toEmail: "info@makbpotelecommunications.com",
  },

  /* WhatsApp Connect / Call button (international format, no "+") */
  whatsapp: {
    number: "923364703667",
    message: "Hello MAK BPO & Telecommunications! I would like to know more about your services.",
  },

  /* Social profiles — placeholder links (only Instagram is confirmed). Replace with your real URLs; leave "" to hide an icon */
  social: {
    facebook: "https://www.facebook.com/makbpoofficial",
    instagram: "https://www.instagram.com/makbpoofficial",
    linkedin: "https://www.linkedin.com/company/mak-bpo-telecommunications",
    tiktok: "https://www.tiktok.com/@makbpoofficial",
    youtube: "https://www.youtube.com/@makbpoofficial",
    x: "https://x.com/makbpoofficial",
  },

  /* Theme: "midnight" | "aurora" | "solar" — and whether visitors may switch themes */
  defaultTheme: "midnight",
  showThemeSwitcher: true,

  /* Positions in the careers dropdown (edit src/data/jobs.js for the full job cards) */
  openPositions: ["Junior Closer", "Closer", "Validator", "Other (Retention Officer / Team Lead / HR / Management)"],
};

export default config;
