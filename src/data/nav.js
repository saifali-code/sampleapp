export const NAV = [
  { label: "Home", to: "/" },
  {
    label: "Services", to: "/services", sub: [
      { to: "/services", icon: "headset", title: "All Services", desc: "Inbound, outbound, back-office & more" },
      { to: "/services#insurance", icon: "umbrella", title: "Insurance Campaigns", desc: "Final Expense, IUL, ACA, Auto" },
      { to: "/campaigns", icon: "target", title: "Campaigns", desc: "Final Expense & US insurance programs" },
      { to: "/industries", icon: "layers", title: "Industries", desc: "Who we serve" },
      { to: "/process", icon: "repeat", title: "How We Work", desc: "Discovery to go-live in 14 days" },
      { to: "/technology", icon: "cpu", title: "Technology", desc: "Dialers, VoIP, QA & security" },
    ],
  },
  { label: "Campaigns", to: "/campaigns" },
  {
    label: "Company", to: "/about", sub: [
      { to: "/about", icon: "building", title: "About Us", desc: "Our story, mission & facility" },
      { to: "/team", icon: "users", title: "Our Team", desc: "The people behind the floor" },
      { to: "/life-at-mak", icon: "smile", title: "Life at MAK BPO", desc: "Culture, perks & growth" },
      { to: "/careers", icon: "briefcase", title: "Careers", desc: "Open positions — apply online" },
      { to: "/insights", icon: "book", title: "Insights", desc: "Articles & guides on BPO" },
      { to: "/faq", icon: "chat", title: "FAQ", desc: "Answers to common questions" },
    ],
  },
  { label: "Partnership", to: "/partnership" },
  { label: "Contact", to: "/contact" },
];
