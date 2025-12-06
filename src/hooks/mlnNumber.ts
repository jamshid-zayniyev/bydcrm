import { useTranslation } from "react-i18next";

export const formatPrice = (price: number | undefined) => {
  const { t } = useTranslation();

  if (price === undefined || price === null) {
    return `0 ${t("dashboard.cars.mln")}`;
  }

  return `${(price / 1000000).toFixed(0)} ${t("dashboard.cars.mln")}`;
};
