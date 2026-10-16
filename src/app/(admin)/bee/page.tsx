"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogAdmin } from "@/components/admin/BlogAdmin";
import { GalleryAdmin } from "@/components/admin/GalleryAdmin";
import { IPDashAdmin } from "@/components/admin/IPDashAdmin";
import { ProductsAdmin } from "@/components/admin/ProductsAdmin";
import { AUTH_KEY } from "@/components/admin/ui";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { key: "products", label: "Məhsullar" },
  { key: "gallery", label: "Qalereya" },
  { key: "blog", label: "Bloq" },
  { key: "ip", label: "IP Dashboard" },
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

  return (
    <div className="mx-auto flex min-h-dvh max-w-[1400px] flex-col gap-4 p-3 md:flex-row md:p-5">
      <aside className="glass flex shrink-0 flex-col gap-6 rounded-[1.75rem] p-5 md:sticky md:top-5 md:h-[calc(100dvh-2.5rem)] md:w-64">
        <div className="flex items-center gap-3">
          <LogoMark size={44} />
          <span className="font-semibold tracking-[-0.02em] text-ink">BalBee Admin</span>
        </div>
        <nav className="flex gap-1 overflow-x-auto md:flex-col">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSection(s.key)}
              aria-current={section === s.key ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-2xl px-4 py-3 text-left text-sm font-medium transition",
                section === s.key ? "bg-ink text-cream-50" : "text-ink-soft hover:bg-white/70",
              )}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem(AUTH_KEY);
            router.push("/login");
          }}
          className="btn btn-ghost btn-sm mt-auto"
        >
          Çıxış
        </button>
      </aside>
      <main className="min-w-0 flex-1">
        {section === "products" && <ProductsAdmin />}
        {section === "gallery" && <GalleryAdmin />}
        {section === "blog" && <BlogAdmin />}
        {section === "ip" && <IPDashAdmin />}
      </main>
    </div>
  );
}
