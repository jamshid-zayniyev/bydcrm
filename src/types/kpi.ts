export interface kpiMonthly {
  month: string;
  current_sales: number;
  previous_sales: number;
  percent_change: number;
  achievement_percent: number;
  target: number;
}

export interface kpiRevenue {
  month: string;
  revenue_current: number;
  revenue_previous: number;
  percent_change: number;
  target: number;
  achievement_percent: number;
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
