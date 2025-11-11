import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Dashboard } from './Dashboard';
import { Customers } from './Customers';
import { CallCenter } from './CallCenter';
import { Sales } from './Sales';
import { Service } from './Service';
import { KPI } from './KPI';
import { AIRecommendations } from './AIRecommendations';
import { QRScanner } from './QRScanner';
import { Reviews } from './Reviews';
import { useAuthContext } from '../contexts/AuthContext';

export function MainApp() {
  const { user } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="absolute top-0 left-0 w-80 h-full transform transition-transform duration-300 ease-in-out">
            <Sidebar 
              userRole={user?.role} 
              isMobile={true}
              onClose={handleSidebarClose}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <Sidebar userRole={user?.role} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/calls" element={<CallCenter />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/service" element={<Service />} />
            <Route path="/kpi" element={<KPI />} />
            <Route path="/ai" element={<AIRecommendations />} />
            <Route path="/qr" element={<QRScanner />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}