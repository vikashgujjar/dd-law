import Image from "next/image";
import { team, type TeamMember } from "@/lib/content";
import { Reveal, SplitWords, Stagger, StaggerItem } from "@/components/motion/primitives";
import { ChapterHead } from "./Chapter";

/** Chapter III — a contributors page: circular portraits in a ruled grid. */
export function TeamV3() {
  return (
    <section id="team" aria-labelledby="v3-team-title" className="bg-bone-2 py-24 text-forest lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
        <ChapterHead num="III" label={team.eyebrow} />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <h2 id="v3-team-title" className="text-[clamp(3rem,7vw,7rem)] leading-[0.9] lg:col-span-6">
            <SplitWords text={team.titleLead} className="block" />
            <SplitWords text={team.titleAccent} delay={0.15} className="block italic text-clay" />
          </h2>
          <div className="space-y-5 text-[1.02rem] leading-[1.85] text-forest/80 lg:col-span-6 lg:pt-4">
            {team.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p className={i === 0 ? "dropcap" : undefined}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Stagger className="mt-16 grid grid-cols-2 border-l border-t border-forest/15 sm:grid-cols-3 lg:mt-24 lg:grid-cols-4" gap={0.07}>
          {team.members.map((m, i) => (
            <StaggerItem key={m.name} className="border-b border-r border-forest/15">
              <Member member={m} index={i} />
            </StaggerItem>
          ))}
          <StaggerItem className="hidden border-b border-r border-forest/15 bg-forest lg:block">
            <div className="flex h-full flex-col justify-end p-8 text-bone">
              <p className="font-display text-6xl italic leading-none text-clay-light">{String(team.members.length).padStart(2, "0")}</p>
              <p className="mt-3 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-bone/70">{team.eyebrow}</p>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function Member({ member, index }: { member: TeamMember; index: number }) {
  const Wrapper = member.href ? "a" : "div";
  return (
    <Wrapper {...(member.href ? { href: member.href } : {})} className="group block p-5 sm:p-8">
      <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-full bg-sage transition-[box-shadow] duration-500 group-hover:shadow-[0_0_0_6px_var(--color-clay)]">
        {member.image && (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 240px, 45vw"
            className="object-cover object-[50%_15%] grayscale-[85%] sepia-[25%] transition-[filter,transform] duration-700 ease-lux group-hover:scale-105 group-hover:grayscale-0 group-hover:sepia-0"
          />
        )}
      </div>
      <p className="mt-6 font-display text-sm italic text-clay">No. {String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-1 text-[clamp(1.4rem,2vw,1.9rem)] leading-tight">{member.name}</h3>
      <p className="mt-2 text-[0.82rem] leading-snug text-forest/65">{member.title}</p>
    </Wrapper>
  );
}
