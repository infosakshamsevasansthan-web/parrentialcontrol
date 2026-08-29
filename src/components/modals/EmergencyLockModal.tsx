import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  Lock,
  X,
  ShieldAlert,
  KeyRound,
  AlertTriangle
} from 'lucide-react';

export const EmergencyLockModal: React.FC = () => {
  const {
    showEmergencyLockModal,
    setShowEmergencyLockModal,
    triggerEmergencyLock,
    selectedDevice
  } = useMonitoring();

  const [message, setMessage] = useState<string>(
    'This phone is locked by parental supervision. Please focus on studies and contact your parents.'
  );
  const [pin, setPin] = useState<string>('9944');

  if (!showEmergencyLockModal) return null;

  const handleLock = (e: React.FormEvent) => {
    e.preventDefault();
    triggerEmergencyLock(message, pin);
    setShowEmergencyLockModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e293b] border border-rose-500/40 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Emergency Remote Screen Lockdown</h3>
              <p className="text-xs text-slate-400">Lock {selectedDevice.name} instantly</p>
            </div>
          </div>
          <button
            onClick={() => setShowEmergencyLockModal(false)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleLock} className="space-y-4 text-xs">
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-rose-300 flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              When enforced, all apps, screen touches, and home navigation will be frozen with an emergency lock screen until parent unlocks or master PIN is entered.
            </p>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Custom Lockout Message</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Parent Master Unlock PIN</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={6}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-rose-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowEmergencyLockModal(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-600/30 flex items-center space-x-1.5"
            >
              <Lock className="w-4 h-4" />
              <span>Enforce Lockdown Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
