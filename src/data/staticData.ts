import type { DashboardData, ModuleData, ModuleDefinition, ModuleRow, PeriodKey, PeriodOption } from "@/types";

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

export const DASHBOARD_DATA: Record<PeriodKey, DashboardData> = {
  mei2026: {
    period: "mei2026", label: "Mei 2026", asOfDate: "19 Mei 2026 10:30 WIB",
    lpk: 16382, lpkDelta: 3.2, akreditasi: 1504, akreditasiDelta: 4.5,
    aktif: 1287, aktifDelta: 8.7, sertifikat: 732, sertifikatDelta: 12.1,
    asesor: 346, asesorNote: 58,
    jenis: [
      { label: "Akreditasi Baru", value: 687, color: COLORS.blue },
      { label: "Reakreditasi", value: 412, color: COLORS.green },
      { label: "Penambahan Program", value: 188, color: COLORS.orange },
    ],
    status: [
      { label: "Verifikasi", value: 312, color: COLORS.blue },
      { label: "Asesmen", value: 541, color: COLORS.green },
      { label: "Review", value: 213, color: COLORS.orange },
      { label: "Menunggu Keputusan", value: 221, color: COLORS.purple },
    ],
    biaya: [
      { label: "APBN", value: 784, color: COLORS.blue },
      { label: "APBD", value: 219, color: COLORS.green },
      { label: "Mandiri", value: 284, color: COLORS.orange },
    ],
    sla: 92, slaOver: 102,
    trend: [320, 410, 560, 780, 700, 980, 940, 950, 880, 1010, 1150, 1287],
    trendMonths: TREND_MONTHS,
    topProvinces: [
      { province: "Jawa Barat", count: 214 }, { province: "Jawa Timur", count: 187 },
      { province: "Jawa Tengah", count: 152 }, { province: "Sumatera Utara", count: 98 },
      { province: "Sulawesi Selatan", count: 76 },
    ],
    process: [
      { label: "Pengajuan", value: 1287, pct: 100 }, { label: "Verifikasi", value: 975, pct: 75.7 },
      { label: "Penugasan", value: 821, pct: 63.8 }, { label: "Asesmen", value: 541, pct: 42.0 },
      { label: "Review", value: 213, pct: 16.5 }, { label: "Keputusan", value: 187, pct: 14.5 },
      { label: "Sertifikat", value: 732, pct: null },
    ],
    workload: "8,5",
  },
  apr2026: {
    period: "apr2026", label: "April 2026", asOfDate: "30 April 2026 17:00 WIB",
    lpk: 15870, lpkDelta: 2.6, akreditasi: 1439, akreditasiDelta: 3.9,
    aktif: 1184, aktifDelta: 5.1, sertifikat: 653, sertifikatDelta: 9.8,
    asesor: 339, asesorNote: 55,
    jenis: [
      { label: "Akreditasi Baru", value: 612, color: COLORS.blue },
      { label: "Reakreditasi", value: 389, color: COLORS.green },
      { label: "Penambahan Program", value: 183, color: COLORS.orange },
    ],
    status: [
      { label: "Verifikasi", value: 287, color: COLORS.blue },
      { label: "Asesmen", value: 498, color: COLORS.green },
      { label: "Review", value: 196, color: COLORS.orange },
      { label: "Menunggu Keputusan", value: 203, color: COLORS.purple },
    ],
    biaya: [
      { label: "APBN", value: 711, color: COLORS.blue },
      { label: "APBD", value: 201, color: COLORS.green },
      { label: "Mandiri", value: 272, color: COLORS.orange },
    ],
    sla: 90, slaOver: 118,
    trend: [290, 375, 510, 720, 655, 905, 880, 900, 860, 955, 1050, 1184],
    trendMonths: TREND_MONTHS,
    topProvinces: [
      { province: "Jawa Barat", count: 198 }, { province: "Jawa Timur", count: 171 },
      { province: "Jawa Tengah", count: 140 }, { province: "Sumatera Utara", count: 90 },
      { province: "Sulawesi Selatan", count: 69 },
    ],
    process: [
      { label: "Pengajuan", value: 1184, pct: 100 }, { label: "Verifikasi", value: 882, pct: 74.5 },
      { label: "Penugasan", value: 751, pct: 63.4 }, { label: "Asesmen", value: 498, pct: 42.1 },
      { label: "Review", value: 196, pct: 16.6 }, { label: "Keputusan", value: 173, pct: 14.6 },
      { label: "Sertifikat", value: 653, pct: null },
    ],
    workload: "8,1",
  },
  mar2026: {
    period: "mar2026", label: "Maret 2026", asOfDate: "31 Maret 2026 16:00 WIB",
    lpk: 15420, lpkDelta: 1.9, akreditasi: 1378, akreditasiDelta: 3.1,
    aktif: 1102, aktifDelta: 4.0, sertifikat: 588, sertifikatDelta: 7.4,
    asesor: 331, asesorNote: 52,
    jenis: [
      { label: "Akreditasi Baru", value: 565, color: COLORS.blue },
      { label: "Reakreditasi", value: 362, color: COLORS.green },
      { label: "Penambahan Program", value: 175, color: COLORS.orange },
    ],
    status: [
      { label: "Verifikasi", value: 264, color: COLORS.blue },
      { label: "Asesmen", value: 462, color: COLORS.green },
      { label: "Review", value: 178, color: COLORS.orange },
      { label: "Menunggu Keputusan", value: 198, color: COLORS.purple },
    ],
    biaya: [
      { label: "APBN", value: 662, color: COLORS.blue },
      { label: "APBD", value: 188, color: COLORS.green },
      { label: "Mandiri", value: 252, color: COLORS.orange },
    ],
    sla: 88, slaOver: 132,
    trend: [260, 340, 470, 660, 600, 845, 810, 835, 795, 880, 965, 1102],
    trendMonths: TREND_MONTHS,
    topProvinces: [
      { province: "Jawa Barat", count: 180 }, { province: "Jawa Timur", count: 158 },
      { province: "Jawa Tengah", count: 129 }, { province: "Sumatera Utara", count: 83 },
      { province: "Sulawesi Selatan", count: 63 },
    ],
    process: [
      { label: "Pengajuan", value: 1102, pct: 100 }, { label: "Verifikasi", value: 806, pct: 73.1 },
      { label: "Penugasan", value: 679, pct: 61.6 }, { label: "Asesmen", value: 462, pct: 41.9 },
      { label: "Review", value: 178, pct: 16.2 }, { label: "Keputusan", value: 160, pct: 14.5 },
      { label: "Sertifikat", value: 588, pct: null },
    ],
    workload: "7,6",
  },
  q2026: {
    period: "q2026", label: "Kuartal I 2026", asOfDate: "31 Maret 2026 · Kumulatif Kuartal I",
    lpk: 16382, lpkDelta: 6.4, akreditasi: 1504, akreditasiDelta: 9.7,
    aktif: 3573, aktifDelta: 14.2, sertifikat: 1973, sertifikatDelta: 21.6,
    asesor: 346, asesorNote: 58,
    jenis: [
      { label: "Akreditasi Baru", value: 1864, color: COLORS.blue },
      { label: "Reakreditasi", value: 1163, color: COLORS.green },
      { label: "Penambahan Program", value: 546, color: COLORS.orange },
    ],
    status: [
      { label: "Verifikasi", value: 863, color: COLORS.blue },
      { label: "Asesmen", value: 1501, color: COLORS.green },
      { label: "Review", value: 587, color: COLORS.orange },
      { label: "Menunggu Keputusan", value: 622, color: COLORS.purple },
    ],
    biaya: [
      { label: "APBN", value: 2157, color: COLORS.blue },
      { label: "APBD", value: 608, color: COLORS.green },
      { label: "Mandiri", value: 808, color: COLORS.orange },
    ],
    sla: 90, slaOver: 352,
    trend: [260, 340, 470, 660, 600, 845, 810, 835, 795, 880, 965, 3573],
    trendMonths: TREND_MONTHS,
    topProvinces: [
      { province: "Jawa Barat", count: 592 }, { province: "Jawa Timur", count: 516 },
      { province: "Jawa Tengah", count: 421 }, { province: "Sumatera Utara", count: 271 },
      { province: "Sulawesi Selatan", count: 208 },
    ],
    process: [
      { label: "Pengajuan", value: 3573, pct: 100 }, { label: "Verifikasi", value: 2663, pct: 74.5 },
      { label: "Penugasan", value: 2251, pct: 63.0 }, { label: "Asesmen", value: 1501, pct: 42.0 },
      { label: "Review", value: 587, pct: 16.4 }, { label: "Keputusan", value: 520, pct: 14.6 },
      { label: "Sertifikat", value: 1973, pct: null },
    ],
    workload: "8,0",
  },
  y2026: {
    period: "y2026", label: "Tahun 2026 (s.d. Mei)", asOfDate: "19 Mei 2026 · Kumulatif Tahun Berjalan",
    lpk: 16382, lpkDelta: 9.8, akreditasi: 1504, akreditasiDelta: 15.3,
    aktif: 5860, aktifDelta: 22.5, sertifikat: 3218, sertifikatDelta: 31.2,
    asesor: 346, asesorNote: 58,
    jenis: [
      { label: "Akreditasi Baru", value: 3055, color: COLORS.blue },
      { label: "Reakreditasi", value: 1908, color: COLORS.green },
      { label: "Penambahan Program", value: 897, color: COLORS.orange },
    ],
    status: [
      { label: "Verifikasi", value: 1415, color: COLORS.blue },
      { label: "Asesmen", value: 2461, color: COLORS.green },
      { label: "Review", value: 963, color: COLORS.orange },
      { label: "Menunggu Keputusan", value: 1021, color: COLORS.purple },
    ],
    biaya: [
      { label: "APBN", value: 3540, color: COLORS.blue },
      { label: "APBD", value: 997, color: COLORS.green },
      { label: "Mandiri", value: 1323, color: COLORS.orange },
    ],
    sla: 91, slaOver: 527,
    trend: [320, 410, 560, 780, 700, 980, 940, 950, 880, 1010, 1150, 5860],
    trendMonths: TREND_MONTHS,
    topProvinces: [
      { province: "Jawa Barat", count: 972 }, { province: "Jawa Timur", count: 846 },
      { province: "Jawa Tengah", count: 690 }, { province: "Sumatera Utara", count: 445 },
      { province: "Sulawesi Selatan", count: 342 },
    ],
    process: [
      { label: "Pengajuan", value: 5860, pct: 100 }, { label: "Verifikasi", value: 4370, pct: 74.6 },
      { label: "Penugasan", value: 3692, pct: 63.0 }, { label: "Asesmen", value: 2461, pct: 42.0 },
      { label: "Review", value: 963, pct: 16.4 }, { label: "Keputusan", value: 852, pct: 14.5 },
      { label: "Sertifikat", value: 3218, pct: null },
    ],
    workload: "8,3",
  },
};

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
