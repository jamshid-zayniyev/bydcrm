import { TrendingUp, DollarSign, Calendar, User } from "lucide-react";
import { sales, customers } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";

export function Sales() {
  const { t } = useTranslation();
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    completed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  const statusLabels: Record<string, string> = {
    pending: "В обработке",
    completed: "Завершена",
    cancelled: "Отменена",
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const completedSales = sales.filter((s) => s.status === "completed").length;
  const avgSaleValue = Math.round(totalRevenue / sales.length);

  const pipeline = [
    {
      stage: "Новые лиды",
      count: customers.filter((c) => c.status === "new").length,
      color: "blue",
    },
    {
      stage: "Связались",
      count: customers.filter((c) => c.status === "contacted").length,
      color: "purple",
    },
    {
      stage: "Квалифицированы",
      count: customers.filter((c) => c.status === "qualified").length,
      color: "green",
    },
    {
      stage: "Переговоры",
      count: customers.filter((c) => c.status === "negotiation").length,
      color: "yellow",
    },
    {
      stage: "Продажи",
      count: customers.filter((c) => c.status === "won").length,
      color: "red",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">{t("sales.departmentSales")}</h2>
        <p className="text-gray-500 text-sm">{t("sales.transaction")}</p>
      </div>

      {/* Hero Image */}
      <div className="relative h-48 rounded-xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCWUQlMjBlbGVjdHJpYyUyMFNVVnxlbnwxfHx8fDE3NjAxOTQ4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="BYD Electric SUV"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#E60012]/90 via-[#E60012]/60 to-transparent flex items-center px-8">
          <div>
            <h1 className="text-white mb-2">BYD - Электрическое будущее</h1>
            <p className="text-white/90 text-sm">Инновации в каждой детали</p>
          </div>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 border-2 border-green-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-500 text-sm">Общая выручка</p>
          </div>
          <p className="text-gray-900">{formatAmount(totalRevenue)}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-50 border-2 border-[#E60012] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#E60012]" />
            </div>
            <p className="text-gray-500 text-sm">Завершенных продаж</p>
          </div>
          <p className="text-gray-900">{completedSales}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 border-2 border-black rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-black" />
            </div>
            <p className="text-gray-500 text-sm">Средний чек</p>
          </div>
          <p className="text-gray-900">{formatAmount(avgSaleValue)}</p>
        </div>
      </div>

      {/* Sales List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-gray-900">{t("sales.latestTransactions")}</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-50 border-2 border-[#E60012] rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#E60012]" />
                    </div>
                    <div>
                      <h4 className="text-gray-900">{sale.customerName}</h4>
                      <p className="text-sm text-gray-500">{sale.vehicle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 ml-13">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {formatAmount(sale.amount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{sale.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {sale.salesPerson}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-lg text-sm border ${
                    statusColors[sale.status]
                  }`}
                >
                  {statusLabels[sale.status]}
                </span>
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
    </div>
  );
}
