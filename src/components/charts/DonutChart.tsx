import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { ChartSlice } from "@/types";
import { fmt } from "@/lib/utils";

interface DonutChartProps {
  data: ChartSlice[];
  total: number;
}

export function DonutChart({ data, total }: DonutChartProps) {
  return (
    <div>
      <div className="relative mx-auto h-[180px] w-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius={58}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((slice) => (
                <Cell key={slice.label} fill={slice.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xs text-ink-faint">Total</div>
          <div className="text-xl font-extrabold text-ink">{fmt(total)}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {data.map((slice) => (
          <div key={slice.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-ink-soft">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
              {slice.label}
            </span>
            <span className="font-semibold text-ink">{fmt(slice.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
