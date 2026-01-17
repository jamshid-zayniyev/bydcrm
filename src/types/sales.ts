import z from "zod";

export const createSaleContractSchema = (t: any) =>
  z.object({
    customer_id: z.string().min(1, t("sales.customerSelectError")),
    car: z.string().optional(),
    price: z.string().min(1, t("cars.priceError")),
    // sold_by: z.string().min(1, t("sales.soldBySelectError")),
    status: z.string().min(1, t("sales.statusSelectError")),
    // variants: z.string().min(1, t("sales.variantsError")),
    variants: z.string().optional(),
  });
export type SaleContractSchema = z.infer<
  ReturnType<typeof createSaleContractSchema>
>;
