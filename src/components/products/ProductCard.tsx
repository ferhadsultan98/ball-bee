import Link from "next/link";
import type { Product } from "@/lib/data";
import { whatsappLink } from "@/lib/site";
import { cn, format } from "@/lib/utils";
import { CloudImage } from "../ui/CloudImage";
import { ArrowUpRight, Whatsapp } from "../ui/Icons";

type Labels = { order: string; details: string; orderMessage: string; currency: string };

export function ProductCard({
  product,
  href,
  labels,
  priority,
  className,
}: {
  product: Product;
  href: string;
  labels: Labels;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] surface transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative m-2 aspect-square overflow-hidden rounded-[1.6rem] bg-[radial-gradient(70%_60%_at_50%_45%,#fff_0%,#fff6dc_55%,#fbe9c6_100%)]">
        <div
          aria-hidden
          className="absolute left-1/2 top-[58%] h-1/2 w-2/3 -translate-x-1/2 rounded-full bg-honey-400/25 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-60"
        />
        {product.image ? (
          <CloudImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            maxWidth={1080}
            priority={priority}
            className="object-contain p-[12%] drop-shadow-[0_24px_24px_rgb(61_38_0/0.18)] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:scale-[1.04]"
          />
        ) : null}
        {product.size ? (
          <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-ink-soft">
            {product.size}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-3 md:px-6 md:pb-6">
        <h3 className="text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:z-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-3">
          <p className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-ink">
            {product.price}
            <span className="ml-1 text-[1.1rem] font-medium text-muted">{labels.currency}</span>
          </p>
          <div className="relative z-10 flex items-center gap-2">
            <a
              href={whatsappLink(format(labels.orderMessage, { name: product.name }))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${labels.order}: ${product.name}`}
              className="btn btn-ink btn-sm"
            >
              <Whatsapp size={16} />
              <span className="hidden sm:inline">{labels.order}</span>
            </a>
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-full border hairline bg-white/70 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-white"
            >
              <ArrowUpRight size={17} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
