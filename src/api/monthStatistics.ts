import { api } from "./axios";

export interface Month {
  month: string;
  sales: number;
}

export const getMonthStatistics = async (): Promise<Month[]> => {
  const response = await api.get("/reports/monthly/");
  return response.data;
};
