"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero, publications } from "@/lib/content";
import { Arch, Blueprint, Courthouse, Rings, Skyline } from "@/components/art";
import { DrawOnView, Magnetic } from "@/components/motion/primitives";
import { ArrowIcon } from "@/components/ui/Icons";

type Vars = React.CSSProperties & Record<`--${string}`, string>;
const d = (s: number) => ({ "--d": `${s}s` }) as Vars;

/**
 * Intro animations are CSS keyframes (`.intro-*` in globals.css) so they run
 * straight from the server-rendered HTML — the headline paints without waiting
 * for JavaScript. Motion is only used for the scroll-linked parallax.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const titleY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  const artY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const letters = hero.title.split("");

  return (
    <section id="top" ref={ref} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy">
      {/* ---------- Atmosphere ---------- */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_75%_30%,#1d3150_0%,#101c2c_45%,#0b0f16_100%)]" />
      <div
        aria-hidden
        className="intro-fade absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_72%_42%,rgba(198,161,107,0.16),transparent_70%)]"
        style={d(0.4)}
      />
      <m.div aria-hidden style={{ y: artY }} className="pointer-events-none absolute inset-0 -z-10">
        <DrawOnView immediate delay={0.6} duration={3.2} className="absolute -left-[10%] top-[8%] w-[85%] max-w-[1100px] text-gold/[0.09] lg:left-[-4%]">
          <Courthouse className="h-auto w-full" strokeWidth={0.8} />
        </DrawOnView>
        <DrawOnView immediate delay={0.2} duration={3} className="absolute -right-[18%] -top-[12%] w-[70vw] max-w-[900px] text-ivory/[0.05]">
          <Blueprint className="h-auto w-full" />
        </DrawOnView>
      </m.div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[8%] -z-10 hidden w-px bg-linear-to-b from-transparent via-gold/20 to-transparent lg:block" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[6%] -z-10 hidden w-px bg-linear-to-b from-transparent via-ivory/10 to-transparent lg:block" />

      {/* ---------- Content ---------- */}
      <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 px-5 pt-32 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pt-0">
        {/* Copy */}
        <m.div style={{ y: titleY, opacity: fade }} className="relative z-20 flex flex-col justify-center lg:col-span-7 lg:py-40">
          <p className="eyebrow intro-fade-right" style={d(0.3)}>
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" aria-label={hero.title} className="mt-6 font-serif leading-[0.82] tracking-[-0.035em]">
            <span aria-hidden className="flex text-[clamp(5.5rem,19vw,14.5rem)] font-light lg:text-[clamp(7rem,13.2vw,14.5rem)]">
              {letters.map((ch, i) => (
                <span key={i} className="-mr-[0.22em] inline-block overflow-hidden pb-[0.06em] pr-[0.22em]">
                  <span
                    className={`intro-rise inline-block ${ch === " " ? "w-[0.28em]" : ""} ${i >= 3 ? "text-gilded italic" : "text-ivory"}`}
                    style={d(0.15 + i * 0.06)}
                  >
                    {ch === " " ? " " : ch}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <div className="intro-fade mt-6 flex items-center gap-5" style={d(0.8)}>
            <span aria-hidden className="intro-line h-px w-16 bg-gold sm:w-24" style={d(0.8)} />
            <p className="font-serif text-[clamp(1.5rem,3.2vw,2.6rem)] italic leading-tight text-ivory/90">{hero.tagline}</p>
          </div>

          <div className="intro-fade-up mt-12 flex flex-wrap items-center gap-4 sm:gap-6" style={d(1.05)}>
            <Magnetic>
              <a
                href={hero.consult.href}
                className="group relative isolate inline-flex items-center gap-4 overflow-hidden bg-gold py-[1.15rem] pl-8 pr-6 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-navy"
              >
                <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ivory transition-transform duration-500 ease-lux group-hover:scale-y-100" />
                {hero.consult.label}
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/30 transition-transform duration-500 ease-lux group-hover:rotate-[-45deg]">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </a>
            </Magnetic>
            <a href={hero.cta.href} className="link-sweep pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-ivory/85 hover:text-gold">
              {hero.cta.label}
            </a>
          </div>
        </m.div>

        {/* Portrait composition */}
        <m.div style={{ y: portraitY }} className="relative z-10 mt-12 flex items-end justify-center lg:col-span-5 lg:mt-0">
          <div className="relative w-full max-w-[620px] lg:absolute lg:bottom-0 lg:right-[-6%] lg:w-[112%] lg:max-w-[820px]">
            <DrawOnView immediate delay={0.7} duration={3} className="absolute left-1/2 top-[-6%] w-[96%] -translate-x-1/2 text-gold/40">
              <div className="slow-spin">
                <Rings className="h-auto w-full" strokeWidth={0.7} />
              </div>
            </DrawOnView>
            <DrawOnView immediate delay={0.9} duration={2.6} className="absolute bottom-0 left-[3%] h-[86%] w-[48%] text-gold/70">
              <Arch className="h-full w-full" strokeWidth={1.2} />
            </DrawOnView>
            <DrawOnView immediate delay={1.1} duration={2.6} className="absolute bottom-0 right-[2%] h-[72%] w-[50%] text-ivory/25">
              <Arch className="h-full w-full" strokeWidth={1.2} />
            </DrawOnView>
            <div aria-hidden className="absolute bottom-0 left-[3%] h-[86%] w-[48%] rounded-t-full bg-linear-to-b from-[#20385a]/70 to-transparent" />

            <div className="intro-clip relative" style={d(0.25)}>
              <div>
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={hero.image.width}
                  height={hero.image.height}
                  preload
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="relative h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-[#0d151f] to-transparent" />
          </div>
        </m.div>
      </div>

      {/* ---------- Skyline + Featured strip ---------- */}
      <DrawOnView immediate delay={1.4} duration={3.4} className="pointer-events-none absolute inset-x-0 bottom-[88px] -z-10 h-40 text-gold/15">
        <Skyline className="h-full w-full" strokeWidth={1} />
      </DrawOnView>

      <div className="intro-fade-up relative z-20 border-t border-gold/20 bg-[#0b111a]/90" style={{ ...d(1.3), "--y": "30px" } as Vars}>
        <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-5 sm:px-8 lg:px-12">
          <p className="shrink-0 border-r border-gold/20 py-7 pr-6 font-serif text-lg italic text-gold">{hero.featuredLabel}</p>
          <div className="marquee relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="marquee-track flex w-max items-center" aria-label="Publications">
              {[...publications, ...publications].map((p, i) => (
                <li key={i} aria-hidden={i >= publications.length} className="flex h-[88px] items-center px-8 sm:px-12">
                  <Image
                    src={p.src}
                    alt={i < publications.length ? p.name : ""}
                    width={p.width}
                    height={p.height}
                    className="h-auto max-h-7 w-auto opacity-75 saturate-[0.85] transition-[opacity,filter] duration-500 hover:opacity-100 hover:saturate-100"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
