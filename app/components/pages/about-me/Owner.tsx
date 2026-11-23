"use client";
import { useScramble } from "use-scramble";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Headings from "../../headings";
import type { AboutPage } from "@/lib/content/types";

export default function ProfileSection({ story }: { story: AboutPage["story"] }) {
  const tabs = story.chapters;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tabs[Math.min(activeIndex, tabs.length - 1)];

  const { ref } = useScramble({
    text: active?.paragraphs.join("\n\n") ?? "",
    speed: 1,
    step: 5,
  });

  return (
    <section id="story" className="relative mx-auto max-w-7xl scroll-mt-24 gutter py-16 md:py-24">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <figure data-fx="rise" className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[#0b0a10]">
          <Image
            src={story.image.src}
            width={story.image.width}
            height={story.image.height}
            alt={story.image.alt ?? story.caption}
            style={{ objectPosition: story.image.position }}
            className="aspect-[4/5] h-auto w-full object-cover object-top"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="unbounded text-[22px] font-bold tracking-[-0.05em] md:text-[28px]">{story.caption}</p>
            <p className="jost mt-1 text-white/65">{story.subcaption}</p>
          </figcaption>
        </figure>

        <div className="lg:pt-4">
          <Headings text={story.label} textClassName="text-white" />
          <h2
            data-fx="words"
            className="unbounded mt-6 text-balance text-[30px] font-bold leading-[105%] tracking-[-0.06em] md:text-[44px]"
          >
            {story.heading}
          </h2>

          <div
            role="tablist"
            aria-label="Story chapters"
            className="mt-8 grid grid-cols-2 gap-1 rounded-[22px] border border-white/10 bg-white/[0.03] p-1.5 sm:grid-cols-4 sm:rounded-full"
          >
            {tabs.map((chapter, i) => (
              <button
                key={chapter.title}
                role="tab"
                aria-selected={activeIndex === i}
                onClick={() => setActiveIndex(i)}
                className={`unbounded relative rounded-full px-3 py-3 text-[11px] font-semibold tracking-[0.02em] transition-colors duration-200 md:text-[12px] ${
                  activeIndex === i ? "text-black" : "text-white/55 hover:text-white"
                }`}
              >
                {activeIndex === i && (
                  <motion.span
                    layoutId="story-tab"
                    className="absolute inset-0 rounded-full bg-[#F8A308]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{chapter.title}</span>
              </button>
            ))}
          </div>

          <p
            ref={ref}
            role="tabpanel"
            className="jost mt-8 min-h-[12em] whitespace-pre-line text-[18px] leading-[155%] text-white/75 md:text-[20px]"
          />
        </div>
      </div>
    </section>
  );
}
