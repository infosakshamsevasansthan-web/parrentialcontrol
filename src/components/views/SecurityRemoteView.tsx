import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  ShieldCheck,
  EyeOff,
  Calculator,
  Layers,
  Volume2,
  Lock,
  Trash2,
  BatteryCharging,
  Cpu,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Download,
  KeyRound,
  FileText
} from 'lucide-react';

export const SecurityRemoteView: React.FC = () => {
  const {
    selectedDevice,
    setStealthDisguise,
    toggleStealthActive,
    triggerRemoteSiren,
    stopRemoteSiren,
    isSirenPlaying,
    setShowEmergencyLockModal,
    setShowBackupModal,
    exportDataPackage
  } = useMonitoring();

  const [confirmWipe, setConfirmWipe] = useState<boolean>(false);
  const [batteryOptimization, setBatteryOptimization] = useState<boolean>(true);
  const [antiUninstallActive, setAntiUninstallActive] = useState<boolean>(true);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Stealth Camouflage, Remote Commands & Security Vault</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-mono font-bold">
              Device Admin Granted
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage undetectable stealth engine, anti-tamper permissions, and emergency remote operations.
          </p>
        </div>

        <button
          onClick={() => setShowBackupModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5 self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Full Encrypted Backup</span>
        </button>
      </div>

      {/* 1. Stealth Mode Disguise Configuration */}
      <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-purple-400" />
              <span>Android Launcher Stealth Camouflage (Undetectable)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Hides or disguises the tracking agent on the child&apos;s phone so it cannot be detected or tampered with.
            </p>
          </div>

          <button
            onClick={toggleStealthActive}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              selectedDevice.isStealthActive
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}
          >
            {selectedDevice.isStealthActive ? 'Stealth ACTIVE' : 'Stealth Paused'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Disguise 1: Functional Calculator */}
          <div
            onClick={() => setStealthDisguise('calculator')}
            className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${
              selectedDevice.stealthDisguise === 'calculator'
                ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/20'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                <Calculator className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white">Disguise as System Calculator</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                App appears as a working calculator on the home screen. Opens a real calculator if opened by child. Secret PIN unlocks stealth settings.
              </p>
            </div>
            <span className="text-[10px] font-mono text-blue-400 font-bold">Recommended ★</span>
          </div>

          {/* Disguise 2: Google Play Services */}
          <div
            onClick={() => setStealthDisguise('google_services')}
            className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${
              selectedDevice.stealthDisguise === 'google_services'
                ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/20'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white">Google Play Services Masquerade</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Names process as &quot;com.google.android.gms.sync&quot; with system gears icon to look like standard Android framework.
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">System Camouflage</span>
          </div>

          {/* Disguise 3: Completely Hidden */}
          <div
            onClick={() => setStealthDisguise('hidden')}
            className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${
              selectedDevice.stealthDisguise === 'hidden'
                ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/20'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
                <EyeOff className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white">Completely Hidden (Dialer Only)</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Zero app icon on launcher or app drawer. Re-opened exclusively by dialing secret sequence <code className="text-white font-mono">*#9944#</code> in phone app.
              </p>
            </div>
            <span className="text-[10px] font-mono text-purple-400">100% Invisible</span>
          </div>
        </div>
      </div>

      {/* 2. Remote Emergency Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Remote Siren Alarm */}
        <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Lost Phone / Emergency Siren</h4>
                <p className="text-xs text-slate-400">Plays maximum-decibel alarm even if child&apos;s phone is on silent / DND.</p>
              </div>
            </div>
          </div>

          {isSirenPlaying ? (
            <button
              onClick={stopRemoteSiren}
              className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold text-xs animate-bounce shadow-lg shadow-rose-600/30"
            >
              Stop Siren Alarm Now
            </button>
          ) : (
            <button
              onClick={triggerRemoteSiren}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 rounded-xl font-bold text-xs transition"
            >
              Trigger Full-Volume Siren
            </button>
          )}
        </div>

        {/* Remote Lockdown */}
        <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Emergency Screen Overlay Lockdown</h4>
                <p className="text-xs text-slate-400">Disables touch navigation and displays parent contact screen.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowEmergencyLockModal(true)}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs shadow-md transition"
          >
            Configure & Enforce Lockdown
          </button>
        </div>
      </div>

      {/* 3. Anti-Uninstall Protection & Low-Power Engine */}
      <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Device Administrator & Battery Optimization Engine</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-bold text-white">Anti-Uninstall Administrator Lock</p>
              <p className="text-slate-400 text-[11px]">Prevents child from uninstalling or stopping app in Android Settings.</p>
            </div>
            <input
              type="checkbox"
              checked={antiUninstallActive}
              onChange={(e) => setAntiUninstallActive(e.target.checked)}
              className="w-5 h-5 accent-blue-600 cursor-pointer shrink-0"
            />
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-bold text-white">Adaptive Low-Power Throttle (0.8%/hr)</p>
              <p className="text-slate-400 text-[11px]">Adjusts GPS poll interval when device is stationary to conserve battery.</p>
            </div>
            <input
              type="checkbox"
              checked={batteryOptimization}
              onChange={(e) => setBatteryOptimization(e.target.checked)}
              className="w-5 h-5 accent-blue-600 cursor-pointer shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
