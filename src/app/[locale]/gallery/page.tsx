import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { href, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getGallery } from "@/lib/data";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return pageMetadata({ locale, path: "/gallery", title: t.meta.gallery.title, description: t.meta.gallery.description });
}

export default async function GalleryPage({ params }: PageProps<"/[locale]/gallery">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [t, items] = await Promise.all([getDictionary(locale), getGallery()]);

  return (
    <>
      <PageHero
        title={t.gallery.heroTitle}
        lead={t.gallery.heroLead}
        crumbs={[
          { name: t.nav.home, path: href(locale) },
          { name: t.gallery.heroTitle, path: href(locale, "/gallery") },
        ]}
        crumbLabel={t.common.breadcrumb}
      />
      <section aria-label={t.gallery.heroTitle} className="pb-10 pt-14 md:pt-20">
        <div className="container-x">
          {items.length ? (
            <GalleryGrid
              items={items}
              labels={{
                likes: t.gallery.likes,
                like: t.gallery.like,
                unlike: t.gallery.unlike,
                open: t.gallery.open,
                close: t.gallery.close,
                prev: t.gallery.prev,
                next: t.gallery.next,
              }}
            />
          ) : (
            <p className="surface rounded-[2rem] p-10 text-center text-lead text-muted">{t.gallery.empty}</p>
          )}
        </div>
      </section>
      <CtaBand t={t.cta} greeting={t.common.whatsappGreeting} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: t.meta.gallery.title,
          description: t.meta.gallery.description,
          image: items.map((i) => ({ "@type": "ImageObject", contentUrl: i.src, name: i.title })),
        }}
      />
    </>
  );
}
