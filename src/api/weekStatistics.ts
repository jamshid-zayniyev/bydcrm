import { api } from "./axios";

export interface Week {
  calls: number;
  day: string;
}

export const getWeekStatistics = async (): Promise<Week[]> => {
  const response = await api.get("/reports/weekly-calls/");
  return response.data;
};
