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
    <Card className={cn("border border-border bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow", className)}>
      <CardHeader className="px-3 py-2.5 border-b-2 border-border-strong bg-muted/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground">
            {title}
          </CardTitle>
          {timestamp && (
            <span className="text-[10px] text-muted-foreground font-medium">
              As of {timestamp}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className={cn("p-2.5", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};
