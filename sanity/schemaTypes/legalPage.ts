import { DocumentIcon } from "@sanity/icons/Document";
import { defineArrayMember, defineField, defineType } from "sanity";
import { textList } from "./helpers";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Privacy policy (/privacy)", value: "privacy" },
          { title: "Terms and conditions (/terms)", value: "terms" },
          { title: "Risk disclaimer (/disclaimer)", value: "disclaimer" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "updated", title: "Last updated", type: "string", description: "e.g. “October 2026”" }),
    defineField({ name: "description", title: "Search description", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "legalSection",
          fields: [defineField({ name: "heading", title: "Heading", type: "string" }), textList("body", "Paragraphs")],
          preview: { select: { title: "heading" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug" } },
});
