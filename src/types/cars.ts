import z from "zod";

export interface CarsColor {
  id: number;
  title: string;
  rgb: string;
}

export const createCarSchema = (t: any) =>
  z.object({
    model: z.string().min(1, "Model nomi majburiy"),
    base_price: z.number().positive("Boshlang'ich narx musbat bo'lishi kerak"),
    total_available: z.number().positive("Sonni bo'lishi shart"),
    description_uz: z.string().min(1, "description_uz nomi majburiy"),
    description_ru: z.string().min(1, "description_ru nomi majburiy"),
    brand_color: z.string().min(1, "Rangni tanlash majburiy"),
    image: z
      .any()
      .refine((file) => {
        // Yangi yaratishda: file majburiy
        // Tahrirlashda: file yoki string bo'lishi mumkin
        return (
          file instanceof File || typeof file === "string" || file === undefined
        );
      }, "Rasm yuklash majburiy")
      .optional(),
  });

export type CarSchema = z.infer<ReturnType<typeof createCarSchema>>;

export const createFeaturesSchema = (t: any) =>
  z.object({
    description_uz: z.string().min(1, "description_uz nomi majburiy"),
    description_ru: z.string().min(1, "description_ru nomi majburiy"),
  });
export type FeaturesSchema = z.infer<ReturnType<typeof createFeaturesSchema>>;

export interface GetFeatures {
  id: number;
  description: string;
}

export const createVariantsSchema = (t: any) =>
  z.object({
    series: z.string().min(1, "Series tanlash majburiy"),
    color: z.string().min(1, "Rangni tanlash majburiy"),
    battery_uz: z.string().min(1, "battery_uz nomi majburiy"),
    battery_ru: z.string().min(1, "battery_ru nomi majburiy"),
    range_uz: z.string().min(1, "range_uz nomi majburiy"),
    range_ru: z.string().min(1, "range_ru nomi majburiy"),
    price: z.string().min(1, "price nomi majburiy"),
    stock: z.string().min(1, "Summa kiritishlikki shart!"),
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
