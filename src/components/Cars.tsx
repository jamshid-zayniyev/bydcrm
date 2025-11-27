import { useCars } from "@/hooks/useCars";
import { Car, Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { Car as CarType } from "../api/cars";
import EditDelete from "./ui/edit-delete";

const Cars = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<CarType | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const closeModal = () => {
    setShowAddModal(false);
  };

  const { t } = useTranslation();
  const {
    cars: bydVehicles,
    loading: carsLoading,
    error: carsError,
  } = useCars();

  const vehicleImages: Record<string, string> = {
    "1": "https://images.unsplash.com/photo-1669198074495-d04dae22bb90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCWUQlMjBTb25nJTIwUGx1cyUyMFNVVnxlbnwxfHx8fDE3NjAzMzA3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "2": "https://images.unsplash.com/photo-1733149085731-30ff1d334f9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbGVjdHJpYyUyMHNlZGFufGVufDF8fHx8MTc2MDMzMDc4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "3": "https://images.unsplash.com/photo-1622333847289-41e8172e650a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMFNVViUyMGNyb3Nzb3ZlcnxlbnwxfHx8fDE3NjAzMzA3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "4": "https://images.unsplash.com/photo-1745393404775-ae350c1677ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYWN0JTIwZWxlY3RyaWMlMjBjYXJ8ZW58MXx8fHwxNzYwMzMwNzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "5": "https://images.unsplash.com/photo-1710880135020-e0af9cc79dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBlbGVjdHJpYyUyMHNlZGFufGVufDF8fHx8MTc2MDMzMDc4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  };

  const formatPrice = (price: number) => {
    return `${(price / 1000000).toFixed(0)} ${t("dashboard.cars.mln")}`;
  };

  // BYD Vehicles loading state
  if (carsLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Loading state for BYD Models section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-[#E60012] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">{t("loading")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <h3 className="text-gray-900 text-base sm:text-lg">
              {t("dashboard.warehouse.title")}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {bydVehicles.length} {t("dashboard.warehouse.model")} •{" "}
              {bydVehicles.reduce((sum, v) => sum + v.total_available, 0)}{" "}
              {t("dashboard.warehouse.cars")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 sm:w-5 sm:h-5 text-[#E60012]" />
            <div
              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#E60012] to-[#b00010] text-white rounded-lg text-xs sm:text-sm shadow-sm"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Yangi aftomobil qo'shish</span>
            </div>
          </div>
        </div>

        {carsError ? (
          <div className="text-center py-8">
            <div className="text-red-500 text-lg mb-2">⚠️</div>
            <p className="text-gray-700 mb-4">{carsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#E60012] text-white px-4 py-2 rounded-lg hover:bg-[#c4000f] transition-colors"
            >
              Qayta yuklash
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {bydVehicles.map((vehicle) => {
              const colorStats = vehicle.variants.reduce((acc, variant) => {
                const existing = acc.find(
                  (item) => item.color === variant.color
                );
                if (existing) {
                  existing.count += variant.stock;
                } else {
                  acc.push({
                    color: variant.color,
                    colorHex: variant.colorHex,
                    count: variant.stock,
                  });
                }
                return acc;
              }, [] as Array<{ color: string; colorHex: string; count: number }>);

              return (
                <div
                  key={vehicle.id}
                  className="border-2 border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-[#E60012] transition-all hover:shadow-lg cursor-pointer"
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  {/* Vehicle Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <ImageWithFallback
                      src={vehicleImages[vehicle.id] || "/default-car.jpg"}
                      alt={vehicle.model}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-white rounded-lg text-xs">
                      {vehicle.total_available}{" "}
                      {t("dashboard.cars.availableForm.availability")}
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-gray-900 mb-1">{vehicle.model}</h4>
                        <p className="text-xs text-gray-500">
                          {vehicle.description}
                        </p>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${
                          vehicle.brand_color === "#E60012"
                            ? "bg-[#E60012]"
                            : "bg-black"
                        }`}
                      ></div>
                    </div>

                    {/* Price */}
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <p className="text-xs text-gray-500">
                        {t("dashboard.cars.availableForm.price")}
                      </p>
                      <p className="text-sm text-[#E60012]">
                        {formatPrice(
                          Math.min(...vehicle.variants.map((v) => v.price))
                        )}{" "}
                        -{" "}
                        {formatPrice(
                          Math.max(...vehicle.variants.map((v) => v.price))
                        )}{" "}
                        {t("dashboard.cars.sum")}
                      </p>
                    </div>

                    {/* Available Colors */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">
                        {t("dashboard.cars.colors")}
                      </p>
                      <div className="space-y-2">
                        {colorStats.map((colorStat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                                style={{ backgroundColor: colorStat.colorHex }}
                              ></div>
                              <span className="text-xs text-gray-700">
                                {colorStat.color}
                              </span>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                colorStat.count > 1
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {colorStat.count} шт
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <EditDelete />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Vehicle Details Modal - API dan ma'lumotlar bilan */}
      <Dialog
        open={!!selectedVehicle}
        onOpenChange={() => setSelectedVehicle(null)}
      >
        <DialogContent className="max-w-5xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto p-0">
          {selectedVehicle && (
            <div className="relative">
              {/* Accessibility - Hidden title and description for screen readers */}
              <DialogTitle className="sr-only">
                {selectedVehicle.model}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Подробная информация об автомобиле {selectedVehicle.model},
                включая доступные комплектации, цвета и характеристики
              </DialogDescription>

              {/* Hero Section with Image and Gradient */}
              <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
                <ImageWithFallback
                  src={vehicleImages[selectedVehicle.id] || "/default-car.jpg"}
                  alt={selectedVehicle.model}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                        selectedVehicle.brand_color === "#E60012"
                          ? "bg-[#E60012]"
                          : "bg-white"
                      } shadow-lg`}
                    ></div>
                    <h2 className="text-white text-lg sm:text-xl md:text-2xl">
                      {selectedVehicle.model}
                    </h2>
                  </div>
                  <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3">
                    {selectedVehicle.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/30">
                    <Car className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      {selectedVehicle.total_available}{" "}
                      {t("dashboard.cars.availableForm.car")}{" "}
                      {t("dashboard.cars.availableForm.availability")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-gradient-to-br from-red-50 to-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-100">
                    <p className="text-xs text-gray-500 mb-1">
                      {t("dashboard.cars.position")}
                    </p>
                    <p className="text-xl sm:text-2xl text-[#E60012]">
                      {selectedVehicle.variants.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">
                      {t("dashboard.cars.series")}
                    </p>
                    <p className="text-xl sm:text-2xl text-gray-900">
                      {
                        new Set(selectedVehicle.variants.map((v) => v.series))
                          .size
                      }
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">
                      {t("dashboard.cars.flowers")}
                    </p>
                    <p className="text-xl sm:text-2xl text-gray-900">
                      {
                        new Set(selectedVehicle.variants.map((v) => v.color))
                          .size
                      }
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-100">
                    <p className="text-xs text-gray-500 mb-1">
                      {t("dashboard.cars.price")}
                    </p>
                    <p className="text-base sm:text-xl text-[#E60012]">
                      {formatPrice(
                        Math.min(
                          ...selectedVehicle.variants.map((v) => v.price)
                        )
                      )}
                    </p>
                  </div>
                </div>

                {/* Features & Colors in Two Columns */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {/* Features */}
                  <div>
                    <h4 className="text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-[#E60012]">⚡</span>
                      {t("dashboard.cars.key")}
                    </h4>
                    <div className="space-y-2">
                      {selectedVehicle.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 bg-gray-50 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#E60012] flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color Statistics */}
                  <div>
                    <h4 className="text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-[#E60012]">🎨</span>
                      {t("dashboard.cars.colors")}
                    </h4>
                    <div className="space-y-2">
                      {selectedVehicle.variants
                        .reduce((acc, variant) => {
                          const existing = acc.find(
                            (item) => item.color === variant.color
                          );
                          if (existing) {
                            existing.count += variant.stock;
                          } else {
                            acc.push({
                              color: variant.color,
                              colorHex: variant.colorHex,
                              count: variant.stock,
                            });
                          }
                          return acc;
                        }, [] as Array<{ color: string; colorHex: string; count: number }>)
                        .map((colorStat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-3 border-white shadow-md ring-2 ring-gray-200"
                                style={{ backgroundColor: colorStat.colorHex }}
                              ></div>
                              <span className="text-xs sm:text-sm text-gray-900">
                                {colorStat.color}
                              </span>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-lg text-sm ${
                                colorStat.count > 1
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {colorStat.count} шт
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Variants Table */}
                <div>
                  <h4 className="text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <span className="text-[#E60012]">📋</span>
                    {t("dashboard.cars.available")}
                  </h4>
                  <div className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                          <tr>
                            <th className="text-left py-3 px-4 text-xs text-gray-600">
                              {t("dashboard.cars.availableForm.series")}
                            </th>
                            <th className="text-left py-3 px-4 text-xs text-gray-600">
                              {t("dashboard.cars.availableForm.color")}
                            </th>
                            <th className="text-left py-3 px-4 text-xs text-gray-600">
                              {t("dashboard.cars.availableForm.battery")}
                            </th>
                            <th className="text-left py-3 px-4 text-xs text-gray-600">
                              {t("dashboard.cars.availableForm.stock")}
                            </th>
                            <th className="text-right py-3 px-4 text-xs text-gray-600">
                              {t("dashboard.cars.availableForm.price")}
                            </th>
                            <th className="text-right py-3 px-4 text-xs text-gray-600">
                              {t("dashboard.cars.availableForm.warehouse")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {selectedVehicle.variants.map((variant) => (
                            <tr
                              key={variant.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-3 px-4 text-gray-900">
                                {variant.series}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                                    style={{
                                      backgroundColor: variant.colorHex,
                                    }}
                                  ></div>
                                  <span className="text-gray-700 text-xs">
                                    {variant.color}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-gray-700 text-xs">
                                {variant.battery}
                              </td>
                              <td className="py-3 px-4 text-gray-700 text-xs">
                                {variant.range}
                              </td>
                              <td className="py-3 px-4 text-right text-[#E60012]">
                                {formatPrice(variant.price)}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <span
                                  className={`inline-block px-2 py-1 rounded-lg text-xs ${
                                    variant.stock > 1
                                      ? "bg-green-100 text-green-700"
                                      : variant.stock === 1
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {variant.stock}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {/* {selected
                ? `${t("customers.addClientObj.oneClient")}`
                : `${t("customers.addClientObj.addNewClient")}`} */}
                yopish
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Mashina nomi
                  </label>
                  <input
                    // {...register("full_name")}
                    placeholder={t("customers.addClientObj.enterName")}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Mashina turi
                  </label>
                  <input
                    placeholder="+998 XX XXX XX XX"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
                    // onChange={handlePhoneChange}
                    // onBlur={handlePhoneBlur}
                  />
                  {/* {errors.phone_number && (
              <p className="text-[#E60012]">{errors.phone_number.message}</p>
            )} */}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Narxi
                  </label>
                  <input
                    placeholder="+998 XX XXX XX XX"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
                    // onChange={handlePhoneChange}
                    // onBlur={handlePhoneBlur}
                  />
                  {/* {errors.phone_number && (
              <p className="text-[#E60012]">{errors.phone_number.message}</p>
            )} */}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Range
                  </label>
                  <input
                    placeholder="+998 XX XXX XX XX"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
                    // onChange={handlePhoneChange}
                    // onBlur={handlePhoneBlur}
                  />
                  {/* {errors.phone_number && (
              <p className="text-[#E60012]">{errors.phone_number.message}</p>
            )} */}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Akumlator kuchi
                  </label>
                  <input
                    placeholder="Akumlator kuchi"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
                    // onChange={handlePhoneChange}
                    // onBlur={handlePhoneBlur}
                  />
                  {/* {errors.phone_number && (
              <p className="text-[#E60012]">{errors.phone_number.message}</p>
            )} */}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Tezlanish
                  </label>
                  <input
                    placeholder="Tezlanish"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
                    // onChange={handlePhoneChange}
                    // onBlur={handlePhoneBlur}
                  />
                  {/* {errors.phone_number && (
              <p className="text-[#E60012]">{errors.phone_number.message}</p>
            )} */}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Featured
                  </label>
                  <input
                    placeholder="Featured"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
                  />
                  {/* {errors.source && (
              <p className="text-[#E60012]">{errors.source.message}</p>
            )} */}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Images
                  </label>
                  <input
                    placeholder="Tezlanish"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
                    type="file"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors"
                >
                  {t("customers.addClientObj.addClient")}
                  {/* {loading
              ? `...${t("customers.addClientObj.addClient")}`
              : `${t("customers.addClientObj.addClient")}`} */}
                </button>
                <button
                  // disabled={loading}
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t("customers.addClientObj.cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Cars;
