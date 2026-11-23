import type { Metadata } from "next";
import FooterArc from "./components/FooterArc";
import SectionContainer from "./components/SectionContainer";
import FAQ from "./components/pages/home/Faq";
import HeroScene from "./components/pages/home/HeroScene";
import Services from "./components/pages/home/Services";
import Testimonials from "./components/pages/home/Testimonials";
import TrackRecord from "./components/pages/home/TrackRecord";
import PayoutDesk from "./components/pages/home/PayoutDesk";
import AboutMe from "./components/pages/home/aboutMe";
import {
  contactLinks,
  getBrands,
  getHomePage,
  getReceipts,
  getSiteSettings,
  getTestimonials,
} from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Page() {
  const [home, settings, testimonials, receipts, brands] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getTestimonials(),
    getReceipts(),
    getBrands(),
  ]);

  return (
    <SectionContainer id="home" className="">
      <HeroScene hero={home.hero} />
      <AboutMe about={home.about} />
      <TrackRecord trackRecord={home.trackRecord} stats={settings.stats} brands={brands} />
      <PayoutDesk payouts={home.payouts} receipts={receipts} />
      <Services services={home.services} />
      <Testimonials testimonials={testimonials} intro={home.testimonials} />
      <FAQ faq={home.faq} links={contactLinks(settings)} />
      <FooterArc />
    </SectionContainer>
  );
}
