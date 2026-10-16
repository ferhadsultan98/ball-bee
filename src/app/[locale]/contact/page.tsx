import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowUpRight, Clock, Facebook, Globe, Instagram, MapPin, Phone, Whatsapp } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { LogoMark } from "@/components/ui/Logo";
import { href, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, JsonLd, ORG_ID, pageMetadata } from "@/lib/seo";
import { site, telLink, whatsappLink } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return pageMetadata({ locale, path: "/contact", title: t.meta.contact.title, description: t.meta.contact.description });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const c = t.contact;

  const rows = [
    { Icon: Phone, label: c.phone, value: site.phoneDisplay, href: telLink },
    { Icon: Whatsapp, label: c.whatsapp, value: site.phoneDisplay, href: whatsappLink(t.common.whatsappGreeting), external: true },
    { Icon: MapPin, label: c.address, value: c.location, href: site.mapUrl, external: true, cta: c.viewMap },
    { Icon: Clock, label: c.hours, value: c.hoursValue },
    { Icon: Globe, label: c.web, value: "balbee.az", href: "https://balbee.az" },
  ];

  return (
    <>
      <PageHero
        title={c.heroTitle}
        lead={c.heroLead}
        crumbs={[
          { name: t.nav.home, path: href(locale) },
          { name: c.heroTitle, path: href(locale, "/contact") },
        ]}
        crumbLabel={t.common.breadcrumb}
      />

      <section aria-label={c.heroTitle} className="pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="container-x grid gap-4 lg:grid-cols-12">
          {/* Primary card */}
          <Reveal className="lg:col-span-5" y={40}>
            <div className="relative isolate flex h-full min-h-[28rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-8 text-cream-50 md:p-10">
              <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-honey-500/30 blur-[90px]" />
              <LogoMark size={84} />
              <div>
                <h2 className="text-h2 text-white">{c.cardTitle}</h2>
                <p className="text-lead mt-4 max-w-sm text-white/65">{c.cardText}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href={whatsappLink(t.common.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="btn btn-honey btn-lg">
                    <Whatsapp size={19} />
                    {c.writeUs}
                  </a>
                  <a href={telLink} className="btn btn-glass-dark btn-lg">
                    <Phone size={18} />
                    {c.callUs}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <div className="lg:col-span-7">
            <Stagger as="ul" className="surface divide-y divide-[var(--color-line)] overflow-hidden rounded-[2rem]">
              {rows.map(({ Icon, label, value, href: link, external, cta }) => {
                const inner = (
                  <>
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-honey-200/70 text-honey-700">
                      <Icon size={20} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm text-muted">{label}</span>
                      <span className="mt-0.5 block text-[1.1rem] font-semibold tracking-[-0.015em] text-ink">{value}</span>
                    </span>
                    {link ? (
                      <span className="flex items-center gap-2 text-sm font-medium text-muted transition-colors group-hover:text-ink">
                        <span className="hidden sm:inline">{cta}</span>
                        <span className="grid size-10 place-items-center rounded-full border hairline bg-white/70 transition-transform duration-500 group-hover:rotate-45">
                          <ArrowUpRight size={16} />
                        </span>
                      </span>
                    ) : null}
                  </>
                );
                return (
                  <StaggerItem as="li" key={label}>
                    {link ? (
                      <a
                        href={link}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-5 p-5 transition-colors duration-300 hover:bg-white/70 md:p-6"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-5 p-5 md:p-6">{inner}</div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>

            <Reveal className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] surface p-5 md:p-6">
              <span className="font-semibold text-ink">{c.follow}</span>
              <div className="flex gap-2">
                <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  <Instagram size={17} />
                  Instagram
                </a>
                <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  <Facebook size={17} />
                  Facebook
                </a>
              </div>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal className="lg:col-span-12" y={40}>
            <div className="relative mt-0 h-[26rem] overflow-hidden rounded-[2rem] shadow-soft md:h-[32rem]">
              <iframe
                title={`${site.name} — ${c.location}`}
                src="https://www.google.com/maps?q=Qarayaz%C4%B1+me%C5%9F%C9%99si,+A%C4%9Fstafa&z=11&output=embed"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] sepia-[0.15]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-ink"
              >
                <MapPin size={16} />
                {c.viewMap}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl(href(locale, "/contact")),
          name: t.meta.contact.title,
          about: { "@id": ORG_ID },
        }}
      />
    </>
  );
}
