const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface FundSearchResult {
  scheme_code: number;
  scheme_name: string;
  category?: string;
  fund_house?: string;
}

export interface AssetInput {
  id?: string;
  scheme_code: number;
  monthly_amount: number;
  sip_day: number;
  initial_amount: number;
}

export interface PortfolioRequest {
  assets: AssetInput[];
  start_date: string;
  end_date: string;
}

export interface PortfolioDaily {
  date: string;
  portfolio_value: number;
  cashflow: number;
  cumulative_invested: number;
  [key: string]: any; // for asset_value_* columns
}

export interface Transaction {
  date: string;
  asset: string;
  cashflow: number;
  units_bought: number;
  asset_value: number;
  cumulative_invested: number;
}

export interface Metrics {
  final_value?: number;
  invested?: number;
  gain_pct?: number;
  xirr_pct?: number;
  cagr_pct?: number;
  max_drawdown_pct?: number;
  volatility_pct?: number;
  sharpe?: number;
  [key: string]: any;
}

export interface BacktestResponse {
  portfolio_daily: PortfolioDaily[];
  transactions: Transaction[];
  metrics: Metrics;
  meta: {
    generated_by: string;
    note: string;
  };
}

export const searchFunds = async (query: string): Promise<FundSearchResult[]> => {
  if (!query || query.trim().length < 1) {
    return [];
  }

  const response = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }
  
  return response.json();
};

export const runBacktest = async (request: PortfolioRequest): Promise<BacktestResponse> => {
  const response = await fetch(`${API_BASE_URL}/portfolio/backtest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `Backtest failed: ${response.statusText}`);
  }

  return response.json();
};
