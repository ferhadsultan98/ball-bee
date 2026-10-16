import "server-only";
import sanitizeHtml from "sanitize-html";
import type { Locale } from "@/i18n/config";
import { slugify, stripHtml, truncate } from "./utils";

const DB_URL = process.env.FIREBASE_DATABASE_URL ?? "https://ball-bee-default-rtdb.firebaseio.com";
const REVALIDATE = 300;

export type Product = {
  id: string;
  slug: string;
  name: string;
  size: string;
  details: string;
  price: number;
  image: string;
  hashtags: string[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  content: Record<Locale, string>;
  image: string;
  date: string;
  author: string;
  tags: string[];
  viewCount: number;
};

export type GalleryItem = { index: number; src: string; title: string; description: string; likes: number };

async function read<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${DB_URL}/${path}.json`, {
      next: { revalidate: REVALIDATE, tags: [path.split("/")[0]] },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function entries<T>(data: T[] | Record<string, T> | null): [string, T][] {
  if (!data) return [];
  const list: [string, T][] = Array.isArray(data) ? data.map((v, i) => [String(i), v]) : Object.entries(data);
  return list.filter(([, v]) => v != null);
}

/* ---------------- Products ---------------- */

type RawProduct = {
  name?: string;
  description?: string;
  details?: string;
  price?: string | number;
  image?: string;
  hashtags?: string[] | string;
};

function toProduct(id: string, raw: RawProduct): Product {
  const name = (raw.name ?? "").trim();
  const tags = Array.isArray(raw.hashtags) ? raw.hashtags : String(raw.hashtags ?? "").split(",");
  return {
    id,
    slug: `${id}-${slugify(name) || "product"}`,
    name,
    size: (raw.description ?? "").trim(),
    details: (raw.details ?? "").trim(),
    price: Number.parseFloat(String(raw.price ?? "0").replace(",", ".")) || 0,
    image: raw.image?.startsWith("http") ? raw.image : "",
    hashtags: tags.map((t) => t.trim()).filter(Boolean),
  };
}

export async function getProducts(): Promise<Product[]> {
  const data = await read<RawProduct[] | Record<string, RawProduct>>("products");
  return entries(data)
    .map(([id, raw]) => toProduct(id, raw))
    .filter((p) => p.name);
}

export async function getProduct(slugOrId: string): Promise<Product | null> {
  const id = slugOrId.split("-")[0];
  if (!id) return null;
  const raw = await read<RawProduct>(`products/${encodeURIComponent(id)}`);
  return raw?.name ? toProduct(id, raw) : null;
}

/* ---------------- Blog ---------------- */

type Localized = Partial<Record<Locale, string>>;
type RawPost = {
  title?: Localized;
  excerpt?: Localized;
  content?: Localized;
  image?: string;
  date?: string;
  author?: string;
  hashtags?: string;
  viewCount?: number;
};

const SANITIZE: sanitizeHtml.IOptions = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "h1", "h2", "span"],
  allowedAttributes: { a: ["href", "title", "target", "rel"], img: ["src", "alt", "title"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }) },
};

function localized(value: Localized | undefined, html = false): Record<Locale, string> {
  const fallback = value?.az || value?.en || value?.ru || "";
  const pick = (l: Locale) => {
    const v = value?.[l]?.trim() ? (value[l] as string) : fallback;
    return html ? sanitizeHtml(v, SANITIZE) : v.trim();
  };
  return { az: pick("az"), en: pick("en"), ru: pick("ru") };
}

function toPost(id: string, raw: RawPost): BlogPost {
  const title = localized(raw.title);
  const content = localized(raw.content, true);
  const excerpt = localized(raw.excerpt);
  for (const l of ["az", "en", "ru"] as const) {
    if (!excerpt[l]) excerpt[l] = truncate(stripHtml(content[l]), 180);
  }
  return {
    id,
    slug: `${id}-${slugify(title.en || title.az) || "post"}`,
    title,
    excerpt,
    content,
    image: raw.image?.startsWith("http") ? raw.image : "",
    date: raw.date ?? "",
    author: raw.author ?? "BalBee",
    tags: String(raw.hashtags ?? "")
      .split(/[,\s]+/)
      .map((t) => t.replace(/^#/, "").trim())
      .filter(Boolean),
    viewCount: raw.viewCount ?? 0,
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  const data = await read<Record<string, RawPost>>("blogPosts");
  return entries(data)
    .map(([id, raw]) => toPost(id, raw))
    .filter((p) => p.title.az || p.title.en)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slugOrId: string): Promise<BlogPost | null> {
  const id = slugOrId.split("-")[0];
  if (!id) return null;
  const raw = await read<RawPost>(`blogPosts/${encodeURIComponent(id)}`);
  return raw?.title ? toPost(id, raw) : null;
}

export function readingMinutes(html: string): number {
  return Math.max(1, Math.round(stripHtml(html).split(" ").length / 200));
}

/* ---------------- Gallery ---------------- */

type RawGallery = { src?: string; title?: string; description?: string; likes?: number };

export async function getGallery(): Promise<GalleryItem[]> {
  const data = await read<RawGallery[] | Record<string, RawGallery>>("gallery");
  return entries(data)
    .map(([key, g]) => ({
      index: Number(key),
      src: g.src ?? "",
      title: g.title ?? "BalBee",
      description: g.description ?? "",
      likes: g.likes ?? 0,
    }))
    .filter((g) => g.src.startsWith("https://res.cloudinary.com/"));
}
