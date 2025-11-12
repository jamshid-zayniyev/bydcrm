import { api } from "./axios";

export interface CarVariant {
  id: string;
  series: string;
  color: string;
  colorHex: string;
  battery: string;
  range: string;
  price: number;
  stock: number;
}

export interface Car {
  id: string;
  model: string;
  base_price: number;
  total_available: number;
  description: string;
  features: string[];
  brand_color: string;
  variants: CarVariant[];
}
export interface Week {
  calls: number;
  day: string;
}

export interface Month {
  month: string;
  sales: number;
}

export interface Day {
  day: string;
  sales: number;
}

export interface PieChart {
  name: string;
  value: number;
}

export const carsApi = {
  getAllCars: async (): Promise<Car[]> => {
    const response = await api.get("/cars/all/");
    return response.data;
  },
};

export const getWeekStatistics = async (): Promise<Week[]> => {
  const response = await api.get("/reports/weekly-calls/");
  return response.data;
};

export const getMonthStatistics = async (): Promise<Month[]> => {
  const response = await api.get("/reports/monthly/");
  return response.data;
};

export const getDayStatistics = async (): Promise<Day[]> => {
  const response = await api.get("/reports/daily/");
  return response.data;
};

export const getPieChart = async (): Promise<PieChart[]> => {
  const response = await api.get("/reports/customer-resources/");
  return response.data;
};