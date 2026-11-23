import Headings from "../../headings";
import { Check } from "lucide-react";
import type { Experience, SectionIntro } from "@/lib/content/types";

const Experiences = ({ intro, experiences }: { intro: SectionIntro; experiences: Experience[] }) => {
  return (
    <section id="professional-experiences" className="relative mx-auto max-w-7xl gutter py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Headings text={intro.label} textClassName="text-white" />
          <h2
            data-fx="words"
            className="unbounded mt-6 text-balance text-[30px] font-bold leading-[105%] tracking-[-0.06em] md:text-[44px]"
          >
            {intro.heading}
          </h2>
          <p data-fx="rise" className="jost mt-5 max-w-[36ch] text-[18px] leading-[145%] text-white/65">
            {intro.text}
          </p>
        </div>

        <ol className="relative space-y-6 border-l border-white/15 pl-6 md:pl-10">
          {experiences.map((experience) => (
            <ProfessionalExperience {...experience} key={`${experience.company}-${experience.date}`} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experiences;

function ProfessionalExperience({ date, company, role, achievements }: Experience) {
  return (
    <li data-fx="rise" className="relative">
      <span
        aria-hidden
        className="absolute -left-[31px] top-8 size-3.5 rounded-full border-[3px] border-black bg-[#F8A308] ring-1 ring-[#F8A308]/60 md:-left-[47px]"
      />
      <article className="rounded-[28px] border border-white/15 bg-[#0b0a10] p-6 transition-colors duration-200 hover:border-[#F8A308]/50 md:p-8">
        <p className="jost inline-flex rounded-full border border-[#F8A308]/40 px-3 py-1 text-[13px] tracking-[0.08em] text-[#F8A308]">
          {date}
        </p>
        <h3 className="unbounded mt-4 text-[19px] font-semibold leading-[125%] tracking-[-0.04em] text-white md:text-[24px]">
          {company}
        </h3>
        {role && <p className="jost mt-1 text-[16px] text-white/55 md:text-[17px]">{role}</p>}
        <ul className="mt-6 space-y-3.5">
          {achievements.map((achievement, index) => (
            <li key={index} className="jost flex items-start gap-3 text-[16px] leading-[150%] text-white/70 md:text-[17px]">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-[#F8A308]" />
              {achievement}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
