# BalBee — natural honey from the Garayazi forest

Official website of **BalBee** ([balbee.az](https://balbee.az)): natural honey and bee products from Aghstafa, Azerbaijan.

## Stack

- **Next.js 16** (App Router, React 19, Turbopack) with TypeScript
- **Tailwind CSS 4** design tokens in `src/app/globals.css`
- **Motion** for scroll-linked parallax and reveal animations, **Lenis** for smooth scrolling
- **Firebase Realtime Database** for products, gallery and blog (read server-side via REST with ISR)
- **Cloudinary** for product, gallery and blog images

## Features

- Three languages with locale-prefixed URLs: `/az`, `/en`, `/ru` (`/` redirects by browser language)
- SEO: per-page metadata, canonical + `hreflang`, Open Graph/Twitter cards, `sitemap.xml`, `robots.txt`, web manifest, JSON-LD (Organization/LocalBusiness, WebSite, Product, BlogPosting, Article, BreadcrumbList, ItemList)
- Accessible: semantic landmarks, skip link, keyboard-friendly menu and lightbox, `prefers-reduced-motion` support
- Admin panel at `/bee` (login at `/login`) for products, gallery, blog and visitor log

## Structure

```
src/
  app/[locale]/        public pages (home, about, products, learn, gallery, blog, contact)
  app/(admin)/         admin panel (/bee, /login) — noindex
  app/sitemap.ts …     metadata routes
  components/          layout, home sections, UI primitives, admin
  i18n/                locale config + az/en/ru dictionaries
  lib/                 data layer, SEO helpers, site config
  proxy.ts             locale negotiation + legacy URL redirects
```

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
```

Optional environment variables:

- `NEXT_PUBLIC_SITE_URL` — canonical origin (default `https://balbee.az`)
- `FIREBASE_DATABASE_URL` — Realtime Database URL (default `https://ball-bee-default-rtdb.firebaseio.com`)
