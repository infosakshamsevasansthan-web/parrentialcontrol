import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  MapPin,
  Navigation,
  Shield,
  Clock,
  Battery,
  Layers,
  Plus,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Compass,
  AlertTriangle,
  CheckCircle2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { LOCATION_HISTORY_POINTS } from '../../data/mockData';

export const LiveTrackingView: React.FC = () => {
  const {
    selectedDevice,
    geofences,
    addGeofence,
    deleteGeofence,
    simulateChildAction
  } = useMonitoring();

  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isPlayingHistory, setIsPlayingHistory] = useState<boolean>(false);
  const [showAddZoneModal, setShowAddZoneModal] = useState<boolean>(false);
  const [newZoneName, setNewZoneName] = useState<string>('');
  const [newZoneType, setNewZoneType] = useState<'safe' | 'restricted'>('safe');
  const [newZoneRadius, setNewZoneRadius] = useState<number>(350);

  const historyPoints = LOCATION_HISTORY_POINTS[selectedDevice.id] || [selectedDevice.currentLocation];

  const handleCreateZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName.trim()) return;
    addGeofence({
      name: newZoneName,
      type: newZoneType,
      latitude: selectedDevice.currentLocation.latitude,
      longitude: selectedDevice.currentLocation.longitude,
      radiusMeters: newZoneRadius,
      alertOnEntry: true,
      alertOnExit: true,
      color: newZoneType === 'safe' ? '#10b981' : '#ef4444'
    });
    setNewZoneName('');
    setShowAddZoneModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1e293b] p-4 rounded-2xl border border-slate-700/80">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-400" />
              High-Precision Real-Time GPS Tracking
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
              Accuracy: {selectedDevice.currentLocation.accuracyMeters}m
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Active tracking for <span className="text-blue-400 font-semibold">{selectedDevice.childName}</span> • Update rate: every 10 seconds.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => simulateChildAction('movement_step')}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Simulate GPS Move</span>
          </button>
          <button
            onClick={() => setShowAddZoneModal(true)}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Geofence</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Map Canvas + Geofence & Route History Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive GPS Map Canvas */}
        <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-700/80 p-5 shadow-xl flex flex-col space-y-4">
          <div className="h-[480px] w-full bg-[#090d16] rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center select-none">
            {/* SVG Dark Satellite/Street Vector Map */}
            <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern-lg" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern-lg)" />
              {/* Main Arterial Expressways */}
              <path d="M -20 280 Q 250 180 500 320 T 980 140" fill="none" stroke="#3b82f6" strokeWidth="8" strokeOpacity="0.6" />
              <path d="M 180 -50 Q 300 240 420 540" fill="none" stroke="#475569" strokeWidth="6" />
              <path d="M 520 -50 L 560 540" fill="none" stroke="#334155" strokeWidth="4" />
              {/* Route History Breadcrumb Line */}
              <path d="M 220 340 L 320 270 L 460 230 L 500 180" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="8,8" />
            </svg>

            {/* Render Geofences on Map */}
            {geofences.map((geo, idx) => (
              <div
                key={geo.id}
                className="absolute rounded-full pointer-events-none flex items-center justify-center animate-pulse"
                style={{
                  top: `${40 + idx * 18}%`,
                  left: `${42 + (idx % 2 === 0 ? -12 : 16)}%`,
                  width: `${geo.radiusMeters * 0.4}px`,
                  height: `${geo.radiusMeters * 0.4}px`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: `${geo.color}15`,
                  border: `2px dashed ${geo.color}`
                }}
              >
                <span
                  className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/80 border shadow-md"
                  style={{ color: geo.color, borderColor: `${geo.color}60` }}
                >
                  {geo.name}
                </span>
              </div>
            ))}

            {/* Breadcrumb Historical Points */}
            <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400/40 flex items-center justify-center border border-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
            </div>
            <div className="absolute top-[56%] left-[32%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400/40 flex items-center justify-center border border-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
            </div>

            {/* Active Target GPS Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <div className="relative">
                <span className="absolute -inset-3 rounded-full bg-blue-500/40 animate-ping"></span>
                <span className="absolute -inset-6 rounded-full bg-blue-500/20 animate-pulse"></span>
                <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-white shadow-2xl shadow-blue-500 flex items-center justify-center text-white">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-2 bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full border border-blue-500/50 text-xs font-bold text-white shadow-xl flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{selectedDevice.childName} (Speed: {selectedDevice.currentLocation.speedKmh} km/h)</span>
              </div>
            </div>

            {/* Top Left GPS Diagnostics Widget */}
            <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 shadow-lg text-xs space-y-1">
              <div className="flex items-center space-x-1.5 text-blue-400 font-bold">
                <Navigation className="w-3.5 h-3.5" />
                <span>Live Satellite Fix</span>
              </div>
              <p className="font-mono text-white text-xs">
                {selectedDevice.currentLocation.latitude.toFixed(5)}° N, {selectedDevice.currentLocation.longitude.toFixed(5)}° E
              </p>
              <p className="text-slate-400 text-[10px]">
                Satellites Locked: 14 • Altitude: 218m ASL
              </p>
            </div>

            {/* Bottom Floating Address Bar */}
            <div className="absolute bottom-4 inset-x-4 z-10 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {selectedDevice.currentLocation.placeName}
                </p>
                <p className="text-[11px] text-slate-300 truncate">
                  {selectedDevice.currentLocation.address}
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono shrink-0">
                Updated {selectedDevice.currentLocation.timestamp}
              </span>
            </div>
          </div>

          {/* 24-Hour Route Playback Timeline Scrubber */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-white font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>24-Hour Route Playback Timeline</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">
                Point {historyIndex + 1} of {historyPoints.length} ({historyPoints[historyIndex]?.timestamp || '10:45 AM'})
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={historyPoints.length - 1}
              value={historyIndex}
              onChange={(e) => setHistoryIndex(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>07:15 AM (Home Departure)</span>
              <span>09:30 AM (Science Lab)</span>
              <span>10:45 AM (Current DPS Gate)</span>
            </div>
          </div>
        </div>

        {/* Right Col: Geofence Zones & Route History Log */}
        <div className="space-y-6">
          {/* Geofence Perimeter Zones List */}
          <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Active Geofence Zones ({geofences.length})</span>
              </h3>
              <button
                onClick={() => setShowAddZoneModal(true)}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold"
              >
                + Add Zone
              </button>
            </div>

            <div className="space-y-2.5">
              {geofences.map((geo) => (
                <div
                  key={geo.id}
                  className="p-3 bg-slate-800/70 rounded-xl border border-slate-700/60 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${geo.type === 'safe' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                      <p className="text-xs font-bold text-white truncate">{geo.name}</p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Radius: {geo.radiusMeters}m • Alerts: {geo.alertOnEntry ? 'Entry' : ''} {geo.alertOnExit ? '& Exit' : ''}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteGeofence(geo.id)}
                    className="p-1 text-slate-400 hover:text-rose-400 transition"
                    title="Delete zone"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Location Timeline Breadcrumbs */}
          <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Today&apos;s Stopovers & Trip History</span>
            </h3>

            <div className="space-y-3 pt-2">
              {historyPoints.map((pt, i) => (
                <div key={i} className="flex items-start space-x-3 text-xs">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-blue-500 ring-4 ring-blue-500/20' : 'bg-slate-600'}`}></div>
                    {i < historyPoints.length - 1 && <div className="w-0.5 h-8 bg-slate-700 my-0.5"></div>}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white truncate">{pt.placeName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{pt.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{pt.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Creating New Geofence */}
      {showAddZoneModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span>Add New Geofence Perimeter</span>
            </h3>
            <form onSubmit={handleCreateZone} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Zone Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tuition Classes, Grandparents Home"
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Zone Category</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewZoneType('safe')}
                    className={`py-2 rounded-xl font-bold border transition ${
                      newZoneType === 'safe' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Safe Zone (Green)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewZoneType('restricted')}
                    className={`py-2 rounded-xl font-bold border transition ${
                      newZoneType === 'restricted' ? 'bg-rose-500/20 text-rose-400 border-rose-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Restricted Danger Zone
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Radius: {newZoneRadius} meters</label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={newZoneRadius}
                  onChange={(e) => setNewZoneRadius(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddZoneModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Save Geofence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
