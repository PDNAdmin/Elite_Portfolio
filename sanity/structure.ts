import type { StructureResolver } from "sanity/structure";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(title));

// Left-hand menu of the Studio: pages first, then the lists that feed them.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "siteSettings", "Site settings"),
      S.divider(),
      singleton(S, "homePage", "Home page"),
      singleton(S, "aboutPage", "About page"),
      singleton(S, "servicesPage", "Services page"),
      singleton(S, "contactPage", "Contact page"),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("receipt").title("Trading receipts"),
      S.documentTypeListItem("brand").title("Partner brands"),
      S.divider(),
      S.documentTypeListItem("legalPage").title("Legal pages"),
    ]);
