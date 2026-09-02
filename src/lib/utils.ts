export function fmt(n: number): string {
  return n.toLocaleString("id-ID");
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function statusTone(status: string): "green" | "orange" | "red" | "blue" | "purple" {
  const s = status.toLowerCase();
  if (["terverifikasi", "disetujui", "selesai", "terbit", "cair", "normal"].some((k) => s.includes(k))) return "green";
  if (["ditolak", "kritis", "terlampaui"].some((k) => s.includes(k))) return "red";
  if (["menunggu", "pending", "perhatian", "diproses", "dalam proses", "ditinjau"].some((k) => s.includes(k))) return "orange";
  if (["terjadwal"].some((k) => s.includes(k))) return "blue";
  return "purple";
}
