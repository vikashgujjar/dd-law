"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { solutions } from "@/lib/content";
import { Reveal } from "@/components/motion/primitives";
import { ArrowIcon } from "@/components/ui/Icons";
import { RoundBadge } from "./RoundBadge";

/** Gold statement section: two oversized lines drift in opposite directions behind Rob. */
export function SolutionsV2() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], reduce ? ["-10%", "-10%"] : ["0%", "-28%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], reduce ? ["-20%", "-20%"] : ["-34%", "-6%"]);

  const lead = `${solutions.titleLead} · `.repeat(4);
  const accent = `${solutions.titleAccent} · `.repeat(4);

  return (
    <section ref={ref} aria-labelledby="v2-sol-title" className="relative isolate overflow-clip bg-gold text-navy">
      <h2 id="v2-sol-title" className="sr-only">
        {solutions.titleLead} {solutions.titleAccent}
      </h2>

      <div className="mx-auto max-w-[1440px] px-5 pt-24 sm:px-8 lg:px-12 lg:pt-28">
        <Reveal>
          <p className="flex items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.32em]">
            <span className="rounded-full border border-navy/30 px-3 py-1">04</span> {solutions.eyebrow}
          </p>
        </Reveal>
      </div>

      <div aria-hidden className="pointer-events-none mt-10 select-none lg:mt-6">
        <m.p style={{ x: x1 }} className="whitespace-nowrap font-sans text-[16vw] font-extrabold uppercase leading-[0.85] tracking-[-0.07em]">
          {lead}
        </m.p>
        <m.p style={{ x: x2 }} className="whitespace-nowrap font-serif text-[15vw] font-light italic leading-[0.95] text-ivory">
          {accent}
        </m.p>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:-mt-[24vw] lg:px-12">
        <div className="grid items-end lg:grid-cols-12">
          <div className="hidden pb-16 lg:col-span-3 lg:block">
            <RoundBadge id="sol-badge" href={solutions.cta.href} text={`${solutions.closing} • ${solutions.cta.label} • `} className="w-40" />
          </div>

          <div className="relative mx-auto w-[min(88vw,480px)] lg:col-span-5 lg:w-full">
            <Image
              src={solutions.image.src}
              alt={solutions.image.alt}
              width={solutions.image.width}
              height={solutions.image.height}
              sizes="(min-width: 1024px) 34vw, 88vw"
              className="h-auto w-full"
            />
          </div>

          <Reveal delay={0.15} className="relative -mt-16 pb-16 lg:col-span-4 lg:mt-0 lg:pb-24">
            <div className="rounded-[2rem] bg-navy p-8 text-ivory shadow-[0_40px_80px_-30px_rgba(11,13,16,0.6)] sm:p-10">
              <p className="text-[1.02rem] leading-[1.85] text-ivory/75">{solutions.body}</p>
              <p className="mt-6 font-serif text-3xl italic text-gold">{solutions.closing}</p>
              <a
                href={solutions.cta.href}
                className="group mt-8 flex items-center justify-between rounded-full bg-gold py-2 pl-6 pr-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-navy transition-colors hover:bg-ivory"
              >
                {solutions.cta.label}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-gold transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
