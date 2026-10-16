import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import honey from "@/assets/images/honey.jpg";
import jars from "@/assets/images/jars.jpg";
import { Quotes } from "@/components/home/Quotes";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Drop, Leaf, Shield } from "@/components/ui/Icons";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Accent } from "@/components/ui/Section";
import { href, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

const VALUE_ICONS = [Leaf, Drop, Shield];

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: t.meta.about.title, description: t.meta.about.description });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <>
      <PageHero
        title={t.about.heroTitle}
        lead={t.about.heroLead}
        crumbs={[
          { name: t.nav.home, path: href(locale) },
          { name: t.about.heroTitle, path: href(locale, "/about") },
        ]}
        crumbLabel={t.common.breadcrumb}
        image={honey}
      />

      {/* Story */}
      <section aria-labelledby="story-title" className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow mb-5">
                  <span className="h-px w-6 bg-current opacity-50" aria-hidden />
                  {t.about.storyEyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id="story-title" className="text-h2 text-ink">
                  <Accent text={t.about.storyTitle} />
                </h2>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-[clamp(1.25rem,1.05rem+0.7vw,1.6rem)] leading-[1.55] tracking-[-0.015em] text-ink-soft">
                {t.about.storyText}
              </p>
            </Reveal>
            <Parallax speed={40} className="mt-14">
              <figure className="relative aspect-square overflow-hidden rounded-[2rem] shadow-lift">
                <Image src={jars} alt="BalBee" fill placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </figure>
            </Parallax>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="pb-24 md:pb-36">
        <div className="container-x">
          <Reveal>
            <h2 id="values-title" className="text-h2 text-ink">
              {t.about.valuesTitle}
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {t.about.values.map((value, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <StaggerItem key={value.title} className="surface group flex flex-col gap-14 rounded-[2rem] p-8">
                  <div className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-honey-200/70 text-honey-700 transition-transform duration-700 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110">
                      <Icon size={24} />
                    </span>
                    <span className="text-sm font-medium tabular-nums text-muted">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-h3 text-ink">{value.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{value.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Benefits list */}
      <section aria-labelledby="benefits-list-title" className="pb-24 md:pb-36">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="benefits-list-title" className="text-h2 text-ink">
              {t.about.benefitsTitle}
            </h2>
          </Reveal>
          <ol className="lg:col-span-8">
            {t.benefits.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.05} className="group grid grid-cols-[3rem_1fr] gap-4 border-t hairline py-7 last:border-b md:grid-cols-[4rem_1fr_1.2fr] md:items-baseline md:py-9">
                <span className="text-sm font-medium tabular-nums text-honey-700">0{i + 1}</span>
                <h3 className="text-h3 text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5">{item.title}</h3>
                <p className="col-start-2 leading-relaxed text-muted md:col-start-3">{item.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Quotes t={t.quotes} labels={{ prev: t.gallery.prev, next: t.gallery.next }} />
      <CtaBand t={t.cta} greeting={t.common.whatsappGreeting} />
    </>
  );
}
