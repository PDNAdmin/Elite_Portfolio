import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // The CDN is fast and cheap; pages also re-check at most once a minute.
      useCdn: true,
      perspective: "published",
    })
  : null;

/** Every Sanity request carries this tag, so one webhook call refreshes the whole site. */
export const SANITY_TAG = "sanity";

/**
 * Runs a GROQ query. Returns null when Sanity isn't configured or the request
 * fails, so callers can fall back to the built-in content.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags: [SANITY_TAG] },
    });
  } catch (error) {
    console.error("Sanity fetch failed, using built-in content instead.", error);
    return null;
  }
}
