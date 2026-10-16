"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { href, isLocale, defaultLocale } from "@/i18n/config";
import az from "@/i18n/dictionaries/az";
import en from "@/i18n/dictionaries/en";
import ru from "@/i18n/dictionaries/ru";
import { ArrowLeft } from "@/components/ui/Icons";

const dicts = { az, en, ru };

export default function NotFound() {
  const segment = usePathname()?.split("/")[1];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const t = dicts[locale].notFound;

  return (
    <section className="container-x flex min-h-[80svh] flex-col items-center justify-center pt-28 text-center">
      <p className="text-[clamp(7rem,4rem+14vw,15rem)] font-semibold leading-none tracking-[-0.07em] text-transparent [background-clip:text] [-webkit-background-clip:text] bg-[linear-gradient(180deg,var(--color-honey-400),rgb(233_161_11/0.15))]">
        404
      </p>
      <h1 className="text-h2 mt-4 text-ink">{t.title}</h1>
      <p className="text-lead mt-4 max-w-md text-muted">{t.lead}</p>
      <Link href={href(locale)} className="btn btn-ink btn-lg mt-10">
        <ArrowLeft size={17} />
        {t.home}
      </Link>
    </section>
  );
}
