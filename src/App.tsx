import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Customers } from './components/Customers';
import { CallCenter } from './components/CallCenter';
import { Sales } from './components/Sales';
import { Service } from './components/Service';
import { KPI } from './components/KPI';
import { AIRecommendations } from './components/AIRecommendations';
import { QRScanner } from './components/QRScanner';
import { Reviews } from './components/Reviews';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <Customers />;
      case 'calls':
        return <CallCenter />;
      case 'sales':
        return <Sales />;
      case 'service':
        return <Service />;
      case 'kpi':
        return <KPI />;
      case 'ai':
        return <AIRecommendations />;
      case 'qr':
        return <QRScanner />;
      case 'reviews':
        return <Reviews />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <div className="absolute top-0 left-0 w-80 h-full shadow-2xl">
            <Sidebar
              currentView={currentView}
              onViewChange={setCurrentView}
              isMobile={true}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}