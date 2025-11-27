import z from "zod";

export interface ServicesType {
  id: number;
  customer_id: number;
  customer_name: string;
  vehicle: number;
  service_type: string;
  date: string;
  status: string;
  technician: number;
  rate: number;
}

export interface Employees {
  id: number;
  username: string;
  full_name: string;
  phone_number: string;
  email: string;
}

export interface WeeklyStatistic {
  day: string;
  date: string;
  created: number;
  completed: number;
  percent: number;
}

export interface Reports {
  total_request: number;
  completed: number;
  average_rating: number;
}

export interface Service {
  id: number;
  title: string;
}

export const serviceSchema = z.object({
  customer_id: z.string().optional(),
  customer_name: z.string().min(1, "Mijoz nomi kiritilishi shart"),
  date: z.string().min(1, "Sana tanlanishi shart"),
  rate: z.string().optional(),
  service_type: z.string().optional(),
  status: z.string().optional(),
  technician: z.string().optional(),
  vehicle: z.string().optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
