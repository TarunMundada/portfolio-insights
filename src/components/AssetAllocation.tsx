import { DashboardCard } from "./DashboardCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const mockAllocation = [
  { name: "Fund A (125497)", value: 42, color: "hsl(var(--chart-primary))" },
  { name: "Fund B (125498)", value: 35, color: "hsl(var(--chart-highlight))" },
  { name: "Fund C (125499)", value: 23, color: "hsl(var(--chart-neutral))" },
];

const mockWeights = [
  { asset: "Fund A (125497)", current: "42%", target: "40%", drift: "+2%" },
  { asset: "Fund B (125498)", current: "35%", target: "35%", drift: "0%" },
  { asset: "Fund C (125499)", current: "23%", target: "25%", drift: "-2%" },
];

export const AssetAllocation = () => {
  return (
    <DashboardCard title="Asset Allocation" timestamp="2024-12-31">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockAllocation}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {mockAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend 
                wrapperStyle={{ fontSize: '11px' }}
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weights Table */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">Weight Analysis</div>
          {mockWeights.map((weight, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs border-b border-border pb-2">
              <div className="font-medium">{weight.asset}</div>
              <div className="flex gap-3 tabular-nums">
                <span>{weight.current}</span>
                <span className="text-muted-foreground">→ {weight.target}</span>
                <span className={weight.drift.startsWith('+') ? 'text-warning' : weight.drift === '0%' ? 'text-muted-foreground' : 'text-chart-neutral'}>
                  {weight.drift}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};
