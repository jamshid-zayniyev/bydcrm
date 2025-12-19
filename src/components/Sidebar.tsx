import {
  LayoutDashboard,
  Users,
  Phone,
  TrendingUp,
  Wrench,
  Target,
  Brain,
  QrCode,
  Star,
  X,
  Car,
  Gauge, // Yangi icon qo'shildi
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  userRole?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ userRole, isMobile = false, onClose }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      path: "/dashboard",
      label: t("nav.dashboard"),
      icon: LayoutDashboard,
      roles: ["sa", "s", "m", "cc"],
    },
    {
      id: "customers",
      path: "/customers",
      label: t("nav.customers"),
      icon: Users,
      roles: ["sa", "s", "m", "cc", "t"],
    },
    {
      id: "cars",
      path: "/cars",
      label: t("nav.warehouse"),
      icon: Car,
      roles: ["sa", "s", "m", "cc"],
    },
    {
      id: "calls",
      path: "/calls",
      label: t("nav.calls"),
      icon: Phone,
      roles: ["sa", "m", "cc"],
    },
    {
      id: "sales",
      path: "/sales",
      label: t("nav.sales"),
      icon: TrendingUp,
      roles: ["sa", "s", "m"],
    },
    {
      id: "service",
      path: "/service",
      label: t("nav.service"),
      icon: Wrench,
      roles: ["sa", "m", "cc", "t"],
    },
    {
      id: "test-drive",
      path: "/test-drive",
      label: t("nav.testDrive"),
      icon: Gauge,
      roles: ["sa", "s", "m", "cc"],
    },
    {
      id: "kpi",
      path: "/kpi",
      label: t("nav.kpi"),
      icon: Target,
      roles: ["sa"],
    },
    {
      id: "ai",
      path: "/ai",
      label: t("nav.ai"),
      icon: Brain,
      roles: ["sa"],
    },
    {
      id: "qr",
      path: "/qr",
      label: t("nav.qr"),
      icon: QrCode,
      roles: ["sa", "m"],
    },
    {
      id: "reviews",
      path: "/reviews",
      label: t("nav.reviews"),
      icon: Star,
      roles: ["sa", "m"],
    },
  ];

  // ... qolgan kod o'zgarmadi
  const filteredMenuItems = menuItems.filter(
    (item) => userRole && item.roles.includes(userRole)
  );

  const getRoleName = (role: string) => {
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

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`h-full bg-black border-r border-gray-800 flex flex-col ${
        isMobile ? "w-80" : ""
      }`}
    >
      {/* Mobile Header */}
      {isMobile && (
        <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gradient-to-r from-[#E60012] to-[#b00010]">
          <div>
            <h1 className="text-white font-bold text-lg">BYD CRM</h1>
            <p className="text-red-100 text-sm">{t("nav.carDealership")}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-black/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-[#E60012] to-[#b00010]">
          <h1 className="text-white font-bold text-lg">BYD CRM</h1>
          <p className="text-red-100 text-sm mt-1">{t("nav.carDealership")}</p>
          {userRole && (
            <div className="mt-2">
              <span className="inline-block px-2 py-1 bg-black/20 rounded text-xs text-white">
                {getRoleName(userRole)}
              </span>
            </div>
          )}
        </div>
      )}

      <nav className="flex-1 p-4 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={handleLinkClick}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-[#E60012] text-white"
                  : "text-gray-300 hover:bg-gray-900 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="px-4 py-3 bg-gray-900 rounded-lg">
          <p className="text-xs text-gray-400">{t("nav.version")}</p>
          <p className="text-xs text-gray-500 mt-1">
            © 2025 BYD {t("nav.city")}
          </p>
        </div>
      </div>
    </div>
  );
}
