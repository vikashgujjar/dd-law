import Image from "next/image";
import { team, voice } from "@/lib/content";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { ArrowIcon } from "@/components/ui/Icons";
import { ChapterHead } from "./Chapter";

/** Chapter II — two profile columns, interview style, on forest. */
export function LeadershipV3() {
  const { leadership } = voice;
  const words = leadership.title.split(" ");
  const partners = [
    { member: team.members.find((m) => m.initials === "RD")!, bio: leadership.paragraphs[0] },
    { member: team.members.find((m) => m.initials === "UD")!, bio: leadership.paragraphs[1] },
  ];

  return (
    <section aria-labelledby="v3-lead-title" className="bg-forest py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
        <ChapterHead num="II" label="Leadership" tone="light" />

        <h2 id="v3-lead-title" className="mt-12 max-w-5xl text-[clamp(2.8rem,6.4vw,6.6rem)] leading-[0.92] lg:mt-16">
          <SplitWords text={words.slice(0, 3).join(" ")} className="block" />
          <SplitWords text={words.slice(3).join(" ")} delay={0.15} className="block italic text-clay-light" />
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden bg-bone/15 lg:mt-24 lg:grid-cols-2">
          {partners.map(({ member, bio }, i) => (
            <Reveal key={member.name} delay={i * 0.12} className="bg-forest p-0 py-10 lg:px-12 lg:py-4 lg:first:pl-0 lg:last:pr-0">
              <article>
                <div className="flex items-center gap-6">
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-1 ring-clay-light/60 ring-offset-4 ring-offset-forest sm:h-36 sm:w-36">
                    {member.image && <Image src={member.image} alt={member.name} fill sizes="144px" className="object-cover object-[50%_15%]" />}
                  </div>
                  <div>
                    <h3 className="text-[clamp(2rem,3.2vw,3rem)] leading-none">{member.name}</h3>
                    <p className="mt-3 text-[0.66rem] font-semibold uppercase leading-relaxed tracking-[0.22em] text-clay-light">{member.title}</p>
                  </div>
                </div>
                <p className="dropcap mt-10 text-[1.04rem] leading-[1.9] text-bone/75">{bio}</p>
                {member.href && (
                  <a href={member.href} className="group mt-8 inline-flex items-center gap-3 border-b border-clay-light/50 pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-clay-light transition-colors hover:border-bone hover:text-bone">
                    View Profile <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 border-t border-bone/15 pt-12 lg:mt-24">
          <p className="mx-auto max-w-4xl text-center font-display text-[clamp(1.9rem,3.6vw,3.2rem)] italic leading-[1.15] text-sage-light">{leadership.paragraphs[2]}</p>
        </Reveal>
      </div>
    </section>
  );
}
