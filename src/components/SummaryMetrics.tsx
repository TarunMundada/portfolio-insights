import { MetricTile } from "./MetricTile";
import { Metrics } from "@/services/api";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface SummaryMetricsProps {
  metrics: Metrics | null;
  endDate?: string;
  startDate?: string;
}

export const SummaryMetrics = ({ metrics, endDate, startDate }: SummaryMetricsProps) => {
  if (!metrics) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-muted/20 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  const getVariant = (value: number | null | undefined): "default" | "positive" | "negative" => {
    if (value === null || value === undefined) return "default";
    return value >= 0 ? "positive" : "negative";
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
      <MetricTile
        label="Final Value"
        value={formatCurrency(metrics.final_value)}
        subtext={endDate ? `as of ${endDate}` : "at end date"}
        tooltip="Total portfolio value at the end date"
      />
      <MetricTile
        label="Invested"
        value={formatCurrency(metrics.invested)}
        subtext={startDate ? `since ${startDate}` : "total invested"}
        tooltip="Total amount invested via SIP and lumpsum"
      />
      <MetricTile
        label="Gain"
        value={formatPercent(metrics.gain_pct)}
        variant={getVariant(metrics.gain_pct)}
        subtext="absolute return"
        tooltip="Absolute return percentage"
      />
      <MetricTile
        label="XIRR"
        value={formatPercent(metrics.xirr_pct)}
        variant={getVariant(metrics.xirr_pct)}
        subtext="annualized"
        tooltip="Extended Internal Rate of Return - annualized return considering timing of cashflows"
      />
      <MetricTile
        label="Sharpe Ratio"
        value={metrics.sharpe?.toFixed(2) ?? "N/A"}
        subtext="risk-adjusted"
        tooltip="Risk-adjusted return metric. Higher is better. >1 is good."
      />
      <MetricTile
        label="Max Drawdown"
        value={formatPercent(metrics.max_drawdown_pct)}
        variant="negative"
        subtext="peak-to-trough"
        tooltip="Maximum peak-to-trough decline in portfolio value"
      />
    </div>
  );
};
