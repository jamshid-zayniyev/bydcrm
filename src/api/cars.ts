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
  basePrice: number;
  totalAvailable: number;
  description: string;
  features: string[];
  brandColor: string;
  variants: CarVariant[];
}

export const carsApi = {
  getAllCars: async (): Promise<Car[]> => {
    const response = await api.get('/cars/all/');
    return response.data;
  },
};