import { useEffect, useState } from "react";
import { ChevronDown, Landmark } from "lucide-react";
import { PERIOD_OPTIONS } from "@/data/staticData";
import type { PeriodKey } from "@/types";
import { cn } from "@/lib/utils";

interface TopbarProps {
  title: string;
  subtitle: string;
  period?: PeriodKey;
  onPeriodChange?: (p: PeriodKey) => void;
}

export function Topbar({ title, subtitle, period, onPeriodChange }: TopbarProps) {
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      setClock(
        new Date().toLocaleTimeString("en-EN", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB"
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const currentLabel = PERIOD_OPTIONS.find((p) => p.key === period)?.label ?? "Pilih Periode";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-card px-6 py-4">
      <div>
        <h1 className="text-[15px] font-extrabold uppercase tracking-wide text-ink">{title}</h1>
        <p className="mt-0.5 text-sm text-ink-soft">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-mono text-ink-soft sm:flex">
          {clock}
        </div>

        {onPeriodChange && (
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink"
            >
              {currentLabel}
              <ChevronDown size={14} />
            </button>
            {open && (
              <div className="absolute right-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-xl border border-line bg-card shadow-card">
                {PERIOD_OPTIONS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => {
                      onPeriodChange(p.key);
                      setOpen(false);
                    }}
                    className={cn(
                      "block w-full px-3 py-2 text-left text-xs hover:bg-surface",
                      p.key === period ? "font-bold text-blue" : "text-ink-soft"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="hidden items-center gap-2 border-l border-line pl-3 lg:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white">
            <Landmark size={16} />
          </div>
          <div className="text-[10px] font-bold leading-tight text-ink-soft">
            KEMENTERIAN
            <br />
            KETENAGAKERJAAN
            <br />
            REPUBLIK INDONESIA
          </div>
        </div>
      </div>
    </div>
  );
}
