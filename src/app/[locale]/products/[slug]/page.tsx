import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CloudImage } from "@/components/ui/CloudImage";
import { ArrowLeft, Check, Phone, Whatsapp } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { href, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getProduct, getProducts } from "@/lib/data";
import { absoluteUrl, JsonLd, ORG_ID, pageMetadata } from "@/lib/seo";
import { site, telLink, whatsappLink } from "@/lib/site";
import { format, truncate } from "@/lib/utils";

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await getProducts();
  return locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/products/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const product = await getProduct(slug);
  if (!product) return {};
  const t = await getDictionary(locale);
  const description = truncate(
    `${product.name}${product.size ? ` (${product.size})` : ""} — ${product.price} ₼. ${product.details || t.meta.products.description}`.replace(/\s+/g, " "),
    158,
  );
  return pageMetadata({
    locale,
    path: `/products/${product.slug}`,
    title: `${product.name}${product.size ? ` ${product.size}` : ""}`,
    description,
    image: product.image ? { url: product.image, alt: product.name } : undefined,
  });
}

export default async function ProductPage({ params }: PageProps<"/[locale]/products/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const [t, product, all] = await Promise.all([getDictionary(locale), getProduct(slug), getProducts()]);
  if (!product) notFound();
  if (product.slug !== slug) permanentRedirect(href(locale, `/products/${product.slug}`));

  const related = all.filter((p) => p.id !== product.id).slice(0, 3);
  const orderHref = whatsappLink(format(t.products.orderMessage, { name: product.name }));
  const paragraphs = product.details.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const labels = { order: t.products.order, details: t.products.details, orderMessage: t.products.orderMessage, currency: t.common.currency };
  const url = absoluteUrl(href(locale, `/products/${product.slug}`));

  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="container-x">
          <Reveal>
            <Breadcrumbs
              label={t.common.breadcrumb}
              items={[
                { name: t.nav.home, path: href(locale) },
                { name: t.nav.products, path: href(locale, "/products") },
                { name: product.name, path: href(locale, `/products/${product.slug}`) },
              ]}
            />
          </Reveal>

          <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal y={40} className="lg:sticky lg:top-28">
                <div className="relative aspect-square overflow-hidden rounded-[2.25rem] bg-[radial-gradient(70%_60%_at_50%_45%,#fff_0%,#fff6dc_55%,#fbe9c6_100%)] shadow-lift">
                  <div aria-hidden className="absolute left-1/2 top-[60%] h-1/2 w-2/3 -translate-x-1/2 rounded-full bg-honey-400/30 blur-3xl" />
                  {product.image ? (
                    <CloudImage
                      src={product.image}
                      alt={product.name}
                      fill
                      priority
                      maxWidth={1440}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="animate-float object-contain p-[14%] drop-shadow-[0_30px_30px_rgb(61_38_0/0.22)] motion-reduce:animate-none"
                    />
                  ) : null}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <div className="flex flex-wrap gap-2">
                  {product.size ? <span className="chip bg-honey-200/80 text-honey-900">{t.products.size}: {product.size}</span> : null}
                  {product.hashtags.slice(0, 3).map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-h1 mt-6 text-ink">{product.name}</h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-semibold leading-none tracking-[-0.05em] text-ink">
                    {product.price}
                  </span>
                  <span className="text-2xl font-medium text-muted">{t.common.currency}</span>
                  {product.size ? <span className="text-muted">/ {product.size}</span> : null}
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
                <a href={orderHref} target="_blank" rel="noopener noreferrer" className="btn btn-ink btn-lg">
                  <Whatsapp size={19} />
                  {t.products.order}
                </a>
                <a href={telLink} className="btn btn-ghost btn-lg">
                  <Phone size={18} />
                  {site.phoneDisplay}
                </a>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 text-sm text-muted">{t.products.orderNote}</p>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="mt-10 grid gap-2 sm:grid-cols-3">
                  {t.products.guarantees.map((g) => (
                    <li key={g} className="surface flex items-start gap-2.5 rounded-2xl p-4 text-sm font-medium text-ink-soft">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-honey-300 text-ink">
                        <Check size={12} strokeWidth={2.6} />
                      </span>
                      {g}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {paragraphs.length ? (
                <Reveal delay={0.1} className="mt-14 border-t hairline pt-10">
                  <h2 className="text-h3 text-ink">{t.products.about}</h2>
                  <div className="mt-6 space-y-5 text-[1.05rem] leading-[1.8] text-ink-soft">
                    {paragraphs.map((p, i) => (
                      <p key={i} className="whitespace-pre-line">
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ) : null}

              <Reveal className="mt-12">
                <Link href={href(locale, "/products")} className="group inline-flex items-center gap-2 font-semibold text-ink">
                  <span className="grid size-10 place-items-center rounded-full border hairline bg-white/70 transition-transform duration-500 group-hover:-translate-x-1">
                    <ArrowLeft size={17} />
                  </span>
                  {t.products.back}
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section aria-labelledby="related-title" className="section-y">
          <div className="container-x">
            <Reveal>
              <h2 id="related-title" className="text-h2 text-ink">
                {t.products.related}
              </h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} href={href(locale, `/products/${p.slug}`)} labels={labels} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": `${url}#product`,
          name: product.name,
          description: truncate(product.details || product.name, 4000),
          image: product.image ? [product.image] : undefined,
          sku: `balbee-${product.id}`,
          url,
          brand: { "@type": "Brand", name: site.name },
          category: "Food & Beverages > Food Items > Honey",
          ...(product.size ? { size: product.size } : {}),
          offers: {
            "@type": "Offer",
            url,
            price: product.price.toFixed(2),
            priceCurrency: "AZN",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": ORG_ID },
          },
        }}
      />
    </>
  );
}
