// The built-in content. The site shows this whenever Sanity isn't connected,
// and uses it for any field that is left empty in Sanity.
// `npm run sanity:seed` copies all of it into Sanity as a starting point.

import { site } from "@/lib/site";
import type {
  AboutPage,
  Brand,
  ContactPage,
  Experience,
  HomePage,
  LegalPage,
  Receipt,
  Service,
  ServicesPage,
  SiteSettings,
  Testimonial,
} from "./types";

import Portrait from "@/assets/images/profile_image.png";
import BlueberryPayout from "@/assets/images/Blueberry_payout.jpg";
import MubitePay from "@/assets/images/mubite_pay.jpg";
import BybitTrade from "@/assets/images/e1.jpg";
import MexcTrade from "@/assets/images/e8.jpg";
import FundingCert from "@/assets/images/Copy_of_Funded Certificate(2).png";
import VerificationCert from "@/assets/images/blueberry_cert.png";

export const defaultSettings: SiteSettings = {
  name: site.name,
  description: site.description,
  footerTagline: "The crypto trader that makes you money.",
  email: site.email,
  phones: [...site.phones],
  whatsapp: site.whatsapp,
  telegram: site.telegram,
  telegramChannel: site.telegramChannel,
  bookingUrl: site.bookingUrl,
  academyUrl: site.academyUrl,
  socials: site.socials.map((s) => ({ ...s })),
  stats: { ...site.stats },
};

const s = defaultSettings;

export const defaultHome: HomePage = {
  hero: {
    heading: "A crypto trader that makes",
    highlight: "you money.",
    text: "Helping traders and investors navigate the trading space profitably with information and education.",
    portfolioLabel: "View my portfolio",
    resultsLabel: "More Results",
  },
  about: {
    label: "About Me",
    title: "Who is",
    titleHighlight: "Elite Ayomide?",
    typewriterWord: "Trader.",
    text: `A crypto trader with ${s.stats.yearsExperience} years of experience, helping traders and investors navigate the trading space profitably with information and education.`,
    highlights: [
      "Trader + Crypto Trader",
      "Growth Strategist",
      "Community Manager",
      "Technical Analyst",
      "Video Content Creator",
      "Trading Mentor",
    ],
    ctaLabel: "More About Me",
  },
  trackRecord: {
    label: "Track Record At A Glance",
    quote: "Words are futile without evidence. My results are loud, not silent.",
    cards: [
      { title: "Total Trades", stat: "tradesCompleted", image: { src: "/e9.jpg", position: "50% 70%" } },
      { title: "Win Rate", stat: "winRate", suffix: "%", image: { src: "/win.jpg" } },
      { title: "Crypto Community", stat: "community", image: { src: "/student.jpg" } },
      { title: "Brands Partnered", stat: "brandsPartnered", image: { src: "/star.jpg" }, showBrands: true },
    ],
  },
  payouts: {
    label: "Verified Trading History",
    heading: "Real numbers.\nReal impact.",
    text: "Payout certificates and trade receipts, straight from the platforms. Tap any receipt to see it full size.",
  },
  services: {
    label: "Services",
    heading: "Strategic services. For lasting impact",
    text: "High-value services for traders, investors and crypto brands: expert guidance, strategic insight, and actionable solutions that drive growth.",
    items: [
      {
        title: "Crypto Consulting",
        description: "One-on-one advisory for smarter crypto trading and investment decisions.",
        href: s.bookingUrl,
        image: { src: "/e9.jpg", position: "50% 60%" },
      },
      {
        title: "Crypto Mentorship",
        description: "Lifetime access to battle-tested strategies across Crypto, Forex and Stocks.",
        href: s.academyUrl,
        ctaLabel: "Join the Academy",
        image: { src: "/e11.jpg", position: "50% 20%" },
      },
      {
        title: "One-on-One Crypto Mentorship",
        description: "Personal sessions built around your trading and your goals.",
        href: s.bookingUrl,
        image: { src: Portrait, position: "50% 22%" },
      },
    ],
    moreLabel: "More of my Services",
  },
  testimonials: {
    label: "What clients say",
    heading: "500+ trusted customers",
    text: "Traders, students and brands who have worked with Elite Ayomide, in their own words.",
  },
  faq: {
    label: "FAQ",
    heading: "Questions, answered.",
    text: "Quick answers about Elite Ayomide's services, who they're for and how to get started.",
    items: [
      {
        question: "What services do you offer?",
        answer: [
          "Crypto consulting",
          "Crypto mentorship",
          "One-on-one crypto mentorship",
          "Private trading investment",
          "Video content creation",
          "Community growth strategy",
        ],
      },
      {
        question: "Who do you work with?",
        answer: [
          "Individuals looking for a profitable trading strategy through our crypto classes and mentorship.",
          "High-net-worth individuals in Africa or the diaspora seeking steady investment growth with strict risk management.",
          "Crypto brands looking to expand their reach through video content creation, marketing, and community management.",
        ],
      },
      {
        question: "How can clients get started?",
        answer: [
          `Send us an email: ${s.email}`,
          "Book a one-on-one session via the contact page.",
          `Send us a direct Telegram DM on @${s.telegram}.`,
          `Send us a WhatsApp DM on ${s.phones.join(" or ")}.`,
        ],
      },
      {
        question: "What are your rates or engagement models?",
        answer: [
          "Lifetime Mentorship: $100 (one-time fee)",
          "Community Strategy & Management: $500 per month",
          // TODO: confirm this price with the client ("$15p" in the original)
          "Branding/Promotion: $15p per month",
        ],
      },
    ],
  },
};

