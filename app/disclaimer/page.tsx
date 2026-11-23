import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { getLegalPage } from "@/lib/content";

// Edited in Sanity under "Legal pages". Starting draft: have it reviewed by a lawyer for the countries you serve.

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("disclaimer");
  return { title: page.title, description: page.description };
}

export default async function DisclaimerPage() {
  const page = await getLegalPage("disclaimer");
  return <LegalPage {...page} />;
}
