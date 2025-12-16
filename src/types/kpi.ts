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

export interface BestStaff {
  full_name: string;
  month: string;
  sales_count: number;
  average_rating: number;
}

export interface SalesPerformance {
  month: string;
  month_label: string;
  sales: number;
  revenue: number;
  target: number;
}

export interface TestDriveMonth {
  month: string;
  test_drive_count: number;
}

export interface KpiMostSoldCar {
  model: string;
  price: number;
}

export interface TestDriveSales {
  month: string;
  purchased_customers: number;
}

export interface StaffReports {
  full_name: string;
  avatar: string | null;
  calls: {
    value: number;
    target: number;
    percent: number;
    remaining: number;
  };
  revenue: {
    value: number;
    target: number;
    percent: number;
    average_check: number;
  };
  sales: {
    value: number;
    target: number;
    percent: number;
    remaining: number;
  };
  rating: {
    value: number;
    target: number;
    percent: number;
  };
  last_5_months: [
    {
      month: string;
      calls: number;
    }
  ];
  id: number;
  role: string;
}

export interface monthlyId {
  avatar: string | null;
  full_name: string;
  role: string;
  sales_count: number;
  total_revenue: number;
  average_rating: number;
  rating_target: number;
  rating_percent: number;
  calls_count: number;
}

export interface yearly {
  average_sales: number;
  month: string;
  quarterly_growth: number;
  record_sales: number;
  revenue: number;
}

export interface Weekly {
  role: string;
  week: string;
  data: {
    day: string;
    sales: number;
  }[];
}

export interface WeeklyIndicators {
  week: string;
  plan: number;
  fact: number;
}

export interface last5Months {
  month: string;
  sales_count: number;
  revenue: number;
}

export interface staffReports2 {
  full_name: string;
  calls: { value: number; target: number; percent: number; remaining: number };
  sales: {
    value: number;
    target: number;
    percent: number;
    remaining: number;
  };
  revenue: {
    value: number;
    target: number;
    percent: number;
    average_check: number;
  };
  rating: {
    value: number;
    target: number;
    percent: number;
  };
}

export interface generalStatistics {
  total_calls: number;
  positive_calls: number;
  average_score: number;
  average_rate: number;
  completed_services: number;
  average_rating: number;
  satisfied_clients: number;
  total_revenue: number;
  total_sold: number;
}
