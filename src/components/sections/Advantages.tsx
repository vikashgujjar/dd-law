"use client";

import { m, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { advantages } from "@/lib/content";
import { Blueprint, Courthouse, Diamond } from "@/components/art";
import { DrawOnView, Reveal, SplitWords } from "@/components/motion/primitives";

export function Advantages() {
  const listRef = useRef<HTMLOListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 45%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Scroll-spy: the active item is the last one whose top has passed 45% of the viewport.
  useMotionValueEvent(scrollY, "change", () => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-adv]");
    if (!items?.length) return;
    const line = window.innerHeight * 0.45;
    let idx = 0;
    items.forEach((el, i) => {
      if (el.getBoundingClientRect().top <= line) idx = i;
    });
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  return (
    <section id="advantages" aria-labelledby="adv-title" className="relative isolate overflow-clip bg-charcoal py-24 lg:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_15%_20%,rgba(32,56,90,0.6),transparent_70%),radial-gradient(40%_30%_at_90%_80%,rgba(198,161,107,0.08),transparent_70%)]" />
      <DrawOnView duration={3.5} className="pointer-events-none absolute -right-40 top-40 -z-10 w-[900px] text-ivory/[0.04]">
        <Blueprint className="h-auto w-full" />
      </DrawOnView>
      <DrawOnView duration={4} className="pointer-events-none absolute -bottom-10 -left-20 -z-10 w-[780px] text-gold/[0.07]">
        <Courthouse className="h-auto w-full" />
      </DrawOnView>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid gap-10 border-b border-ivory/10 pb-16 lg:grid-cols-12 lg:items-end lg:pb-24">
          <h2 id="adv-title" className="text-[clamp(2.8rem,6vw,5.75rem)] leading-[0.98] lg:col-span-7">
            <SplitWords text={advantages.titleLead} className="block text-ivory" />
            <SplitWords text={advantages.titleAccent} className="block italic" wordClassName="text-gilded" delay={0.2} />
          </h2>
          <Reveal delay={0.3} className="lg:col-span-5 lg:pl-10">
            <Diamond className="mb-6 h-3 w-3 text-gold" />
            <p className="text-[1.08rem] leading-[1.85] text-ivory/70">{advantages.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Sticky table of contents */}
          <aside className="lg:col-span-4">
            <nav
              aria-label={advantages.tocLabel}
              className="relative border border-ivory/10 bg-[#13161b]/80 p-7 backdrop-blur-md sm:p-9 lg:sticky lg:top-28"
            >
              {/* gold corner accents */}
              <span aria-hidden className="absolute -left-px -top-px h-10 w-10 border-l border-t border-gold" />
              <span aria-hidden className="absolute -bottom-px -right-px h-10 w-10 border-b border-r border-gold" />

              <div className="flex items-baseline justify-between gap-4">
                <p className="font-serif text-2xl italic text-gold">{advantages.tocLabel}</p>
                <p aria-hidden className="font-serif text-sm italic text-ivory/50 [font-variant-numeric:lining-nums]">
                  <span className="text-gold">{String(activeIndex + 1).padStart(2, "0")}</span> / {String(advantages.items.length).padStart(2, "0")}
                </p>
              </div>

              {/* reading progress */}
              <div aria-hidden className="mt-6 h-px w-full bg-ivory/10">
                <m.div className="h-px origin-left bg-gold" style={{ scaleX: progress }} />
              </div>

              <ol className="mt-4">
                {advantages.items.map((item, i) => {
                  const on = i === activeIndex;
                  return (
                    <li key={item.id} className="border-b border-ivory/6 last:border-b-0">
                      <a
                        href={`#${item.id}`}
                        onClick={() => setActiveIndex(i)}
                        aria-current={on ? "true" : undefined}
                        className={`group relative flex items-center gap-4 py-3.5 pl-4 transition-colors duration-500 ${
                          on ? "text-ivory" : "text-ivory/50 hover:text-ivory/85"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-gold transition-transform duration-500 ease-lux ${
                            on ? "scale-y-100" : "scale-y-0"
                          }`}
                        />
                        <span
                          className={`w-6 font-serif text-sm italic [font-variant-numeric:lining-nums] transition-colors duration-500 ${
                            on ? "text-gold" : "text-ivory/35"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-[0.95rem] tracking-wide transition-transform duration-500 ease-lux ${
                            on ? "translate-x-1" : "group-hover:translate-x-1"
                          }`}
                        >
                          {item.title}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          {/* Numbered blocks */}
          <ol ref={listRef} className="lg:col-span-8">
            {advantages.items.map((item, i) => (
              <li
                key={item.id}
                id={item.id}
                data-adv
                className="group relative grid grid-cols-[auto_1fr] gap-x-6 border-t border-ivory/10 py-12 first:border-t-0 first:pt-0 sm:gap-x-10 lg:py-16"
              >
                <Reveal y={20}>
                  <span
                    aria-hidden
                    className="font-serif text-[clamp(3.5rem,8vw,7.5rem)] font-light [font-variant-numeric:lining-nums] leading-[0.8] text-transparent [-webkit-text-stroke:1px_var(--color-gold)] transition-colors duration-700 group-hover:text-gold/15"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Reveal>
                <div>
                  <h3 className="text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.05] text-ivory">
                    <SplitWords text={item.title} />
                  </h3>
                  <Reveal delay={0.3} y={0}>
                    <span aria-hidden className="mt-6 block h-px w-20 bg-gold" />
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-6 max-w-2xl text-[1.02rem] leading-[1.9] text-ivory/65">{item.body}</p>
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
