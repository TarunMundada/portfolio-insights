import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, TrendingUp, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockTransactions = [
  { date: "2024-12-22", asset: "Fund A (125497)", type: "SIP", cashflow: "₹15,000", unitsBought: "12.45", totalUnits: "1,245.67", assetValue: "₹1,89,456" },
  { date: "2024-11-22", asset: "Fund A (125497)", type: "SIP", cashflow: "₹15,000", unitsBought: "12.82", totalUnits: "1,233.22", assetValue: "₹1,84,230" },
  { date: "2024-10-22", asset: "Fund A (125497)", type: "SIP", cashflow: "₹15,000", unitsBought: "13.15", totalUnits: "1,220.40", assetValue: "₹1,79,145" },
  { date: "2024-09-22", asset: "Fund B (125498)", type: "SIP", cashflow: "₹15,000", unitsBought: "15.89", totalUnits: "892.34", assetValue: "₹98,567" },
  { date: "2024-08-22", asset: "Fund B (125498)", type: "SIP", cashflow: "₹15,000", unitsBought: "16.23", totalUnits: "876.45", assetValue: "₹95,123" },
  { date: "2024-07-22", asset: "Fund C (125499)", type: "SIP", cashflow: "₹15,000", unitsBought: "18.45", totalUnits: "745.67", assetValue: "₹85,234" },
];

export const TransactionsLog = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);

  return (
    <DashboardCard 
      title="Transaction History" 
      timestamp="2024-12-31"
      contentClassName="p-0 overflow-auto max-h-80"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-2 border-border-strong">
              <TableHead>
                <button className="flex items-center gap-1 font-semibold text-foreground hover:text-primary transition-colors">
                  Date
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 font-semibold text-foreground">
                  Asset
                  <Filter className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>
                <div className="font-semibold text-foreground">Type</div>
              </TableHead>
              <TableHead className="text-right font-semibold">Cashflow</TableHead>
              <TableHead className="text-right font-semibold">Units</TableHead>
              <TableHead className="text-right font-semibold">Total Units</TableHead>
              <TableHead className="text-right font-semibold">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((txn, idx) => (
              <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                <TableCell className="tabular-nums text-xs">{txn.date}</TableCell>
                <TableCell className="font-medium text-xs">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-3 w-3 text-chart-primary" />
                    {txn.asset}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className="text-[10px] px-1.5 py-0 h-5 font-medium bg-primary/10 text-primary border-0"
                  >
                    {txn.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums text-xs font-medium">{txn.cashflow}</TableCell>
                <TableCell className="text-right tabular-nums text-xs text-muted-foreground">{txn.unitsBought}</TableCell>
                <TableCell className="text-right tabular-nums text-xs text-muted-foreground">{txn.totalUnits}</TableCell>
                <TableCell className="text-right tabular-nums text-xs font-semibold">{txn.assetValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
};
