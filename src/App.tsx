import React from 'react';
import { MonitoringProvider, useMonitoring } from './context/MonitoringContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './components/views/DashboardOverview';
import { LiveSurveillanceView } from './components/views/LiveSurveillanceView';
import { LiveTrackingView } from './components/views/LiveTrackingView';
import { CallLogsView } from './components/views/CallLogsView';
import { MessagesView } from './components/views/MessagesView';
import { AppUsageView } from './components/views/AppUsageView';
import { KeyloggerNotificationsView } from './components/views/KeyloggerNotificationsView';
import { SecurityRemoteView } from './components/views/SecurityRemoteView';
import { InstallGuideView } from './components/views/InstallGuideView';
import { ChildPhoneSimulator } from './components/child_simulator/ChildPhoneSimulator';
import { AddDeviceModal } from './components/modals/AddDeviceModal';
import { EmergencyLockModal } from './components/modals/EmergencyLockModal';
import { DataBackupModal } from './components/modals/DataBackupModal';
import { ApkDownloadModal } from './components/modals/ApkDownloadModal';

const MainDashboardLayout: React.FC = () => {
  const { activeTab, currentTab, setActiveTab } = useMonitoring();
  const effectiveTab = activeTab || currentTab || 'dashboard';

  const renderActiveView = () => {
    switch (effectiveTab) {
      case 'dashboard':
      case 'overview':
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case 'surveillance':
        return <LiveSurveillanceView />;
      case 'tracking':
        return <LiveTrackingView />;
      case 'calls':
        return <CallLogsView />;
      case 'messages':
        return <MessagesView />;
      case 'apps':
        return <AppUsageView />;
      case 'keylogger':
        return <KeyloggerNotificationsView />;
      case 'security':
        return <SecurityRemoteView />;
      case 'install':
      case 'install_guide':
        return <InstallGuideView />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-100 font-sans overflow-hidden select-none">
      {/* Navigation Sidebar */}
      <Sidebar activeTab={effectiveTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Global Control Header */}
        <Header />

        {/* Dynamic Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Interactive Floating Child Smartphone Simulator */}
      <ChildPhoneSimulator />

      {/* Global Modals */}
      <AddDeviceModal />
      <EmergencyLockModal />
      <DataBackupModal />
      <ApkDownloadModal />
    </div>
  );
};

export default function App() {
  return (
    <MonitoringProvider>
      <MainDashboardLayout />
    </MonitoringProvider>
  );
}
