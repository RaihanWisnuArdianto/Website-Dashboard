import type { DashboardData, ModuleData, ModuleDefinition, ModuleRow, MonthRecord, PeriodKey, PeriodOption } from "@/types";
import { FileText, CheckSquare, Users, ClipboardList, Eye, Gavel, Award } from "lucide-react";

// ---- Shared reference lists (ported from the original prototype) ----

export const LPK_NAMES = [
  "LPK Mitra Sejahtera", "LPK Bina Mandiri", "LPK Cendekia Karya", "LPK Nusantara Terampil",
  "LPK Sinar Vokasi", "LPK Karya Bangsa", "LPK Terampil Jaya", "LPK Anugerah Kompeten",
  "LPK Cipta Mandiri", "LPK Bumi Persada", "LPK Garuda Vokasi", "LPK Harapan Bangsa",
];

export const PROVINCES = [
  "Jawa Barat", "Jawa Timur", "Jawa Tengah", "Sumatera Utara",
  "Sulawesi Selatan", "DKI Jakarta", "Banten", "Kalimantan Timur",
];

export const ASESOR_NAMES = [
  "Dr. Ahmad Fauzi", "Siti Rahayu, M.Pd", "Budi Santoso", "Rina Kartika, S.T",
  "Hendra Wijaya", "Dewi Lestari", "Agus Setiawan", "Maya Puspita",
  "Rudi Hartono", "Fitri Anggraini",
];

export const COLORS = {
  blue: "#2f6fed",
  green: "#12a454",
  orange: "#e88a1b",
  purple: "#7c4dee",
  teal: "#0d9c93",
  red: "#e0433c",
};

export const PERIOD_OPTIONS: PeriodOption[] = [
  { key: "mei2026", label: "Mei 2026" },
  { key: "apr2026", label: "April 2026" },
  { key: "mar2026", label: "Maret 2026" },
  { key: "q2026", label: "Kuartal I 2026" },
  { key: "y2026", label: "Tahun 2026" },
];

const TREND_MONTHS = ["Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei"];

// ---- Dashboard stats per period ----

// Raw records (Simulates your future database rows)
export const HISTORICAL_RECORDS: MonthRecord[] = [
  {
    periodKey: "mar2026",
    label: "Maret 2026",
    asOfDate: "31 Maret 2026 16:00 WIB",
    totalSubmissions: 1102,
    lpkCount: 15420,
    accreditedCount: 1378,
    activeAssessors: 331,
  },
  {
    periodKey: "apr2026",
    label: "April 2026",
    asOfDate: "30 April 2026 17:00 WIB",
    totalSubmissions: 1184,
    lpkCount: 15870,
    accreditedCount: 1439,
    activeAssessors: 339,
  },
  {
    periodKey: "mei2026",
    label: "Mei 2026",
    asOfDate: "19 Mei 2026 10:30 WIB",
    totalSubmissions: 1287,
    lpkCount: 16382,
    accreditedCount: 1504,
    activeAssessors: 346,
  },
];

