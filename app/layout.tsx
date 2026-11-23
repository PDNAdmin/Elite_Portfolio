import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { jakarta, jost, satoshi, unbounded } from "./fonts";
import Footer from "./components/Footer";
import SiteChrome from "./components/SiteChrome";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: settings.name,
      template: `%s | ${settings.name}`,
    },
    description: settings.description,
    openGraph: {
      type: "website",
      siteName: settings.name,
      title: settings.name,
      description: settings.description,
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      site: "@eliteayomide",
      creator: "@eliteayomide",
    },
  };
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        unbounded.variable,
        jost.variable,
        satoshi.variable,
        jakarta.variable,
        "font-sans",
        "fx",
      )}
    >
      <body className="min-h-full flex flex-col w-full overflow-x-hidden bg-black">
        <SiteChrome footer={<Footer />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
