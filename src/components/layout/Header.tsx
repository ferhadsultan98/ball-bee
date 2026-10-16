"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { href, localeMeta, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/az";
import { site, telLink, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Phone, Whatsapp } from "../ui/Icons";
import { Logo } from "../ui/Logo";
import { lockScroll } from "./SmoothScroll";

type Props = {
  locale: Locale;
  nav: Dictionary["nav"];
  greeting: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function switchLocalePath(pathname: string, to: Locale) {
  return pathname.replace(/^\/(az|en|ru)(?=\/|$)/, `/${to}`) || `/${to}`;
}

function rememberLocale(l: Locale) {
  document.cookie = `NEXT_LOCALE=${l};path=/;max-age=31536000;samesite=lax`;
}

export function Header({ locale, nav, greeting }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  const links = [
    { href: href(locale, "/about"), label: nav.about },
    { href: href(locale, "/products"), label: nav.products },
    { href: href(locale, "/gallery"), label: nav.gallery },
    { href: href(locale, "/blog"), label: nav.blog },
    { href: href(locale, "/contact"), label: nav.contact },
  ];
  const isActive = (link: string) => pathname === link || pathname.startsWith(`${link}/`);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (open) return;
    setHidden(y > 480 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  // Close the sheet on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const nodes = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a, button")].filter(
          Boolean,
        ) as HTMLElement[];
        const firstNode = nodes[0];
        const lastNode = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === firstNode) {
          e.preventDefault();
          lastNode.focus();
        } else if (!e.shiftKey && document.activeElement === lastNode) {
          e.preventDefault();
          firstNode.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? "-120%" : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div
          className={cn(
            "glass mx-auto flex h-[3.75rem] bg-white/85! max-w-[1180px] items-center justify-between gap-4 rounded-full pl-1.5 pr-2 transition-[box-shadow,background-color] duration-500",
            scrolled && "shadow-lift",
          )}
        >
          <Link href={href(locale)} aria-label={`${site.name} — ${nav.home}`} className="shrink-0 rounded-full">
            <Logo size={50} />
          </Link>

          <nav aria-label={nav.primary} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative z-10 block rounded-full px-4 py-2 text-[0.94rem] font-medium tracking-[-0.01em] transition-colors duration-300",
                        active ? "text-ink" : "text-ink-soft/80 hover:text-ink",
                      )}
                    >
                      {link.label}
                    </Link>
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-white shadow-soft"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} pathname={pathname} label={nav.language} className="hidden sm:flex" />
            <a
              href={whatsappLink(greeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink btn-sm hidden md:inline-flex"
            >
              <Whatsapp size={17} />
              {nav.order}
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? nav.close : nav.menu}
              className="relative grid size-11 place-items-center rounded-full bg-ink text-cream-50 transition-transform active:scale-95 lg:hidden"
            >
              <span className="sr-only">{open ? nav.close : nav.menu}</span>
              <span
                aria-hidden
                className={cn(
                  "absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={nav.menu}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-cream-100/90 px-5 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            data-lenis-prevent
          >
            <nav aria-label={nav.primary}>
              <ul className="flex flex-col">
                {[{ href: href(locale), label: nav.home }, ...links].map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.05 + i * 0.05 }}
                    className="border-b hairline"
                  >
                    <Link
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className="flex items-baseline justify-between py-4 text-[2rem] font-semibold tracking-[-0.04em] text-ink"
                    >
                      {link.label}
                      <span className="text-sm font-medium tracking-normal text-muted tabular-nums">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mt-auto flex flex-col gap-4 pt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            >
              <LanguageSwitcher locale={locale} pathname={pathname} label={nav.language} className="self-start" />
              <div className="grid grid-cols-2 gap-3">
                <a href={whatsappLink(greeting)} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
                  <Whatsapp size={18} />
                  WhatsApp
                </a>
                <a href={telLink} className="btn btn-ghost">
                  <Phone size={18} />
                  {site.phoneDisplay.slice(5)}
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function LanguageSwitcher({
  locale,
  pathname,
  label,
  className,
}: {
  locale: Locale;
  pathname: string;
  label: string;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("flex items-center rounded-full bg-ink/[0.05] p-1", className)}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={switchLocalePath(pathname, l)}
            hrefLang={l}
            lang={l}
            onClick={() => rememberLocale(l)}
            aria-current={active ? "true" : undefined}
            title={localeMeta[l].name}
            aria-label={localeMeta[l].name}
            className={cn(
              "grid h-8 min-w-9 place-items-center rounded-full px-2 text-[0.75rem] font-semibold tracking-wide transition-all duration-300",
              active ? "bg-white text-ink shadow-soft" : "text-muted hover:text-ink",
            )}
          >
            {localeMeta[l].label}
          </Link>
        );
      })}
    </div>
  );
}
