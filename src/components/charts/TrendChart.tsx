import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { fmt } from "@/lib/utils";

interface TrendChartProps {
  values: number[];
  months: string[];
}

export function TrendChart({ values, months }: TrendChartProps) {
  const data = values.map((value, i) => ({ month: months[i], value }));

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2f6fed" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2f6fed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8991a3" }} />
          <Tooltip
            formatter={(value: number) => fmt(value)}
            contentStyle={{ borderRadius: 12, border: "1px solid #e7eaf1", fontSize: 13 }}
          />
          <Area type="monotone" dataKey="value" stroke="#2f6fed" strokeWidth={2.5} fill="url(#trendFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
