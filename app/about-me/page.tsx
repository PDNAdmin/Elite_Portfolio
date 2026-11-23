import Image from "next/image";
import Contributions from "../components/pages/about-me/Contributions";
import ProfileSection from "../components/pages/about-me/Owner";
import Experiences from "../components/pages/about-me/Experiences";
import FooterArc from "../components/FooterArc";
import ExternalLinkButton from "../components/ExternalLinkButton";
import Headings from "../components/headings";
import { glowGradient } from "../components/glow";
import { getAboutPage, getExperiences, getSiteSettings, imageSrc } from "@/lib/content";
import type { Stats } from "@/lib/content/types";

const statList = (stats: Stats) => [
  { value: `${stats.tradesCompleted}+`, label: "Crypto trades completed" },
  { value: `${stats.yearsExperience}`, label: "Years in the market" },
  { value: `${stats.winRate}%+`, label: "Win rate" },
  { value: `${(stats.community / 1000).toFixed(0)}K+`, label: "Community members" },
  { value: `${stats.brandsPartnered}+`, label: "Brands partnered" },
];

const Page = async () => {
  const [about, experiences, site] = await Promise.all([getAboutPage(), getExperiences(), getSiteSettings()]);
  const { hero } = about;
  const stats = statList(site.stats);
  return (
    <main className="relative overflow-clip bg-black text-white">
      {/* Hero */}
      <section className="relative isolate">
        <div
          aria-hidden
          className="absolute left-1/2 -top-[300px] -z-10 h-[1000px] w-[1300px] -translate-x-1/2 opacity-90"
          style={{ background: glowGradient }}
        />
        <div className="grain" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 gutter pt-32 md:pt-40 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-6 lg:pt-36">
          <div>
            <Headings text={hero.label} textClassName="text-white" />
            <h1
              data-fx="words"
              className="unbounded mt-6 text-balance text-[36px] font-bold leading-[102%] tracking-[-0.07em] md:text-[60px] lg:text-[72px]"
            >
              {hero.heading}
            </h1>
            <p data-fx="rise" className="jost mt-6 max-w-[46ch] text-[18px] leading-[145%] text-white/70 md:text-[22px]">
              {hero.text}
            </p>
            <div data-fx="rise" className="mt-9 flex flex-wrap gap-3">
              <ExternalLinkButton href={site.bookingUrl} text={hero.bookLabel} className="px-8 gap-3.75!" textClassName="text-base!" />
              <a
                href="#story"
                className="jakarta inline-flex h-9 items-center rounded-full border border-white/25 px-8 text-[12px] font-semibold text-white transition-colors hover:border-[#F8A308] hover:text-[#F8A308] md:h-12 md:text-base lg:h-14"
              >
                {hero.storyLabel}
              </a>
            </div>
          </div>

          {/* Portrait in a gold halo */}
          <div className="relative mx-auto w-full max-w-[460px]">
            <div
              aria-hidden
              className="absolute left-1/2 top-[44%] aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(248,163,8,0.35), rgba(248,163,8,0.08) 60%, transparent)" }}
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-[44%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F8A308]/40"
            />
            <div aria-hidden data-fx="parallax" data-speed="18" className="absolute -left-4 top-[8%] w-[34%]">
              <Image src="/abstract2g 1.png" alt="" width={324} height={276} className="h-auto w-full opacity-90" />
            </div>
            <Image
              src={imageSrc(hero.portrait)}
              alt={hero.portrait.alt ?? site.name}
              width={hero.portrait.width ?? 610}
              height={hero.portrait.height ?? 671}
              priority
              sizes="(min-width: 1024px) 460px, 90vw"
              className="relative h-auto w-full [mask-image:linear-gradient(to_top,transparent,black_16%)]"
            />
          </div>
        </div>

        {/* Headline numbers */}
        <div className="mx-auto max-w-7xl gutter pb-16 md:pb-24">
          <dl
            data-fx="stagger"
            className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-white/15 bg-white/10 sm:grid-cols-3 lg:grid-cols-5"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  "flex flex-col-reverse bg-[#060509] p-6 md:p-8 " +
                  (i === stats.length - 1 ? "col-span-2 lg:col-span-1" : "")
                }
              >
                <dt className="jost mt-2 text-[15px] text-white/60">{stat.label}</dt>
                <dd className="unbounded text-[30px] font-bold tracking-[-0.06em] text-[#F8A308] md:text-[38px]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Contributions words={about.ticker} />
      <ProfileSection story={about.story} />
      <Experiences intro={about.experience} experiences={experiences} />
      <FooterArc />
    </main>
  );
};

export default Page;
