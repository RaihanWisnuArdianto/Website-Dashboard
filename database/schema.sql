-- SI-LEMLATVOK — Supabase / Postgres schema
-- Jalankan file ini di Supabase Dashboard > SQL Editor.
-- Struktur ini dibuat mengikuti bentuk data di src/types/index.ts,
-- jadi hasil query bisa dipetakan 1:1 ke DashboardData / ModuleData.

-- ============================================================
-- 1) DASHBOARD PERIODS
--    Satu baris = satu opsi periode (mei2026, apr2026, dst),
--    berisi seluruh angka ringkasan dashboard.
-- ============================================================
create table if not exists dashboard_periods (
  period          text primary key,        -- PeriodKey, mis. 'mei2026'
  label           text not null,
  as_of_date      text not null,

  lpk             integer not null,
  lpk_delta       numeric not null,
  akreditasi      integer not null,
  akreditasi_delta numeric not null,
  aktif           integer not null,
  aktif_delta     numeric not null,
  sertifikat      integer not null,
  sertifikat_delta numeric not null,
  asesor          integer not null,
  asesor_note     integer not null,

  sla             integer not null,
  sla_over        integer not null,
  workload        text not null,

  -- Struktur bertingkat (array of {label, value, color} dsb) disimpan
  -- sebagai JSONB — bentuknya sudah persis sama dengan ChartSlice[],
  -- ProcessStep[], ProvinceCount[] di types/index.ts, jadi bisa
  -- langsung dipakai di frontend tanpa transformasi tambahan.
  jenis           jsonb not null,   -- ChartSlice[]
  status          jsonb not null,   -- ChartSlice[]
  biaya           jsonb not null,   -- ChartSlice[]
  trend           jsonb not null,   -- number[]
  trend_months    jsonb not null,   -- string[]
  top_provinces   jsonb not null,   -- ProvinceCount[]
  process         jsonb not null    -- ProcessStep[]
);

-- ============================================================
-- 2) NOTIFICATIONS
-- ============================================================
create table if not exists notifications (
  id          text primary key,
  title       text not null,
  time        text not null,       -- label relatif ("10 menit lalu") seperti di prototipe asli
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- 3) MODULE DEFINITIONS
--    Satu baris = satu modul di sidebar (Pengajuan, Verifikasi, dst).
-- ============================================================
create table if not exists module_definitions (
  key         text primary key,        -- mis. 'mod-pengajuan'
  nav_label   text not null,
  title       text not null,
  sub         text not null,
  add_label   text not null,
  cols        jsonb not null,          -- string[] nama kolom tabel
  status_key  text not null,           -- nama kolom yang dipakai sbg status/badge
  icon        text not null,           -- nama icon lucide-react
  show_badge  boolean not null default false,
  sort_order  integer not null default 0
);

-- ============================================================
-- 4) MODULE ROWS
--    Baris data tiap modul. Disimpan sebagai JSONB karena setiap
--    modul punya kolom yang berbeda-beda (ModuleRow = Record<string, string|number>).
-- ============================================================
create table if not exists module_rows (
  id          uuid primary key default gen_random_uuid(),
  module_key  text not null references module_definitions(key) on delete cascade,
  data        jsonb not null,
  created_at  timestamptz not null default now()
);

create index if not exists idx_module_rows_module_key on module_rows(module_key);

-- ============================================================
-- 5) ROW LEVEL SECURITY
--    Supabase mewajibkan RLS. Policy di bawah ini untuk TAHAP
--    DEVELOPMENT: siapa saja (termasuk anon key dari frontend)
--    boleh baca semua tabel, dan boleh insert ke module_rows
--    (dipakai oleh fitur "Tambah Data"). Perketat / tambahkan
--    auth check begitu ada sistem login.
-- ============================================================
alter table dashboard_periods enable row level security;
alter table notifications enable row level security;
alter table module_definitions enable row level security;
alter table module_rows enable row level security;

create policy "public read dashboard_periods" on dashboard_periods
  for select using (true);

create policy "public read notifications" on notifications
  for select using (true);

create policy "public read module_definitions" on module_definitions
  for select using (true);

create policy "public read module_rows" on module_rows
  for select using (true);

create policy "public insert module_rows" on module_rows
  for insert with check (true);
