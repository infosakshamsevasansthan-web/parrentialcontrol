import React, { useState, useEffect } from 'react';
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
import { ChildTargetApp } from './components/child_device/ChildTargetApp';
import { AddDeviceModal } from './components/modals/AddDeviceModal';
import { EmergencyLockModal } from './components/modals/EmergencyLockModal';
import { DataBackupModal } from './components/modals/DataBackupModal';
import { ApkDownloadModal } from './components/modals/ApkDownloadModal';
import { InstallPwaModal } from './components/modals/InstallPwaModal';
import { Smartphone, ShieldCheck, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';

const MainDashboardLayout: React.FC = () => {
  const { activeTab, currentTab, setActiveTab } = useMonitoring();
  const [showInstallPwaModal, setShowInstallPwaModal] = useState(false);
  const [appMode, setAppMode] = useState<'parent' | 'child'>(() => {
    const saved = localStorage.getItem('guardian_app_mode');
    if (saved === 'parent' || saved === 'child') return saved;
    // Default to 'child' setup app when opened on Android APK / Mobile devices
    if (typeof window !== 'undefined') {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768 ||
        !!(window as any).Capacitor;
      if (isMobileDevice) return 'child';
    }
    return 'parent';
  });

  useEffect(() => {
    localStorage.setItem('guardian_app_mode', appMode);
  }, [appMode]);

  useEffect(() => {
    const handleOpenInstall = () => setShowInstallPwaModal(true);
    const handleSwitchToChild = () => setAppMode('child');
    const handleSwitchToParent = () => setAppMode('parent');

    window.addEventListener('open-pwa-install', handleOpenInstall);
    window.addEventListener('switch-to-child-mode', handleSwitchToChild);
    window.addEventListener('switch-to-parent-mode', handleSwitchToParent);

    return () => {
      window.removeEventListener('open-pwa-install', handleOpenInstall);
      window.removeEventListener('switch-to-child-mode', handleSwitchToChild);
      window.removeEventListener('switch-to-parent-mode', handleSwitchToParent);
    };
  }, []);

  // IF USER SELECTED CHILD TARGET DEVICE MODE (Installed on Child's Phone)
  if (appMode === 'child') {
    return <ChildTargetApp onSwitchToParent={() => setAppMode('parent')} />;
  }

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
    <div className="flex h-screen bg-[#0f172a] text-slate-100 font-sans overflow-hidden select-none flex-col">
      {/* Mobile Top Mode Switcher Bar */}
      <div className="bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-purple-900/90 border-b border-blue-500/30 px-3 py-1.5 flex items-center justify-between text-xs z-30 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white">App Mode:</span>
          <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30 font-bold">
            👑 Parent Admin Dashboard
          </span>
        </div>

        <button
          onClick={() => setAppMode('child')}
          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[11px] flex items-center space-x-1 transition shadow"
          title="Switch to Child Target Phone Mode"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Switch to Child Phone Mode 📱</span>
        </button>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
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
      </div>

      {/* Global Modals */}
      <AddDeviceModal />
      <EmergencyLockModal />
      <DataBackupModal />
      <ApkDownloadModal />
      <InstallPwaModal
        isOpen={showInstallPwaModal}
        onClose={() => setShowInstallPwaModal(false)}
      />
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
