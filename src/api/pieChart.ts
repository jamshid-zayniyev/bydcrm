import { api } from "./axios";

export interface PieChart {
  name: string;
  value: number;
}

export const getPieChart = async (): Promise<PieChart[]> => {
  const response = await api.get("/reports/customer-resources/");
  return response.data;
};