export const defaultTestimonials: Testimonial[] = [
  {
    name: "James Okafor",
    handle: "@jamesokafor",
    rating: 5,
    content: "Elite Ayomide's crypto consulting completely changed how I approach trading. Up 3x in 6 months.",
  },
  {
    name: "Fatima Bello",
    handle: "@fatimab",
    rating: 5,
    content: "The one-on-one mentorship was worth every penny. Clear, actionable, and results-driven.",
  },
  {
    name: "Chidi Nwosu",
    handle: "@chidinwosu",
    rating: 4,
    content: "Best crypto mentor I've worked with. Simplified DeFi concepts I'd struggled with for years.",
  },
  {
    name: "Amaka Eze",
    handle: "@amakaeze",
    rating: 5,
    content: "I went from losing trades to consistent profits within 90 days. Highly recommend.",
  },
  {
    name: "Tunde Adesanya",
    handle: "@tundea",
    rating: 5,
    content: "The group mentorship community alone is worth it. Everyone is helpful and the signals are sharp.",
  },
  {
    name: "Ngozi Williams",
    handle: "@ngoziwill",
    rating: 5,
    content: "Exceptional service. The strategy sessions helped me build a portfolio I'm actually proud of.",
  },
];

// Every figure here is printed on the client's own receipt image.
export const defaultReceipts: Receipt[] = [
  {
    image: { src: BlueberryPayout },
    label: "Blueberry Funded payout",
    detail: "14 Jun 2026",
    amount: 1059.2,
    at: { l: 0, t: 3, w: 50, r: -4 },
  },
  {
    image: { src: MubitePay },
    label: "Mubite profit share",
    detail: "23 Mar 2026",
    amount: 752.22,
    at: { l: 52, t: 0, w: 46, r: 3 },
  },
  {
    image: { src: "/Second Mubite withdrawal.jpg", width: 1280, height: 940 },
    label: "Mubite profit share",
    detail: "25 Apr 2026",
    amount: 560.92,
    at: { l: 4, t: 37, w: 42, r: 2.5 },
  },
  {
    image: { src: BybitTrade },
    label: "Bybit SOLUSDT short, 10x",
    detail: "ROI",
    result: "+105.81%",
    at: { l: 47, t: 27, w: 22, r: -3 },
  },
  {
    image: { src: MexcTrade },
    label: "MEXC SIGNUSDT long, 10x",
    detail: "ROI",
    result: "+129.07%",
    at: { l: 73, t: 31, w: 25, r: 4 },
  },
  {
    image: { src: FundingCert },
    label: "Blueberry Funded",
    detail: "Certificate of funding",
    at: { l: 1, t: 68, w: 42, r: -2 },
  },
  {
    image: { src: VerificationCert },
    label: "Blueberry Funded",
    detail: "Verification pass, 31 Mar 2026",
    at: { l: 47, t: 66, w: 44, r: 2 },
  },
];

const brand = (name: string, src: string, showOnHome = true): Brand => ({
  name,
  logo: { src, alt: name },
  showOnHome,
  showOnServices: true,
});

export const defaultBrands: Brand[] = [
  brand("Bybit", "/bybit.png"),
  brand("Binolla", "/binolla.png"),
  brand("MEXC", "/mexc.png"),
  brand("Tradelocker", "/trade_locker.jpg"),
  brand("Muesli Swap", "/muesli_swap.jpg"),
  brand("Binomo", "/binomo.png"),
  brand("Binance", "/binance.png", false),
];

