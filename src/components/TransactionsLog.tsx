import { DashboardCard } from "./DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, TrendingUp, TrendingDown, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Transaction } from "@/services/api";
import { formatCurrency } from "@/lib/utils";

interface TransactionsLogProps {
  transactions: Transaction[] | null;
  timestamp?: string;
}

export const TransactionsLog = ({ transactions, timestamp }: TransactionsLogProps) => {
  if (!transactions || transactions.length === 0) {
    return (
      <DashboardCard 
        title="Transaction History" 
        timestamp={timestamp}
        contentClassName="p-0 overflow-auto max-h-80"
      >
        <div className="h-80 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p className="text-sm">No transactions</p>
            <p className="text-xs mt-1">Run a backtest to see transaction history</p>
          </div>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard 
      title="Transaction History" 
      timestamp={timestamp || new Date().toISOString().split('T')[0]}
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
              <TableHead className="text-right font-semibold">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn, idx) => (
              <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                <TableCell className="tabular-nums text-xs">{txn.date}</TableCell>
                <TableCell className="font-medium text-xs">
                  <div className="flex items-center gap-1.5">
                    {txn.cashflow < 0 ? (
                      <TrendingDown className="h-3 w-3 text-chart-primary" />
                    ) : (
                      <TrendingUp className="h-3 w-3 text-success" />
                    )}
                    {txn.asset}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className="text-[10px] px-1.5 py-0 h-5 font-medium bg-primary/10 text-primary border-0"
                  >
                    {txn.cashflow < 0 ? "BUY" : "SELL"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums text-xs font-medium">
                  <span className={txn.cashflow < 0 ? "text-destructive" : "text-success"}>
                    {formatCurrency(Math.abs(txn.cashflow))}
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums text-xs text-muted-foreground">
                  {txn.units_bought?.toFixed(2) || "0.00"}
                </TableCell>
                <TableCell className="text-right tabular-nums text-xs font-semibold">
                  {formatCurrency(txn.asset_value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
};
