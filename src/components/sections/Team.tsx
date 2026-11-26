"use client";

import Image from "next/image";
import { useState } from "react";
import { team, type TeamMember } from "@/lib/content";
import { LatticeBg, Scales } from "@/components/art";
import { Reveal, SplitWords, useInViewOnce } from "@/components/motion/primitives";
import { ArrowIcon } from "@/components/ui/Icons";

export function Team() {
  const [active, setActive] = useState(0);
  const [galleryRef, galleryIn] = useInViewOnce<HTMLUListElement>();

  return (
    <section id="team" aria-labelledby="team-title" className="relative isolate overflow-hidden bg-navy py-24 lg:py-36">
      <LatticeBg id="team-lattice" className="absolute inset-0 -z-10 text-ivory/[0.035]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(198,161,107,0.12),transparent_70%)]" />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">{team.eyebrow}</p>
            </Reveal>
            <h2 id="team-title" className="mt-7 text-[clamp(3rem,6.4vw,6rem)] leading-[0.95]">
              <SplitWords text={team.titleLead} className="block" />
              <SplitWords text={team.titleAccent} className="block italic" wordClassName="text-gilded" delay={0.2} />
            </h2>
          </div>
          <div className="space-y-5 text-[1.02rem] leading-[1.85] text-ivory/70 lg:col-span-6 lg:pl-10">
            {team.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.12}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="mt-16 flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.3em] text-slate lg:mt-24">
          <span className="font-serif text-2xl normal-case italic tracking-normal text-gold">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-16 bg-gold/40" />
          <span>{String(team.members.length).padStart(2, "0")}</span>
          <span className="ml-auto hidden lg:inline">Hover to explore the team</span>
          <span className="ml-auto lg:hidden">Swipe to explore</span>
        </Reveal>
      </div>

      {/* Desktop: expanding gallery */}
      <div className="mx-auto mt-8 hidden max-w-[1440px] px-12 lg:block">
        <ul ref={galleryRef} data-inview={galleryIn} className="flex h-[640px] gap-3">
          {team.members.map((member, i) => (
            <li
              key={member.name}
              className={`relative min-w-0 transition-[flex-grow,clip-path,transform,opacity] ease-lux ${
                galleryIn ? "translate-y-0 opacity-100 [clip-path:inset(0_0_0_0)]" : "translate-y-14 opacity-0 [clip-path:inset(100%_0_0_0)]"
              }`}
              style={{
                flexGrow: active === i ? 3.4 : 1,
                flexBasis: 0,
                transitionDuration: "0.7s, 1.2s, 1.2s, 1.2s",
                transitionDelay: `0s, ${i * 0.09}s, ${i * 0.09}s, ${i * 0.09}s`,
              }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <Panel member={member} index={i} expanded={active === i} />
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile / tablet: snap carousel */}
      <ul
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const el = e.currentTarget;
          const card = el.firstElementChild as HTMLElement | null;
          if (card) setActive(Math.min(team.members.length - 1, Math.round(el.scrollLeft / (card.offsetWidth + 16))));
        }}
      >
        {team.members.map((m, i) => (
          <li key={m.name} className="relative h-[500px] w-[78vw] max-w-[360px] shrink-0 snap-start">
            <Panel member={m} index={i} expanded />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Panel({ member, index, expanded }: { member: TeamMember; index: number; expanded: boolean }) {
  const Wrapper = member.href ? "a" : "div";
  return (
    <Wrapper
      {...(member.href ? { href: member.href } : { tabIndex: 0 })}
      className="group relative block h-full w-full overflow-hidden bg-charcoal outline-offset-4"
      aria-label={`${member.name} — ${member.title}`}
    >
      {member.image ? (
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 40vw, 80vw"
          className={`object-cover object-[50%_18%] transition-[transform,filter] duration-[1.2s] ease-lux group-hover:scale-[1.04] ${
            expanded ? "grayscale-0" : "grayscale-[70%] brightness-75"
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-b from-navy-2 to-charcoal">
          <Scales className="absolute w-3/4 max-w-[280px] text-gold/15" strokeWidth={0.8} />
          <span className="relative font-serif text-[7rem] italic leading-none text-gilded">{member.initials}</span>
        </div>
      )}

      {/* scrims + frame */}
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-[#0b0f16] via-[#0b0f16]/20 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-3 border border-gold/0 transition-colors duration-700 group-hover:border-gold/40" />
      <span aria-hidden className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100" />

      {/* index */}
      <span aria-hidden className="absolute left-5 top-5 font-serif text-sm italic text-gold">{String(index + 1).padStart(2, "0")}</span>

      {/* collapsed vertical name (desktop) */}
      <span
        aria-hidden
        className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-serif text-2xl text-ivory/90 transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180 lg:block ${
          expanded ? "opacity-0" : "opacity-100 delay-300"
        }`}
      >
        {member.name}
      </span>

      {/* expanded caption */}
      <div
        className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-700 ease-lux lg:p-9 ${
          expanded ? "translate-y-0 opacity-100 delay-200" : "translate-y-6 opacity-0"
        }`}
      >
        <span aria-hidden className="mb-4 block h-px w-12 bg-gold" />
        <h3 className="whitespace-nowrap text-[clamp(1.8rem,2.6vw,2.6rem)] leading-tight text-ivory">{member.name}</h3>
        <p className="mt-2 max-w-sm text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.22em] text-gold">{member.title}</p>
        {member.href && (
          <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory/70 transition-colors group-hover:text-ivory">
            View Profile <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </Wrapper>
  );
}

