import { QrCode, Camera, UserPlus, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import { QRCode, QRScan } from "@/assets";
import UseQrScanner from "@/hooks/useQrScanner";
import Loading from "./ui/loading";
import { useTestDrive } from "@/hooks/useTestDrive";

export function QRScanner() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,

    cars,
    loading,

    handlePhoneChange,
    handlePhoneBlur,
    daily,
    loadingDaily,
  } = UseQrScanner();

  const { employees } = useTestDrive();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">{t("qr.title")}</h2>
        <p className="text-gray-500 text-sm">{t("qr.description")}</p>
      </div>

      {/* Showroom Image */}
      <div className="relative h-40 rounded-xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1620987278429-ab178d6eb547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCWUQlMjB2ZWhpY2xlJTIwc2hvd3Jvb218ZW58MXx8fHwxNzYwMTk0ODE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="BYD Showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#E60012]/90 to-transparent flex items-center px-6">
          <div>
            <h3 className="text-white mb-1">Добро пожаловать в салон BYD</h3>
            <p className="text-white/90 text-sm">
              Зарегистрируйтесь для получения персональной консультации
            </p>
          </div>
        </div>
      </div>

      {/* QR Scanner */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="mx-auto" style={{ width: "370px", height: "370px" }}>
            <img className="w-full object-cover" src={QRScan} alt="no img-?" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-red-50 border-2 border-[#E60012] rounded-xl flex items-center justify-center mb-3">
            <QrCode className="w-6 h-6 text-[#E60012]" />
          </div>
          <h3 className="text-gray-900 mb-2">
            {t("qr.manualRegistration.fastRegistration.title")}
          </h3>
          <p className="text-sm text-gray-600">
            {t("qr.manualRegistration.fastRegistration.description")}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-gray-100 border-2 border-black rounded-xl flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-gray-900 mb-2">
            {t("qr.manualRegistration.visitTracking.title")}
          </h3>
          <p className="text-sm text-gray-600">
            {t("qr.manualRegistration.visitTracking.description")}
          </p>
        </div>
      </div>

      {/* Manual Registration */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-transparent">
          <h3 className="text-gray-900">{t("qr.manualRegistration.title")}</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {t("qr.manualRegistration.form.clientName.label")} *
              </label>
              <input
                type="text"
                placeholder={t(
                  "qr.manualRegistration.form.clientName.placeholder"
                )}
                {...register("full_name")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent
                 ${
                   errors.full_name
                     ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                     : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                 }`}
              />
              {errors.full_name && (
                <p className="mt-2 text-sm text-[#E60012] font-medium">
                  {errors.full_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {t("qr.manualRegistration.form.phone.label")} *
              </label>
              <input
                {...register("phone_number")}
                type="tel"
                placeholder="+998 XX XXX XX XX"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent ${
                  errors.phone_number
                    ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                    : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                }`}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
              />
              {errors.phone_number && (
                <p className="text-[#E60012]">{errors.phone_number.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {t("qr.manualRegistration.form.interestedModel.label")} *
              </label>
              <select
                {...register("interested_in")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent
                 ${
                   errors.interested_in
                     ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                     : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                 }`}
              >
                <option value="" disabled>
                  {t("qr.manualRegistration.form.interestedModel.labelSelect")}
                </option>
                {cars.map((el) => (
                  <option key={el?.id} value={el?.id}>
                    {el?.model}
                  </option>
                ))}
              </select>
              {errors.interested_in && (
                <p className="mt-2 text-sm text-[#E60012] font-medium">
                  {errors.interested_in.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                {t("qr.manualRegistration.form.assignedTo.label")} *
              </label>
              <select
                {...register("assigned_to")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent
                 ${
                   errors.assigned_to
                     ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                     : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                 }`}
              >
                <option value="" disabled>
                  {t("qr.manualRegistration.form.assignedTo.labelSelect")}
                </option>
                {employees.map((el) => (
                  <option key={el?.id} value={el?.id}>
                    {el?.full_name}
                  </option>
                ))}
              </select>
              {errors.assigned_to && (
                <p className="mt-2 text-sm text-[#E60012] font-medium">
                  {errors.assigned_to.message}
                </p>
              )}
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors shadow-sm disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>{t("qr.manualRegistration.submitButton")}...</>
            ) : (
              t("qr.manualRegistration.submitButton")
            )}
          </button>
        </form>
      </div>

      {/* Recent Walk-ins */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-gray-900">{t("qr.recentVisits")}</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <Loading />
          ) : (
            daily.map((el) => (
              <div
                key={el?.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 border-2 border-[#E60012] rounded-full flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-[#E60012]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{el?.full_name}</p>
                      <p className="text-xs text-gray-500">
                        {el?.interested_in}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Clock className="w-4 h-4" />
                    {el?.updated_at.split("T")[1].slice(0, 5)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
