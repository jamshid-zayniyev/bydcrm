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
  variants: string;
  contract_number: string;
}

export interface SalesStatistics {
  total_income: string;
  completed_trade: string;
  average_check: string;
}

export interface SalesBanner {
  id: number;
  image: string;
  title: string;
  description: string;
}

export const getSales = async (): Promise<Sales[]> => {
  const response = await api.get(`/sales/sales-contract/`);
  return response.data;
};

export const getSalesStatistics = async (): Promise<SalesStatistics> => {
  const response = await api.get(`/sales/sales-statistics/`);
  return response.data;
};

export const getSalesBanner = async (): Promise<SalesBanner[]> => {
  const response = await api.get(`/sales/banner/`);
  return response.data;
};
