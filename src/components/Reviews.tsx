import { useState } from "react";
import {
  Star,
  MessageSquare,
  Send,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function Reviews() {
  const [autoSettings, setAutoSettings] = useState({
    afterSale: true,
    afterService: true,
    reminder: false,
  });
  const { t } = useTranslation();

  const reviews = [
    {
      id: "1",
      customer: "Шухрат Маликов",
      rating: 5,
      comment:
        "Отличный сервис! Очень доволен покупкой BYD Tang. Менеджер Малика была очень профессиональна.",
      date: "2025-10-10",
      platform: "Google",
      status: "published",
    },
    {
      id: "2",
      customer: "Рустам Абдуллаев",
      rating: 5,
      comment: "Прекрасный салон, внимательное обслуживание. Рекомендую!",
      date: "2025-10-09",
      platform: "Instagram",
      status: "published",
    },
    {
      id: "3",
      customer: "Гульнора Исмаилова",
      rating: 4,
      comment:
        "Хорошее обслуживание, но хотелось бы больше вариантов комплектации.",
      date: "2025-10-08",
      platform: "Google",
      status: "published",
    },
  ];

  const pendingRequests = [
    {
      customer: "Фарух Рахматов",
      requestDate: "2025-10-11",
      status: "pending",
    },
    { customer: "Лола Каримова", requestDate: "2025-10-10", status: "pending" },
  ];

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const fiveStarReviews = reviews.filter((r) => r.rating === 5).length;

  const handleSendReminder = (customer: string) => {
    alert(`Напоминание отправлено клиенту ${customer}`);
  };

  const handleMarkComplete = (customer: string) => {
    alert(`Запрос для ${customer} отмечен как выполненный`);
  };

  const toggleSetting = (setting: keyof typeof autoSettings) => {
    setAutoSettings({
      ...autoSettings,
      [setting]: !autoSettings[setting],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">{t("reviews.title")}</h2>
        <p className="text-gray-500 text-sm">{t("reviews.subtitle")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-50 border-2 border-yellow-600 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-gray-500 text-sm">
              {t("reviews.stats.averageRating.label")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-900">{avgRating.toFixed(1)}</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(avgRating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-50 border-2 border-[#E60012] rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#E60012]" />
            </div>
            <p className="text-gray-500 text-sm">
              {t("reviews.stats.totalReviews.label")}
            </p>
          </div>
          <p className="text-gray-900">{totalReviews}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 border-2 border-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-500 text-sm">
              {t("reviews.stats.fiveStars.label")}
            </p>
          </div>
          <p className="text-gray-900">
            {fiveStarReviews} (
            {Math.round((fiveStarReviews / totalReviews) * 100)}%)
          </p>
        </div>
      </div>

      {/* Pending Review Requests */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-gray-900">{t("reviews.pendingReviews.title")}</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {pendingRequests.map((request, index) => (
            <div key={index} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-gray-900 mb-1">{request.customer}</h4>
                  <p className="text-sm text-gray-500">
                    Запрос отправлен: {request.requestDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSendReminder(request.customer)}
                    className="px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors text-sm flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {t("reviews.pendingReviews.actions.sendReminder")}
                  </button>
                  <button
                    onClick={() => handleMarkComplete(request.customer)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {t("reviews.pendingReviews.actions.markCompleted")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-gray-900">
            {t("reviews.publishedReviews.title")}
          </h3>
          <button className="px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors text-sm shadow-sm">
            {t("reviews.publishedReviews.requestButton")}
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-gray-900">{review.customer}</h4>
                    <span
                      className={`px-2 py-1 rounded text-xs border ${
                        review.platform === "Google"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-pink-100 text-pink-700 border-pink-200"
                      }`}
                    >
                      {review.platform}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-[#E60012] transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto-request Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-gray-900">
            {t("reviews.autoMailSettings.title")}
          </h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <p className="text-sm text-gray-900">
                Запрос отзыва после продажи
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Через 3 дня после покупки
              </p>
            </div>
            <button
              onClick={() => toggleSetting("afterSale")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSettings.afterSale ? "bg-[#E60012]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoSettings.afterSale ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <p className="text-sm text-gray-900">
                Запрос отзыва после сервиса
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Сразу после завершения
              </p>
            </div>
            <button
              onClick={() => toggleSetting("afterService")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSettings.afterService ? "bg-[#E60012]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoSettings.afterService ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <p className="text-sm text-gray-900">Напоминание через неделю</p>
              <p className="text-xs text-gray-500 mt-1">
                Если клиент не оставил отзыв
              </p>
            </div>
            <button
              onClick={() => toggleSetting("reminder")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSettings.reminder ? "bg-[#E60012]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoSettings.reminder ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* BYD Brand Message */}
      <div className="bg-gradient-to-br from-[#E60012] to-[#b00010] p-6 rounded-xl shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white mb-2">Качество BYD - в каждом отзыве</h3>
            <p className="text-sm text-white/90">
              Мы ценим мнение каждого клиента. Ваши отзывы помогают нам
              становиться лучше и предоставлять превосходный сервис автомобилей
              BYD.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
