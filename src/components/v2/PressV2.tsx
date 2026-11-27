"use client";

import Image from "next/image";
import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { press } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { ArrowIcon } from "@/components/ui/Icons";

/** Editorial index: rows fill gold on hover while the story's image trails the cursor. */
export function PressV2() {
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.5 });

  return (
    <section id="press" aria-labelledby="v2-press-title" className="relative bg-navy py-28 text-ivory lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="flex items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-gold">
                <span className="rounded-full border border-gold/40 px-3 py-1">05</span> {press.intro}
              </p>
            </Reveal>
            <h2 id="v2-press-title" className="mt-7 flex flex-wrap items-baseline gap-x-5 leading-[0.95]">
              <SplitWords text={press.titleLead} className="font-sans text-[clamp(2.6rem,6.4vw,6.4rem)] font-extrabold uppercase tracking-[-0.05em]" />
              <SplitWords text={press.titleAccent} delay={0.15} className="font-serif text-[clamp(3rem,7vw,7rem)] italic" wordClassName="text-gilded" />
            </h2>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:text-right">
            <a
              href={press.more.href}
              className="group inline-flex items-center gap-4 rounded-full border border-ivory/20 py-2 pl-6 pr-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-colors hover:border-gold hover:text-gold"
            >
              {press.more.label}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-navy transition-transform duration-500 group-hover:-rotate-45">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        </div>

        <ul
          className="mt-16 border-b border-ivory/15 lg:mt-24"
          onPointerMove={(e) => {
            mx.set(e.clientX);
            my.set(e.clientY);
          }}
          onPointerLeave={() => setActive(null)}
        >
          {press.articles.map((a, i) => (
            <li key={a.href} className="border-t border-ivory/15">
              <a
                href={a.href}
                aria-label={a.linkLabel}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(null)}
                className="group relative isolate grid grid-cols-[88px_1fr] items-center gap-x-6 gap-y-4 py-8 transition-colors duration-500 hover:text-navy sm:px-4 lg:grid-cols-[180px_1fr_300px_56px] lg:gap-x-10 lg:px-6 lg:py-10"
              >
                <span aria-hidden className="absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-2xl bg-gold transition-transform duration-500 ease-lux group-hover:scale-y-100" />
                {/* mobile thumbnail */}
                <span className="relative row-span-2 block aspect-[3/4] overflow-hidden rounded-xl bg-ivory lg:hidden">
                  <Image src={a.image.src} alt="" fill sizes="88px" className="object-cover object-top" />
                </span>
                <span className="flex items-center gap-3 lg:row-span-1">
                  <span className="flex h-11 items-center rounded-full bg-navy-2 px-4 transition-colors duration-500 group-hover:bg-navy">
                    <Image src={a.logo.src} alt={a.publication} width={a.logo.width} height={a.logo.height} className="h-6 w-auto" />
                  </span>
                </span>
                <span className="font-serif text-[clamp(1.35rem,2.3vw,2.2rem)] leading-[1.12] transition-transform duration-500 ease-lux lg:group-hover:translate-x-3">
                  {a.title}
                </span>
                <span className="col-span-2 text-[0.92rem] leading-relaxed text-ivory/60 transition-colors duration-500 group-hover:text-navy/75 lg:col-span-1">
                  {a.excerpt}
                </span>
                <span className="hidden h-14 w-14 items-center justify-center rounded-full border border-ivory/25 transition-[transform,background-color,border-color,color] duration-500 group-hover:-rotate-45 group-hover:border-navy group-hover:bg-navy group-hover:text-gold lg:flex">
                  <ArrowIcon className="h-5 w-5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* cursor-trailing preview (desktop pointers only) */}
      <m.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-30 hidden [@media(hover:hover)]:lg:block">
        <AnimatePresence>
          {active !== null && (
            <m.div
              key={active}
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-28 -top-40 h-80 w-56 overflow-hidden rounded-2xl bg-ivory shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
            >
              <Image src={press.articles[active].image.src} alt="" fill sizes="224px" className="object-cover object-top" />
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </section>
  );
}
