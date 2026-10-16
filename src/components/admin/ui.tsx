"use client";

import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const AUTH_KEY = "isAuthenticated";
export const CLOUDINARY = { preset: "farhadsultan", cloud: "dbiltdpxh" };

export async function uploadToCloudinary(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", CLOUDINARY.preset);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY.cloud}/image/upload`, { method: "POST", body });
  if (!res.ok) throw new Error("Upload failed");
  const data = (await res.json()) as { secure_url: string };
  return data.secure_url;
}

export function Panel({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("surface rounded-[1.75rem] p-6 md:p-8", className)}>
      {title ? <h2 className="mb-6 text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h2> : null}
      {children}
    </section>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

const inputBase =
  "w-full rounded-2xl border border-[var(--color-line)] bg-white/80 px-4 py-3 text-[0.97rem] text-ink outline-none transition focus:border-honey-500 focus:bg-white focus:ring-4 focus:ring-honey-300/30";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputBase, props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={cn(inputBase, "resize-y", props.className)} />;
}

export function FileInput({ onFile, label }: { onFile: (file: File) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-honey-500/50 bg-honey-200/20 px-4 py-5 text-sm font-medium text-honey-700 transition hover:bg-honey-200/40">
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
      {label}
    </label>
  );
}

export function ItemCard({
  image,
  title,
  children,
  onEdit,
  onRemove,
  editLabel = "Düzəlt",
  removeLabel = "Sil",
}: {
  image?: string;
  title: string;
  children?: ReactNode;
  onEdit: () => void;
  onRemove: () => void;
  editLabel?: string;
  removeLabel?: string;
}) {
  return (
    <article className="surface flex flex-col overflow-hidden rounded-[1.5rem]">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={title} className="aspect-[4/3] w-full bg-cream-300 object-cover" loading="lazy" />
      ) : null}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-semibold text-ink">{title}</h3>
        <div className="flex-1 text-sm text-muted">{children}</div>
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={onEdit} className="btn btn-ghost btn-sm flex-1">
            {editLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`${title} — silinsin?`)) onRemove();
            }}
            className="btn btn-sm flex-1 bg-red-50 text-red-700 hover:bg-red-100"
          >
            {removeLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
