// Server-side content getters. Each one reads Sanity and falls back to the
// built-in defaults for anything that isn't set (or when Sanity isn't connected).

import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import {
  defaultAbout,
  defaultBrands,
  defaultContact,
  defaultExperiences,
  defaultHome,
  defaultLegal,
  defaultReceipts,
  defaultServices,
  defaultServicesPage,
  defaultSettings,
  defaultTestimonials,
} from "./defaults";
import type {
  AboutPage,
  Brand,
  ContactPage,
  Experience,
  HomePage,
  Img,
  LegalPage,
  LegalSlug,
  Receipt,
  Service,
  ServicesPage,
  SiteSettings,
  Testimonial,
} from "./types";

export type * from "./types";
export { contactLinks, imageSrc } from "./links";

// ---------- helpers ----------

/** GROQ projection for an image field. `_img` marks it so `clean` can convert it. */
const IMG = `{ "_img": true, "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, hotspot, alt }`;

type Raw = Record<string, unknown>;
const isObject = (v: unknown): v is Raw => typeof v === "object" && v !== null && !Array.isArray(v);

/** nulls become undefined, and projected images become `Img` (hotspot → object-position). */
function clean(value: unknown): unknown {
  if (value === null) return undefined;
  if (Array.isArray(value)) return value.map(clean).filter((v) => v !== undefined);
  if (!isObject(value)) return value;
  if (value._img) {
    if (!value.src) return undefined;
    const hotspot = value.hotspot as { x?: number; y?: number } | null;
    const img: Img = {
      src: value.src as string,
      width: value.width as number,
      height: value.height as number,
      alt: (value.alt as string) || undefined,
      position:
        hotspot && typeof hotspot.x === "number" && typeof hotspot.y === "number"
          ? `${(hotspot.x * 100).toFixed(1)}% ${(hotspot.y * 100).toFixed(1)}%`
          : undefined,
    };
    return img;
  }
  const out: Raw = {};
  for (const [k, v] of Object.entries(value)) {
    if (k.startsWith("_")) continue; // _type, _key, _id…
    const c = clean(v);
    if (c !== undefined) out[k] = c;
  }
  return out;
}

const isEmpty = (v: unknown) =>
  v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);

/**
 * Field-by-field merge: anything empty in Sanity keeps the default.
 * Arrays and images are taken whole (not merged item by item).
 */
function merge<T>(fallback: T, data: unknown): T {
  if (isEmpty(data)) return fallback;
  if (isObject(fallback) && isObject(data) && !("src" in fallback)) {
    const out: Raw = { ...data, ...fallback };
    for (const key of Object.keys(fallback)) out[key] = merge(fallback[key], data[key]);
    return out as T;
  }
  return data as T;
}

/** Fetch a single document and merge it over the defaults. */
async function getDoc<T>(query: string, fallback: T, params?: Record<string, unknown>): Promise<T> {
  const data = await sanityFetch<unknown>(query, params);
  return merge(fallback, clean(data));
}

/** Fetch a list; keeps only valid items, and uses the defaults when there are none. */
async function getList<T>(query: string, fallback: T[], valid: (item: Raw) => T | null): Promise<T[]> {
  const data = clean(await sanityFetch<unknown>(query));
  const items = Array.isArray(data)
    ? data.filter(isObject).map(valid).filter((v): v is T => v !== null)
    : [];
  return items.length ? items : fallback;
}

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const strs = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => !!str(x)) : []);

const ORDER = `| order(coalesce(order, 999) asc, _createdAt asc)`;

// ---------- singletons ----------

export const getSiteSettings = cache(
  (): Promise<SiteSettings> =>
    getDoc(
      `*[_id == "siteSettings"][0]{ name, description, footerTagline, email, phones, whatsapp, telegram, telegramChannel, bookingUrl, academyUrl, "socials": socials[defined(label) && defined(href)]{ label, href }, stats }`,
      defaultSettings,
    ),
);

export const getHomePage = cache(
  (): Promise<HomePage> =>
    getDoc(
      `*[_id == "homePage"][0]{
        hero, about, payouts, testimonials,
        trackRecord{ label, quote, "cards": cards[defined(title) && defined(stat)]{ title, stat, suffix, showBrands, "image": image${IMG} } },
        services{ label, heading, text, moreLabel, "items": items[defined(title)]{ title, description, href, ctaLabel, "image": image${IMG} } },
        faq{ label, heading, text, "items": items[defined(question)]{ question, answer } }
      }`,
      defaultHome,
    ).then((home) => ({
      ...home,
      // Cards and featured services need an image; borrow the default one by position if missing
      trackRecord: {
        ...home.trackRecord,
        cards: home.trackRecord.cards.map((c, i) => ({
          ...c,
          image: c.image ?? defaultHome.trackRecord.cards[i % defaultHome.trackRecord.cards.length].image,
        })),
      },
      services: {
        ...home.services,
        items: home.services.items.map((item, i) => ({
          ...item,
          image: item.image ?? defaultHome.services.items[i % defaultHome.services.items.length].image,
        })),
      },
      faq: { ...home.faq, items: home.faq.items.map((f) => ({ ...f, answer: strs(f.answer) })) },
    })),
);

