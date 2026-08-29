import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  Smartphone,
  X,
  Plus,
  QrCode,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const AddDeviceModal: React.FC = () => {
  const { showAddDeviceModal, setShowAddDeviceModal, addNewDevice } = useMonitoring();

  const [childName, setChildName] = useState<string>('');
  const [deviceModel, setDeviceModel] = useState<string>('Samsung Galaxy S23 (SM-S911B)');
  const [androidVersion, setAndroidVersion] = useState<string>('Android 14');
  const [stealthDisguise, setStealthDisguise] = useState<'calculator' | 'google_services' | 'hidden'>('calculator');

  if (!showAddDeviceModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) return;

    addNewDevice({
      name: `${childName.split(' ')[0]}'s ${deviceModel.split(' ')[0]}`,
      childName: childName.trim(),
      model: deviceModel,
      androidVersion,
      stealthDisguise,
      batteryLevel: 94,
      isOnline: true,
      isStealthActive: true
    });

    setChildName('');
    setShowAddDeviceModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e293b] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Enroll New Child Smartphone</h3>
              <p className="text-xs text-slate-400">Add an Android phone to your central parental console</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddDeviceModal(false)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Child Name & Age</label>
            <input
              type="text"
              placeholder="e.g. Rohan Sharma (Age 13)"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Smartphone Model</label>
              <select
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 text-xs"
              >
                <option value="Samsung Galaxy S23 (SM-S911B)">Samsung Galaxy S23</option>
                <option value="Google Pixel 9 Pro (GC3VE)">Google Pixel 9 Pro</option>
                <option value="OnePlus 12 5G (CPH2581)">OnePlus 12 5G</option>
                <option value="Xiaomi Redmi Note 13 Pro">Xiaomi Redmi Note 13</option>
                <option value="Vivo V30 Pro">Vivo V30 Pro</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Android OS Version</label>
              <select
                value={androidVersion}
                onChange={(e) => setAndroidVersion(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 text-xs"
              >
                <option value="Android 15 (Vanilla Ice Cream)">Android 15</option>
                <option value="Android 14 (Upside Down Cake)">Android 14</option>
                <option value="Android 13 (Tiramisu)">Android 13</option>
                <option value="Android 12 (Snow Cone)">Android 12</option>
                <option value="Android 11 / 10">Android 11 / 10</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Default Stealth Camouflage</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'calculator', label: 'Calculator', desc: 'Functional' },
                { id: 'google_services', label: 'Play Services', desc: 'System process' },
                { id: 'hidden', label: 'Hidden Icon', desc: 'Dialer only' }
              ].map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setStealthDisguise(s.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    stealthDisguise === s.id
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="font-bold text-xs">{s.label}</p>
                  <p className="text-[10px] text-slate-400">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted pairing channel ready. Daemon will autostart upon pairing.</span>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddDeviceModal(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll Phone</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
