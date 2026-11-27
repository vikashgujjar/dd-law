import Image from "next/image";
import { FAX, footer, offices, PHONE } from "@/lib/content";
import { SocialIcon } from "@/components/ui/Icons";

export function FooterV3() {
  return (
    <footer className="bg-bone text-forest">
      <div className="mx-auto max-w-[1500px] px-5 pt-20 sm:px-8 lg:px-14">
        <div className="grid gap-12 border-b border-forest/20 pb-14 sm:grid-cols-2 lg:grid-cols-[4fr_3fr_2.5fr_2.5fr]">
          <div>
            <a href="#top" aria-label="Dhanu Dhaliwal Law Group — back to top" className="inline-block bg-forest p-6">
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
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/25 transition-colors hover:border-clay hover:bg-clay hover:text-bone"
                  >
                    <SocialIcon name={s.label} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-body text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-clay">What We Do</h2>
            <ul className="mt-5 space-y-1">
              {footer.whatWeDo.map((w) => (
                <li key={w} className="font-display text-2xl">
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {offices.map((o) => (
            <div key={o.name}>
              <h2 className="font-body text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-clay">{o.name}</h2>
              <address className="mt-5 space-y-1 text-[0.95rem] not-italic text-forest/75">
                <p className="font-display text-2xl text-forest">{o.address}</p>
                <a href={PHONE.href} className="block hover:text-clay">
                  <span className="sr-only">Phone: </span>T. {PHONE.display}
                </a>
                <p>
                  <span className="sr-only">Fax: </span>F. {FAX.display}
                </p>
              </address>
            </div>
          ))}
        </div>

        <div className="py-8 text-[0.75rem] leading-relaxed text-forest/60">
          <p className="text-sm font-medium text-forest/80">{footer.tagline}</p>
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
