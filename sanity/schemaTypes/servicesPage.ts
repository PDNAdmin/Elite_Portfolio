import { ThListIcon } from "@sanity/icons/ThList";
import { defineArrayMember, defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  icon: ThListIcon,
  description: "The services themselves are under “Services”.",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "text", title: "Intro text", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
    defineField({ name: "stepsHeading", title: "“How to start” heading", type: "string" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "contactLabel", title: "Contact link label", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Services page" }) },
});
