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
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
  userRole?: string;
}

export function Sidebar({ isMobile, onClose, userRole }: SidebarProps) {
  const { t } = useTranslation();

  const menuItems = [
    {
      path: "/dashboard",
      label: t("nav.dashboard"),
      icon: LayoutDashboard,
      roles: ["superadmin", "reception"],
    },
    {
      path: "/customers",
      label: t("nav.customers"),
      icon: Users,
      roles: ["superadmin", "reception"],
    },
    {
      path: "/calls",
      label: t("nav.calls"),
      icon: Phone,
      roles: ["superadmin", "reception"],
    },
    {
      path: "/sales",
      label: t("nav.sales"),
      icon: TrendingUp,
      roles: ["superadmin", "reception"],
    },
    {
      path: "/service",
      label: t("nav.service"),
      icon: Wrench,
      roles: ["superadmin", "reception"],
    },
    {
      path: "/kpi",
      label: t("nav.kpi"),
      icon: Target,
      roles: ["superadmin"],
    },
    { path: "/ai", label: t("nav.ai"), icon: Brain, roles: ["superadmin"] },
    {
      path: "/qr",
      label: t("nav.qr"),
      icon: QrCode,
      roles: ["superadmin", "reception"],
    },
    {
      path: "/reviews",
      label: t("nav.reviews"),
      icon: Star,
      roles: ["superadmin", "reception"],
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => userRole && item.roles.includes(userRole)
  );

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full bg-black border-r border-gray-800 flex flex-col">
      {/* Logo section */}
      <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-[#E60012] to-[#b00010]">
        <h1 className="text-white font-semibold text-lg">BYD CRM</h1>
        <p className="text-red-100 text-sm mt-1">{t("nav.carDealership")}</p>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? "bg-[#E60012] text-white"
                    : "text-gray-300 hover:bg-gray-900 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer section */}
      <div className="p-4 border-t border-gray-800">
        <div className="px-4 py-3 bg-gray-900 rounded-lg">
          <p className="text-xs text-gray-400 capitalize">{userRole}</p>
          <p className="text-xs text-gray-400 mt-1">{t("nav.version")}</p>
          <p className="text-xs text-gray-500 mt-1">
            © 2025 BYD {t("nav.city")}
          </p>
        </div>
      </div>
    </div>
  );
}
