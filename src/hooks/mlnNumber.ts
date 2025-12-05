import { useTranslation } from "react-i18next";

export const formatPrice = (price: number) => {
  const { t } = useTranslation();

  return `${(price / 1000000).toFixed(0)} ${t("dashboard.cars.mln")}`;
};
