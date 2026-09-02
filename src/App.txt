import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LabelList,
} from "recharts";
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Users,
  ClipboardList,
  Eye,
  Gavel,
  Award,
  Wallet,
  Activity,
  BarChart3,
  Building2,
  ShieldCheck,
  UserCircle2,
  Bell,
  Calendar,
  ChevronDown,
  Menu,
  X,
  AlertTriangle,
  Wrench,
  HelpCircle,
  Plus,
  ArrowUpRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------- TIPE DATA ---------------------------------- */

interface MonthData {
  bulan: string;
  bulanPanjang: string;
  tahun: number;
  total: number;
}

interface DonutDatum {
  name: string;
  value: number;
  pct: string;
  color: string;
}

interface ProvinsiDatum {
  provinsi: string;
  total: number;
}

interface ProcessStepBase {
  no: number;
  label: string;
  value: number;
  pct: string;
  icon: LucideIcon;
}

interface ProcessStepDisplay extends ProcessStepBase {
  valueDisplay: string;
}

interface NotificationItem {
  title: string;
  desc: string;
  time: string;
  icon: LucideIcon;
  tone: string;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
}

interface StatCardItem {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  ring: string;
  card: string;
  noArrow?: boolean;
}

/* ------------------------------- KONSTAN WAKTU ------------------------------- */

const BULAN_ID = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agt", "Sep", "Okt", "Nov", "Des",
];
const BULAN_PANJANG_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

// Bentuk array 12 bulan terakhir (termasuk bulan berjalan) berdasarkan tanggal hari ini,
// sehingga grafik tren & filter periode selalu relevan dengan waktu sekarang.
function buildLast12Months(baseDate: Date): MonthData[] {
  const bentukDasar = [240, 410, 660, 880, 760, 1040, 980, 1010, 960, 1090, 1150, 1287];
  const arr: MonthData[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(baseDate.getFullYear(), baseDate.getMonth() - i, 1);
    arr.push({
      bulan: BULAN_ID[d.getMonth()],
      bulanPanjang: BULAN_PANJANG_ID[d.getMonth()],
      tahun: d.getFullYear(),
      total: bentukDasar[11 - i],
    });
  }
  return arr;
}

function formatID(n: number): string {
  return Math.round(n).toLocaleString("id-ID");
}

/* ---------------------------------- DATA DASAR (100%) ---------------------------------- */

const jenisLayananBase: DonutDatum[] = [
  { name: "Akreditasi Baru", value: 687, pct: "53,3%", color: "#3b82f6" },
  { name: "Reakreditasi", value: 412, pct: "32,0%", color: "#22c55e" },
  { name: "Penambahan Program", value: 188, pct: "14,7%", color: "#f59e0b" },
];

const statusPengajuanBase: DonutDatum[] = [
  { name: "Verifikasi", value: 312, pct: "24,3%", color: "#3b82f6" },
  { name: "Asesmen", value: 541, pct: "42,0%", color: "#22c55e" },
  { name: "Review", value: 213, pct: "16,5%", color: "#f59e0b" },
  { name: "Menunggu Keputusan", value: 221, pct: "17,2%", color: "#8b5cf6" },
];

const pembiayaanBase: DonutDatum[] = [
  { name: "APBN", value: 784, pct: "60,9%", color: "#3b82f6" },
  { name: "APBD", value: 219, pct: "17,0%", color: "#22c55e" },
  { name: "Mandiri", value: 284, pct: "22,1%", color: "#f59e0b" },
];

const provinsiBase: ProvinsiDatum[] = [
  { provinsi: "Jawa Barat", total: 214 },
  { provinsi: "Jawa Timur", total: 187 },
  { provinsi: "Jawa Tengah", total: 152 },
  { provinsi: "Sumatera Utara", total: 98 },
  { provinsi: "Sulawesi Selatan", total: 76 },
];

const processStepsBase: ProcessStepBase[] = [
  { no: 1, label: "Pengajuan", value: 1287, pct: "100%", icon: FileText },
  { no: 2, label: "Verifikasi", value: 975, pct: "75,7%", icon: CheckSquare },
  { no: 3, label: "Penugasan", value: 821, pct: "63,8%", icon: Users },
  { no: 4, label: "Asesmen", value: 541, pct: "42,0%", icon: ClipboardList },
  { no: 5, label: "Review", value: 213, pct: "16,5%", icon: Eye },
  { no: 6, label: "Keputusan", value: 187, pct: "14,5%", icon: Gavel },
  { no: 7, label: "Sertifikat", value: 732, pct: "(2026)", icon: Award },
];

