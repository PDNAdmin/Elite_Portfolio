"use client";

import CountUp from "react-countup";
import Image from "next/image";
import Headings from "../../headings";
import SectionContainer from "../../SectionContainer";
import SectionContent from "../../SectionContent";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import type { Brand, HomePage, Img, Stats } from "@/lib/content/types";

type Props = {
  trackRecord: HomePage["trackRecord"];
  stats: Stats;
  brands: Brand[];
};

const TrackRecord = ({ trackRecord, stats, brands }: Props) => {
  const tooltipBrands = brands
    .filter((b) => b.showOnHome)
    .map((b, i) => ({ id: i + 1, name: b.name, designation: b.name, image: b.logo.src as string }));
  return (
    <SectionContainer className="relative overflow-hidden bg-black" id="track-record">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/coin.svg"
        alt=""
        loading="lazy"
        data-fx="parallax"
        data-speed="30"
        className="pointer-events-none absolute right-[3%] top-24 hidden h-32 w-32 lg:block"
      />
      <SectionContent>
        <Headings textClassName="text-white" text={trackRecord.label} />
        <div className="mt-10 flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div data-fx="stagger" className="flex flex-wrap items-center gap-x-12 gap-y-6">
            <div className="flex items-center gap-x-3">
              <span className="unbounded text-[40px] font-extrabold leading-none tracking-[-0.08em] text-[#D9D9D9] md:text-[56px]">
                {stats.tradesCompleted}+
              </span>
              <span className="satoshi max-w-[130px] text-base leading-tight text-white/55">
                Crypto Trades Completed
              </span>
            </div>
            <div className="flex items-center gap-x-3">
              <span className="unbounded text-[40px] font-extrabold leading-none tracking-[-0.08em] text-[#D9D9D9] md:text-[56px]">
                {stats.yearsExperience}+
              </span>
              <span className="satoshi max-w-[110px] text-base leading-tight text-white/55">
                Years in the industry
              </span>
            </div>
          </div>
          <p
            data-fx="words"
            className="unbounded max-w-[24ch] text-balance text-[22px] leading-[135%] tracking-[-0.05em] text-white/90 md:text-[28px]"
          >
            {trackRecord.quote}
          </p>
        </div>

        <div data-fx="stagger" className="grid gap-5 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {trackRecord.cards.map((card) => (
            <RecordCard
              key={card.title}
              title={card.title}
              value={stats[card.stat] ?? 0}
              image={card.image}
              suffix={card.suffix}
              brands={card.showBrands ? tooltipBrands : undefined}
            />
          ))}
        </div>
      </SectionContent>
    </SectionContainer>
  );
};

export default TrackRecord;

interface RecordCardProps {
  title: string;
  value: number;
  image: Img;
  suffix?: string;
  brands?: { id: number; name: string; designation: string; image: string }[];
}

function RecordCard({ title, value, image, suffix = "+", brands }: RecordCardProps) {
  return (
    <div className="group relative h-[340px] overflow-hidden rounded-[28px] border border-white/15 bg-[#1C1B20] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
      <Image
        src={image.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 600px) 50vw, 100vw"
        style={{ objectPosition: image.position }}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Scrim only behind the numbers; the rest of the photo stays visible */}
      <div className="absolute inset-x-0 top-0 h-[62%] bg-linear-to-b from-black/90 via-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent" />
      <div className="relative p-6 text-white">
        <div className="unbounded flex items-baseline gap-1 text-[38px] font-extrabold leading-none tracking-[-0.04em] lg:text-[44px]">
          <CountUp end={value} enableScrollSpy scrollSpyOnce separator="," />
          <span className="text-[#F8A308]">{suffix}</span>
        </div>
        <p className="jost mt-3 text-[20px] leading-tight text-white/75">{title}</p>
      </div>
      {brands && brands.length > 0 && (
        <div className="absolute bottom-6 left-6 flex flex-row">
          <AnimatedTooltip items={brands} />
        </div>
      )}
    </div>
  );
}
