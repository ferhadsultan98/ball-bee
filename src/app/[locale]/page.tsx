import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { Apiary } from "@/components/home/Apiary";
import { Benefits } from "@/components/home/Benefits";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Quotes } from "@/components/home/Quotes";
import { TopicsScroller } from "@/components/home/TopicsScroller";
import { ProductCard } from "@/components/products/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Marquee } from "@/components/ui/Marquee";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Accent, SectionHeading } from "@/components/ui/Section";
import { href, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPosts, getProducts } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";
import { topicImages, topicKeys } from "@/lib/topics";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return pageMetadata({ locale, path: "/", title: t.meta.defaultTitle, absoluteTitle: true, description: t.meta.description });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [t, products, posts] = await Promise.all([getDictionary(locale), getProducts(), getPosts()]);

  const topics = topicKeys.map((key) => ({
    key,
    title: t.topics.items[key].title,
    short: t.topics.items[key].short,
    desc: t.topics.items[key].desc,
    href: href(locale, `/learn/${key}`),
    image: topicImages[key],
  }));

  const productLabels = {
    order: t.products.order,
    details: t.products.details,
    orderMessage: t.products.orderMessage,
    currency: t.common.currency,
  };

  return (
    <>
      <Hero
        t={t.hero}
        productsHref={href(locale, "/products")}
        whatsappHref={whatsappLink(t.common.whatsappGreeting)}
      />

      <div className="border-y hairline py-6 md:py-8">
        <Marquee items={t.marquee} className="text-[clamp(1.4rem,1rem+1.6vw,2.4rem)] font-semibold tracking-[-0.03em] text-ink/85" />
      </div>

      <Manifesto t={t.manifesto} />

      <TopicsScroller
        eyebrow={t.topics.eyebrow}
        title={t.topics.title}
        lead={t.topics.lead}
        readMore={t.topics.readMore}
        items={topics}
      />

      {products.length > 0 ? (
        <section aria-labelledby="products-title" className="section-y">
          <div className="container-x">
            <SectionHeading
              eyebrow={t.products.eyebrow}
              title={
                <span id="products-title">
                  <Accent text={t.products.title} />
                </span>
              }
              lead={t.products.lead}
              action={{ href: href(locale, "/products"), label: t.common.viewAll }}
            />
            <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
              {products.slice(0, 6).map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard
                    product={product}
                    href={href(locale, `/products/${product.slug}`)}
                    labels={productLabels}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <Benefits t={t.benefits} />

      <Apiary t={t.apiary} badges={[t.hero.facts[0].label, t.hero.facts[1].value]} />

      <Quotes t={t.quotes} labels={{ prev: t.gallery.prev, next: t.gallery.next }} />

      {posts.length > 0 ? (
        <section aria-labelledby="blog-title" className="section-y">
          <div className="container-x">
            <SectionHeading
              eyebrow={t.blog.eyebrow}
              title={
                <span id="blog-title">
                  <Accent text={t.blog.title} />
                </span>
              }
              lead={t.blog.lead}
              action={posts.length > 1 ? { href: href(locale, "/blog"), label: t.common.viewAll } : undefined}
            />
            <Stagger className={posts.length === 1 ? "mt-14 md:mt-20" : "mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-3"}>
              {posts.slice(0, 3).map((post) => (
                <StaggerItem key={post.id}>
                  <BlogCard
                    post={post}
                    locale={locale}
                    href={href(locale, `/blog/${post.slug}`)}
                    readMore={t.blog.readMore}
                    featured={posts.length === 1}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <CtaBand t={t.cta} greeting={t.common.whatsappGreeting} />
    </>
  );
}
