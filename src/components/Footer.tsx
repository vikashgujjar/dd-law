import Image from "next/image";
import { FAX, footer, offices, PHONE } from "@/lib/content";
import { Diamond } from "./art";
import { Reveal } from "./motion/primitives";
import { FaxIcon, PhoneIcon, PinIcon, SocialIcon } from "./ui/Icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-ivory lg:pt-28">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent" />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <a href="#top" aria-label="Dhanu Dhaliwal Law Group — back to top" className="inline-block">
              <Image src={footer.logo.src} alt="Dhanu Dhaliwal Law Group — Real Life Legal Solutions" width={footer.logo.width} height={footer.logo.height} sizes="420px" className="h-auto w-full max-w-[420px]" />
            </a>
            <ul className="mt-10 flex gap-3" aria-label="Social media">
              {footer.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${s.label}`}
                    className="group relative flex h-11 w-11 items-center justify-center overflow-hidden border border-ivory/15 text-ivory/75 transition-colors duration-500 hover:border-gold hover:text-navy"
                  >
                    <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-lux group-hover:scale-y-100" />
                    <SocialIcon name={s.label} className="relative h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7">
            <Reveal delay={0.1}>
              <h2 className="font-serif text-xl italic text-gold">What We Do</h2>
              <ul className="mt-6 space-y-3">
                {footer.whatWeDo.map((w) => (
                  <li key={w} className="text-[0.98rem] text-ivory/80">
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
            {offices.map((o, i) => (
              <Reveal key={o.name} delay={0.2 + i * 0.1}>
                <h2 className="font-serif text-xl italic text-gold">{o.name}</h2>
                <address className="mt-6 space-y-4 text-[0.98rem] not-italic text-ivory/80">
                  <p className="flex items-start gap-3">
                    <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
                    {o.address}
                  </p>
                  <a href={PHONE.href} className="flex items-center gap-3 transition-colors hover:text-gold">
                    <PhoneIcon className="h-4 w-4 shrink-0 text-gold/80" />
                    <span className="sr-only">Phone: </span>
                    {PHONE.display}
                  </a>
                  <p className="flex items-center gap-3">
                    <FaxIcon className="h-4 w-4 shrink-0 text-gold/80" />
                    <span className="sr-only">Fax: </span>
                    {FAX.display}
                  </p>
                </address>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 flex items-center gap-4" aria-hidden>
          <span className="hairline flex-1" />
          <Diamond className="h-2.5 w-2.5 text-gold" />
          <span className="hairline flex-1" />
        </div>

        <div className="py-10 text-center">
          <p className="text-sm text-ivory/70">{footer.tagline}</p>
          <div className="mx-auto mt-5 max-w-4xl space-y-1 text-[0.75rem] leading-relaxed text-slate">
            {footer.legal.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
      </div>

      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap text-center font-serif text-[22vw] font-light italic leading-[0.75] text-transparent [-webkit-text-stroke:1px_rgba(198,161,107,0.14)]">
        DD LAW
      </p>
    </footer>
  );
}
