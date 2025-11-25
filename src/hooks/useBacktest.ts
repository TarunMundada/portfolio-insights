import { useMutation } from "@tanstack/react-query";
import { runBacktest, PortfolioRequest, BacktestResponse } from "@/services/api";
import { toast } from "sonner";

export const useBacktest = () => {
  return useMutation<BacktestResponse, Error, PortfolioRequest>({
    mutationFn: runBacktest,
    onError: (error) => {
      toast.error("Backtest Failed", {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.success("Backtest Complete", {
        description: "Portfolio analysis generated successfully",
      });
    },
  });
};
