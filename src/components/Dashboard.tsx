import { useState, useEffect } from "react";
import {
  Users,
  Phone,
  TrendingUp,
  Star,
  ArrowUp,
  ArrowDown,
  Car,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { customers, calls, sales, kpiData } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useTranslation } from "react-i18next";
import { useCars } from "../hooks/useCars";
import { Car as CarType } from "../api/cars";

type DataItem = {
  name: string;
  value: number;
  color?: string;
};

export function Dashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState<CarType | null>(null);
  const { t } = useTranslation();
  const {
    cars: bydVehicles,
    weekStatistics,
    monthStatistics,
    dayStatistics,
    pieChart,
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

  const stats = [
    {
      label: t("dashboard.clients"),
      value: customers.length,
      change: "+12%",
      isPositive: true,
      icon: Users,
      color: "red",
    },
    {
      label: t("dashboard.callsToday"),
      value: calls.length,
      change: "+8%",
      isPositive: true,
      icon: Phone,
      color: "black",
    },
    {
      label: t("dashboard.sales"),
      value: sales.length,
      change: "+24%",
      isPositive: true,
      icon: TrendingUp,
      color: "red",
    },
    {
      label: t("dashboard.star"),
      value: "4.6",
      change: "+0.3",
      isPositive: true,
      icon: Star,
      color: "black",
    },
  ];

  const salesData = monthStatistics;

  const callsData = weekStatistics;

  const dailySalesData = dayStatistics;

  console.log(pieChart);

  const colors: Record<string, string> = {
    Онлайн: "#E60012",
    Телефон: "#000000",
    Визит: "#6b7280",
    Рекомендации: "#ef4444",
  };

  const leadSourceData: DataItem[] = pieChart.map((item) => ({
    ...item,
    color: colors[item.name],
  }));

  console.log(leadSourceData);

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
              <p className="text-gray-600 text-sm">Mashinalar yuklanmoqda...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero Section with Image */}
      <div className="relative h-32 sm:h-40 md:h-48 rounded-lg sm:rounded-xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1727098353953-929512ce7b90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCWUQlMjBlbGVjdHJpYyUyMGNhcnxlbnwxfHx8fDE3NjAxOTAyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="BYD Electric Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
          <div className="h-full flex flex-col justify-center px-4 sm:px-6 md:px-8">
            <h1 className="text-white mb-1 sm:mb-2 text-lg sm:text-xl md:text-2xl">
              {t("dashboard.controlPanel")}
            </h1>
            <p className="text-gray-200 text-xs sm:text-sm">
              {t("dashboard.crmSystem")}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            red: "bg-red-50 text-[#E60012] border-[#E60012]",
            black: "bg-gray-100 text-black border-black",
          }[stat.color];

          return (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center border-2 ${colorClasses}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs sm:text-sm ${
                    stat.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.isPositive ? (
                    <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="hidden sm:inline">{stat.change}</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mb-1">
                {stat.label}
              </p>
              <p className="text-gray-900 text-lg sm:text-xl">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Sales Analytics - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">
            {t("dashboard.salesMonth")}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sales" fill="#E60012" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Sales Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">
            {t("dashboard.salesDay")}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sales" fill="#000000" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Calls Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">
            {t("dashboard.callsMonth")}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={callsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#E60012"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Sources */}
        <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">
            {t("dashboard.clientSources")}
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={leadSourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {leadSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {leadSourceData.map((source, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                ></div>
                <span className="text-xs text-gray-600">
                  {source.name}: {source.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">
          {t("dashboard.best.title")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {kpiData
            .filter((emp) => emp.salesClosed)
            .sort((a, b) => (b.salesClosed || 0) - (a.salesClosed || 0))
            .slice(0, 6)
            .map((employee, index) => (
              <div
                key={employee.employeeId}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0
                        ? "bg-[#E60012] text-white"
                        : index === 1
                        ? "bg-gray-800 text-white"
                        : index === 2
                        ? "bg-gray-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      {employee.employeeName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {employee.department}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">
                    {employee.salesClosed} {t("dashboard.best.sales")}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-gray-600">
                      {employee.customerSatisfaction?.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* BYD Models Section - API dan ma'lumotlar bilan */}
      <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <h3 className="text-gray-900 text-base sm:text-lg">
              {t("dashboard.warehouse.title")}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {bydVehicles.length} {t("dashboard.warehouse.model")} •{" "}
              {bydVehicles.reduce(
                (sum, v) => sum + v.total_available,

                0
              )}{" "}
              {t("dashboard.warehouse.cars")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 sm:w-5 sm:h-5 text-[#E60012]" />
            <div className="px-3 py-1 bg-gradient-to-r from-[#E60012] to-[#b00010] text-white rounded-lg text-xs sm:text-sm shadow-sm">
              {t("dashboard.warehouse.warehouseUpdated")}
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
    </div>
  );
}
