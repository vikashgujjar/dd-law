"use client";

import Image from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { voice } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";

/** Dark manifesto: the opening paragraph lights up word by word as it is read. */
export function ManifestoV2() {
  const litRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: litRef, offset: ["start 85%", "end 50%"] });
  const write = (v: number) => litRef.current?.style.setProperty("--p", v.toFixed(3));
  useMotionValueEvent(scrollYProgress, "change", write);
  useEffect(() => write(scrollYProgress.get()), [scrollYProgress]);

  const [lead, second] = voice.paragraphs;
  const words = lead.split(" ");

  return (
    <section id="about" aria-labelledby="v2-voice-title" className="relative isolate overflow-clip bg-ink py-28 text-ivory lg:py-40">
      <div aria-hidden className="absolute -left-40 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(32,56,90,0.7),transparent_65%)]" />

      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="flex items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-gold">
              <span className="rounded-full border border-gold/40 px-3 py-1">01</span> Dhanu Dhaliwal Law Group
            </p>
          </Reveal>

          <h2 id="v2-voice-title" className="mt-8 leading-[0.92]">
            <SplitWords
              text={voice.titleLead}
              className="block font-sans text-[clamp(2.6rem,6.6vw,6.4rem)] font-extrabold uppercase tracking-[-0.05em]"
            />
            <SplitWords
              text={voice.titleMid}
              delay={0.12}
              className="block font-sans text-[clamp(2.6rem,6.6vw,6.4rem)] font-extrabold uppercase tracking-[-0.05em] text-ivory/30"
            />
            <SplitWords
              text={voice.titleAccent}
              delay={0.24}
              className="block font-serif text-[clamp(3rem,7.6vw,7.4rem)] font-light italic"
              wordClassName="text-gilded"
            />
          </h2>

          <p className="sr-only">{lead}</p>
          <p
            ref={litRef}
            aria-hidden
            className="mt-16 text-[clamp(1.5rem,2.9vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.02em] lg:mt-24"
            style={{ "--n": words.length } as React.CSSProperties}
          >
            {words.map((w, i) => (
              <span key={i} className="lit-word" style={{ "--i": i } as React.CSSProperties}>
                {w}{" "}
              </span>
            ))}
          </p>

          <Reveal className="mt-14 lg:mt-20">
            <div className="relative overflow-hidden rounded-[2rem] border border-ivory/10 bg-ivory/[0.04] p-8 sm:p-10">
              <span aria-hidden className="absolute inset-y-8 left-0 w-1 rounded-r-full bg-gold" />
              <p className="font-serif text-[clamp(1.35rem,2.2vw,2rem)] italic leading-snug text-ivory/90">{second}</p>
            </div>
          </Reveal>
        </div>

        {/* Capsule portrait */}
        <div className="lg:col-span-4">
          <div className="mx-auto max-w-[380px] lg:sticky lg:top-28">
            <Reveal y={60}>
              <div className="relative">
                <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-full border border-gold/50" />
                <div className="relative aspect-[3/5] overflow-hidden rounded-full bg-linear-to-b from-gold-light via-gold to-gold-deep">
                  <div aria-hidden className="absolute inset-x-0 top-[12%] text-center font-sans text-[5.5rem] font-extrabold uppercase leading-none tracking-[-0.06em] text-navy/10">
                    DD
                  </div>
                  <Image
                    src={voice.image.src}
                    alt={voice.image.alt}
                    width={voice.image.width}
                    height={voice.image.height}
                    sizes="(min-width: 1024px) 380px, 80vw"
                    className="absolute -left-[6%] bottom-0 w-[112%] max-w-none"
                  />
                </div>
              </div>
              <p className="mt-8 text-center text-[0.68rem] font-bold uppercase tracking-[0.3em] text-ivory/60">{voice.image.alt}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
