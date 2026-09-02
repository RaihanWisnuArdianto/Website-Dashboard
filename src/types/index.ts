// Central data-shape definitions.
// Both the mock data layer (src/lib/api) and a future real API must
// conform to these types — that's what makes swapping them a
// one-file change instead of a rewrite.

export type PeriodKey = "mei2026" | "apr2026" | "mar2026" | "q2026" | "y2026";

export interface PeriodOption {
  key: PeriodKey;
  label: string;
}

export interface ChartSlice {
  label: string;
  value: number;
  color: string; // hex, e.g. "#2f6fed"
}

export interface ProcessStep {
  label: string;
  value: number;
  pct: number | null; // null = terminal step (e.g. Sertifikat), no drop-off shown
}

export interface ProvinceCount {
  province: string;
  count: number;
}

export interface DashboardData {
  period: PeriodKey;
  label: string;
  asOfDate: string;

  lpk: number;
  lpkDelta: number;
  akreditasi: number;
  akreditasiDelta: number;
  aktif: number;
  aktifDelta: number;
  sertifikat: number;
  sertifikatDelta: number;
  asesor: number;
  asesorNote: number;

  jenis: ChartSlice[];
  status: ChartSlice[];
  biaya: ChartSlice[];

  sla: number;
  slaOver: number;

  trend: number[]; // 12 months
  trendMonths: string[];

  topProvinces: ProvinceCount[];
  process: ProcessStep[];
  workload: string;
}

export interface Notification {
  id: string;
  title: string;
  time: string;
  read: boolean;
}

export type ModuleRow = Record<string, string | number>;

export interface ModuleDefinition {
  key: string;
  navLabel: string;
  title: string;
  sub: string;
  addLabel: string;
  cols: string[];
  statusKey: string;
  icon: string; // lucide-react icon name
  showBadge: boolean;
  count: number; // row count, shown as a sidebar badge when showBadge is true
}

export interface ModuleData extends ModuleDefinition {
  rows: ModuleRow[];
}
