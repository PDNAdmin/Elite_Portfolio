import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";
import { stringList } from "./helpers";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "links", title: "Links" },
    { name: "stats", title: "Headline numbers" },
  ],
  fields: [
    defineField({ name: "name", title: "Site name", type: "string", group: "general" }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 3,
      group: "general",
      description: "Shown in Google results and link previews.",
    }),
    defineField({ name: "footerTagline", title: "Footer tagline", type: "string", group: "general" }),

    defineField({ name: "email", title: "Email", type: "string", group: "contact", validation: (r) => r.email() }),
    stringList("phones", "Phone numbers", {
      group: "contact",
      description: "Include the country code, e.g. +2347042161165.",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description: "Digits only with country code, no + or spaces, e.g. 2347042161165.",
    }),
    defineField({
      name: "telegram",
      title: "Telegram username",
      type: "string",
      group: "contact",
      description: "Without the @.",
    }),

    defineField({ name: "telegramChannel", title: "Telegram channel link", type: "url", group: "links" }),
    defineField({
      name: "bookingUrl",
      title: "Booking link",
      type: "string",
      group: "links",
      description: 'Where "Book" buttons go. Use /contact, or paste a Cal.com / Calendly link.',
    }),
    defineField({ name: "academyUrl", title: "Academy link", type: "url", group: "links" }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      group: "links",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "url" }),
          ],
        }),
      ],
    }),

    defineField({
      name: "stats",
      title: "Headline numbers",
      type: "object",
      group: "stats",
      description: "Used across the home, about and services pages.",
      fields: [
        defineField({ name: "tradesCompleted", title: "Trades completed", type: "number" }),
        defineField({ name: "yearsExperience", title: "Years of experience", type: "number" }),
        defineField({ name: "winRate", title: "Win rate (%)", type: "number" }),
        defineField({ name: "community", title: "Community members", type: "number" }),
        defineField({ name: "brandsPartnered", title: "Brands partnered", type: "number" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
