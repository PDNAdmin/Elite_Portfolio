import { CommentIcon } from "@sanity/icons/Comment";
import { defineField, defineType } from "sanity";
import { orderByOrder, orderField } from "./helpers";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "handle", title: "Handle", type: "string", description: "e.g. @jamesokafor" }),
    defineField({
      name: "rating",
      title: "Stars",
      type: "number",
      initialValue: 5,
      validation: (r) => r.min(1).max(5).integer(),
    }),
    defineField({
      name: "content",
      title: "What they said",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    orderField,
  ],
  orderings: orderByOrder,
  preview: { select: { title: "name", subtitle: "content" } },
});
