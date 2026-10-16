"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { ArrowUp } from "../ui/Icons";
import { scrollToTop } from "./SmoothScroll";

export function BackToTop({ label }: { label: string }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 700));

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() => scrollToTop()}
          aria-label={label}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="glass fixed bottom-5 right-5 z-40 grid size-13 place-items-center rounded-full text-ink transition-shadow hover:shadow-lift md:bottom-8 md:right-8"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 52 52" aria-hidden>
            <circle cx="26" cy="26" r="24" fill="none" stroke="rgb(28 20 8 / 0.08)" strokeWidth="2" />
            <motion.circle
              cx="26"
              cy="26"
              r="24"
              fill="none"
              stroke="var(--color-honey-500)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp size={18} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
