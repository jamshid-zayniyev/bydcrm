import { api } from "./axios";

export interface Customers {
  assigned_to: number;
  created_at: string;
  full_name: string;
  id: number;
  interested_in: number;
  location: string;
  notes: string;
  phone_number: string;
  sentiment: string;
  source: string;
  updated_at: string;
  // status?: string;
  // email?: string;
}

export interface CarsModels {
  id: number;
  name: string;
}

export const getCustomers = async (): Promise<Customers[]> => {
  const response = await api.get("/users/customers/");
  return response.data;
};

export const getOneCustomer = async (id: number): Promise<Customers> => {
  const response = await api.get(`/users/customers/${id}/`);
  return response.data;
};

export const getCarsModels = async (): Promise<CarsModels[]> => {
  const response = await api.get(`/cars/models/`);
  return response.data;
};
