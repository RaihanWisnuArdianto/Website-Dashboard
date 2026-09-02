import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { fmt, cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  delta?: number;
  note?: string;
  accent?: "blue" | "green" | "orange" | "purple" | "teal";
}

const ACCENT_BG: Record<string, string> = {
  blue: "bg-blue-bg text-blue",
  green: "bg-green-bg text-green",
  orange: "bg-orange-bg text-orange",
  purple: "bg-purple-bg text-purple",
  teal: "bg-teal-bg text-teal",
};

export function StatCard({ icon: Icon, label, value, delta, note, accent = "blue" }: StatCardProps) {
  return (
    <div className="rounded-card bg-card p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", ACCENT_BG[accent])}>
          <Icon size={20} strokeWidth={2} />
        </div>
        {typeof delta === "number" && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green">
            <TrendingUp size={13} />
            {delta}%
          </span>
        )}
      </div>
      <div className="mt-4 text-2xl font-extrabold text-ink">{fmt(value)}</div>
      <div className="mt-1 text-sm text-ink-soft">{label}</div>
      {note && <div className="mt-1 text-xs text-ink-faint">{note}</div>}
    </div>
  );
}
