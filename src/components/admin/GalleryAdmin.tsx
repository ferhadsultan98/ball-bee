"use client";

import { useEffect, useState } from "react";
import { getDb, onValue, ref, set } from "@/lib/firebase-client";
import { Field, FileInput, Input, ItemCard, Panel, Textarea, uploadToCloudinary } from "./ui";

type Item = { title: string; description: string; src: string; likes?: number };
const EMPTY: Item = { title: "", description: "", src: "" };

export function GalleryAdmin() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>(EMPTY);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(
    () =>
      onValue(
        ref(getDb(), "gallery"),
        (snap) => setItems((snap.val() as Item[] | null) ?? []),
        () => alert("Qalereya yüklənmədi"),
      ),
    [],
  );

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const src = await uploadToCloudinary(file);
      setForm((f) => ({ ...f, src }));
    } catch {
      alert("Şəkil yüklənmədi");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!form.title || !form.src) {
      alert("Başlıq və şəkil tələb olunur");
      return;
    }
    const next = [...items];
    if (editIndex !== null) next[editIndex] = { ...form, likes: items[editIndex]?.likes ?? 0 };
    else next.push({ ...form, likes: 0 });
    try {
      await set(ref(getDb(), "gallery"), next);
      setForm(EMPTY);
      setEditIndex(null);
    } catch {
      alert("Saxlanmadı");
    }
  };

  const remove = async (i: number) => {
    try {
      await set(ref(getDb(), "gallery"), items.filter((_, idx) => idx !== i));
    } catch {
      alert("Silinmədi");
    }
  };

  return (
    <div className="space-y-4">
      <Panel title={editIndex !== null ? "Şəkli düzəlt" : "Yeni şəkil"}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Başlıq">
            <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </Field>
          <Field label="Təsvir">
            <Textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </Field>
          <div className="space-y-3 md:col-span-2">
            <FileInput onFile={upload} label={busy ? "Yüklənir…" : form.src ? "Şəkli dəyiş" : "Şəkil yüklə"} />
            {form.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.src} alt="" className="h-40 rounded-2xl object-cover" />
            ) : null}
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <button type="button" onClick={save} disabled={busy} className="btn btn-ink">
            {editIndex !== null ? "Saxla" : "Əlavə et"}
          </button>
          {editIndex !== null ? (
            <button
              type="button"
              onClick={() => {
                setEditIndex(null);
                setForm(EMPTY);
              }}
              className="btn btn-ghost"
            >
              Ləğv et
            </button>
          ) : null}
        </div>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.length === 0 ? <p className="text-muted">Qalereya boşdur</p> : null}
        {items.map((item, i) =>
          item ? (
            <ItemCard
              key={`${item.src}-${i}`}
              image={item.src}
              title={item.title}
              onEdit={() => {
                setEditIndex(i);
                setForm({ title: item.title, description: item.description ?? "", src: item.src });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onRemove={() => remove(i)}
            >
              <p>{item.description}</p>
              <p className="mt-1">♥ {item.likes ?? 0}</p>
            </ItemCard>
          ) : null,
        )}
      </div>
    </div>
  );
}
