import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Dashboard } from "./Dashboard";
import { Customers } from "./Customers";
import { CallCenter } from "./CallCenter";
import { Sales } from "./Sales";
import { Service } from "./Service";
import { KPI } from "./KPI";
import { AIRecommendations } from "./AIRecommendations";
import { QRScanner } from "./QRScanner";
import { Reviews } from "./Reviews";
import { useAuthContext } from "../contexts/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export function MainApp() {
  // const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, hasPermission } = useAuthContext();

  // const renderView = () => {
  //   // Check permissions for each view
  //   const canAccess = (requiredRole: string): boolean => {
  //     return hasPermission(requiredRole);
  //   };

  //   switch (currentView) {
  //     case "dashboard":
  //       return <Dashboard />;
  //     case "customers":
  //       if (!canAccess("reception")) return <Unauthorized />;
  //       return <Customers />;
  //     case "calls":
  //       if (!canAccess("reception")) return <Unauthorized />;
  //       return <CallCenter />;
  //     case "sales":
  //       if (!canAccess("reception")) return <Unauthorized />;
  //       return <Sales />;
  //     case "service":
  //       if (!canAccess("reception")) return <Unauthorized />;
  //       return <Service />;
  //     case "kpi":
  //       if (!canAccess("superadmin")) return <Unauthorized />;
  //       return <KPI />;
  //     case "ai":
  //       if (!canAccess("superadmin")) return <Unauthorized />;
  //       return <AIRecommendations />;
  //     case "qr":
  //       if (!canAccess("reception")) return <Unauthorized />;
  //       return <QRScanner />;
  //     case "reviews":
  //       if (!canAccess("reception")) return <Unauthorized />;
  //       return <Reviews />;
  //     default:
  //       return <Dashboard />;
  //   }
  // };

  const Unauthorized = () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Ruxsat yo'q
        </h3>
        <p className="text-gray-600">
          Sizda bu sahifani ko'rish uchun ruxsat yo'q.
        </p>
      </div>
    </div>
  );

  const ProtectedRoute = ({
    requiredRole,
    children,
  }: {
    requiredRole: string;
    children: JSX.Element;
  }) => {
    if (!hasPermission(requiredRole)) {
      return <Unauthorized />;
    }
    return children;
  };

  return (
    <Router>
      <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <div className="absolute top-0 left-0 w-80 h-full shadow-2xl">
              <Sidebar
                // currentView={currentView}
                // onViewChange={setCurrentView}
                isMobile={true}
                onClose={() => setSidebarOpen(false)}
                userRole={user?.role}
              />
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Sidebar
            // currentView={currentView}
            // onViewChange={setCurrentView}
            userRole={user?.role}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
            {/* {renderView()} */}
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/customers"
                element={
                  <ProtectedRoute requiredRole="reception">
                    <Customers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calls"
                element={
                  <ProtectedRoute requiredRole="reception">
                    <CallCenter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales"
                element={
                  <ProtectedRoute requiredRole="reception">
                    <Sales />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/service"
                element={
                  <ProtectedRoute requiredRole="reception">
                    <Service />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kpi"
                element={
                  <ProtectedRoute requiredRole="superadmin">
                    <KPI />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai"
                element={
                  <ProtectedRoute requiredRole="superadmin">
                    <AIRecommendations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/qr"
                element={
                  <ProtectedRoute requiredRole="reception">
                    <QRScanner />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviews"
                element={
                  <ProtectedRoute requiredRole="reception">
                    <Reviews />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
