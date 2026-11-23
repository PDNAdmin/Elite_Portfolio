import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";
import { imageField, orderByOrder, orderField } from "./helpers";

export const receipt = defineType({
  name: "receipt",
  title: "Trading receipt",
  type: "document",
  icon: DocumentTextIcon,
  description: "Payout certificates and trade receipts on the home page desk.",
  fieldsets: [
    {
      name: "layout",
      title: "Position on the desk (large screens)",
      description:
        "All values are percentages of the desk. Receipts later in the order sit on top of earlier ones.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    imageField("image", "Receipt image", { required: true }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "e.g. “Mubite profit share”",
      validation: (r) => r.required(),
    }),
    defineField({ name: "detail", title: "Detail", type: "string", description: "e.g. a date like “23 Mar 2026”" }),
    defineField({
      name: "amount",
      title: "Payout (USD)",
      type: "number",
      description: "Only for payouts. It adds to the total shown on the desk.",
    }),
    defineField({
      name: "result",
      title: "Trade result",
      type: "string",
      description: "For trade receipts, e.g. “+105.81%”.",
    }),
    orderField,
    defineField({ name: "left", title: "From left", type: "number", fieldset: "layout", initialValue: 0 }),
    defineField({ name: "top", title: "From top", type: "number", fieldset: "layout", initialValue: 0 }),
    defineField({ name: "width", title: "Width", type: "number", fieldset: "layout", initialValue: 40 }),
    defineField({ name: "rotation", title: "Tilt (degrees)", type: "number", fieldset: "layout", initialValue: 0 }),
  ],
  orderings: orderByOrder,
  preview: { select: { title: "label", subtitle: "detail", media: "image" } },
});
