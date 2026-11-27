"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { footer, hero, nav, offices, PHONE, publications, type NavGroup } from "@/lib/content";
import { Rings } from "@/components/art";
import { ArrowIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { RoundBadge } from "./RoundBadge";

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;
const fade = "[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]";

// Practice-area links that exist on the live site (Wills & Estates has no page of its own).
const practiceLinks = new Map(
  ((nav.find((n) => n.label === "Practice Areas") as NavGroup | undefined)?.groups[0]?.links ?? []).map((l) => [l.label, l.href]),
);

/**
 * Bento hero: the whole first screen is a grid of tiles — wordmark, partners,
 * consultation, phone — with the press logos and practice areas tucked beneath.
 */
export function HeroV2() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "10%"]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 50]);

  return (
    <section id="top" ref={ref} aria-labelledby="hero-title" className="relative isolate bg-ivory text-navy">
      <div className="mx-auto max-w-[1440px] px-3 pb-16 pt-24 sm:px-5 sm:pt-28 lg:px-8 lg:pb-24">
        {/* ---------- First screen ---------- */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:h-[calc(100svh-8rem)] lg:max-h-[880px] lg:min-h-[600px] lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_auto]">
          {/* A — wordmark */}
          <div
            className="intro-fade-up relative col-span-2 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-navy/10 bg-white p-7 sm:p-10 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:p-12"
            style={d(0.05)}
          >
            <p className="flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.32em] text-gold-deep">
              <span className="h-2 w-2 rounded-full bg-gold" />
              {hero.eyebrow}
            </p>

            <div className="mt-10 lg:mt-0">
              <h1
                id="hero-title"
                className="flex flex-wrap items-baseline gap-x-[0.16em] font-sans text-[min(22vw,8rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.07em] lg:text-[min(7.4vw,13svh)]"
              >
                <span className="sr-only">
                  {hero.title} — {hero.eyebrow}
                </span>
                <span aria-hidden className="block overflow-hidden pb-[0.05em] pr-[0.06em]">
                  <span className="intro-rise block" style={d(0.2)}>
                    DD
                  </span>
                </span>
                <span aria-hidden className="block overflow-hidden pb-[0.05em] pr-[0.06em]">
                  <span className="intro-rise block bg-linear-to-b from-gold to-gold-deep bg-clip-text text-transparent" style={d(0.32)}>
                    LAW
                  </span>
                </span>
              </h1>
              <p className="mt-5 max-w-[26rem] font-serif text-[clamp(1.7rem,2.5vw,2.6rem)] italic leading-[1.05]">{hero.tagline}</p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 lg:mt-0">
              <a
                href={hero.cta.href}
                className="group inline-flex items-center gap-4 rounded-full bg-navy py-2 pl-6 pr-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-gold hover:text-navy"
              >
                {hero.cta.label}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy transition-[transform,background-color,color] duration-500 group-hover:-rotate-45 group-hover:bg-navy group-hover:text-gold">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </a>
              <ul className="flex flex-col gap-1 text-[0.72rem] text-navy/60">
                {offices.map((o) => (
                  <li key={o.name} className="flex items-center gap-2">
                    <PinIcon className="h-3.5 w-3.5 text-gold-deep" />
                    <span className="font-semibold text-navy">{o.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* B — partners */}
          <div
            className="intro-fade relative col-span-2 h-[min(112vw,560px)] overflow-hidden rounded-[2rem] bg-linear-to-br from-gold-light via-gold to-gold-deep sm:h-[600px] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:h-auto"
            style={d(0.15)}
          >
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_35%,rgba(255,255,255,0.35),transparent_70%)]" />
            <m.div aria-hidden style={{ rotate: ringRotate }} className="absolute left-1/2 top-[4%] w-[110%] -translate-x-1/2 text-navy/15">
              <Rings className="h-auto w-full" strokeWidth={0.8} />
            </m.div>

            <m.div style={{ y: imgY }} className="absolute inset-x-[-8%] bottom-0 top-[12%] sm:inset-x-0 sm:top-[8%]">
              <div className="intro-clip relative h-full w-full" style={d(0.35)}>
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-contain object-bottom"
                />
              </div>
            </m.div>
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-gold-deep/70 to-transparent" />

            {/* name tags */}
            <span className="intro-fade-up absolute left-4 top-5 z-10 rounded-full bg-ivory/90 px-4 py-2 text-[0.7rem] font-bold tracking-[0.06em] shadow-lg shadow-navy/10 sm:left-[8%] sm:top-[34%]" style={d(1)}>
              Rob Dhanu, K.C.
            </span>
            <span className="intro-fade-up absolute right-4 top-16 z-10 rounded-full bg-navy px-4 py-2 text-[0.7rem] font-bold tracking-[0.06em] text-ivory shadow-lg shadow-navy/20 sm:right-[8%] sm:top-[40%]" style={d(1.15)}>
              Uphar K. Dhaliwal
            </span>

            <div className="intro-fade absolute right-5 top-5 z-10 hidden w-28 sm:block lg:w-32" style={d(1.3)}>
              <RoundBadge id="hero-badge" href={hero.consult.href} text={`${hero.consult.label} • ${hero.cta.label} • `} />
            </div>
          </div>

          {/* C — consultation */}
          <a
            href={hero.consult.href}
            className="intro-fade-up group relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-[2rem] bg-navy p-6 text-ivory sm:p-8 lg:col-span-3 lg:col-start-1 lg:row-start-2"
            style={d(0.3)}
          >
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-lux group-hover:scale-y-100" />
            <span className="relative flex items-start justify-between gap-4">
              <span className="font-serif text-[clamp(1.5rem,2vw,2rem)] italic leading-[1.05]">{hero.consult.label}</span>
              <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-transform duration-500 group-hover:-rotate-45 sm:flex">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </span>
            <span className="relative mt-6 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-gold">{hero.eyebrow}</span>
          </a>

          {/* D — phone */}
          <a
            href={PHONE.href}
            className="intro-fade-up group flex min-h-[170px] flex-col justify-between rounded-[2rem] bg-gold-light p-6 transition-colors duration-500 hover:bg-gold sm:p-8 lg:col-span-2 lg:col-start-4 lg:row-start-2"
            style={d(0.4)}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold transition-transform duration-500 group-hover:rotate-12">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <span className="mt-6 block font-sans text-[clamp(1.1rem,1.5vw,1.4rem)] font-extrabold tracking-[-0.02em]">{PHONE.display}</span>
          </a>
        </div>

        {/* ---------- Below the fold: press + practice areas ---------- */}
        <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-12">
          <div className="intro-fade-up flex flex-col overflow-hidden rounded-[2rem] bg-navy text-ivory lg:col-span-8" style={d(0.5)}>
            <div className="flex items-center gap-4 px-7 pt-7 sm:px-10 sm:pt-9">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <p className="font-serif text-2xl italic text-gold sm:text-3xl">{hero.featuredLabel}</p>
            </div>
            <div className={`marquee my-auto py-8 sm:py-10 ${fade}`} aria-label={hero.featuredLabel}>
              <div className="marquee-track flex w-max items-center [animation-duration:28s]">
                {[0, 1].map((k) => (
                  <ul key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">
                    {publications.map((p) => (
                      <li key={p.name} className="px-8 sm:px-12">
                        <Image
                          src={p.src}
                          alt={k === 0 ? p.name : ""}
                          width={p.width}
                          height={p.height}
                          className="h-8 w-auto max-w-[190px] object-contain sm:h-10"
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>

          <div className="intro-fade-up rounded-[2rem] border border-navy/10 bg-white p-7 sm:p-9 lg:col-span-4" style={d(0.6)}>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.32em] text-gold-deep">What We Do</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {footer.whatWeDo.map((area) => {
                const href = practiceLinks.get(area);
                const cls =
                  "inline-flex items-center gap-2 rounded-full border border-navy/15 px-4 py-2 text-[0.82rem] font-semibold transition-colors duration-300";
                return (
                  <li key={area}>
                    {href ? (
                      <a href={href} className={`${cls} hover:border-navy hover:bg-navy hover:text-ivory`}>
                        {area}
                        <ArrowIcon className="h-3 w-3 -rotate-45" />
                      </a>
                    ) : (
                      <span className={cls}>{area}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
