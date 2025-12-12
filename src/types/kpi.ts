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
  employee_id: number;
  full_name: string;
  role: string;
  avatar: number;
  total_sales: number;
  total_revenue: number;
  sales_target: number;
  revenue_target: number;
  last_5_months: [
    {
      month: string;
      sales: number;
    }
    // {
    //   month: "September";
    //   sales: 0;
    // },
    // {
    //   month: "October";
    //   sales: 0;
    // },
    // {
    //   month: "November";
    //   sales: 0;
    // },
    // {
    //   month: "December";
    //   sales: 1;
    // }
  ];
}
