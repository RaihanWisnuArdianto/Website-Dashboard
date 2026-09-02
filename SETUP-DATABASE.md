# Setup Database (Supabase)

Project ini sekarang tersambung ke Postgres lewat [Supabase](https://supabase.com),
menggantikan data statis di `src/data/staticData.ts`. Ikuti langkah berikut.

## 1. Buat project Supabase

1. Daftar/login di https://supabase.com → **New Project**.
2. Pilih nama, region terdekat, dan password database.
3. Setelah project siap, buka **Project Settings → API** dan catat:
   - `Project URL`
   - `anon public` key

## 2. Buat tabel

Buka **SQL Editor** di dashboard Supabase, lalu jalankan isi file:

```
database/schema.sql
```

Ini akan membuat 4 tabel: `dashboard_periods`, `notifications`,
`module_definitions`, `module_rows` — beserta Row Level Security (RLS)
policy dasar yang mengizinkan baca publik (cocok untuk tahap
development; perketat nanti setelah ada login).

## 3. Isi data awal (seed)

Masih di **SQL Editor**, jalankan isi file:

```
database/seed.sql
```

File ini otomatis di-generate dari data statis lama, jadi isinya
sama persis dengan yang selama ini tampil di dashboard (periode Mei
2026, April 2026, dst, plus semua baris di 10 modul).

## 4. Konfigurasi environment variable

```bash
cp .env.example .env
```

Isi `.env` dengan `Project URL` dan `anon public key` dari langkah 1:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## 5. Install & jalankan

```bash
npm install
npm run dev
```

Buka dashboard-nya — data sekarang datang dari Supabase. Coba ubah
salah satu baris lewat **Table Editor** di Supabase, refresh halaman,
dan datanya akan berubah.

## Apa yang berubah di kode

- `src/lib/supabaseClient.ts` — inisialisasi client Supabase (baru).
- `src/lib/api/dashboard.ts` — `fetchDashboardData()` dan
  `fetchNotifications()` sekarang query ke tabel `dashboard_periods`
  dan `notifications`, memetakan hasilnya ke bentuk `DashboardData` /
  `Notification` di `src/types/index.ts`.
- `src/lib/api/modules.ts` — `fetchModuleDefinitions()`,
  `fetchModuleData()`, dan `createModuleRow()` sekarang query ke
  tabel `module_definitions` dan `module_rows`. `createModuleRow()`
  sudah **tidak lagi placeholder** — sekarang benar-benar melakukan
  `insert` ke Supabase, jadi fitur "Tambah Data" di modul sudah aktif.

Tidak ada komponen React lain yang perlu diubah — semua tetap membaca
lewat `src/hooks/*`, sesuai desain awal project ini.

## Catatan keamanan

Policy RLS di `schema.sql` saat ini mengizinkan siapa saja (anon key)
untuk baca semua data, dan insert ke `module_rows`. Ini cukup untuk
development/demo. Sebelum dipakai produksi dengan data sensitif,
tambahkan sistem autentikasi (Supabase Auth) dan ubah policy supaya
hanya user yang login yang bisa insert/update/delete.
