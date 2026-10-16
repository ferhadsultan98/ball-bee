"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AUTH_KEY, Field, Input } from "@/components/admin/ui";
import { LogoMark } from "@/components/ui/Logo";

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
    <main className="grid min-h-dvh place-items-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-sm rounded-[2rem] p-8">
        <LogoMark size={72} />
        <h1 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">Admin giriş</h1>
        <div className="mt-8 space-y-4">
          <Field label="İstifadəçi adı">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
          </Field>
          <Field label="Şifrə">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          </Field>
        </div>
        {error ? (
          <p role="alert" className="mt-4 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        <button type="submit" className="btn btn-ink mt-8 w-full">
          Daxil ol
        </button>
      </form>
    </main>
  );
}
