import Image from "next/image";
import { FAX, footer, hero, offices, PHONE } from "@/lib/content";
import { Reveal } from "@/components/motion/primitives";
import { ArrowIcon, SocialIcon } from "@/components/ui/Icons";

export function FooterV2() {
  return (
    <footer className="relative overflow-clip bg-ivory text-navy">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
        {/* big closing link */}
        <Reveal>
          <a
            href={hero.consult.href}
            className="group flex items-center justify-between gap-6 border-b border-navy/15 pb-10"
          >
            <span className="font-serif text-[clamp(2.2rem,5.6vw,5.4rem)] italic leading-none transition-colors duration-500 group-hover:text-gold-deep">
              {hero.consult.label}
            </span>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy text-gold transition-transform duration-500 ease-lux group-hover:-rotate-45 lg:h-24 lg:w-24">
              <ArrowIcon className="h-6 w-6 lg:h-8 lg:w-8" />
            </span>
          </a>
        </Reveal>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[4fr_3fr_2.5fr_2.5fr]">
          <Reveal>
            <a href="#top" aria-label="Dhanu Dhaliwal Law Group — back to top" className="inline-block rounded-2xl bg-navy p-6">
              <Image
                src={footer.logo.src}
                alt="Dhanu Dhaliwal Law Group — Real Life Legal Solutions"
                width={footer.logo.width}
                height={footer.logo.height}
                sizes="300px"
                className="h-auto w-full max-w-[300px]"
              />
            </a>
            <ul className="mt-8 flex gap-2" aria-label="Social media">
              {footer.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${s.label}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-gold"
                  >
                    <SocialIcon name={s.label} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-gold-deep">What We Do</h2>
            <ul className="mt-6 space-y-2">
              {footer.whatWeDo.map((w) => (
                <li key={w} className="font-serif text-2xl">
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>

          {offices.map((o, i) => (
            <Reveal key={o.name} delay={0.2 + i * 0.1}>
              <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-gold-deep">{o.name}</h2>
              <address className="mt-6 space-y-2 text-[0.98rem] not-italic text-navy/80">
                <p className="font-serif text-2xl text-navy">{o.address}</p>
                <a href={PHONE.href} className="block transition-colors hover:text-gold-deep">
                  <span className="sr-only">Phone: </span>T. {PHONE.display}
                </a>
                <p>
                  <span className="sr-only">Fax: </span>F. {FAX.display}
                </p>
              </address>
            </Reveal>
          ))}
        </div>

        <div className="border-t border-navy/15 py-8 text-[0.75rem] leading-relaxed text-navy/60">
          <p className="text-sm font-semibold text-navy/80">{footer.tagline}</p>
          <div className="mt-3 space-y-1">
            {footer.legal.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
