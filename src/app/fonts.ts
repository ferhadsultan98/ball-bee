import { Cormorant_Garamond, Onest } from "next/font/google";

/** Single source of truth for the site's typefaces (supports Azerbaijani, Russian and English). */
export const sans = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans-face",
  display: "swap",
});

export const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-serif-face",
  display: "swap",
});

export const fontVariables = `${sans.variable} ${serif.variable}`;
