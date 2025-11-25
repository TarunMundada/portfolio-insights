import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioDaily } from "@/services/api";

interface PortfolioChartProps {
  data: PortfolioDaily[] | null;
  timestamp?: string;
}

export const PortfolioChart = ({ data, timestamp }: PortfolioChartProps) => {
  const [viewMode, setViewMode] = useState<"absolute" | "normalized">("absolute");
  const [showStacked, setShowStacked] = useState(false);

  if (!data || data.length === 0) {
    return (
      <DashboardCard 
        title="Portfolio Value" 
        timestamp={timestamp}
        contentClassName="p-0"
      >
        <div className="h-80 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p className="text-sm">No data available</p>
            <p className="text-xs mt-1">Run a backtest to see portfolio value over time</p>
          </div>
        </div>
      </DashboardCard>
    );
  }

  const chartData = data.map(d => ({
    date: d.date,
    portfolioValue: d.portfolio_value,
    invested: d.cumulative_invested,
  }));

  return (
    <DashboardCard 
      title="Portfolio Value" 
      timestamp={timestamp || new Date().toISOString().split('T')[0]}
      contentClassName="p-0"
    >
      <div className="space-y-3">
        {/* Chart Controls */}
        <div className="flex items-center justify-between px-3 pt-3 flex-wrap gap-2">
          <div className="inline-flex rounded-lg bg-muted p-0.5">
            <button
              onClick={() => setViewMode("absolute")}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                viewMode === "absolute" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Absolute
            </button>
            <button
              onClick={() => setViewMode("normalized")}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                viewMode === "normalized" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Normalized
            </button>
          </div>
          
          <button
            onClick={() => setShowStacked(!showStacked)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-muted transition-colors"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            {showStacked ? "Combined" : "Stacked"}
          </button>
        </div>

        {/* Chart */}
        <div className="h-80 px-3 pb-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '10px', fontWeight: 500 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '10px', fontWeight: 500 }}
                tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
              />
              <Legend 
                wrapperStyle={{ fontSize: '11px' }}
              />
              <Line 
                type="monotone" 
                dataKey="portfolioValue" 
                stroke="hsl(var(--chart-primary))" 
                strokeWidth={2}
                dot={false}
                name="Portfolio"
              />
              <Line 
                type="monotone" 
                dataKey="invested" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
                name="Invested"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardCard>
  );
};
