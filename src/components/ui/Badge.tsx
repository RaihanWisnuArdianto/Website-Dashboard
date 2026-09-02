import { cn, statusTone } from "@/lib/utils";

const TONE_CLASSES: Record<string, string> = {
  green: "bg-green-bg text-green",
  orange: "bg-orange-bg text-orange",
  red: "bg-red/10 text-red",
  blue: "bg-blue-bg text-blue",
  purple: "bg-purple-bg text-purple",
};

export function Badge({ status }: { status: string }) {
  const tone = statusTone(status);
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", TONE_CLASSES[tone])}>
      {status}
    </span>
  );
}
