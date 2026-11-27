import { contact, offices, PHONE } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { ArrowIcon, PinIcon } from "@/components/ui/Icons";
import { InquiryForm } from "@/components/sections/InquiryForm";

/** Urgent call-to-action: a full-width warning headline, the phone number set large, and the form. */
export function ContactV2() {
  return (
    <section id="contact" aria-labelledby="v2-contact-title" className="relative isolate overflow-clip bg-ink py-28 text-ivory lg:py-40">
      <div aria-hidden className="absolute -right-40 top-20 -z-10 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(198,161,107,0.14),transparent_65%)]" />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="flex items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-gold">
            <span className="rounded-full border border-gold/40 px-3 py-1">06</span> Confidential Consultation
          </p>
        </Reveal>
        <h2 id="v2-contact-title" className="mt-8 leading-[0.9]">
          <SplitWords text={contact.titleLead} className="block font-sans text-[clamp(2.6rem,8.2vw,8.6rem)] font-extrabold uppercase tracking-[-0.06em]" />
          <SplitWords text={contact.titleAccent} delay={0.2} className="block font-serif text-[clamp(2.4rem,6.6vw,6.8rem)] italic" wordClassName="text-gilded" />
        </h2>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[1.08rem] leading-[1.9] text-ivory/70">{contact.body}</p>
            </Reveal>

            <Reveal delay={0.15} className="mt-12">
              <a href={PHONE.href} className="group block rounded-[2rem] bg-gold p-8 text-navy transition-colors duration-500 hover:bg-ivory">
                <span className="flex items-center justify-between">
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.3em]">Call</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold transition-transform duration-500 group-hover:-rotate-45">
                    <ArrowIcon className="h-5 w-5" />
                  </span>
                </span>
                <span className="mt-6 block font-sans text-[clamp(2.4rem,4.6vw,4.2rem)] font-extrabold leading-none tracking-[-0.04em]">
                  {PHONE.display}
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-8 text-[0.95rem] italic leading-relaxed text-ivory/60">{contact.note}</p>
            </Reveal>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {offices.map((o, i) => (
                <Reveal as="li" key={o.name} delay={0.3 + i * 0.1} className="rounded-2xl border border-ivory/10 p-6">
                  <PinIcon className="h-5 w-5 text-gold" />
                  <p className="mt-4 font-serif text-2xl">{o.name}</p>
                  <p className="mt-1 text-sm text-ivory/60">{o.address}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1} y={50} className="lg:col-span-7">
            <div className="rounded-[2rem] border border-ivory/10 bg-navy p-7 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] sm:p-10 lg:p-14">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
