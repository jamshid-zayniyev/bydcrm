import { strict } from "assert";
import { GetVariants } from "./cars";

export interface CustomersSelectVariants {
  series_count: number;
  position: number;
  variants: GetVariants[];
}

export interface Districed {
  id: number;
  title: string;
}

export interface Analytic {
  model_id: number;
  model_name: string;
  requests_count: number;
}
