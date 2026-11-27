"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { hero, nav, PHONE, type NavGroup, type NavItem } from "@/lib/content";
import { EASE } from "@/components/motion/primitives";
import { ArrowIcon, PhoneIcon } from "@/components/ui/Icons";

const isGroup = (i: NavItem): i is NavGroup => "groups" in i;

/** Floating pill navigation + full-screen index menu. */
export function NavV2() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="intro-header fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1280px] items-center justify-between gap-3 rounded-full border border-white/10 bg-navy py-2 pl-5 pr-2 transition-shadow duration-500 sm:pl-6 ${
            scrolled ? "shadow-[0_18px_50px_-18px_rgba(11,13,16,0.65)]" : ""
          }`}
        >
          <a href="#top" className="relative z-[60] shrink-0" aria-label="Dhanu Dhaliwal Law Group — home">
            <Image src="/images/logo.png" alt="Dhanu Dhaliwal Law Group" width={294} height={58} preload className="h-7 w-auto sm:h-8" />
          </a>

          <div className="flex items-center gap-2">
            <a
              href={PHONE.href}
              className="hidden items-center gap-2 rounded-full px-4 py-3 text-[0.78rem] font-semibold tracking-[0.08em] text-ivory/85 transition-colors hover:text-gold md:inline-flex"
            >
              <PhoneIcon className="h-4 w-4 text-gold" />
              {PHONE.display}
            </a>
            <a
              href={hero.consult.href}
              className="hidden rounded-full bg-gold px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:bg-ivory sm:inline-flex"
            >
              {hero.consult.label}
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="v2-menu"
              className="relative z-[60] flex h-11 items-center gap-3 rounded-full bg-ivory/10 pl-5 pr-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ivory/20"
            >
              <span className="w-10 text-left">{open ? "Close" : "Menu"}</span>
              <span className="flex h-8 w-8 flex-col items-center justify-center gap-1 rounded-full bg-ivory">
                <span className={`block h-px w-3.5 bg-navy transition-transform duration-500 ${open ? "translate-y-[2.5px] rotate-45" : ""}`} />
                <span className={`block h-px w-3.5 bg-navy transition-transform duration-500 ${open ? "-translate-y-[2.5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="v2-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 overflow-y-auto bg-ink text-ivory"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
          >
            <div className="mx-auto grid min-h-full max-w-[1280px] gap-12 px-6 pb-12 pt-32 lg:grid-cols-12 lg:px-10">
              <ul className="lg:col-span-8">
                {nav.map((item, i) => (
                  <m.li
                    key={item.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: EASE }}
                    className="border-b border-ivory/10 py-5"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="w-8 text-xs font-semibold tracking-widest text-gold">0{i + 1}</span>
                      {"href" in item && item.href ? (
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="font-sans text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-none tracking-[-0.04em] transition-colors hover:text-gold"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="font-sans text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-none tracking-[-0.04em]">{item.label}</span>
                      )}
                    </div>
                    {isGroup(item) && (
                      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 pl-[3.25rem]">
                        {item.groups.map((g, gi) => (
                          <div key={gi} className="flex flex-wrap items-center gap-x-5 gap-y-2">
                            {g.heading && <span className="text-[0.62rem] uppercase tracking-[0.3em] text-slate">{g.heading}</span>}
                            {g.links.map((l) => (
                              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-serif text-xl italic text-ivory/75 transition-colors hover:text-gold">
                                {l.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </m.li>
                ))}
              </ul>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col justify-end gap-4 lg:col-span-4"
              >
                <p className="font-serif text-3xl italic leading-tight text-gold">{hero.tagline}</p>
                <a
                  href={hero.consult.href}
                  onClick={() => setOpen(false)}
                  className="mt-4 flex items-center justify-between rounded-full bg-gold py-2 pl-6 pr-2 text-xs font-bold uppercase tracking-[0.2em] text-navy"
                >
                  {hero.consult.label}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-gold">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </a>
                <a href={PHONE.href} className="flex items-center justify-center gap-2 rounded-full border border-ivory/20 px-6 py-4 text-sm tracking-wider">
                  <PhoneIcon className="h-4 w-4 text-gold" /> {PHONE.display}
                </a>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
