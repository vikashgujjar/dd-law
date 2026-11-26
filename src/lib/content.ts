/**
 * All site copy, transcribed from the existing ddlaw.ca homepage.
 * Keep wording verbatim — the redesign changes presentation only.
 */

/** Base URL for pages that live outside this homepage build. */
export const SITE = "https://ddlaw.ca";

export const PHONE = { display: "604-746-3330", href: "tel:6047463330" };
export const FAX = { display: "604-746-3331", href: "tel:6047463331" };

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; href?: string; groups: { heading?: string; links: NavLink[] }[] };
export type NavItem = NavLink | NavGroup;

export const nav: NavItem[] = [
  {
    label: "Practice Areas",
    groups: [
      {
        links: [
          { label: "Family Law", href: `${SITE}/family-law/` },
          { label: "Criminal Law", href: `${SITE}/criminal-law/` },
          { label: "Immigration Law", href: `${SITE}/immigration-law/` },
          { label: "Civil Litigation", href: `${SITE}/commercial-civil-litigation-lawyer/` },
        ],
      },
    ],
  },
  {
    label: "Team",
    href: `${SITE}/about/`,
    groups: [
      {
        heading: "Partners",
        links: [
          { label: "Rob Dhanu, K.C.", href: `${SITE}/kings-counsel-lawyer-rob-dhanu/` },
          { label: "Uphar K. Dhaliwal", href: `${SITE}/attorney-uphar-dhaliwal/` },
        ],
      },
      {
        heading: "Associates",
        links: [
          { label: "Rebecca Gill", href: `${SITE}/lawyer-rebecca-gill/` },
          { label: "Mohit Chhibber", href: `${SITE}/mohit-chhibber/` },
          { label: "Arminder Dhaliwal", href: `${SITE}/arminder-dhaliwal/` },
          { label: "Sarbi Bassi", href: `${SITE}/sarbi-bassi/` },
          { label: "Nicholas Bilof", href: `${SITE}/nicholas-bilof/` },
          { label: "William Huang", href: `${SITE}/william-huang-lawyer/` },
        ],
      },
    ],
  },
  { label: "Blog", href: `${SITE}/legal-wire-blog/` },
  {
    label: "Locations",
    href: `${SITE}/contact/`,
    groups: [
      {
        links: [
          { label: "Abbotsford", href: `${SITE}/contact/` },
          { label: "Surrey", href: `${SITE}/contact-page-surrey/` },
        ],
      },
    ],
  },
  { label: "Contact Us", href: "#contact" },
];

export const hero = {
  eyebrow: "Real Life Legal Solutions",
  title: "DD LAW",
  tagline: "Understanding You is Our Advantage",
  cta: { label: "Message Us", href: "#contact" },
  consult: { label: "Schedule a Consultation", href: "#contact" },
  image: { src: "/images/hero-group.webp", width: 1052, height: 807, alt: "Rob Dhanu, K.C. and Uphar K. Dhaliwal of Dhanu Dhaliwal Law Group" },
  featuredLabel: "Featured on",
};

export const publications = [
  { name: "The Globe and Mail", src: "/images/logos/globe-and-mail.png", width: 200, height: 23 },
  { name: "CBC", src: "/images/logos/cbc.png", width: 270, height: 80 },
  { name: "Global News", src: "/images/logos/global-news.png", width: 270, height: 80 },
  { name: "National Post", src: "/images/logos/national-post.png", width: 218, height: 35 },
  { name: "The National", src: "/images/logos/the-national.png", width: 270, height: 80 },
];

