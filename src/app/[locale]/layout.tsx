import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { VisitorLog } from "@/components/layout/VisitorLog";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { JsonLd, organizationGraph, pageMetadata } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";
import { fontVariables } from "../fonts";
import "../globals.css";


export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff6dc",
  colorScheme: "light",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    ...pageMetadata({ locale, path: "/", description: t.meta.description }),
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.defaultTitle, template: `%s — ${site.name}` },
    applicationName: site.name,
    keywords: t.meta.keywords,
    authors: [{ name: site.name, url: SITE_URL }],
    creator: site.name,
    publisher: site.name,
    category: "food",
    formatDetection: { telephone: false, address: false, email: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    appleWebApp: { title: site.name, statusBarStyle: "default" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <html lang={locale} className={fontVariables}>
      <head>
        <noscript>
          <style>{"[style*=\"opacity:0\"]{opacity:1!important;transform:none!important;filter:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream-50"
        >
          {t.nav.skip}
        </a>
        <SmoothScroll>
          <Header locale={locale} nav={t.nav} greeting={t.common.whatsappGreeting} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} dict={t} />
          <BackToTop label={t.common.backToTop} />
        </SmoothScroll>
        <VisitorLog />
        <JsonLd data={organizationGraph(locale, t.meta.description)} />
      </body>
    </html>
  );
}
