"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { hero, offices, PHONE, publications } from "@/lib/content";
import { Rings } from "@/components/art";
import { ArrowIcon } from "@/components/ui/Icons";

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;
const LENS_MASK = "radial-gradient(circle var(--r) at var(--x) var(--y), #000 98%, transparent 100%)";

/**
 * Lens hero: a forest scene with a muted portrait; a circular lens follows the
 * cursor and reveals the same scene in full colour on clay. On touch it drifts by
 * itself; with reduced motion it rests over the partners.
 */
export function CoverV3() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Rest over the partners: lower on narrow screens where the portrait sits near the bottom.
    const home = () => ({ x: el.clientWidth * 0.5, y: el.clientHeight * (el.clientWidth < 768 ? 0.72 : 0.56) });
    const radius = () => Math.min(Math.max(el.clientWidth * 0.13, 105), 220);

    const pos = home();
    const target = { ...pos };
    let r = 0;
    let inside = false;
    let visible = true;
    let raf = 0;
    const t0 = performance.now();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const b = el.getBoundingClientRect();
      target.x = e.clientX - b.left;
      target.y = e.clientY - b.top;
      inside = true;
    };
    const onLeave = () => (inside = false);

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      r += (radius() - r) * (reduce ? 1 : 0.05);
      if (!inside) {
        const h = home();
        const t = (now - t0) / 1000;
        const narrow = el.clientWidth < 768;
        target.x = reduce ? h.x : h.x + Math.sin(t * 0.5) * el.clientWidth * (narrow ? 0.18 : 0.24);
        target.y = reduce ? h.y : h.y + Math.sin(t * 0.85) * el.clientHeight * (narrow ? 0.06 : 0.1);
      }
      const k = reduce ? 1 : 0.1;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      el.style.setProperty("--x", `${pos.x.toFixed(1)}px`);
      el.style.setProperty("--y", `${pos.y.toFixed(1)}px`);
      el.style.setProperty("--r", `${r.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="v3-title"
      className="relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-forest text-bone lg:cursor-none"
      style={{ "--x": "50%", "--y": "56%", "--r": "0px" } as React.CSSProperties}
    >
      <h1 id="v3-title" className="sr-only">
        {hero.title} — {hero.tagline}
      </h1>

      {/* Base scene */}
      <Scene tone="base" />

      {/* Revealed scene, masked to the lens */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10" style={{ WebkitMaskImage: LENS_MASK, maskImage: LENS_MASK }}>
        <Scene tone="reveal" />
      </div>

      {/* Lens ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 rounded-full border border-bone/80"
        style={{
          width: "calc(var(--r) * 2)",
          height: "calc(var(--r) * 2)",
          transform: "translate(calc(var(--x) - var(--r)), calc(var(--y) - var(--r)))",
        }}
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone" />
      </div>

      {/* Dateline */}
      <div className="absolute inset-x-0 top-16 z-30 lg:top-0">
        <div
          className="intro-fade mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-bone/20 px-5 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-bone/75 sm:px-8 lg:mx-14 lg:px-0 lg:py-5 2xl:mx-auto"
          style={d(0.1)}
        >
          <span>{hero.eyebrow}</span>
          <span className="hidden sm:inline">{offices.map((o) => o.name).join(" · ")}</span>
          <a href={PHONE.href} className="transition-colors hover:text-clay-light">
            {PHONE.display}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 z-30 bg-linear-to-t from-pine/90 via-pine/60 to-transparent pt-16">
        <div className="intro-fade-up mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-6 px-5 pb-7 sm:px-8 lg:px-14" style={d(0.9)}>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={hero.consult.href}
              className="group inline-flex items-center gap-4 bg-clay px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-forest lg:cursor-pointer"
            >
              {hero.consult.label}
              <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a
              href={hero.cta.href}
              className="inline-flex items-center gap-3 border border-bone/40 px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-bone hover:bg-bone hover:text-forest"
            >
              {hero.cta.label}
            </a>
          </div>
          <p className="hidden max-w-md text-right text-[0.8rem] leading-relaxed text-bone/70 md:block">
            <span className="mr-2 font-display text-xl italic text-clay-light">{hero.featuredLabel}</span>
            {publications.map((p) => p.name).join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}

/** One full layer of the hero. "base" is muted forest; "reveal" is full-colour clay. */
function Scene({ tone }: { tone: "base" | "reveal" }) {
  const base = tone === "base";
  return (
    <div className={`absolute inset-0 ${base ? "bg-forest" : "bg-clay"}`}>
      <div aria-hidden className={`absolute left-1/2 top-[54%] w-[min(120vw,1100px)] -translate-x-1/2 -translate-y-1/2 ${base ? "text-sage/15" : "text-forest/25"}`}>
        <Rings className="h-auto w-full" strokeWidth={0.8} />
      </div>

      {/* Portrait */}
      <div className="absolute bottom-0 left-1/2 h-[64%] w-[min(118vw,calc(64svh*1.3))] -translate-x-1/2 sm:h-[74%] sm:w-[min(96vw,calc(74svh*1.3))]">
        <div className={base ? "intro-clip relative h-full w-full" : "relative h-full w-full"} style={base ? d(0.3) : undefined}>
          <Image
            src={hero.image.src}
            alt={base ? hero.image.alt : ""}
            fill
            preload={base}
            sizes="(min-width: 1024px) 70vw, 118vw"
            className={`object-contain object-bottom ${base ? "opacity-45 grayscale mix-blend-luminosity" : ""}`}
          />
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-between px-5 pb-52 pt-32 sm:px-8 md:pb-40 lg:px-14 lg:pb-40 lg:pt-28 xl:pb-32">
        <p aria-hidden className={`font-display text-[clamp(3rem,9vw,10.5rem)] leading-[0.92] tracking-[-0.02em] ${base ? "text-bone" : "text-forest"}`}>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className={base ? "intro-rise block" : "block"} style={base ? d(0.15) : undefined}>
              Understanding You
            </span>
          </span>
        </p>
        <p
          aria-hidden
          className={`self-end text-right font-display text-[clamp(3rem,9vw,10.5rem)] leading-[0.92] tracking-[-0.02em] ${base ? "text-bone" : "text-forest"}`}
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <span className={base ? "intro-rise block" : "block"} style={base ? d(0.3) : undefined}>
              is Our <em className={base ? "text-clay-light" : "text-bone"}>Advantage</em>
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}
