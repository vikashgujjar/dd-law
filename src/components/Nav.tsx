"use client";

import Image from "next/image";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { nav, PHONE, hero, type NavGroup, type NavItem } from "@/lib/content";
import { ChevronIcon, PhoneIcon } from "./ui/Icons";
import { EASE } from "./motion/primitives";

const isGroup = (i: NavItem): i is NavGroup => "groups" in i;

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-lux ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "border-b border-gold/15 bg-navy/95" : "border-b border-transparent bg-transparent"}`}
      >
        <nav
          aria-label="Primary"
          className={`intro-header mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 transition-[height] duration-700 ease-lux sm:px-8 lg:px-12 ${
            scrolled ? "h-[72px]" : "h-[88px] lg:h-[104px]"
          }`}
        >
          <a href="#top" className="relative z-[60] shrink-0" aria-label="Dhanu Dhaliwal Law Group — home">
            <span className="intro-logo block">
              <Image src="/images/logo.png" alt="Dhanu Dhaliwal Law Group" width={294} height={58} preload className="h-9 w-auto lg:h-11" />
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 xl:flex">
            {nav.map((item) => (
              <li key={item.label} className="group relative">
                {isGroup(item) ? <DesktopGroup item={item} /> : (
                  <a href={item.href} className="relative block px-4 py-3 text-[0.8rem] font-medium tracking-[0.08em] text-ivory/85 transition-colors hover:text-ivory">
                    <NavLabel>{item.label}</NavLabel>
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={PHONE.href}
              className="hidden items-center gap-2 text-[0.8rem] font-medium tracking-[0.08em] text-ivory/85 transition-colors hover:text-gold md:flex"
            >
              <PhoneIcon className="h-4 w-4 text-gold" />
              <span>Call {PHONE.display}</span>
            </a>
            <a
              href={hero.consult.href}
              className="group relative isolate hidden overflow-hidden border border-gold/60 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-500 hover:text-navy sm:inline-flex"
            >
              <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-lux group-hover:scale-x-100" />
              {hero.consult.label}
            </a>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[60] flex h-11 w-11 items-center justify-center xl:hidden"
            >
              <span className="relative block h-3 w-7">
                <span className={`absolute left-0 h-px w-full bg-ivory transition-all duration-500 ease-lux ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px bg-gold transition-all duration-500 ease-lux ${open ? "top-1/2 w-full -rotate-45" : "top-full w-2/3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function NavLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative">
      {children}
      <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-lux group-hover:origin-left group-hover:scale-x-100 group-focus-within:scale-x-100" />
    </span>
  );
}

function DesktopGroup({ item }: { item: NavGroup }) {
  const wide = item.groups.length > 1;
  const Trigger = item.href ? "a" : "button";
  return (
    <>
      <Trigger
        {...(item.href ? { href: item.href } : { type: "button" as const })}
        aria-haspopup="true"
        className="flex items-center gap-1.5 px-4 py-3 text-[0.8rem] font-medium tracking-[0.08em] text-ivory/85 transition-colors hover:text-ivory"
      >
        <NavLabel>{item.label}</NavLabel>
        <ChevronIcon className="h-3 w-3 text-gold transition-transform duration-500 group-hover:rotate-180" />
      </Trigger>
      <div
        className={`invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-500 ease-lux group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
          wide ? "w-[440px]" : "w-60"
        }`}
      >
        <div className={`relative border border-gold/20 bg-navy/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl ${wide ? "grid grid-cols-[1fr_1.4fr] gap-8" : ""}`}>
          <span className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
          {item.groups.map((g, gi) => (
            <div key={gi}>
              {g.heading && <p className="eyebrow mb-4 text-[0.6rem]! before:w-4!">{g.heading}</p>}
              <ul className="space-y-1">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group/l flex items-center gap-3 py-1.5 font-serif text-lg text-ivory/80 transition-colors hover:text-gold">
                      <span className="h-px w-0 bg-gold transition-all duration-500 ease-lux group-hover/l:w-4" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-navy xl:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
        >
          <div className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full border border-gold/10" />
          <div className="pointer-events-none absolute -right-24 top-[42%] h-[360px] w-[360px] rounded-full border border-gold/10" />
          <div className="relative flex min-h-full flex-col px-6 pb-10 pt-28 sm:px-10">
            <ul className="flex-1">
              {nav.map((item, i) => (
                <m.li
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.8, ease: EASE }}
                  className="border-b border-ivory/10"
                >
                  {isGroup(item) ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                        aria-expanded={expanded === item.label}
                        className="flex w-full items-center justify-between py-5 text-left font-serif text-3xl text-ivory"
                      >
                        <span>
                          <span className="mr-4 font-sans text-xs tracking-widest text-gold">0{i + 1}</span>
                          {item.label}
                        </span>
                        <ChevronIcon className={`h-5 w-5 text-gold transition-transform duration-500 ${expanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-5 pb-6 pl-9">
                              {item.href && (
                                <a href={item.href} onClick={onClose} className="block text-sm uppercase tracking-[0.2em] text-gold">
                                  View {item.label}
                                </a>
                              )}
                              {item.groups.map((g, gi) => (
                                <div key={gi}>
                                  {g.heading && <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-slate">{g.heading}</p>}
                                  <ul className="space-y-2">
                                    {g.links.map((l) => (
                                      <li key={l.label}>
                                        <a href={l.href} onClick={onClose} className="text-lg text-ivory/80 hover:text-gold">
                                          {l.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a href={item.href} onClick={onClose} className="block py-5 font-serif text-3xl text-ivory">
                      <span className="mr-4 font-sans text-xs tracking-widest text-gold">0{i + 1}</span>
                      {item.label}
                    </a>
                  )}
                </m.li>
              ))}
            </ul>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className="mt-10 space-y-4"
            >
              <a href={hero.consult.href} onClick={onClose} className="block bg-gold px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy">
                {hero.consult.label}
              </a>
              <a href={PHONE.href} className="flex items-center justify-center gap-2 border border-ivory/20 px-6 py-4 text-sm tracking-wider text-ivory">
                <PhoneIcon className="h-4 w-4 text-gold" /> Call {PHONE.display}
              </a>
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
