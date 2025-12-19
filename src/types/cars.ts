import z from "zod";

export interface CarsColor {
  id: number;
  title: string;
  rgb: string;
}

export const createCarSchema = (t: any) =>
  z.object({
    model: z.string().min(1, t("cars.modelError")),
    base_price: z.string().min(1, t("cars.priceError")),

    total_available: z.number().positive(t("cars.totalAvailableError")),
    description_uz: z.string().min(1, t("cars.descriptionUzError")),
    description_ru: z.string().min(1, t("cars.descriptionRuError")),
    brand_color: z.string().min(1, t("cars.brandColorError")),
    image: z
      .any()
      .refine((file) => {
        // Yangi yaratishda: file majburiy
        // Tahrirlashda: file yoki string bo'lishi mumkin
        return (
          file instanceof File || typeof file === "string" || file === undefined
        );
      }, t("cars.imageUploadError"))
      .optional(),
  });

export type CarSchema = z.infer<ReturnType<typeof createCarSchema>>;

export const createFeaturesSchema = (t: any) =>
  z.object({
    description_uz: z.string().min(1, t("cars.descriptionUzError")),
    description_ru: z.string().min(1, t("cars.descriptionRuError")),
  });
export type FeaturesSchema = z.infer<ReturnType<typeof createFeaturesSchema>>;

export interface GetFeatures {
  id: number;
  description: string;
}

export const createVariantsSchema = (t: any) =>
  z.object({
    series: z.string().min(1, t("cars.seriesError")),
    color: z.string().min(1, t("cars.colorError")),
    battery: z.string().min(1, t("cars.batteryError")),
    price: z.string().min(1, t("cars.priceError")),
    stock: z.string().min(1, t("cars.stockError")),
  });
export type VariantsSchema = z.infer<ReturnType<typeof createVariantsSchema>>;

export interface CarsColorArray {
  color: string;
  colorHex: string;
  id: number;
  stock: number;
}

export interface GetVariants {
  id: number;
  battery: string;
  color: string;
  colorHex: string;
  price: number;
  range: string;
  series: string;
  stock: number;
}

export interface CarsSeries {
  id: number;
  car: number;
  name: string;
}
