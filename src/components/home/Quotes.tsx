"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import aristotle from "@/assets/images/aristotle.png";
import hippocrates from "@/assets/images/hippocrates.png";
import hugo from "@/assets/images/hugo.png";
import type { Dictionary } from "@/i18n/dictionaries/az";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "../ui/Icons";
import { Reveal } from "../ui/motion";
import { Accent } from "../ui/Section";

const PORTRAITS = [hippocrates, aristotle, hugo];
const EASE = [0.16, 1, 0.3, 1] as const;

export function Quotes({ t, labels }: { t: Dictionary["quotes"]; labels: { prev: string; next: string } }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const total = t.items.length;
  const go = useCallback((dir: number) => setIndex((i) => (i + dir + total) % total), [total]);

  const item = t.items[index];

  return (
    <section aria-labelledby="quotes-title" className="px-2 md:px-4">
      <div
        className="relative isolate overflow-hidden rounded-[2rem] bg-ink text-cream-50 md:rounded-[2.75rem]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          aria-hidden
          className="absolute -right-40 -top-40 -z-10 size-[36rem] rounded-full bg-honey-500/20 blur-[120px]"
        />
        <div aria-hidden className="absolute -bottom-48 -left-32 -z-10 size-[30rem] rounded-full bg-honey-300/10 blur-[100px]" />
        <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full opacity-[0.05]">
          <defs>
            <pattern id="hex" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(0.9)">
              <path d="M28 0 56 16v32L28 64 0 48V16Zm0 64 28 16v17M28 64 0 80v17" fill="none" stroke="#fff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>

        <div className="container-x section-y">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mb-5 text-honey-300">
                  <span className="h-px w-6 bg-current opacity-60" aria-hidden />
                  {t.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id="quotes-title" className="text-h2 text-white [&_em]:text-honey-300">
                  <Accent text={t.title} />
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-sm text-lead text-white/60">{t.lead}</p>
              </Reveal>
              <div className="mt-10 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={labels.prev}
                  className="grid size-12 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={labels.next}
                  className="grid size-12 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                >
                  <ChevronRight size={20} />
                </button>
                <span className="ml-3 text-sm tabular-nums text-white/50" aria-hidden>
                  0{index + 1} / 0{total}
                </span>
              </div>
            </div>

            <div className="relative min-h-[24rem] lg:col-span-8 lg:pl-10" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="flex h-full flex-col justify-between gap-12"
                >
                  <blockquote className="accent text-[clamp(1.9rem,1.1rem+3vw,3.75rem)] leading-[1.12] text-white">
                    <span aria-hidden className="mr-1 text-honey-300">
                      “
                    </span>
                    {item.quote}
                    <span aria-hidden className="text-honey-300">
                      ”
                    </span>
                  </blockquote>
                  <figcaption className="flex items-center gap-4">
                    <span className="relative size-16 overflow-hidden rounded-full ring-2 ring-honey-300/60">
                      <Image
                        src={PORTRAITS[index % PORTRAITS.length]}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover object-top grayscale sepia-[0.35]"
                      />
                    </span>
                    <span>
                      <span className="block text-lg font-semibold tracking-[-0.02em] text-white">{item.name}</span>
                      <span className="block text-sm text-white/55">{item.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>

              <div className="mt-10 flex gap-2" aria-hidden>
                {t.items.map((q, i) => (
                  <span key={q.name} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                    <span
                      className={cn(
                        "block h-full origin-left rounded-full bg-honey-300",
                        i < index || (reduce && i === index) ? "scale-x-100" : "scale-x-0",
                        !reduce && i === index && "animate-[grow_7s_linear_forwards]",
                        paused && i === index && "[animation-play-state:paused]",
                      )}
                      key={`${i}-${index}`}
                      onAnimationEnd={i === index ? () => go(1) : undefined}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
