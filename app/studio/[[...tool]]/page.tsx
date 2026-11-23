import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="jost mx-auto max-w-xl px-6 py-32 text-white">
        <h1 className="unbounded text-2xl font-bold">Sanity isn&apos;t connected yet</h1>
        <p className="mt-4 text-white/70">
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> to{" "}
          <code>.env.local</code>, then restart the dev server. See <code>SANITY.md</code> for the steps.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