export const defaultAbout: AboutPage = {
  hero: {
    label: "About me",
    heading: `A crypto trader with ${s.stats.yearsExperience} years of experience.`,
    text: "I am a crypto trader with deep knowledge about the market. I have partnered with several crypto brands and helped traders achieve the best results in the crypto space.",
    bookLabel: "Book a Call",
    storyLabel: "Read my story",
    portrait: { src: "/hero/ayomide.webp", width: 610, height: 671, alt: "Elite Ayomide" },
  },
  ticker: ["Contribution", "Participation", "Attribution"],
  story: {
    label: "My story",
    heading: "From project interactions to proof on-chain.",
    image: { src: Portrait, alt: "Elite Ayomide" },
    caption: "Elite Ayomide",
    subcaption: "Trader, mentor and brand partner",
    chapters: [
      {
        title: "THE START",
        paragraphs: [
          "EliteAyomide is a 26-year-old trader with 6 years of experience in Web3. Starting with project interactions, he helped grow Arbitrum, Optimism, and other top crypto ecosystems — earning tokens as rewards for his contributions.",
        ],
      },
      {
        title: "THE GRIND",
        paragraphs: [
          "Every day was a new battle — monitoring markets, engaging protocols, and staying ahead of the curve. The grind meant sleepless nights, deep research, and an unwavering commitment to understanding what others overlooked. He built systems, refined strategies, and turned raw effort into compounding results.",
          "The grind never stopped. From testnet campaigns to mainnet launches, EliteAyomide positioned himself at the frontier of every major protocol drop — not by luck, but by relentless preparation and execution.",
        ],
      },
      {
        title: "THE WORK",
        paragraphs: [
          "His work spans on-chain analytics, liquidity provision, ecosystem growth consulting, and community building across multiple L2 networks. He has contributed to governance proposals, beta-tested flagship DeFi products, and built a reputation as a trusted voice in the Web3 space.",
          "The work is documented — wallet histories, contribution records, and community endorsements. Every transaction tells a story of purpose and precision, not speculation.",
        ],
      },
      {
        title: "THE PROOF",
        paragraphs: [
          "Six-figure token rewards. Early allocations from protocols that went on to become industry staples. A network of builders, founders, and investors who can attest to EliteAyomide's consistency and impact across the ecosystem.",
          "The proof isn't in promises — it's in the chain. Verifiable. Immutable. Undeniable. The results speak for themselves, and the on-chain record stands as a permanent testament to years of disciplined effort.",
        ],
      },
    ],
  },
  experience: {
    label: "Experience",
    heading: "Where I've put in the work.",
    text: "Brand partnerships, affiliate campaigns and community roles across exchanges, prop firms and DEXs.",
  },
};

export const defaultExperiences: Experience[] = [
  {
    date: "2025 - PRESENT",
    company: "Pumpkin DEX",
    role: "Brand Partner",
    achievements: [
      "Livestream 3 times a week on the platform, teaching and analysing the technical analysis of the crypto and the commodity Markets.",
      "Collaborated with the internal team to drive narrative driven promotional contents to drive sign-ups and Volume on the DEX.",
    ],
  },
  {
    date: "2026",
    company: "Mubite Prop Firm",
    role: "Brand Partner & Video Creator",
    achievements: [
      "Produced and edited short-form content showcasing trading benefits of the Prop Firm, driving a 30% follower growth on the brand’s African exposure within 3 months.",
      "Designed content strategies and performance reports that improved campaign consistency and visual brand identity across all touchpoints.",
      "Collaborated with internal marketing teams to develop narrative-driven promotional videos that strengthened lead acquisition.",
    ],
  },
  {
    date: "2025 - 2026",
    company: "Blueberry Funded",
    role: "Brand Partner & Video Creator",
    achievements: [
      "Produced and edited short-form content showcasing trading benefits, driving a 35% follower growth on the brand’s TikTok handle within 3 months.",
      "Designed content calendars and performance reports that improved campaign consistency and visual brand identity across all touchpoints.",
      "Collaborated with internal creative teams to develop narrative-driven promotional videos that strengthened lead acquisition.",
    ],
  },
  {
    date: "2023 - PRESENT",
    company: "Bybit Exchange",
    role: "Affiliate & Content Creator",
    achievements: [
      "Generated over $2.1M trading volume through affiliate-driven campaigns and targeted content strategies.",
      "Onboarded nearly 200 verified traders through organic content on YouTube, TikTok, and Telegram.",
      "Developed 20+ crypto explainer videos that simplified trading tools, leading to a 22% click-through rate improvement on referral links.",
      "Partnered with Bybit’s marketing division to amplify campaigns, achieving an average engagement rate of 8.5% per post.",
    ],
  },
  {
    date: "2023 - 2025",
    company: "OptionFlow Finance",
    role: "Community Moderator",
    achievements: [
      "Oversaw Discord and Telegram channels exceeding 25,000 members, maintaining high engagement and reducing spam incidents by 60% through structured moderation systems.",
      "Created announcement campaigns that consistently reached 90%+ message visibility, enhancing investor confidence and communication clarity.",
      "Developed and executed FAQ automation workflow, decreasing repetitive inquiries by 40%, freeing developer time for core operations.",
      "Collaborated with the marketing team to deliver promotional content and partnership updates, resulting in a 15% monthly increase in returning community users.",
    ],
  },
  {
    date: "2022 - 2025",
    company: "MuesliSwap DEX (Cardano)",
    role: "Community Manager",
    achievements: [
      "Managed multi-channel communication hubs (Discord, X & Telegram) with 12K+ combined members, achieving 25% higher weekly engagement rate via active discussions and contests.",
      "Authored over 50+ project announcements and partnership updates, contributing to steady liquidity inflow and consistent trading volume growth.",
      "Designed and launched user education initiatives (“Ask Me Anything” sessions & beginner threads), increasing new-user retention by 18% within two months.",
      "Collaborated with the core dev team to communicate technical updates in digestible content formats for both retail and institutional investors.",
    ],
  },
];

