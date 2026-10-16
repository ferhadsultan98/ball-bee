import type { MetadataRoute } from "next";
import { href, locales } from "@/i18n/config";
import { getPosts, getProducts } from "@/lib/data";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { topicKeys } from "@/lib/topics";

export const revalidate = 3600;

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; lastModified?: string; images?: string[] };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([getProducts(), getPosts()]);
  const now = new Date().toISOString();

  const entries: Entry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.6, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    ...topicKeys.map((k) => ({ path: `/learn/${k}`, priority: 0.6, changeFrequency: "yearly" as const })),
    ...products.map((p) => ({
      path: `/products/${p.slug}`,
      priority: 0.8,
      changeFrequency: "weekly" as const,
      images: p.image ? [p.image] : undefined,
    })),
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
      lastModified: p.date ? new Date(p.date).toISOString() : undefined,
      images: p.image ? [p.image] : undefined,
    })),
  ];

  return entries.flatMap((e) =>
    locales.map((locale) => ({
      url: absoluteUrl(href(locale, e.path)),
      lastModified: e.lastModified ?? now,
      changeFrequency: e.changeFrequency,
      priority: e.priority,
      alternates: {
        languages: Object.fromEntries(Object.entries(languageAlternates(e.path)).map(([k, v]) => [k, absoluteUrl(v)])),
      },
      ...(e.images ? { images: e.images } : {}),
    })),
  );
}
