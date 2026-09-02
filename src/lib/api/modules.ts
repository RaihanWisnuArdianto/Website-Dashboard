import type { ModuleData, ModuleDefinition } from "@/types";
import { supabase } from "@/lib/supabaseClient";

// --- REAL DATA LAYER (Supabase) ---
// This used to read from src/data/staticData.ts. It now queries the
// `module_definitions` and `module_rows` tables in Supabase — see
// database/schema.sql and database/seed.sql. Every page/component
// still only imports from this file, so nothing else needed to change.

export async function fetchModuleDefinitions(): Promise<ModuleDefinition[]> {
  const { data: defs, error: defsError } = await supabase
    .from("module_definitions")
    .select("*")
    .order("sort_order", { ascending: true });

  if (defsError) throw new Error(defsError.message);

  // module_rows can hold many rows per module; grab just the module_key
  // column and count client-side rather than fetching full row data.
  const { data: rowKeys, error: rowsError } = await supabase
    .from("module_rows")
    .select("module_key");

  if (rowsError) throw new Error(rowsError.message);

  const countByKey = new Map<string, number>();
  for (const r of rowKeys ?? []) {
    countByKey.set(r.module_key, (countByKey.get(r.module_key) ?? 0) + 1);
  }

  return (defs ?? []).map((d) => ({
    key: d.key,
    navLabel: d.nav_label,
    title: d.title,
    sub: d.sub,
    addLabel: d.add_label,
    cols: d.cols,
    statusKey: d.status_key,
    icon: d.icon,
    showBadge: d.show_badge,
    count: countByKey.get(d.key) ?? 0,
  }));
}

export async function fetchModuleData(key: string): Promise<ModuleData> {
  const { data: def, error: defError } = await supabase
    .from("module_definitions")
    .select("*")
    .eq("key", key)
    .single();

  if (defError || !def) throw new Error(`Unknown module: ${key}`);

  const { data: rows, error: rowsError } = await supabase
    .from("module_rows")
    .select("*")
    .eq("module_key", key)
    .order("created_at", { ascending: true });

  if (rowsError) throw new Error(rowsError.message);

  return {
    key: def.key,
    navLabel: def.nav_label,
    title: def.title,
    sub: def.sub,
    addLabel: def.add_label,
    cols: def.cols,
    statusKey: def.status_key,
    icon: def.icon,
    showBadge: def.show_badge,
    count: rows?.length ?? 0,
    rows: (rows ?? []).map((r) => r.data),
  };
}

export async function createModuleRow(
  key: string,
  payload: Record<string, unknown>
): Promise<void> {
  const { error } = await supabase
    .from("module_rows")
    .insert({ module_key: key, data: payload });

  if (error) throw new Error(error.message);
}
