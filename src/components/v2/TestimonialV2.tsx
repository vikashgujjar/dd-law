import { testimonials } from "@/lib/content";
import { QuoteMark } from "@/components/art";
import { Reveal, SplitWords } from "@/components/motion/primitives";

/** One voice, set large. */
export function TestimonialV2() {
  const t = testimonials.items[0];
  return (
    <section aria-labelledby="v2-test-title" className="relative overflow-clip bg-ivory py-28 text-navy lg:py-40">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <h2 id="v2-test-title" className="inline-flex items-center gap-3 rounded-full border border-navy/15 px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.3em] text-gold-deep">
              {testimonials.titleLead} {testimonials.titleAccent}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <QuoteMark className="mt-14 h-16 w-20 text-gold" />
          </Reveal>

          <figure className="mt-8">
            <blockquote className="font-serif text-[clamp(2.4rem,5.6vw,5.4rem)] font-light leading-[1.04] tracking-[-0.01em]">
              <SplitWords text={t.quote} stagger={0.05} />
            </blockquote>
            <Reveal delay={0.5}>
              <figcaption className="mt-12 inline-flex items-center gap-4">
                <span aria-hidden className="h-px w-12 bg-gold" />
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy font-serif text-lg italic text-gold">{t.author}</span>
                <span aria-hidden className="h-px w-12 bg-gold" />
              </figcaption>
            </Reveal>
          </figure>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl gap-8 border-t border-navy/15 pt-12 md:grid-cols-2">
          {t.body.map((p, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <p className={i === 1 ? "font-serif text-[1.7rem] italic leading-snug text-gold-deep" : "text-[1.02rem] leading-[1.85] text-navy/70"}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
