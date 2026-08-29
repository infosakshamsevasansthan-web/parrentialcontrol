import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  Clock,
  Lock,
  Unlock,
  ShieldAlert,
  Sliders,
  Moon,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Tv,
  MessageSquare,
  Camera,
  Gamepad2,
  GraduationCap,
  Globe
} from 'lucide-react';

export const AppUsageView: React.FC = () => {
  const {
    appUsage,
    selectedDevice,
    toggleAppBlock,
    updateAppTimeLimit,
    setShowEmergencyLockModal
  } = useMonitoring();

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'social' | 'games' | 'education' | 'entertainment'>('all');
  const [bedtimeEnabled, setBedtimeEnabled] = useState<boolean>(true);
  const [schoolModeEnabled, setSchoolModeEnabled] = useState<boolean>(true);

  const filteredApps = appUsage.filter((a) => {
    if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
    return true;
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
      case 'Camera': return <Camera className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const totalMins = appUsage.reduce((acc, curr) => acc + curr.usedMinutesToday, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-pink-400" />
            <h2 className="text-base font-bold text-white">App Screen Time, Limits & Remote Lockdown</h2>
            <span className="px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-300 text-[10px] font-mono font-bold">
              Total: {Math.floor(totalMins / 60)}h {totalMins % 60}m Today
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor real-time application runtime, enforce time quotas, and block addictive games remotely.
          </p>
        </div>

        <button
          onClick={() => setShowEmergencyLockModal(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/20 transition flex items-center space-x-1.5 self-start md:self-auto"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Emergency Full Phone Lockdown</span>
        </button>
      </div>

      {/* Policy Automation Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-700/80 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Bedtime Curfew Policy (10:00 PM – 6:00 AM)</h4>
              <p className="text-[11px] text-slate-400">Automatically disables all games & social media during sleep hours.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={bedtimeEnabled}
            onChange={(e) => setBedtimeEnabled(e.target.checked)}
            className="w-5 h-5 accent-blue-600 rounded cursor-pointer shrink-0"
          />
        </div>

        <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-700/80 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">School Study Focus Mode (8:00 AM – 2:00 PM)</h4>
              <p className="text-[11px] text-slate-400">Allows only Educational & Emergency calling apps.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={schoolModeEnabled}
            onChange={(e) => setSchoolModeEnabled(e.target.checked)}
            className="w-5 h-5 accent-blue-600 rounded cursor-pointer shrink-0"
          />
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex items-center space-x-1.5 overflow-x-auto text-xs bg-[#1e293b]/60 p-2 rounded-xl border border-slate-700/60">
        {(['all', 'social', 'games', 'education', 'entertainment'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg capitalize font-medium transition shrink-0 ${
              categoryFilter === cat
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat} Apps
          </button>
        ))}
      </div>

      {/* App List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map((app) => {
          const isOverLimit = app.dailyLimitMinutes && app.usedMinutesToday >= app.dailyLimitMinutes;
          const percentage = Math.min(100, Math.round((app.usedMinutesToday / (app.dailyLimitMinutes || 120)) * 100));

          return (
            <div
              key={app.id}
              className={`bg-[#1e293b] rounded-2xl border p-5 shadow-lg flex flex-col justify-between space-y-4 transition ${
                app.isBlocked ? 'border-rose-500/50 bg-rose-950/10' : 'border-slate-700/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${app.iconColor}`}>
                      {getIcon(app.iconName)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white truncate max-w-[140px]">{app.appName}</h4>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">{app.category}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleAppBlock(app.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition border ${
                      app.isBlocked
                        ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    {app.isBlocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{app.isBlocked ? 'BLOCKED' : 'Allowed'}</span>
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Used Today:</span>
                    <span className="text-white font-mono font-bold">
                      {Math.floor(app.usedMinutesToday / 60)}h {app.usedMinutesToday % 60}m
                      {app.dailyLimitMinutes && ` / ${app.dailyLimitMinutes}m limit`}
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        app.isBlocked || isOverLimit ? 'bg-rose-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Limit Slider */}
              <div className="border-t border-slate-700/60 pt-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Daily Allowed Limit:</span>
                  <span className="text-blue-400 font-mono font-bold">
                    {app.dailyLimitMinutes ? `${app.dailyLimitMinutes} mins` : 'No Limit'}
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="180"
                  step="15"
                  value={app.dailyLimitMinutes || 60}
                  onChange={(e) => updateAppTimeLimit(app.id, Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
