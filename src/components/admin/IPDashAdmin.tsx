"use client";

import { useEffect, useMemo, useState } from "react";
import { getDb, onValue, ref, remove } from "@/lib/firebase-client";
import { Input, Panel } from "./ui";

type Visitor = { id: string; ip: string; country: string; region: string; city: string; timestamp: string; userAgent: string };
const PER_PAGE = 10;

export function IPDashAdmin() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");

  useEffect(
    () =>
      onValue(
        ref(getDb(), "visitorIPs"),
        (snap) => {
          const data = (snap.val() as Record<string, Omit<Visitor, "id">> | null) ?? {};
          setVisitors(Object.entries(data).map(([id, v]) => ({ id, ...v })).reverse());
          setLoading(false);
        },
        () => setLoading(false),
      ),
    [],
  );

  const countries = useMemo(() => [...new Set(visitors.map((v) => v.country).filter(Boolean))].sort(), [visitors]);
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return visitors.filter(
      (v) =>
        (!country || v.country === country) &&
        [v.ip, v.country, v.region, v.city, v.userAgent].some((f) => (f ?? "").toLowerCase().includes(q)),
    );
  }, [visitors, search, country]);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (loading) return <Panel>Yüklənir…</Panel>;

  return (
    <Panel title={`Ziyarətçilər (${filtered.length})`}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Axtar…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setPage(1);
          }}
          className="rounded-2xl border border-[var(--color-line)] bg-white/80 px-4 py-3 text-ink"
        >
          <option value="">Bütün ölkələr</option>
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)]">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/70 text-muted">
            <tr>
              {["IP", "Ölkə", "Region", "Şəhər", "Tarix", "Agent", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-line)]">
            {rows.map((v) => (
              <tr key={v.id} className="hover:bg-white/50">
                <td className="px-4 py-3 font-mono text-xs">{v.ip}</td>
                <td className="px-4 py-3">{v.country}</td>
                <td className="px-4 py-3">{v.region}</td>
                <td className="px-4 py-3">{v.city}</td>
                <td className="whitespace-nowrap px-4 py-3">{new Date(v.timestamp).toLocaleString("az-Latn-AZ")}</td>
                <td className="max-w-[16rem] truncate px-4 py-3 text-muted" title={v.userAgent}>
                  {v.userAgent}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => void remove(ref(getDb(), `visitorIPs/${v.id}`))}
                    className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pages > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-3 text-sm">
          <button type="button" className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Əvvəlki
          </button>
          <span className="tabular-nums text-muted">
            {page} / {pages}
          </span>
          <button type="button" className="btn btn-ghost btn-sm" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>
            Növbəti
          </button>
        </div>
      ) : null}
    </Panel>
  );
}
