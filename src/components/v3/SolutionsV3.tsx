import Image from "next/image";
import { solutions } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { ArrowIcon } from "@/components/ui/Icons";

/** Full-bleed forest statement with Rob on the clay sun. */
export function SolutionsV3() {
  return (
    <section aria-labelledby="v3-sol-title" className="relative overflow-clip bg-pine text-bone">
      <div className="mx-auto grid max-w-[1500px] items-end gap-10 px-5 pt-24 sm:px-8 lg:grid-cols-12 lg:px-14 lg:pt-28">
        <div className="pb-0 lg:col-span-7 lg:pb-28">
          <Reveal>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-sage">{solutions.eyebrow}</p>
          </Reveal>
          <h2 id="v3-sol-title" className="mt-8 text-[clamp(3.4rem,9vw,9.5rem)] leading-[0.86]">
            <SplitWords text={solutions.titleLead} className="block" />
            <SplitWords text={solutions.titleAccent} delay={0.15} className="block italic text-clay-light" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-[1.06rem] leading-[1.9] text-bone/75">{solutions.body}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-8">
            <p className="font-display text-3xl italic text-sage-light">{solutions.closing}</p>
            <a
              href={solutions.cta.href}
              className="group inline-flex items-center gap-4 bg-clay px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-bone hover:text-forest"
            >
              {solutions.cta.label}
              <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] lg:col-span-5">
          <div aria-hidden className="absolute inset-x-[6%] bottom-[8%] aspect-square rounded-full bg-clay" />
          <div aria-hidden className="absolute inset-x-[2%] bottom-[4%] aspect-square -translate-x-[5%] rounded-full border border-sage/40" />
          <Image
            src={solutions.image.src}
            alt={solutions.image.alt}
            fill
            sizes="(min-width: 1024px) 36vw, 90vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
