import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  timestamp?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const DashboardCard = ({ 
  title, 
  timestamp, 
  children, 
  className,
  contentClassName 
}: DashboardCardProps) => {
  return (
    <Card className={cn("border border-border bg-card", className)}>
      <CardHeader className="px-3 py-2 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground">
            {title}
          </CardTitle>
          {timestamp && (
            <span className="text-[11px] text-muted-foreground">
              As of {timestamp}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className={cn("p-3", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};
