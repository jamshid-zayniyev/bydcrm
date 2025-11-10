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
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  userRole?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ userRole, isMobile = false, onClose }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Панель управления', icon: LayoutDashboard, roles: ['s', 'e'] },
    { id: 'customers', path: '/customers', label: 'Клиенты', icon: Users, roles: ['s', 'e'] },
    { id: 'calls', path: '/calls', label: 'Колл-центр', icon: Phone, roles: ['s', 'e'] },
    { id: 'sales', path: '/sales', label: 'Продажи', icon: TrendingUp, roles: ['s', 'e'] },
    { id: 'service', path: '/service', label: 'Сервис', icon: Wrench, roles: ['s', 'e'] },
    { id: 'kpi', path: '/kpi', label: 'KPI сотрудников', icon: Target, roles: ['s'] },
    { id: 'ai', path: '/ai', label: 'ИИ Рекомендации', icon: Brain, roles: ['s'] },
    { id: 'qr', path: '/qr', label: 'QR Регистрация', icon: QrCode, roles: ['s', 'e'] },
    { id: 'reviews', path: '/reviews', label: 'Отзывы', icon: Star, roles: ['s', 'e'] }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    userRole && item.roles.includes(userRole)
  );

  const getRoleName = (role: string) => {
    return role === 's' ? 'Super Admin' : 'Employee';
  };

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className={`h-full bg-black border-r border-gray-800 flex flex-col ${
      isMobile ? 'w-80' : ''
    }`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gradient-to-r from-[#E60012] to-[#b00010]">
          <div>
            <h1 className="text-white font-bold text-lg">BYD CRM</h1>
            <p className="text-red-100 text-sm">Автосалон Карши</p>
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
          <p className="text-red-100 text-sm mt-1">Автосалон Карши</p>
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
                  ? 'bg-[#E60012] text-white'
                  : 'text-gray-300 hover:bg-gray-900 hover:text-white'
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
          <p className="text-xs text-gray-400">Версия 1.0.0</p>
          <p className="text-xs text-gray-500 mt-1">© 2025 BYD Карши</p>
        </div>
      </div>
    </div>
  );
}