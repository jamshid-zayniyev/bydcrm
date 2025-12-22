import { Bell, Menu, User, ChevronDown, Globe, LogOut, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useCallback } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Edit, NoUser } from "@/assets";
import { useHeader } from "@/hooks/useHeader";
import Loading from "./ui/loading";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuthContext();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);

    // Til o'zgartirganda sahifani refresh qilish
    setTimeout(() => {
      window.location.reload();
    }, 300); // Kichik kechikish bilan animatsiya ko'rinishi uchun
  };

  const getCurrentLanguageName = () => {
    return i18n.language === "ru" ? "РУ" : "UZ";
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const getRoleName = (role: string) => {
    // return role === "sa" ? "Super Admin" : "Employee";
    return role === "sa"
      ? "Super Admin"
      : role === "s"
      ? "Seller"
      : role === "m"
      ? "Manager"
      : role === "t"
      ? "Technician"
      : "Call-Center";
  };
  const {
    closeModal,
    setShowAddModal,
    showAddModal,
    onSubmit,
    handleSubmit,
    errors,
    register,
    watch,
    setValue,
    trigger,
    editBtn,
    previewImage,
    loading,
    handleAvatarChange,
    fileInputRef,
    getUpload,
  } = useHeader();

  console.log(getUpload);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPhoneNumber = useCallback((value: string): string => {
    // Remove all non-digit characters except +
    const numbers = value.replace(/[^\d+]/g, "");

    // If starts with +998, format accordingly
    if (numbers.startsWith("+998")) {
      const digits = numbers.slice(4); // Remove +998

      if (digits.length <= 2) {
        return `+998 ${digits}`;
      } else if (digits.length <= 5) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 8) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5
        )}`;
      } else {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5,
          7
        )} ${digits.slice(7, 9)}`;
      }
    } else if (numbers.startsWith("998")) {
      const digits = numbers.slice(3); // Remove 998

      if (digits.length <= 2) {
        return `+998 ${digits}`;
      } else if (digits.length <= 5) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 8) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5
        )}`;
      } else {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5,
          7
        )} ${digits.slice(7, 9)}`;
      }
    } else {
      // For other cases, just return the numbers with +
      return `+${numbers.replace(/\D/g, "")}`;
    }
  }, []);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatPhoneNumber(e.target.value);
      setValue("phone_number", formattedValue, { shouldValidate: true });
    },
    [formatPhoneNumber, setValue]
  );

  const handlePhoneBlur = useCallback(() => {
    trigger("phone_number");
  }, [trigger]);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button - Faqat mobile uchun */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E60012] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BYD</span>
            </div>
            <div className="hidden sm:block">
              <h2 className="text-gray-900 font-medium">
                {t("welcome")}, {user?.full_name}
              </h2>
              <p className="text-sm text-gray-500">
                {getRoleName(user?.role || "e")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector - Mobile da kichraytirilgan */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 min-w-[80px] sm:min-w-[100px] justify-between"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700 text-sm sm:text-base">
                  {getCurrentLanguageName()}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isLanguageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("selectLanguage")}
                </div>

                <button
                  onClick={() => changeLanguage("ru")}
                  className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                    i18n.language === "ru"
                      ? "bg-red-50 text-[#E60012]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        i18n.language === "ru" ? "bg-[#E60012]" : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="font-medium">Русский</span>
                  </div>
                  <span className="text-sm text-gray-400 font-mono pl-3">
                    РУ
                  </span>
                </button>

                <button
                  onClick={() => changeLanguage("uz")}
                  className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                    i18n.language === "uz"
                      ? "bg-red-50 text-[#E60012]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        i18n.language === "uz" ? "bg-[#E60012]" : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="font-medium">O'zbekcha</span>
                  </div>
                  <span className="text-sm text-gray-400 font-mono pl-3">
                    UZ
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E60012] rounded-full"></span>
          </button>

          {/* User Profile - Mobile da soddalashtirilgan */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 sm:gap-3 pl-3 border-l border-gray-200"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-[#E60012] to-[#b00010] rounded-full flex items-center justify-center">
                {getUpload?.avatar ? (
                  <img
                    className="object-cover border border-gray-300 rounded-full"
                    src={getUpload?.avatar}
                    alt={getUpload?.first_name}
                  />
                ) : (
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                )}
              </div>
              {/* Mobile da faqat icon, desktop da icon + chevron */}
              <ChevronDown
                className={`hidden sm:block w-4 h-4 text-gray-400 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-medium text-gray-900">
                    {getUpload?.first_name} {getUpload?.last_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    @{getUpload?.username}
                  </p>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user?.role === "s"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {getRoleName(user?.role || "e")}
                    </span>
                    <img
                      className="cursor-pointer"
                      src={Edit}
                      alt="no img?"
                      onClick={() => {
                        setShowAddModal(true);
                        editBtn();
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t("logout")}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile User Info - Faqat mobile uchun */}
      <div className="lg:hidden mt-3 sm:hidden">
        <h2 className="text-gray-900 font-medium text-sm">
          {t("welcome")}, {user?.full_name}
        </h2>
        <p className="text-xs text-gray-500">
          {getRoleName(user?.role || "e")}
        </p>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">
                {/* {t("customers.addClientObj.oneClient")} */}
              </h2>
              <button
                onClick={closeModal}
                className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        {t("header.first_name")}
                      </label>
                      <input
                        {...register("first_name")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.first_name
                            ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                            : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                        }`}
                      />
                      {errors.first_name && (
                        <p className="text-[#E60012]">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        {t("header.last_name")}
                      </label>
                      <input
                        {...register("last_name")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.last_name
                            ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                            : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                        }`}
                      />
                      {errors.last_name && (
                        <p className="text-[#E60012]">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        {t("header.phone")}
                      </label>
                      <input
                        {...register("phone_number")}
                        placeholder="+998 XX XXX XX XX"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.phone_number
                            ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                            : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                        }`}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                      />
                      {errors.phone_number && (
                        <p className="text-[#E60012]">
                          {errors.phone_number.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        {t("header.username")}
                      </label>
                      <input
                        {...register("username")}
                        placeholder={t("customers.addClientObj.enterName")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.username
                            ? "border-[#E60012] focus:ring-[#E60012] focus:border-[#E60012]"
                            : "border-gray-300 focus:ring-[#E60012] focus:border-transparent"
                        }`}
                      />
                      {errors.username && (
                        <p className="text-[#E60012]">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div style={{ margin: "0 auto" }}>
                      <img
                        src={previewImage ? previewImage : NoUser}
                        alt="Preview"
                        className="w-40 h-40 object-cover border border-gray-300 rounded-full mx-auto"
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer mt-2 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {t("header.imageUpload")}
                      </button>
                      {errors.avatar && (
                        <p className="text-[#E60012] text-center mt-1">
                          {typeof errors.avatar.message === "string"
                            ? errors.avatar.message
                            : t("header.imageFile")}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer flex-1 px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors"
                >
                  {loading
                    ? `...${t("customers.addClientObj.addClient")}`
                    : `${t("customers.addClientObj.addClient")}`}
                </button>
                <button
                  disabled={loading}
                  onClick={closeModal}
                  className="cursor-pointer flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t("customers.addClientObj.cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
