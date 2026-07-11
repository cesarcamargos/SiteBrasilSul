"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

function subscribeNoop() {
  return () => {};
}
function getHydratedSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

/** True only once hydration has completed on the client. */
function useHydrated() {
  return useSyncExternalStore(subscribeNoop, getHydratedSnapshot, getServerSnapshot);
}

/**
 * SSR/first paint/no-JS/reduced-motion always render fully visible —
 * `initial={false}` means motion snaps straight to whatever `animate`
 * resolves to instead of ever rendering a "hidden" first frame. Only after
 * hydration (`armed`) does a component get to opt into hiding itself, and
 * only while it's actually out of view — so a headless renderer, a paused
 * tab, or JS that never finishes can never leave content stuck invisible.
 */
function useArmedInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const armed = useHydrated();
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return { ref, shouldHide: armed && !inView };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "span";
}

export function Reveal({ children, className, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const { ref, shouldHide } = useArmedInView<HTMLDivElement>();

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={shouldHide ? "hidden" : "visible"}
      variants={itemVariants}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
}

/** Staggers its direct motion children (wrap each in <RevealItem>). */
export function RevealGroup({ children, className }: RevealGroupProps) {
  const reduceMotion = useReducedMotion();
  const { ref, shouldHide } = useArmedInView<HTMLDivElement>();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={shouldHide ? "hidden" : "visible"}
      variants={groupVariants}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} initial={false} variants={itemVariants} suppressHydrationWarning>
      {children}
    </motion.div>
  );
}
