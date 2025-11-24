import { PortfolioBuilder } from "@/components/PortfolioBuilder";
import { SummaryMetrics } from "@/components/SummaryMetrics";
import { PortfolioChart } from "@/components/PortfolioChart";
import { ComparisonBand } from "@/components/ComparisonBand";
import { ReturnsTable } from "@/components/ReturnsTable";
import { TransactionsLog } from "@/components/TransactionsLog";
import { AssetAllocation } from "@/components/AssetAllocation";
import { DashboardFooter } from "@/components/DashboardFooter";
import { Briefcase } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 h-12">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Portfolio Backtester</span>
            </div>
            <nav className="flex items-center gap-4 text-xs">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Mutual Funds</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Portfolios</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tools</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Reports</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-xs text-muted-foreground hover:text-foreground">Settings</button>
            <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              FA
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation Tabs */}
      <div className="border-b border-border bg-card">
        <div className="px-4 flex gap-6 text-xs">
          <button className="py-2 border-b-2 border-primary text-primary font-medium">Overview</button>
          <button className="py-2 text-muted-foreground hover:text-foreground">Portfolio</button>
          <button className="py-2 text-muted-foreground hover:text-foreground">Performance</button>
          <button className="py-2 text-muted-foreground hover:text-foreground">Risk</button>
          <button className="py-2 text-muted-foreground hover:text-foreground">Holdings</button>
        </div>
      </div>

      {/* Main Content - Three Zone Layout */}
      <main className="max-w-[1600px] mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column - Controls/Filters (narrow) */}
          <aside className="col-span-3">
            <PortfolioBuilder />
          </aside>

          {/* Middle Column - Charts & Visuals (wide) */}
          <section className="col-span-6 space-y-4">
            <SummaryMetrics />
            <PortfolioChart />
            <ComparisonBand />
            <AssetAllocation />
            <DashboardFooter />
          </section>

          {/* Right Column - Metrics & Tables (medium) */}
          <aside className="col-span-3 space-y-4">
            <ReturnsTable />
            <TransactionsLog />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
