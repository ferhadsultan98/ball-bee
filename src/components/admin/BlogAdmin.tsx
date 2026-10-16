"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type FormEvent } from "react";
import "react-quill-new/dist/quill.snow.css";
import { getDb, onValue, ref, remove, set, update } from "@/lib/firebase-client";
import { cn } from "@/lib/utils";
import { Field, FileInput, Input, ItemCard, Panel, Textarea, uploadToCloudinary } from "./ui";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false, loading: () => <div className="h-64 rounded-2xl bg-white/60" /> });

type Lang = "en" | "az" | "ru";
type L10n = Record<Lang, string>;
type Post = { id: string; title: L10n; excerpt: L10n; content: L10n; image: string; hashtags: string; author: string; date?: string; viewCount?: number };

const blank = (): L10n => ({ en: "", az: "", ru: "" });
const EMPTY: Omit<Post, "id"> = { title: blank(), excerpt: blank(), content: blank(), image: "", hashtags: "", author: "" };
const LANGS: Lang[] = ["az", "en", "ru"];

const quillModules = {
  toolbar: [[{ header: [2, 3, false] }], ["bold", "italic", "underline"], ["blockquote"], [{ list: "ordered" }, { list: "bullet" }], ["link", "image"], ["clean"]],
};

export function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<Omit<Post, "id">>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("az");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(
    () =>
      onValue(ref(getDb(), "blogPosts"), (snap) => {
        const data = (snap.val() as Record<string, Omit<Post, "id">> | null) ?? {};
        setPosts(Object.entries(data).map(([id, p]) => ({ id, ...p })));
      }),
    [],
  );

  const setL10n = (key: "title" | "excerpt" | "content", value: string) =>
    setForm((f) => ({ ...f, [key]: { ...f[key], [lang]: value } }));

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const image = await uploadToCloudinary(file);
      setForm((f) => ({ ...f, image }));
    } catch {
      setError("Şəkil yüklənmədi.");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setForm({ ...EMPTY, title: blank(), excerpt: blank(), content: blank() });
    setEditingId(null);
    setError("");
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.az && !form.title.en) return setError("Ən azı AZ və ya EN başlığı tələb olunur.");
    if (!form.content.az && !form.content.en) return setError("Məzmun tələb olunur.");
    if (!form.image) return setError("Şəkil tələb olunur.");
    try {
      if (editingId) {
        await update(ref(getDb(), `blogPosts/${editingId}`), form);
      } else {
        const id = Date.now().toString();
        await set(ref(getDb(), `blogPosts/${id}`), { ...form, id, date: new Date().toISOString().split("T")[0], viewCount: 0 });
      }
      reset();
    } catch {
      setError("Yazı saxlanmadı.");
    }
  };

  return (
    <div className="space-y-4">
      <Panel title={editingId ? "Yazını düzəlt" : "Yeni yazı"}>
        <div className="mb-6 inline-flex rounded-full bg-ink/5 p-1">
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={cn("rounded-full px-4 py-1.5 text-sm font-semibold", lang === l ? "bg-white text-ink shadow-soft" : "text-muted")}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-4">
          <Field label={`Başlıq (${lang})`}>
            <Input value={form.title[lang]} onChange={(e) => setL10n("title", e.target.value)} />
          </Field>
          <Field label={`Qısa təsvir (${lang})`}>
            <Textarea rows={3} value={form.excerpt[lang]} onChange={(e) => setL10n("excerpt", e.target.value)} />
          </Field>
          <div>
            <span className="mb-2 block text-sm font-medium text-ink-soft">Məzmun ({lang})</span>
            <div className="overflow-hidden rounded-2xl bg-white [&_.ql-container]:min-h-64 [&_.ql-container]:text-base">
              <ReactQuill key={lang} theme="snow" value={form.content[lang]} onChange={(v: string) => setL10n("content", v)} modules={quillModules} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Haştaqlar">
              <Input value={form.hashtags} onChange={(e) => setForm((f) => ({ ...f, hashtags: e.target.value }))} placeholder="#bal, #təbii" />
            </Field>
            <Field label="Müəllif">
              <Input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
            </Field>
          </div>
          <FileInput onFile={upload} label={busy ? "Yüklənir…" : form.image ? "Şəkli dəyiş" : "Şəkil yüklə"} />
          {form.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.image} alt="" className="h-40 rounded-2xl object-cover" />
          ) : null}
          {error ? (
            <p role="alert" className="text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}
          <div className="flex gap-2">
            <button type="submit" disabled={busy} className="btn btn-ink">
              {editingId ? "Yenilə" : "Dərc et"}
            </button>
            {editingId ? (
              <button type="button" onClick={reset} className="btn btn-ghost">
                Ləğv et
              </button>
            ) : null}
          </div>
        </form>
      </Panel>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ItemCard
            key={post.id}
            image={post.image?.startsWith("http") ? post.image : undefined}
            title={post.title?.[lang] || post.title?.az || post.title?.en || post.id}
            onEdit={() => {
              setEditingId(post.id);
              const { id: _id, ...rest } = post;
              void _id;
              setForm({
                ...EMPTY,
                ...rest,
                title: { ...blank(), ...rest.title },
                excerpt: { ...blank(), ...rest.excerpt },
                content: { ...blank(), ...rest.content },
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onRemove={() => void remove(ref(getDb(), `blogPosts/${post.id}`))}
          >
            <p className="line-clamp-3">{post.excerpt?.[lang]}</p>
            <p className="mt-1">
              {post.date} · {post.viewCount ?? 0} baxış
            </p>
          </ItemCard>
        ))}
      </div>
    </div>
  );
}
