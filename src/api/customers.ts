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
  status: number;
  variants: string;
  // email?: string;
}

export interface CarsModels {
  id: number;
  model: string;
}

export interface ApiResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface UsersStatus {
  id: number;
  title: string;
}

export const getCustomers = async (
  active: number,
  search: string,
  status: number | string,
  created_date: string
): Promise<ApiResponse<Customers>> => {
  const response = await api.get(
    `/users/customers/?page=${active}&search=${search}&status=${
      status === "all" ? "" : status
    }&created_date=${created_date}`
  );
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

export const getUsersStatus = async (): Promise<UsersStatus[]> => {
  const response = await api.get(`/users/status/`);
  return response.data;
};
