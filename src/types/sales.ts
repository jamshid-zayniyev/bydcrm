import z from "zod";

export const createSaleContractSchema = (t: any) =>
  z.object({
    customer_id: z.string().min(1, t("sales.customerSelectError")),
    car: z.string().optional(),
    price: z.string().min(1, t("cars.priceError")),
    status: z.string().min(1, t("sales.statusSelectError")),
    variants: z.string().optional(),
    contract_number: z.string().min(1, t("sales.statusNumberError")),
  });
export type SaleContractSchema = z.infer<
  ReturnType<typeof createSaleContractSchema>
>;
