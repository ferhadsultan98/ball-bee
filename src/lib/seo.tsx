import type { Metadata } from "next";
import { defaultLocale, href, localeMeta, locales, type Locale } from "@/i18n/config";
import { SITE_URL, site } from "./site";

export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: "BalBee — natural honey" };

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** hreflang map for a locale-independent path, e.g. "/products" */
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = href(l, path);
  map["x-default"] = href(defaultLocale, path);
  return map;
}

type PageMetaInput = {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article";
  publishedTime?: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  type = "website",
  publishedTime,
  absoluteTitle,
  noindex,
}: PageMetaInput): Metadata {
  const images = [image ?? OG_IMAGE];
  return {
    title: title ? (absoluteTitle ? { absolute: title } : title) : undefined,
    description,
    alternates: { canonical: href(locale, path), languages: languageAlternates(path) },
    openGraph: {
      type,
      url: href(locale, path),
      siteName: site.name,
      title: title ?? site.name,
      description,
      locale: localeMeta[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].og),
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: title ?? site.name, description, images: images.map((i) => i.url) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ---------------- JSON-LD ---------------- */

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes quotes; replace "<" to avoid </script> injection.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationGraph(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": ORG_ID,
        name: site.name,
        legalName: site.legalName,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png"), width: 500, height: 500 },
        image: absoluteUrl("/og.jpg"),
        description,
        telephone: site.phone,
        priceRange: "₼₼",
        currenciesAccepted: "AZN",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        hasMap: site.mapUrl,
        areaServed: { "@type": "Country", name: "Azerbaijan" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: site.hours.days,
            opens: site.hours.opens,
            closes: site.hours.closes,
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone,
          contactType: "customer service",
          availableLanguage: ["az", "en", "ru"],
        },
        sameAs: Object.values(site.socials),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: site.name,
        inLanguage: locale,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
