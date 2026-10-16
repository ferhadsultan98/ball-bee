import { cn } from "@/lib/utils";

function Row({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <svg width="14" height="15" viewBox="0 0 56 60" aria-hidden className="shrink-0 text-honey-500">
            <path d="M28 2 52 16v28L28 58 4 44V16L28 2Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export function Marquee({ items, className, duration = 45 }: { items: string[]; className?: string; duration?: number }) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  );
}
