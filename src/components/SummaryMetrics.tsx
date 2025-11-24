import { MetricTile } from "./MetricTile";

const mockMetrics = {
  finalValue: "₹42,75,891",
  invested: "₹28,50,000",
  gainPercent: "+50.03%",
  xirr: "18.2%",
  sharpe: "1.42",
  maxDrawdown: "-22.8%"
};

export const SummaryMetrics = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
      <MetricTile
        label="Final Value"
        value={mockMetrics.finalValue}
        subtext="as of Dec 31, 2024"
        tooltip="Total portfolio value at the end date"
      />
      <MetricTile
        label="Invested"
        value={mockMetrics.invested}
        subtext="since Jan 1, 2020"
        tooltip="Total amount invested via SIP and lumpsum"
      />
      <MetricTile
        label="Gain"
        value={mockMetrics.gainPercent}
        variant="positive"
        subtext="absolute return"
        tooltip="Absolute return percentage"
      />
      <MetricTile
        label="XIRR"
        value={mockMetrics.xirr}
        variant="positive"
        subtext="annualized"
        tooltip="Extended Internal Rate of Return - annualized return considering timing of cashflows"
      />
      <MetricTile
        label="Sharpe Ratio"
        value={mockMetrics.sharpe}
        subtext="risk-adjusted"
        tooltip="Risk-adjusted return metric. Higher is better. >1 is good."
      />
      <MetricTile
        label="Max Drawdown"
        value={mockMetrics.maxDrawdown}
        variant="negative"
        subtext="peak-to-trough"
        tooltip="Maximum peak-to-trough decline in portfolio value"
      />
    </div>
  );
};
