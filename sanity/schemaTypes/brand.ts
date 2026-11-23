import { StarIcon } from "@sanity/icons/Star";
import { defineField, defineType } from "sanity";
import { imageField, orderByOrder, orderField } from "./helpers";

export const brand = defineType({
  name: "brand",
  title: "Partner brand",
  type: "document",
  icon: StarIcon,
  description: "Logos shown on the track record card and the services page.",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    imageField("logo", "Logo", { required: true, description: "A square logo works best." }),
    defineField({ name: "showOnHome", title: "Show on the home page", type: "boolean", initialValue: true }),
    defineField({
      name: "showOnServices",
      title: "Show on the services page",
      type: "boolean",
      initialValue: true,
    }),
    orderField,
  ],
  orderings: orderByOrder,
  preview: { select: { title: "name", media: "logo" } },
});
