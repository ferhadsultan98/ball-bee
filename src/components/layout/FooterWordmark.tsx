"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none mt-16 select-none overflow-hidden md:mt-24">
      <motion.p
        style={reduce ? undefined : { y, opacity }}
        className="text-center text-[24vw] font-semibold leading-[0.78] tracking-[-0.07em] text-transparent [background-clip:text] [-webkit-background-clip:text] bg-[linear-gradient(180deg,rgb(233_161_11/0.55)_0%,rgb(233_161_11/0.08)_85%)]"
      >
        BalBee
      </motion.p>
    </div>
  );
}