const telegramUrl = `https://t.me/${s.telegram}`;

export const defaultServices: Service[] = [
  {
    slug: "consulting",
    icon: "LineChart",
    label: "Crypto Consulting",
    short: "Advisory calls",
    tagline: "One-on-one advisory calls for smarter crypto trading and investment decisions.",
    includes: [
      "Hosted strategy calls, one-on-one",
      "Help fixing the causes of unprofitable trading",
      "Guidance from a trader with a 70%+ win rate",
    ],
    bestFor: "Traders who want to stop losing and start trading with a plan.",
    cta: { href: s.bookingUrl, text: "Book a Call" },
    thumb: { src: "/e9.jpg" },
  },
  {
    slug: "mentorship",
    icon: "GraduationCap",
    label: "Crypto Mentorship",
    short: "Lifetime academy",
    tagline: "Battle-tested trading frameworks across Crypto, Forex and Stocks.",
    includes: [
      "Lifetime access to an ever-evolving strategy library",
      "Frameworks for Crypto, Forex and Stock trading",
      "A 70% student profitability rate",
    ],
    bestFor: "Individuals looking for a profitable trading strategy.",
    price: "$100 one-time",
    cta: { href: s.academyUrl, text: "Join the Academy" },
    thumb: { src: "/student.jpg" },
  },
  {
    slug: "private-trading",
    icon: "Wallet",
    label: "Private Trading Investments",
    short: "Managed capital",
    tagline: "Don't have time to trade? Your capital, professionally managed.",
    includes: [
      "Disciplined risk management on every trade",
      "Proprietary trading strategies",
      "Monthly, quarterly or annual payouts",
      "Full transparency and legal backing",
    ],
    bestFor: "High-net-worth individuals in Africa or the diaspora seeking steady growth.",
    cta: { href: telegramUrl, text: "Message on Telegram" },
    thumb: { src: "/win.jpg" },
  },
  {
    slug: "video-content",
    icon: "Clapperboard",
    label: "Video Content Creation",
    short: "For crypto brands",
    tagline: "Platform-optimized video that puts your brand in front of 20,000+ traders.",
    includes: [
      "High-quality, platform-optimized videos",
      "Tailored to your brand identity, goals and audience",
      "Reach across a 20,000+ member community",
      "Rates that make sense for your budget",
    ],
    bestFor: "Crypto brands looking to expand their reach.",
    cta: { href: `mailto:${s.email}`, text: "Send a Mail" },
    thumb: { src: "/star.jpg" },
  },
  {
    slug: "community-growth",
    icon: "Users",
    label: "Community Growth Strategies",
    short: "Launch to scale",
    tagline: "Data-driven strategies that grow loyalty and engagement, not just numbers.",
    includes: [
      "Tested, data-driven growth strategies",
      "Community management from launch to scale",
      "Experience growing Discord and Telegram groups past 25,000 members",
    ],
    bestFor: "Crypto projects that need a thriving community.",
    price: "$500 per month",
    cta: { href: telegramUrl, text: "Telegram" },
    thumb: { src: "/blue_wave.jpg" },
  },
];

