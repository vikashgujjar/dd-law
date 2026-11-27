import Image from "next/image";
import { hero, publications } from "@/lib/content";
import { Reveal } from "@/components/motion/primitives";

/** Magazine-style chapter opener: numeral · rule · label. */
export function ChapterHead({ num, label, tone = "dark" }: { num: string; label: string; tone?: "dark" | "light" }) {
  const ink = tone === "dark" ? "text-forest/70 border-forest/20" : "text-bone/70 border-bone/20";
  return (
    <Reveal y={12}>
      <div className={`flex items-center gap-5 border-b pb-4 text-[0.66rem] font-semibold uppercase tracking-[0.3em] ${ink}`}>
        <span className="font-display text-2xl normal-case italic tracking-normal text-clay">Chapter {num}</span>
        <span className="h-px flex-1 bg-current opacity-30" />
        <span>{label}</span>
      </div>
    </Reveal>
  );
}

/** Static ruled grid of outlet logos on forest. */
export function FeaturedV3() {
  return (
    <section aria-label={hero.featuredLabel} className="bg-forest text-bone">
      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-12">
        <div className="flex items-center px-5 py-8 sm:px-8 lg:col-span-3 lg:border-r lg:border-bone/15 lg:px-14">
          <p className="font-display text-3xl italic text-clay-light">{hero.featuredLabel}</p>
        </div>
        <ul className="grid grid-cols-2 border-t border-bone/15 sm:grid-cols-5 lg:col-span-9 lg:border-t-0">
          {publications.map((p, i) => (
            <li
              key={p.name}
              className={`flex h-24 items-center justify-center px-6 sm:h-28 ${i > 0 ? "border-l border-bone/15" : ""} ${i === 2 ? "max-sm:border-l-0" : ""} max-sm:border-b max-sm:border-bone/15`}
            >
              <Image src={p.src} alt={p.name} width={p.width} height={p.height} className="h-8 w-auto max-w-full object-contain opacity-90 transition-opacity hover:opacity-100" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
