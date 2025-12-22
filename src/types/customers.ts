import { GetVariants } from "./cars";

export interface CustomersSelectVariants {
  series_count: number;
  position: number;
  variants: GetVariants[];
}