const notifications: NotificationItem[] = [
  {
    title: "Pengajuan baru diterima",
    desc: "LPK Mitra Sejahtera - Akreditasi Baru",
    time: "10 menit lalu",
    icon: FileText,
    tone: "text-blue-600 bg-blue-50",
  },
  {
    title: "SLA hampir terlampaui",
    desc: "Pengajuan ID: AKR-2026-001245",
    time: "1 jam lalu",
    icon: AlertTriangle,
    tone: "text-amber-600 bg-amber-50",
  },
  {
    title: "Tugas asesmen baru",
    desc: "LPK Bina Mandiri - Reakreditasi",
    time: "2 jam lalu",
    icon: Wrench,
    tone: "text-emerald-600 bg-emerald-50",
  },
];

const quickAccess: NavItem[] = [
  { label: "Pengajuan Baru", icon: Plus },
  { label: "Monitoring SLA", icon: Activity },
  { label: "Laporan", icon: BarChart3 },
  { label: "Bantuan", icon: HelpCircle },
];

const modulNav: NavItem[] = [
  { label: "Pengajuan Akreditasi", icon: FileText },
  { label: "Verifikasi", icon: CheckSquare },
  { label: "Penugasan Asesor", icon: Users },
  { label: "Asesmen", icon: ClipboardList },
  { label: "Review", icon: Eye },
  { label: "Keputusan", icon: Gavel },
  { label: "Sertifikat", icon: Award },
  { label: "Pembiayaan", icon: Wallet },
  { label: "Monitoring & SLA", icon: Activity },
  { label: "Laporan & Analitik", icon: BarChart3 },
];

const dashboardNav: NavItem[] = [
  { label: "Dashboard Nasional", icon: UserCircle2 },
  { label: "Dashboard Asesor", icon: Users },
  { label: "Dashboard LPK", icon: Building2 },
  { label: "Dashboard Administrator", icon: ShieldCheck },
];

/* --------------------------------- KOMPONEN BANTU --------------------------------- */

interface DonutCardProps {
  title: string;
  data: DonutDatum[];
  total: string;
}

