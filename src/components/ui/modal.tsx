import { X } from "lucide-react";

import {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormData {
  target: string;
}

interface ModalProps {
  showAddModal: boolean;
  closeModal: () => void;
  onSubmit: SubmitHandler<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  loading: boolean;
}

const Modal = ({
  showAddModal,
  closeModal,
  onSubmit,
  handleSubmit,
  register,
  errors,
  loading,
}: ModalProps) => {
  const { t } = useTranslation();
  if (!showAddModal) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 h-full bg-black/50 backdrop-blur"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-gray-900"> {t("kpi.addGoal")}</h2>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("target")}
            </label>
            <input
              {...register("target")}
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
                register("target").onChange({
                  target: { value: rawValue, name: "target" },
                });
              }}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]  ${
                errors.target
                  ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                  : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
              }`}
            />
            {errors.target && (
              <p className="text-[#E60012]">
                {errors.target?.message as string}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors"
            >
              {loading ? `...${t("saving")}` : t("formSave")}
            </button>
            <button
              // disabled={loading}
              onClick={closeModal}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t("actions.cansel")}
              {/* {t("customers.addClientObj.cancel")} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
