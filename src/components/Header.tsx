import { Bell, Menu, User, ChevronDown, Globe } from 'lucide-react';
import { currentUser } from '../data/mockData';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log('Current language:', i18n.language); // Debug uchun

  const changeLanguage = (lng: string) => {
    console.log('Changing language to:', lng); // Debug uchun
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  const getCurrentLanguageName = () => {
    return i18n.language === 'ru' ? 'РУ' : 'UZ';
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <h2 className="text-gray-900 font-medium">{t('welcome')}, {currentUser.name}</h2>
              <p className="text-sm text-gray-500">{currentUser.department}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 min-w-[100px] justify-between"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">
                  {getCurrentLanguageName()}
                </span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isLanguageOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {/* Dropdown Menu */}
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Tilni tanlang
                </div>
                
                <button
                  onClick={() => changeLanguage('ru')}
                  className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                    i18n.language === 'ru' 
                      ? 'bg-red-50 text-[#E60012]' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      i18n.language === 'ru' ? 'bg-[#E60012]' : 'bg-gray-300'
                    }`}></div>
                    <span className="font-medium">Русский</span>
                  </div>
                  <span className="text-sm text-gray-400 font-mono">РУ</span>
                </button>
                
                <button
                  onClick={() => changeLanguage('uz')}
                  className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                    i18n.language === 'uz' 
                      ? 'bg-red-50 text-[#E60012]' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      i18n.language === 'uz' ? 'bg-[#E60012]' : 'bg-gray-300'
                    }`}></div>
                    <span className="font-medium">O'zbekcha</span>
                  </div>
                  <span className="text-sm text-gray-400 font-mono">UZ</span>
                </button>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E60012] rounded-full"></span>
          </button>
          
          {/* User Profile */}
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