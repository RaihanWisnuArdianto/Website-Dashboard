import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, FileCheck2, FileStack, Users2, Award, ArrowRight, Bell } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { StatCard } from "@/components/ui/StatCard";
import { DonutChart } from "@/components/charts/DonutChart";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { TrendChart } from "@/components/charts/TrendChart";
import { useDashboardData, useNotifications } from "@/hooks/useDashboardData";
import type { PeriodKey } from "@/types";
import { fmt } from "@/lib/utils";
import { Panel } from "@/components/ui/Panel";

export function DashboardPage() {
  const [period, setPeriod] = useState<PeriodKey>("mei2026");
  const { data, isLoading } = useDashboardData(period);
  const { data: notifications } = useNotifications();
  const navigate = useNavigate();

  if (isLoading || !data) {
    return (
      <>
        <Topbar title="Dashboard Nasional Akreditasi LPK" subtitle="Memuat data..." />
        <div className="flex-1 p-6 text-sm text-ink-faint">Memuat dashboard...</div>
      </>
    );
  }

  return (
    <>
      <Topbar
        title="Dashboard Nasional Akreditasi LPK"
        subtitle="Software Pengelolaan Akreditasi Lembaga Pelatihan Vokasi"
        period={period}
        onPeriodChange={setPeriod}
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard icon={Building2} label="Total LPK Terdaftar" value={data.lpk} delta={data.lpkDelta} accent="blue" />
          <StatCard icon={FileStack} label="Total Akreditasi" value={data.akreditasi} delta={data.akreditasiDelta} accent="green" />
          <StatCard icon={FileCheck2} label="Pengajuan Aktif" value={data.aktif} delta={data.aktifDelta} accent="orange" />
          <StatCard icon={Award} label="Sertifikat Terbit" value={data.sertifikat} delta={data.sertifikatDelta} accent="purple" />
          <StatCard
            icon={Users2}
            label="Asesor Terverifikasi"
            value={data.asesor}
            note={`${data.asesorNote} asesor baru bulan ini`}
            accent="teal"
          />
        </div>

        {/* Donuts + gauge */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Panel title="Pengajuan Berdasarkan Jenis Layanan" onMore={() => navigate("/modul/mod-pengajuan")}>
            <DonutChart data={data.jenis} total={data.aktif} />
          </Panel>
          <Panel title="Status Pengajuan" onMore={() => navigate("/modul/mod-verifikasi")}>
            <DonutChart data={data.status} total={data.aktif} />
          </Panel>
          <Panel title="Pengajuan Berdasarkan Pembiayaan" onMore={() => navigate("/modul/mod-pembiayaan")}>
            <DonutChart data={data.biaya} total={data.aktif} />
          </Panel>
          <Panel title="SLA Pengajuan" onMore={() => navigate("/modul/mod-monitoring")} center>
            <GaugeChart pct={data.sla} />
            <div className="mt-2 text-center text-xs text-ink-faint">
              SLA Terlampaui <b className="text-ink">{fmt(data.slaOver)}</b> dari {fmt(data.aktif)}
            </div>
          </Panel>
        </div>

        {/* Trend + top provinces */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="Tren Pengajuan (12 Bulan Terakhir)">
            <TrendChart values={data.trend} months={data.trendMonths} />
          </Panel>
          <Panel title="Top 5 Provinsi — Pengajuan Terbanyak" onMore={() => navigate("/modul/mod-laporan")}>
            <div className="space-y-3">
              {data.topProvinces.map((p, i) => (
                <div key={p.province} className="flex items-center gap-3">
                  <span className="w-5 text-xs font-bold text-ink-faint">{i + 1}</span>
                  <span className="flex-1 text-sm text-ink">{p.province}</span>
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-blue"
                      style={{ width: `${(p.count / data.topProvinces[0].count) * 100}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-semibold text-ink">{fmt(p.count)}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Process summary + side cards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="Ringkasan Proses Akreditasi">
            <div className="flex flex-wrap gap-3">
              {data.process.map((step) => (
                <div key={step.label} className="min-w-[120px] flex-1 rounded-xl bg-surface p-3">
                  <div className="text-lg font-extrabold text-ink">{fmt(step.value)}</div>
                  <div className="text-xs text-ink-soft">{step.label}</div>
                  {step.pct !== null && <div className="mt-1 text-[11px] font-semibold text-blue">{step.pct}%</div>}
                </div>
              ))}
            </div>
          </Panel>

          <div className="space-y-4">
            <div className="rounded-card bg-card p-4 shadow-card">
              <div className="mb-3 text-sm font-bold text-ink">Beban Kerja Asesor</div>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-bg text-purple">
                  <Users2 size={20} />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-ink">{data.workload}</div>
                  <div className="text-xs text-ink-faint">Rata-rata Per Asesor · Pengajuan Aktif</div>
                </div>
              </div>
            </div>

            <div className="rounded-card bg-card p-4 shadow-card">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-bold text-ink">Notifikasi</div>
                <Bell size={16} className="text-ink-faint" />
              </div>
              <div className="space-y-2">
                {notifications?.slice(0, 3).map((n) => (
                  <div key={n.id} className="flex items-start gap-2 text-xs">
                    <span className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${n.read ? "bg-line" : "bg-blue"}`} />
                    <div>
                      <div className="text-ink-soft">{n.title}</div>
                      <div className="text-ink-faint">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 pb-2 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>Sumber Data: SI-LEMLATVOK Kemnaker RI | Data per {data.asOfDate}</span>
          <span>Data Real-time · Integrasi SIAPKerja · Akurat · Transparan · Akuntabel</span>
        </div>
      </div>
    </>
  );
}
