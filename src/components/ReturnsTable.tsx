import { DashboardCard } from "./DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const mockReturns = [
  { asset: "Portfolio", "2020": "12.5%", "2021": "24.3%", "2022": "-8.2%", "2023": "18.7%", "2024": "15.9%", "3Y": "15.2%", "5Y": "16.4%" },
  { asset: "Fund A (125497)", "2020": "14.2%", "2021": "26.1%", "2022": "-6.8%", "2023": "19.5%", "2024": "17.2%", "3Y": "16.8%", "5Y": "17.9%" },
  { asset: "Fund B (125498)", "2020": "11.8%", "2021": "22.7%", "2022": "-9.1%", "2023": "17.9%", "2024": "14.8%", "3Y": "14.2%", "5Y": "15.1%" },
  { asset: "Fund C (125499)", "2020": "10.9%", "2021": "23.5%", "2022": "-8.7%", "2023": "18.2%", "2024": "15.3%", "3Y": "14.8%", "5Y": "15.6%" },
  { asset: "Nifty 50", "2020": "14.9%", "2021": "24.1%", "2022": "4.3%", "2023": "20.0%", "2024": "13.7%", "3Y": "12.8%", "5Y": "15.3%" },
];

const getReturnColor = (value: string) => {
  const num = parseFloat(value);
  if (num >= 0) return "text-success";
  return "text-destructive";
};

export const ReturnsTable = () => {
  return (
    <DashboardCard 
      title="Annual Returns" 
      timestamp="2024-12-31"
      contentClassName="p-0 overflow-auto max-h-96"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-2 border-border-strong">
              <TableHead className="sticky left-0 bg-card z-10 border-r border-border">
                <div className="flex items-center gap-1 font-semibold text-foreground">
                  Asset
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-right font-semibold">2020</TableHead>
              <TableHead className="text-right font-semibold">2021</TableHead>
              <TableHead className="text-right font-semibold">2022</TableHead>
              <TableHead className="text-right font-semibold">2023</TableHead>
              <TableHead className="text-right font-semibold">2024</TableHead>
              <TableHead className="text-right font-semibold border-l border-border">3Y CAGR</TableHead>
              <TableHead className="text-right font-semibold">5Y CAGR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReturns.map((row, idx) => (
              <TableRow 
                key={idx} 
                className={cn(
                  "hover:bg-muted/30 transition-colors",
                  idx === 0 && "bg-muted/20 font-medium"
                )}
              >
                <TableCell className="sticky left-0 bg-card font-medium border-r border-border">
                  {row.asset}
                </TableCell>
                <TableCell className={cn("text-right tabular-nums text-xs", getReturnColor(row["2020"]))}>
                  {row["2020"]}
                </TableCell>
                <TableCell className={cn("text-right tabular-nums text-xs", getReturnColor(row["2021"]))}>
                  {row["2021"]}
                </TableCell>
                <TableCell className={cn("text-right tabular-nums text-xs", getReturnColor(row["2022"]))}>
                  {row["2022"]}
                </TableCell>
                <TableCell className={cn("text-right tabular-nums text-xs", getReturnColor(row["2023"]))}>
                  {row["2023"]}
                </TableCell>
                <TableCell className={cn("text-right tabular-nums text-xs", getReturnColor(row["2024"]))}>
                  {row["2024"]}
                </TableCell>
                <TableCell className={cn("text-right tabular-nums text-xs font-semibold border-l border-border", getReturnColor(row["3Y"]))}>
                  {row["3Y"]}
                </TableCell>
                <TableCell className={cn("text-right tabular-nums text-xs font-semibold", getReturnColor(row["5Y"]))}>
                  {row["5Y"]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
};
