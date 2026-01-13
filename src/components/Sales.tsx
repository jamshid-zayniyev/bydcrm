import { TrendingUp, DollarSign, Calendar, User, Plus, X } from "lucide-react";
import { sales, customers } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import { useSales } from "../hooks/useSales";
import { useState } from "react";
import { useCustomers } from "@/hooks/useCustomers";
import { useService } from "@/hooks/useService";
import EditDelete from "./ui/edit-delete";
import DeleteModal from "./ui/delete-modal";

import { Controller } from "react-hook-form";
import { NameSelect } from "./ui/name-select";

export function Sales() {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const { t } = useTranslation();

  const {
    salesBanner,
    sales,
    salesStatistics,
    loading,
    error,

    // form
    register,
    errors,
    handleSubmit,
    onSubmit,

    // modal
    setShowAddModal,
    showAddModal,
    closeModal,

    // edit and delete
    editBtn,
    openDeleteModal,
    closeDeleteModal,
    isDeleteModal,
    deleteBtn,

    // selected
    selected,

    loadingPost,

    editFormSelect,
    loadingModel,
    variantSelect,

    control,
    carustomersList,
    getCustomersList,
  } = useSales();

  const { carsModels, customers } = useCustomers();
  const { employees } = useService();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statusColors: Record<string, string> = {
    cp: "bg-green-100 text-green-700 border-green-200",
    p: "bg-yellow-100 text-yellow-700 border-yellow-200",
    r: "bg-blue-100 text-blue-700 border-blue-200",
    cc: "bg-red-100 text-red-700 border-red-200",
  };

  // const statusLabels: Record<string, string> = {
  //   cp: "Завершена",
  //   p: "В обработке",
  //   cancelled: "Отменена",
  // };

  // const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
  // const completedSales = sales.filter((s) => s.status === "completed").length;
  // const avgSaleValue = Math.round(totalRevenue / sales.length);

  // const pipeline = [
  //   {
  //     stage: "Новые лиды",
  //     count: customers.filter((c) => c.status === "new").length,
  //     color: "blue",
  //   },
  //   {
  //     stage: "Связались",
  //     count: customers.filter((c) => c.status === "contacted").length,
  //     color: "purple",
  //   },
  //   {
  //     stage: "Квалифицированы",
  //     count: customers.filter((c) => c.status === "qualified").length,
  //     color: "green",
  //   },
  //   {
  //     stage: "Переговоры",
  //     count: customers.filter((c) => c.status === "negotiation").length,
  //     color: "yellow",
  //   },
  //   {
  //     stage: "Продажи",
  //     count: customers.filter((c) => c.status === "won").length,
  //     color: "red",
  //   },
  // ];

  // BYD Vehicles loading state

  if (loading) {
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
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">{t("sales.departmentSales")}</h2>
        <p className="text-gray-500 text-sm">{t("sales.transaction")}</p>
      </div>

      {/* Hero Image */}
      {salesBanner.map((el) => (
        <div className="relative h-48 rounded-xl overflow-hidden" key={el?.id}>
          <ImageWithFallback
            src={el?.image}
            alt={el?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E60012]/90 via-[#E60012]/60 to-transparent flex items-center px-8">
            <div>
              <h1 className="text-white mb-2">{el?.title}</h1>
              <p className="text-white/90 text-sm">{el?.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 border-2 border-green-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-500 text-sm">{t("sales.total_income")}</p>
          </div>
          <p className="text-gray-900">
            {formatAmount(+salesStatistics?.total_income)}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-50 border-2 border-[#E60012] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#E60012]" />
            </div>
            <p className="text-gray-500 text-sm">
              {t("sales.completed_trade")}
            </p>
          </div>
          <p className="text-gray-900">
            {salesStatistics?.completed_trade} {t("pcs")}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 border-2 border-black rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-black" />
            </div>
            <p className="text-gray-500 text-sm">{t("sales.average_check")}</p>
          </div>
          <p className="text-gray-900">
            {formatAmount(+salesStatistics?.average_check)}
          </p>
        </div>
      </div>

      {/* Sales List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-gray-900">{t("sales.latestTransactions")}</h3>
          <div
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#E60012] to-[#b00010] text-white rounded-lg text-xs sm:text-sm shadow-sm"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4" />
            {/* <span className="text-sm">{t("cars.carsObj")}</span> */}
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-50 border-2 border-[#E60012] rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#E60012]" />
                    </div>
                    <div>
                      <h4
                        className="text-gray-900"
                        style={{
                          width: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {sale.customer_name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {sale.car}

                        {sale.variants ? (
                          <>
                            {" "}
                            {"->"} {sale.variants}
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 ml-13">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {formatAmount(sale.price)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {sale.created_at.toString().split("T")[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {sale.sold_by}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm border ${
                      statusColors[sale.status]
                    }`}
                  >
                    {sale.status == "cp"
                      ? `${t("sales.COMPLETED")}`
                      : sale.status == "p"
                      ? `${t("sales.PENDING")}`
                      : sale.status == "r"
                      ? `${t("sales.REVISED")}`
                      : `${t("sales.CANCELLED")}`}
                  </span>
                  <EditDelete
                    id={sale.id}
                    editBtn={editBtn}
                    setSelectedItemId={setSelectedItemId}
                    openDeleteModal={openDeleteModal}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-[#E60012] to-[#b00010] p-6 rounded-xl shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white mb-2">🤖 ИИ Рекомендация</h3>
            <p className="text-sm text-white/90 mb-3">
              На основе анализа клиентов, рекомендуется сосредоточиться на лидах
              со статусом "Квалифицирован". Вероятность конверсии в продажу
              составляет 65% в течение следующих 7 дней.
            </p>
            <button className="px-4 py-2 bg-white text-[#E60012] rounded-lg hover:bg-gray-100 transition-colors text-sm">
              {t("sales.viewDetails")}
            </button>
          </div>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {selected === null ? t("cars.add") : t("cars.edit")}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("sales.customer")}
                  </label>
                  <Controller
                    name="customer_id"
                    control={control}
                    render={({ field }) => (
                      <>
                        <NameSelect
                          colors={carustomersList}
                          getCustomersList={getCustomersList}
                          value={field.value ? field.value.toString() : ""}
                          onChange={field.onChange}
                          placeholder={t("cars.customers")}
                          errorsColor={!!errors.customer_id}
                        />
                        {errors.customer_id && (
                          <p className="text-[#E60012] text-sm mt-1">
                            {errors.customer_id.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                  {/* <select
                    {...register("customer_id")}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-red-500 ${
                      errors.customer_id
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                  >
                    <option value="" disabled>
                      {t("sales.customerSelect")}
                    </option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.full_name}
                      </option>
                    ))}
                  </select>
                  {errors.customer_id && (
                    <p className="text-[#E60012]">
                      {errors.customer_id.message}
                    </p>
                  )} */}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("sales.car")}
                  </label>
                  <select
                    {...register("car")}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-red-500 ${
                      errors.car
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                    onChange={(e) => {
                      if (e.target.value) {
                        const selectedId = parseInt(e.target.value);
                        editFormSelect(selectedId);
                      }
                    }}
                  >
                    <option value="" disabled>
                      {t("sales.carSelect")}
                    </option>
                    {carsModels.length ? (
                      carsModels.map((el) => (
                        <option key={el?.id} value={el?.id}>
                          {el?.model}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        {t("noInformation")}
                      </option>
                    )}
                  </select>
                  {errors.car && (
                    <p className="text-[#E60012]">{errors.car.message}</p>
                  )}
                </div>

                {variantSelect[0]?.variants?.length ? (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      {t("test-drive.seria")}
                    </label>
                    <select
                      {...register("variants")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                    >
                      {loadingModel ? (
                        <option>{t("formLaoding")}</option>
                      ) : (
                        variantSelect[0]?.variants?.map((el) => (
                          <option key={el?.id} value={el?.id}>
                            {el?.series}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                ) : (
                  <></>
                )}

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("cars.price")}
                  </label>
                  <input
                    {...register("price")}
                    placeholder={t("cars.pricePlaceholder")}
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
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("service.status")}
                  </label>

                  <select
                    {...register("status")}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.price
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                  >
                    <option value="" disabled>
                      {t("sales.statusSelect")}
                    </option>
                    <option value={"cp"}>{t("sales.COMPLETED")}</option>
                    <option value={"p"}>{t("sales.PENDING")}</option>
                    <option value={"r"}>{t("sales.REVISED")}</option>
                    <option value={"cc"}>{t("sales.CANCELLED")}</option>
                  </select>
                  {errors.status && (
                    <p className="text-[#E60012]">{errors.status.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors"
                >
                  {selected === null
                    ? loadingPost
                      ? "Sotuv qo'shish..."
                      : "Sotuv qo'shish"
                    : loadingPost
                    ? "Sotuvni tahrirlash..."
                    : "Sotuvni tahrirlash"}
                </button>
                <button
                  disabled={loading}
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

      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        isOpen={isDeleteModal}
        selectedItemId={selectedItemId}
        deleteBtn={deleteBtn}
      />
    </div>
  );
}
