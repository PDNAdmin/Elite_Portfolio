import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { getLegalPage } from "@/lib/content";

// Edited in Sanity under "Legal pages". Starting draft: have it reviewed by a lawyer (e.g. for NDPA / GDPR).

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("privacy");
  return { title: page.title, description: page.description };
}

export default async function PrivacyPage() {
  const page = await getLegalPage("privacy");
  return <LegalPage {...page} />;
}
