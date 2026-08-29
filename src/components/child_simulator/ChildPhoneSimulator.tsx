import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  Smartphone,
  X,
  Lock,
  Unlock,
  Volume2,
  EyeOff,
  Calculator as CalcIcon,
  PhoneCall,
  MessageSquare,
  Sparkles,
  MapPin,
  ShieldCheck,
  RotateCcw,
  Zap,
  ArrowRight
} from 'lucide-react';

export const ChildPhoneSimulator: React.FC = () => {
  const {
    showChildSimulator,
    setShowChildSimulator,
    selectedDevice,
    isScreenLocked,
    unlockDevice,
    isSirenPlaying,
    stopRemoteSiren,
    simulateChildAction,
    isCameraActive,
    isListeningLiveAudio
  } = useMonitoring();

  // Simulated Calculator State
  const [calcInput, setCalcInput] = useState<string>('0');
  const [calcUnlockedStealth, setCalcUnlockedStealth] = useState<boolean>(false);
  const [currentPhoneView, setCurrentPhoneView] = useState<'home' | 'calculator' | 'dialer' | 'whatsapp'>('home');

  if (!showChildSimulator) return null;

  const handleCalcClick = (val: string) => {
    if (val === 'C') {
      setCalcInput('0');
      return;
    }
    if (val === '=') {
      // Check if secret PIN '9944' entered
      if (calcInput === '9944') {
        setCalcUnlockedStealth(true);
        return;
      }
      try {
        // Safe basic arithmetic evaluate
        // eslint-disable-next-line no-eval
        const clean = calcInput.replace(/[^0-9+\-*/.]/g, '');
        const res = Function(`'use strict'; return (${clean})`)();
        setCalcInput(String(res));
      } catch {
        setCalcInput('Error');
      }
      return;
    }
    setCalcInput((prev) => (prev === '0' || prev === 'Error' ? val : prev + val));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end animate-in fade-in slide-in-from-bottom-6 duration-300">
      {/* Floating Header Tab */}
      <div className="bg-[#1e293b] border-2 border-purple-500/50 shadow-2xl rounded-2xl p-4 w-[340px] mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-bold text-white truncate">
            Child Phone: {selectedDevice.name}
          </span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-mono">
            Interactive Sim
          </span>
          <button
            onClick={() => setShowChildSimulator(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close Simulator"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Realistic Virtual Smartphone Frame */}
      <div className="w-[340px] h-[640px] bg-black rounded-[42px] border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col justify-between relative select-none">
        {/* Notch Status Bar */}
        <div className="h-7 bg-black flex items-center justify-between px-6 text-[10px] text-slate-400 font-mono pt-1 shrink-0 z-30">
          <span>10:45</span>
          <div className="w-18 h-3.5 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center">
            {isCameraActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>}
          </div>
          <div className="flex items-center space-x-1.5">
            <span>5G</span>
            <span className="text-emerald-400 font-bold">{selectedDevice.batteryLevel}%</span>
          </div>
        </div>

        {/* Live Surveillance Indicator Pills (Invisible on real phone, shown for parent tester) */}
        {(isCameraActive || isListeningLiveAudio || isSirenPlaying) && (
          <div className="absolute top-9 inset-x-4 z-40 flex flex-col gap-1 pointer-events-none">
            {isSirenPlaying && (
              <div className="bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center justify-between animate-bounce shadow-lg">
                <span className="flex items-center gap-1"><Volume2 className="w-3 h-3" /> PARENT SIREN SOUNDING</span>
                <button
                  onClick={(e) => { e.stopPropagation(); stopRemoteSiren(); }}
                  className="pointer-events-auto text-[9px] bg-black/40 px-1.5 py-0.5 rounded"
                >
                  Silence
                </button>
              </div>
            )}
            {isCameraActive && (
              <div className="bg-red-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                Silent Camera Feed Transmitting to Admin
              </div>
            )}
            {isListeningLiveAudio && (
              <div className="bg-blue-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                Silent Mic Wiretap Streaming
              </div>
            )}
          </div>
        )}

        {/* Main Phone Screen Content */}
        <div className="flex-1 bg-slate-900 relative overflow-hidden flex flex-col justify-between p-4">
          {/* A. Emergency Remote Lockdown Screen Overlay */}
          {isScreenLocked || selectedDevice.isDeviceLocked ? (
            <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-50 space-y-4">
              <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 animate-pulse">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">DEVICE LOCKED</h4>
                <p className="text-xs text-rose-300 mt-1 leading-relaxed font-medium">
                  {selectedDevice.lockMessage || 'This phone is under strict parental supervision.'}
                </p>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Emergency calls only: 112</p>
              <button
                onClick={unlockDevice}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition"
              >
                Simulate Parent Unlock
              </button>
            </div>
          ) : null}

          {/* B. View 1: Home Launcher */}
          {currentPhoneView === 'home' && (
            <div className="space-y-4">
              {/* Wallpaper & Clock */}
              <div className="text-center pt-3 pb-2">
                <h2 className="text-3xl font-light text-white font-mono">10:45</h2>
                <p className="text-xs text-slate-300">Saturday, August 29 • 29°C</p>
              </div>

              {/* Launcher App Icons */}
              <div className="grid grid-cols-4 gap-3 text-center pt-2">
                {/* 1. Calculator (Stealth Camouflage) */}
                <div
                  onClick={() => setCurrentPhoneView('calculator')}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                    <CalcIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-slate-200 mt-1 font-medium">
                    {selectedDevice.stealthDisguise === 'calculator' ? 'Calculator' : 'Calculator'}
                  </span>
                </div>

                {/* 2. WhatsApp */}
                <div
                  onClick={() => setCurrentPhoneView('whatsapp')}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-slate-200 mt-1 font-medium">WhatsApp</span>
                </div>

                {/* 3. Restricted Game (Free Fire) */}
                <div
                  onClick={() => simulateChildAction('open_blocked_app')}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition relative">
                    <span className="text-xs font-black">FF</span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full border-2 border-black"></span>
                  </div>
                  <span className="text-[10px] text-rose-300 mt-1 font-bold">Free Fire</span>
                </div>

                {/* 4. Phone Dialer */}
                <div
                  onClick={() => setCurrentPhoneView('dialer')}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-slate-200 mt-1 font-medium">Phone</span>
                </div>
              </div>

              {/* Fast Action Triggers for Parent to test Admin Panel Live Response */}
              <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700/80 space-y-2 mt-4">
                <div className="flex items-center justify-between text-[11px] text-purple-300 font-bold">
                  <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Quick Event Generators</span>
                  <span className="text-[9px] text-slate-400">Live Test</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <button
                    onClick={() => simulateChildAction('incoming_sms')}
                    className="p-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium text-left truncate"
                  >
                    📩 Send Fake SMS
                  </button>
                  <button
                    onClick={() => simulateChildAction('outgoing_call')}
                    className="p-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium text-left truncate"
                  >
                    📞 Make Test Call
                  </button>
                  <button
                    onClick={() => simulateChildAction('movement_step')}
                    className="p-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium text-left truncate"
                  >
                    📍 Move GPS Location
                  </button>
                  <button
                    onClick={() => simulateChildAction('open_blocked_app')}
                    className="p-1.5 bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 rounded-lg font-medium text-left truncate border border-rose-500/40"
                  >
                    🚫 Trigger App Block
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* C. View 2: Camouflage Calculator */}
          {currentPhoneView === 'calculator' && (
            <div className="flex flex-col justify-between h-full py-1">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <CalcIcon className="w-3.5 h-3.5" />
                  <span>Stealth Calculator</span>
                </span>
                <span className="text-[9px] text-slate-400 font-mono">Tip: Type 9944=</span>
              </div>

              {calcUnlockedStealth ? (
                <div className="bg-slate-800/90 rounded-xl p-4 border border-purple-500/40 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center">
                    <EyeOff className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Stealth Agent Settings Revealed!</h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Master PIN 9944 recognized. Stealth daemon is active in background under process ID #4819.
                  </p>
                  <button
                    onClick={() => setCalcUnlockedStealth(false)}
                    className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold rounded-lg"
                  >
                    Hide Settings Back
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-black/80 rounded-xl p-3 text-right font-mono text-xl text-white overflow-hidden border border-slate-800 h-14 flex items-center justify-end">
                    {calcInput}
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
                    {['C', '(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((k) => (
                      <button
                        key={k}
                        onClick={() => handleCalcClick(k)}
                        className={`p-2.5 rounded-xl transition ${
                          k === '=' ? 'bg-amber-500 text-black col-span-2' :
                          ['/', '*', '-', '+', 'C'].includes(k) ? 'bg-slate-700 text-amber-400' :
                          'bg-slate-800 text-white hover:bg-slate-700'
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setCurrentPhoneView('home')}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] rounded-lg font-medium"
              >
                Back to Home Screen
              </button>
            </div>
          )}

          {/* D. View 3: Dialer */}
          {currentPhoneView === 'dialer' && (
            <div className="flex flex-col justify-between h-full py-1 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                  <span>Phone Dialer</span>
                </span>
                <button
                  onClick={() => setCurrentPhoneView('home')}
                  className="text-[10px] text-blue-400"
                >
                  Home
                </button>
              </div>

              <div className="bg-black/80 p-3 rounded-xl text-center font-mono text-base text-white border border-slate-800">
                +91 98110 44219
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((d) => (
                  <button key={d} className="p-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700">
                    {d}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  simulateChildAction('outgoing_call');
                  setCurrentPhoneView('home');
                }}
                className="w-full py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 shadow"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call (Simulate Wiretap)</span>
              </button>
            </div>
          )}

          {/* E. View 4: WhatsApp */}
          {currentPhoneView === 'whatsapp' && (
            <div className="flex flex-col justify-between h-full py-1 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </span>
                <button
                  onClick={() => setCurrentPhoneView('home')}
                  className="text-[10px] text-slate-400"
                >
                  Exit
                </button>
              </div>

              <div className="space-y-2 text-[11px] overflow-y-auto max-h-56 pr-1">
                <div className="bg-[#202c33] p-2 rounded-xl rounded-tl-none text-white max-w-[85%]">
                  Bhai physics assignment ready hai kya?
                  <span className="block text-[8px] text-slate-400 text-right mt-0.5">10:42 AM</span>
                </div>
                <div className="bg-[#005c4b] p-2 rounded-xl rounded-tr-none text-white max-w-[85%] ml-auto">
                  Ha maine portal pe submit kar diya hai.
                  <span className="block text-[8px] text-slate-300 text-right mt-0.5">10:44 AM ✓✓</span>
                </div>
              </div>

              <button
                onClick={() => {
                  simulateChildAction('incoming_sms');
                  setCurrentPhoneView('home');
                }}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
              >
                Simulate Receive New Threat Chat
              </button>
            </div>
          )}

          {/* Bottom Android Soft Navigation Bar */}
          <div className="flex items-center justify-center space-x-10 text-slate-500 pt-2 border-t border-slate-800">
            <button onClick={() => setCurrentPhoneView('home')} className="hover:text-white">
              <div className="w-3 h-3 border-2 border-current rotate-45"></div>
            </button>
            <button onClick={() => setCurrentPhoneView('home')} className="hover:text-white">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-current"></div>
            </button>
            <button onClick={() => setCurrentPhoneView('home')} className="hover:text-white">
              <div className="w-3 h-3 border-2 border-current"></div>
            </button>
          </div>
        </div>

        {/* Bottom Curved Home Bar */}
        <div className="h-4 bg-black flex items-center justify-center pb-1">
          <div className="w-24 h-1 bg-slate-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
