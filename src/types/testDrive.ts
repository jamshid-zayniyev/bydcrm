import z from "zod";

export const createTestDriveSchema = (t: any) =>
  z.object({
    customer: z.string().min(1, t("test-drive.customerError")),
    email: z
      .string()
      .optional()
      .refine(
        (email) => {
          // Agar email bo'sh yoki undefined bo'lsa, true qaytar
          if (!email || email.trim() === "") return true;

          // Email kiritilgan bo'lsa, formatni tekshir
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        {
          message:
            "Iltimos, to'g'ri email formatida kiriting (masalan: example@gmail.com)",
        }
      ),
    employee: z.string().optional(),
    status: z.string().optional(),
    scheduled_time: z.string().nonempty("Test-drive vaqti tanlanishi shart"),
  });
export type TestDriveSchema = z.infer<ReturnType<typeof createTestDriveSchema>>;

export interface CustomersList {
  id: number;
  full_name: string;
  phone_number: string;
  interested_in: number;
  variants: number;
}

export interface TestDrive {
  id: number;
  customer: number;
  full_name: string;
  email: string;
  phone_number: string;
  car: number;
  variants: string;
  employee: number;
  employee_name: string;
  status: string;
  scheduled_time: string;
}

export interface Employees {
  id: number;
  username: string;
  full_name: string;
  phone_number: string;
  email: string;
}
