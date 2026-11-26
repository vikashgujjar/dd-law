"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Motion is loaded in its slim `LazyMotion` form (`m` components only).
 * `strict` makes accidental use of the heavier `motion.*` components throw.
 * Also honours the OS "reduce motion" setting.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
