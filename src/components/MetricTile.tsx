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
    <div className="flex flex-col gap-1.5 p-3 border border-border bg-card rounded-lg hover:border-border-strong transition-colors">
      <div className="flex items-center justify-between gap-1">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
          {label}
        </span>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className={cn("text-2xl font-semibold tabular-nums leading-none", getVariantStyles())}>
        {value}
      </div>
      {subtext && (
        <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
          {subtext}
        </div>
      )}
    </div>
  );
};
