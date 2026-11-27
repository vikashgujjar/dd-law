"use client";

import Image from "next/image";
import { useState } from "react";
import { team, voice, type TeamMember } from "@/lib/content";
import { Scales } from "@/components/art";
import { DrawOnView, Reveal, SplitWords, useInViewOnce } from "@/components/motion/primitives";
import { ArrowIcon } from "@/components/ui/Icons";

const NUMERALS = ["I", "II"];
const HIGHLIGHT = ["strength,", "empathy,", "strategy", "perspective."];

/**
 * Leadership spotlight: a pill switch toggles between the two partners. Portraits
 * swap with a circular wipe and the stage auto-advances (paused on hover/focus,
 * off for reduced motion). Both bios are always in the HTML.
 */
export function LeadershipV2() {
  const { leadership } = voice;
  const partners: { member: TeamMember; bio: string }[] = [
    { member: team.members.find((m) => m.initials === "RD")!, bio: leadership.paragraphs[0] },
    { member: team.members.find((m) => m.initials === "UD")!, bio: leadership.paragraphs[1] },
  ];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stageRef, seen] = useInViewOnce<HTMLDivElement>();
  const titleWords = leadership.title.split(" ");
  const next = () => setActive((a) => (a + 1) % partners.length);

  return (
    <section aria-labelledby="v2-lead-title" className="relative overflow-clip bg-ivory py-28 text-navy lg:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header + switch */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="flex items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-gold-deep">
                <span className="h-2 w-2 rounded-full bg-gold" /> Leadership
              </p>
            </Reveal>
            <h2 id="v2-lead-title" className="mt-7 leading-[0.95]">
              <SplitWords
                text={titleWords.slice(0, 3).join(" ")}
                className="block font-sans text-[clamp(2.4rem,5.4vw,5.4rem)] font-extrabold uppercase tracking-[-0.05em]"
              />
              <SplitWords
                text={titleWords.slice(3).join(" ")}
                delay={0.15}
                className="block font-serif text-[clamp(2.6rem,5.8vw,5.8rem)] italic"
                wordClassName="text-gilded"
              />
            </h2>
          </div>

          <Reveal delay={0.2}>
            <div role="tablist" aria-label="Partners" className="relative grid w-full grid-cols-2 rounded-full bg-navy p-1.5 sm:w-[30rem]">
              <span
                aria-hidden
                className="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-gold transition-transform duration-700 ease-lux"
                style={{ transform: `translateX(${active * 100}%)` }}
              />
              {partners.map((p, i) => (
                <button
                  key={p.member.name}
                  role="tab"
                  id={`lead-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls={`lead-panel-${i}`}
                  onClick={() => setActive(i)}
                  className={`relative z-10 flex items-center justify-center gap-2 rounded-full px-3 py-3.5 text-[0.72rem] font-bold tracking-[0.04em] transition-colors duration-500 sm:text-[0.8rem] ${
                    active === i ? "text-navy" : "text-ivory/70 hover:text-ivory"
                  }`}
                >
                  <span className="font-serif text-base italic">{NUMERALS[i]}</span>
                  {p.member.name}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Stage */}
        <Reveal y={50} className="mt-14 lg:mt-20">
          <div
            ref={stageRef}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="relative isolate overflow-hidden rounded-[2.5rem] bg-navy p-4 text-ivory sm:p-6 lg:p-8"
          >
            <div aria-hidden className="absolute -right-32 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(198,161,107,0.2),transparent_65%)]" />

            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Portraits (stacked; active one wipes open) */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink sm:aspect-[5/4] lg:col-span-5 lg:aspect-auto lg:min-h-[600px]">
                {partners.map((p, i) => (
                  <div
                    key={p.member.name}
                    aria-hidden={active !== i}
                    className="absolute inset-0 transition-[clip-path] duration-[1.1s] ease-[cubic-bezier(0.77,0,0.18,1)]"
                    style={{
                      zIndex: active === i ? 2 : 1,
                      clipPath: active === i ? "circle(150% at 50% 100%)" : "circle(0% at 50% 100%)",
                    }}
                  >
                    {p.member.image && (
                      <Image
                        src={p.member.image}
                        alt={p.member.name}
                        fill
                        sizes="(min-width: 1024px) 38vw, 92vw"
                        className={`object-cover object-[50%_18%] transition-transform duration-[1.6s] ease-lux ${active === i ? "scale-100" : "scale-110"}`}
                      />
                    )}
                    <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
                  </div>
                ))}
                <span
                  aria-hidden
                  className="absolute bottom-5 left-5 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gold font-serif text-xl italic text-navy"
                >
                  {NUMERALS[active]}
                </span>
              </div>

              {/* Bios (stacked in one grid cell so the stage height never jumps) */}
              <div className="relative flex flex-col px-3 pb-3 sm:px-4 lg:col-span-7 lg:py-8 lg:pr-6">
                <div className="grid flex-1">
                  {partners.map((p, i) => (
                    <div
                      key={p.member.name}
                      role="tabpanel"
                      id={`lead-panel-${i}`}
                      aria-labelledby={`lead-tab-${i}`}
                      inert={active !== i}
                      className={`relative [grid-area:1/1] transition-[opacity,transform] duration-700 ease-lux ${
                        active === i ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-6 opacity-0"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-6 right-0 hidden select-none font-serif sm:block text-[clamp(8rem,16vw,15rem)] italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(198,161,107,0.28)]"
                      >
                        {NUMERALS[i]}
                      </span>
                      <p className="text-[0.66rem] font-bold uppercase tracking-[0.3em] text-gold">
                        Partners · {String(i + 1).padStart(2, "0")} / {String(partners.length).padStart(2, "0")}
                      </p>
                      <h3 className="relative mt-6 font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95]">{p.member.name}</h3>
                      <p className="mt-4 max-w-lg text-[0.7rem] font-bold uppercase leading-relaxed tracking-[0.22em] text-gold-light">{p.member.title}</p>
                      <span aria-hidden className="mt-8 block h-px w-24 bg-gold" />
                      <p className="mt-8 max-w-2xl text-[1.05rem] leading-[1.9] text-ivory/75">{p.bio}</p>
                      {p.member.href && (
                        <a
                          href={p.member.href}
                          className="group mt-10 inline-flex items-center gap-4 rounded-full border border-ivory/20 py-2 pl-6 pr-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-colors hover:border-gold hover:text-gold"
                        >
                          View Profile
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy transition-transform duration-500 group-hover:-rotate-45">
                            <ArrowIcon className="h-4 w-4" />
                          </span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Controls + auto-advance progress */}
                <div className="mt-12 flex items-center gap-5">
                  <div aria-hidden className="h-px flex-1 overflow-hidden bg-ivory/15">
                    <div
                      key={active}
                      className="lead-progress h-px origin-left bg-gold"
                      data-run={seen && !paused}
                      onAnimationEnd={next}
                    />
                  </div>
                  <span aria-hidden className="font-serif text-lg italic text-ivory/60">
                    <span className="text-gold">{NUMERALS[active]}</span> / {NUMERALS[partners.length - 1]}
                  </span>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next partner"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-gold hover:bg-gold hover:text-navy"
                  >
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Closing line */}
        <div className="relative mx-auto mt-24 max-w-5xl text-center lg:mt-32">
          <DrawOnView duration={3} className="mx-auto w-28 text-gold">
            <Scales className="h-auto w-full" strokeWidth={1.2} />
          </DrawOnView>
          <Reveal delay={0.2}>
            <p className="mt-8 font-serif text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.2]">
              {leadership.paragraphs[2].split(" ").map((w, i) => (
                <span key={i} className={HIGHLIGHT.includes(w) ? "italic text-gold-deep" : undefined}>
                  {w}{" "}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
