import { aboutPage } from "./aboutPage";
import { brand } from "./brand";
import { contactPage } from "./contactPage";
import { experience } from "./experience";
import { homePage } from "./homePage";
import { legalPage } from "./legalPage";
import { receipt } from "./receipt";
import { service } from "./service";
import { servicesPage } from "./servicesPage";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";

export const schemaTypes = [
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  service,
  testimonial,
  experience,
  receipt,
  brand,
  legalPage,
];

/** Types with exactly one document, edited in place rather than created. */
export const singletonTypes = new Set(["siteSettings", "homePage", "aboutPage", "servicesPage", "contactPage"]);
