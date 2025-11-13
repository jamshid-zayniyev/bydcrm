import { Bell, Menu, User, ChevronDown, Globe, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

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
    return role === "s" ? "Super Admin" : "Employee";
  };

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
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
                  <p className="font-medium text-gray-900">{user?.full_name}</p>
                  <p className="text-sm text-gray-500">@{user?.username}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user?.role === "s"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {getRoleName(user?.role || "e")}
                    </span>
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
    </header>
  );
}
