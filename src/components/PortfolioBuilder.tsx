import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Play, Download, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AssetInput {
  id: string;
  schemeName: string;
  schemeCode: string;
  monthlyAmount: string;
  sipDay: string;
  initialAmount: string;
  isOpen: boolean;
}

export const PortfolioBuilder = () => {
  const [assets, setAssets] = useState<AssetInput[]>([
    { id: "1", schemeName: "", schemeCode: "", monthlyAmount: "15000", sipDay: "22", initialAmount: "50000", isOpen: true }
  ]);
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  const addAsset = () => {
    setAssets([
      ...assets,
      { id: Date.now().toString(), schemeName: "", schemeCode: "", monthlyAmount: "", sipDay: "1", initialAmount: "", isOpen: true }
    ]);
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const toggleAsset = (id: string) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, isOpen: !asset.isOpen } : asset
    ));
  };

  return (
    <DashboardCard title="Portfolio Builder" className="h-fit sticky top-4">
      <div className="space-y-3">
        {/* Global Date Inputs */}
        <div className="space-y-2.5">
          <div>
            <Label className="text-[10px]">Start Date</Label>
            <Input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 h-8 text-xs"
            />
          </div>
          <div>
            <Label className="text-[10px]">End Date</Label>
            <Input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 h-8 text-xs"
            />
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <Label className="text-[10px] mb-2.5 block">Funds ({assets.length})</Label>

          {/* Asset Accordion Panels */}
          <div className="space-y-2.5">
            {assets.map((asset, index) => (
              <Collapsible
                key={asset.id}
                open={asset.isOpen}
                onOpenChange={() => toggleAsset(asset.id)}
              >
                <div className="border border-border rounded-lg bg-background hover:border-border-strong transition-colors">
                  <div className="flex items-center justify-between p-2.5 bg-muted/30">
                    <CollapsibleTrigger className="flex items-center gap-2 flex-1 text-left">
                      <div className="flex items-center gap-1.5">
                        {asset.isOpen ? (
                          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        <span className="text-xs font-semibold text-foreground">
                          {asset.schemeName || `Fund ${index + 1}`}
                        </span>
                      </div>
                    </CollapsibleTrigger>
                    {assets.length > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeAsset(asset.id)}
                        className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  <CollapsibleContent>
                    <div className="p-2.5 space-y-2.5">
                      <div>
                        <Label className="text-[10px]">Fund Name</Label>
                        <Input 
                          placeholder="Search fund name or code..."
                          className="mt-1 h-7 text-xs"
                          value={asset.schemeName}
                          onChange={(e) => {
                            setAssets(assets.map(a => 
                              a.id === asset.id ? { ...a, schemeName: e.target.value } : a
                            ));
                          }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-[10px]">Monthly SIP (₹)</Label>
                          <Input 
                            type="number"
                            value={asset.monthlyAmount}
                            className="mt-1 h-7 text-xs"
                            onChange={(e) => {
                              setAssets(assets.map(a => 
                                a.id === asset.id ? { ...a, monthlyAmount: e.target.value } : a
                              ));
                            }}
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
                            onChange={(e) => {
                              setAssets(assets.map(a => 
                                a.id === asset.id ? { ...a, sipDay: e.target.value } : a
                              ));
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-[10px]">Initial Lumpsum (₹)</Label>
                        <Input 
                          type="number"
                          value={asset.initialAmount}
                          className="mt-1 h-7 text-xs"
                          onChange={(e) => {
                            setAssets(assets.map(a => 
                              a.id === asset.id ? { ...a, initialAmount: e.target.value } : a
                            ));
                          }}
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>

          <Button 
            size="sm" 
            variant="outline" 
            onClick={addAsset}
            className="w-full h-8 text-xs gap-1.5 mt-2.5 border-dashed hover:border-solid"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Fund
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-3 border-t border-border">
          <Button className="w-full h-9 text-xs gap-2 font-semibold">
            <Play className="h-3.5 w-3.5" />
            Run Backtest
          </Button>
          <Button variant="outline" className="w-full h-8 text-xs gap-2">
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};
