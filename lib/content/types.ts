// Shapes of the editable content. Sanity documents are mapped onto these,
// and lib/content/defaults.ts fills in anything that hasn't been set yet.

import type { StaticImageData } from "next/image";

/** An image from Sanity (URL + size) or a local one (public path or static import). */
export type Img = {
  src: string | StaticImageData;
  width?: number;
  height?: number;
  /** CSS object-position, e.g. "50% 20%". From the Sanity hotspot when set. */
  position?: string;
  alt?: string;
};

export type Stats = {
  tradesCompleted: number;
  yearsExperience: number;
  winRate: number;
  community: number;
  brandsPartnered: number;
};
export type StatKey = keyof Stats;

export type SiteSettings = {
  name: string;
  description: string;
  footerTagline: string;
  email: string;
  phones: string[];
  whatsapp: string;
  telegram: string;
  telegramChannel: string;
  bookingUrl: string;
  academyUrl: string;
  socials: { label: string; href: string }[];
  stats: Stats;
};

export type Brand = { name: string; logo: Img; showOnHome: boolean; showOnServices: boolean };

export type Testimonial = { name: string; handle?: string; rating?: number; content: string };

export type Experience = { date: string; company: string; role?: string; achievements: string[] };

export type Receipt = {
  image: Img;
  label: string;
  detail: string;
  /** USD payout shown on the receipt. Only these add to the total. */
  amount?: number;
  /** Trade result shown on the receipt */
  result?: string;
  /** Desk position (percent of the desk) and resting tilt */
  at: { l: number; t: number; w: number; r: number };
};

export type FaqItem = { question: string; answer: string[] };

export type FeaturedService = {
  title: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  image: Img;
};

export type SectionIntro = { label: string; heading: string; text: string };

export type HomePage = {
  hero: { heading: string; highlight: string; text: string; portfolioLabel: string; resultsLabel: string };
  about: {
    label: string;
    title: string;
    titleHighlight: string;
    typewriterWord: string;
    text: string;
    highlights: string[];
    ctaLabel: string;
  };
  trackRecord: {
    label: string;
    quote: string;
    cards: { title: string; stat: StatKey; suffix?: string; image: Img; showBrands?: boolean }[];
  };
  payouts: { label: string; heading: string; text: string };
  services: SectionIntro & { items: FeaturedService[]; moreLabel: string };
  testimonials: SectionIntro;
  faq: SectionIntro & { items: FaqItem[] };
};

export type AboutPage = {
  hero: SectionIntro & { bookLabel: string; storyLabel: string; portrait: Img };
  ticker: string[];
  story: {
    label: string;
    heading: string;
    image: Img;
    caption: string;
    subcaption: string;
    chapters: { title: string; paragraphs: string[] }[];
  };
  experience: SectionIntro;
};

export type ServiceIcon =
  | "LineChart"
  | "GraduationCap"
  | "Wallet"
  | "Clapperboard"
  | "Users"
  | "Megaphone"
  | "Briefcase"
  | "ShieldCheck"
  | "Target"
  | "Sparkles";

export type Service = {
  slug: string;
  icon: ServiceIcon;
  label: string;
  short: string;
  tagline: string;
  includes: string[];
  bestFor: string;
  price?: string;
  cta: { text: string; href: string };
  thumb: Img;
};

export type ServicesPage = {
  heading: string;
  text: string;
  ctaLabel: string;
  stepsHeading: string;
  steps: { title: string; text: string }[];
  contactLabel: string;
};

export type ContactPage = SectionIntro & { formHeading: string; formText: string };

export type LegalSlug = "privacy" | "terms" | "disclaimer";

export type LegalPage = {
  slug: LegalSlug;
  title: string;
  updated: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};
