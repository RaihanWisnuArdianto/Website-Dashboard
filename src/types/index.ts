// Central data-shape definitions.
// Both the mock data layer (src/lib/api) and a future real API must
// conform to these types — that's what makes swapping them a
// one-file change instead of a rewrite.

import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
}

export type PeriodKey = "mei2026" | "apr2026" | "mar2026" | "q2026" | "y2026";

export interface PeriodOption {
  key: PeriodKey;
  label: string;
}

export interface MonthData {
  bulan: string;
  bulanPanjang: string;
  tahun: number;
  total: number;
}

export interface StatCardItem {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  ring: string;
  card: string;
  noArrow?: boolean;
}

export interface DonutDatum {
  name: string;
  value: number;
  pct: string;
  color: string;
}

export interface ProcessStepBase {
  no: number;
  label: string;
  value: number;
  pct: string;
  icon: LucideIcon;
}

export interface ProcessStepDisplay extends ProcessStepBase {
  valueDisplay: string;
}

export interface ProvinsiDatum {
  provinsi: string;
  total: number;
}

export interface MonthRecord {
  periodKey: string;
  label: string;
  asOfDate: string;
  totalSubmissions: number;
  lpkCount: number;
  accreditedCount: number;
  activeAssessors: number;
}

export interface DashboardData extends MonthRecord {
  jenis: DonutDatum[];
  status: DonutDatum[];
  biaya: DonutDatum[];
  topProvinces: { province: string; count: number }[];
  process: { no: number; label: string; value: number; pct: string; icon?: LucideIcon }[];
  workload: string;
}

export interface NotificationItem {
  title: string;
  desc: string;
  time: string;
  icon: LucideIcon;
  tone: string;
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
