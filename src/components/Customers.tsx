import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  X,
} from "lucide-react";
import { customers } from "../data/mockData";
import { Customer } from "../types";
import { useTranslation } from "react-i18next";

export function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const { t } = useTranslation();

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesStatus =
      filterStatus === "all" || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700 border-blue-200",
    contacted: "bg-purple-100 text-purple-700 border-purple-200",
    qualified: "bg-green-100 text-green-700 border-green-200",
    negotiation: "bg-yellow-100 text-yellow-700 border-yellow-200",
    won: "bg-emerald-100 text-emerald-700 border-emerald-200",
    lost: "bg-red-100 text-red-700 border-red-200",
  };

  const statusLabels: Record<string, string> = {
    new: "Новый",
    contacted: "Связались",
    qualified: "Квалифицирован",
    negotiation: "Переговоры",
    won: "Продажа",
    lost: "Отклонен",
  };

  const sentimentIcons: Record<string, string> = {
    positive: "😊",
    neutral: "😐",
    negative: "😟",
  };

  const handleAddCustomer = () => {
    setShowAddModal(false);
    // In real app, would add customer to database
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">
            {t("customers.clientManagement")}
          </h2>
          <p className="text-gray-500 text-sm">
            {t("customers.totalClients")} {customers.length}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors shadow-sm"
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E60012] focus:border-transparent"
            >
              <option value="all">{t("customers.statusFilters.all")}</option>
              <option value="new">{t("customers.statusFilters.new")}</option>
              <option value="contacted">
                {t("customers.statusFilters.contacted")}
              </option>
              <option value="qualified">
                {t("customers.statusFilters.qualified")}
              </option>
              <option value="negotiation">
                {t("customers.statusFilters.negotiation")}
              </option>
              <option value="won">{t("customers.statusFilters.won")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedCustomer(customer)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-gray-900">{customer.name}</h3>
                  {customer.sentiment && (
                    <span className="text-lg">
                      {sentimentIcons[customer.sentiment]}
                    </span>
                  )}
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-lg text-xs border ${
                    statusColors[customer.status]
                  }`}
                >
                  {statusLabels[customer.status]}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-[#E60012]" />
                <span>{customer.phone}</span>
              </div>
              {customer.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-[#E60012]" />
                  <span>{customer.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[#E60012]" />
                <span>{customer.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 text-[#E60012]" />
                <span>{customer.interestedIn}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  {t("customers.manager")}: {customer.assignedTo}
                </span>
                {customer.lastContact && (
                  <span className="text-gray-500">
                    {t("customers.contact")}: {customer.lastContact}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {t("customers.addClientObj.addNewClient")}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.clientName")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("customers.addClientObj.enterName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.phone")}
                  </label>
                  <input
                    type="tel"
                    placeholder="+998 XX XXX XX XX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.emailOptional")}
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.source")}
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]">
                    <option>
                      {t("customers.addClientObj.sourceObj.online")}
                    </option>
                    <option>
                      {t("customers.addClientObj.sourceObj.phone")}
                    </option>
                    <option>
                      {t("customers.addClientObj.sourceObj.visit")}
                    </option>
                    <option>
                      {t("customers.addClientObj.sourceObj.recommendation")}
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.interestedModel")}
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]">
                    <option>BYD Song Plus</option>
                    <option>BYD Han</option>
                    <option>BYD Tang</option>
                    <option>BYD Atto 3</option>
                    <option>BYD Seal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {t("customers.addClientObj.status")}
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]">
                    <option>{t("customers.addClientObj.statusObj.new")}</option>
                    <option>
                      {t("customers.addClientObj.statusObj.connected")}
                    </option>
                    <option>
                      {t("customers.addClientObj.statusObj.qualified")}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  {t("customers.addClientObj.notes")}
                </label>
                <textarea
                  rows={3}
                  placeholder={t("customers.addClientObj.additionalInfo")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60012]"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddCustomer}
                  className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors"
                >
                  {t("customers.addClientObj.addClient")}
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t("customers.addClientObj.cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-gray-900 mb-2">
                    {selectedCustomer.name}
                  </h2>
                  <span
                    className={`inline-block px-3 py-1 rounded-lg text-sm border ${
                      statusColors[selectedCustomer.status]
                    }`}
                  >
                    {statusLabels[selectedCustomer.status]}
                  </span>
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
                      {selectedCustomer.phone}
                    </span>
                  </div>
                  {selectedCustomer.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#E60012]" />
                      <span className="text-gray-700">
                        {selectedCustomer.email}
                      </span>
                    </div>
                  )}
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
                      {selectedCustomer.source}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {t("customers.person.interested")}
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedCustomer.interestedIn}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {t("customers.person.manager")}
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedCustomer.assignedTo}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      {t("customers.person.createdDate")}
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedCustomer.createdAt}
                    </p>
                  </div>
                </div>
              </div>

              {selectedCustomer.notes && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-gray-900 mb-2">
                    {t("customers.person.notes")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedCustomer.notes}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors text-sm">
                  {t("customers.person.call")}
                </button>
                <button className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                  {t("customers.person.sendEmail")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
