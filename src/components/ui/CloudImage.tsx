import { cn } from "@/lib/utils";

const WIDTHS = [320, 480, 640, 800, 1080, 1440, 1920];

/** Builds a Cloudinary delivery URL with automatic format/quality and a width limit. */
export function cld(url: string, width: number, extra = ""): string {
  if (!url.includes("/image/upload/")) return url;
  return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,c_limit,w_${width}${extra ? `,${extra}` : ""}/`);
}

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  maxWidth?: number;
  width?: number;
  height?: number;
};

/**
 * Responsive image served straight from Cloudinary's CDN (no server-side proxying).
 * `fill` makes it cover its positioned parent like next/image.
 */
export function CloudImage({ src, alt, sizes, className, fill, priority, maxWidth = 1920, width, height }: Props) {
  const widths = WIDTHS.filter((w) => w <= maxWidth);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cld(src, widths[widths.length - 1] ?? maxWidth)}
      srcSet={widths.map((w) => `${cld(src, w)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
    />
  );
}
