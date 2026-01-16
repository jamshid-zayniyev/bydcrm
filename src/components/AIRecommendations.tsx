import { useState } from "react";
import {
  Brain,
  TrendingUp,
  Target,
  Phone,
  DollarSign,
  Check,
  X,
  Headset,
  Gauge,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import useAiRecommendations from "@/hooks/useAiRecommendations";
import Loading from "./ui/loading";

export function AIRecommendations() {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const { t } = useTranslation();

  const {
    aiRecommendation,
    loading,
    getAiRecommendation,
    effectiveness,
    activeRecommendation,
  } = useAiRecommendations();

  const typeIcons: Record<string, any> = {
    ls: Target,
    u: TrendingUp,
    sq: DollarSign,
    cq: Headset,
    ot: Phone,
    td: Gauge,
  };
  const priorityColors: Record<string, string> = {
    ls: "bg-green-100 text-green-700 border-green-200",
    sq: "bg-orange-100 text-orange-700 border-orange-200",
    cq: "bg-pink-100 text-pink-700 border-pink-200",
    u: "bg-red-100 text-red-700 border-red-200",
    ot: "bg-purple-100 text-purple-700 border-purple-200",
    td: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const typeColors: Record<string, string> = {
    l: "text-blue-600 border-blue-200",
    m: "text-yellow-600 border-yellow-200",
    h: "text-green-600 border-green-200",
  };
  const typeColorsTest: Record<string, string> = {
    l: "bg-blue-100 text-blue-600 border-blue-200",
    m: "bg-yellow-100 text-yellow-600 border-yellow-200",
    h: "bg-green-100 text-green-600 border-green-200",
  };

  const typeLabels: Record<string, string> = {
    ls: "Оценка лида",
    sq: "Стратегия продаж",
    cq: "Качество звонка",
    u: "Доп. продажи",
    ot: "Оптимальное время",
    td: "Рекомендация по тест-драйву",
  };

  const priorityLabels: Record<string, string> = {
    h: "Высокий",
    m: "Средний",
    l: "Низкий",
  };

  const items = [
    t("ai.aiFunctions.titleAnalaz"),
    t("ai.aiFunctions.titlePrognoz"),
    t("ai.aiFunctions.titleOptimiztion"),
    t("ai.aiFunctions.titleRecomation"),
    t("ai.aiFunctions.titleOshenka"),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">{t("ai.title")}</h2>
        <p className="text-gray-500 text-sm">{t("ai.subtitle")}</p>
      </div>

      {/* AI Overview */}
      <div className="bg-gradient-to-br from-[#E60012] to-[#b00010] text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2">{t("ai.heading")}</h3>
            <p className="text-sm text-red-100 mb-4">{t("ai.description")}</p>
            {loading ? (
              <div className="space-y-4 sm:space-y-6 mt-5">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-red-100">
                    {t("ai.aiWork.analyses")}
                  </p>
                  <p className="text-white mt-1">
                    {aiRecommendation?.daily_analyses}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-red-100">
                    {t("ai.aiWork.forecasts")}
                  </p>
                  <p className="text-white mt-1">
                    {aiRecommendation?.forecast_accuracy}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-red-100">
                    {t("ai.aiWork.active")}
                  </p>
                  <p className="text-white mt-1">
                    {aiRecommendation?.active_recommendations}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-red-100">
                    {t("ai.aiWork.aiConversion")}
                  </p>
                  <p className="text-white mt-1">
                    {aiRecommendation?.conversion_growth}%
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {loading ? (
          <Loading />
        ) : (
          getAiRecommendation?.map((recommendation) => {
            const Icon = typeIcons[recommendation.type];
            const typeColor = typeColors[recommendation.label];
            const iconColor = priorityColors[recommendation.type];
            return (
              <div
                key={recommendation.id}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className={`p-4 border-l-4 ${typeColor}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border-2 ${iconColor}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-gray-900">
                            {recommendation?.full_name}
                          </h3>

                          <span
                            className={`px-2 py-1 rounded-lg text-xs border ${
                              typeColorsTest[recommendation.label]
                            }`}
                          >
                            {priorityLabels[recommendation.label]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {recommendation?.payload?.recommendation}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs">
                          <span className="text-gray-500">
                            {t("ai.person.type")}:{" "}
                            <span className="text-gray-700">
                              {typeLabels[recommendation?.type]}
                            </span>
                          </span>
                          <span className="text-gray-500">
                            {t("ai.person.client")}:{" "}
                            <span className="text-gray-700">
                              {recommendation?.full_name}
                            </span>
                          </span>

                          <span className="text-gray-500">
                            {t("ai.person.reliability")}:{" "}
                            <span className="text-gray-700">
                              {recommendation?.payload?.probability}%
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="w-16 h-16 relative">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                            fill="none"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#E60012"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${
                              (recommendation?.payload?.probability / 100) * 176
                            } 176`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-gray-900">
                            {recommendation?.payload?.probability}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        activeRecommendation(recommendation.id, true)
                      }
                      className="cursor-pointer px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors text-sm flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      {t("ai.person.apply")}
                    </button>

                    <button
                      onClick={() =>
                        activeRecommendation(recommendation.id, false)
                      }
                      className="cursor-pointer px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      {t("ai.person.reject")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 mb-3">{t("ai.aiFunctions.title")}</h3>
          <ul className="space-y-2">
            <ul className="space-y-2">
              {items.map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-[#E60012]">✓</span>
                  <span className="text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 mb-3">
            {t("ai.effectivenessStats.title")}
          </h3>
          {loading ? (
            <Loading />
          ) : (
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {t("ai.effectivenessStats.acceptance_rate")}
                  </span>
                  <span className="text-sm text-gray-900">
                    {effectiveness?.acceptance_rate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#E60012] h-2 rounded-full transition-all"
                    style={{ width: `${effectiveness?.acceptance_rate}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {t("ai.effectivenessStats.conversion_rate")}
                  </span>
                  <span className="text-sm text-gray-900">
                    {effectiveness?.conversion_rate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all"
                    style={{ width: `${effectiveness?.conversion_rate}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {t("ai.effectivenessStats.prediction_accuracy")}
                  </span>
                  <span className="text-sm text-gray-900">
                    {effectiveness?.prediction_accuracy}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${effectiveness?.prediction_accuracy}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
