import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { href, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPosts } from "@/lib/data";
import { absoluteUrl, JsonLd, ORG_ID, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return pageMetadata({ locale, path: "/blog", title: t.meta.blog.title, description: t.meta.blog.description });
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [t, posts] = await Promise.all([getDictionary(locale), getPosts()]);
  const [first, ...rest] = posts;

  return (
    <>
      <PageHero
        title={t.blog.heroTitle}
        lead={t.blog.lead}
        crumbs={[
          { name: t.nav.home, path: href(locale) },
          { name: t.blog.heroTitle, path: href(locale, "/blog") },
        ]}
        crumbLabel={t.common.breadcrumb}
      />
      <section aria-label={t.blog.heroTitle} className="pb-10 pt-14 md:pt-20">
        <div className="container-x">
          {first ? (
            <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StaggerItem className="md:col-span-2 lg:col-span-3">
                <BlogCard post={first} locale={locale} href={href(locale, `/blog/${first.slug}`)} readMore={t.blog.readMore} featured />
              </StaggerItem>
              {rest.map((post) => (
                <StaggerItem key={post.id}>
                  <BlogCard post={post} locale={locale} href={href(locale, `/blog/${post.slug}`)} readMore={t.blog.readMore} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <p className="surface rounded-[2rem] p-10 text-center text-lead text-muted">{t.blog.empty}</p>
          )}
        </div>
      </section>
      <CtaBand t={t.cta} greeting={t.common.whatsappGreeting} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: t.meta.blog.title,
          url: absoluteUrl(href(locale, "/blog")),
          inLanguage: locale,
          publisher: { "@id": ORG_ID },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title[locale],
            url: absoluteUrl(href(locale, `/blog/${p.slug}`)),
            datePublished: p.date,
          })),
        }}
      />
    </>
  );
}
