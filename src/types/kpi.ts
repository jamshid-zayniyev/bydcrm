export interface SalesStatistiks {
  month: string;
  month_label: string;
  sales: number;
  revenue: number;
  target: number;
}

export interface Reports {
  customers: {
    total: number;
    current_month: number;
    last_month: number;
    percent_change: number;
  };
  calls: {
    today: number;
    yesterday: number;
    percent_change: number;
  };
  sales: {
    current_month: number;
    last_month: number;
    percent_change: number;
  };
}
