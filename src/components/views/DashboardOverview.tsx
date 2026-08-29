import React from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import { NavTab } from '../Sidebar';
import {
  MapPin,
  Camera,
  Mic,
  MonitorSmartphone,
  ShieldAlert,
  Clock,
  Battery,
  HardDrive,
  Cpu,
  Wifi,
  Radio,
  EyeOff,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Lock,
  ChevronRight
} from 'lucide-react';

interface DashboardOverviewProps {
  setActiveTab?: (tab: NavTab) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = (props) => {
  const {
    selectedDevice,
    toggleCameraStream,
    toggleLiveAudioHearing,
    toggleScreenMirroring,
    captureRemotePhoto,
    setShowEmergencyLockModal,
    activityLogs,
    appUsage,
    isCameraActive,
    isListeningLiveAudio,
    isScreenMirroringActive,
    setShowChildSimulator,
    setActiveTab: contextSetActiveTab
  } = useMonitoring();

  const setActiveTab = props.setActiveTab || contextSetActiveTab;

  // Filter today's app usage top 4
  const topApps = [...appUsage].sort((a, b) => b.usedMinutesToday - a.usedMinutesToday).slice(0, 4);
  const totalScreenTimeHours = Math.floor(selectedDevice.screenTimeTodayMinutes / 60);
  const totalScreenTimeMins = selectedDevice.screenTimeTodayMinutes % 60;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Alert if threat exists */}
      <div className="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-800 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">Threat Alert: Restricted Meeting Keyword Flagged</h3>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-semibold uppercase">High Priority</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              SMS received mentioning &quot;bunk period 4 and go to arcade&quot; from +91 91200 45892.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('messages')}
          className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold rounded-xl flex items-center space-x-1 transition shrink-0"
        >
          <span>Inspect Messages</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Grid: Location Card + Control Center + Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Real-Time Map & Quick Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Location Visualizer Card */}
          <div className="bg-slate-800/60 rounded-2xl border border-slate-700/80 overflow-hidden relative shadow-xl">
            {/* Interactive Dark Grid Map Simulation Background */}
            <div className="h-72 w-full relative bg-[#090d16] overflow-hidden">
              {/* SVG Map Grid Lines & Streets */}
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                {/* Simulated Road Paths */}
                <path d="M -50 180 Q 200 120 400 220 T 900 100" fill="none" stroke="#2563eb" strokeWidth="6" strokeOpacity="0.4" />
                <path d="M 120 -20 Q 240 180 320 320" fill="none" stroke="#475569" strokeWidth="4" />
                <path d="M 380 -20 L 410 320" fill="none" stroke="#475569" strokeWidth="3" />
                <path d="M -20 90 L 900 160" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6,6" strokeOpacity="0.5" />
              </svg>

              {/* Geofence Safe Zone Circle on Map */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 pointer-events-none flex items-center justify-center animate-pulse">
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-slate-900/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Safe Zone: 300m
                </span>
              </div>

              {/* Live Target Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative">
                  <span className="absolute -inset-2 rounded-full bg-blue-500/40 animate-ping"></span>
                  <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow-xl shadow-blue-500/50 flex items-center justify-center text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-1 bg-slate-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-blue-500/40 text-[10px] font-semibold text-white shadow-md">
                  {selectedDevice.childName.split(' ')[0]} (Live 2.8m)
                </div>
              </div>

              {/* Top Left Floating Coordinate Card */}
              <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/80 shadow-lg">
                <div className="flex items-center space-x-1.5 text-xs text-blue-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span>GPS Telemetry</span>
                </div>
                <p className="text-xs font-mono text-white mt-1">
                  {selectedDevice.currentLocation.latitude.toFixed(4)}° N, {selectedDevice.currentLocation.longitude.toFixed(4)}° E
                </p>
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-1">
                  <span className="text-emerald-400 font-medium">Battery: {selectedDevice.batteryLevel}%</span>
                  <span>•</span>
                  <span>Speed: {selectedDevice.currentLocation.speedKmh} km/h</span>
                </div>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-4 flex items-end justify-between z-10">
                <div className="max-w-[70%]">
                  <h4 className="text-base font-bold text-white truncate">
                    {selectedDevice.currentLocation.placeName}
                  </h4>
                  <p className="text-xs text-slate-300 truncate">
                    {selectedDevice.currentLocation.address}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-lg shadow-blue-600/30 shrink-0"
                >
                  <span>Full Map & History</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Surveillance & Controls Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Live Control Hub Card */}
            <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-blue-400" />
                  <span>Live Remote Command Hub</span>
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Silent Execution</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    toggleCameraStream(!isCameraActive);
                    setActiveTab('surveillance');
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-xs gap-2 transition group ${
                    isCameraActive
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-md shadow-rose-500/20'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Camera className={`w-5 h-5 ${isCameraActive ? 'text-rose-400 animate-pulse' : 'text-rose-400 group-hover:scale-110 transition'}`} />
                  <span className="font-semibold">{isCameraActive ? 'Live Camera (ON)' : 'Camera Live'}</span>
                </button>

                <button
                  onClick={() => {
                    toggleLiveAudioHearing(!isListeningLiveAudio);
                    setActiveTab('surveillance');
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-xs gap-2 transition group ${
                    isListeningLiveAudio
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-md shadow-blue-500/20'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Mic className={`w-5 h-5 ${isListeningLiveAudio ? 'text-blue-400 animate-pulse' : 'text-blue-400 group-hover:scale-110 transition'}`} />
                  <span className="font-semibold">{isListeningLiveAudio ? 'Mic Listening (ON)' : 'Listen Live'}</span>
                </button>

                <button
                  onClick={() => {
                    toggleScreenMirroring(!isScreenMirroringActive);
                    setActiveTab('surveillance');
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-xs gap-2 transition group ${
                    isScreenMirroringActive
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-md shadow-purple-500/20'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <MonitorSmartphone className={`w-5 h-5 ${isScreenMirroringActive ? 'text-purple-400 animate-pulse' : 'text-purple-400 group-hover:scale-110 transition'}`} />
                  <span className="font-semibold">{isScreenMirroringActive ? 'Screen Mirror (ON)' : 'Mirror Screen'}</span>
                </button>

                <button
                  onClick={() => setShowEmergencyLockModal(true)}
                  className="flex flex-col items-center justify-center p-3.5 bg-slate-800/80 rounded-xl hover:bg-slate-700 border border-slate-700 text-xs gap-2 transition group text-slate-300 hover:text-white"
                >
                  <Lock className="w-5 h-5 text-amber-400 group-hover:scale-110 transition" />
                  <span className="font-semibold">Lockdown Phone</span>
                </button>
              </div>

              {/* Silent snapshot shortcut */}
              <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Silent Photo Capture:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => captureRemotePhoto('front')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] rounded-lg border border-slate-700 font-medium transition"
                  >
                    Front Cam
                  </button>
                  <button
                    onClick={() => captureRemotePhoto('rear')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] rounded-lg border border-slate-700 font-medium transition"
                  >
                    Rear Cam
                  </button>
                </div>
              </div>
            </div>

            {/* App Usage Analytics Card */}
            <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-pink-400" />
                    <span>Today&apos;s Screen Time ({totalScreenTimeHours}h {totalScreenTimeMins}m)</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('apps')}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Manage Limits
                  </button>
                </div>

                <div className="space-y-3 mt-3">
                  {topApps.map((app) => {
                    const percentage = Math.min(100, Math.round((app.usedMinutesToday / (app.dailyLimitMinutes || 120)) * 100));
                    const isOverLimit = app.dailyLimitMinutes && app.usedMinutesToday >= app.dailyLimitMinutes;
                    return (
                      <div key={app.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 font-medium text-slate-200">
                            <span className={`w-2 h-2 rounded-full ${app.isBlocked ? 'bg-rose-500' : 'bg-blue-400'}`}></span>
                            {app.appName}
                            {app.isBlocked && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-bold">
                                BLOCKED
                              </span>
                            )}
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">
                            {Math.floor(app.usedMinutesToday / 60)}h {app.usedMinutesToday % 60}m
                            {app.dailyLimitMinutes && ` / ${app.dailyLimitMinutes}m`}
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              app.isBlocked || isOverLimit ? 'bg-rose-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>Bedtime curfew active at 10:00 PM</span>
                <span className="text-emerald-400 font-medium">Auto-Lock Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Live Activity Stream & Phone Hardware Telemetry */}
        <div className="space-y-6">
          {/* Live Activity Logs Feed */}
          <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
                <span>Instant Activity Stream</span>
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Live stream active"></span>
            </div>

            <div className="flex-1 space-y-3.5 overflow-y-auto pr-1 custom-scrollbar">
              {activityLogs.slice(0, 7).map((log) => {
                const borderColor = 
                  log.severity === 'critical' ? 'border-rose-500 bg-rose-500/5' :
                  log.severity === 'warning' ? 'border-amber-500 bg-amber-500/5' :
                  log.severity === 'success' ? 'border-emerald-500 bg-emerald-500/5' :
                  'border-blue-500 bg-blue-500/5';

                return (
                  <div
                    key={log.id}
                    className={`flex flex-col border-l-2 ${borderColor} pl-3.5 py-1.5 rounded-r-lg transition`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-white truncate max-w-[70%]">
                        {log.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
                      {log.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveTab('security')}
              className="w-full py-2.5 mt-3 text-xs font-bold text-blue-400 hover:text-blue-300 border border-blue-400/20 rounded-xl bg-blue-400/5 hover:bg-blue-400/10 transition text-center"
            >
              View Full Security & Audit Log
            </button>
          </div>

          {/* Child Phone Hardware & Stealth Telemetry */}
          <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-4 flex items-center justify-between">
              <span>Stealth Daemon & Diagnostics</span>
              <span className="text-[10px] text-emerald-400 font-mono">0.8% Battery/Hr</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                <p className="text-[10px] text-slate-400 font-medium">Memory (RAM)</p>
                <p className="text-sm font-bold text-white mt-1">
                  {(selectedDevice.ramUsage.usedMb / 1024).toFixed(1)} / {(selectedDevice.ramUsage.totalMb / 1024).toFixed(0)} GB
                </p>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                  <div
                    className="bg-blue-400 h-1 rounded-full"
                    style={{ width: `${(selectedDevice.ramUsage.usedMb / selectedDevice.ramUsage.totalMb) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                <p className="text-[10px] text-slate-400 font-medium">Storage Space</p>
                <p className="text-sm font-bold text-white mt-1">
                  {selectedDevice.storageUsage.usedGb} / {selectedDevice.storageUsage.totalGb} GB
                </p>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                  <div
                    className="bg-purple-400 h-1 rounded-full"
                    style={{ width: `${(selectedDevice.storageUsage.usedGb / selectedDevice.storageUsage.totalGb) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                <p className="text-[10px] text-slate-400 font-medium">Stealth Camouflage</p>
                <p className="text-xs font-semibold text-emerald-400 mt-1 capitalize">
                  {selectedDevice.stealthDisguise.replace('_', ' ')}
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5">Icon Undetectable</p>
              </div>

              <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                <p className="text-[10px] text-slate-400 font-medium">Heartbeat Sync</p>
                <p className="text-xs font-semibold text-white mt-1">
                  Active
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5">{selectedDevice.lastPing}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
