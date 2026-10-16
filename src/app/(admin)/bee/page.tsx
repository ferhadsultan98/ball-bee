"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogAdmin } from "@/components/admin/BlogAdmin";
import { GalleryAdmin } from "@/components/admin/GalleryAdmin";
import { IPDashAdmin } from "@/components/admin/IPDashAdmin";
import { ProductsAdmin } from "@/components/admin/ProductsAdmin";
import { AUTH_KEY } from "@/components/admin/ui";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { key: "products", label: "Məhsullar", title: "Məhsullar", lead: "Məhsul əlavə edin, qiymət və təsvirləri yeniləyin." },
  { key: "gallery", label: "Qalereya", title: "Qalereya", lead: "Saytdakı qalereya şəkillərini idarə edin." },
  { key: "blog", label: "Bloq", title: "Bloq yazıları", lead: "Üç dildə yazı dərc edin və redaktə edin." },
  { key: "ip", label: "Ziyarətçilər", title: "Ziyarətçilər", lead: "Sayta daxil olanların siyahısı." },
] as const;
type SectionKey = (typeof SECTIONS)[number]["key"];

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [section, setSection] = useState<SectionKey>("products");

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) !== "true") router.replace("/login");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else setReady(true);
  }, [router]);

  if (!ready) return null;
  const current = SECTIONS.find((s) => s.key === section)!;

  return (
    <div className="min-h-dvh">
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(55%_60%_at_80%_0%,rgb(249_207_95/0.35),transparent_70%)]" />

      <header className="sticky top-0 z-40 px-3 pt-3 md:px-5 md:pt-4">
        <div className="glass mx-auto flex min-h-[3.75rem] max-w-[1320px] items-center justify-between gap-3 rounded-full bg-white/85! py-1.5 pl-1.5 pr-2">
          <div className="flex items-center gap-3">
            <Logo size={48} />
            <span className="hidden text-sm font-semibold tracking-[-0.01em] text-ink sm:inline">Admin</span>
          </div>

          <nav aria-label="Bölmələr" className="no-scrollbar overflow-x-auto">
            <ul className="flex items-center gap-1">
              {SECTIONS.map((s) => {
                const active = s.key === section;
                return (
                  <li key={s.key} className="relative">
                    <button
                      type="button"
                      onClick={() => setSection(s.key)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative z-10 whitespace-nowrap rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors md:px-4",
                        active ? "text-ink" : "text-ink-soft/80 hover:text-ink",
                      )}
                    >
                      {s.label}
                    </button>
                    {active ? (
                      <motion.span
                        layoutId="admin-active"
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
            <Link href="/az" target="_blank" className="btn btn-ghost btn-sm hidden md:inline-flex">
              Sayt
              <ArrowUpRight size={15} />
            </Link>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(AUTH_KEY);
                router.push("/login");
              }}
              className="btn btn-ink btn-sm"
            >
              Çıxış
            </button>
          </div>
        </div>
      </header>

      <main className="container-x pb-20 pt-12 md:pt-16">
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">
            <span className="h-px w-6 bg-current opacity-50" aria-hidden />
            İdarəetmə paneli
          </p>
          <h1 className="text-h2 mt-4 text-ink">{current.title}</h1>
          <p className="text-lead mt-3 max-w-xl text-muted">{current.lead}</p>

          <div className="mt-10 md:mt-12">
            {section === "products" && <ProductsAdmin />}
            {section === "gallery" && <GalleryAdmin />}
            {section === "blog" && <BlogAdmin />}
            {section === "ip" && <IPDashAdmin />}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
