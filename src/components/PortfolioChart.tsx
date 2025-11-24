import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const generateMockData = () => {
  const data = [];
  const startDate = new Date("2020-01-01");
  const endDate = new Date("2024-12-31");
  
  let portfolioValue = 50000;
  let invested = 50000;
  
  for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
    invested += 15000;
    portfolioValue = invested * (1 + Math.random() * 0.5);
    
    data.push({
      date: d.toISOString().split('T')[0],
      portfolioValue: Math.round(portfolioValue),
      invested: invested,
      asset1: Math.round(portfolioValue * 0.4),
      asset2: Math.round(portfolioValue * 0.35),
      asset3: Math.round(portfolioValue * 0.25),
    });
  }
  
  return data;
};

const mockData = generateMockData();

export const PortfolioChart = () => {
  const [viewMode, setViewMode] = useState<"absolute" | "normalized">("absolute");
  const [showStacked, setShowStacked] = useState(false);

  return (
    <DashboardCard 
      title="Portfolio Value" 
      timestamp="2024-12-31"
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
            <LineChart data={mockData}>
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
              {showStacked ? (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="asset1" 
                    stroke="hsl(var(--chart-primary))" 
                    strokeWidth={1.5}
                    dot={false}
                    name="Asset 1"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="asset2" 
                    stroke="hsl(var(--chart-highlight))" 
                    strokeWidth={1.5}
                    dot={false}
                    name="Asset 2"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="asset3" 
                    stroke="hsl(var(--chart-neutral))" 
                    strokeWidth={1.5}
                    dot={false}
                    name="Asset 3"
                  />
                </>
              ) : (
                <Line 
                  type="monotone" 
                  dataKey="portfolioValue" 
                  stroke="hsl(var(--chart-primary))" 
                  strokeWidth={2}
                  dot={false}
                  name="Portfolio"
                />
              )}
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