export const voice = {
  titleLead: "A Powerful Voice",
  titleMid: "When It",
  titleAccent: "Matters Most",
  paragraphs: [
    "Legal problems are deeply personal. Behind every file is a family, a future, a reputation, a life in transition. We believe that a successful legal outcome starts with truly understanding your story and standing beside you every step of the way.",
    "Our firm practices family, criminal, immigration, and civil law, united by one guiding principle: we don’t just represent clients – we advocate for people.",
  ],
  image: { src: "/images/rob-voice.webp", width: 962, height: 1184, alt: "Rob Dhanu, King’s Counsel" },
  leadership: {
    title: "Leadership Grounded in Experience and Trust",
    paragraphs: [
      "Rob Dhanu, King’s Counsel brings decades of courtroom experience as a former Federal Crown prosecutor for the Department of Justice and a seasoned criminal defence lawyer. Having appeared at every level of court, including the Supreme Court of Canada, Rob is known for his strategic insight, calm authority, and unshakable commitment to justice. His perspective is frequently sought by leading media outlets such as Global News, CBC, and CKNW reflecting the trust placed in his judgment nationwide.",
      "Uphar K. Dhaliwal also brings decades of experience as a leading lawyer in family law and immigration law (Canada and the United States), as well as a respected mediator. Known for her steady guidance in emotionally and financially complex disputes, Uphar is trusted for her clarity, compassion, and sound judgment. She regularly presents on pressing legal issues and plays an active role on legal committees shaping the future of family and immigration law.",
      "Together, with their dedicated legal team, they bring a rare balance of strength, empathy, strategy and perspective.",
    ],
  },
};

export type TeamMember = {
  name: string;
  title: string;
  image?: string;
  href?: string;
  initials: string;
};

export const team = {
  eyebrow: "Our Team",
  titleLead: "A Legal Team With",
  titleAccent: "Purpose",
  paragraphs: [
    "We know the law. But more importantly, we take the time to understand who you are, your goals, your concerns, and what’s truly at stake. Every strategy we build is shaped around the real life outcome that matters most to our clients, not just an argument about the law.",
    "Rob and Uphar have assembled a legal team that shares these values: deep listening, rigorous preparation, and fearless advocacy. The result is a firm that speaks with a clear, powerful voice on your behalf.",
  ],
  members: [
    { name: "Rob Dhanu, K.C", title: "Founding Partner. King's Counsel. Former Federal Crown Prosecutor.", image: "/images/team/rob-dhanu.jpg", href: `${SITE}/kings-counsel-lawyer-rob-dhanu/`, initials: "RD" },
    { name: "Rebecca Gill", title: "Criminal defence lawyer.", image: "/images/team/rebecca-gill.jpg", href: `${SITE}/lawyer-rebecca-gill/`, initials: "RG" },
    { name: "Nicholas Bilof", title: "Criminal defence lawyer.", image: "/images/team/nicholas-bilof.jpg", href: `${SITE}/nicholas-bilof/`, initials: "NB" },
    { name: "Sarbi Bassi", title: "Civil forfeiture.", image: "/images/team/sarbi-bassi.jpg", href: `${SITE}/sarbi-bassi/`, initials: "SB" },
    { name: "Uphar Dhaliwal", title: "Lawyer", image: "/images/team/uphar-dhaliwal.jpg", href: `${SITE}/attorney-uphar-dhaliwal/`, initials: "UD" },
    { name: "Navneet Basran", title: "Criminal team lead assistant.", image: "/images/team/navneet-basran.jpg", initials: "NB" },
    { name: "Mohit Chhibber", title: "Lawyer", image: "/images/team/mohit-chhibber.webp", href: `${SITE}/mohit-chhibber/`, initials: "MC" },
  ] satisfies TeamMember[],
};

