import { PortfolioBuilder } from "@/components/PortfolioBuilder";
import { SummaryMetrics } from "@/components/SummaryMetrics";
import { PortfolioChart } from "@/components/PortfolioChart";
import { ComparisonBand } from "@/components/ComparisonBand";
import { ReturnsTable } from "@/components/ReturnsTable";
import { TransactionsLog } from "@/components/TransactionsLog";
import { AssetAllocation } from "@/components/AssetAllocation";
import { DashboardFooter } from "@/components/DashboardFooter";
import { Briefcase, Play, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b-2 border-border-strong bg-card shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 h-14">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground text-base hidden sm:inline">Portfolio Backtester</span>
              <span className="font-semibold text-foreground text-base sm:hidden">PB</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                Mutual Funds
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                Portfolios
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                Tools
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                Reports
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex h-8 text-xs gap-1.5">
              <Play className="h-3 w-3" />
              Backtest
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex h-8 text-xs gap-1.5">
              <Download className="h-3 w-3" />
              Export
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
              FA
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation Tabs */}
      <div className="border-b border-border bg-card sticky top-14 z-40 shadow-sm">
        <div className="px-4 lg:px-6 flex gap-6 text-xs overflow-x-auto">
          <button className="py-3 border-b-2 border-primary text-primary font-semibold whitespace-nowrap">Overview</button>
          <button className="py-3 text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Portfolio</button>
          <button className="py-3 text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Performance</button>
          <button className="py-3 text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Risk</button>
          <button className="py-3 text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Holdings</button>
        </div>
      </div>

      {/* Main Content - Responsive Three Zone Layout */}
      <main className="max-w-[1600px] mx-auto p-3 lg:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5">
          {/* Left Column - Controls/Filters */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <PortfolioBuilder />
          </aside>

          {/* Middle Column - Charts & Visuals */}
          <section className="lg:col-span-6 space-y-3 lg:space-y-3.5 order-1 lg:order-2">
            <SummaryMetrics />
            <PortfolioChart />
            <ComparisonBand />
            <AssetAllocation />
            <DashboardFooter />
          </section>

          {/* Right Column - Metrics & Tables */}
          <aside className="lg:col-span-3 space-y-3 lg:space-y-3.5 order-3">
            <ReturnsTable />
            <TransactionsLog />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
