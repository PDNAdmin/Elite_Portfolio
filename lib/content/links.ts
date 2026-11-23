import type { SiteSettings } from "./types";

// Safe to import from client components.

export const contactLinks = (s: Pick<SiteSettings, "telegram" | "whatsapp" | "email">) => ({
  telegramUrl: `https://t.me/${s.telegram}`,
  whatsappUrl: `https://wa.me/${s.whatsapp}`,
  mailtoUrl: `mailto:${s.email}`,
});

/** next/image wants width/height for remote images unless it fills its box. */
export const imageSrc = (img: { src: unknown; width?: number; height?: number }) =>
  typeof img.src === "string" && img.width && img.height
    ? { src: img.src, width: img.width, height: img.height }
    : (img.src as string);
