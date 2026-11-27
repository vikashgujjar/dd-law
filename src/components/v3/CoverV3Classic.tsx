import Image from "next/image";
import { hero, offices, PHONE, publications } from "@/lib/content";
import { ArrowIcon } from "@/components/ui/Icons";

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/** (Previous V3 hero, kept for comparison.) Magazine cover: dateline rule, serif masthead, cover lines, partners on a clay sun. */
export function CoverV3Classic() {
  return (
    <section id="top" aria-labelledby="v3-title" className="relative overflow-clip bg-bone pt-16 text-forest lg:pt-0">
      <div className="mx-auto flex max-w-[1500px] flex-col px-5 sm:px-8 lg:min-h-[100svh] lg:px-14">
        {/* dateline */}
        <div className="intro-fade flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-forest/20 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-forest/70 lg:py-5" style={d(0.1)}>
          <span>{hero.eyebrow}</span>
          <span className="hidden sm:inline">{offices.map((o) => o.name).join(" · ")}</span>
          <a href={PHONE.href} className="transition-colors hover:text-clay">
            {PHONE.display}
          </a>
        </div>

        <div className="grid flex-1 gap-10 py-10 lg:grid-cols-12 lg:gap-8 lg:py-8">
          {/* Cover lines */}
          <div className="flex flex-col justify-between gap-10 lg:col-span-7">
            <h1 id="v3-title" className="font-display leading-[0.8] tracking-[-0.03em]">
              <span className="sr-only">
                {hero.title} — {hero.eyebrow}
              </span>
              <span aria-hidden className="block overflow-hidden pb-[0.06em]">
                <span className="intro-rise block text-[min(34vw,15rem)] lg:text-[min(17vw,36svh)]" style={d(0.15)}>
                  DD <em className="text-clay">Law</em>
                </span>
              </span>
            </h1>

            <div>
              <p className="intro-fade-up max-w-xl font-display text-[clamp(2rem,3.6vw,3.5rem)] italic leading-[1.02]" style={d(0.4)}>
                {hero.tagline}
              </p>
              <div className="intro-fade-up mt-8 flex flex-wrap items-center gap-3" style={d(0.55)}>
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
              <p className="intro-fade mt-10 max-w-xl border-t border-forest/20 pt-5 text-[0.82rem] leading-relaxed text-forest/70" style={d(0.8)}>
                <span className="mr-2 font-display text-lg italic text-clay">{hero.featuredLabel}</span>
                {publications.map((p) => p.name).join(" · ")}
              </p>
            </div>
          </div>

          {/* Portrait on a clay sun */}
          <div className="relative min-h-[420px] sm:min-h-[560px] lg:col-span-5 lg:min-h-0">
            <div className="intro-fade absolute inset-x-[4%] bottom-[6%] aspect-square rounded-full bg-clay" style={d(0.2)} />
            <div className="intro-fade absolute inset-x-[-2%] bottom-[2%] aspect-square translate-x-[6%] rounded-full border border-forest/25" style={d(0.4)} />
            <div className="absolute inset-x-[-14%] bottom-0 top-0 sm:inset-x-[-6%]">
              <div className="intro-clip relative h-full w-full" style={d(0.35)}>
                <Image src={hero.image.src} alt={hero.image.alt} fill preload sizes="(min-width: 1024px) 44vw, 110vw" className="object-contain object-bottom" />
              </div>
            </div>
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-forest/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
