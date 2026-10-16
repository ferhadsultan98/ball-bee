import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogCard, formatDate } from "@/components/blog/BlogCard";
import { ViewCounter } from "@/components/blog/ViewCounter";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CloudImage } from "@/components/ui/CloudImage";
import { ArrowLeft, Calendar, Clock } from "@/components/ui/Icons";
import { Reveal, SplitWords, Stagger, StaggerItem } from "@/components/ui/motion";
import { href, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPost, getPosts, readingMinutes } from "@/lib/data";
import { absoluteUrl, JsonLd, ORG_ID, pageMetadata } from "@/lib/seo";
import { format, truncate } from "@/lib/utils";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts();
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: post.title[locale],
    description: truncate(post.excerpt[locale], 158),
    type: "article",
    publishedTime: post.date || undefined,
    image: post.image ? { url: post.image, alt: post.title[locale] } : undefined,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const [t, post, all] = await Promise.all([getDictionary(locale), getPost(slug), getPosts()]);
  if (!post) notFound();
  if (post.slug !== slug) permanentRedirect(href(locale, `/blog/${post.slug}`));

  const more = all.filter((p) => p.id !== post.id).slice(0, 3);
  const url = absoluteUrl(href(locale, `/blog/${post.slug}`));
  const minutes = readingMinutes(post.content[locale]);

  return (
    <>
      <article>
        <header className="pt-32 md:pt-40">
          <div className="container-x">
            <Reveal>
              <Breadcrumbs
                label={t.common.breadcrumb}
                items={[
                  { name: t.nav.home, path: href(locale) },
                  { name: t.nav.blog, path: href(locale, "/blog") },
                  { name: truncate(post.title[locale], 48), path: href(locale, `/blog/${post.slug}`) },
                ]}
              />
            </Reveal>
            <div className="mx-auto mt-12 max-w-4xl text-center md:mt-16">
              <h1 className="text-[clamp(2.1rem,1.3rem+3.4vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">
                <SplitWords text={post.title[locale]} delay={0.1} stagger={0.04} />
              </h1>
              <Reveal delay={0.35}>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted">
                  <span>
                    {t.blog.by} <span className="text-ink">{post.author}</span>
                  </span>
                  {post.date ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={16} />
                      <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={16} />
                    {format(t.blog.readingTime, { n: minutes })}
                  </span>
                  <ViewCounter postId={post.id} initial={post.viewCount} label={t.blog.views} />
                </div>
              </Reveal>
            </div>
          </div>
          {post.image ? (
            <div className="px-2 md:px-4">
              <Reveal delay={0.2} y={40}>
                <div className="relative mx-auto mt-14 aspect-[16/9] max-w-[1400px] overflow-hidden rounded-[1.75rem] md:mt-20 md:rounded-[2.5rem]">
                  <CloudImage src={post.image} alt={post.title[locale]} fill priority sizes="100vw" className="object-cover" />
                </div>
              </Reveal>
            </div>
          ) : null}
        </header>

        <div className="container-x py-16 md:py-24">
          <div className="mx-auto max-w-[44rem]">
            <div className="prose-honey" dangerouslySetInnerHTML={{ __html: post.content[locale] }} />
            {post.tags.length ? (
              <div className="mt-14 border-t hairline pt-8">
                <h2 className="eyebrow mb-4 text-muted">{t.blog.tags}</h2>
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag} className="chip">
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Link href={href(locale, "/blog")} className="group mt-12 inline-flex items-center gap-2 font-semibold text-ink">
              <span className="grid size-10 place-items-center rounded-full border hairline bg-white/70 transition-transform duration-500 group-hover:-translate-x-1">
                <ArrowLeft size={17} />
              </span>
              {t.blog.back}
            </Link>
          </div>
        </div>
      </article>

      {more.length ? (
        <section aria-labelledby="more-title" className="pb-16">
          <div className="container-x">
            <h2 id="more-title" className="text-h2 text-ink">
              {t.blog.more}
            </h2>
            <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <StaggerItem key={p.id}>
                  <BlogCard post={p} locale={locale} href={href(locale, `/blog/${p.slug}`)} readMore={t.blog.readMore} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <CtaBand t={t.cta} greeting={t.common.whatsappGreeting} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          headline: truncate(post.title[locale], 110),
          description: post.excerpt[locale],
          image: post.image ? [post.image] : undefined,
          datePublished: post.date || undefined,
          dateModified: post.date || undefined,
          inLanguage: locale,
          wordCount: post.content[locale].replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length,
          keywords: post.tags.join(", "),
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          author: { "@type": "Person", name: post.author },
          publisher: { "@id": ORG_ID },
        }}
      />
    </>
  );
}
