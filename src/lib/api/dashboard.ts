import type { DashboardData, Notification, PeriodKey } from "@/types";
import { supabase } from "@/lib/supabaseClient";

// --- REAL DATA LAYER (Supabase) ---
// This used to read from src/data/staticData.ts. It now queries the
// `dashboard_periods` and `notifications` tables in Supabase — see
// database/schema.sql and database/seed.sql. Nothing outside this
// file needed to change: components still call fetchDashboardData()
// / fetchNotifications() and get back the same DashboardData / 
// Notification shapes from src/types/index.ts.

export async function fetchDashboardData(period: PeriodKey): Promise<DashboardData> {
  const { data, error } = await supabase
    .from("dashboard_periods")
    .select("*")
    .eq("period", period)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error(`Unknown period: ${period}`);

  return {
    period: data.period,
    label: data.label,
    asOfDate: data.as_of_date,
    lpk: data.lpk,
    lpkDelta: data.lpk_delta,
    akreditasi: data.akreditasi,
    akreditasiDelta: data.akreditasi_delta,
    aktif: data.aktif,
    aktifDelta: data.aktif_delta,
    sertifikat: data.sertifikat,
    sertifikatDelta: data.sertifikat_delta,
    asesor: data.asesor,
    asesorNote: data.asesor_note,
    jenis: data.jenis,
    status: data.status,
    biaya: data.biaya,
    sla: data.sla,
    slaOver: data.sla_over,
    trend: data.trend,
    trendMonths: data.trend_months,
    topProvinces: data.top_provinces,
    process: data.process,
    workload: data.workload,
  };
}

export async function fetchNotifications(): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((n) => ({
    id: n.id,
    title: n.title,
    time: n.time,
    read: n.read,
  }));
}
