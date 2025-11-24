import { DashboardCard } from "./DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

const mockReturns = [
  { asset: "Portfolio", "2020": "12.5%", "2021": "24.3%", "2022": "-8.2%", "2023": "18.7%", "2024": "15.9%" },
  { asset: "Fund A (125497)", "2020": "14.2%", "2021": "26.1%", "2022": "-6.8%", "2023": "19.5%", "2024": "17.2%" },
  { asset: "Fund B (125498)", "2020": "11.8%", "2021": "22.7%", "2022": "-9.1%", "2023": "17.9%", "2024": "14.8%" },
  { asset: "Fund C (125499)", "2020": "10.9%", "2021": "23.5%", "2022": "-8.7%", "2023": "18.2%", "2024": "15.3%" },
  { asset: "Nifty 50", "2020": "14.9%", "2021": "24.1%", "2022": "4.3%", "2023": "20.0%", "2024": "13.7%" },
];

export const ReturnsTable = () => {
  return (
    <DashboardCard 
      title="Annual Returns" 
      timestamp="2024-12-31"
      contentClassName="p-0 overflow-auto max-h-96"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 bg-card z-10">
              <div className="flex items-center gap-1">
                Asset
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="text-right">2020</TableHead>
            <TableHead className="text-right">2021</TableHead>
            <TableHead className="text-right">2022</TableHead>
            <TableHead className="text-right">2023</TableHead>
            <TableHead className="text-right">2024</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockReturns.map((row, idx) => (
            <TableRow key={idx} className="hover:bg-muted/50">
              <TableCell className="sticky left-0 bg-card font-medium">
                {row.asset}
              </TableCell>
              <TableCell className={`text-right tabular-nums ${parseFloat(row["2020"]) >= 0 ? 'text-success' : 'text-destructive'}`}>
                {row["2020"]}
              </TableCell>
              <TableCell className={`text-right tabular-nums ${parseFloat(row["2021"]) >= 0 ? 'text-success' : 'text-destructive'}`}>
                {row["2021"]}
              </TableCell>
              <TableCell className={`text-right tabular-nums ${parseFloat(row["2022"]) >= 0 ? 'text-success' : 'text-destructive'}`}>
                {row["2022"]}
              </TableCell>
              <TableCell className={`text-right tabular-nums ${parseFloat(row["2023"]) >= 0 ? 'text-success' : 'text-destructive'}`}>
                {row["2023"]}
              </TableCell>
              <TableCell className={`text-right tabular-nums ${parseFloat(row["2024"]) >= 0 ? 'text-success' : 'text-destructive'}`}>
                {row["2024"]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardCard>
  );
};
