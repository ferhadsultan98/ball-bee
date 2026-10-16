export const locales = ["az", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "az";

export const localeMeta: Record<Locale, { label: string; name: string; og: string; dateLocale: string }> = {
  az: { label: "AZ", name: "Azərbaycanca", og: "az_AZ", dateLocale: "az-Latn-AZ" },
  en: { label: "EN", name: "English", og: "en_US", dateLocale: "en-GB" },
  ru: { label: "RU", name: "Русский", og: "ru_RU", dateLocale: "ru-RU" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Prefix a site-relative path with the locale: href("en", "/products") -> "/en/products" */
export function href(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}
