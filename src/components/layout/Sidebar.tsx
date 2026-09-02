import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { useModuleDefinitions } from "@/hooks/useModuleData";
import { fmt, cn } from "@/lib/utils";

export function Sidebar() {
  const { data: modules } = useModuleDefinitions();

  return (
    <aside className="sticky top-0 flex h-screen w-[250px] flex-shrink-0 flex-col overflow-y-auto bg-gradient-to-b from-navy to-[#0a1630] text-[#cdd6ec]">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-[18px] py-5">
        <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#4c7bff] to-[#2447a8] shadow-[0_4px_10px_rgba(47,111,237,.35)]">
          <LayoutDashboard size={19} className="text-white" />
        </div>
        <div>
          <div className="text-[15.5px] font-extrabold leading-tight text-white">SI-LEMLATVOK</div>
          <div className="mt-0.5 text-[10.5px] text-[#8fa0cc]">Sistem Akreditasi Lembaga Vokasi</div>
        </div>
      </div>

      <nav className="flex-1 px-3 pb-5 pt-3.5">
          <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border">
            <div className="collapse-title font-semibold">
              hi
            </div>
          <div className="collapse-content text-sm">
            test
          </div>
        </div>
        <NavItem to="/" label="Dashboard" icon={LayoutDashboard} end />
        <div className="mb-2 mt-4 px-2.5 text-[10.5px] font-bold uppercase tracking-wider text-[#5c6fa0]">
          Modul
        </div>
        {modules?.map((m) => {
          const Icon = (Icons[m.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Circle;
          return (
            <NavItem
              key={m.key}
              to={`/modul/${m.key}`}
              label={m.navLabel}
              icon={Icon}
              badge={m.showBadge ? m.count : undefined}
            />
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-[18px] py-4 text-[11px] leading-relaxed text-[#5c6fa0]">
        SI-LEMLATVOK v2.4.0
        <br />© 2026 Kementerian Ketenagakerjaan RI
      </div>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  end?: boolean;
}

function NavItem({ to, label, icon: Icon, badge, end }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "mb-0.5 flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13.6px] font-semibold transition-colors",
          isActive ? "bg-blue text-white shadow-[0_4px_12px_-2px_rgba(47,111,237,.5)]" : "text-[#aeb9d9] hover:bg-navy-hover hover:text-white"
        )
      }
    >
      <Icon size={17} strokeWidth={2} className="flex-shrink-0 opacity-90" />
      <span className="flex-1">{label}</span>
      {typeof badge === "number" && (
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-bold">{fmt(badge)}</span>
      )}
    </NavLink>
  );
}
