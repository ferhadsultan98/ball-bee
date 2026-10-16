import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Icons";
import { Reveal } from "./motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  action?: { href: string; label: string };
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, lead, align = "left", action, className, as = "h2" }: SectionHeadingProps) {
  const Heading = as;
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <Reveal>
            <p className="eyebrow mb-5">
              <span className="h-px w-6 bg-current opacity-50" aria-hidden />
              {eyebrow}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={0.05}>
          <Heading className="text-h2 text-ink">{title}</Heading>
        </Reveal>
        {lead ? (
          <Reveal delay={0.1}>
            <p className={cn("text-lead mt-5 max-w-xl text-muted", align === "center" && "mx-auto")}>{lead}</p>
          </Reveal>
        ) : null}
      </div>
      {action ? (
        <Reveal delay={0.15} className="shrink-0">
          <Link href={action.href} className="btn btn-ghost">
            {action.label}
            <span className="btn-icon">
              <ArrowRight size={16} />
            </span>
          </Link>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Splits "a b *accent* c" so the starred word renders in the serif accent face. */
export function Accent({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className="accent text-honey-700">
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        ),
      )}
    </>
  );
}
