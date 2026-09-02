import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ModuleRow } from "@/types";
import { Badge } from "./Badge";
import { fmt } from "@/lib/utils";

interface DataTableProps {
  cols: string[];
  rows: ModuleRow[];
  statusKey: string;
}

export function DataTable({ cols, rows, statusKey }: DataTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const statusOptions = useMemo(
    () => Array.from(new Set(rows.map((r) => String(r[statusKey])))),
    [rows, statusKey]
  );

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        search.trim() === "" ||
        Object.values(row).some((v) => String(v).toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = statusFilter === "" || String(row[statusKey]) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter, statusKey]);

  return (
    <div className="rounded-card bg-card shadow-card">
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari data..."
            className="w-full rounded-lg border border-line py-2 pl-9 pr-3 text-sm outline-none focus:border-blue"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-blue sm:w-56"
        >
          <option value="">Semua Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink-faint">
              {cols.map((c) => (
                <th key={c} className="whitespace-nowrap px-4 py-3">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-line last:border-0 hover:bg-surface/60">
                {cols.map((c) => (
                  <td key={c} className="whitespace-nowrap px-4 py-3 text-ink">
                    {c === statusKey ? (
                      <Badge status={String(row[c])} />
                    ) : typeof row[c] === "number" ? (
                      fmt(row[c] as number)
                    ) : (
                      String(row[c])
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={cols.length} className="px-4 py-10 text-center text-sm text-ink-faint">
                  Tidak ada data yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 text-xs text-ink-faint">
        <span>{fmt(filtered.length)} data</span>
        <span>Diperbarui otomatis</span>
      </div>
    </div>
  );
}
