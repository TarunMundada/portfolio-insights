import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export const DashboardFooter = () => {
  return (
    <DashboardCard title="Data Sources & Export">
      <div className="space-y-3">
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <strong>NAV Data Source:</strong> MFAPI (Mutual Fund API by AMFI) - Fetched on 2024-12-31 18:30 IST
          </p>
          <p>
            <strong>Disclaimer:</strong> This is a simulated backtest based on historical NAV data. 
            Past performance does not guarantee future results. Actual returns may vary due to market conditions, 
            fund expenses, exit loads, and taxation.
          </p>
        </div>
        
        <div className="flex gap-2 pt-2 border-t border-border">
          <Button variant="outline" size="sm" className="text-xs gap-2">
            <Download className="h-3 w-3" />
            Download CSV
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-2">
            <FileText className="h-3 w-3" />
            Export PDF Report
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};
