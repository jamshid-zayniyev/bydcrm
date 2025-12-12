import { Mail, Phone, Plus, Search, TrendingUp, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useTranslation } from "react-i18next";
import { useTestDrive } from "@/hooks/useTestDrive";
import { useCustomers } from "@/hooks/useCustomers";
import Loading from "./ui/loading";
import NoData from "../assets/no-data.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import EditDelete from "./ui/edit-delete";
import DeleteModal from "./ui/delete-modal";
import { useState } from "react";
import { PaginationDemo } from "./ui/paginationApi";
import { PgntTestDrive } from "./ui/pgntTestDrive";
import { count } from "console";

const TestDrive = () => {
  const { t } = useTranslation();
  const [tabsValue, setTabsValue] = useState<string>("p");
  const [searchFilter, setSearchFilter] = useState("");

  const {
    // form-validation
    handleSubmit,
    onSubmit,
    register,
    errors,

    // modal
    closeModal,
    showAddModal,
    setShowAddModal,

    loading,

    selected,

    // customersList-data
    carustomersList,
    employees,
    editForm,
    customersId,
    testDrive,

    // edit-delete
    editBtn,
    closeDeleteModal,
    openDeleteModal,
    isDeleteModal,
    setSelectedItemId,
    selectedItemId,
    deleteBtn,

    getTestDrive,

    loadingDrive,

    // pagination
    pgnCount,
    activePage,
    setActivePage,
  } = useTestDrive(tabsValue);

  const { carsModels } = useCustomers();

  // Formatlash funksiyasi
  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return "";

    // Faqat raqamlarni olish
    const cleaned = phone.replace(/\D/g, "");

    // +998 formatiga qarab formatlash
    if (cleaned.startsWith("998")) {
      const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
      if (match) {
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
      }
    }

    // Agar boshqa formatda bo'lsa
    return phone;
  };

  const statusColors: Record<string, string> = {
    p: "bg-blue-100 text-blue-700 border-blue-200",
    pl: "bg-purple-100 text-purple-700 border-purple-200",
    c: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">
            {t("customers.clientManagement")}
          </h2>
          <p className="text-gray-500 text-sm">
            {t("customers.totalClients")}: {pgnCount}
          </p>
        </div>
        <button
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors shadow-sm"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">{t("customers.addClient")}</span>
        </button>
      </div>
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-3">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`${t("test-drive.filter")}`}
            value={searchFilter}
            onChange={(e) => {
              const value = e.target.value;
              setSearchFilter(value);
              getTestDrive(tabsValue, value, 1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
          />
        </div>
      </div>

      <Tabs
        className="mt-3"
        onValueChange={(value: string) => {
          getTestDrive(value, searchFilter, 1);
          setTabsValue(value);
        }}
        defaultValue="p"
      >
        <TabsList
          className="grid w-full"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          <TabsTrigger value="p">Jarayonda</TabsTrigger>
          <TabsTrigger value="pl">Rejalashtirilgan</TabsTrigger>
          <TabsTrigger value="c">Tugallangan</TabsTrigger>
        </TabsList>
        <TabsContent value="p" className="space-y-4">
          {loading ? (
            <div className="space-y-4 sm:space-y-6 mt-5">
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-[#E60012] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">{t("loading")}</p>
                </div>
              </div>
            </div>
          ) : testDrive.length ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {testDrive.map((customer) => (
                  <div
                    key={customer.id}
                    className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                    // onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-gray-900">
                              {customer.full_name}
                            </h3>
                          </div>
                          <EditDelete
                            id={customer.id}
                            editBtn={editBtn}
                            openDeleteModal={openDeleteModal}
                            setSelectedItemId={setSelectedItemId}
                          />
                          {/* <div className="flex gap-3">
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
                          </div> */}
                        </div>
                        {customer.status ? (
                          <span
                            className={`inline-block px-3 py-1 rounded-lg text-xs border ${
                              statusColors[customer.status]
                            }`}
                          >
                            {customer.status === "p"
                              ? "Jarayonda"
                              : customer.status === "pl"
                              ? "Rejalashtirilgan"
                              : "Tugallangan"}
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 rounded-lg text-xs border bg-primary text-primary-foreground">
                            {t("noInformation")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      {customer.phone_number ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-[#E60012]" />
                          <span>{customer.phone_number}</span>
                        </div>
                      ) : null}

                      {customer.email ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-[#E60012]" />
                          <span>{customer.email}</span>
                        </div>
                      ) : null}
                      {customer.car ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4 text-[#E60012]" />
                          <span>{customer.car}</span>
                        </div>
                      ) : null}
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs">
                        {customer.employee_name ? (
                          <span className="text-gray-500">
                            {t("customers.manager")}: {customer.employee_name}
                          </span>
                        ) : null}

                        {/* {customer.created_at && (
                          <span className="text-gray-500">
                            {t("customers.contact")}:{" "}
                            {customer.created_at.split("T")[0]}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pgnCount && pgnCount > 10 ? (
                <PgntTestDrive
                  pgnCount={pgnCount}
                  fetchUsers={getTestDrive}
                  activePage={activePage}
                  setActivePage={setActivePage}
                  searchFilter={searchFilter}
                  filterStatus={tabsValue}
                  filterService=""
                  filterDate=""
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
        </TabsContent>
        <TabsContent value="pl" className="space-y-4">
          {loading ? (
            <div className="space-y-4 sm:space-y-6 mt-5">
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-[#E60012] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">{t("loading")}</p>
                </div>
              </div>
            </div>
          ) : testDrive.length ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {testDrive.map((customer) => (
                  <div
                    key={customer.id}
                    className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                    // onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-gray-900">
                              {customer.full_name}
                            </h3>
                          </div>
                          <EditDelete
                            id={customer.id}
                            editBtn={editBtn}
                            openDeleteModal={openDeleteModal}
                            setSelectedItemId={setSelectedItemId}
                          />
                          {/* <div className="flex gap-3">
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
                          </div> */}
                        </div>
                        {customer.status ? (
                          <span
                            className={`inline-block px-3 py-1 rounded-lg text-xs border ${
                              statusColors[customer.status]
                            }`}
                          >
                            {customer.status === "p"
                              ? "Jarayonda"
                              : customer.status === "pl"
                              ? "Rejalashtirilgan"
                              : "Tugallangan"}
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 rounded-lg text-xs border bg-primary text-primary-foreground">
                            {t("noInformation")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      {customer.phone_number ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-[#E60012]" />
                          <span>{customer.phone_number}</span>
                        </div>
                      ) : null}

                      {customer.email ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-[#E60012]" />
                          <span>{customer.email}</span>
                        </div>
                      ) : null}
                      {customer.car ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4 text-[#E60012]" />
                          <span>{customer.car}</span>
                        </div>
                      ) : null}
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs">
                        {customer.employee_name ? (
                          <span className="text-gray-500">
                            {t("customers.manager")}: {customer.employee_name}
                          </span>
                        ) : null}

                        {/* {customer.created_at && (
                          <span className="text-gray-500">
                            {t("customers.contact")}:{" "}
                            {customer.created_at.split("T")[0]}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {pgnCount && pgnCount > 10 ? (
                <PgntTestDrive
                  pgnCount={pgnCount}
                  fetchUsers={getTestDrive}
                  activePage={activePage}
                  setActivePage={setActivePage}
                  searchFilter={searchFilter}
                  filterStatus={tabsValue}
                  filterService=""
                  filterDate=""
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
        </TabsContent>
        <TabsContent value="c" className="space-y-4">
          {loading ? (
            <div className="space-y-4 sm:space-y-6 mt-5">
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-[#E60012] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">{t("loading")}</p>
                </div>
              </div>
            </div>
          ) : testDrive.length ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {testDrive.map((customer) => (
                  <div
                    key={customer.id}
                    className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                    // onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-gray-900">
                              {customer.full_name}
                            </h3>
                          </div>
                          <EditDelete
                            id={customer.id}
                            editBtn={editBtn}
                            openDeleteModal={openDeleteModal}
                            setSelectedItemId={setSelectedItemId}
                          />
                          {/* <div className="flex gap-3">
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
                          </div> */}
                        </div>
                        {customer.status ? (
                          <span
                            className={`inline-block px-3 py-1 rounded-lg text-xs border ${
                              statusColors[customer.status]
                            }`}
                          >
                            {customer.status === "p"
                              ? "Jarayonda"
                              : customer.status === "pl"
                              ? "Rejalashtirilgan"
                              : "Tugallangan"}
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 rounded-lg text-xs border bg-primary text-primary-foreground">
                            {t("noInformation")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      {customer.phone_number ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-[#E60012]" />
                          <span>{customer.phone_number}</span>
                        </div>
                      ) : null}

                      {customer.email ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-[#E60012]" />
                          <span>{customer.email}</span>
                        </div>
                      ) : null}
                      {customer.car ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4 text-[#E60012]" />
                          <span>{customer.car}</span>
                        </div>
                      ) : null}
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs">
                        {customer.employee_name ? (
                          <span className="text-gray-500">
                            {t("customers.manager")}: {customer.employee_name}
                          </span>
                        ) : null}

                        {/* {customer.created_at && (
                          <span className="text-gray-500">
                            {t("customers.contact")}:{" "}
                            {customer.created_at.split("T")[0]}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {pgnCount && pgnCount > 10 ? (
                <PgntTestDrive
                  pgnCount={pgnCount}
                  fetchUsers={getTestDrive}
                  activePage={activePage}
                  setActivePage={setActivePage}
                  searchFilter={searchFilter}
                  filterStatus={tabsValue}
                  filterService=""
                  filterDate=""
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
        </TabsContent>
      </Tabs>

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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    customer
                  </label>
                  <select
                    {...register("customer")}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]  ${
                      errors.customer
                        ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                        : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                    }`}
                    onChange={(e) => {
                      if (e.target.value) {
                        const selectedId = parseInt(e.target.value);
                        editForm(selectedId);
                      }
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Seriyani tanlang...
                    </option>
                    {carustomersList.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.full_name}
                      </option>
                    ))}
                  </select>
                  {errors.customer && (
                    <p className="text-[#E60012]">{errors.customer.message}</p>
                  )}
                </div>

                {customersId?.phone_number && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("customers.addClientObj.phone")}
                    </label>
                    <input
                      type="text"
                      value={
                        loadingDrive
                          ? t("formLaoding")
                          : formatPhoneNumber(customersId?.phone_number || "")
                      }
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                      style={{ height: "39px" }}
                    />
                  </div>
                )}

                {customersId?.interested_in && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("customers.addClientObj.interestedModel")}
                    </label>
                    <select
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                      style={{ height: "39px" }}
                    >
                      {loadingDrive ? (
                        <option>{t("formLaoding")}</option>
                      ) : (
                        carsModels
                          .filter(
                            (car) => car.id === customersId?.interested_in
                          )
                          .map((car) => (
                            <option
                              key={car.id}
                              value={customersId?.interested_in}
                            >
                              {car.model}
                            </option>
                          ))
                      )}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                    style={{ height: "39px" }}
                  />
                  {errors.email && (
                    <p className="text-[#E60012]">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Employees
                  </label>
                  <select
                    {...register("employee")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                    style={{ height: "39px" }}
                  >
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                    style={{ height: "39px" }}
                  >
                    <option value={"p"}>PENDING</option>
                    <option value={"pl"}>PLANNED</option>
                    <option value={"c"}>COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors"
                >
                  {loading
                    ? `...${t("customers.addClientObj.addClient")}`
                    : `${t("customers.addClientObj.addClient")}`}
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
};

export default TestDrive;