function DonutCard({ title, data, total }: DonutCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">{title}</h3>
      <div className="flex items-center gap-5">
        <div className="relative w-32 h-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="68%"
                outerRadius="100%"
                paddingAngle={2}
                stroke="none"
                isAnimationActive={false}
              >
                {data.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[11px] text-slate-400">Total</span>
            <span className="text-lg font-bold text-slate-800">{total}</span>
          </div>
        </div>
        <ul className="flex-1 space-y-2 min-w-0">
          {data.map((d) => (
            <li key={d.name} className="flex items-center gap-2 text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-slate-500 truncate flex-1">{d.name}</span>
              <span className="font-semibold text-slate-800 whitespace-nowrap">
                {formatID(d.value)}{" "}
                <span className="text-slate-400 font-normal">({d.pct})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button className="mt-4 self-start text-xs font-medium text-blue-600 flex items-center gap-1 hover:gap-1.5 transition-all">
        Lihat Detail <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

interface StatCardProps {
  item: StatCardItem;
}

function StatCard({ item }: StatCardProps) {
  const Icon = item.icon;
  return (
    <div className={`rounded-2xl border p-4 ${item.card}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 mb-1">{item.label}</p>
          <p className="text-2xl font-bold text-slate-800">{item.value}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.ring}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p
        className={`mt-2 text-[11px] flex items-center gap-1 ${
          item.noArrow ? "text-slate-400" : "text-emerald-600"
        }`}
      >
        {!item.noArrow && <ArrowUpRight className="w-3 h-3" />}
        {item.delta}
      </p>
    </div>
  );
}

interface SidebarLinkProps {
  label: string;
  Icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}

function SidebarLink({ label, Icon, active, onClick }: SidebarLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        active
          ? "bg-blue-600 text-white font-medium"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="truncate text-left">{label}</span>
    </button>
  );
}

/* ---------------------------------- APP ---------------------------------- */

export default function App() {
  const [active, setActive] = useState("Dashboard Nasional");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Jam & tanggal berjalan (WIB) — diperbarui setiap detik.
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const tanggalWIB = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  const jamWIB = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    hour12: false,
  });

  // 12 bulan terakhir dihitung dari tanggal hari ini, sehingga selalu relevan.
  const trenData = useMemo(() => buildLast12Months(now), [now.getMonth(), now.getFullYear()]);

  // Filter Periode: default ke bulan berjalan (indeks terakhir array).
  const [periodIndex, setPeriodIndex] = useState(trenData.length - 1);
  const [periodOpen, setPeriodOpen] = useState(false);
  const periodRef = useRef<HTMLDivElement>(null);

  // Jaga agar periodIndex tetap valid saat bulan berganti (mis. aplikasi dibiarkan terbuka lewat tengah malam).
  useEffect(() => {
    setPeriodIndex(trenData.length - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trenData.length]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) {
        setPeriodOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedPeriod = trenData[periodIndex];
  const latestPeriod = trenData[trenData.length - 1];
  // Rasio data periode terpilih relatif terhadap bulan berjalan — dipakai untuk
  // menyesuaikan seluruh kartu & grafik yang bersifat "per periode".
  const ratio = selectedPeriod.total / latestPeriod.total;

  const scaleList = (list: DonutDatum[]): DonutDatum[] =>
    list.map((d) => ({ ...d, value: Math.round(d.value * ratio) }));
  const jenisLayananData = useMemo(() => scaleList(jenisLayananBase), [ratio]);
  const statusPengajuanData = useMemo(() => scaleList(statusPengajuanBase), [ratio]);
  const pembiayaanData = useMemo(() => scaleList(pembiayaanBase), [ratio]);
  const provinsiData: ProvinsiDatum[] = useMemo(
    () => provinsiBase.map((d) => ({ ...d, total: Math.round(d.total * ratio) })),
    [ratio]
  );
  const processSteps: ProcessStepDisplay[] = useMemo(
    () => processStepsBase.map((s) => ({ ...s, valueDisplay: formatID(s.value * ratio) })),
    [ratio]
  );

  const pengajuanAktifTotal = Math.round(1287 * ratio);
  const sertifikatTotal = Math.round(732 * ratio);
  const slaTotal = pengajuanAktifTotal;
  const slaTerlampaui = Math.round((102 / 1287) * pengajuanAktifTotal);

  const statCards: StatCardItem[] = [
    {
      label: "Total LPK Terdaftar",
      value: "16.382",
      delta: "+3,2% dari bulan lalu",
      icon: Building2,
      ring: "bg-blue-50 text-blue-600",
      card: "bg-white border-slate-200",
    },
    {
      label: "LPK Terakreditasi",
      value: "1.504",
      delta: "+4,5% dari bulan lalu",
      icon: ShieldCheck,
      ring: "bg-emerald-50 text-emerald-600",
      card: "bg-white border-slate-200",
    },
    {
      label: "Pengajuan Aktif",
      value: formatID(pengajuanAktifTotal),
      delta:
        periodIndex === trenData.length - 1
          ? "+8,7% dari bulan lalu"
          : `Data periode ${selectedPeriod.bulanPanjang} ${selectedPeriod.tahun}`,
      icon: FileText,
      ring: "bg-amber-50 text-amber-600",
      card: "bg-amber-50/60 border-amber-100",
      noArrow: periodIndex !== trenData.length - 1,
    },
    {
      label: "Sertifikat Terbit (2026)",
      value: formatID(sertifikatTotal),
      delta: "+12,1% dari bulan lalu",
      icon: ClipboardList,
      ring: "bg-violet-50 text-violet-600",
      card: "bg-violet-50/60 border-violet-100",
    },
    {
      label: "Asesor Aktif",
      value: "346",
      delta: "(58 sesuai syarat)",
      icon: UserCircle2,
      ring: "bg-sky-50 text-sky-600",
      card: "bg-white border-slate-200",
      noArrow: true,
    },
  ];

  const isDashboard = active === "Dashboard Nasional";
  // Grafik tren menampilkan riwayat sampai dengan periode yang dipilih.
  const trenDitampilkan = trenData.slice(0, periodIndex + 1);

  const SidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64">
      <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-sm">
          SPA
        </div>
        <div className="min-w-0">
          <p className="font-semibold leading-tight truncate">SPA</p>
          <p className="text-[11px] text-slate-400 leading-tight truncate">
            Software Pengelolaan Akreditasi
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <SidebarLink
            label="Dashboard"
            Icon={LayoutDashboard}
            active={false}
            onClick={() => setActive("Dashboard Nasional")}
          />
        </div>

        <div>
          <p className="px-3 mb-2 text-[11px] font-semibold text-slate-500 tracking-wide">
            MODUL
          </p>
          <div className="space-y-1">
            {modulNav.map((item) => (
              <SidebarLink
                key={item.label}
                label={item.label}
                Icon={item.icon}
                active={active === item.label}
                onClick={() => {
                  setActive(item.label);
                  setMobileOpen(false);
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 mb-2 text-[11px] font-semibold text-slate-500 tracking-wide">
            DASHBOARD
          </p>
          <div className="space-y-1">
            {dashboardNav.map((item) => (
              <SidebarLink
                key={item.label}
                label={item.label}
                Icon={item.icon}
                active={active === item.label}
                onClick={() => {
                  setActive(item.label);
                  setMobileOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-slate-800 text-[11px] text-slate-500">
        <p>SPA v7.1.2</p>
        <p>© {now.getFullYear()} Kemenaker RI</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:block shrink-0">{SidebarContent}</aside>

      {/* Sidebar - mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0">{SidebarContent}</div>
          <button
            className="absolute top-4 right-4 text-white bg-slate-800 rounded-lg p-2"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <button
                className="lg:hidden p-2 rounded-lg border border-slate-200 shrink-0"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-blue-900 truncate">
                  DASHBOARD NASIONAL AKREDITASI LPK
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 truncate">
                  Software Pengelolaan Akreditasi (SPA)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                {tanggalWIB} &nbsp;{jamWIB} WIB
              </div>

              {/* Filter Periode */}
              <div className="relative" ref={periodRef}>
                <button
                  onClick={() => setPeriodOpen((o) => !o)}
                  className="flex items-center gap-1.5 text-xs border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50"
                >
                  {selectedPeriod.bulanPanjang} {selectedPeriod.tahun}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${periodOpen ? "rotate-180" : ""}`} />
                </button>
                {periodOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 max-h-72 overflow-y-auto">
                    {trenData.map((p, i) => (
                      <button
                        key={`${p.bulan}-${p.tahun}`}
                        onClick={() => {
                          setPeriodIndex(i);
                          setPeriodOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${
                          i === periodIndex ? "text-blue-600 font-semibold" : "text-slate-600"
                        }`}
                      >
                        <span>
                          {p.bulanPanjang} {p.tahun}
                        </span>
                        {i === trenData.length - 1 && (
                          <span className="text-[10px] text-slate-400">berjalan</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-blue-900 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div className="leading-tight">
                  <p className="text-[11px] font-semibold text-slate-700">
                    KEMENTERIAN KETENAGAKERJAAN
                  </p>
                  <p className="text-[10px] text-slate-400">REPUBLIK INDONESIA</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!isDashboard ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-3 min-h-[60vh]">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">{active}</h2>
              <p className="text-sm text-slate-500 max-w-sm">
                Modul ini sedang dalam pengembangan. Pilih "Dashboard Nasional"
                di menu untuk melihat ringkasan data akreditasi LPK.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {periodIndex !== trenData.length - 1 && (
                <div className="flex items-center gap-2 text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded-xl px-4 py-2.5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  Menampilkan data periode{" "}
                  <span className="font-semibold">
                    {selectedPeriod.bulanPanjang} {selectedPeriod.tahun}
                  </span>
                  . &nbsp;
                  <button
                    onClick={() => setPeriodIndex(trenData.length - 1)}
                    className="underline font-medium"
                  >
                    Kembali ke bulan berjalan
                  </button>
                </div>
              )}

              {/* Stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {statCards.map((item) => (
                  <StatCard key={item.label} item={item} />
                ))}
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left column */}
                <div className="flex-1 min-w-0 flex flex-col gap-4">
                  {/* Donut row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DonutCard
                      title="Pengajuan Berdasarkan Jenis Layanan"
                      data={jenisLayananData}
                      total={formatID(pengajuanAktifTotal)}
                    />
                    <DonutCard
                      title="Status Pengajuan"
                      data={statusPengajuanData}
                      total={formatID(pengajuanAktifTotal)}
                    />
                    <DonutCard
                      title="Pengajuan Berdasarkan Pembiayaan"
                      data={pembiayaanData}
                      total={formatID(pengajuanAktifTotal)}
                    />
                  </div>

                  {/* Line + bar row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5">
                      <h3 className="text-sm font-semibold text-slate-800 mb-4">
                        Tren Pengajuan (12 Bulan Terakhir)
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trenDitampilkan} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                            <XAxis
                              dataKey="bulan"
                              tick={{ fontSize: 11, fill: "#94a3b8" }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis
                              tick={{ fontSize: 11, fill: "#94a3b8" }}
                              axisLine={false}
                              tickLine={false}
                              domain={[0, "dataMax + 200"]}
                            />
                            <Tooltip
                              formatter={(v: number) => formatID(v)}
                              labelFormatter={(label: string, payload) =>
                                payload && payload[0]
                                  ? `${(payload[0].payload as MonthData).bulanPanjang} ${
                                      (payload[0].payload as MonthData).tahun
                                    }`
                                  : label
                              }
                              contentStyle={{ fontSize: 12, borderRadius: 8 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="total"
                              stroke="#2563eb"
                              strokeWidth={2.5}
                              dot={{ r: 3, fill: "#2563eb" }}
                              activeDot={{ r: 5 }}
                              isAnimationActive={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                      <h3 className="text-sm font-semibold text-slate-800 mb-4">
                        Top 5 Provinsi - Pengajuan Terbanyak
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={provinsiData}
                            layout="vertical"
                            margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
                          >
                            <XAxis type="number" hide />
                            <YAxis
                              type="category"
                              dataKey="provinsi"
                              width={90}
                              tick={{ fontSize: 11, fill: "#475569" }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Bar dataKey="total" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={16} isAnimationActive={false}>
                              <LabelList
                                dataKey="total"
                                position="right"
                                style={{ fontSize: 11, fill: "#1e293b", fontWeight: 600 }}
                                formatter={(v: number) => formatID(v)}
                              />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <button className="mt-2 text-xs font-medium text-blue-600 flex items-center gap-1">
                        Lihat Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Process steps */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <h3 className="text-sm font-semibold text-slate-800 mb-5">
                      Ringkasan Proses Akreditasi
                    </h3>
                    <div className="flex items-stretch overflow-x-auto pb-1 gap-1">
                      {processSteps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                          <React.Fragment key={step.no}>
                            <div className="flex flex-col items-center text-center min-w-[92px]">
                              <p className="text-[11px] text-slate-400 mb-1">
                                {step.no}. {step.label}
                              </p>
                              <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-1">
                                <Icon className="w-5 h-5 text-blue-600" />
                              </div>
                              <p className="text-sm font-bold text-slate-800">{step.valueDisplay}</p>
                              <p className="text-[11px] text-slate-400">{step.pct}</p>
                            </div>
                            {i < processSteps.length - 1 && (
                              <ChevronRight className="w-4 h-4 text-slate-300 self-center shrink-0" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
                  {/* SLA */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4">SLA Pengajuan</h3>
                    <div className="relative w-32 h-32 mx-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[{ value: 92 }, { value: 8 }]}
                            dataKey="value"
                            innerRadius="72%"
                            outerRadius="100%"
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                            isAnimationActive={false}
                          >
                            <Cell fill="#22c55e" />
                            <Cell fill="#e2e8f0" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-slate-800">92%</span>
                        <span className="text-[11px] text-slate-400">Terkendali</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center mt-3">
                      SLA Terlampaui{" "}
                      <span className="font-semibold text-red-500">{formatID(slaTerlampaui)}</span> dari{" "}
                      {formatID(slaTotal)}
                    </p>
                    <button className="mt-3 text-xs font-medium text-blue-600 flex items-center gap-1">
                      Lihat Detail <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Beban kerja */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">
                      Beban Kerja Asesor
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-400">Rata-rata Per Asesor</p>
                        <p className="text-lg font-bold text-slate-800">
                          {(8.5 * ratio).toFixed(1).replace(".", ",")}{" "}
                          <span className="text-xs font-normal text-slate-400">Pengajuan Aktif</span>
                        </p>
                      </div>
                    </div>
                    <button className="mt-3 text-xs font-medium text-blue-600 flex items-center gap-1">
                      Lihat Detail <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Notifikasi */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                        <Bell className="w-4 h-4 text-slate-400" /> Notifikasi
                      </h3>
                      <button className="text-xs text-blue-600 font-medium">Lihat Semua</button>
                    </div>
                    <ul className="space-y-3">
                      {notifications.map((n) => {
                        const Icon = n.icon;
                        return (
                          <li key={n.title} className="flex gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.tone}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-slate-800 truncate">{n.title}</p>
                              <p className="text-[11px] text-slate-500 truncate">{n.desc}</p>
                              <p className="text-[10px] text-slate-400">{n.time}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Akses cepat */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Akses Cepat</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {quickAccess.map((q) => {
                        const Icon = q.icon;
                        return (
                          <button
                            key={q.label}
                            className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-slate-200 hover:bg-slate-50"
                          >
                            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-slate-600" />
                            </div>
                            <span className="text-[10px] text-slate-500 text-center leading-tight">
                              {q.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <footer className="text-[11px] text-slate-400 flex flex-wrap justify-between gap-2 pt-2">
                <span>
                  Sumber Data: SPA Kemenaker RI &nbsp;|&nbsp; Data per {tanggalWIB} {jamWIB} WIB
                </span>
                <span>Data Real-time &nbsp;•&nbsp; Integrasi SIAPKerja &nbsp;•&nbsp; Akurat &nbsp;•&nbsp; Transparan &nbsp;•&nbsp; Akuntabel</span>
              </footer>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
