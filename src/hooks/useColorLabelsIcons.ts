import { Calendar, CheckCircle, Clock } from "lucide-react";

export const statusColors: Record<string, string> = {
  s: "bg-blue-100 text-blue-700 border-blue-200",
  i: "bg-yellow-100 text-yellow-700 border-yellow-200",
  c: "bg-green-100 text-green-700 border-green-200",
};

// export const statusLabels: Record<string, string> = {
//   s: t("service.SCHEDULED"),
//   i: t("service.IN_PROGRESS"),
//   c: t("service.completed"),
// };
export const getStatusLabels = (t: any) => ({
  s: t("service.SCHEDULED"),
  i: t("service.IN_PROGRESS"),
  c: t("service.completed"),
});

export const statusIcons: Record<string, any> = {
  s: Calendar,
  i: Clock,
  c: CheckCircle,
};
