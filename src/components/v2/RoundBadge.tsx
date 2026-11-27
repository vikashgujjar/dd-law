import { ArrowIcon } from "@/components/ui/Icons";

/** Rotating circular text badge that links to an anchor. */
export function RoundBadge({
  href,
  text,
  id,
  className = "",
  tone = "navy",
}: {
  href: string;
  text: string;
  id: string;
  className?: string;
  tone?: "navy" | "ivory";
}) {
  const ink = tone === "navy" ? "text-navy" : "text-ivory";
  return (
    <a href={href} aria-label={text} className={`group relative block aspect-square ${ink} ${className}`}>
      <svg viewBox="0 0 200 200" aria-hidden className="spin-20 absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text className="fill-current text-[13px] font-bold uppercase" letterSpacing="3">
          <textPath href={`#${id}`} textLength="495" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[29%] flex items-center justify-center rounded-full bg-gold text-navy transition-transform duration-500 ease-lux group-hover:scale-110">
        <ArrowIcon className="h-6 w-6 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
      </span>
    </a>
  );
}
