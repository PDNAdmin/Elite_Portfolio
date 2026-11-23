// Copies the site's built-in content (lib/content/defaults.ts) and its images
// into Sanity, so editors start from what's live today.
//
//   npm run sanity:seed            creates documents that don't exist yet
//   npm run sanity:seed -- --force  overwrites them with the built-in content
//
// Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
// SANITY_API_WRITE_TOKEN (Editor rights) in .env.local.

import { readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
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
} from "@/lib/content/defaults";
import type { Img } from "@/lib/content/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const force = process.argv.includes("--force");

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-10-01", useCdn: false });
const root = process.cwd();

// ---------- images ----------

const uploaded = new Map<string, string>();

/** Local path for a default image: static imports carry an absolute path, others live in /public. */
function localPath(img: Img): string {
  const src = img.src as unknown;
  if (typeof src === "object" && src && "src" in src) return (src as { src: string }).src;
  return path.join(root, "public", decodeURIComponent(String(src)));
}

/** "50% 60%" → Sanity hotspot, so the crop matches what the site uses today. */
function hotspot(position?: string) {
  const match = position?.match(/^([\d.]+)%\s+([\d.]+)%$/);
  if (!match) return undefined;
  return { _type: "sanity.imageHotspot", x: Number(match[1]) / 100, y: Number(match[2]) / 100, width: 1, height: 1 };
}

async function image(img: Img | undefined) {
  if (!img) return undefined;
  const file = localPath(img);
  let assetId = uploaded.get(file);
  if (!assetId) {
    const asset = await client.assets.upload("image", readFileSync(file), { filename: path.basename(file) });
    assetId = asset._id;
    uploaded.set(file, assetId);
    console.log(`  uploaded ${path.basename(file)}`);
  }
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    ...(hotspot(img.position) ? { hotspot: hotspot(img.position) } : {}),
    ...(img.alt ? { alt: img.alt } : {}),
  };
}

// ---------- helpers ----------

let keyCount = 0;
const key = () => `k${(keyCount++).toString(36)}`;
const keyed = <T extends object>(items: T[], type?: string) =>
  items.map((item) => ({ _key: key(), ...(type ? { _type: type } : {}), ...item }));

// ---------- documents ----------

async function buildDocuments() {
  const docs: Record<string, unknown>[] = [];
  const s = defaultSettings;

  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    ...s,
    socials: keyed(s.socials, "social"),
  });

  const h = defaultHome;
  docs.push({
    _id: "homePage",
    _type: "homePage",
    hero: h.hero,
    about: h.about,
    trackRecord: {
      label: h.trackRecord.label,
      quote: h.trackRecord.quote,
      cards: keyed(
        await Promise.all(
          h.trackRecord.cards.map(async (c) => ({
            title: c.title,
            stat: c.stat,
            ...(c.suffix ? { suffix: c.suffix } : {}),
            showBrands: !!c.showBrands,
            image: await image(c.image),
          })),
        ),
        "recordCard",
      ),
    },
    payouts: h.payouts,
    services: {
      label: h.services.label,
      heading: h.services.heading,
      text: h.services.text,
      moreLabel: h.services.moreLabel,
      items: keyed(
        await Promise.all(
          h.services.items.map(async (item) => ({
            title: item.title,
            description: item.description,
            href: item.href,
            ...(item.ctaLabel ? { ctaLabel: item.ctaLabel } : {}),
            image: await image(item.image),
          })),
        ),
        "featuredService",
      ),
    },
    testimonials: h.testimonials,
    faq: {
      label: h.faq.label,
      heading: h.faq.heading,
      text: h.faq.text,
      items: keyed(h.faq.items, "faqItem"),
    },
  });

  const a = defaultAbout;
  docs.push({
    _id: "aboutPage",
    _type: "aboutPage",
    hero: {
      label: a.hero.label,
      heading: a.hero.heading,
      text: a.hero.text,
      bookLabel: a.hero.bookLabel,
      storyLabel: a.hero.storyLabel,
      portrait: await image(a.hero.portrait),
    },
    ticker: a.ticker,
    story: {
      label: a.story.label,
      heading: a.story.heading,
      caption: a.story.caption,
      subcaption: a.story.subcaption,
      image: await image(a.story.image),
      chapters: keyed(a.story.chapters, "chapter"),
    },
    experience: a.experience,
  });

  docs.push({
    _id: "servicesPage",
    _type: "servicesPage",
    ...defaultServicesPage,
    steps: keyed(defaultServicesPage.steps, "step"),
  });

  docs.push({ _id: "contactPage", _type: "contactPage", ...defaultContact });

  for (const [i, svc] of defaultServices.entries()) {
    docs.push({
      _id: `service-${svc.slug}`,
      _type: "service",
      order: (i + 1) * 10,
      label: svc.label,
      slug: { _type: "slug", current: svc.slug },
      icon: svc.icon,
      short: svc.short,
      tagline: svc.tagline,
      includes: svc.includes,
      bestFor: svc.bestFor,
      ...(svc.price ? { price: svc.price } : {}),
      cta: svc.cta,
      thumb: await image(svc.thumb),
    });
  }

  defaultTestimonials.forEach((t, i) =>
    docs.push({ _id: `testimonial-${i + 1}`, _type: "testimonial", order: (i + 1) * 10, ...t }),
  );

  defaultExperiences.forEach((e, i) =>
    docs.push({ _id: `experience-${i + 1}`, _type: "experience", order: (i + 1) * 10, ...e }),
  );

  for (const [i, r] of defaultReceipts.entries()) {
    docs.push({
      _id: `receipt-${i + 1}`,
      _type: "receipt",
      order: (i + 1) * 10,
      image: await image(r.image),
      label: r.label,
      detail: r.detail,
      ...(r.amount != null ? { amount: r.amount } : {}),
      ...(r.result ? { result: r.result } : {}),
      left: r.at.l,
      top: r.at.t,
      width: r.at.w,
      rotation: r.at.r,
    });
  }

  for (const [i, b] of defaultBrands.entries()) {
    docs.push({
      _id: `brand-${i + 1}`,
      _type: "brand",
      order: (i + 1) * 10,
      name: b.name,
      logo: await image(b.logo),
      showOnHome: b.showOnHome,
      showOnServices: b.showOnServices,
    });
  }

  for (const page of Object.values(defaultLegal)) {
    docs.push({
      _id: `legal-${page.slug}`,
      _type: "legalPage",
      ...page,
      sections: keyed(page.sections, "legalSection"),
    });
  }

  return docs;
}

async function main() {
  console.log(`Seeding ${projectId}/${dataset}${force ? " (overwriting)" : ""}…`);
  const docs = await buildDocuments();
  const tx = client.transaction();
  for (const doc of docs) {
    if (force) tx.createOrReplace(doc as { _id: string; _type: string });
    else tx.createIfNotExists(doc as { _id: string; _type: string });
  }
  await tx.commit();
  console.log(`Done: ${docs.length} documents ${force ? "written" : "created where missing"}, ${uploaded.size} images uploaded.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
