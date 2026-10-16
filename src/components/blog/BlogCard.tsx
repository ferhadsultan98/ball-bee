import Link from "next/link";
import { localeMeta, type Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CloudImage } from "../ui/CloudImage";
import { ArrowUpRight } from "../ui/Icons";

export function formatDate(date: string, locale: Locale) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat(localeMeta[locale].dateLocale, { day: "numeric", month: "long", year: "numeric" }).format(d);
}

export function BlogCard({
  post,
  locale,
  href,
  readMore,
  featured,
}: {
  post: BlogPost;
  locale: Locale;
  href: string;
  readMore: string;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative grid overflow-hidden rounded-[2rem] surface transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift",
        featured && "md:grid-cols-2",
      )}
    >
      <div className={cn("relative m-2 overflow-hidden rounded-[1.6rem] bg-cream-300", featured ? "aspect-[4/3] md:aspect-auto md:min-h-[26rem]" : "aspect-[4/3]")}>
        {post.image ? (
          <CloudImage
            src={post.image}
            alt=""
            fill
            sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className={cn("flex flex-col gap-4 p-6 md:p-8", featured && "md:justify-center md:p-12")}>
        <time dateTime={post.date} className="text-sm font-medium text-muted">
          {formatDate(post.date, locale)}
        </time>
        <h3 className={cn("font-semibold tracking-[-0.03em] text-ink", featured ? "text-h3 md:text-[2.1rem] md:leading-[1.1]" : "text-[1.3rem] leading-snug")}>
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {post.title[locale]}
          </Link>
        </h3>
        <p className="line-clamp-3 leading-relaxed text-muted">{post.excerpt[locale]}</p>
        <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-ink">
          {readMore}
          <span className="grid size-8 place-items-center rounded-full bg-ink text-cream-50 transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight size={15} />
          </span>
        </span>
      </div>
    </article>
  );
}