export const advantages = {
  titleLead: "Advantages of",
  titleAccent: "A Client-Centered Approach",
  intro:
    "We want more from the law and so should you. Welcome to a powerful client-centred philosophy that turns our passion for people into advantages for you.",
  tocLabel: "Table of Contents",
  items: [
    {
      id: "wide-range-of-expertise",
      title: "Wide Range of Expertise",
      body: "Having criminal, family, immigration, and civil law expertise under one roof gives our clients a real advantage. Legal issues rarely exist in isolation and we understand how one legal problem can have a ripple effect into entirely different areas of law. Our integrated approach allows us to anticipate overlaps, coordinate strategy, and avoid costly missteps. The result is less stress, fewer delays, and more efficient outcomes for you.",
    },
    {
      id: "top-level-experience",
      title: "Top Level Experience",
      body: "Our lawyers bring decades of combined experience from government service, in house corporate roles, and large law firms. We have extensive litigation experience at every level of court, including appeals, and know how to build strong cases with your story. At the same time, we recognize that most matters don’t belong in a courtroom. By focusing on people, priorities, and practical outcomes, we resolve many matters efficiently and strategically, often without trial, saving clients time, cost, and stress.",
    },
    {
      id: "client-centered-approach",
      title: "Client-Centered Approach",
      body: "Too often, legal problems are treated as technical issues rather than human ones. We take a different approach, placing the individual and their story at the centre of every case. Your story is a powerful tool that shapes the narrative, guides strategy, and can define the outcome of your matter. We do not just want to understand where you have been, we want to help you shape where you are going. When meaningful, positive changes are made in a client’s real life, those changes can also powerfully influence how courts view a case. By combining strong advocacy with connections to trusted professionals, we work toward outcomes that create both legal success and lasting change.",
    },
    {
      id: "professional-network",
      title: "Professional Network",
      body: "Legal cases are rarely won by lawyers alone. They often depend on the insight and expertise of doctors, counsellors, health care professionals, private investigators, and other specialists who understand the realities behind the legal issues. We work closely with a trusted network of professionals who can support you in your real life while also strengthening your legal position. In many cases, their involvement can turn what others may see as a losing case into a winning one. This collaborative approach means you are never on your own when it comes to accessing high quality professional support for both you and your legal matter.",
    },
    {
      id: "communication",
      title: "Communication",
      body: "We pride ourselves on clear, consistent communication and on making sure our clients always feel informed and supported. Our legal team works as an extended family, not just colleagues, and we invite our clients to experience the strength of that culture. Open lines of communication are essential, especially when questions arise or urgent issues demand attention. We work hard to ensure you are never left in the dark or feeling alone. This commitment to connection is why the relationships we build with our clients often continue long after a file is closed.",
    },
    {
      id: "flexible-payment-structure",
      title: "Flexible Payment Structure",
      body: "Legal issues often arise unexpectedly and can bring unanticipated expenses at an already stressful time. We understand how financial uncertainty can add pressure to an emotional or urgent legal matter. That is why we offer a range of fee structures, competitive rates, and flexible payment plans designed to work for you. Our goal is to be transparent, practical, and supportive, so cost does not stand in the way of accessing the legal help you need.",
    },
  ],
};

export const solutions = {
  eyebrow: "Your Story Deserves to Be Heard",
  titleLead: "Real Life",
  titleAccent: "Legal Solutions",
  body: "When the stakes are high, you deserve more than technical expertise. You deserve lawyers who genuinely care to be your voice, who understand the human side of the law, and who will fight for the outcome you need to move forward.",
  closing: "We’re ready when you are.",
  cta: { label: "Message Us", href: "#contact" },
  image: { src: "/images/rob-solutions.webp", width: 687, height: 960, alt: "Rob Dhanu, K.C." },
};

export const testimonials = {
  titleLead: "What Our Clients Say",
  titleAccent: "About Us",
  items: [
    {
      quote: "I can honestly say that Rob changed the course of my life.",
      body: [
        "This isn’t just a tagline. It’s how we answer every message, every call, and every question — with the warmth of someone who genuinely cares about your situation, and the expertise to actually help.",
        "We educate first. We listen always. And we advocate relentlessly.",
      ],
      author: "B.A.",
    },
  ],
};

