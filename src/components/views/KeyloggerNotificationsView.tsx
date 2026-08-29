import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  KeyRound,
  Bell,
  Search,
  AlertTriangle,
  ShieldCheck,
  Smartphone,
  Layers,
  Clock,
  Eye,
  Trash2
} from 'lucide-react';

export const KeyloggerNotificationsView: React.FC = () => {
  const {
    notifications,
    keylogs,
    selectedDevice,
    simulateChildAction
  } = useMonitoring();

  const [activeTab, setActiveTab] = useState<'notifications' | 'keylogger'>('notifications');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNotifs = notifications.filter(n => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q) || n.appName.toLowerCase().includes(q);
    }
    return true;
  });

  const filteredKeys = keylogs.filter(k => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return k.keystrokes.toLowerCase().includes(q) || k.appName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <KeyRound className="w-5 h-5 text-purple-400" />
            <h2 className="text-base font-bold text-white">Live Push Notifications & Keystroke Logger</h2>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-mono font-bold">
              Background Accessibility Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Intercepts incoming device notifications and keystrokes typed across all applications.
          </p>
        </div>

        <button
          onClick={() => simulateChildAction('notification')}
          className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5 self-start md:self-auto"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Simulate Push Notification</span>
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e293b]/60 p-3 rounded-xl border border-slate-700/60">
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-lg font-bold flex items-center space-x-1.5 transition ${
              activeTab === 'notifications'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Captured Notifications ({notifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('keylogger')}
            className={`px-4 py-2 rounded-lg font-bold flex items-center space-x-1.5 transition ${
              activeTab === 'keylogger'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Keystroke Stream ({keylogs.length})</span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* NOTIFICATIONS STREAM */}
      {activeTab === 'notifications' && (
        <div className="space-y-3">
          {filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              className={`bg-[#1e293b] p-4 rounded-2xl border shadow-lg flex items-start justify-between gap-4 transition ${
                notif.isThreat ? 'border-amber-500/40 bg-amber-950/10' : 'border-slate-700/80'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0 font-bold text-xs">
                  {notif.appName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{notif.appName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                    {notif.isThreat && (
                      <span className="px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                        Threat Flag
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 mt-1">{notif.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{notif.body}</p>
                </div>
              </div>

              <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono shrink-0">
                Intercepted
              </span>
            </div>
          ))}
        </div>
      )}

      {/* KEYSTROKE STREAM */}
      {activeTab === 'keylogger' && (
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/80 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-700 pb-3">
            <span>REAL-TIME KEYBOARD INTERCEPTOR</span>
            <span className="text-emerald-400 font-mono">Accessibility Hook Active</span>
          </div>

          <div className="space-y-3">
            {filteredKeys.map((key) => (
              <div
                key={key.id}
                className={`p-4 rounded-xl border transition ${
                  key.isFlagged
                    ? 'bg-rose-500/10 border-rose-500/40 text-rose-200'
                    : 'bg-slate-900/80 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    {key.appName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{key.timestamp}</span>
                </div>

                <div className="bg-black/50 p-2.5 rounded-lg font-mono text-xs text-slate-100 border border-slate-800 break-words">
                  &ldquo;{key.keystrokes}&rdquo;
                </div>

                {key.isFlagged && (
                  <div className="flex items-center space-x-1 text-[10px] font-bold text-rose-400 mt-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Security Alert: Flagged parental bypass attempt detected in search queries.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
