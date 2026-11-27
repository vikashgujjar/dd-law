import Image from "next/image";
import { voice } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { ChapterHead } from "./Chapter";

/** Chapter I — an editorial spread: headline, cut-out on a sage disc, two-column copy with a drop cap. */
export function VoiceV3() {
  const [lead, second] = voice.paragraphs;
  return (
    <section id="about" aria-labelledby="v3-voice-title" className="bg-bone py-24 text-forest lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
        <ChapterHead num="I" label="Dhanu Dhaliwal Law Group" />

        <h2 id="v3-voice-title" className="mt-12 text-[clamp(3rem,8vw,8.5rem)] leading-[0.9] lg:mt-16">
          <SplitWords text={`${voice.titleLead} ${voice.titleMid}`} className="block" />
          <SplitWords text={voice.titleAccent} delay={0.2} className="block italic text-clay" />
        </h2>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <figure>
              <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full bg-sage">
                <div aria-hidden className="absolute inset-[8%] rounded-full border border-forest/15" />
                <Image
                  src={voice.image.src}
                  alt={voice.image.alt}
                  width={voice.image.width}
                  height={voice.image.height}
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="absolute -bottom-[6%] left-1/2 w-[92%] max-w-none -translate-x-1/2"
                />
              </div>
              <figcaption className="mt-5 text-center text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-forest/60">{voice.image.alt}</figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <p className="dropcap gap-10 text-[1.12rem] leading-[1.85] text-forest/85 md:columns-2">{lead}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <blockquote className="mt-14 border-y border-forest/20 py-10">
                <p className="font-display text-[clamp(1.8rem,3.4vw,3rem)] italic leading-[1.12]">
                  <span aria-hidden className="mr-2 text-clay">“</span>
                  {second}
                  <span aria-hidden className="ml-1 text-clay">”</span>
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
