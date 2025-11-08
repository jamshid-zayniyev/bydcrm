import { Wrench, Calendar, Star, CheckCircle, Clock } from "lucide-react";
import { serviceRequests } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";

export function Service() {
  const { t } = useTranslation();
  const statusColors: Record<string, string> = {
    scheduled: "bg-blue-100 text-blue-700 border-blue-200",
    "in-progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
    completed: "bg-green-100 text-green-700 border-green-200",
  };

  const statusLabels: Record<string, string> = {
    scheduled: "Запланировано",
    "in-progress": "В работе",
    completed: "Завершено",
  };

  const statusIcons: Record<string, any> = {
    scheduled: Calendar,
    "in-progress": Clock,
    completed: CheckCircle,
  };

  const totalRequests = serviceRequests.length;
  const completedRequests = serviceRequests.filter(
    (r) => r.status === "completed"
  ).length;
  const avgRating =
    serviceRequests
      .filter((r) => r.rating)
      .reduce((sum, r) => sum + (r.rating || 0), 0) /
    serviceRequests.filter((r) => r.rating).length;

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
            <p className="text-gray-500 text-sm">Всего запросов</p>
          </div>
          <p className="text-gray-900">{totalRequests}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 border-2 border-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-500 text-sm">Завершено</p>
          </div>
          <p className="text-gray-900">{completedRequests}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-50 border-2 border-yellow-600 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-gray-500 text-sm">Средняя оценка</p>
          </div>
          <p className="text-gray-900">{avgRating.toFixed(1)}/5</p>
        </div>
      </div>

      {/* Service Requests */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-gray-900">{t("service.servicePush")}</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {serviceRequests.map((request) => {
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
                          {request.customerName}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {request.vehicle}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 ml-13">
                      <span className="text-sm text-gray-700">
                        {request.serviceType}
                      </span>
                      <span className="text-sm text-gray-500">
                        • {request.date}
                      </span>
                      <span className="text-sm text-gray-500">
                        • Техник: {request.technician}
                      </span>
                    </div>

                    {request.rating && (
                      <div className="flex items-center gap-1 mt-2 ml-13">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < request.rating!
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusIcon className="w-4 h-4 text-gray-400" />
                    <span
                      className={`px-3 py-1 rounded-lg text-sm border ${
                        statusColors[request.status]
                      }`}
                    >
                      {statusLabels[request.status]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Schedule */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-gray-900 mb-4">{t("service.writing")}</h3>
        <div className="space-y-3">
          {[
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
          })}
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
    </div>
  );
}
