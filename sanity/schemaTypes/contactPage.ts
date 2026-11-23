import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";
import { sectionIntro } from "./helpers";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  icon: EnvelopeIcon,
  description: "Email, phone, WhatsApp and Telegram come from Site settings.",
  fields: [
    ...sectionIntro(),
    defineField({ name: "formHeading", title: "Form heading", type: "string" }),
    defineField({ name: "formText", title: "Form text", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});