// Transformer function (Generates chart data from selected month)
export function getDashboardData(periodKey: string): DashboardData {
  const record = HISTORICAL_RECORDS.find((r) => r.periodKey === periodKey) 
    || HISTORICAL_RECORDS[HISTORICAL_RECORDS.length - 1];

  const BASELINE_TOTAL = 1287; // Mei benchmark total
  const ratio = record.totalSubmissions / BASELINE_TOTAL;

  return {
    ...record,
    jenis: [
      { name: "Akreditasi Baru", value: Math.round(687 * ratio), pct: "53,3%", color: "#3b82f6" },
      { name: "Reakreditasi", value: Math.round(412 * ratio), pct: "32,0%", color: "#22c55e" },
      { name: "Penambahan Program", value: Math.round(188 * ratio), pct: "14,7%", color: "#f59e0b" },
    ],
    status: [
      { name: "Verifikasi", value: Math.round(312 * ratio), pct: "24,3%", color: "#3b82f6" },
      { name: "Asesmen", value: Math.round(541 * ratio), pct: "42,0%", color: "#22c55e" },
      { name: "Review", value: Math.round(213 * ratio), pct: "16,5%", color: "#f59e0b" },
      { name: "Menunggu Keputusan", value: Math.round(221 * ratio), pct: "17,2%", color: "#8b5cf6" },
    ],
    biaya: [
      { name: "APBN", value: Math.round(784 * ratio), pct: "60,9%", color: "#3b82f6" },
      { name: "APBD", value: Math.round(219 * ratio), pct: "17,0%", color: "#22c55e" },
      { name: "Mandiri", value: Math.round(284 * ratio), pct: "22,1%", color: "#f59e0b" },
    ],
    topProvinces: [
      { province: "Jawa Barat", count: Math.round(214 * ratio) },
      { province: "Jawa Timur", count: Math.round(187 * ratio) },
      { province: "Jawa Tengah", count: Math.round(152 * ratio) },
      { province: "Sumatera Utara", count: Math.round(98 * ratio) },
      { province: "Sulawesi Selatan", count: Math.round(76 * ratio) },
    ],
    process: [
      { no: 1, label: "Pengajuan", value: record.totalSubmissions, pct: "100%" },
      { no: 2, label: "Verifikasi", value: Math.round(975 * ratio), pct: "75,7%" },
      { no: 3, label: "Penugasan", value: Math.round(821 * ratio), pct: "63,8%" },
      { no: 4, label: "Asesmen", value: Math.round(541 * ratio), pct: "42,0%" },
      { no: 5, label: "Review", value: Math.round(213 * ratio), pct: "16,5%" },
      { no: 6, label: "Keputusan", value: Math.round(187 * ratio), pct: "14,5%" },
    ],
    workload: (8.5 * ratio).toFixed(1).replace(".", ","),
  };
}

// ---- Module (table) definitions + seeded rows ----

function seededRows(n: number, gen: (i: number) => ModuleRow): ModuleRow[] {
  return Array.from({ length: n }, (_, i) => gen(i));
}

type DefWithoutCount = Omit<ModuleDefinition, "count">;

const DEFINITIONS_BASE: DefWithoutCount[] = [
  { key: "mod-pengajuan", navLabel: "Pengajuan Akreditasi", title: "Pengajuan Akreditasi", sub: "Daftar seluruh pengajuan akreditasi yang masuk ke sistem.", addLabel: "Pengajuan Baru", cols: ["ID Pengajuan", "Nama LPK", "Jenis Layanan", "Provinsi", "Tanggal Ajuan", "Status"], statusKey: "Status", icon: "FileText", showBadge: true },
  { key: "mod-verifikasi", navLabel: "Verifikasi", title: "Verifikasi Dokumen", sub: "Status verifikasi kelengkapan dokumen pengajuan.", addLabel: "Verifikasi Baru", cols: ["ID Pengajuan", "Nama LPK", "Petugas Verifikasi", "Tanggal", "Status"], statusKey: "Status", icon: "CheckSquare", showBadge: true },
  { key: "mod-penugasan", navLabel: "Penugasan Asesor", title: "Penugasan Asesor", sub: "Alokasi asesor untuk setiap pengajuan yang lolos verifikasi.", addLabel: "Penugasan Asesor", cols: ["ID Pengajuan", "Nama LPK", "Asesor Ditugaskan", "Tanggal Penugasan", "Status"], statusKey: "Status", icon: "Users", showBadge: true },
  { key: "mod-asesmen", navLabel: "Asesmen", title: "Asesmen Lapangan", sub: "Pelaksanaan dan hasil asesmen lapangan LPK.", addLabel: "Jadwal Asesmen", cols: ["ID Pengajuan", "Nama LPK", "Asesor", "Tanggal Asesmen", "Status"], statusKey: "Status", icon: "ClipboardList", showBadge: true },
  { key: "mod-review", navLabel: "Review", title: "Review Hasil Asesmen", sub: "Peninjauan hasil asesmen sebelum keputusan akhir.", addLabel: "Ajukan Review", cols: ["ID Pengajuan", "Nama LPK", "Reviewer", "Tanggal Review", "Status"], statusKey: "Status", icon: "PenSquare", showBadge: true },
  { key: "mod-keputusan", navLabel: "Keputusan", title: "Keputusan Akreditasi", sub: "Keputusan akhir status akreditasi lembaga.", addLabel: "Terbitkan Keputusan", cols: ["ID Pengajuan", "Nama LPK", "Nomor SK", "Tanggal Keputusan", "Status"], statusKey: "Status", icon: "Scale", showBadge: true },
  { key: "mod-sertifikat", navLabel: "Sertifikat", title: "Sertifikat Akreditasi", sub: "Daftar sertifikat akreditasi yang telah diterbitkan.", addLabel: "Terbitkan Sertifikat", cols: ["No. Sertifikat", "Nama LPK", "Jenis Layanan", "Tanggal Terbit", "Status"], statusKey: "Status", icon: "Award", showBadge: true },
  { key: "mod-pembiayaan", navLabel: "Pembiayaan", title: "Pembiayaan Akreditasi", sub: "Rincian sumber dan status pembiayaan pengajuan akreditasi.", addLabel: "Catat Pembiayaan", cols: ["ID Pengajuan", "Nama LPK", "Sumber Dana", "Nominal", "Status"], statusKey: "Status", icon: "Wallet", showBadge: false },
  { key: "mod-monitoring", navLabel: "Monitoring & SLA", title: "Monitoring & SLA", sub: "Pemantauan tenggat waktu (SLA) tiap tahapan proses akreditasi.", addLabel: "Ekspor Laporan SLA", cols: ["ID Pengajuan", "Nama LPK", "Tahap Saat Ini", "Sisa Waktu SLA", "Status"], statusKey: "Status", icon: "Clock", showBadge: false },
  { key: "mod-laporan", navLabel: "Laporan & Analitik", title: "Laporan & Analitik", sub: "Ringkasan performa akreditasi per wilayah dan periode.", addLabel: "Ekspor Laporan", cols: ["Provinsi", "Jumlah Pengajuan", "Terakreditasi", "Rata-rata SLA", "Status"], statusKey: "Status", icon: "BarChart3", showBadge: false },
];

