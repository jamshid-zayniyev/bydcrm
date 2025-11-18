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

export const getSales = async (): Promise<Sales[]> => {
  const response = await api.get(`/reports/sales-contract/`);
  return response.data;
};
