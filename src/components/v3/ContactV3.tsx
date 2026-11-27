import { contact, offices, PHONE } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { InquiryForm } from "@/components/sections/InquiryForm";

// The shared form is styled with the gold/ivory/navy tokens; remap them to the V3 palette here.
const formTheme = {
  "--color-gold": "var(--color-clay-light)",
  "--color-ivory": "var(--color-bone)",
  "--color-navy": "var(--color-pine)",
} as React.CSSProperties;

export function ContactV3() {
  return (
    <section id="contact" aria-labelledby="v3-contact-title" className="bg-forest py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
        <div className="flex items-center gap-5 border-b border-bone/20 pb-4 text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-bone/70">
          <span className="font-display text-2xl normal-case italic tracking-normal text-clay-light">Confidential Consultation</span>
          <span className="h-px flex-1 bg-current opacity-30" />
        </div>

        <h2 id="v3-contact-title" className="mt-12 text-[clamp(3rem,7.4vw,7.6rem)] leading-[0.9] lg:mt-16">
          <SplitWords text={contact.titleLead} className="block" />
          <SplitWords text={contact.titleAccent} delay={0.2} className="block italic text-clay-light" />
        </h2>

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="dropcap text-[1.06rem] leading-[1.9] text-bone/80">{contact.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <a href={PHONE.href} className="group mt-12 flex items-center gap-5 border-y border-bone/20 py-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay transition-transform duration-500 group-hover:rotate-12">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span className="font-display text-[clamp(2.4rem,4.2vw,3.8rem)] leading-none transition-colors group-hover:text-clay-light">{PHONE.display}</span>
              </a>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-8 font-display text-xl italic leading-snug text-sage-light">{contact.note}</p>
            </Reveal>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {offices.map((o) => (
                <li key={o.name} className="flex gap-3">
                  <PinIcon className="mt-1 h-4 w-4 shrink-0 text-clay-light" />
                  <span>
                    <span className="block font-display text-2xl">{o.name}</span>
                    <span className="text-sm text-bone/65">{o.address}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1} y={40} className="lg:col-span-7">
            <div className="bg-pine p-7 sm:p-10 lg:p-14" style={formTheme}>
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
