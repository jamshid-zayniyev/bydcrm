import { Bell, Menu, User } from 'lucide-react';
import { currentUser } from '../data/mockData';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E60012] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">BYD</span>
            </div>
            <div>
              <h2 className="text-gray-900">Добро пожаловать, {currentUser.name}</h2>
              <p className="text-sm text-gray-500">{currentUser.department}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#E60012] rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="w-9 h-9 bg-gradient-to-br from-[#E60012] to-[#b00010] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}