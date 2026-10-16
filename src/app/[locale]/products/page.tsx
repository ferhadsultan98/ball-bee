import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Check } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { href, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getProducts } from "@/lib/data";
import { absoluteUrl, JsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/[locale]/products">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return pageMetadata({ locale, path: "/products", title: t.meta.products.title, description: t.meta.products.description });
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [t, products] = await Promise.all([getDictionary(locale), getProducts()]);
  const labels = { order: t.products.order, details: t.products.details, orderMessage: t.products.orderMessage, currency: t.common.currency };

  return (
    <>
      <PageHero
        title={t.products.heroTitle}
        lead={t.products.heroLead}
        crumbs={[
          { name: t.nav.home, path: href(locale) },
          { name: t.products.heroTitle, path: href(locale, "/products") },
        ]}
        crumbLabel={t.common.breadcrumb}
      >
        <Reveal delay={0.35}>
          <ul className="mt-10 flex flex-wrap gap-2">
            {t.products.guarantees.map((g) => (
              <li key={g} className="chip h-9 bg-white/70 px-4 ring-1 ring-white">
                <Check size={15} className="text-honey-600" />
                {g}
              </li>
            ))}
          </ul>
        </Reveal>
      </PageHero>

      <section aria-label={t.products.heroTitle} className="pb-10 pt-14 md:pt-20">
        <div className="container-x">
          {products.length ? (
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} href={href(locale, `/products/${product.slug}`)} labels={labels} priority={i < 3} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <p className="surface rounded-[2rem] p-10 text-center text-lead text-muted">{t.products.empty}</p>
          )}
        </div>
      </section>

      <CtaBand t={t.cta} greeting={t.common.whatsappGreeting} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: t.meta.products.title,
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(href(locale, `/products/${p.slug}`)),
            name: p.name,
          })),
        }}
      />
    </>
  );
}
