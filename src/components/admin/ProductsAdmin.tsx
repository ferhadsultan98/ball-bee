"use client";

import { useEffect, useState } from "react";
import { getDb, onValue, ref, set } from "@/lib/firebase-client";
import { Field, FileInput, Input, ItemCard, Panel, Textarea, uploadToCloudinary } from "./ui";

type Product = { name: string; description: string; details?: string; price: string; image: string; hashtags: string[] };
type Form = Omit<Product, "hashtags"> & { details: string; hashtags: string };

const EMPTY: Form = { name: "", description: "", details: "", price: "", image: "", hashtags: "" };

export function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Form>(EMPTY);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(
    () =>
      onValue(
        ref(getDb(), "products"),
        (snap) => setProducts((snap.val() as Product[] | null)?.filter(Boolean) ?? []),
        () => alert("Məhsullar tapılmır"),
      ),
    [],
  );

  const patch = (p: Partial<Form>) => setForm((f) => ({ ...f, ...p }));

  const upload = async (file: File) => {
    setBusy(true);
    try {
      patch({ image: await uploadToCloudinary(file) });
    } catch {
      alert("Yükləmə xətası");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!form.name || !form.description || !form.price || !form.image) {
      alert("Bütün xanaları doldur");
      return;
    }
    const item: Product = { ...form, hashtags: form.hashtags.split(",").map((t) => t.trim()).filter(Boolean) };
    const next = [...products];
    if (editIndex !== null) next[editIndex] = item;
    else next.push(item);
    try {
      await set(ref(getDb(), "products"), next);
      setForm(EMPTY);
      setEditIndex(null);
    } catch {
      alert("Məhsul saxlanmadı");
    }
  };

  const edit = (i: number) => {
    const p = products[i];
    setEditIndex(i);
    setForm({ ...p, details: p.details ?? "", hashtags: (p.hashtags ?? []).join(", ") });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (i: number) => {
    try {
      await set(ref(getDb(), "products"), products.filter((_, idx) => idx !== i));
    } catch {
      alert("Məhsul silinmədi");
    }
  };

  return (
    <div className="space-y-4">
      <Panel title={editIndex !== null ? "Məhsulu düzəlt" : "Yeni məhsul"}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Ad">
            <Input value={form.name} onChange={(e) => patch({ name: e.target.value })} />
          </Field>
          <Field label="Həcm / qısa təsvir (məs. 1kq)">
            <Input value={form.description} onChange={(e) => patch({ description: e.target.value })} />
          </Field>
          <Field label="Qiymət (₼)">
            <Input inputMode="decimal" value={form.price} onChange={(e) => patch({ price: e.target.value })} />
          </Field>
          <Field label="Haştaqlar (vergüllə)">
            <Input value={form.hashtags} onChange={(e) => patch({ hashtags: e.target.value })} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Detallar">
              <Textarea rows={7} value={form.details} onChange={(e) => patch({ details: e.target.value })} />
            </Field>
          </div>
          <div className="space-y-3 md:col-span-2">
            <FileInput onFile={upload} label={busy ? "Yüklənir…" : form.image ? "Şəkli dəyiş" : "Şəkil yüklə"} />
            {form.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="" className="h-40 rounded-2xl bg-white object-contain p-2" />
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

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 ? <p className="text-muted">Məhsul yoxdur</p> : null}
        {products.map((p, i) => (
          <ItemCard key={`${p.name}-${i}`} contain image={p.image} title={p.name} onEdit={() => edit(i)} onRemove={() => remove(i)}>
            <p>{p.description}</p>
            <p className="mt-1 font-semibold text-ink">{p.price} ₼</p>
            <p className="mt-1 line-clamp-2">{(p.hashtags ?? []).join(", ")}</p>
          </ItemCard>
        ))}
      </div>
    </div>
  );
}