function buildRows(key: string): ModuleRow[] {
  switch (key) {
    case "mod-pengajuan":
      return seededRows(12, (i) => ({
        "ID Pengajuan": `AKR-2026-0${1200 + i}`, "Nama LPK": LPK_NAMES[i % LPK_NAMES.length],
        "Jenis Layanan": ["Akreditasi Baru", "Reakreditasi", "Penambahan Program"][i % 3],
        "Provinsi": PROVINCES[i % PROVINCES.length], "Tanggal Ajuan": `0${(i % 9) + 1} Mei 2026`,
        "Status": ["Menunggu Verifikasi", "Dalam Proses", "Terverifikasi", "Ditolak"][i % 4],
      }));
      break;
    case "mod-verifikasi":
      return seededRows(12, (i) => ({
        "ID Pengajuan": `AKR-2026-0${1150 + i}`, "Nama LPK": LPK_NAMES[(i + 2) % LPK_NAMES.length],
        "Petugas Verifikasi": ASESOR_NAMES[i % ASESOR_NAMES.length], "Tanggal": `0${(i % 9) + 1} Mei 2026`,
        "Status": ["Terverifikasi", "Menunggu Verifikasi", "Ditolak"][i % 3],
      }));
    case "mod-penugasan":
      return seededRows(12, (i) => ({
        "ID Pengajuan": `AKR-2026-0${1100 + i}`, "Nama LPK": LPK_NAMES[(i + 4) % LPK_NAMES.length],
        "Asesor Ditugaskan": ASESOR_NAMES[(i + 1) % ASESOR_NAMES.length], "Tanggal Penugasan": `0${(i % 9) + 1} Mei 2026`,
        "Status": ["Terjadwal", "Dalam Proses", "Selesai"][i % 3],
      }));
    case "mod-asesmen":
      return seededRows(12, (i) => ({
        "ID Pengajuan": `AKR-2026-0${1080 + i}`, "Nama LPK": LPK_NAMES[(i + 6) % LPK_NAMES.length],
        "Asesor": ASESOR_NAMES[(i + 3) % ASESOR_NAMES.length], "Tanggal Asesmen": `0${(i % 9) + 1} Mei 2026`,
        "Status": ["Terjadwal", "Dalam Proses", "Selesai"][i % 3],
      }));
    case "mod-review":
      return seededRows(10, (i) => ({
        "ID Pengajuan": `AKR-2026-0${1050 + i}`, "Nama LPK": LPK_NAMES[(i + 1) % LPK_NAMES.length],
        "Reviewer": ASESOR_NAMES[(i + 5) % ASESOR_NAMES.length], "Tanggal Review": `0${(i % 9) + 1} Mei 2026`,
        "Status": ["Ditinjau", "Disetujui", "Ditolak"][i % 3],
      }));
    case "mod-keputusan":
      return seededRows(10, (i) => ({
        "ID Pengajuan": `AKR-2026-0${1020 + i}`, "Nama LPK": LPK_NAMES[(i + 7) % LPK_NAMES.length],
        "Nomor SK": `SK/${400 + i}/LTV/2026`, "Tanggal Keputusan": `0${(i % 9) + 1} Mei 2026`,
        "Status": ["Disetujui", "Ditinjau", "Ditolak"][i % 3],
      }));
    case "mod-sertifikat":
      return seededRows(12, (i) => ({
        "No. Sertifikat": `SERT-2026-0${700 + i}`, "Nama LPK": LPK_NAMES[i % LPK_NAMES.length],
        "Jenis Layanan": ["Akreditasi Baru", "Reakreditasi"][i % 2], "Tanggal Terbit": `0${(i % 9) + 1} Mei 2026`,
        "Status": ["Terbit", "Diproses"][i % 2],
      }));
    case "mod-pembiayaan":
      return seededRows(12, (i) => ({
        "ID Pengajuan": `AKR-2026-0${1300 + i}`, "Nama LPK": LPK_NAMES[(i + 3) % LPK_NAMES.length],
        "Sumber Dana": ["APBN", "APBD", "Mandiri"][i % 3], "Nominal": `Rp ${15 + i}.500.000`,
        "Status": ["Cair", "Pending", "Diproses"][i % 3],
      }));
    case "mod-monitoring":
      return seededRows(12, (i) => ({
        "ID Pengajuan": `AKR-2026-0${1400 + i}`, "Nama LPK": LPK_NAMES[(i + 8) % LPK_NAMES.length],
        "Tahap Saat Ini": ["Verifikasi", "Asesmen", "Review", "Keputusan"][i % 4],
        "Sisa Waktu SLA": i % 5 === 0 ? "Terlampaui" : `${3 + (i % 10)} hari`,
        "Status": i % 5 === 0 ? "Kritis" : i % 3 === 0 ? "Perhatian" : "Normal",
      }));
    case "mod-laporan":
      return PROVINCES.map((p, i) => ({
        "Provinsi": p, "Jumlah Pengajuan": 214 - i * 22 > 0 ? 214 - i * 22 : 40,
        "Terakreditasi": 160 - i * 15 > 0 ? 160 - i * 15 : 30, "Rata-rata SLA": `${5 + i} hari`,
        "Status": i % 3 === 0 ? "Normal" : i % 3 === 1 ? "Perhatian" : "Normal",
      }));
    default:
      return [];
  }
}

// Rows are computed once per key and reused — this is what a real
// backend's response would look like, just generated locally instead
// of fetched.
const ROWS_BY_KEY: Record<string, ModuleRow[]> = Object.fromEntries(
  DEFINITIONS_BASE.map((def) => [def.key, buildRows(def.key)])
);

const MODULE_DEFINITIONS: ModuleDefinition[] = DEFINITIONS_BASE.map((def) => ({
  ...def,
  count: ROWS_BY_KEY[def.key].length,
}));

export function getModuleDefinitions(): ModuleDefinition[] {
  return MODULE_DEFINITIONS;
}

export function getModuleData(key: string): ModuleData | undefined {
  const def = MODULE_DEFINITIONS.find((m) => m.key === key);
  if (!def) return undefined;
  return { ...def, rows: ROWS_BY_KEY[key] ?? [] };
}
