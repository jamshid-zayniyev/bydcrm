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
  id: number;
  image: string;
  model: string;
  base_price: number;
  total_available: number;
  description: string;
  features: string[];
  variants: CarVariant[];
  brand_color_rgb: string;
  brand_color: string;
}

export const carsApi = {
  getAllCars: async (): Promise<Car[]> => {
    const response = await api.get("/cars/all/");
    return response.data;
  },
};
