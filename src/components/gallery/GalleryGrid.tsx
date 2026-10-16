"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { lockScroll } from "../layout/SmoothScroll";
import { CloudImage } from "../ui/CloudImage";
import { ChevronLeft, ChevronRight, Close, Heart } from "../ui/Icons";

type Item = { index: number; src: string; title: string; description: string; likes: number };
type Labels = { likes: string; like: string; unlike: string; open: string; close: string; prev: string; next: string };

const STORAGE_KEY = "likedCards";
const EASE = [0.16, 1, 0.3, 1] as const;

function readLiked(): Record<number, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") ?? {};
  } catch {
    return {};
  }
}

export function GalleryGrid({ items, labels }: { items: Item[]; labels: Labels }) {
  const [likes, setLikes] = useState<Record<number, number>>(() =>
    Object.fromEntries(items.map((i) => [i.index, i.likes])),
  );
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [active, setActive] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Hydrate likes from storage after mount (avoids SSR mismatch).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLiked(readLiked());
  }, []);

  const toggleLike = async (index: number) => {
    const next = !liked[index];
    const nextLiked = { ...liked, [index]: next };
    setLiked(nextLiked);
    setLikes((l) => ({ ...l, [index]: Math.max(0, (l[index] ?? 0) + (next ? 1 : -1)) }));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLiked));
    } catch {
      /* storage unavailable */
    }
    try {
      const { getDb, increment, ref, update } = await import("@/lib/firebase-client");
      await update(ref(getDb(), `gallery/${index}`), { likes: increment(next ? 1 : -1) });
    } catch {
      /* keep optimistic state */
    }
  };

  const close = useCallback(() => {
    setActive(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (dir: number) => setActive((a) => (a === null ? a : (a + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [active, close, step]);

  const current = active !== null ? items[active] : null;
  const columns = useColumns(items, useColumnCount());

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
        {columns.map((col, c) => (
          <ParallaxColumn key={c} speed={c === 1 ? 70 : c === 2 ? 20 : 0} className="flex flex-col gap-3 md:gap-4">
            {col.map(({ item, i }) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, ease: EASE }}
                className={cn(
                  "group relative overflow-hidden rounded-[1.5rem] bg-cream-300 shadow-soft md:rounded-[1.75rem]",
                  i % 3 === 1 ? "aspect-[4/5]" : i % 3 === 2 ? "aspect-square" : "aspect-[3/4]",
                )}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setActive(i);
                  }}
                  className="absolute inset-0 cursor-zoom-in"
                  aria-label={`${labels.open}: ${item.title} ${i + 1}`}
                >
                  <CloudImage
                    src={item.src}
                    alt={item.description || `${item.title} — ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    maxWidth={1080}
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                </button>
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent" />
                <LikeButton
                  liked={!!liked[item.index]}
                  count={likes[item.index] ?? 0}
                  labels={labels}
                  onClick={() => toggleLike(item.index)}
                  className="absolute bottom-3 left-3"
                />
              </motion.div>
            ))}
          </ParallaxColumn>
        ))}
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[60] flex flex-col bg-[#120c04]/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between p-4 text-white md:p-6" onClick={(e) => e.stopPropagation()}>
              <span className="text-sm tabular-nums text-white/60">
                {(active ?? 0) + 1} / {items.length}
              </span>
              <button
                type="button"
                autoFocus
                onClick={close}
                aria-label={labels.close}
                className="grid size-12 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Close size={20} />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-24">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) step(1);
                    else if (info.offset.x > 80) step(-1);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative h-[72vh] w-full max-w-5xl touch-pan-y"
                >
                  <CloudImage
                    src={current.src}
                    alt={current.description || current.title}
                    fill
                    sizes="100vw"
                    priority
                    className="pointer-events-none select-none object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label={labels.prev}
                className="absolute left-4 top-1/2 hidden size-14 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:grid"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label={labels.next}
                className="absolute right-4 top-1/2 hidden size-14 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:grid"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 pb-6" onClick={(e) => e.stopPropagation()}>
              <LikeButton
                liked={!!liked[current.index]}
                count={likes[current.index] ?? 0}
                labels={labels}
                onClick={() => toggleLike(current.index)}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function LikeButton({
  liked,
  count,
  labels,
  onClick,
  className,
}: {
  liked: boolean;
  count: number;
  labels: Labels;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-pressed={liked}
      aria-label={`${liked ? labels.unlike : labels.like} — ${count} ${labels.likes}`}
      className={cn("glass flex h-10 items-center gap-2 rounded-full pl-3 pr-4 text-sm font-semibold text-ink", className)}
    >
      <motion.span
        key={String(liked)}
        initial={{ scale: 0.4 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
        className={liked ? "text-[#e2453c]" : "text-ink"}
      >
        <Heart size={18} filled={liked} />
      </motion.span>
      <span className="tabular-nums">{count}</span>
    </motion.button>
  );
}

function useColumnCount() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => (window.matchMedia("(min-width: 1024px)").matches ? 3 : 2),
    () => 3,
  );
}

/** Distributes items round-robin across the visible columns. */
function useColumns(items: Item[], count: number) {
  return useMemo(() => {
    const cols: { item: Item; i: number }[][] = Array.from({ length: count }, () => []);
    items.forEach((item, i) => cols[i % count].push({ item, i }));
    return cols;
  }, [items, count]);
}

function ParallaxColumn({ children, speed, className }: { children: ReactNode; speed: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} style={reduce || !speed ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
