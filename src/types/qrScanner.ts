import z from "zod";

export const userSchema = (t: any) =>
  z.object({
    full_name: z
      .string()
      .min(1, t("qr.manualRegistration.form.clientName.errorFullName")),
    phone_number: z
      .string()
      .min(1, t("qr.manualRegistration.form.phone.errorPhone"))
      .transform((val) => val.replace(/\s/g, ""))
      .refine((val) => /^\+998\d{9}$/.test(val), {
        message: "+998 XX XXX XX XX",
      }),
    interested_in: z
      .string()
      .min(
        1,
        t("qr.manualRegistration.form.interestedModel.errorInterestedModel")
      ),
  });

// Type definition
export type User = z.infer<ReturnType<typeof userSchema>>;

export interface QRData {
  id: number;
  full_name: string;
  phone_number: string;
  status: string | null;
  source: string | null;
  interested_in: string;
  variants: string | null;
  location: string | null;
  assigned_to: string;
  rate: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