export const getAboutPage = cache(
  (): Promise<AboutPage> =>
    getDoc(
      `*[_id == "aboutPage"][0]{
        hero{ label, heading, text, bookLabel, storyLabel, "portrait": portrait${IMG} },
        ticker,
        story{ label, heading, caption, subcaption, "image": image${IMG}, "chapters": chapters[defined(title)]{ title, paragraphs } },
        experience
      }`,
      defaultAbout,
    ).then((about) => ({
      ...about,
      story: {
        ...about.story,
        chapters: about.story.chapters.map((c) => ({ title: c.title, paragraphs: strs(c.paragraphs) })),
      },
    })),
);

export const getServicesPage = cache(
  (): Promise<ServicesPage> =>
    getDoc(
      `*[_id == "servicesPage"][0]{ heading, text, ctaLabel, stepsHeading, "steps": steps[defined(title)]{ title, text }, contactLabel }`,
      defaultServicesPage,
    ),
);

export const getContactPage = cache(
  (): Promise<ContactPage> =>
    getDoc(`*[_id == "contactPage"][0]{ label, heading, text, formHeading, formText }`, defaultContact),
);

export const getLegalPage = cache(
  (slug: LegalSlug): Promise<LegalPage> =>
    getDoc(
      `*[_type == "legalPage" && slug == $slug] | order(_updatedAt desc)[0]{ title, updated, description, intro, "sections": sections[defined(heading)]{ heading, body } }`,
      defaultLegal[slug],
      { slug },
    ).then((page) => ({
      ...page,
      slug,
      sections: page.sections.map((s) => ({ heading: s.heading, body: strs(s.body) })),
    })),
);

// ---------- collections ----------

export const getTestimonials = cache(
  (): Promise<Testimonial[]> =>
    getList(`*[_type == "testimonial"] ${ORDER}{ name, handle, rating, content }`, defaultTestimonials, (t) =>
      str(t.name) && str(t.content)
        ? { name: str(t.name)!, handle: str(t.handle), rating: num(t.rating) ?? 5, content: str(t.content)! }
        : null,
    ),
);

export const getExperiences = cache(
  (): Promise<Experience[]> =>
    getList(`*[_type == "experience"] ${ORDER}{ company, role, date, achievements }`, defaultExperiences, (e) =>
      str(e.company)
        ? { company: str(e.company)!, role: str(e.role), date: str(e.date) ?? "", achievements: strs(e.achievements) }
        : null,
    ),
);

export const getReceipts = cache(
  (): Promise<Receipt[]> =>
    getList(
      `*[_type == "receipt"] ${ORDER}{ "image": image${IMG}, label, detail, amount, result, left, top, width, rotation }`,
      defaultReceipts,
      (r) => {
        const image = r.image as Img | undefined;
        if (!image?.width || !str(r.label)) return null;
        return {
          image,
          label: str(r.label)!,
          detail: str(r.detail) ?? "",
          amount: num(r.amount),
          result: str(r.result),
          at: { l: num(r.left) ?? 0, t: num(r.top) ?? 0, w: num(r.width) ?? 40, r: num(r.rotation) ?? 0 },
        };
      },
    ),
);

export const getBrands = cache(
  (): Promise<Brand[]> =>
    getList(
      `*[_type == "brand"] ${ORDER}{ name, showOnHome, showOnServices, "logo": logo${IMG} }`,
      defaultBrands,
      (b) => {
        const logo = b.logo as Img | undefined;
        if (!str(b.name) || !logo) return null;
        return {
          name: str(b.name)!,
          logo: { ...logo, alt: logo.alt ?? str(b.name) },
          showOnHome: b.showOnHome !== false,
          showOnServices: b.showOnServices !== false,
        };
      },
    ),
);

export const getServices = cache(
  (): Promise<Service[]> =>
    getList(
      `*[_type == "service"] ${ORDER}{ label, "slug": slug.current, icon, short, tagline, includes, bestFor, price, cta, "thumb": thumb${IMG} }`,
      defaultServices,
      (s) => {
        const slug = str(s.slug);
        const label = str(s.label);
        if (!slug || !label) return null;
        const fallback = defaultServices.find((d) => d.slug === slug);
        const cta = (isObject(s.cta) ? s.cta : {}) as Raw;
        return {
          slug,
          label,
          icon: (str(s.icon) ?? fallback?.icon ?? "LineChart") as Service["icon"],
          short: str(s.short) ?? "",
          tagline: str(s.tagline) ?? "",
          includes: strs(s.includes),
          bestFor: str(s.bestFor) ?? "",
          price: str(s.price),
          cta: {
            text: str(cta.text) ?? fallback?.cta.text ?? "Get in touch",
            href: str(cta.href) ?? fallback?.cta.href ?? "/contact",
          },
          thumb: (s.thumb as Img | undefined) ?? fallback?.thumb ?? { src: "/e9.jpg" },
        };
      },
    ),
);
