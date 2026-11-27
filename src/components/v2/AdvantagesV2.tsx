import { advantages } from "@/lib/content";
import { Arch, Column, Courthouse, Rings, Scales, Skyline } from "@/components/art";
import { Reveal, SplitWords } from "@/components/motion/primitives";

const tones = [
  { card: "bg-navy text-ivory", num: "text-gold", body: "text-ivory/70" },
  { card: "bg-gold text-navy", num: "text-navy", body: "text-navy/75" },
  { card: "bg-charcoal text-ivory", num: "text-gold", body: "text-ivory/70" },
  { card: "bg-white text-navy", num: "text-gold-deep", body: "text-navy/70" },
  { card: "bg-navy-2 text-ivory", num: "text-gold-light", body: "text-ivory/70" },
  { card: "bg-gold-light text-navy", num: "text-navy", body: "text-navy/75" },
];
const art = [Courthouse, Scales, Rings, Arch, Skyline, Column];

/** Stacking cards: each advantage slides up and settles over the last. */
export function AdvantagesV2() {
  return (
    <section id="advantages" aria-labelledby="v2-adv-title" className="relative bg-ivory pb-28 pt-28 text-navy lg:pb-40 lg:pt-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="flex items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-gold-deep">
                <span className="rounded-full border border-gold/50 px-3 py-1">03</span> {advantages.tocLabel}
              </p>
            </Reveal>
            <h2 id="v2-adv-title" className="mt-7 leading-[0.95]">
              <SplitWords text={advantages.titleLead} className="block font-sans text-[clamp(2.6rem,6vw,6rem)] font-extrabold uppercase tracking-[-0.05em]" />
              <SplitWords text={advantages.titleAccent} delay={0.15} className="block font-serif text-[clamp(2.4rem,5.4vw,5.4rem)] italic" wordClassName="text-gilded" />
            </h2>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="text-[1.05rem] leading-[1.85] text-navy/70">{advantages.intro}</p>
            {/* quick index */}
            <ol className="mt-8 flex flex-wrap gap-2">
              {advantages.items.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex rounded-full border border-navy/15 px-3.5 py-1.5 text-[0.72rem] font-semibold transition-colors hover:border-navy hover:bg-navy hover:text-ivory"
                  >
                    {String(i + 1).padStart(2, "0")} · {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <ol className="mt-16 space-y-5 lg:mt-24 lg:space-y-[12vh]">
          {advantages.items.map((item, i) => {
            const t = tones[i % tones.length];
            const Art = art[i % art.length];
            return (
              <li key={item.id} id={item.id} className="scroll-mt-28 lg:sticky" style={{ top: `calc(6.5rem + ${i * 1.4}rem)` }}>
                <article
                  className={`relative isolate grid gap-8 overflow-hidden rounded-[2rem] p-8 shadow-[0_-24px_60px_-30px_rgba(11,13,16,0.45)] sm:p-12 lg:min-h-[58vh] lg:grid-cols-12 lg:gap-10 lg:p-16 ${t.card}`}
                >
                  <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 -z-10 w-[60%] max-w-[520px] opacity-[0.12]">
                    <Art className="h-auto w-full" strokeWidth={1} />
                  </div>
                  <div className="flex items-start justify-between lg:col-span-4 lg:flex-col">
                    <span className={`font-sans text-[clamp(5rem,11vw,10rem)] font-extrabold leading-[0.8] tracking-[-0.08em] ${t.num}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] opacity-60">
                      / {String(advantages.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="lg:col-span-8 lg:pt-4">
                    <h3 className="font-serif text-[clamp(2rem,3.6vw,3.6rem)] leading-[1.02]">{item.title}</h3>
                    <span aria-hidden className="mt-6 block h-px w-24 bg-current opacity-40" />
                    <p className={`mt-6 max-w-3xl text-[1.02rem] leading-[1.9] ${t.body}`}>{item.body}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
