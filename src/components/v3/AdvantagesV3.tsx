"use client";

import { useState } from "react";
import { advantages } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { ChapterHead } from "./Chapter";

/** Chapter IV — an accordion beside a sticky oversized numeral. All copy stays in the DOM. */
export function AdvantagesV3() {
  const [open, setOpen] = useState(0);
  const total = String(advantages.items.length).padStart(2, "0");

  return (
    <section id="advantages" aria-labelledby="v3-adv-title" className="bg-bone py-24 text-forest lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
        <ChapterHead num="IV" label={advantages.tocLabel} />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-12">
              <h2 id="v3-adv-title" className="text-[clamp(2.8rem,5.4vw,5.6rem)] leading-[0.92]">
                <SplitWords text={advantages.titleLead} className="block" />
                <SplitWords text={advantages.titleAccent} delay={0.15} className="block italic text-clay" />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-md text-[1.04rem] leading-[1.85] text-forest/75">{advantages.intro}</p>
              </Reveal>
              <p aria-hidden className="mt-10 hidden font-display leading-none lg:block">
                <span key={open} className="intro-rise inline-block text-[11rem] italic text-clay">
                  {String(open + 1).padStart(2, "0")}
                </span>
                <span className="ml-3 text-3xl text-forest/40">/ {total}</span>
              </p>
            </div>
          </div>

          <ol className="border-t border-forest/20 lg:col-span-7">
            {advantages.items.map((item, i) => {
              const on = open === i;
              return (
                <li key={item.id} id={item.id} className="scroll-mt-24 border-b border-forest/20">
                  <h3 className="m-0 font-body">
                    <button
                      type="button"
                      id={`${item.id}-btn`}
                      aria-expanded={on}
                      aria-controls={`${item.id}-panel`}
                      onClick={() => setOpen(on ? -1 : i)}
                      className="group flex w-full items-center gap-5 py-7 text-left sm:gap-8 sm:py-8"
                    >
                      <span className={`font-display text-xl italic transition-colors ${on ? "text-clay" : "text-forest/40"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-[clamp(1.6rem,2.8vw,2.6rem)] leading-tight transition-transform duration-500 ease-lux group-hover:translate-x-1">
                        {item.title}
                      </span>
                      <span
                        aria-hidden
                        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                          on ? "border-clay bg-clay text-bone" : "border-forest/25"
                        }`}
                      >
                        <span className="absolute h-px w-4 bg-current" />
                        <span className={`absolute h-4 w-px bg-current transition-transform duration-500 ${on ? "scale-y-0" : ""}`} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${item.id}-panel`}
                    role="region"
                    aria-labelledby={`${item.id}-btn`}
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-lux ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-9 pl-0 text-[1.02rem] leading-[1.9] text-forest/75 sm:pl-[3.6rem]">{item.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
