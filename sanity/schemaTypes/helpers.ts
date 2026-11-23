import { defineArrayMember, defineField } from "sanity";

/** An image with a hotspot (decides how it's cropped) and alt text. */
export const imageField = (
  name: string,
  title: string,
  options: { description?: string; required?: boolean; group?: string } = {},
) =>
  defineField({
    name,
    title,
    type: "image",
    group: options.group,
    description: options.description ?? "Click the crop icon to set the focal point (what stays in view when the image is cropped).",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "Describe the image for screen readers. Leave empty if it's purely decorative.",
      }),
    ],
    validation: options.required ? (rule) => rule.required() : undefined,
  });

type Extra = { description?: string; group?: string };

export const stringList = (name: string, title: string, extra: Extra = {}) =>
  defineField({
    name,
    title,
    ...extra,
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  });

export const textList = (name: string, title: string, extra: Extra = {}) =>
  defineField({
    name,
    title,
    ...extra,
    type: "array",
    of: [defineArrayMember({ type: "text", rows: 3 })],
  });

/** Small number used to sort documents in lists (lower comes first). */
export const orderField = defineField({
  name: "order",
  title: "Order",
  type: "number",
  description: "Lower numbers show first.",
  initialValue: 10,
});

export const orderByOrder = [
  { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" as const }] },
];

/** A heading block used at the top of most sections. */
export const sectionIntro = () => [
  defineField({ name: "label", title: "Small label", type: "string", description: "The little tag above the heading." }),
  defineField({ name: "heading", title: "Heading", type: "string" }),
  defineField({ name: "text", title: "Intro text", type: "text", rows: 3 }),
];
