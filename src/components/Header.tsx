import React from 'react';
import { useMonitoring } from '../context/MonitoringContext';
import {
  Smartphone,
  Battery,
  BatteryCharging,
  Wifi,
  Radio,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  RefreshCw,
  Download,
  DownloadCloud,
  Plus,
  ShieldAlert,
  EyeOff,
  Cpu,
  Layers
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    selectedDevice,
    setShowAddDeviceModal,
    setShowEmergencyLockModal,
    setShowBackupModal,
    setShowApkModal,
    isScreenLocked,
    unlockDevice,
    isSirenPlaying,
    triggerRemoteSiren,
    stopRemoteSiren,
    setShowChildSimulator,
    showChildSimulator
  } = useMonitoring();

  return (
    <header className="h-18 bg-[#1e293b]/70 backdrop-blur-md border-b border-slate-700/80 px-6 flex items-center justify-between z-10 shrink-0">
      {/* Device Overview Banner */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${selectedDevice.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
            {selectedDevice.childName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm md:text-base font-bold text-white tracking-tight">
                {selectedDevice.childName}
              </h2>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                ({selectedDevice.model.split('(')[0]})
              </span>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Live Connected</span>
              </span>
              {selectedDevice.isStealthActive && (
                <span className="hidden md:inline-flex items-center space-x-1 px-2 py-0.5 bg-purple-500/15 text-purple-300 text-[10px] font-medium rounded-full border border-purple-500/30">
                  <EyeOff className="w-3 h-3" />
                  <span>Stealth ({selectedDevice.stealthDisguise})</span>
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-0.5">
              <span className="flex items-center space-x-1">
                {selectedDevice.isCharging ? (
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Battery className={`w-3.5 h-3.5 ${selectedDevice.batteryLevel < 20 ? 'text-rose-400' : 'text-slate-300'}`} />
                )}
                <span className="font-mono text-slate-200">{selectedDevice.batteryLevel}%</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center space-x-1">
                <Wifi className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono text-slate-200">{selectedDevice.networkType} ({selectedDevice.wifiSsid || 'Cellular'})</span>
              </span>
              <span className="text-slate-600 hidden lg:inline">•</span>
              <span className="text-slate-400 hidden lg:inline font-mono">
                {selectedDevice.androidVersion}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="flex items-center space-x-2.5">
        {/* Child Simulator Toggle */}
        <button
          onClick={() => setShowChildSimulator(!showChildSimulator)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
            showChildSimulator
              ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30'
              : 'bg-purple-500/15 text-purple-300 border-purple-500/30 hover:bg-purple-500/25'
          }`}
          title="Open virtual child smartphone screen"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Child Phone Sim</span>
        </button>

        {/* Remote Siren Alarm */}
        {isSirenPlaying ? (
          <button
            onClick={stopRemoteSiren}
            className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 animate-bounce shadow-lg shadow-rose-600/30"
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>Stop Siren</span>
          </button>
        ) : (
          <button
            onClick={triggerRemoteSiren}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition"
            title="Sound full-volume alarm on child phone even if silent"
          >
            <Volume2 className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">Remote Siren</span>
          </button>
        )}

        {/* Emergency Lockdown */}
        {isScreenLocked || selectedDevice.isDeviceLocked ? (
          <button
            onClick={unlockDevice}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition shadow"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Unlock Phone</span>
          </button>
        ) : (
          <button
            onClick={() => setShowEmergencyLockModal(true)}
            className="px-3.5 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition"
            title="Remotely lock phone immediately"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Lock Phone</span>
          </button>
        )}

        {/* Download APK File Quick Action */}
        <button
          onClick={() => setShowApkModal(true)}
          className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition shadow-md shadow-blue-600/30 border border-blue-400/30"
          title="Download child stealth APK file"
        >
          <DownloadCloud className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
          <span>APK File</span>
          <span className="hidden xl:inline text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">v4.8.2</span>
        </button>

        {/* Backup & Export Data */}
        <button
          onClick={() => setShowBackupModal(true)}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition"
          title="Export encrypted tracking logs"
        >
          <Download className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden lg:inline">Data Backup</span>
        </button>

        {/* Add Device */}
        <button
          onClick={() => setShowAddDeviceModal(true)}
          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition shadow-md shadow-blue-600/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Device</span>
        </button>
      </div>
    </header>
  );
};
