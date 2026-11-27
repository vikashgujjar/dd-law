"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { footer, hero, nav, offices, PHONE, type NavGroup, type NavItem } from "@/lib/content";
import { EASE } from "@/components/motion/primitives";
import { ArrowIcon, PhoneIcon } from "@/components/ui/Icons";

const isGroup = (i: NavItem): i is NavGroup => "groups" in i;

/** Fixed vertical rail on desktop, slim top bar on mobile, full-screen index menu. */
export function RailNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const Burger = (
    <span className="relative block h-3 w-6">
      <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
      <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
    </span>
  );

  return (
    <>
      {/* Desktop rail */}
      <header className="fixed inset-y-0 left-0 z-50 hidden w-[92px] flex-col items-center justify-between border-r border-bone/10 bg-forest py-7 text-bone lg:flex">
        <a href="#top" aria-label="Dhanu Dhaliwal Law Group — home" className="block w-12 transition-opacity hover:opacity-80">
          <Image src="/images/logo-mark-gold.png" alt="Dhanu Dhaliwal Law Group" width={403} height={356} preload sizes="48px" className="h-auto w-full" />
        </a>
        <p className="select-none text-[0.62rem] font-semibold uppercase tracking-[0.42em] text-bone/55 [writing-mode:vertical-rl] rotate-180">
          {hero.eyebrow} &nbsp;·&nbsp; {offices.map((o) => o.name.replace(" Office", "")).join(" · ")}
        </p>
        <div className="flex flex-col items-center gap-5">
          <a href={PHONE.href} aria-label={`Call ${PHONE.display}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 transition-colors hover:border-clay hover:bg-clay">
            <PhoneIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="v3-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-clay text-bone transition-transform hover:scale-105"
          >
            {Burger}
          </button>
        </div>
      </header>

      {/* Mobile bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-forest px-5 text-bone lg:hidden">
        <a href="#top" aria-label="Dhanu Dhaliwal Law Group — home">
          <Image src={footer.logo.src} alt="Dhanu Dhaliwal Law Group" width={footer.logo.width} height={footer.logo.height} preload sizes="180px" className="h-8 w-auto" />
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="v3-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-clay"
        >
          {Burger}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="v3-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 grid overflow-y-auto bg-bone text-forest lg:left-[92px] lg:grid-cols-12"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            exit={{ clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
          >
            <ul className="px-6 pb-10 pt-24 sm:px-10 lg:col-span-8 lg:px-16 lg:pt-16">
              {nav.map((item, i) => (
                <m.li
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE }}
                  className="border-b border-forest/15 py-5"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-xl italic text-clay">{["I", "II", "III", "IV", "V"][i]}</span>
                    {"href" in item && item.href ? (
                      <a href={item.href} onClick={() => setOpen(false)} className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none transition-colors hover:text-clay">
                        {item.label}
                      </a>
                    ) : (
                      <span className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none">{item.label}</span>
                    )}
                  </div>
                  {isGroup(item) && (
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 pl-10">
                      {item.groups.flatMap((g) => g.links).map((l) => (
                        <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-sm text-forest/70 underline-offset-4 hover:text-clay hover:underline">
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </m.li>
              ))}
            </ul>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col justify-end gap-6 bg-forest p-8 text-bone sm:p-10 lg:col-span-4 lg:p-14"
            >
              <Image src={footer.logo.src} alt="Dhanu Dhaliwal Law Group" width={footer.logo.width} height={footer.logo.height} sizes="320px" className="mb-4 h-auto w-full max-w-[320px]" />
              <p className="font-display text-4xl italic leading-tight text-clay-light">{hero.tagline}</p>
              {offices.map((o) => (
                <p key={o.name} className="text-sm text-bone/70">
                  <span className="block font-semibold text-bone">{o.name}</span>
                  {o.address}
                </p>
              ))}
              <a href={hero.consult.href} onClick={() => setOpen(false)} className="flex items-center justify-between bg-clay px-6 py-5 text-xs font-semibold uppercase tracking-[0.2em]">
                {hero.consult.label} <ArrowIcon className="h-4 w-4" />
              </a>
              <a href={PHONE.href} className="flex items-center gap-3 text-lg">
                <PhoneIcon className="h-4 w-4 text-clay-light" /> {PHONE.display}
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
