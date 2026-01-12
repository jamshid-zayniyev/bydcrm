import {
  Wrench,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  Plus,
  X,
  Search,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import { useService } from "../hooks/useService";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import NoData from "../assets/no-data.svg";
import { useCustomers } from "../hooks/useCustomers";
import DeleteModal from "./ui/delete-modal";
import { useState } from "react";
import { PaginationDemo } from "./ui/paginationApi";
import {
  getStatusLabels,
  statusColors,
  statusIcons,
} from "@/hooks/useColorLabelsIcons";
import AddEditSelect from "@/hooks/addEditSelect";

export function Service() {
  const { t } = useTranslation();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [filterService, setFilterService] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const {
    loading,
    service,
    onSubmit,
    handleSubmit,
    register,
    errors,
    employees,
    setShowAddModal,
    closeModal,
    showAddModal,
    editBtn,
    selected,
    deleteBtn,
    closeDeleteModal,
    openDeleteModal,
    isDeleteModal,
    setActivePage,
    pgnCount,
    activePage,
    fetchService,
    serives,
    weeklyStatistic,
    reports,

    loadingPost,

    editFormSelect,
    loadingModel,
    variantSelect,

    carustomersList,
  } = useService();
  const { carsModels } = useCustomers();
  // const statusColors: Record<string, string> = {
  //   s: "bg-blue-100 text-blue-700 border-blue-200",
  //   i: "bg-yellow-100 text-yellow-700 border-yellow-200",
  //   c: "bg-green-100 text-green-700 border-green-200",
  // };

  // const statusLabels: Record<string, string> = {
  //   s: t("service.SCHEDULED"),
  //   i: t("service.IN_PROGRESS"),
  //   c: t("service.completed"),
  // };

  // const statusIcons: Record<string, any> = {
  //   s: Calendar,
  //   i: Clock,
  //   c: CheckCircle,
  // };
  const statusLabels: Record<string, string> = getStatusLabels(t);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">
          {t("service.serviceMaintenance")}
        </h2>
        <p className="text-gray-500 text-sm">{t("service.serviceRequest")}</p>
      </div>

      {/* Service Center Image */}
      <div className="relative h-40 rounded-xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1622021142947-da4298f0e037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCWUQlMjBhdXRvbW9iaWxlfGVufDF8fHx8MTc2MDE5NDgyMHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="BYD Service"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center px-6">
          <div>
            <h3 className="text-white mb-1">Профессиональный сервис BYD</h3>
            <p className="text-gray-200 text-sm">
              Качественное обслуживание вашего автомобиля
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-50 border-2 border-[#E60012] rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-[#E60012]" />
            </div>
            <p className="text-gray-500 text-sm">
              {t("service.total_request")}
            </p>
          </div>
          <p className="text-gray-900">{reports?.total_request}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 border-2 border-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-500 text-sm">{t("service.completed")}</p>
          </div>
          <p className="text-gray-900">{reports?.completed}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-50 border-2 border-yellow-600 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-gray-500 text-sm">
              {t("service.averageRating")}
            </p>
          </div>
          <p className="text-gray-900">{reports?.average_rating}/5</p>
        </div>
      </div>

      {/* Service Requests */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col gap-3 p-5 border-b border-gray-200">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-gray-900">{t("service.servicePush")}</h3>
            <button
              className="cursor-pointer  flex items-center gap-2 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors shadow-sm"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">{t("customers.addClient")}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t("service.search")}
                value={searchFilter}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchFilter(value);
                  fetchService(
                    1,
                    value,
                    filterStatus,
                    filterService,
                    filterDate
                  );
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
              />
            </div>
            <select
              className="w-[200px] px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
              onChange={(e) => {
                const value = e.target.value;

                setFilterStatus(value);
                fetchService(1, searchFilter, value, filterService, filterDate);
              }}
            >
              <option value="">{t("service.allStatus")}</option>
              <option value={"i"}>{t("service.IN_PROGRESS")}</option>
              <option value={"s"}>{t("service.SCHEDULED")}</option>
              <option value={"c"}>{t("service.completed")}</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
              onChange={(e) => {
                const value = e.target.value;
                setFilterService(value);
                fetchService(1, searchFilter, filterStatus, value, filterDate);
              }}
            >
              <option value="">{t("service.allServiceType")} </option>
              {serives.map((el) => (
                <option key={el?.id} value={el?.id}>
                  {el?.title}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
              onChange={(e) => {
                const value = e.target.value;
                setFilterDate(value);
                fetchService(
                  1,
                  searchFilter,
                  filterStatus,
                  filterService,
                  value
                );
              }}
            />
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="space-y-4 sm:space-y-6 mt-5">
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-[#E60012] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">{t("loading")}</p>
                </div>
              </div>
            </div>
          ) : service.length ? (
            <>
              {service.map((request) => {
                const StatusIcon = statusIcons[request.status];
                return (
                  <div
                    key={request.id}
                    className="p-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-red-50 border-2 border-[#E60012] rounded-full flex items-center justify-center">
                            <Wrench className="w-5 h-5 text-[#E60012]" />
                          </div>
                          <div>
                            <h4 className="text-gray-900">
                              {request.customer_id}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {request.vehicle}
                              {request.variants ? (
                                <>
                                  {" "}
                                  {"->"} {request.variants}
                                </>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 ml-13">
                          <span className="text-sm text-gray-700">
                            {/* {request.service_type === "s"
                              ? "Плановое ТО"
                              : "Диагностика"} */}
                            {request.service_type}
                          </span>
                          <span className="text-sm text-gray-500">
                            • {request.date}
                          </span>
                          <span className="text-sm text-gray-500">
                            • {t("service.technician")}: {request.technician}
                          </span>
                        </div>

                        {request.rate && (
                          <div className="flex items-center gap-1 mt-2 ml-13">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < request.rate!
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col flex-col lg:items-end items-center gap-3">
                        <div className="flex items-center gap-3">
                          <StatusIcon className="w-4 h-4 text-gray-400" />
                          <span
                            className={`px-3 py-1 rounded-lg text-sm border ${
                              statusColors[request.status]
                            }`}
                          >
                            {statusLabels[request.status]}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <img
                            src={Edit}
                            alt="no img"
                            onClick={() => {
                              editBtn(request.id);
                            }}
                          />
                          <img
                            src={Delete}
                            alt="no img"
                            onClick={() => {
                              openDeleteModal();
                              setSelectedItemId(request.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {pgnCount && pgnCount > 10 ? (
                <PaginationDemo
                  pgnCount={pgnCount}
                  fetchUsers={fetchService}
                  activePage={activePage}
                  setActivePage={setActivePage}
                  searchFilter={searchFilter}
                  filterStatus={filterStatus}
                  filterService={filterService}
                  filterDate={filterDate}
                />
              ) : (
                ""
              )}
            </>
          ) : (
            <div className="flex justify-center py-4">
              <div className="text-center">
                <img src={NoData} alt="no data" />
                <p className="text-gray-600 text-sm mt-0">{t("noData")}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 h-full bg-black/50 backdrop-blur">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {selected
                  ? `${t("customers.addClientObj.oneClient")}`
                  : `${t("customers.addClientObj.addNewClient")}`}
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
                {/* <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("service.customerName")}
                  </label>
                  <input
                    {...register("customer_name")}
                    placeholder={t("service.enterName")}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.customer_name
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                  />
                  {errors.customer_name && (
                    <p className="text-[#E60012]">
                      {errors.customer_name.message}
                    </p>
                  )}
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    customer_id
                  </label>
                  <select
                    {...register("customer_id")}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-red-500`}
                  >
                    {carustomersList.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("service.vehicle")}
                  </label>
                  <select
                    {...register("vehicle")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                    onChange={(e) => {
                      if (e.target.value) {
                        const selectedId = parseInt(e.target.value);
                        editFormSelect(selectedId);
                      }
                    }}
                  >
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
                    {t("service.serviceType")}
                  </label>
                  <select
                    {...register("service_type")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                  >
                    {serives.map((el) => (
                      <option key={el?.id} value={el?.id}>
                        {el?.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("service.status")}
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                  >
                    <option value={"i"}>{t("service.IN_PROGRESS")}</option>
                    <option value={"s"}>{t("service.SCHEDULED")}</option>
                    <option value={"c"}>{t("service.completed")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("service.technician")}
                  </label>
                  <select
                    {...register("technician")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                  >
                    {employees.length ? (
                      employees.map((el) => (
                        <option key={el?.id} value={el?.id}>
                          {el?.full_name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        {t("noInformation")}
                      </option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("service.date")}
                  </label>
                  <input
                    type="date"
                    {...register("date")}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("service.rate")}
                  </label>
                  <select
                    {...register("rate")}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.rate ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value={1}>⭐</option>
                    <option value={2}>⭐⭐</option>
                    <option value={3}>⭐⭐⭐</option>
                    <option value={4}>⭐⭐⭐⭐</option>
                    <option value={5}>⭐⭐⭐⭐⭐</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors"
                >
                  <AddEditSelect
                    selected={selected}
                    loading={loadingPost}
                    t={t}
                  />
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

      {/* Service Schedule */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-gray-900 mb-4">{t("service.writing")}</h3>
        <div className="space-y-3">
          {/* {[
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
          ].map((day, index) => {
            const count = Math.floor(Math.random() * 5) + 1;
            const percentage = (count / 5) * 100;
            return (
              <div key={day}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{day}</span>
                  <span className="text-sm text-gray-900">
                    {count} {t("service.records")}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#E60012] h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })} */}

          {weeklyStatistic.map(({ day, created, percent }, idx) => (
            // const count = Math.floor(Math.random() * 5) + 1;
            // const percentage = (count / 5) * 100;
            // return (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">
                  {day === "Monday"
                    ? t("service.Monday")
                    : day === "Tuesday"
                    ? t("service.Tuesday")
                    : day === "Wednesday"
                    ? t("service.Wednesday")
                    : day === "Thursday"
                    ? t("service.Thursday")
                    : day === "Friday"
                    ? t("service.Friday")
                    : day === "Saturday"
                    ? t("service.Saturday")
                    : t("service.dayOff")}
                </span>
                <span className="text-sm text-gray-900">
                  {created} {t("service.records")}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#E60012] h-2 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Feedback */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-6 rounded-xl shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white mb-2">Сбор отзывов</h3>
            <p className="text-sm text-white/90 mb-3">
              Автоматическая рассылка запросов на отзыв отправлена 2 клиентам
              после завершения обслуживания. 1 отзыв уже получен на Google
              Reviews.
            </p>
            <button className="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
              {t("service.viewReviews")}
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        isOpen={isDeleteModal}
        selectedItemId={selectedItemId}
        deleteBtn={deleteBtn}
      />
    </div>
  );
}
