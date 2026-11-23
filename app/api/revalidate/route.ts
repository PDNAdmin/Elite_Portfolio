// Sanity webhook: refreshes the site as soon as content is published.
// Without it, pages still pick up changes within about a minute.
//
// Set up in sanity.io/manage → API → Webhooks:
//   URL:     https://<your-domain>/api/revalidate
//   Trigger: Create, Update, Delete
//   Secret:  the same value as SANITY_REVALIDATE_SECRET

import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/sanity/lib/client";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  try {
    const { isValidSignature } = await parseBody(request, secret, true);
    if (!isValidSignature) {
      return Response.json({ message: "Invalid signature" }, { status: 401 });
    }
    revalidateTag(SANITY_TAG, "max");
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error("Revalidate webhook failed", error);
    return Response.json({ message: "Could not revalidate" }, { status: 500 });
  }
}
