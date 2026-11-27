"use client";

import Image from "next/image";
import { m, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { team, type TeamMember } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * Desktop: the section pins and vertical scroll drives a horizontal filmstrip.
 * Mobile / reduced motion: a native swipeable row.
 */
export function TeamV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pin, setPin] = useState(false);
  const [dist, setDist] = useState(0);
  const state = useRef({ pin: false, dist: 0 });
  const x = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const on = mq.matches && !reduce;
      const d = trackRef.current ? Math.max(0, trackRef.current.scrollWidth - window.innerWidth) : 0;
      state.current = { pin: on, dist: d };
      setPin(on);
      setDist(d);
      if (!on) x.set(0);
    };
    measure();
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, [reduce, x]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (state.current.pin) x.set(-v * state.current.dist);
  });

  return (
    <section
      id="team"
      ref={sectionRef}
      aria-labelledby="v2-team-title"
      className="relative bg-navy text-ivory"
      style={pin ? { height: `calc(100vh + ${dist}px)` } : undefined}
    >
      <div className={pin ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24"}>
        {/* Mobile intro */}
        <div className="px-5 sm:px-8 lg:hidden">
          <Intro headingId="v2-team-title" />
        </div>

        <div className={pin ? "" : "mt-12 overflow-x-auto pb-6 [scrollbar-width:none] lg:mt-0 [&::-webkit-scrollbar]:hidden"}>
          <m.div ref={trackRef} style={{ x }} className={`flex w-max items-center gap-5 ${pin ? "pl-12 pr-[12vw]" : "snap-x snap-mandatory px-5 sm:px-8 lg:px-12"}`}>
            <div className="hidden w-[34vw] max-w-[540px] shrink-0 pr-10 lg:block">
              <Intro desktop />
            </div>
            {team.members.map((member, i) => (
              <Card key={member.name} member={member} index={i} total={team.members.length} />
            ))}
          </m.div>
        </div>

        {pin && (
          <div aria-hidden className="absolute inset-x-12 bottom-10 h-px bg-ivory/10">
            <m.div className="h-px origin-left bg-gold" style={{ scaleX: scrollYProgress }} />
          </div>
        )}
      </div>
    </section>
  );
}

function Intro({ headingId, desktop }: { headingId?: string; desktop?: boolean }) {
  const Heading = desktop ? "p" : "h2";
  return (
    <>
      <Reveal>
        <p className="flex items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-gold">
          <span className="rounded-full border border-gold/40 px-3 py-1">02</span> {team.eyebrow}
        </p>
      </Reveal>
      <Heading id={headingId} aria-hidden={desktop || undefined} className="mt-7 leading-[0.95]">
        <SplitWords text={team.titleLead} className="block font-sans text-[clamp(2.4rem,4.4vw,4.6rem)] font-extrabold uppercase tracking-[-0.05em]" />
        <SplitWords text={team.titleAccent} delay={0.15} className="block font-serif text-[clamp(3rem,5.6vw,5.8rem)] italic" wordClassName="text-gilded" />
      </Heading>
      <div className="mt-8 space-y-4 text-[0.98rem] leading-[1.8] text-ivory/65">
        {team.paragraphs.map((p, i) => (
          <Reveal key={i} delay={0.15 + i * 0.1}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
}

function Card({ member, index, total }: { member: TeamMember; index: number; total: number }) {
  const Wrapper = member.href ? "a" : "div";
  return (
    <Wrapper
      {...(member.href ? { href: member.href } : {})}
      className={`group relative block h-[480px] w-[76vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-navy-2 lg:h-[70vh] lg:max-h-[640px] lg:w-[25vw] lg:max-w-[400px] ${
        index % 2 ? "lg:translate-y-10" : "lg:-translate-y-6"
      }`}
    >
      {member.image && (
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 25vw, 76vw"
          className="object-cover object-[50%_15%] grayscale-[60%] transition-[transform,filter] duration-[1.2s] ease-lux group-hover:scale-105 group-hover:grayscale-0"
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
      <span className="absolute left-5 top-5 rounded-full bg-ink/60 px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-ivory">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      {member.href && (
        <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-navy opacity-0 transition-[opacity,transform] duration-500 group-hover:-rotate-45 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ArrowIcon className="h-4 w-4" />
        </span>
      )}
      <div className="absolute inset-x-5 bottom-6">
        <h3 className="font-serif text-[2.1rem] leading-none text-ivory">{member.name}</h3>
        <p className="mt-3 text-[0.66rem] font-bold uppercase leading-relaxed tracking-[0.2em] text-gold-light">{member.title}</p>
      </div>
    </Wrapper>
  );
}
