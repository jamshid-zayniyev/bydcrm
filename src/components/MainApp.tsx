import { Routes, Route } from 'react-router-dom';
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

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <Sidebar userRole={user?.role} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
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