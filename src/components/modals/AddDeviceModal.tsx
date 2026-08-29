import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  Smartphone,
  X,
  Plus,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Sparkles,
  Radio,
  Check,
  Cpu
} from 'lucide-react';

export const AddDeviceModal: React.FC = () => {
  const { showAddDeviceModal, setShowAddDeviceModal, addNewDevice } = useMonitoring();

  const [activeTab, setActiveTab] = useState<'pair_code' | 'manual_enroll'>('pair_code');
  
  // Pair code state
  const [pairingCode, setPairingCode] = useState<string>('GL-8829');
  const [childLabel, setChildLabel] = useState<string>('Rohan (Target Phone)');
  const [pairSuccess, setPairSuccess] = useState<boolean>(false);

  // Manual enroll state
  const [childName, setChildName] = useState<string>('');
  const [deviceModel, setDeviceModel] = useState<string>('Oppo / Realme (ColorOS 16)');
  const [androidVersion, setAndroidVersion] = useState<string>('Android 15 (ColorOS 16)');
  const [stealthDisguise, setStealthDisguise] = useState<'calculator' | 'google_services' | 'hidden'>('calculator');

  if (!showAddDeviceModal) return null;

  const handlePairSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pairingCode.trim()) return;

    setPairSuccess(true);
    
    setTimeout(() => {
      addNewDevice({
        name: childLabel.trim() || `Child Device (${pairingCode.toUpperCase()})`,
        childName: childLabel.trim() || `Child (${pairingCode.toUpperCase()})`,
        model: 'Oppo / Realme (ColorOS 16)',
        androidVersion: 'Android 15 / ColorOS 16',
        stealthDisguise: 'calculator',
        batteryLevel: 51,
        isOnline: true,
        isStealthActive: true
      });

      setPairSuccess(false);
      setShowAddDeviceModal(false);
    }, 800);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) return;

    addNewDevice({
      name: `${childName.split(' ')[0]}'s ${deviceModel.split(' ')[0]}`,
      childName: childName.trim(),
      model: deviceModel,
      androidVersion,
      stealthDisguise,
      batteryLevel: 85,
      isOnline: true,
      isStealthActive: true
    });

    setChildName('');
    setShowAddDeviceModal(false);
  };

  const isMatchingCode = pairingCode.trim().toUpperCase() === 'GL-8829';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e293b] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Pair & Link Child Phone</h3>
              <p className="text-xs text-slate-400">Connect the target smartphone to your Admin Console</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddDeviceModal(false)}
            className="text-slate-400 hover:text-white p-1 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('pair_code')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'pair_code'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Pairing Code (GL-8829)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('manual_enroll')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'manual_enroll'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enroll New Phone</span>
          </button>
        </div>

        {/* Tab 1: Pairing Code Link */}
        {activeTab === 'pair_code' && (
          <form onSubmit={handlePairSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Enter Device ID / Pairing Code <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. GL-8829"
                  value={pairingCode}
                  onChange={(e) => setPairingCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-900 border border-blue-500/50 rounded-xl p-3 text-white font-mono font-bold tracking-wider text-sm focus:outline-none focus:border-blue-400 uppercase"
                  required
                />
                <div className="absolute right-3 top-3 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">
                  READY
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                बच्चे के फोन स्क्रीन पर ऊपर दिखने वाला 6-अंकों का कोड (जैसे <span className="text-blue-400 font-mono font-bold">GL-8829</span>) यहाँ डालें।
              </p>
            </div>

            {/* Live Detected Device Badge */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-emerald-300 text-xs">Target Device Online</h4>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Live 5G</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Device: <strong className="text-white">Oppo / Realme (ColorOS 16)</strong> | Battery: <strong className="text-white">51%</strong>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Background Tracker Service is running with stealth permissions enabled.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Child Name / Device Nickname</label>
              <input
                type="text"
                placeholder="e.g. Rohan (Target Phone)"
                value={childLabel}
                onChange={(e) => setChildLabel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 text-xs"
              />
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
                disabled={pairSuccess}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center space-x-2 transition"
              >
                {pairSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Linking Device...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Link & Connect Device</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Manual Enroll Form */}
        {activeTab === 'manual_enroll' && (
          <form onSubmit={handleManualSubmit} className="space-y-4 text-xs">
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
                  <option value="Oppo / Realme (ColorOS 16)">Oppo / Realme (ColorOS 16)</option>
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
                  <option value="Android 15 (ColorOS 16)">Android 15 (ColorOS 16)</option>
                  <option value="Android 14 (ColorOS 14 / OneUI 6)">Android 14</option>
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
        )}
      </div>
    </div>
  );
};
