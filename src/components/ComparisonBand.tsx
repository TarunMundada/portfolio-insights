import { DashboardCard } from "./DashboardCard";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const mockComparisons = [
  { name: "Portfolio", change: "+50.03%", data: [100, 105, 110, 108, 115, 120, 125, 130, 128, 135, 140, 150] },
  { name: "Nifty 50", change: "+42.12%", data: [100, 103, 108, 105, 110, 115, 118, 122, 120, 125, 128, 142] },
  { name: "Gold", change: "+28.45%", data: [100, 102, 104, 106, 108, 110, 112, 115, 118, 120, 124, 128] },
  { name: "Nifty Next 50", change: "+38.76%", data: [100, 104, 107, 105, 112, 116, 120, 124, 122, 127, 132, 138] },
];

export const ComparisonBand = () => {
  return (
    <DashboardCard title="Benchmark Comparison" timestamp="2024-12-31">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
        {mockComparisons.map((item, idx) => (
          <div key={idx} className="space-y-2 p-2 rounded-lg border border-border bg-background hover:border-border-strong transition-colors">
            <div className="text-xs font-semibold text-foreground">{item.name}</div>
            
            <div className="h-14">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={item.data.map((val, i) => ({ value: val }))}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={idx === 0 ? "hsl(var(--chart-primary))" : "hsl(var(--chart-neutral))"} 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className={`text-sm font-bold tabular-nums ${
              item.change.startsWith('+') ? 'text-success' : 'text-destructive'
            }`}>
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
