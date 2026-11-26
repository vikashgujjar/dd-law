"use client";

/**
 * Lightweight animation primitives.
 *
 * Scroll reveals are pure CSS transitions toggled by a single shared
 * IntersectionObserver (see `useInViewOnce`). Only effects that genuinely need
 * per-frame JS (parallax, magnetic hover) use Motion — via the tree-shaken `m`.
 */

import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ElementType, type ReactElement, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Shared IntersectionObserver                                         */
/* ------------------------------------------------------------------ */
const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          callbacks.get(e.target)?.();
          callbacks.delete(e.target);
          observer!.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
  }
  return observer;
}

/** Returns true once the element has scrolled into view (never resets). */
export function useInViewOnce<T extends Element>(immediate = false) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(immediate);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = getObserver();
    callbacks.set(el, () => setSeen(true));
    io.observe(el);
    return () => {
      callbacks.delete(el);
      io.unobserve(el);
    };
  }, [seen]);
  return [ref, seen] as const;
}

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

/* ------------------------------------------------------------------ */
/* Reveal: fade + rise when scrolled into view                         */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
}) {
  const [ref, seen] = useInViewOnce<HTMLDivElement>();
  return (
    <Tag ref={ref} data-inview={seen} className={`reveal ${className}`} style={{ "--d": `${delay}s`, "--y": `${y}px` } as Vars}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger: children animate in sequence                               */
/* ------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.09,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  const [ref, seen] = useInViewOnce<HTMLDivElement>();
  let i = 0;
  return (
    <div ref={ref} data-inview={seen} className={className}>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<{ style?: Vars }>, { style: { "--d": `${delay + gap * i++}s` } as Vars })
          : child,
      )}
    </div>
  );
}

export function StaggerItem({ children, className = "", style }: { children: ReactNode; className?: string; style?: Vars }) {
  return (
    <div className={`reveal-child ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SplitWords: headline words rise out of a mask                       */
/* ------------------------------------------------------------------ */
export function SplitWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.07,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const [ref, seen] = useInViewOnce<HTMLSpanElement>();
  const words = text.split(" ");
  return (
    <span ref={ref} data-inview={seen} className={`split ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="split-mask">
          <span className={`split-word ${wordClassName}`} style={{ "--d": `${delay + i * stagger}s` } as Vars}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* MaskReveal: clip-path wipe for imagery                              */
/* ------------------------------------------------------------------ */
export function MaskReveal({
  children,
  className = "",
  from = "up",
  delay = 0,
  duration = 1.5,
}: {
  children: ReactNode;
  className?: string;
  from?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}) {
  const [ref, seen] = useInViewOnce<HTMLDivElement>();
  return (
    // Observe an unclipped wrapper: a fully clipped target can report as
    // non-intersecting and never trigger.
    <div ref={ref} data-inview={seen} className={className}>
      <div data-from={from} className="mask-reveal h-full w-full" style={{ "--d": `${delay}s`, "--dur": `${duration}s` } as Vars}>
        <div className="mask-reveal-inner h-full w-full">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DrawOnView: triggers CSS stroke-drawing on nested SVG (.draw)       */
/* ------------------------------------------------------------------ */
export function DrawOnView({
  children,
  className = "",
  delay = 0,
  duration = 2.4,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  immediate?: boolean;
}) {
  const [ref, seen] = useInViewOnce<HTMLDivElement>(immediate);
  return (
    <div
      ref={ref}
      aria-hidden
      className={`draw ${immediate ? "draw-now" : ""} ${className}`}
      data-drawn={seen ? "true" : "false"}
      style={{ "--draw-delay": `${delay}s`, "--draw-dur": `${duration}s` } as Vars}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax: translate on scroll                                       */
/* ------------------------------------------------------------------ */
export function Parallax({ children, className, offset = 80 }: { children: ReactNode; className?: string; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [offset, -offset]);
  return (
    <m.div ref={ref} className={className} style={{ y }}>
      {children}
    </m.div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic: element drifts toward the pointer                         */
/* ------------------------------------------------------------------ */
export function Magnetic({ children, className = "", strength = 0.28 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 16, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }
  return (
    <m.span ref={ref} className={`inline-block ${className}`} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </m.span>
  );
}
