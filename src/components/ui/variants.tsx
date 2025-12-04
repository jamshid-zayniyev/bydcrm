import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { CarsColor, CarsSeries, VariantsSchema } from "@/types/cars";
import { Controller, UseFormReturn } from "react-hook-form";
import { ColorSelect } from "./color-select";
import { useTranslation } from "react-i18next";

type VariantsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleSubmit: UseFormReturn<VariantsSchema>["handleSubmit"];
  onSubmit: (data: VariantsSchema) => void;
  register: UseFormReturn<VariantsSchema>["register"];
  errors: UseFormReturn<VariantsSchema>["formState"]["errors"];
  colors: CarsColor[];
  control: UseFormReturn<VariantsSchema>["control"];
  // setValue: UseFormReturn<VariantsSchema>["setValue"];
  // watch: UseFormReturn<VariantsSchema>["watch"];

  selected: number | null;
  // isSubmitting: boolean;

  carsSeries: CarsSeries[];
};

const Variants = ({
  // Modal
  open,
  onOpenChange,

  // Form
  handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  // setValue,
  // watch,

  // ColorData
  colors,
  selected,

  carsSeries = [],
}: VariantsProps) => {
  console.log(carsSeries[0].name);
  const { t } = useTranslation();

  // const formatPrice = (value: string) => {
  //   if (!value) return "";

  //   // Faqat raqam va nuqtani qoldirish
  //   let cleaned = value.replace(/[^\d.,]/g, "");
  //   cleaned = cleaned.replace(/,/g, ".");

  //   return cleaned;
  // };

  // const displayPrice = (value: string) => {
  //   if (!value) return "";

  //   const num = parseFloat(value.replace(/,/g, "."));
  //   if (isNaN(num)) return value;

  //   return num.toLocaleString("en-US", {
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 2,
  //   });
  // };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {selected === null
              ? "Yangi xususiyat qo‘shish"
              : "Xususiyatni tahrirlash"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pt-6 space-y-4 pb-0 pl-0 pr-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">series</label>
              <select
                {...register("series", {
                  required: "Seriyani tanlash majburiy", // Zod yoki RHF validation
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012] ${
                  errors.series
                    ? "border-[#E60012] focus:border-[#E60012]"
                    : "border-gray-300"
                }`}
                // Agar tahrirlash rejimida bo'lsa, qiymat avtomatik to'ldiriladi (RHF boshqaradi)
              >
                {/* Placeholder – tanlanmagan holatda ko‘rinadi */}
                <option value="" disabled selected hidden>
                  Seriyani tanlang...
                </option>

                {/* Ma'lumotlar yuklanmagan yoki bo'sh bo'lsa */}
                {carsSeries && carsSeries.length > 0 ? (
                  carsSeries.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Yuklanmoqda yoki ma'lumot yo‘q</option>
                )}
              </select>

              {/* XATO XABARI – SIZ SO‘RAGAN QISM */}
              {errors.series && (
                <p className="text-[#E60012] text-sm mt-1">
                  {errors.series.message || "Seriyani tanlash majburiy"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Color</label>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <>
                    <ColorSelect
                      colors={colors}
                      value={field.value ? field.value.toString() : ""}
                      onChange={field.onChange}
                      placeholder="Rang tanlang..."
                      errorsColor={!!errors.color}
                    />
                    {errors.color && (
                      <p className="text-[#E60012] text-sm mt-1">
                        {errors.color.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                battery_uz
              </label>
              <input
                {...register("battery_uz")}
                placeholder="total_available"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.battery_uz
                    ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                    : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                }`}
                type="text"
              />
              {errors.battery_uz && (
                <p className="text-[#E60012]">{errors.battery_uz.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                battery_ru
              </label>
              <input
                {...register("battery_ru")}
                placeholder="total_available"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.battery_ru
                    ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                    : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                }`}
                type="text"
              />
              {errors.battery_ru && (
                <p className="text-[#E60012]">{errors.battery_ru.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                range_uz
              </label>
              <input
                {...register("range_uz")}
                placeholder="total_available"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.range_uz
                    ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                    : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                }`}
                type="text"
              />
              {errors.range_uz && (
                <p className="text-[#E60012]">{errors.range_uz.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                range_ru
              </label>
              <input
                {...register("range_ru")}
                placeholder="total_available"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.range_ru
                    ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                    : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                }`}
                type="text"
              />
              {errors.range_ru && (
                <p className="text-[#E60012]">{errors.range_ru.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">price</label>
              <input
                {...register("price")}
                placeholder="total_available"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.price
                    ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                    : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                }`}
                type="text"
                onChange={(e) => {
                  // Faqat raqamlarni qoldirish
                  let value = e.target.value.replace(/,/g, "");

                  // Agar son bo'lsa, formatlash
                  if (value && !isNaN(Number(value))) {
                    // Vergul bilan formatlash
                    const formatted = Number(value).toLocaleString("en-US");
                    e.target.value = formatted;

                    // React Hook Form uchun asl qiymatni saqlash
                    e.target.setAttribute("data-value", value);
                  }
                }}
                onBlur={(e) => {
                  // Blur paytida asl qiymatni register ga yuborish
                  const rawValue = e.target.value.replace(/,/g, "");
                  register("price").onChange({
                    target: { value: rawValue, name: "price" },
                  });
                }}
              />
              {errors.price && (
                <p className="text-[#E60012]">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">stock</label>
              <input
                {...register("stock")}
                placeholder="total_available"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.stock
                    ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                    : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                }`}
                type="text"
                onChange={(e) => {
                  // Faqat raqamlarni qoldirish
                  let value = e.target.value.replace(/,/g, "");

                  // Agar son bo'lsa, formatlash
                  if (value && !isNaN(Number(value))) {
                    // Vergul bilan formatlash
                    const formatted = Number(value).toLocaleString("en-US");
                    e.target.value = formatted;

                    // React Hook Form uchun asl qiymatni saqlash
                    e.target.setAttribute("data-value", value);
                  }
                }}
                onBlur={(e) => {
                  // Blur paytida asl qiymatni register ga yuborish
                  const rawValue = e.target.value.replace(/,/g, "");
                  register("stock").onChange({
                    target: { value: rawValue, name: "stock" },
                  });
                }}
              />
              {errors.stock && (
                <p className="text-[#E60012]">{errors.stock.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors"
              // disabled={uploadLoading}
            >
              Saqlash
              {/* {uploadLoading ? "Yuklanmoqda..." : "Saqlash"} */}
            </button>
            <button
              type="button"
              // disabled={uploadLoading}
              onClick={() => onOpenChange(false)}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Bekor qilish
              {/* {t("customers.addClientObj.cancel")} */}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Variants;
