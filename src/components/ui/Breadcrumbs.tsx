import Link from "next/link";
import { breadcrumbLd, JsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ChevronRight } from "./Icons";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, label, className, tone = "ink" }: { items: Crumb[]; label: string; className?: string; tone?: "ink" | "light" }) {
  return (
    <>
      <nav aria-label={label} className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={cn("font-medium", tone === "ink" ? "text-ink" : "text-white")}>
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      className={cn(
                        "link-underline transition-colors",
                        tone === "ink" ? "text-muted hover:text-ink" : "text-white/75 hover:text-white",
                      )}
                    >
                      {item.name}
                    </Link>
                    <ChevronRight size={14} className={tone === "ink" ? "text-muted/60" : "text-white/50"} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}
