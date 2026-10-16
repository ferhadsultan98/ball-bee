import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/az";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  az: () => import("./dictionaries/az").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  ru: () => import("./dictionaries/ru").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => loaders[locale]();
