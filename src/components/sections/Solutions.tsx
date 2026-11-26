import Image from "next/image";
import { solutions } from "@/lib/content";
import { Column, Rings, Skyline } from "@/components/art";
import { DrawOnView, MaskReveal, Parallax, Reveal, SplitWords } from "@/components/motion/primitives";
import { Button } from "@/components/ui/Button";

export function Solutions() {
  return (
    <section aria-labelledby="solutions-title" className="relative isolate overflow-hidden bg-ink">
      {/* cinematic lighting */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(45%_70%_at_72%_45%,rgba(40,70,110,0.55),transparent_70%),radial-gradient(30%_40%_at_70%_30%,rgba(198,161,107,0.18),transparent_70%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#0b0d10_0%,transparent_20%,transparent_75%,#0b0d10_100%)]" />

      {/* ghost wordmark */}
      <Parallax offset={60} className="pointer-events-none absolute inset-x-0 top-10 -z-10 select-none">
        <p aria-hidden className="whitespace-nowrap text-center font-serif text-[28vw] font-light italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(198,161,107,0.12)]">
          DD LAW
        </p>
      </Parallax>

      <DrawOnView duration={3.5} className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 text-gold/15">
        <Skyline className="h-full w-full" />
      </DrawOnView>
      <DrawOnView delay={0.3} className="pointer-events-none absolute bottom-0 left-[4%] -z-10 hidden h-[70%] w-24 text-ivory/10 lg:block">
        <Column className="h-full w-full" />
      </DrawOnView>

      <div className="mx-auto grid max-w-[1440px] gap-6 px-5 pt-24 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pt-0">
        <div className="relative z-10 flex flex-col justify-center lg:col-span-6 lg:py-44">
          <Reveal>
            <p className="eyebrow">{solutions.eyebrow}</p>
          </Reveal>
          <h2 id="solutions-title" className="mt-7 text-[clamp(3rem,6.6vw,6.25rem)] leading-[0.95] text-ivory">
            <SplitWords text={solutions.titleLead} className="block" />
            <SplitWords text={solutions.titleAccent} className="block italic" wordClassName="text-gilded" delay={0.2} />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl text-[1.08rem] leading-[1.9] text-ivory/70">{solutions.body}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-8 font-serif text-3xl italic text-ivory">{solutions.closing}</p>
          </Reveal>
          <Reveal delay={0.55} className="mt-10">
            <Button href={solutions.cta.href}>{solutions.cta.label}</Button>
          </Reveal>
        </div>

        <div className="relative flex items-end justify-center lg:col-span-6">
          <DrawOnView duration={3} className="absolute left-1/2 top-[8%] w-[110%] max-w-[720px] -translate-x-1/2 text-gold/25">
            <div className="slow-spin">
              <Rings className="h-auto w-full" strokeWidth={0.6} />
            </div>
          </DrawOnView>
          <Parallax offset={50} className="relative w-[88%] max-w-[560px] lg:mt-24">
            <MaskReveal from="up" duration={1.8}>
              <Image
                src={solutions.image.src}
                alt={solutions.image.alt}
                width={solutions.image.width}
                height={solutions.image.height}
                sizes="(min-width: 1024px) 40vw, 85vw"
                className="h-auto w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              />
            </MaskReveal>
          </Parallax>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink to-transparent" />
        </div>
      </div>
      <div aria-hidden className="h-px bg-linear-to-r from-transparent via-gold to-transparent" />
    </section>
  );
}
