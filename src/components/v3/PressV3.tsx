import Image from "next/image";
import { press } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { ArrowIcon } from "@/components/ui/Icons";
import { ChapterHead } from "./Chapter";

/** Chapter V — newspaper columns divided by rules. */
export function PressV3() {
  return (
    <section id="press" aria-labelledby="v3-press-title" className="bg-bone-2 py-24 text-forest lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
        <ChapterHead num="V" label={press.intro} />

        <div className="mt-12 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="v3-press-title" className="text-[clamp(3rem,7vw,7rem)] leading-[0.9]">
            <SplitWords text={press.titleLead} className="mr-4 inline" />
            <SplitWords text={press.titleAccent} delay={0.15} className="inline italic text-clay" />
          </h2>
          <Reveal delay={0.2}>
            <a
              href={press.more.href}
              className="group inline-flex items-center gap-4 border border-forest/30 px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-forest hover:text-bone"
            >
              {press.more.label}
              <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 grid border-t-2 border-forest lg:mt-20 lg:grid-cols-3">
          {press.articles.map((a, i) => (
            <li key={a.href} className={`border-b border-forest/20 lg:border-b-0 ${i > 0 ? "lg:border-l lg:border-forest/20" : ""}`}>
              <Reveal delay={i * 0.1} className="h-full">
                <a href={a.href} aria-label={a.linkLabel} className="group flex h-full flex-col gap-6 py-10 lg:px-10 lg:first:pl-0">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-10 items-center bg-forest px-4">
                      <Image src={a.logo.src} alt={a.publication} width={a.logo.width} height={a.logo.height} className="h-5 w-auto" />
                    </span>
                    <span className="font-display text-sm italic text-clay">No. {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-sage-light">
                    <Image
                      src={a.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="object-cover object-top sepia-[20%] transition-[transform,filter] duration-700 ease-lux group-hover:scale-105 group-hover:sepia-0"
                    />
                  </div>
                  <h3 className="text-[clamp(1.6rem,2.2vw,2.1rem)] leading-[1.1] transition-colors group-hover:text-clay">{a.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-forest/70">{a.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-clay">
                    {a.linkLabel} <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
