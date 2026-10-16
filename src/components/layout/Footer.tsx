import Link from "next/link";
import { href, localeMeta, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/az";
import { site, telLink, whatsappLink } from "@/lib/site";
import { ArrowUpRight, Facebook, Instagram, Whatsapp } from "../ui/Icons";
import { Logo } from "../ui/Logo";
import { FooterWordmark } from "./FooterWordmark";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { nav, footer, contact } = dict;
  const year = new Date().getFullYear();
  const explore = [
    { href: href(locale, "/about"), label: nav.about },
    { href: href(locale, "/products"), label: nav.products },
    { href: href(locale, "/gallery"), label: nav.gallery },
    { href: href(locale, "/blog"), label: nav.blog },
    { href: href(locale, "/contact"), label: nav.contact },
  ];
  const socials = [
    { href: site.socials.instagram, label: "Instagram", Icon: Instagram },
    { href: site.socials.facebook, label: "Facebook", Icon: Facebook },
    { href: whatsappLink(dict.common.whatsappGreeting), label: "WhatsApp", Icon: Whatsapp },
  ];

  return (
    <footer className="relative mt-10 overflow-hidden border-t hairline bg-cream-50/40">
      <div className="container-x pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href={href(locale)} aria-label={site.name} className="inline-block">
              <Logo size={96} />
            </Link>
            <p className="mt-6 max-w-sm text-lead text-muted">{footer.tagline}</p>
            <ul className="mt-8 flex gap-2">
              {socials.map(({ href: url, label, Icon }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border hairline bg-white/60 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                  >
                    <Icon size={19} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={footer.explore} className="md:col-span-3">
            <h2 className="eyebrow mb-6 text-muted">{footer.explore}</h2>
            <ul className="space-y-3">
              {explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline text-[1.05rem] font-medium text-ink-soft hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="eyebrow mb-6 text-muted">{footer.contact}</h2>
            <address className="space-y-3 not-italic text-[1.05rem] text-ink-soft">
              <p>
                <a href={telLink} className="link-underline font-medium text-ink">
                  {site.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-1.5 hover:text-ink">
                  {contact.location}
                  <ArrowUpRight size={16} className="mt-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </p>
              <p className="text-muted">{contact.hoursValue}</p>
            </address>
            <div className="mt-8 flex gap-1.5" role="group" aria-label={nav.language}>
              {locales.map((l) => (
                <Link
                  key={l}
                  href={href(l)}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? "true" : undefined}
                  className={
                    l === locale
                      ? "chip bg-ink text-cream-50"
                      : "chip bg-transparent ring-1 ring-line transition-colors hover:bg-white"
                  }
                >
                  {localeMeta[l].name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FooterWordmark />

      <div className="container-x">
        <div className="flex flex-col gap-3 border-t hairline py-7 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. {footer.rights}
          </p>
          <a href={site.author.url} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ink">
            {footer.createdBy}
          </a>
        </div>
      </div>
    </footer>
  );
}
