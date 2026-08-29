import React from 'react';
import { useMonitoring } from '../context/MonitoringContext';
import { NavTab } from '../types';
import {
  LayoutDashboard,
  Radio,
  MapPin,
  PhoneCall,
  MessageSquareText,
  Clock,
  KeyRound,
  ShieldCheck,
  DownloadCloud,
  Smartphone,
  Plus,
  Wifi,
  BatteryCharging,
  EyeOff,
  ChevronRight
} from 'lucide-react';

export { type NavTab };

interface SidebarProps {
  activeTab?: NavTab;
  setActiveTab?: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const {
    devices,
    selectedDeviceId,
    setSelectedDeviceId,
    setShowAddDeviceModal,
    selectedDevice,
    setShowChildSimulator,
    showChildSimulator,
    activeTab: contextActiveTab,
    setActiveTab: contextSetActiveTab
  } = useMonitoring();

  const activeTab = props.activeTab || contextActiveTab || 'dashboard';
  const setActiveTab = props.setActiveTab || contextSetActiveTab;

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: string; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'surveillance', label: 'Live Surveillance', icon: Radio, badge: 'LIVE', badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { id: 'tracking', label: 'Live GPS Tracking', icon: MapPin },
    { id: 'calls', label: 'Call Logs & Wiretap', icon: PhoneCall, badge: '5', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'messages', label: 'Messages & Social', icon: MessageSquareText, badge: 'Threat', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { id: 'apps', label: 'App Usage & Limits', icon: Clock },
    { id: 'keylogger', label: 'Keylogger & Notifs', icon: KeyRound },
    { id: 'security', label: 'Stealth & Remote', icon: ShieldCheck },
    { id: 'install', label: 'APK & Setup Guide', icon: DownloadCloud, badge: 'APK', badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  ];

  return (
    <aside className="w-72 bg-[#1e293b] border-r border-slate-700/80 flex flex-col h-full select-none shrink-0 z-20">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-700/80 bg-slate-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0f172a] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center">
                GuardianLink<span className="text-blue-400 font-extrabold">.</span>
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Parental Control Suite
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            AES-256
          </span>
        </div>

        {/* Device Switcher Card */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2">
            <span>MONITORED PHONES ({devices.length})</span>
            <button
              onClick={() => setShowAddDeviceModal(true)}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px] font-semibold transition"
            >
              <Plus className="w-3 h-3" /> Add Phone
            </button>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
            {devices.map((dev) => {
              const isSelected = dev.id === selectedDeviceId;
              return (
                <button
                  key={dev.id}
                  onClick={() => setSelectedDeviceId(dev.id)}
                  className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500/40 text-white shadow-sm'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${dev.avatarColor} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                      {dev.childName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate leading-tight">{dev.childName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{dev.model.split('(')[0]}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[10px] shrink-0 pl-1">
                    <span className="flex items-center text-slate-300">
                      <BatteryCharging className={`w-3 h-3 mr-0.5 ${dev.batteryLevel < 20 ? 'text-rose-400' : 'text-emerald-400'}`} />
                      {dev.batteryLevel}%
                    </span>
                    {dev.isStealthActive && (
                      <span title="Stealth Hidden" className="text-purple-400">
                        <EyeOff className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                    isActive ? 'bg-white/20 text-white border-white/30' : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Simulator Shortcut & Admin Info Footer */}
      <div className="p-3 border-t border-slate-700/80 bg-slate-900/60 space-y-2">
        <button
          onClick={() => setShowChildSimulator(!showChildSimulator)}
          className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
            showChildSimulator
              ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
              : 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span>Child Android Phone Sim</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-400/20 text-purple-200">
            {showChildSimulator ? 'Active' : 'Open'}
          </span>
        </button>

        <div className="bg-slate-800/70 rounded-xl p-3 border border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow">
              P
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Parent Admin Console</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Daemon Online & Stealth
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
