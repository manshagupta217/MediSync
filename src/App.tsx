import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { I18nProvider } from "@/lib/i18n";

import AppLayout from "@/components/layout/AppLayout";
import FloatingEmergencyPanel from "@/components/FloatingEmergencyPanel";
import AIChatbot from "@/components/AIChatbot";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import EmergencyPage from "@/pages/EmergencyPage";
import ResourcesPage from "@/pages/ResourcesPage";
import SharingPage from "@/pages/SharingPage";
import EquipmentPage from "@/pages/EquipmentPage";
import DoctorsPage from "@/pages/DoctorsPage";
import MapPage from "@/pages/MapPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import PatientDashboard from "@/pages/PatientDashboard";
import ProfilePage from "@/pages/ProfilePage";
import PatientRecordsPage from "@/pages/PatientRecordsPage";
import GovernmentDashboard from "@/pages/GovernmentDashboard";
import HealthyBytesPage from "@/pages/HealthyBytesPage";
import LabTestsPage from "@/pages/LabTestsPage";
import MedicinesPage from "@/pages/MedicinesPage";
import TeleconsultationPage from "@/pages/TeleconsultationPage";
import AppointmentsPage from "@/pages/AppointmentsPage";
import HealthRecordsPage from "@/pages/HealthRecordsPage";
import DigitalHealthIDPage from "@/pages/DigitalHealthIDPage";
import HealthServicesPage from "@/pages/HealthServicesPage";
import NotFound from "./pages/NotFound";
import ScanPage from "./pages/scanPage";
import PaymentsPage from "./pages/PaymentsPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  const getDashboard = () => {
    if (!user) return <LoginPage />;

    if (user.role === "gov_authority") {
      return <GovernmentDashboard />;
    }

    if (user.role === "patient") {
      return <PatientDashboard />;
    }

    return <DashboardPage />;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={getDashboard()} />

          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/sharing" element={<SharingPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/patient-records" element={<PatientRecordsPage />} />

          <Route path="/healthy-bytes" element={<HealthyBytesPage />} />
          <Route path="/lab-tests" element={<LabTestsPage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/teleconsultation" element={<TeleconsultationPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/health-records" element={<HealthRecordsPage />} />
          <Route path="/digital-health-id" element={<DigitalHealthIDPage />} />
          <Route path="/health-services" element={<HealthServicesPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {user && <FloatingEmergencyPanel />}
      {user && <AIChatbot />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;