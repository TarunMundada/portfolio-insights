import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Play, Download, X } from "lucide-react";

interface AssetInput {
  id: string;
  schemeName: string;
  schemeCode: string;
  monthlyAmount: string;
  sipDay: string;
  initialAmount: string;
}

export const PortfolioBuilder = () => {
  const [assets, setAssets] = useState<AssetInput[]>([
    { id: "1", schemeName: "", schemeCode: "", monthlyAmount: "15000", sipDay: "22", initialAmount: "50000" }
  ]);
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  const addAsset = () => {
    setAssets([
      ...assets,
      { id: Date.now().toString(), schemeName: "", schemeCode: "", monthlyAmount: "", sipDay: "1", initialAmount: "" }
    ]);
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  return (
    <DashboardCard title="Portfolio Builder" className="h-fit sticky top-4">
      <div className="space-y-4">
        {/* Global Date Inputs */}
        <div className="space-y-3">
          <div>
            <Label>Start Date</Label>
            <Input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 h-8 text-xs"
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 h-8 text-xs"
            />
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-xs">Funds</Label>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={addAsset}
              className="h-6 text-xs gap-1"
            >
              <Plus className="h-3 w-3" />
              Add Fund
            </Button>
          </div>

          {/* Asset Rows */}
          <div className="space-y-3">
            {assets.map((asset, index) => (
              <div key={asset.id} className="p-2 border border-border rounded space-y-2 bg-background">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Fund {index + 1}</span>
                  {assets.length > 1 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeAsset(asset.id)}
                      className="h-5 w-5 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                
                <div>
                  <Label className="text-[10px]">Fund Name</Label>
                  <Input 
                    placeholder="Search fund..."
                    className="mt-1 h-7 text-xs"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-[10px]">Monthly (₹)</Label>
                    <Input 
                      type="number"
                      value={asset.monthlyAmount}
                      className="mt-1 h-7 text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px]">SIP Day</Label>
                    <Input 
                      type="number"
                      min="1"
                      max="28"
                      value={asset.sipDay}
                      className="mt-1 h-7 text-xs"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-[10px]">Initial Amount (₹)</Label>
                  <Input 
                    type="number"
                    value={asset.initialAmount}
                    className="mt-1 h-7 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-3 border-t border-border">
          <Button className="w-full h-8 text-xs gap-2">
            <Play className="h-3 w-3" />
            Run Backtest
          </Button>
          <Button variant="outline" className="w-full h-8 text-xs gap-2">
            <Download className="h-3 w-3" />
            Export CSV
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};
