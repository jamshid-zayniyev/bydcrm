import { useTranslation } from "react-i18next";

const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 sm:space-y-6 mt-5">
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#E60012] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">{t("loading")}</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
