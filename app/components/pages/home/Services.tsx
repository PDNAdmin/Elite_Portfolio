import ExternalLinkButton from "../../ExternalLinkButton";
import Headings from "../../headings";
import RadialBlur from "../../RadialBlur";
import SectionContainer from "../../SectionContainer";
import ServiceList from "./ServicesList";
import Looper from "@/assets/svgs/Looper-3.svg";
import SectionContent from "../../SectionContent";
import type { HomePage } from "@/lib/content/types";

const Services = ({ services }: { services: HomePage["services"] }) => {
  return (
    <SectionContainer id="my-services" className="relative overflow-hidden bg-black">
      <div aria-hidden className="pointer-events-none absolute -top-10 right-0" data-fx="parallax" data-speed="20">
        <Looper />
      </div>
      <SectionContent className="relative space-y-14">
        <Headings className="bg-white" text={services.label} textClassName="text-white" />
        <div className="relative z-20 grid items-end gap-6 text-white lg:grid-cols-2 lg:gap-12">
          <h2
            data-fx="words"
            className="unbounded text-[30px] font-extrabold uppercase leading-[110%] tracking-[-0.09em] text-[#D9D9D9] lg:text-[48px]"
          >
            {services.heading}
          </h2>
          <p
            data-fx="rise"
            className="jost max-w-[44ch] text-[18px] leading-[135%] tracking-[-0.02em] text-white/75 md:text-[22px]"
          >
            {services.text}
          </p>
        </div>
        <div className="relative z-20">
          <ServiceList services={services.items} />
        </div>
        <div className="relative z-10 flex justify-center">
          <ExternalLinkButton
            text={services.moreLabel}
            href="/services"
            className="md:w-67 w-fit px-5 py-4 gap-3.75!"
            textClassName="text-base!"
          />
        </div>
        <RadialBlur blurClassName="bottom-0" className="absolute -bottom-56" />
      </SectionContent>
    </SectionContainer>
  );
};

export default Services;
