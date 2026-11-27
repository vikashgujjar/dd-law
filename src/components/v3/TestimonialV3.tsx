import { testimonials } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";

/** A framed pull-quote, like a magazine's back page. */
export function TestimonialV3() {
  const t = testimonials.items[0];
  return (
    <section aria-labelledby="v3-test-title" className="bg-bone py-24 text-forest lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
        <div className="relative border border-forest/25 px-6 py-16 sm:px-12 lg:px-24 lg:py-24">
          <h2
            id="v3-test-title"
            className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-bone px-5 font-body text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-forest/70"
          >
            {testimonials.titleLead} {testimonials.titleAccent}
          </h2>
          <p aria-hidden className="text-center font-display text-[9rem] leading-[0.5] text-clay">“</p>
          <figure className="mt-6 text-center">
            <blockquote className="mx-auto max-w-5xl font-display text-[clamp(2.4rem,5.6vw,5.6rem)] leading-[1.02]">
              <SplitWords text={t.quote} stagger={0.05} />
            </blockquote>
            <Reveal delay={0.4}>
              <figcaption className="mt-10 font-display text-2xl italic text-clay">— {t.author}</figcaption>
            </Reveal>
          </figure>
          <div className="mx-auto mt-14 grid max-w-4xl gap-8 border-t border-forest/15 pt-10 text-left md:grid-cols-2">
            {t.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={i === 1 ? "font-display text-[1.9rem] italic leading-snug" : "text-[1.02rem] leading-[1.85] text-forest/75"}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
