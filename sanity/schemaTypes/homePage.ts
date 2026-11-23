import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, sectionIntro, stringList } from "./helpers";

const statOptions = [
  { title: "Trades completed", value: "tradesCompleted" },
  { title: "Years of experience", value: "yearsExperience" },
  { title: "Win rate", value: "winRate" },
  { title: "Community members", value: "community" },
  { title: "Brands partnered", value: "brandsPartnered" },
];

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About" },
    { name: "trackRecord", title: "Track record" },
    { name: "payouts", title: "Trading history" },
    { name: "services", title: "Services" },
    { name: "testimonials", title: "Testimonials" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: { collapsible: false },
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", description: 'The part before the underlined words, e.g. "A crypto trader that makes".' }),
        defineField({ name: "highlight", title: "Underlined words", type: "string", description: 'e.g. "you money."' }),
        defineField({ name: "text", title: "Text under the heading", type: "text", rows: 3 }),
        defineField({ name: "portfolioLabel", title: "Main button label", type: "string" }),
        defineField({ name: "resultsLabel", title: "Video button label", type: "string" }),
      ],
    }),
    defineField({
      name: "about",
      title: "About section",
      type: "object",
      group: "about",
      options: { collapsible: false },
      fields: [
        defineField({ name: "label", title: "Small label", type: "string" }),
        defineField({ name: "title", title: "Heading", type: "string", description: 'e.g. "Who is"' }),
        defineField({ name: "titleHighlight", title: "Heading (gold part)", type: "string", description: 'e.g. "Elite Ayomide?"' }),
        defineField({ name: "typewriterWord", title: "Typed word", type: "string", description: 'Typed out letter by letter after "A", e.g. "Trader."' }),
        defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
        stringList("highlights", "Checklist"),
        defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
      ],
    }),
    defineField({
      name: "trackRecord",
      title: "Track record",
      type: "object",
      group: "trackRecord",
      options: { collapsible: false },
      fields: [
        defineField({ name: "label", title: "Small label", type: "string" }),
        defineField({ name: "quote", title: "Quote", type: "string" }),
        defineField({
          name: "cards",
          title: "Number cards",
          type: "array",
          description: "Each card counts up to one of the headline numbers in Site settings.",
          of: [
            defineArrayMember({
              type: "object",
              name: "recordCard",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "stat", title: "Number to show", type: "string", options: { list: statOptions } }),
                defineField({ name: "suffix", title: "After the number", type: "string", description: 'Defaults to "+". Use "%" for the win rate.' }),
                imageField("image", "Background image"),
                defineField({ name: "showBrands", title: "Show partner brand logos", type: "boolean" }),
              ],
              preview: { select: { title: "title", subtitle: "stat", media: "image" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "payouts",
      title: "Trading history",
      type: "object",
      group: "payouts",
      description: "The receipts themselves are under “Trading receipts”.",
      options: { collapsible: false },
      fields: [
        defineField({ name: "label", title: "Small label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "text", rows: 2, description: "Each line break starts a new line." }),
        defineField({ name: "text", title: "Intro text", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services section",
      type: "object",
      group: "services",
      options: { collapsible: false },
      fields: [
        ...sectionIntro(),
        defineField({
          name: "items",
          title: "Featured services",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "featuredService",
              fields: [
                defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
                defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
                defineField({ name: "href", title: "Button link", type: "string", description: "A page like /contact or a full https:// link." }),
                defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
                imageField("image", "Image"),
              ],
              preview: { select: { title: "title", subtitle: "description", media: "image" } },
            }),
          ],
        }),
        defineField({ name: "moreLabel", title: '"More services" button label', type: "string" }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials section",
      type: "object",
      group: "testimonials",
      description: "The testimonials themselves are under “Testimonials”.",
      options: { collapsible: false },
      fields: sectionIntro(),
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      group: "faq",
      options: { collapsible: false },
      fields: [
        ...sectionIntro(),
        defineField({
          name: "items",
          title: "Questions",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "faqItem",
              fields: [
                defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "array",
                  description: "One point per line. A single point shows as plain text.",
                  of: [defineArrayMember({ type: "text", rows: 2 })],
                }),
              ],
              preview: { select: { title: "question" } },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
