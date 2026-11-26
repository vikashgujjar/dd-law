import Image from "next/image";
import { press } from "@/lib/content";
import { Arch, LatticeBg, Rings } from "@/components/art";
import { DrawOnView, Reveal, SplitWords } from "@/components/motion/primitives";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";

type Article = (typeof press.articles)[number];

export function Press() {
  const [featured, ...rest] = press.articles;
  return (
    <section id="press" aria-labelledby="press-title" className="relative bg-white py-24 text-charcoal lg:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 border-b border-charcoal/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="press-title" className="text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.98]">
              <SplitWords text={press.titleLead} />{" "}
              <SplitWords text={press.titleAccent} className="italic" wordClassName="text-gilded" delay={0.25} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-charcoal/55">{press.intro}</p>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="shrink-0">
            <Button href={press.more.href} variant="ink">
              {press.more.label}
            </Button>
          </Reveal>
        </div>

        <Reveal className="mt-14" y={50}>
          <FeaturedCard article={featured} />
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((a, i) => (
            <Reveal key={a.href} y={50} delay={0.12 * (i + 1)}>
              <Card article={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- shared pieces ---------- */

function CardShell({ children, id, className = "" }: { children: React.ReactNode; id: string; className?: string }) {
  return (
    <article className={`group relative isolate h-full overflow-hidden bg-navy text-ivory ${className}`}>
      <LatticeBg id={`lat-${id}`} className="absolute inset-0 -z-10 text-ivory/[0.04]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_85%_40%,rgba(198,161,107,0.14),transparent_70%)]" />
      <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100" />
      {children}
    </article>
  );
}

function Masthead({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={article.logo.src}
        alt={article.publication}
        width={article.logo.width}
        height={article.logo.height}
        className={`logo-mono w-auto ${large ? "h-11" : "h-8"}`}
      />
      <span aria-hidden className="h-px w-10 bg-gold/40" />
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">{article.publication}</span>
    </div>
  );
}

function ReadLink({ article }: { article: Article }) {
  return (
    <span className="inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold">
      {article.linkLabel}
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
      </span>
    </span>
  );
}

/* ---------- featured: full-width split ---------- */

function FeaturedCard({ article }: { article: Article }) {
  return (
    <CardShell id="featured">
      <div className="grid lg:grid-cols-12">
        <div className="flex flex-col p-8 sm:p-12 lg:col-span-7 lg:p-16">
          <Masthead article={article} large />
          <h3 className="mt-8 max-w-2xl text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.08] lg:mt-10">
            <a href={article.href} className="after:absolute after:inset-0 after:z-20 after:content-['']">
              {article.title}
            </a>
          </h3>
          <span aria-hidden className="mt-7 block h-px w-16 bg-gold" />
          <p className="mt-7 max-w-xl text-[1rem] leading-[1.8] text-ivory/65">{article.excerpt}</p>
          <div className="mt-10 lg:mt-auto lg:pt-10">
            <ReadLink article={article} />
          </div>
        </div>

        {/* portrait stage */}
        <div className="relative h-[340px] overflow-hidden border-t border-ivory/10 bg-linear-to-b from-navy-2 to-[#0c1522] sm:h-[400px] lg:col-span-5 lg:h-auto lg:min-h-[460px] lg:border-l lg:border-t-0">
          <DrawOnView duration={3} className="absolute left-1/2 top-1/2 w-[120%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 text-gold/25">
            <Rings className="h-auto w-full" strokeWidth={0.7} />
          </DrawOnView>
          <DrawOnView delay={0.3} className="absolute bottom-0 left-1/2 h-[86%] w-[62%] max-w-[320px] -translate-x-1/2 text-gold/60">
            <Arch className="h-full w-full" strokeWidth={1.2} />
          </DrawOnView>
          <div className="absolute bottom-0 left-1/2 h-[88%] -translate-x-1/2 transition-transform duration-[1.2s] ease-lux group-hover:scale-[1.04] origin-bottom">
            <Image
              src={article.image.src}
              alt=""
              width={article.image.width}
              height={article.image.height}
              sizes="(min-width: 1024px) 24vw, 60vw"
              className="h-full w-auto max-w-none [mask-image:linear-gradient(180deg,#000_75%,transparent)]"
            />
          </div>
        </div>
      </div>
    </CardShell>
  );
}

/* ---------- secondary cards ---------- */

function Card({ article }: { article: Article }) {
  return (
    <CardShell id={article.linkLabel.replace(/\W/g, "")}>
      {/* portrait anchored bottom-right */}
      <div
        aria-hidden
        className="absolute bottom-0 right-0 -z-10 w-[30%] max-w-[200px] opacity-70 sm:w-[34%] sm:opacity-100 origin-bottom-right transition-transform duration-[1.2s] ease-lux group-hover:scale-[1.05]"
      >
        <Image
          src={article.image.src}
          alt=""
          width={article.image.width}
          height={article.image.height}
          sizes="(min-width: 768px) 16vw, 34vw"
          className="h-auto w-full opacity-90 [mask-image:linear-gradient(180deg,#000_65%,transparent)]"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/80 to-transparent" />

      <div className="flex h-full min-h-[340px] flex-col p-8 sm:p-10">
        <Masthead article={article} />
        <h3 className="mt-7 max-w-full sm:max-w-[72%] text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.12]">
          <a href={article.href} className="after:absolute after:inset-0 after:z-20 after:content-['']">
            {article.title}
          </a>
        </h3>
        <p className="mt-4 max-w-[88%] sm:max-w-[66%] text-[0.95rem] leading-[1.75] text-ivory/65">{article.excerpt}</p>
        <div className="mt-auto pt-8">
          <ReadLink article={article} />
        </div>
      </div>
    </CardShell>
  );
}
