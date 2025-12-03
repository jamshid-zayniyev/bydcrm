import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

type FeaturesProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleSubmit: any;
  onSubmit: any;
  register: any;
  errors: any;
  // isSubmitting: boolean;
};

const Features = ({
  open,
  onOpenChange,
  handleSubmit,
  onSubmit,
  register,
  errors,
}: FeaturesProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Yangi xususiyat qo‘shish</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pt-6 space-y-4 pb-0 pl-0 pr-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                description_uz
              </label>
              <textarea
                {...register("description_uz")}
                placeholder="total_available"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.description_uz
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#E60012]"
                }`}
              />
              {errors.description_uz && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description_uz.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                description_ru
              </label>
              <textarea
                {...register("description_ru")}
                placeholder="total_available"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.description_uz
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#E60012]"
                }`}
              />
              {errors.description_ru && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description_ru.message}
                </p>
              )}
            </div>
          </div>

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

export default Features;
