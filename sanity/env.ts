// Sanity connection details. Set these in .env.local (and in your hosting settings).
// While NEXT_PUBLIC_SANITY_PROJECT_ID is empty the site runs on the built-in
// content in lib/content/defaults.ts, so nothing breaks before Sanity is set up.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";

export const isSanityConfigured = projectId.length > 0;
