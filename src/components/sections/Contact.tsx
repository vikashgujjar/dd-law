import { contact, offices, PHONE } from "@/lib/content";
import { Courthouse, Skyline } from "@/components/art";
import { DrawOnView, Reveal, SplitWords } from "@/components/motion/primitives";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { InquiryForm } from "./InquiryForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-navy py-24 lg:py-36">
      <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#0b0d10_0%,#101c2c_30%,#16263b_70%,#17191d_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_20%_40%,rgba(198,161,107,0.12),transparent_70%)]" />
      <DrawOnView duration={4} className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 text-ivory/[0.07]">
        <Skyline className="h-full w-full" />
      </DrawOnView>
      <DrawOnView duration={3.5} className="pointer-events-none absolute -left-32 top-24 -z-10 w-[720px] text-gold/[0.08]">
        <Courthouse className="h-auto w-full" />
      </DrawOnView>

      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="lg:col-span-6 lg:pr-10">
          <Reveal>
            <p className="eyebrow">Confidential Consultation</p>
          </Reveal>
          <h2 id="contact-title" className="mt-7 text-[clamp(2.9rem,6.2vw,5.75rem)] leading-[0.98]">
            <SplitWords text={contact.titleLead} className="block text-ivory" />
            <SplitWords text={contact.titleAccent} className="block italic" wordClassName="text-gilded" delay={0.25} />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl text-[1.08rem] leading-[1.9] text-ivory/75">{contact.body}</p>
          </Reveal>
          <Reveal delay={0.4} className="mt-10">
            <Button href={PHONE.href} variant="ivory" icon={<PhoneIcon className="h-4 w-4" />}>
              {PHONE.display}
            </Button>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-lg border-l border-gold/60 pl-5 text-[0.95rem] italic leading-relaxed text-ivory/65">{contact.note}</p>
          </Reveal>

          <Reveal delay={0.6} className="mt-14 grid gap-8 border-t border-ivory/10 pt-10 sm:grid-cols-2">
            {offices.map((o) => (
              <div key={o.name}>
                <p className="font-serif text-xl italic text-gold">{o.name}</p>
                <p className="mt-3 flex items-start gap-3 text-sm text-ivory/75">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
                  {o.address}
                </p>
                <a href={PHONE.href} className="mt-2 flex items-center gap-3 text-sm text-ivory/75 hover:text-gold">
                  <PhoneIcon className="h-4 w-4 text-gold/80" />
                  {PHONE.display}
                </a>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.2} y={60} className="lg:col-span-6">
          <div className="relative border border-ivory/10 bg-[#0f1a29]/70 p-7 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-12">
            <span aria-hidden className="absolute -left-px -top-px h-16 w-16 border-l border-t border-gold" />
            <span aria-hidden className="absolute -bottom-px -right-px h-16 w-16 border-b border-r border-gold" />
            <InquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
