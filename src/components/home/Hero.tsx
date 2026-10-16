"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import poster from "@/assets/images/hero-poster.jpg";
import type { Dictionary } from "@/i18n/dictionaries/az";
import { ArrowRight, Whatsapp } from "../ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  t: Dictionary["hero"];
  productsHref: string;
  whatsappHref: string;
};

export function Hero({ t, productsHref, whatsappHref }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const words = [
    ...t.titleStart.split(" ").map((w) => ({ w, accent: false })),
    { w: t.titleAccent, accent: true },
    ...t.titleEnd.split(" ").map((w) => ({ w, accent: false })),
  ];

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative px-2 pt-[4.75rem] md:px-4 md:pt-[5.5rem]">
      <motion.div
        style={reduce ? undefined : { scale: frameScale }}
        className="relative isolate flex min-h-[calc(100svh-5.25rem)] origin-top flex-col overflow-hidden rounded-[1.75rem] bg-ink md:min-h-[calc(100svh-6.5rem)] md:rounded-[2.5rem]"
      >
        <motion.div style={reduce ? undefined : { y: mediaY, scale: mediaScale }} className="absolute inset-0 -z-10">
          <Image
            src={poster}
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
          <video
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1.4s]"
            style={{ opacity: ready ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            tabIndex={-1}
            onCanPlay={() => setReady(true)}
          >
            <source src="/videos/hero-540.mp4" type="video/mp4" media="(max-width: 767px)" />
            <source src="/videos/hero-1080.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* legibility veils */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_0%_100%,rgb(20_13_3/0.65),transparent_60%)]"
        />

        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="container-x flex flex-1 flex-col justify-end pb-10 pt-14 md:pb-14 md:pt-20"
        >
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                className="glass-dark mb-7 inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4 text-[0.8rem] font-medium tracking-wide text-white/90"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-honey-300 opacity-70 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-honey-300" />
                </span>
                {t.eyebrow}
              </motion.p>

              <h1 id="hero-title" className="text-display text-white">
                <motion.span
                  className="block"
                  initial={reduce ? false : "hidden"}
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
                >
                  {words.map(({ w, accent }, i) => (
                    <span key={`${w}-${i}`} className="inline-flex overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
                      <motion.span
                        className={accent ? "accent inline-block pr-[0.06em] text-honey-300" : "inline-block"}
                        variants={{
                          hidden: { y: "110%", rotate: 5 },
                          show: { y: "0%", rotate: 0, transition: { duration: 1.2, ease: EASE } },
                        }}
                      >
                        {w}
                      </motion.span>
                      {i < words.length - 1 ? " " : null}
                    </span>
                  ))}
                </motion.span>
              </h1>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.75 }}
                className="text-lead mt-7 max-w-xl text-white/80"
              >
                {t.lead}
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.9 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <Link href={productsHref} className="btn btn-white btn-lg">
                  {t.primary}
                  <span className="btn-icon">
                    <ArrowRight size={16} />
                  </span>
                </Link>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-glass-dark btn-lg">
                  <Whatsapp size={19} />
                  {t.secondary}
                </a>
              </motion.div>
            </div>

            <motion.ul
              initial={reduce ? false : "hidden"}
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1.05 } } }}
              className="hidden gap-2.5 lg:col-span-4 lg:flex lg:flex-col"
            >
              {t.facts.map((fact) => (
                <motion.li
                  key={fact.label}
                  variants={{
                    hidden: { opacity: 0, x: 24 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
                  }}
                  className="glass-dark flex items-center justify-between gap-6 rounded-3xl px-6 py-5 text-white"
                >
                  <span className="text-[1.65rem] font-semibold tracking-[-0.04em]">{fact.value}</span>
                  <span className="max-w-[11rem] text-right text-sm leading-snug text-white/75">{fact.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-10 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-white/60 md:flex"
          >
            <span className="relative h-9 w-[22px] rounded-full border border-white/40">
              <span className="absolute left-1/2 top-2 h-2 w-[3px] -translate-x-1/2 animate-bounce rounded-full bg-white/80" />
            </span>
            {t.scroll}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
