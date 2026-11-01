# MAK BPO & Telecommunications — React Website

Modern, fully animated company website built with **React 18 + Vite**, **React Router**, **Three.js** (3D head-office model) and **EmailJS** (forms → your inbox, no backend).
Frontend only today; structured so a Node/Express + MongoDB backend (MERN) can be added later.

---

## 1. Run it in VS Code (step by step)

**Requirements:** [Node.js 18 or newer](https://nodejs.org) (LTS) and [VS Code](https://code.visualstudio.com).

1. Unzip `mak-bpo-react.zip`.
2. Open VS Code → **File → Open Folder…** → choose the `mak-bpo-react` folder.
3. Open the terminal: **Terminal → New Terminal** (or press ``Ctrl+` ``).
4. Install the dependencies (first time only):
   ```bash
   npm install
   ```
5. Start the website:
   ```bash
   npm run dev
   ```
6. Open the address shown in the terminal — normally **http://localhost:5173** — in your browser. The site hot-reloads whenever you edit a file.

Build for hosting (creates a `dist` folder you upload to any static host):
```bash
npm run build
npm run preview   # optional: test the production build locally
```

> Windows tip: if `npm` is "not recognized", install Node.js, then close and reopen VS Code.

---

## 2. Connect the forms to your inbox (EmailJS) — 10 minutes

All three forms (Contact, Careers, Partnership) are wired to EmailJS. Until you add your keys they fall back to opening the visitor's email app with the message pre-filled, so nothing is ever lost.

1. Create a free account at **https://www.emailjs.com** (200 emails/month free).
2. **Email Services → Add New Service** → Gmail/Outlook → connect `info@makbpotelecommunications.com` → copy the **Service ID**.
3. **Email Templates → Create New Template** (one template is enough for all three forms):
   * Subject: `{{form_type}} — {{from_name}}`
   * To email: `info@makbpotelecommunications.com`
   * Reply-To: `{{from_email}}`
   * Content:
     ```
     New {{form_type}} from the website

     Name:  {{from_name}}
     Email: {{from_email}}
     Phone: {{phone}}

     {{summary}}
     ```
   `{{summary}}` already contains EVERY field (position, experience, company, campaign, volume, message, page, time).
   Individual variables are also available: `position`, `experience`, `city`, `night_shift`, `english_level`, `company_name`, `country`, `website`, `partnership_type`, `campaign`, `volume`, `start_date`, `subject`, `message`, `page_url`, `submitted_at`.
   Copy the **Template ID**.
4. **Account → General** → copy your **Public Key**.
5. Open **`src/config.js`** and paste:
   ```js
   emailjs: {
     publicKey: "YOUR_PUBLIC_KEY",
     serviceId: "service_xxxxxxx",
     templates: { contact: "template_xxxxxxx", careers: "template_xxxxxxx", partnership: "template_xxxxxxx" },
     toEmail: "info@makbpotelecommunications.com",
   },
   ```
6. Save — the forms now deliver to your inbox with an animated success panel.

Tip: EmailJS → Account → Security → restrict the public key to your domain. The forms also include a hidden honeypot field against bots.

---

## 3. Everything you can edit in one place — `src/config.js`

| Setting | What it does |
|---------|--------------|
| `siteUrl` | Your live domain (also update `public/sitemap.xml` and `public/robots.txt` if different) |
| `company` | Name, phone, email, address, landmarks, HR lines, partnerships line (used across the site, SEO and chatbot) |
| `company.hours` | Working hours — **US timing only: 6:00 PM – 5:00 AM PKT**. The chatbot uses `start`/`end` to tell visitors whether the floor is live right now and converts the hours into their own time zone |
| `whatsapp` | WhatsApp Connect button number and pre-filled message |
| `social` | Facebook / Instagram / LinkedIn / TikTok / YouTube / X links — **dummy links today, replace with yours** (empty string = icon hidden). Shown in the footer, the chatbot and the mobile menu |
| `group` | Your US sister company card (MAK Life Insurance Group) on the About page; set `enabled: false` to hide |
| `defaultTheme` / `showThemeSwitcher` | `"midnight"`, `"aurora"` or `"solar"`; hide the theme menu if you want one locked look |
| `openPositions` | Careers dropdown options (job cards live in `src/data/site.js`) |

**Team page:** edit `src/data/team.js` — every member has `name`, `role`, `bio`, `photo` (put the picture in `public/img/team/` and set `"/img/team/name.jpg"`; leave `""` for an initials avatar), `hue` (1–6 accent colour) and optional `linkedin`. The names there are placeholders.

---

## 4. Project structure

```
mak-bpo-react/
  index.html                 base HTML, fonts, default meta tags
  package.json               scripts: dev / build / preview
  vite.config.js
  public/
    img/                     logo, building photos, favicons, OG image
    sitemap.xml, robots.txt, site.webmanifest, _redirects, .htaccess
  src/
    main.jsx                 entry
    App.jsx                  router shell (Suspense + page transitions)
    routes.js                17 routes, code-split per page + hover/idle prefetch
    config.js                ← your settings (EmailJS, WhatsApp, socials, theme)
    styles/main.css          design system, 3 themes, all animations, responsive rules
    components/
      Layout.jsx             shell: header, footer, page transitions, floating buttons
      Header.jsx / Footer.jsx / ThemeSwitch.jsx
      Hero3D.jsx             mounts the Three.js building scene
      Chatbot.jsx            "MAK Assistant" (answers in src/data/chatbot.js)
      BackgroundFX.jsx       starfield + shooting stars + colour blobs
      Chrome.jsx             cursor, scroll progress, back-to-top, WhatsApp/call buttons, preloader
      ui.jsx                 cards, section heads, steps, timeline, marquee, counters, CTA banner…
      Testimonials.jsx / Accordion.jsx / Toast.jsx
      forms/                 Field.jsx, Forms.jsx (Contact / Careers / Partnership), useEmailForm.js
    three/buildingScene.js   procedural 3D model of the head office + animations
    hooks/                   useSeo, useTheme, useUiEffects (scroll reveal, tilt, ripple…), useInView
    data/                    nav, services, campaigns, industries, jobs, FAQs, articles, team, chatbot knowledge
    pages/                   Home, About, Services, Campaigns, Industries, Process, Technology, Life, Team,
                             Careers, Partnership, Contact, FAQ, Insights, Privacy, Terms, NotFound
```

**Edit content:** job cards, FAQs, articles and testimonials → `src/data/site.js`; services/campaigns/industries → `src/data/services.js`; chatbot answers → `src/data/chatbot.js`; navigation → `src/data/nav.js`.

**Images:** replace files in `public/img/` keeping the same names.

**Placeholders to replace before launch:** social links in `src/config.js`, team members in `src/data/team.js`, the home-page statistics (`Counter` values in `src/pages/Home.jsx`) and the testimonial / team-voice quotes in `src/data/site.js`.

---

## 5. The 3D building & animations

`src/three/buildingScene.js` builds the head office procedurally (stone facade, four floors of blue glass with awning windows, wall lights, the MAK BPO signboard, red fascia, AC units, shutters and entrance). On load the camera flies in through a starfield of light streaks while the building assembles floor by floor and its lights switch on; light beams rise along the edges and rings orbit it. It reacts to the mouse (touch-drag on phones), rotates and fades on scroll, lowers quality automatically on phones, pauses when hidden, respects "reduce motion" and falls back to the photo without WebGL.
On phones the building fills the top of the screen with the headline below it.

Site-wide: twinkling stars with shooting streaks behind every page, animated page transitions, letter-by-letter titles, scroll reveals, 3D-tilt cards with spotlight, magnetic buttons, click ripples, counters, marquee, drawn-on process lines and three switchable colour themes.

`three` is pinned to `0.128.0` on purpose — the scene is written against that API. Upgrade only if you also update the lighting/colour-space calls.

---

## 6. SEO

* Per-page title, description, keywords, canonical, Open Graph / Twitter tags and JSON-LD (LocalBusiness, WebSite, Services, 3 JobPostings, FAQPage, HowTo, 5 BlogPostings, breadcrumbs) via `src/hooks/useSeo.js`
* `public/sitemap.xml`, `robots.txt`, web manifest, favicons, geo tags
* JSON-LD `openingHoursSpecification` is set to Mon–Fri 18:00–05:00 (US timing), so Google shows the correct hours.
* Google renders JavaScript sites, but for the fastest indexing you can later add pre-rendering (e.g. `vite-plugin-prerender`) or move to a MERN setup with server rendering.

### Performance (already built in)
* Every page except Home is a separate code-split chunk (`src/routes.js`); chunks are prefetched on link hover and during idle time, so navigation is instant.
* Three.js and the 3D scene load as their own chunk, only on the home page — other pages never download them.
* Vendor chunks (`react`, `three`, `emailjs`) are split for long-term browser caching (`vite.config.js`).
* Lazy-loaded images with width/height, WebP with JPEG fallback, `font-display: swap`, no runtime CSS-in-JS, no animation libraries — the whole UI runs on CSS + IntersectionObserver.
* The chatbot is rule-based and runs entirely in the browser (no API calls, no cost); it knows the live shift status, converts hours to the visitor's time zone and can measure the visitor's distance to the office (with their permission).

---

## 7. Deploying

`npm run build` → upload the **`dist`** folder.

* **Netlify / Vercel / Cloudflare Pages:** drag-and-drop `dist` (SPA routing is handled by `public/_redirects`; on Vercel add a rewrite `/(.*) → /index.html`).
* **cPanel / Apache:** upload the contents of `dist` to `public_html` — the included `.htaccess` routes all pages to the app.
* After going live: submit `https://yourdomain/sitemap.xml` to Google Search Console.

---

## 8. Adding a backend later (MERN)

The forms call one function — `emailjs.send(...)` in `src/components/forms/useEmailForm.js`. To move to your own backend, replace that call with `fetch("/api/contact", { method: "POST", body: JSON.stringify(data) })` and build an Express + MongoDB API next to this folder. Nothing else in the UI needs to change.

---

## 9. Chatbot

`src/components/Chatbot.jsx` + answers in `src/data/chatbot.js` (keyword matching — add a `q` keyword list and an `a` HTML answer). Built-in: live "are you open now?" status from `config.company.hours`, hours in the visitor's time zone, "how far am I?" distance via browser geolocation, quick-reply chips, Call / WhatsApp / Email / social buttons, and the conversation is kept in `sessionStorage`.

---

## 10. Credits

Three.js (MIT) · React (MIT) · Vite (MIT) · EmailJS SDK · Google Fonts (Sora, Inter) · all icons are original inline SVG.
