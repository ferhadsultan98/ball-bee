import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { ParallaxImage, Reveal, SplitWords, Stagger, StaggerItem } from "@/components/ui/motion";
import { href, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, JsonLd, ORG_ID, pageMetadata } from "@/lib/seo";
import { isTopic, topicImages, topicKeys } from "@/lib/topics";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => topicKeys.map((topic) => ({ locale, topic })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/learn/[topic]">): Promise<Metadata> {
  const { locale, topic } = await params;
  if (!isLocale(locale) || !isTopic(topic)) return {};
  const t = await getDictionary(locale);
  const item = t.topics.items[topic];
  return pageMetadata({
    locale,
    path: `/learn/${topic}`,
    title: item.title,
    description: item.desc,
    type: "article",
    image: { url: topicImages[topic].src, width: topicImages[topic].width, height: topicImages[topic].height, alt: item.title },
  });
}

export default async function TopicPage({ params }: PageProps<"/[locale]/learn/[topic]">) {
  const { locale, topic } = await params;
  if (!isLocale(locale) || !isTopic(topic)) notFound();
  const t = await getDictionary(locale);
  const item = t.topics.items[topic];
  const index = topicKeys.indexOf(topic);
  const next = topicKeys[(index + 1) % topicKeys.length];

  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="container-x">
          <Reveal>
            <Breadcrumbs
              label={t.common.breadcrumb}
              items={[
                { name: t.nav.home, path: href(locale) },
                { name: t.topics.eyebrow, path: href(locale, `/learn/${topicKeys[0]}`) },
                { name: item.title, path: href(locale, `/learn/${topic}`) },
              ]}
            />
          </Reveal>
          <div className="mt-10 grid items-end gap-8 md:mt-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="eyebrow mb-5">
                  <span className="h-px w-6 bg-current opacity-50" aria-hidden />
                  {item.short} · 0{index + 1}
                </p>
              </Reveal>
              <h1 className="text-h1 text-ink">
                <SplitWords text={item.title} delay={0.1} />
              </h1>
            </div>
            <Reveal delay={0.3} className="lg:col-span-4 lg:pb-3">
              <p className="text-lead text-muted">{item.desc}</p>
            </Reveal>
          </div>
        </div>
        <div className="px-2 md:px-4">
          <Reveal delay={0.2} y={40}>
            <ParallaxImage
              src={topicImages[topic]}
              alt={item.title}
              placeholder="blur"
              preload
              sizes="100vw"
              className="mt-14 h-[44vh] min-h-[18rem] rounded-[1.75rem] md:mt-20 md:h-[66vh] md:rounded-[2.5rem]"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4" aria-label={t.topics.explore}>
            <div className="lg:sticky lg:top-32">
              <h2 className="eyebrow mb-5 text-muted">{t.topics.explore}</h2>
              <ul className="space-y-1.5">
                {topicKeys.map((k) => {
                  const active = k === topic;
                  return (
                    <li key={k}>
                      <Link
                        href={href(locale, `/learn/${k}`)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex items-center gap-4 rounded-2xl p-2.5 pr-4 transition-colors duration-300",
                          active ? "surface" : "hover:bg-white/60",
                        )}
                      >
                        <span className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                          <Image src={topicImages[k]} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                        <span className={cn("flex-1 font-medium leading-snug", active ? "text-ink" : "text-ink-soft")}>
                          {t.topics.items[k].title}
                        </span>
                        <ArrowUpRight size={16} className="text-muted transition-transform duration-500 group-hover:rotate-45" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <article className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-h2 text-ink">{t.topics.keyPoints}</h2>
            <Stagger as="ol" className="mt-10 space-y-3">
              {item.points.map((point, i) => (
                <StaggerItem as="li" key={i} className="surface flex gap-5 rounded-[1.75rem] p-6 md:p-8">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-honey-300 text-sm font-semibold tabular-nums text-ink">
                    0{i + 1}
                  </span>
                  <p className="pt-2 text-[1.08rem] leading-relaxed text-ink-soft">{point}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link href={href(locale, "/products")} className="btn btn-ink btn-lg">
                {t.hero.primary}
                <span className="btn-icon">
                  <ArrowRight size={16} />
                </span>
              </Link>
              <Link href={href(locale)} className="btn btn-ghost btn-lg">
                <ArrowLeft size={17} />
                {t.topics.backHome}
              </Link>
            </div>

            <Link
              href={href(locale, `/learn/${next}`)}
              className="group relative mt-16 flex items-center justify-between gap-6 overflow-hidden rounded-[2rem] bg-ink p-7 text-white md:p-10"
            >
              <Image src={topicImages[next]} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-0 object-cover opacity-35 transition-transform duration-[1.4s] group-hover:scale-105" />
              <span className="relative">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-honey-300">{t.common.learnMore}</span>
                <span className="text-h3 mt-2 block">{t.topics.items[next].title}</span>
              </span>
              <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-700 group-hover:rotate-45">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          </article>
        </div>
      </section>

      <CtaBand t={t.cta} greeting={t.common.whatsappGreeting} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: item.title,
          description: item.desc,
          image: absoluteUrl(topicImages[topic].src),
          inLanguage: locale,
          mainEntityOfPage: absoluteUrl(href(locale, `/learn/${topic}`)),
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
        }}
      />
    </>
  );
}
