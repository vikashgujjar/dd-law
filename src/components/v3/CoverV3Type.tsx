import Image from "next/image";
import { hero, offices, PHONE, publications, team } from "@/lib/content";
import { ArrowIcon } from "@/components/ui/Icons";

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;
const rob = team.members.find((m) => m.initials === "RD")!;
const uphar = team.members.find((m) => m.initials === "UD")!;

/** A word of the headline that rises out of its own mask. */
function Word({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <span className={`intro-rise inline-block ${className}`} style={d(delay)}>
        {children}
      </span>
    </span>
  );
}

/** A photo capsule set inline with the type; it unrolls from the centre. */
function Pill({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span aria-hidden className={`intro-pill relative mx-[0.12em] inline-block h-[0.78em] overflow-hidden rounded-full align-[-0.04em] ${className}`} style={d(delay)}>
      {children}
    </span>
  );
}

/**
 * Typographic hero: the firm's promise set huge, with the partners' portraits
 * slotted between the words as rounded capsules. A rotating seal carries the logo mark.
 */
export function CoverV3Type() {
  return (
    <section id="top" aria-labelledby="v3-title" className="relative overflow-clip bg-bone pt-16 text-forest lg:pt-0">
      <div className="mx-auto flex max-w-[1500px] flex-col px-5 sm:px-8 lg:min-h-[100svh] lg:px-14">
        {/* dateline */}
        <div
          className="intro-fade flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-forest/20 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-forest/70 lg:py-5"
          style={d(0.1)}
        >
          <span>{hero.eyebrow}</span>
          <span className="hidden sm:inline">{offices.map((o) => o.name).join(" · ")}</span>
          <a href={PHONE.href} className="transition-colors hover:text-clay">
            {PHONE.display}
          </a>
        </div>

        {/* Headline with inline portraits */}
        <div className="flex flex-1 items-center py-12 lg:py-10">
          <h1 id="v3-title" className="font-display text-[clamp(3.1rem,9.4vw,11rem)] leading-[1.02] tracking-[-0.02em]">
            <span className="sr-only">
              {hero.title} — {hero.tagline}
            </span>
            <span aria-hidden>
              <Word delay={0.15}>Understanding</Word>
              <Pill delay={0.55} className="w-[1.5em] bg-sage">
                {rob.image && <Image src={rob.image} alt="" fill preload sizes="200px" className="object-cover object-[50%_22%]" />}
              </Pill>{" "}
              <Word delay={0.25}>You</Word> <Word delay={0.32}>is</Word>{" "}
              <Pill delay={0.7} className="w-[2.3em] bg-clay">
                <Image src={hero.image.src} alt="" fill preload sizes="320px" className="object-cover object-[50%_14%]" />
              </Pill>{" "}
              <Word delay={0.4}>Our</Word>{" "}
              <Word delay={0.48} className="italic text-clay">
                Advantage
              </Word>
              <Pill delay={0.85} className="w-[1.5em] bg-sage-light">
                {uphar.image && <Image src={uphar.image} alt="" fill sizes="200px" className="object-cover object-[50%_20%]" />}
              </Pill>
            </span>
          </h1>
        </div>

        {/* Footer strip: actions · press · seal */}
        <div className="intro-fade-up grid gap-8 border-t border-forest/20 py-8 lg:grid-cols-12 lg:items-center lg:gap-10" style={d(0.9)}>
          <div className="flex flex-wrap items-center gap-3 lg:col-span-5">
            <a
              href={hero.consult.href}
              className="group inline-flex items-center gap-4 bg-forest px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-clay"
            >
              {hero.consult.label}
              <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a
              href={hero.cta.href}
              className="inline-flex items-center gap-3 border border-forest/30 px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-forest hover:bg-forest hover:text-bone"
            >
              {hero.cta.label}
            </a>
          </div>

          <p className="text-[0.82rem] leading-relaxed text-forest/70 lg:col-span-5">
            <span className="mr-2 font-display text-xl italic text-clay">{hero.featuredLabel}</span>
            {publications.map((p) => p.name).join(" · ")}
          </p>

          <div className="hidden justify-end lg:col-span-2 lg:flex">
            <a href={hero.consult.href} aria-label={hero.consult.label} className="group relative block h-32 w-32 rounded-full bg-forest text-bone xl:h-36 xl:w-36">
              <svg viewBox="0 0 200 200" aria-hidden className="spin-20 absolute inset-0 h-full w-full">
                <defs>
                  <path id="v3-seal" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
                </defs>
                <text className="fill-current text-[13px] font-semibold uppercase" letterSpacing="3">
                  <textPath href="#v3-seal" textLength="470" lengthAdjust="spacing">
                    {`${hero.title} • ${hero.eyebrow} • `}
                  </textPath>
                </text>
              </svg>
              <span className="absolute inset-[30%] transition-transform duration-500 group-hover:scale-110">
                <Image src="/images/logo-mark-gold.png" alt="" fill sizes="56px" className="object-contain" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
