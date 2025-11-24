import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MetricTileProps {
  label: string;
  value: string | number;
  subtext?: string;
  tooltip?: string;
  variant?: "default" | "positive" | "negative" | "warning";
}

export const MetricTile = ({ 
  label, 
  value, 
  subtext, 
  tooltip,
  variant = "default" 
}: MetricTileProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      case "warning":
        return "text-warning";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="flex flex-col gap-1 p-3 border border-border bg-card rounded">
      <div className="flex items-center gap-1">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className={cn("text-xl font-semibold tabular-nums", getVariantStyles())}>
        {value}
      </div>
      {subtext && (
        <div className="text-[11px] text-muted-foreground">
          {subtext}
        </div>
      )}
    </div>
  );
};
