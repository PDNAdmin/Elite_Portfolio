import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, sectionIntro, stringList, textList } from "./helpers";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: UserIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Story" },
    { name: "experience", title: "Experience" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: { collapsible: false },
      fields: [
        ...sectionIntro(),
        defineField({ name: "bookLabel", title: "Book button label", type: "string" }),
        defineField({ name: "storyLabel", title: "Story button label", type: "string" }),
        imageField("portrait", "Portrait", {
          description: "A cut-out photo (transparent background) looks best.",
        }),
      ],
    }),
    stringList("ticker", "Gold ticker words", {
      group: "hero",
      description: "The words that scroll across the gold band.",
    }),
    defineField({
      name: "story",
      title: "Story",
      type: "object",
      group: "story",
      options: { collapsible: false },
      fields: [
        defineField({ name: "label", title: "Small label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        imageField("image", "Photo"),
        defineField({ name: "caption", title: "Photo caption (name)", type: "string" }),
        defineField({ name: "subcaption", title: "Photo caption (role)", type: "string" }),
        defineField({
          name: "chapters",
          title: "Chapters",
          type: "array",
          description: "Each chapter is a tab. Four fit best.",
          of: [
            defineArrayMember({
              type: "object",
              name: "chapter",
              fields: [
                defineField({
                  name: "title",
                  title: "Tab title",
                  type: "string",
                  validation: (r) => r.required(),
                }),
                textList("paragraphs", "Paragraphs"),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "experience",
      title: "Experience section",
      type: "object",
      group: "experience",
      description: "The roles themselves are under “Experience”.",
      options: { collapsible: false },
      fields: sectionIntro(),
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
