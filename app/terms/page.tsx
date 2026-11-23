import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../components/LegalPage";
import { getLegalPage } from "@/lib/content";

// Edited in Sanity under "Legal pages". Starting draft: have it reviewed by a lawyer.

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("terms");
  return { title: page.title, description: page.description };
}

export default async function TermsPage() {
  const page = await getLegalPage("terms");
  return (
    <>
      <LegalPage {...page} />
      <p className="bg-black pb-16 text-center jost text-white/50">
        Read the{" "}
        <Link href="/disclaimer" className="text-[#F8A308] underline">
          Risk Disclaimer
        </Link>
        .
      </p>
    </>
  );
}
