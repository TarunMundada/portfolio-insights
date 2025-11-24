import { DashboardCard } from "./DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockTransactions = [
  { date: "2024-12-22", asset: "Fund A (125497)", cashflow: "₹15,000", unitsBought: "12.45", totalUnits: "1,245.67", assetValue: "₹1,89,456" },
  { date: "2024-11-22", asset: "Fund A (125497)", cashflow: "₹15,000", unitsBought: "12.82", totalUnits: "1,233.22", assetValue: "₹1,84,230" },
  { date: "2024-10-22", asset: "Fund A (125497)", cashflow: "₹15,000", unitsBought: "13.15", totalUnits: "1,220.40", assetValue: "₹1,79,145" },
  { date: "2024-09-22", asset: "Fund B (125498)", cashflow: "₹15,000", unitsBought: "15.89", totalUnits: "892.34", assetValue: "₹98,567" },
  { date: "2024-08-22", asset: "Fund B (125498)", cashflow: "₹15,000", unitsBought: "16.23", totalUnits: "876.45", assetValue: "₹95,123" },
  { date: "2024-07-22", asset: "Fund C (125499)", cashflow: "₹15,000", unitsBought: "18.45", totalUnits: "745.67", assetValue: "₹85,234" },
];

export const TransactionsLog = () => {
  return (
    <DashboardCard 
      title="Transaction History" 
      timestamp="2024-12-31"
      contentClassName="p-0 overflow-auto max-h-80"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead className="text-right">Cashflow</TableHead>
            <TableHead className="text-right">Units Bought</TableHead>
            <TableHead className="text-right">Total Units</TableHead>
            <TableHead className="text-right">Asset Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransactions.map((txn, idx) => (
            <TableRow key={idx} className="hover:bg-muted/50">
              <TableCell className="tabular-nums">{txn.date}</TableCell>
              <TableCell className="font-medium">{txn.asset}</TableCell>
              <TableCell className="text-right tabular-nums">{txn.cashflow}</TableCell>
              <TableCell className="text-right tabular-nums">{txn.unitsBought}</TableCell>
              <TableCell className="text-right tabular-nums">{txn.totalUnits}</TableCell>
              <TableCell className="text-right tabular-nums">{txn.assetValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardCard>
  );
};
