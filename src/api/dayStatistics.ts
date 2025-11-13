import { api } from "./axios";

export interface Day {
  day: string;
  sales: number;
}

export const getDayStatistics = async (): Promise<Day[]> => {
  const response = await api.get("/reports/daily/");
  return response.data;
};
