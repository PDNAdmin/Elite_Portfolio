import { PackageIcon } from "@sanity/icons/Package";
import { defineField, defineType } from "sanity";
import { imageField, orderByOrder, orderField, stringList } from "./helpers";

export const serviceIcons = [
  { title: "Chart", value: "LineChart" },
  { title: "Graduation cap", value: "GraduationCap" },
  { title: "Wallet", value: "Wallet" },
  { title: "Clapperboard", value: "Clapperboard" },
  { title: "People", value: "Users" },
  { title: "Megaphone", value: "Megaphone" },
  { title: "Briefcase", value: "Briefcase" },
  { title: "Shield", value: "ShieldCheck" },
  { title: "Target", value: "Target" },
  { title: "Sparkles", value: "Sparkles" },
];

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({ name: "label", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Link name",
      type: "slug",
      description:
        "Used in the page link (/services#this-name). The five original services keep their custom artwork by this name.",
      options: { source: "label" },
      validation: (r) => r.required(),
    }),
    orderField,
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: serviceIcons },
      initialValue: "LineChart",
    }),
    defineField({
      name: "short",
      title: "Short line",
      type: "string",
      description: "Shown under the name in the index at the top of the page.",
    }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2 }),
    stringList("includes", "What’s included"),
    defineField({ name: "bestFor", title: "Best for", type: "string" }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "Optional, e.g. “$100 one-time”.",
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Label", type: "string" }),
        defineField({
          name: "href",
          title: "Link",
          type: "string",
          description: "A page (/contact), a full link (https://…), mailto: or tel:.",
        }),
      ],
    }),
    imageField("thumb", "Thumbnail", {
      description:
        "Shown in the index at the top of the services page, and as the artwork for new services.",
    }),
  ],
  orderings: orderByOrder,
  preview: { select: { title: "label", subtitle: "short", media: "thumb" } },
});
