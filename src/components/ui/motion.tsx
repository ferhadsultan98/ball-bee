"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image, { type ImageProps } from "next/image";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Reveal — soft fade/rise when the element enters the viewport        */
/* ------------------------------------------------------------------ */
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "span" | "p" | "header";
  amount?: number;
};

export function Reveal({ children, className, delay = 0, y = 28, as = "div", amount = 0.25 }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger — children rise one after another                           */
/* ------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.08,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  stagger?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* SplitWords — headline words slide up from a mask                    */
/* ------------------------------------------------------------------ */
type SplitWordsProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  onView?: boolean;
};

export function SplitWords({ text, className, wordClassName, delay = 0, stagger = 0.06, onView = false }: SplitWordsProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const trigger = onView ? { whileInView: "show", viewport: { once: true, amount: 0.6 } } : { animate: "show" };
  return (
    <motion.span
      className={cn("inline", className)}
      initial={reduce ? false : "hidden"}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            variants={{
              hidden: { y: "105%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax — translate children relative to scroll                    */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  speed = 60,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* ParallaxImage — image drifts inside a clipped frame                 */
/* ------------------------------------------------------------------ */
type ParallaxImageProps = Omit<ImageProps, "fill" | "className"> & {
  className?: string;
  imageClassName?: string;
  strength?: number;
  overlay?: ReactNode;
};

export function ParallaxImage({ className, imageClassName, strength = 12, overlay, alt, ...img }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0"
        style={{ top: `-${strength}%`, bottom: `-${strength}%`, ...(reduce ? {} : { y }) }}
      >
        <Image fill alt={alt} className={cn("object-cover", imageClassName)} {...img} />
      </motion.div>
      {overlay}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollWords — words light up as the section scrolls past            */
/* ------------------------------------------------------------------ */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]} reduce={!!reduce}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={reduce ? undefined : { opacity }}>{children}</motion.span>{" "}
    </>
  );
}
