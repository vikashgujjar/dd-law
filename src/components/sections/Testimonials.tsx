import { testimonials } from "@/lib/content";
import { Diamond, QuoteMark, Rings } from "@/components/art";
import { DrawOnView, Reveal, SplitWords } from "@/components/motion/primitives";

export function Testimonials() {
  const t = testimonials.items[0];
  return (
    <section aria-labelledby="testimonials-title" className="grain relative overflow-hidden bg-ivory py-24 text-charcoal lg:py-40">
      <DrawOnView duration={3.5} className="pointer-events-none absolute left-1/2 top-1/2 w-[1100px] -translate-x-1/2 -translate-y-1/2 text-gold/25">
        <Rings className="h-auto w-full" strokeWidth={0.5} />
      </DrawOnView>

      <div className="relative mx-auto max-w-[1100px] px-5 text-center sm:px-8">
        <Reveal className="flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold-deep/60" />
          <Diamond className="h-2.5 w-2.5 text-gold-deep" />
          <span className="h-px w-12 bg-gold-deep/60" />
        </Reveal>
        <h2 id="testimonials-title" className="mt-8 text-[clamp(2.4rem,4.6vw,4.25rem)] leading-tight">
          <SplitWords text={testimonials.titleLead} />{" "}
          <SplitWords text={testimonials.titleAccent} className="italic" wordClassName="text-gilded" delay={0.25} />
        </h2>

        <figure className="relative mt-16 lg:mt-24">
          <Reveal y={20}>
            <QuoteMark className="mx-auto h-14 w-auto lg:h-20" />
          </Reveal>
          <blockquote className="mt-10">
            <p className="font-serif text-[clamp(2rem,4.8vw,4.4rem)] font-light italic leading-[1.1] text-charcoal">
              <SplitWords text={`“${t.quote}”`} stagger={0.045} />
            </p>
            <Reveal delay={0.4} className="mx-auto mt-12 max-w-3xl space-y-3 text-[1.08rem] leading-[1.9] text-charcoal/70">
              {t.body.map((b, i) => (
                <p key={i} className={i === t.body.length - 1 ? "font-medium text-charcoal" : ""}>
                  {b}
                </p>
              ))}
            </Reveal>
          </blockquote>
          <Reveal delay={0.6}>
            <figcaption className="mt-12 inline-flex items-center gap-5 font-serif text-2xl text-charcoal">
              <span className="h-px w-14 bg-gold" />— {t.author}
              <span className="h-px w-14 bg-gold" />
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  );
}