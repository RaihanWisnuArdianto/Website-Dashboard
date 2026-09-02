# SI-LEMLATVOK — Dashboard (React + Tailwind)

A modular React/TypeScript/Tailwind rebuild of the original single-file
HTML prototype. Same visual identity and data, but split into real
components with a data layer that's ready to be pointed at a real API.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Project structure

```
src/
  types/          Shared TypeScript interfaces (the data contract)
  data/           Static seed data (names, provinces, period stats) — ported from the prototype
  lib/api/        The data-access layer — mock now, real fetch() later. THE swap point.
  hooks/          React Query hooks wrapping the api layer
  components/
    layout/       Sidebar, Topbar, AppLayout
    ui/           Generic reusable pieces: StatCard, DataTable, Modal, Badge, Toast
    charts/       DonutChart, TrendChart, GaugeChart (Recharts)
  pages/          DashboardPage, ModulePage (one generic page handles all 10 table modules)
```

## Connecting real data

Every component reads data through `src/hooks/*` → `src/lib/api/*`.
Nothing else in the app touches `src/data/staticData.ts` directly.

To go live, edit only the two files in `src/lib/api/`:

```ts
// src/lib/api/dashboard.ts
export async function fetchDashboardData(period: PeriodKey): Promise<DashboardData> {
  const res = await fetch(`/api/dashboard?period=${period}`);
  if (!res.ok) throw new Error("Failed to load dashboard data");
  return res.json();
}
```

As long as your API's response matches the shapes in `src/types/index.ts`,
no component needs to change. If your backend's field names differ,
map them inside these same functions (keep the transformation there,
not scattered across components).

## Adding a new module

1. Add a `ModuleDefinition` entry (and its seeded rows) in `src/data/staticData.ts`.
2. Add a sidebar link — it's automatic, `Sidebar.tsx` renders from `useModuleDefinitions()`.
3. That's it — `ModulePage.tsx` is generic and handles the table, search, and status filter for any module.

## What's stubbed / needs work

- The "Tambah Data" modal in each module is a placeholder — wire `createModuleRow()`
  in `src/lib/api/modules.ts` to a real `POST` endpoint and build a real form per module.
- Auth, routing guards, and error boundaries aren't included — add them once there's a real backend.
- The notification/help modals from the original prototype aren't fully ported; the notification
  list on the dashboard uses `fetchNotifications()` as a starting point.
