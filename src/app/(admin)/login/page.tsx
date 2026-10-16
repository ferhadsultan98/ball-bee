"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import poster from "@/assets/images/hero-poster.jpg";
import { AUTH_KEY, Field, Input } from "@/components/admin/ui";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (username === "zaur" && password === "zaur") {
      localStorage.setItem(AUTH_KEY, "true");
      router.push("/bee");
    } else {
      setError("Yanlış istifadəçi adı və ya şifrə");
    }
  };

  return (
    <main className="grid min-h-dvh gap-3 p-2 md:p-4 lg:grid-cols-2">
      <section className="relative isolate hidden overflow-hidden rounded-[2.5rem] bg-ink lg:flex lg:flex-col lg:justify-end">
        <Image src={poster} alt="" fill preload placeholder="blur" sizes="50vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="p-12">
          <p className="eyebrow text-honey-300">
            <span className="h-px w-6 bg-current opacity-60" aria-hidden />
            İdarəetmə paneli
          </p>
          <h1 className="text-h1 mt-5 text-white">
            BalBee <span className="accent text-honey-300">admin</span>
          </h1>
          <p className="text-lead mt-5 max-w-md text-white/75">Məhsulları, qalereyanı və bloq yazılarını bir yerdən idarə edin.</p>
        </div>
      </section>

      <section className="relative flex flex-col px-4 py-6 md:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(55%_60%_at_80%_0%,rgb(249_207_95/0.35),transparent_70%)]" />
        <div className="flex items-center justify-between">
          <Logo size={56} />
          <Link href="/az" className="btn btn-ghost btn-sm">
            <ArrowLeft size={16} />
            Sayta qayıt
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-16">
          <p className="eyebrow">
            <span className="h-px w-6 bg-current opacity-50" aria-hidden />
            Giriş
          </p>
          <h2 className="text-h2 mt-4 text-ink">
            Xoş <span className="accent text-honey-700">gəlmisiniz</span>
          </h2>
          <form onSubmit={submit} className="mt-10 space-y-4">
            <Field label="İstifadəçi adı">
              <Input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
            </Field>
            <Field label="Şifrə">
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
            </Field>
            {error ? (
              <p role="alert" className="text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}
            <button type="submit" className="btn btn-ink btn-lg mt-4 w-full">
              Daxil ol
              <span className="btn-icon">
                <ArrowRight size={16} />
              </span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
