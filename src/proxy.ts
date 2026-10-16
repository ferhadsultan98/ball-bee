import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

const UNLOCALIZED = /^\/(bee|login)(\/|$)/;

function negotiate(request: NextRequest): Locale {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookie)) return cookie;
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang } of ranked) if (isLocale(lang)) return lang;
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first) || UNLOCALIZED.test(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();

  // Root: send visitors to their preferred language (temporary — depends on the visitor).
  if (pathname === "/") {
    url.pathname = `/${negotiate(request)}`;
    const res = NextResponse.redirect(url, 307);
    res.headers.set("Vary", "Accept-Language, Cookie");
    return res;
  }

  // Legacy (pre-i18n) URLs: /details/:topic moved to /learn/:topic.
  const legacy = pathname.replace(/^\/details\//, "/learn/");
  url.pathname = `/${defaultLocale}${legacy}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/|api/|videos/|.*\\.[\\w]+$).*)"],
};
