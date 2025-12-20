import z from "zod";

export const createMeSchema = (t: any) =>
  z.object({
    first_name: z.string().min(1, "Frist name"),
    last_name: z.string().min(1, "Last name"),
    phone_number: z
      .string()
      .min(1, "Telefon raqamni kiriting")
      .transform((val) => val.replace(/\s/g, "")) // Remove spaces for storage
      .refine((val) => /^\+998\d{9}$/.test(val), {
        message: "Telefon raqam formati noto'g'ri. Format: +998 XX XXX XX XX",
      }),
    username: z.string().min(1, "username"),
    avatar: z
      .any()
      .refine(
        (file) => {
          // File yoki string bo'lishi mumkin
          return (
            file instanceof File ||
            typeof file === "string" ||
            file === undefined
          );
        },
        {
          message: "Rasm fayli noto'g'ri formatda",
        }
      )
      .optional(),
  });

export type CarMe = z.infer<ReturnType<typeof createMeSchema>>;

export interface UserProfile {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  avatar: string;
}
