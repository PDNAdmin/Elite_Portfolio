import { CaseIcon } from "@sanity/icons/Case";
import { defineField, defineType } from "sanity";
import { orderByOrder, orderField, textList } from "./helpers";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "company", title: "Company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "date", title: "Dates", type: "string", description: "e.g. “2023 - PRESENT”" }),
    textList("achievements", "Achievements"),
    orderField,
  ],
  orderings: orderByOrder,
  preview: { select: { title: "company", subtitle: "role" } },
});
