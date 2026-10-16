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
    <section className={cn("surface rounded-[2rem] p-6 md:p-10", className)}>
      {title ? <h2 className="text-h3 mb-8 text-ink">{title}</h2> : null}
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
  "w-full rounded-2xl border border-[var(--color-line)] bg-white/80 px-4 py-3.5 text-[0.97rem] text-ink outline-none transition placeholder:text-muted/60 focus:border-honey-500 focus:bg-white focus:ring-4 focus:ring-honey-300/30";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputBase, props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={cn(inputBase, "resize-y", props.className)} />;
}

export function FileInput({ onFile, label }: { onFile: (file: File) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-honey-400/50 bg-[radial-gradient(70%_100%_at_50%_0%,#fff,#fff6dc)] px-4 py-7 text-sm font-semibold text-honey-700 transition hover:border-honey-500 hover:bg-white">
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
  contain,
  children,
  onEdit,
  onRemove,
  editLabel = "Düzəlt",
  removeLabel = "Sil",
}: {
  image?: string;
  title: string;
  contain?: boolean;
  children?: ReactNode;
  onEdit: () => void;
  onRemove: () => void;
  editLabel?: string;
  removeLabel?: string;
}) {
  return (
    <article className="surface group flex flex-col overflow-hidden rounded-[2rem] transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift">
      {image ? (
        <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-[radial-gradient(70%_60%_at_50%_45%,#fff_0%,#fff6dc_55%,#fbe9c6_100%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]",
              contain ? "object-contain p-[10%] drop-shadow-[0_18px_18px_rgb(61_38_0/0.18)]" : "object-cover",
            )}
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-2 px-5 pb-5 pt-3 md:px-6 md:pb-6">
        <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">{title}</h3>
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
