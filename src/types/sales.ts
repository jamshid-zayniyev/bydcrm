import z from "zod";

export const createSaleContractSchema = (t: any) =>
  z.object({
    customer_id: z.string().optional(),
    car: z.string().optional(),
    price: z.string().min(1, t("cars.priceError")),
    sold_by: z.string().optional(),
    status: z.string().optional(),
  });
export type SaleContractSchema = z.infer<
  ReturnType<typeof createSaleContractSchema>
>;
