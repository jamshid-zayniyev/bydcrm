import { api } from "./axios";

export interface Sales {
  id: number;
  customer_name: string;
  car: number;
  price: number;
  sold_by: number;
  status: string;
  created_at: number;
  updated_at: number;
}

export interface SalesStatistics {
  total_income: string;
  completed_trade: string;
  average_check: string;
}

export const getSales = async (): Promise<Sales[]> => {
  const response = await api.get(`/reports/sales-contract/`);
  return response.data;
};

export const getSalesStatistics = async (): Promise<SalesStatistics> => {
  const response = await api.get(`/reports/sales-statistics/`);
  return response.data;
};
