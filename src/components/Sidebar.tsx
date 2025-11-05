import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  TrendingUp, 
  Wrench, 
  Target,
  Brain,
  QrCode,
  Star
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ currentView, onViewChange, isMobile, onClose }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Панель управления', icon: LayoutDashboard },
    { id: 'customers', label: 'Клиенты', icon: Users },
    { id: 'calls', label: 'Колл-центр', icon: Phone },
    { id: 'sales', label: 'Продажи', icon: TrendingUp },
    { id: 'service', label: 'Сервис', icon: Wrench },
    { id: 'kpi', label: 'KPI сотрудников', icon: Target },
    { id: 'ai', label: 'ИИ Рекомендации', icon: Brain },
    { id: 'qr', label: 'QR Регистрация', icon: QrCode },
    { id: 'reviews', label: 'Отзывы', icon: Star }
  ];

  const handleClick = (id: string) => {
    onViewChange(id);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full bg-black border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-[#E60012] to-[#b00010]">
        <h1 className="text-white">BYD CRM</h1>
        <p className="text-red-100 text-sm mt-1">Автосалон Карши</p>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                currentView === item.id
                  ? 'bg-[#E60012] text-white'
                  : 'text-gray-300 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
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