export const press = {
  titleLead: "Press, News &",
  titleAccent: "Blog",
  intro: "DDLaw Is Regularly Featured In Media For Our Legal Expertise",
  more: { label: "Load More", href: `${SITE}/legal-wire-blog/` },
  articles: [
    {
      publication: "Global News",
      logo: { src: "/images/logos/global-news-grid.png", width: 138, height: 80 },
      title: "What a Publication Ban Means in the Tumbler Ridge School Shooting Case",
      excerpt: "A recent Global News report has raised difficult questions about transparency, public safety, and the role of the courts following.",
      image: { src: "/images/press/publication-ban.png", width: 274, height: 383 },
      href: `${SITE}/what-a-publication-ban-means-in-the-tumbler-ridge-school-shooting-case/`,
      linkLabel: "Read: Publication Ban",
    },
    {
      publication: "Global News",
      logo: { src: "/images/logos/global-news-grid.png", width: 138, height: 80 },
      title: "Rob Dhanu KC on Global News: Firearms Seizures, Mental Health, and Public Safety in Canada",
      excerpt: "A recent segment on Global News examined disturbing new details emerging from the Tumblr Ridge mass shooting investigation.",
      image: { src: "/images/press/firearms.png", width: 253, height: 370 },
      href: `${SITE}/global-news-tumblr-ridge-firearms-seizure-return-bc/`,
      linkLabel: "Read: Firearms Seizures",
    },
    {
      publication: "CBC",
      logo: { src: "/images/logos/cbc-grid.png", width: 170, height: 43 },
      title: "Surrey Extortion Shootings: Castle Doctrine Discussion on Early Edition with Stephen Quinn",
      excerpt: "Rob Dhanu, K.C. joins Stephen Quinn on CBC Radio to discuss the Surrey extortion shootings and what Canadian law says about defending your home.",
      image: { src: "/images/press/castle-doctrine.png", width: 253, height: 370 },
      href: `${SITE}/surrey-extortion-shootings-castle-doctrine-discussion-on-early-edition-with-stephen-quinn/`,
      linkLabel: "Read: Castle Doctrine",
    },
  ],
};

export const contact = {
  titleLead: "Don't Speak to Police",
  titleAccent: "Before You Speak to Us.",
  body: "Whether you are under investigation, have been arrested or are facing an upcoming court date, your very first decision about who will be fighting for you can shape the entire outcome of your case.",
  note: "Or use the form — your inquiry is confidential and reviewed directly by our criminal defence team.",
  submit: "Request Confidential Inquiry",
  fields: {
    firstName: { label: "First Name", placeholder: "Enter your first name" },
    lastName: { label: "Last Name", placeholder: "Enter your last name" },
    email: { label: "Email", placeholder: "your@email.com" },
    contactMethod: { label: "Preferred Contact Method", placeholder: "Select an option", options: ["Email", "Phone"] },
    phone: { label: "Phone", placeholder: "+1 (555) 000-0000" },
    issue: {
      label: "What type of issue do you have?",
      placeholder: "Select option",
      options: ["Criminal Law", "Family Law", "Immigration Law", "Civil Litigation", "Wills & Estates"],
    },
  },
};

export const offices = [
  { name: "Abbotsford Office", address: "2459 Pauline Street" },
  { name: "Surrey Office", address: "3-15243 91 Avenue" },
];

export const footer = {
  logo: { src: "/images/logo-gold.png", width: 2064, height: 356 },
  whatWeDo: ["Family Law", "Immigration Law", "Criminal Law", "Civil Litigation", "Wills & Estates"],
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/ddlawgroup/" },
    { label: "X", href: "https://x.com/RobDhanu" },
    { label: "Instagram", href: "https://www.instagram.com/ddlawgroup/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/dhanu-dhaliwal-law-group/" },
  ],
  tagline: "Dhanu Dhaliwal Law Group · DD LAW Practicing criminal, family, immigration and civil law",
  legal: [
    "*Denotes a law corporation. © All content copyright 2026 Dhanu Dhaliwal Law Group. All Rights Reserved.",
    "The information contained in this site is provided for informational purposes only, and should not be construed as legal advice on any subject matter.",
    "You should not act or refrain from acting on the basis of any content included in this site without seeking legal or other professional advice.",
  ],
};
