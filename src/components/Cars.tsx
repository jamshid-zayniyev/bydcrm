import { useCars } from "@/hooks/useCars";
import { Car, Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent } from "./ui/dialog";
import { useState } from "react";
import { Car as CarType } from "../api/cars";
import EditDelete from "./ui/edit-delete";
import { useAllCars } from "../hooks/useAllCars";
import { ColorSelect } from "./ui/color-select";
import { Controller } from "react-hook-form";
import DeleteModal from "./ui/delete-modal";
import Features from "./ui/features";

import { useFeatures } from "@/hooks/useFeatures";
import { useVariants } from "@/hooks/useVariants";
import Variants from "./ui/variants";
import Loading from "./ui/loading";
import Nodata from "./ui/no-data";
import DeleteDialog from "./ui/delete-dialog";

const Cars = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<CarType | null>(null);
  // const [selectedColor, setSelectedColor] = useState<number | undefined>(
  //   undefined
  // );
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    colors,
    loading,
    previewImage,
    uploadLoading,
    handleImageChange,
    handleRemoveImage,
    watch,
    control,
    cars: bydVehicles,
    closeModal,
    setShowAddModal,
    showAddModal,
    loading: carsLoading,
    error: carsError,
    closeDeleteModal,
    deleteBtn,
    openDeleteModal,
    isDeleteModal,
    editBtn,
    selected,

    fetchCars,
  } = useAllCars();

  const {
    showAddModal: showAddModalFeatures,
    setShowAddModal: setShowAddModalFeatures,
    closeModal: closeModalFeatures,
    handleSubmit: handleSubmitFeatures,
    onSubmit: onSubmitFeatures,
    register: registerFeatures,
    errors: errorsFeatures,
    fetchFeatures,
    featuresData,
    loading: featuresLoading,
    openDeleteModal: openDeleteModalFeatures,
    editBtn: editBtnFeatures,

    setSelectedItemId: setSelectedItemIdFeatures,
    selectedItemId: selectedItemIdFeatures,

    closeDeleteModal: closeDeleteModalFeatures,
    isDeleteModal: isDeleteModalFeatures,
    deleteBtn: deleteBtnFeatures,
  } = useFeatures(selectedVehicle?.id);

  const {
    // Form
    handleSubmit: handleSubmitVariants,
    onSubmit: onSubmitVariants,
    errors: errorsVariants,
    register: registerVariants,
    control: controlVariants,
    // setValue: setValueVariants,
    // watch: watchVariants,

    // Modal
    setShowAddModal: setShowAddModalVariants,
    showAddModal: showAddModalVariants,
    closeModal: closeModalVariants,

    // getData
    fetchVariables,
    variantsData,

    loading: loadingVariants,

    // Edit and Delete
    editBtn: editBtnVariants,
    openDeleteModal: openDeleteModalVariants,
    closeDeleteModal: closeDeleteModalVariants,
    isDeleteModal: isDeleteModalVariants,
    deleteBtn: deleteBtnVariants,

    selected: selectedVariants,

    setSelectedItemId: setSelectedItemIdVariants,
    selectedItemId: selectedItemIdVariants,

    // getDataColor
    getColors,
    variantsColor,

    getCarsSeries,
    carsSeries,

    seriesCount,
    position,
  } = useVariants(selectedVehicle?.id);

  const { t } = useTranslation();

  const formatPrice = (price: number) => {
    return `${(price / 1000000).toFixed(0)} ${t("dashboard.cars.mln")}`;
  };

  // if (carsLoading) {
  //   return (
  //     <div className="space-y-4 sm:space-y-6">
  //       <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
  //         <div className="flex items-center justify-center h-32">
  //           <div className="text-center">
  //             <div className="w-8 h-8 border-4 border-[#E60012] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
  //             <p className="text-gray-600 text-sm">{t("loading")}</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
        ) : loading ? (
          <Loading />
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
                  onClick={() => {
                    setSelectedVehicle(vehicle);
                    fetchFeatures(vehicle.id);
                    fetchVariables(vehicle.id);
                    getColors(vehicle.id);
                    getCarsSeries(vehicle.id);
                  }}
                >
                  {/* Vehicle Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <ImageWithFallback
                      src={vehicle.image ? vehicle.image : "/default-car.jpg"}
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
                      {/* <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${
                          vehicle.brand_color === "#E60012"
                            ? "bg-[#E60012]"
                            : "bg-black"
                        }`}
                      ></div> */}
                    </div>

                    {/* Price */}
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <p className="text-xs text-gray-500">
                        {t("dashboard.cars.availableForm.price")}
                      </p>
                      <p className="text-sm text-[#E60012]">
                        {vehicle?.variants.length ? (
                          <>
                            {formatPrice(
                              Math.min(...vehicle.variants.map((v) => v.price))
                            )}{" "}
                            -{" "}
                            {formatPrice(
                              Math.max(...vehicle.variants.map((v) => v.price))
                            )}{" "}
                            {t("dashboard.cars.sum")}
                          </>
                        ) : (
                          formatPrice(vehicle?.base_price)
                        )}
                      </p>
                    </div>

                    {/* Available Colors */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">
                        {t("dashboard.cars.colors")}
                      </p>
                      <div
                        className="space-y-2"
                        style={{ height: "75px", overflowY: "auto" }}
                      >
                        {colorStats.length === 0 ? (
                          <div
                            className="flex items-center justify-between"
                            style={{ padding: "16px 0" }}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                                style={{
                                  backgroundColor: vehicle.brand_color_rgb,
                                }}
                              ></div>
                              <span className="text-xs text-gray-700">
                                {vehicle?.brand_color}
                              </span>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700`}
                            >
                              1 {t("pcs")}
                            </span>
                          </div>
                        ) : (
                          colorStats.map((colorStat, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                                  style={{
                                    backgroundColor: colorStat.colorHex,
                                  }}
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
                                {colorStat.count} {t("pcs")}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <EditDelete
                      openDeleteModal={openDeleteModal}
                      setSelectedItemId={setSelectedItemId}
                      id={vehicle.id}
                      editBtn={editBtn}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog
        open={!!selectedVehicle}
        onOpenChange={() => {
          setSelectedVehicle(null);

          fetchCars();
        }}
      >
        <DialogContent className="max-w-5xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto p-0">
          {selectedVehicle && (
            <div className="relative">
              {/* Accessibility - Hidden title and description for screen readers */}
              {/* <DialogTitle className="sr-only">
                {selectedVehicle.model}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Подробная информация об автомобиле {selectedVehicle.model},
                включая доступные комплектации, цвета и характеристики
              </DialogDescription> */}

              {/* Hero Section with Image and Gradient */}
              <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
                <ImageWithFallback
                  src={`${
                    selectedVehicle.image
                      ? selectedVehicle.image
                      : "/default-car.jpg"
                  }`}
                  alt={selectedVehicle.model}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

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
                      {/* {selectedVehicle.variants.length} */}
                      {position}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">
                      {t("dashboard.cars.series")}
                    </p>
                    <p className="text-xl sm:text-2xl text-gray-900">
                      {/* {
                        new Set(selectedVehicle.variants.map((v) => v.series))
                          .size
                      } */}
                      {seriesCount}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">
                      {t("dashboard.cars.flowers")}
                    </p>
                    <p className="text-xl sm:text-2xl text-gray-900">
                      {/* {
                        new Set(selectedVehicle.variants.map((v) => v.color))
                          .size
                      } */}
                      {variantsColor.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-100">
                    <p className="text-xs text-gray-500 mb-1">
                      {t("dashboard.cars.price")}
                    </p>
                    <p className="text-base sm:text-xl text-[#E60012]">
                      {formatPrice(
                        Math.min(
                          // ...selectedVehicle.variants.map((v) => v.price)
                          selectedVehicle?.base_price
                        )
                      )}
                    </p>
                  </div>
                </div>

                {/* Features & Colors in Two Columns */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {/* Features */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                        <span className="text-[#E60012]">⚡</span>
                        <span>{t("dashboard.cars.key")}</span>
                      </h4>

                      <button
                        className="flex items-center cursor-pointer bg-[#E60012] text-white px-4 py-2 rounded-lg hover:bg-[#c4000f] transition-colors"
                        onClick={() => setShowAddModalFeatures(true)}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {featuresLoading ? (
                        <Loading />
                      ) : featuresData.length ? (
                        featuresData.map(({ id, description }) => (
                          <div
                            key={id}
                            className="flex items-center justify-between sm:gap-3 text-xs sm:text-sm text-gray-700 bg-gray-50 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-[#E60012] flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs">✓</span>
                              </div>
                              <span>{description}</span>
                            </div>
                            <EditDelete
                              openDeleteModal={openDeleteModalFeatures}
                              setSelectedItemId={setSelectedItemIdFeatures}
                              id={id}
                              editBtn={editBtnFeatures}
                            />

                            <DeleteDialog
                              closeDeleteModal={closeDeleteModalFeatures}
                              isOpen={isDeleteModalFeatures}
                              selectedItemId={selectedItemIdFeatures}
                              deleteBtn={deleteBtnFeatures}
                            />
                          </div>
                        ))
                      ) : (
                        <Nodata />
                      )}
                    </div>
                  </div>

                  {/* Color Statistics */}
                  <div>
                    <h4 className="text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-[#E60012]">🎨</span>
                      {t("dashboard.cars.colors")}
                    </h4>
                    <div className="space-y-2">
                      {variantsColor.length ? (
                        // selectedVehicle.variants
                        //   .reduce((acc, variant) => {
                        //     const existing = acc.find(
                        //       (item) => item.color === variant.color
                        //     );
                        //     if (existing) {
                        //       existing.count += variant.stock;
                        //     } else {
                        //       acc.push({
                        //         color: variant.color,
                        //         colorHex: variant.colorHex,
                        //         count: variant.stock,
                        //       });
                        //     }
                        //     return acc;
                        //   }, [] as Array<{ color: string; colorHex: string; count: number }>)
                        variantsColor.map((colorStat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-3 border-white shadow-md ring-2 ring-gray-200"
                                style={{
                                  backgroundColor: colorStat.colorHex,
                                }}
                              ></div>
                              <span className="text-xs sm:text-sm text-gray-900">
                                {colorStat.color}
                              </span>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-lg text-sm ${
                                colorStat.stock > 1
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {colorStat.stock} {t("pcs")}
                            </span>
                          </div>
                        ))
                      ) : (
                        <Nodata />
                        // <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        //   <div className="flex items-center gap-2 sm:gap-3">
                        //     <div
                        //       className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-3 border-white shadow-md ring-2 ring-gray-200"
                        //       style={{
                        //         backgroundColor:
                        //           selectedVehicle?.brand_color_rgb,
                        //       }}
                        //     ></div>
                        //     <span className="text-xs sm:text-sm text-gray-900">
                        //       {selectedVehicle?.brand_color}
                        //     </span>
                        //   </div>
                        //   <span className="px-3 py-1 rounded-lg text-sm bg-yellow-100 text-yellow-700">
                        //     1 {t("pcs")}
                        //   </span>
                        // </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Variants Table */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-[#E60012]">📋</span>
                      {t("dashboard.cars.available")}
                    </h4>

                    <button
                      className="flex items-center cursor-pointer bg-[#E60012] text-white px-4 py-2 rounded-lg hover:bg-[#c4000f] transition-colors"
                      onClick={() => setShowAddModalVariants(true)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div
                    className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden bg-white"
                    style={{ maxWidth: "462px", overflow: "hidden" }}
                  >
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
                            <th className="text-right py-3 px-4 text-xs text-gray-600">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {loadingVariants ? (
                            <tr>
                              <td colSpan={7}>
                                <Loading />
                              </td>
                            </tr>
                          ) : (
                            <>
                              {variantsData.length ? (
                                variantsData.map((variant) => (
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
                                    <td className="py-3 px-4 text-right">
                                      <span
                                        className={`inline-block px-2 py-1 rounded-lg text-xs`}
                                      >
                                        <EditDelete
                                          id={variant.id}
                                          editBtn={editBtnVariants}
                                          openDeleteModal={
                                            openDeleteModalVariants
                                          }
                                          setSelectedItemId={
                                            setSelectedItemIdVariants
                                          }
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={7}>
                                    <Nodata />
                                  </td>
                                </tr>
                              )}
                            </>
                          )}
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
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {selected === null ? "Add" : "tahrirlash"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Model
                  </label>
                  <input
                    {...register("model")}
                    placeholder={t("customers.addClientObj.enterName")}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.model
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                  />
                  {errors.model && (
                    <p className="text-[#E60012]">{errors.model.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Asosiy narx
                  </label>
                  <input
                    {...register("base_price", { valueAsNumber: true })}
                    placeholder="base_price"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.base_price
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                    type="number"
                  />
                  {errors.base_price && (
                    <p className="text-[#E60012]">
                      {errors.base_price.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Jami mavjud
                  </label>
                  <input
                    {...register("total_available", { valueAsNumber: true })}
                    placeholder="total_available"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.base_price
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                    type="number"
                  />
                  {errors.total_available && (
                    <p className="text-[#E60012]">
                      {errors.total_available.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Brend Rangi
                  </label>

                  <Controller
                    name="brand_color"
                    control={control}
                    render={({ field }) => (
                      <>
                        <ColorSelect
                          colors={colors}
                          value={field.value ? field.value.toString() : ""}
                          onChange={field.onChange}
                          placeholder="Rang tanlang..."
                          errorsColor={!!errors.brand_color}
                        />
                        {errors.brand_color && (
                          <p className="text-[#E60012] text-sm mt-1">
                            {errors.brand_color.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    description_uz
                  </label>
                  <textarea
                    {...register("description_uz")}
                    placeholder="total_available"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                      ${
                        errors.model
                          ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                          : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                      }
                      `}
                  />
                  {errors.description_uz && (
                    <p className="text-[#E60012]">
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
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                      ${
                        errors.model
                          ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                          : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                      }`}
                  />
                  {errors.description_ru && (
                    <p className="text-[#E60012]">
                      {errors.description_ru.message}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Rasm yuklash {selected === null ? "*" : ""}
                  </label>

                  {previewImage && (
                    <div className="mb-3 relative inline-block w-full">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-lg border border-gray-300 w-full"
                      />
                      {watch("image") instanceof File && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <label className="flex-1 cursor-pointer">
                      <input
                        {...register("image")}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <div
                        className={`w-full px-4 py-3 border-2 border-dashed rounded-lg hover:border-[#E60012] transition-colors text-center
                        ${
                          errors.model
                            ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                            : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                        }
                        `}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600">
                            {previewImage
                              ? "Rasmni almashtirish"
                              : "Rasm yuklash"}
                          </span>
                          <span className="text-xs text-gray-500">
                            PNG, JPG, JPEG (max 10MB)
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {errors.image && (
                    <p className="text-[#E60012] text-sm mt-1">
                      {errors.image.message?.toString()}
                    </p>
                  )}

                  {selected !== null &&
                    previewImage &&
                    typeof watch("image") === "string" && (
                      <p className="text-gray-500 text-sm mt-1">
                        Rasmni almashtirmasangiz, mavjud rasm saqlanib qoladi
                      </p>
                    )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors"
                  disabled={uploadLoading}
                >
                  {uploadLoading ? "Yuklanmoqda..." : "Saqlash"}
                </button>
                <button
                  type="button"
                  disabled={uploadLoading}
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

      {showAddModalFeatures && (
        <Features
          open={showAddModalFeatures}
          onOpenChange={closeModalFeatures}
          handleSubmit={handleSubmitFeatures}
          onSubmit={onSubmitFeatures}
          register={registerFeatures}
          errors={errorsFeatures}
        />
      )}

      {showAddModalVariants && (
        <Variants
          // Modal
          open={showAddModalVariants}
          onOpenChange={closeModalVariants}
          // Form
          handleSubmit={handleSubmitVariants}
          onSubmit={onSubmitVariants}
          register={registerVariants}
          errors={errorsVariants}
          control={controlVariants}
          // setValue={setValueVariants}
          // watch={watchVariants}

          // ColorData
          colors={colors}
          selected={selectedVariants}
          carsSeries={carsSeries}
        />
      )}

      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        isOpen={isDeleteModal}
        selectedItemId={selectedItemId}
        deleteBtn={deleteBtn}
      />

      <DeleteDialog
        closeDeleteModal={closeDeleteModalVariants}
        isOpen={isDeleteModalVariants}
        selectedItemId={selectedItemIdVariants}
        deleteBtn={deleteBtnVariants}
      />
    </>
  );
};
export default Cars;
