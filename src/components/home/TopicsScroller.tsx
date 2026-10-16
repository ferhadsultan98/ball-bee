"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight } from "../ui/Icons";
import { Accent } from "../ui/Section";

type Item = { key: string; title: string; short: string; desc: string; href: string; image: StaticImageData };

const QUERY = "(min-width: 1024px)";
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

export function TopicsScroller({
  eyebrow,
  title,
  lead,
  readMore,
  items,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  readMore: string;
  items: Item[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const pinned = desktop && !reduce;
  const [distance, setDistance] = useState(0);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (!pinned || !trackRef.current) {
      setHeight(undefined);
      return;
    }
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(d);
      setHeight(d + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="topics-title"
      className="relative"
      style={pinned && height ? { height } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden" : "section-y"}>
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? "flex w-max items-stretch gap-6 pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] pr-[8vw]"
              : "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-8"
          }
        >
          {/* intro panel */}
          <div
            className={
              pinned
                ? "flex w-[min(34vw,480px)] shrink-0 flex-col justify-center pr-10"
                : "flex w-[85vw] max-w-md shrink-0 snap-start flex-col justify-end pb-2 pr-4"
            }
          >
            <p className="eyebrow mb-5">
              <span className="h-px w-6 bg-current opacity-50" aria-hidden />
              {eyebrow}
            </p>
            <h2 id="topics-title" className="text-h2 text-ink">
              <Accent text={title} />
            </h2>
            <p className="text-lead mt-5 text-muted">{lead}</p>
            {pinned ? (
              <div className="mt-10 h-[3px] w-40 overflow-hidden rounded-full bg-ink/10" aria-hidden>
                <motion.div className="h-full origin-left rounded-full bg-honey-500" style={{ scaleX: progress }} />
              </div>
            ) : null}
          </div>

          {items.map((item, i) => (
            <Link
              key={item.key}
              href={item.href}
              className={
                "group relative isolate shrink-0 overflow-hidden rounded-[2rem] bg-ink shadow-lift " +
                (pinned
                  ? "h-[min(72vh,700px)] w-[min(31vw,470px)]"
                  : "aspect-[3/4] w-[78vw] max-w-sm snap-start sm:w-[46vw]")
              }
            >
              <Image
                src={item.image}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 31vw, 80vw"
                className="-z-10 object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105 scale-[1.12]"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="flex h-full flex-col justify-between p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="glass-dark rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-white tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="grid size-12 place-items-center rounded-full bg-white text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-honey-300">{item.short}</p>
                  <h3 className="text-h3 text-white">{item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-white/75">{item.desc}</p>
                  <span className="sr-only">{readMore}</span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
