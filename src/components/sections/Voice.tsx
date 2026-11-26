import Image from "next/image";
import { voice } from "@/lib/content";
import { Arch, Column, Rings, Scales } from "@/components/art";
import { DrawOnView, MaskReveal, Parallax, Reveal, SplitWords, Stagger, StaggerItem } from "@/components/motion/primitives";

export function Voice() {
  const { leadership } = voice;
  return (
    <section aria-labelledby="voice-title" className="grain relative overflow-hidden bg-ivory text-charcoal">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-gold-deep via-gold-light to-gold-deep" />
      <DrawOnView className="pointer-events-none absolute right-4 top-24 hidden h-[560px] w-[110px] text-gold/20 2xl:block">
        <Column className="h-full w-full" />
      </DrawOnView>

      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-24 sm:px-8 lg:px-12 lg:pb-36 lg:pt-36">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          {/* Portrait */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px]">
              <div aria-hidden className="absolute inset-x-[6%] bottom-0 top-[8%] rounded-t-full bg-linear-to-b from-navy-2 via-navy to-charcoal" />
              <DrawOnView className="absolute inset-x-[6%] bottom-0 top-[8%] text-gold/30">
                <div className="relative h-full w-full overflow-hidden rounded-t-full">
                  <Rings className="absolute left-1/2 top-[12%] w-[150%] max-w-none -translate-x-1/2" strokeWidth={0.8} />
                </div>
              </DrawOnView>
              <DrawOnView delay={0.4} className="absolute inset-x-[1%] bottom-0 top-[3%] text-gold">
                <Arch className="h-full w-full" strokeWidth={1} />
              </DrawOnView>
              {/* portrait clipped to the arch — oversized so it always fills to the base */}
              <div className="absolute inset-x-[6%] bottom-0 top-[8%] overflow-hidden rounded-t-full">
                <Parallax offset={18} className="absolute -inset-x-[3%] top-[11%]">
                  <MaskReveal from="up" duration={1.6}>
                    <Image
                      src={voice.image.src}
                      alt={voice.image.alt}
                      width={voice.image.width}
                      height={voice.image.height}
                      sizes="(min-width: 1024px) 34vw, 90vw"
                      className="h-auto w-full"
                    />
                  </MaskReveal>
                </Parallax>
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-[28%] bg-linear-to-t from-navy via-navy/70 to-transparent" />
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="relative lg:col-span-6 lg:pb-20 lg:pl-8">
            <Reveal>
              <p className="eyebrow text-gold-deep!">01 &nbsp;/&nbsp; Dhanu Dhaliwal Law Group</p>
            </Reveal>
            <h2 id="voice-title" className="mt-7 text-[clamp(2.75rem,4.7vw,5.25rem)] leading-[1] text-charcoal">
              <SplitWords text={voice.titleLead} className="block lg:whitespace-nowrap" />
              <SplitWords text={voice.titleMid} className="block" delay={0.15} />
              <SplitWords text={voice.titleAccent} className="block italic" wordClassName="text-gilded" delay={0.3} />
            </h2>
            <Stagger className="mt-10 max-w-xl space-y-6 text-[1.05rem] leading-[1.85] text-charcoal/75" delay={0.3}>
              {voice.paragraphs.map((p, i) => (
                <StaggerItem key={i}>
                  <p className={i === 1 ? "border-l border-gold pl-6" : ""}>{p}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        {/* Leadership panel */}
        <Reveal y={60} className="relative mt-16 lg:mt-0">
          <article
            aria-labelledby="leadership-title"
            className="relative isolate overflow-hidden bg-navy px-7 py-12 text-ivory shadow-[0_40px_80px_-30px_rgba(16,28,44,0.6)] sm:px-12 lg:px-16 lg:py-20"
          >
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
            <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
            <DrawOnView className="absolute -bottom-6 right-6 -z-10 w-56 text-gold/20 sm:w-72">
              <Scales className="h-auto w-full" strokeWidth={0.9} />
            </DrawOnView>
            <span aria-hidden className="absolute left-0 top-12 h-24 w-[3px] bg-gold lg:top-20" />

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <p className="eyebrow">Leadership</p>
                <h3 id="leadership-title" className="mt-6 text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.05]">
                  <SplitWords text={leadership.title} />
                </h3>
              </div>
              <Stagger className="grid gap-8 text-[0.98rem] leading-[1.85] text-ivory/70 md:grid-cols-2 lg:col-span-8" delay={0.2} gap={0.15}>
                {leadership.paragraphs.map((p, i) => (
                  <StaggerItem key={i} className={i === 2 ? "md:col-span-2" : ""}>
                    {i === 2 ? (
                      <p className="border-t border-gold/25 pt-8 font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] italic leading-snug text-ivory">{p}</p>
                    ) : (
                      <p>
                        <span className="mb-4 block font-serif text-5xl leading-none text-gold/60">{i === 0 ? "I." : "II."}</span>
                        {p}
                      </p>
                    )}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
