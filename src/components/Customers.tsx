import { useCallback, useEffect, useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Phone,
  MapPin,
  TrendingUp,
  X,
  Brain,
} from "lucide-react";

import { useTranslation } from "react-i18next";
import { useCustomers } from "../hooks/useCustomers";
import type { Customers } from "../api/customers";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import NoData from "../assets/no-data.svg";

import DeleteModal from "./ui/delete-modal";
import { PaginationDemo } from "./ui/paginationApi";
import AddEditSelect from "@/hooks/addEditSelect";
import { formatDate } from "@/hooks/dateMonthYear";
import Loading from "./ui/loading";

export function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customers | null>(
    null
  );
  const { t } = useTranslation();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchData, setSearchData] = useState("");

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    trigger,
    onSubmit,
    setShowAddModal,
    showAddModal,
    editBtn,
    selected,
    closeDeleteModal,
    openDeleteModal,
    isDeleteModal,
    deleteBtn,
    customers: allCustomers,
    loading,
    closeModal,
    carsModels,
    activePage,
    usersStatus,
    pgnCount,
    fetchUsers,
    setActivePage,
    editFormSelect,
    loadingModel,
    variantSelect,
    district,

    analytic,
    totayStats,
    totalLoading,
  } = useCustomers();

  const formatPhoneNumber = useCallback((value: string): string => {
    // Remove all non-digit characters except +
    const numbers = value.replace(/[^\d+]/g, "");

    // If starts with +998, format accordingly
    if (numbers.startsWith("+998")) {
      const digits = numbers.slice(4); // Remove +998

      if (digits.length <= 2) {
        return `+998 ${digits}`;
      } else if (digits.length <= 5) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 8) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5
        )}`;
      } else {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5,
          7
        )} ${digits.slice(7, 9)}`;
      }
    } else if (numbers.startsWith("998")) {
      const digits = numbers.slice(3); // Remove 998

      if (digits.length <= 2) {
        return `+998 ${digits}`;
      } else if (digits.length <= 5) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 8) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5
        )}`;
      } else {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5,
          7
        )} ${digits.slice(7, 9)}`;
      }
    } else {
      // For other cases, just return the numbers with +
      return `+${numbers.replace(/\D/g, "")}`;
    }
  }, []);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatPhoneNumber(e.target.value);
      setValue("phone_number", formattedValue, { shouldValidate: true });
    },
    [formatPhoneNumber, setValue]
  );

  const handlePhoneBlur = useCallback(() => {
    trigger("phone_number");
  }, [trigger]);

  const statusColors: Record<string, string> = {
    1: "bg-blue-100 text-blue-700 border-blue-200",
    2: "bg-purple-100 text-purple-700 border-purple-200",
    3: "bg-green-100 text-green-700 border-green-200",
    4: "bg-yellow-100 text-yellow-700 border-yellow-200",
    5: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 align-center justify-center gap-4">
          <div>
            <h2 className="text-gray-900 mb-1">
              {t("customers.clientManagement")}
            </h2>
            <p className="text-gray-500 text-sm">
              {t("customers.totalClients")}: {pgnCount}
            </p>
          </div>

          <div>
            <h2 className="text-gray-900 mb-1">
              {t("customers.totalDay")}:{" "}
              {totalLoading ? t("loadingCount") : totayStats?.total_customers}
            </h2>
            <p className="text-gray-500 text-sm">
              {totalLoading
                ? t("loading")
                : totayStats?.statuses.map((el) => (
                    <span key={el.status_id}>
                      {el?.status_name}: {el?.count}{" "}
                    </span>
                  ))}
            </p>
          </div>

          <div>
            <h2 className="text-gray-900 mb-1">
              {t("customers.totalTopModel")}
            </h2>
            <p className="text-gray-500 text-sm">
              {loading ? (
                t("loading")
              ) : (
                <>
                  {analytic?.model_name}: {analytic?.requests_count}
                </>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors shadow-sm"
          style={{ height: "36px" }}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">{t("customers.addClient")}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t("customers.search")}
              value={searchFilter}
              onChange={(e) => {
                const value = e.target.value;
                setSearchFilter(value);
                fetchUsers(1, value, filterStatus, searchData);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              // onChange={(e) => setFilterStatus(e.target.value)}
              onChange={(e) => {
                const value = e.target.value;
                setFilterStatus(value);
                fetchUsers(1, searchFilter, value, searchData);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
            >
              <option value="all">
                {t("customers.addClientObj.statusFilter")}
              </option>
              {usersStatus.map((el) => (
                <option key={el?.id} value={el?.id}>
                  {el?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
              type="date"
              value={searchData}
              onChange={(e) => {
                const value = e.target.value;
                setSearchData(value);
                fetchUsers(1, searchFilter, filterStatus, value);
              }}
            />
          </div>
        </div>
      </div>

      {/* Customer List */}
      {loading ? (
        <div className="space-y-4 sm:space-y-6 mt-5">
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-[#E60012] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">{t("loading")}</p>
            </div>
          </div>
        </div>
      ) : allCustomers.length ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedCustomer(customer)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className="text-gray-900"
                          style={{
                            width: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {customer.full_name}
                        </h3>
                      </div>
                      <div className="flex gap-3">
                        <img
                          src={Edit}
                          alt={customer.full_name}
                          onClick={(e) => {
                            e.stopPropagation();
                            editBtn(customer.id);
                          }}
                        />
                        <img
                          src={Delete}
                          alt={customer.full_name}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal();
                            setSelectedItemId(customer.id);
                          }}
                        />
                      </div>
                    </div>

                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-xs border ${
                        statusColors[customer.status]
                      }`}
                    >
                      {customer.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-[#E60012]" />
                    <span>{customer.phone_number}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#E60012]" />
                    <span>{customer.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 text-[#E60012]" />
                    <span>
                      {customer.interested_in}
                      {customer.variants ? (
                        <>
                          {" "}
                          {"->"} {customer.variants}
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {t("customers.manager")}: {customer.assigned_to}
                    </span>

                    {customer.date_joined && (
                      <span className="text-gray-500">
                        {/* {customer.created_at.split("T")[0]} */}
                        {formatDate(customer.date_joined)}{" "}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {pgnCount && pgnCount > 10 ? (
            <PaginationDemo
              pgnCount={pgnCount}
              fetchUsers={fetchUsers}
              activePage={activePage}
              setActivePage={setActivePage}
              searchFilter={searchFilter}
              filterStatus={filterStatus}
              filterService=""
              filterDate={searchData}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="flex justify-center">
          <div className="text-center">
            <img src={NoData} alt="no data" />
            <p className="text-gray-600 text-sm">{t("noData")}</p>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur">
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
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.clientName")}
                  </label>
                  <input
                    {...register("full_name")}
                    placeholder={t("customers.addClientObj.enterName")}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.full_name
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                  />
                  {errors.full_name && (
                    <p className="text-[#E60012]">{errors.full_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.phone")}
                  </label>
                  <input
                    {...register("phone_number")}
                    placeholder="+998 XX XXX XX XX"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.full_name
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                  />
                  {errors.phone_number && (
                    <p className="text-[#E60012]">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.source")}
                  </label>
                  <select
                    {...register("source")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                  >
                    <option value={"o"}>
                      {t("customers.addClientObj.sourceObj.online")}
                    </option>
                    <option value={"p"}>
                      {t("customers.addClientObj.sourceObj.phone")}
                    </option>
                    <option value={"v"}>
                      {t("customers.addClientObj.sourceObj.visit")}
                    </option>
                    <option value={"r"}>
                      {t("customers.addClientObj.sourceObj.recommendation")}
                    </option>
                  </select>
                  {errors.source && (
                    <p className="text-[#E60012]">{errors.source.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.interestedModel")}
                  </label>
                  <select
                    {...register("interested_in")}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.interested_in
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                    // className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                    onChange={(e) => {
                      if (e.target.value) {
                        const selectedId = parseInt(e.target.value);
                        editFormSelect(selectedId);
                      }
                    }}
                  >
                    <option value="" disabled>
                      {t("customers.modelLabel")}
                    </option>
                    {carsModels.map((el) => (
                      <option key={el?.id} value={el?.id}>
                        {el?.model}
                      </option>
                    ))}
                  </select>
                  {errors.interested_in && (
                    <p className="text-[#E60012]">
                      {errors.interested_in.message}
                    </p>
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
                    {t("customers.addClientObj.status")}
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                  >
                    {usersStatus.length ? (
                      usersStatus.map((el) => (
                        <option key={el?.id} value={el?.id}>
                          {el?.title}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        {t("noInformation")}
                      </option>
                    )}
                  </select>
                  {errors.status && (
                    <p className="text-[#E60012]">{errors.status.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.location")}
                  </label>
                  <select
                    {...register("location")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                  >
                    <option value="1">Qarshi</option>
                    {/* {usersStatus.length ? (
                      usersStatus.map((el) => (
                        <option key={el?.id} value={el?.id}>
                          {el?.title}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        {t("noInformation")}
                      </option>
                    )} */}
                  </select>
                  {errors.location && (
                    <p className="text-[#E60012]">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.customerLabel")}
                  </label>
                  <select
                    {...register("district")}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.district
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                  >
                    <option value="" disabled>
                      {t("customers.customerSelect")}
                    </option>
                    {district.map((el) => (
                      <option key={el?.id} value={el?.id}>
                        {el?.title}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="text-[#E60012]">{errors.district.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.dateLabel")}
                  </label>
                  <input
                    {...register("date_joined")}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.date_joined
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                    type="date"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  {t("customers.addClientObj.notes")}
                </label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder={t("customers.addClientObj.additionalInfo")}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.full_name
                      ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                      : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                  }`}
                ></textarea>
                {errors.notes && (
                  <p className="text-[#E60012]">{errors.notes.message}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors"
                >
                  <AddEditSelect selected={selected} loading={loading} t={t} />
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

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2
                    className="text-gray-900 mb-2"
                    style={{
                      width: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {selectedCustomer.full_name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-gray-900 mb-3">
                  {t("customers.person.contactInfo")}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#E60012]" />
                    <span className="text-gray-700">
                      {selectedCustomer.phone_number}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#E60012]" />
                    <span className="text-gray-700">
                      {selectedCustomer.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-gray-900 mb-3">
                  {t("customers.person.leadDetails")}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {t("customers.person.source")}
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedCustomer.source === "o"
                        ? t("customers.addClientObj.sourceObj.online")
                        : selectedCustomer.source === "p"
                        ? t("customers.addClientObj.sourceObj.phone")
                        : selectedCustomer.source === "w"
                        ? t("customers.addClientObj.sourceObj.visit")
                        : t("customers.addClientObj.sourceObj.recommendation")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {t("customers.person.interested")}
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedCustomer.interested_in}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {t("customers.person.manager")}
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedCustomer.assigned_to}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {t("customers.person.createdDate")}
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedCustomer.created_at.split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>

              {selectedCustomer.notes && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-gray-900 mb-2">
                    {t("customers.person.notes")}
                  </h3>
                  <p
                    className="text-sm text-gray-600"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    {selectedCustomer.notes}
                  </p>
                </div>
              )}

              {selectedCustomer?.ai_recommendation?.text && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="lucide lucide-map-pin w-5 h-5 text-[#E60012]" />
                    <h3 className="text-gray-900">
                      {t("customers.AI.AI_note")}
                    </h3>
                  </div>

                  <p
                    className="text-sm text-gray-600"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    {selectedCustomer?.ai_recommendation?.text}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors text-sm">
                  {t("customers.person.call")}
                </button>
              </div>
            </div>
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
