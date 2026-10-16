"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import apiaryPoster from "@/assets/images/apiary-poster.jpg";
import bee from "@/assets/images/bee-2.jpg";
import type { Dictionary } from "@/i18n/dictionaries/az";
import { Check, Leaf } from "../ui/Icons";
import { Reveal } from "../ui/motion";
import { Accent } from "../ui/Section";

export function Apiary({ t, badges }: { t: Dictionary["apiary"]; badges: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const chipA = useTransform(scrollYProgress, [0, 1], [160, -160]);
  const chipB = useTransform(scrollYProgress, [0, 1], [40, -220]);
  const photoY = useTransform(scrollYProgress, [0, 1], [120, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const s = (v: MotionStyle) => (reduce ? undefined : v);

  return (
    <section ref={ref} aria-labelledby="apiary-title" className="section-y relative overflow-hidden">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Device */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <motion.div
            style={s({ y: photoY })}
            className="absolute -left-2 top-10 hidden aspect-[4/5] w-40 overflow-hidden rounded-[1.75rem] shadow-lift ring-4 ring-white/80 sm:block lg:-left-4 lg:w-48"
          >
            <Image src={bee} alt="" fill placeholder="blur" sizes="200px" className="object-cover" />
          </motion.div>

          <motion.div
            style={s({ y: phoneY, rotate })}
            className="relative mx-auto w-[min(76vw,310px)] rounded-[3.2rem] bg-[#16110a] p-[10px] shadow-[0_50px_100px_-30px_rgb(61_38_0/0.55),inset_0_0_0_2px_rgb(255_255_255/0.08)]"
          >
            <div className="relative aspect-[9/19.2] overflow-hidden rounded-[2.6rem] bg-ink">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src="/videos/apiary.mp4"
                poster={apiaryPoster.src}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                tabIndex={-1}
              />
              <span aria-hidden className="absolute left-1/2 top-3 h-7 w-24 -translate-x-1/2 rounded-full bg-black" />
              <div className="absolute inset-x-3 bottom-3 rounded-[1.6rem] glass-dark p-3.5 text-white">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-honey-300">BalBee</p>
                <p className="mt-0.5 text-sm font-medium">{t.eyebrow}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={s({ y: chipA })}
            className="glass absolute -right-1 top-[22%] flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:right-2 lg:-right-2"
          >
            <span className="grid size-8 place-items-center rounded-full bg-honey-300 text-ink">
              <Check size={16} />
            </span>
            <span className="text-sm font-semibold text-ink">{badges[0]}</span>
          </motion.div>
          <motion.div
            style={s({ y: chipB })}
            className="glass absolute bottom-[14%] left-0 flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:left-4"
          >
            <span className="grid size-8 place-items-center rounded-full bg-ink text-honey-300">
              <Leaf size={16} />
            </span>
            <span className="text-sm font-semibold text-ink">{badges[1]}</span>
          </motion.div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow mb-5">
              <span className="h-px w-6 bg-current opacity-50" aria-hidden />
              {t.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="apiary-title" className="text-h2 text-ink">
              <Accent text={t.title} />
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lead mt-5 max-w-xl text-muted">{t.lead}</p>
          </Reveal>

          <ol className="relative mt-12 space-y-2">
            {t.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={0.08 * i} className="group relative flex gap-5 rounded-3xl p-4 transition-colors duration-500 hover:bg-white/60 md:p-5">
                <span className="relative flex flex-col items-center">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border hairline bg-white text-sm font-semibold tabular-nums text-ink shadow-soft transition-colors duration-500 group-hover:bg-honey-300">
                    0{i + 1}
                  </span>
                </span>
                <span className="pt-1.5">
                  <span className="block text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">{step.title}</span>
                  <span className="mt-1 block leading-relaxed text-muted">{step.desc}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