export const defaultServicesPage: ServicesPage = {
  heading: "Five ways to trade smarter.",
  text: `Consulting, mentorship, managed trading, video content and community growth, from a crypto trader with ${s.stats.yearsExperience} years in the market.`,
  ctaLabel: "Book a Call",
  stepsHeading: "How to start",
  steps: [
    { title: "Pick a service", text: "Choose what fits where you are right now." },
    { title: "Message or book", text: "Reach out by call, email, Telegram or WhatsApp." },
    { title: "Start trading smarter", text: "Get a clear plan and start putting it to work." },
  ],
  contactLabel: "Contact me",
};

export const defaultContact: ContactPage = {
  label: "Book a consultation",
  heading: "Let's build the future together.",
  text: "Partner, collaborate, or engage to drive meaningful impact and create lasting value across sectors and communities.",
  formHeading: "Send a message",
  formText: "Tell me what you need and you'll get a reply by email.",
};

// Starting drafts — have them reviewed by a lawyer (e.g. for NDPA / GDPR) for the countries you serve.
export const defaultLegal: Record<LegalPage["slug"], LegalPage> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "October 2026",
    description: `How ${s.name} collects and uses your information.`,
    intro: `This policy explains what information ${s.name} collects through this website and how it is used.`,
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you use the contact form we receive your name, email address and message. When you contact us by email, phone, WhatsApp or Telegram we receive the details you share there.",
          "Our hosting provider may keep basic technical logs (such as IP address and browser type) to keep the site secure and running.",
        ],
      },
      {
        heading: "How we use it",
        body: ["We use your details only to reply to you and provide the services you ask for. We do not sell your information."],
      },
      {
        heading: "Third-party services",
        body: [
          "This site embeds content from services such as Vimeo and links to platforms such as Medium, Telegram, YouTube, X, Instagram and TikTok. Those services have their own privacy policies.",
        ],
      },
      {
        heading: "Your choices",
        body: [`You can ask us to see, correct or delete the information we hold about you by emailing ${s.email}.`],
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms and Conditions",
    updated: "October 2026",
    description: `Terms for using the ${s.name} website and services.`,
    intro: `By using this website or booking a service with ${s.name}, you agree to these terms.`,
    sections: [
      {
        heading: "Services",
        body: [
          "Consulting, mentorship, content creation and community services are provided as described at the time of booking. Specific deliverables, prices and timelines are confirmed with you directly before work begins.",
        ],
      },
      {
        heading: "Payments and refunds",
        body: [
          "Fees are shown on the site or agreed in writing. Unless agreed otherwise, one-time fees (such as lifetime mentorship) are non-refundable once access has been given.",
        ],
      },
      {
        heading: "Education only",
        body: ["All trading content is educational and is not financial advice. See the Risk Disclaimer for details."],
      },
      {
        heading: "Content",
        body: [
          "Course material, videos and strategies are for your personal use. Please do not resell or redistribute them without permission.",
        ],
      },
      { heading: "Contact", body: [`Questions about these terms can be sent to ${s.email}.`] },
    ],
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Risk Disclaimer",
    updated: "October 2026",
    description: "Important information about the risks of trading and investing.",
    intro: `Trading and investing in cryptocurrencies, forex, stocks and other financial instruments carries a high level of risk. You can lose some or all of the money you put in. Please read this page before using any service from ${s.name}.`,
    sections: [
      {
        heading: "Not financial advice",
        body: [
          "Everything on this website, in our mentorship, classes, videos, livestreams, Telegram and social media channels is for education and information only. It is not personal financial, investment, tax or legal advice.",
          "You are responsible for your own decisions. Consider speaking to a licensed financial adviser before you invest.",
        ],
      },
      {
        heading: "Past results do not guarantee future returns",
        body: [
          "Trade histories, win rates, payout screenshots and testimonials shown on this site reflect past results. They are not a promise or guarantee of what you will earn. Individual results vary.",
        ],
      },
      {
        heading: "High risk and volatility",
        body: [
          "Crypto markets are volatile and can move sharply in short periods. Leveraged products and prop-firm challenges can magnify losses. Only trade with money you can afford to lose.",
        ],
      },
      {
        heading: "Private trading investments",
        body: [
          "Any capital management arrangement is subject to a separate written agreement that sets out fees, risks and payout terms. Nothing on this website is an offer to manage funds without that agreement.",
        ],
      },
      {
        heading: "Third-party platforms",
        body: [
          "We may mention or partner with exchanges, prop firms and other platforms. We are not responsible for their services, and partnership links may earn us a commission.",
        ],
      },
      { heading: "Questions", body: [`Contact us at ${s.email} if you have any questions about these risks.`] },
    ],
  },
};
