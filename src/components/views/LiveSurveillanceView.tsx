import React, { useState, useEffect, useRef } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  Camera,
  Mic,
  MonitorSmartphone,
  Video,
  VideoOff,
  MicOff,
  Flashlight,
  Moon,
  Sparkles,
  Play,
  Pause,
  Download,
  Trash2,
  Volume2,
  VolumeX,
  Radio,
  Sliders,
  Shield,
  CircleDot,
  RotateCcw,
  Layers,
  ArrowRightLeft,
  Maximize2,
  PhoneCall,
  Smartphone,
  Lock,
  Unlock
} from 'lucide-react';

export const LiveSurveillanceView: React.FC = () => {
  const {
    selectedDevice,
    isCameraActive,
    activeCameraLens,
    isFlashlightOn,
    isNightVisionOn,
    isRealWebcamInUse,
    isListeningLiveAudio,
    isAudioRecording,
    recordingSeconds,
    isScreenMirroringActive,
    audioRecordings,
    photos,
    toggleCameraStream,
    switchCameraLens,
    toggleFlashlight,
    toggleNightVision,
    toggleRealWebcam,
    captureRemotePhoto,
    toggleLiveAudioHearing,
    startAudioRecording,
    stopAudioRecording,
    toggleScreenMirroring,
    isScreenLocked,
    triggerEmergencyLock,
    unlockDevice
  } = useMonitoring();

  const [activeTab, setActiveTab] = useState<'camera' | 'audio' | 'screen' | 'vault'>('camera');
  const [micGain, setMicGain] = useState<number>(12); // dB
  const [cameraQuality, setCameraQuality] = useState<'1080p' | '720p' | '480p'>('1080p');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [simulatedScene, setSimulatedScene] = useState<'classroom' | 'bedroom' | 'transit'>('classroom');

  // Video element ref for real webcam test mode
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isRealWebcamInUse && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play().catch(console.error);
          }
        })
        .catch((err) => {
          console.warn('Real webcam error:', err);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [isRealWebcamInUse]);

  const sceneImages = {
    classroom: activeCameraLens === 'front' 
      ? 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200' 
      : 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1200',
    bedroom: activeCameraLens === 'front'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200'
      : 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    transit: activeCameraLens === 'front'
      ? 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200'
      : 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200'
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1e293b] p-4 rounded-2xl border border-slate-700/80">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-400 animate-pulse" />
              Live Remote Surveillance Suite
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-mono font-bold border border-red-500/20">
              Stealth Transmission
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Streaming from <span className="text-blue-400 font-semibold">{selectedDevice.childName}</span> without any notification on target phone.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700/80 text-xs">
          <button
            onClick={() => setActiveTab('camera')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'camera' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Camera ({isCameraActive ? 'LIVE' : 'Standby'})</span>
          </button>

          <button
            onClick={() => setActiveTab('audio')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'audio' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Live Audio ({isListeningLiveAudio ? 'ON' : 'Standby'})</span>
          </button>

          <button
            onClick={() => setActiveTab('screen')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'screen' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MonitorSmartphone className="w-3.5 h-3.5" />
            <span>Screen Mirror</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'vault' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Vault ({photos.length + audioRecordings.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: REMOTE LIVE CAMERA */}
      {activeTab === 'camera' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Viewport */}
          <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-700/80 p-5 flex flex-col justify-between shadow-xl">
            {/* Viewport Box */}
            <div className="relative w-full h-[420px] bg-black rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center group">
              {isCameraActive ? (
                <>
                  {isRealWebcamInUse ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover ${isNightVisionOn ? 'filter contrast-150 hue-rotate-90 brightness-110 saturate-200' : ''}`}
                    />
                  ) : (
                    <img
                      src={sceneImages[simulatedScene]}
                      alt="Remote Camera Feed"
                      className={`w-full h-full object-cover transition duration-300 ${
                        isNightVisionOn ? 'filter contrast-150 hue-rotate-90 brightness-125 saturate-200' : ''
                      }`}
                    />
                  )}

                  {/* Night Vision Tint Overlay */}
                  {isNightVisionOn && (
                    <div className="absolute inset-0 bg-emerald-950/30 mix-blend-color pointer-events-none border-4 border-emerald-500/20">
                      <div className="absolute top-3 left-3 text-[10px] font-mono text-emerald-400 font-bold bg-black/80 px-2 py-0.5 rounded border border-emerald-500/40">
                        IR NIGHT VISION (THERMAL ENHANCED)
                      </div>
                    </div>
                  )}

                  {/* Flashlight Active Glow simulation */}
                  {isFlashlightOn && (
                    <div className="absolute inset-0 bg-yellow-400/10 pointer-events-none flex items-center justify-center">
                      <div className="w-72 h-72 rounded-full bg-white/20 blur-3xl"></div>
                    </div>
                  )}

                  {/* Top Status Overlays */}
                  <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                    <span className="flex items-center space-x-1.5 px-2.5 py-1 bg-red-600/90 text-white text-[11px] font-bold rounded-lg shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                      <span>LIVE • {activeCameraLens.toUpperCase()} SENSOR</span>
                    </span>
                    <span className="px-2 py-1 bg-black/70 backdrop-blur-md text-slate-300 text-[10px] font-mono rounded-lg border border-slate-700">
                      {cameraQuality} • 60 FPS • Encrypted H.265
                    </span>
                  </div>

                  {/* Bottom Right Flash / Lens Badge */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center space-x-2">
                    {isFlashlightOn && (
                      <span className="px-2 py-1 bg-amber-500/80 text-black text-[10px] font-bold rounded-lg flex items-center gap-1">
                        <Flashlight className="w-3 h-3" /> Torch ON
                      </span>
                    )}
                    <button
                      onClick={() => captureRemotePhoto(activeCameraLens)}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center space-x-1.5 transition"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Take Snapshot</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Camera Standby Screen */
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shadow-inner">
                    <VideoOff className="w-8 h-8 text-slate-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Camera Standby (Off)</h3>
                    <p className="text-xs text-slate-400 max-w-sm mt-1">
                      Camera sensor on child&apos;s phone is currently idle to conserve battery. Click Start Stream to begin stealth feed.
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCameraStream(true)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center space-x-2 transition"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Live Stream</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Stream Controls Bar */}
            <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleCameraStream()}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
                    isCameraActive
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                      : 'bg-blue-600 text-white hover:bg-blue-500'
                  }`}
                >
                  {isCameraActive ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                  <span>{isCameraActive ? 'Stop Stream' : 'Start Stream'}</span>
                </button>

                <button
                  onClick={() => switchCameraLens(activeCameraLens === 'front' ? 'rear' : 'front')}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 text-blue-400" />
                  <span>Switch to {activeCameraLens === 'front' ? 'Rear' : 'Front'}</span>
                </button>

                <button
                  onClick={toggleNightVision}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center space-x-1.5 border transition ${
                    isNightVisionOn
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Night Vision</span>
                </button>

                <button
                  onClick={toggleFlashlight}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center space-x-1.5 border transition ${
                    isFlashlightOn
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  <Flashlight className="w-3.5 h-3.5" />
                  <span>Torch</span>
                </button>
              </div>

              {/* Resolution selector */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">Resolution:</span>
                {(['1080p', '720p', '480p'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setCameraQuality(q)}
                    className={`px-2 py-1 rounded text-[11px] font-mono ${
                      cameraQuality === q ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Simulated Camera Presets & Real Webcam Tester */}
          <div className="space-y-6">
            {/* Real Webcam Live Test Tool */}
            <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Physical Camera Test</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono">WebRTC</span>
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Want to test real video streaming right now? You can hook your browser&apos;s physical camera to test live parental surveillance!
              </p>
              <button
                onClick={toggleRealWebcam}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition ${
                  isRealWebcamInUse
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-md'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{isRealWebcamInUse ? 'Disconnect Physical Camera' : 'Hook Live Browser Webcam'}</span>
              </button>
            </div>

            {/* Simulated Live Location Scenes */}
            <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center justify-between">
                <span>Simulated Camera Scenes</span>
                <span className="text-[10px] text-slate-400">Environment</span>
              </h3>
              <div className="space-y-2">
                {[
                  { id: 'classroom', label: 'School Classroom (Current GPS)', desc: 'Mathura Rd, Delhi Public School' },
                  { id: 'bedroom', label: 'Home Study Room', desc: 'Desk facing window' },
                  { id: 'transit', label: 'School Bus Transit', desc: 'Moving at 34 km/h' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSimulatedScene(s.id as any)}
                    className={`w-full text-left p-2.5 rounded-xl border transition ${
                      simulatedScene === s.id
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <p className="text-xs font-semibold">{s.label}</p>
                    <p className="text-[10px] text-slate-400">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Stealth Blackout Mode Warning */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-purple-400 font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero Screen Wakeup Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                When camera or audio streaming is triggered, the child&apos;s phone screen remains completely dark and no camera shutter sound or LED indicator triggers on supported Android versions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE AUDIO WIRETAP */}
      {activeTab === 'audio' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between shadow-xl space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isListeningLiveAudio ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400'}`}>
                    <Mic className={`w-5 h-5 ${isListeningLiveAudio ? 'animate-pulse' : ''}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Live Acoustic Ambient Streaming</h3>
                    <p className="text-xs text-slate-400">
                      High-sensitivity binaural wiretap (24-bit PCM / 48kHz audio codec)
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  isListeningLiveAudio ? 'bg-blue-500/15 text-blue-300 border-blue-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {isListeningLiveAudio ? 'Live Stream Connected' : 'Muted'}
                </span>
              </div>

              {/* Animated Live Audio Waveform Box */}
              <div className="h-44 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">MIC 1 (Primary Ambient) + MIC 2 (Noise Cancellation)</span>
                  <span className="text-blue-400 font-mono">Gain: +{micGain}dB</span>
                </div>

                {/* Animated Frequency Bars */}
                <div className="flex items-end justify-center gap-1.5 h-24 my-auto px-4">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const randomHeight = isListeningLiveAudio 
                      ? Math.sin(i * 0.4 + Date.now() * 0.003) * 35 + 45 + (Math.random() * 20)
                      : 4;
                    return (
                      <div
                        key={i}
                        className={`w-1.5 rounded-full transition-all duration-75 ${
                          isListeningLiveAudio
                            ? i % 4 === 0 ? 'bg-cyan-400' : i % 2 === 0 ? 'bg-blue-500' : 'bg-indigo-400'
                            : 'bg-slate-800'
                        }`}
                        style={{ height: `${Math.max(4, Math.min(100, randomHeight))}%` }}
                      ></div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>20 Hz</span>
                  <span>1 kHz</span>
                  <span>8 kHz</span>
                  <span>20 kHz</span>
                </div>
              </div>
            </div>

            {/* Audio Controls & Recording Bar */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold text-slate-200">Ambient Noise Booster (Gain):</span>
                </div>
                <div className="flex items-center space-x-3 w-48">
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={micGain}
                    onChange={(e) => setMicGain(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-white font-bold w-12 text-right">+{micGain} dB</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleLiveAudioHearing()}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
                      isListeningLiveAudio
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 hover:bg-blue-500/30'
                        : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg'
                    }`}
                  >
                    {isListeningLiveAudio ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isListeningLiveAudio ? 'Stop Hearing' : 'Start Live Hearing'}</span>
                  </button>

                  {isAudioRecording ? (
                    <button
                      onClick={stopAudioRecording}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 animate-pulse shadow-lg shadow-rose-600/30"
                    >
                      <CircleDot className="w-4 h-4" />
                      <span>Stop & Save Recording ({recordingSeconds}s)</span>
                    </button>
                  ) : (
                    <button
                      onClick={startAudioRecording}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 rounded-xl text-xs font-bold flex items-center space-x-2 transition"
                    >
                      <CircleDot className="w-4 h-4 text-rose-500" />
                      <span>Record Surrounding Audio</span>
                    </button>
                  )}
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  AES-256 Storage • Voice Clarity Boost Enabled
                </span>
              </div>
            </div>
          </div>

          {/* Right Col: Audio Recordings Vault List */}
          <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col h-[460px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Captured Audio Wiretaps ({audioRecordings.length})</span>
              </h3>
            </div>

            <div className="flex-1 space-y-2.5 overflow-y-auto pr-1 custom-scrollbar">
              {audioRecordings.map((rec) => {
                const isPlaying = playingAudioId === rec.id;
                return (
                  <div
                    key={rec.id}
                    className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 hover:bg-slate-800 transition flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{rec.title}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                        <span>{rec.timestamp}</span>
                        <span>•</span>
                        <span className="text-blue-400">{rec.durationSeconds}s</span>
                        <span>•</span>
                        <span>{(rec.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setPlayingAudioId(isPlaying ? null : rec.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition ${
                        isPlaying
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="text-[10px] text-slate-500 text-center mt-3">
              Recordings are encrypted end-to-end and stored securely.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: SCREEN MIRRORING */}
      {activeTab === 'screen' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Virtual Interactive Mirror Phone Screen */}
          <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-700/80 p-6 flex flex-col items-center justify-center shadow-xl">
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MonitorSmartphone className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Live Screen Projection</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-bold">
                  60 FPS Mirror
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleScreenMirroring()}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    isScreenMirroringActive
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-purple-600 text-white hover:bg-purple-500'
                  }`}
                >
                  {isScreenMirroringActive ? 'Stop Mirror' : 'Start Mirror'}
                </button>
              </div>
            </div>

            {/* Phone Screen Mockup Frame */}
            <div className="w-[300px] h-[580px] bg-slate-950 rounded-[38px] border-4 border-slate-700 shadow-2xl overflow-hidden relative flex flex-col justify-between">
              {/* Notch / Dynamic Island */}
              <div className="h-6 bg-black flex items-center justify-between px-5 text-[10px] text-slate-400 font-mono select-none pt-1">
                <span>10:45</span>
                <div className="w-16 h-3.5 bg-slate-900 rounded-full border border-slate-800"></div>
                <div className="flex items-center space-x-1">
                  <span>5G</span>
                  <span className="text-emerald-400">86%</span>
                </div>
              </div>

              {/* Screen Body */}
              <div className="flex-1 bg-slate-900 relative overflow-hidden flex flex-col justify-between p-4">
                {isScreenLocked || selectedDevice.isDeviceLocked ? (
                  <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 animate-pulse">
                      <Lock className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Device Locked by Parent</h4>
                      <p className="text-xs text-rose-300 mt-1 leading-relaxed font-medium">
                        {selectedDevice.lockMessage || 'Parental supervision active. Contact admin to unlock.'}
                      </p>
                    </div>
                    <button
                      onClick={unlockDevice}
                      className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                    >
                      Emergency Parent Unlock
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Simulated Active App Screen on Child Device */}
                    <div className="space-y-4">
                      {/* Active WhatsApp Chat simulation */}
                      <div className="bg-[#0b141a] rounded-2xl p-3 border border-slate-800 text-xs text-white space-y-2.5">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">
                              S
                            </div>
                            <span className="font-semibold text-[11px]">Samir (Study Group)</span>
                          </div>
                          <span className="text-[9px] text-emerald-400">Online</span>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-[#202c33] p-2 rounded-xl rounded-tl-none max-w-[85%] text-[11px]">
                            Bhai physics assignment ready hai kya?
                            <span className="block text-[8px] text-slate-400 text-right mt-0.5">10:42 AM</span>
                          </div>
                          <div className="bg-[#005c4b] p-2 rounded-xl rounded-tr-none max-w-[85%] ml-auto text-[11px]">
                            Ha maine portal pe submit kar diya hai.
                            <span className="block text-[8px] text-slate-300 text-right mt-0.5">10:44 AM ✓✓</span>
                          </div>
                        </div>
                      </div>

                      {/* App Launcher grid */}
                      <div className="grid grid-cols-4 gap-2 text-center pt-4">
                        {[
                          { name: 'Classroom', color: 'bg-emerald-600' },
                          { name: 'YouTube', color: 'bg-red-600' },
                          { name: 'Chrome', color: 'bg-blue-600' },
                          { name: 'Calculator', color: 'bg-amber-600', note: 'Stealth' }
                        ].map((a, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                              {a.name.charAt(0)}
                            </div>
                            <span className="text-[9px] text-slate-300 mt-1 truncate">{a.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Nav bar simulation */}
                    <div className="flex items-center justify-center space-x-8 text-slate-400 pt-2 border-t border-slate-800">
                      <div className="w-3 h-3 border-2 border-slate-400 rotate-45"></div>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400"></div>
                      <div className="w-3 h-3 border-2 border-slate-400"></div>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Home Indicator */}
              <div className="h-4 bg-black flex items-center justify-center pb-1">
                <div className="w-24 h-1 bg-slate-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Col: Remote Screen Controls */}
          <div className="space-y-6">
            <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg space-y-4">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                <span>Remote Screen Actions</span>
              </h3>

              <div className="space-y-2.5">
                <button
                  onClick={() => triggerEmergencyLock()}
                  className="w-full py-2.5 px-3 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition"
                >
                  <Lock className="w-4 h-4 text-rose-400" />
                  <span>Instant Lock Screen Overlay</span>
                </button>

                <button
                  onClick={() => unlockDevice()}
                  className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition"
                >
                  <Unlock className="w-4 h-4 text-emerald-400" />
                  <span>Release Lock Screen</span>
                </button>

                <button
                  onClick={() => captureRemotePhoto('front')}
                  className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition"
                >
                  <Camera className="w-4 h-4 text-blue-400" />
                  <span>Capture Silent Screenshot</span>
                </button>
              </div>
            </div>

            <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg text-xs space-y-3">
              <h4 className="font-bold text-white">Screen Mirror Diagnostics</h4>
              <div className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Resolution:</span>
                  <span>1080 x 2400 (FHD+)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bitrate:</span>
                  <span className="text-emerald-400">4.2 Mbps (Low Latency)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Encoding:</span>
                  <span>VP9 Hardware Accelerated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PHOTO & AUDIO VAULT */}
      {activeTab === 'vault' && (
        <div className="space-y-6">
          <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/80 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" />
              <span>Captured Snapshots Gallery ({photos.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((p) => (
                <div key={p.id} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 group shadow-md">
                  <div className="h-44 w-full relative overflow-hidden bg-black">
                    <img
                      src={p.imageUrl}
                      alt="Captured snapshot"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white border border-slate-700">
                      {p.camera.toUpperCase()} SENSOR
                    </span>
                  </div>
                  <div className="p-3 text-xs flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-200 capitalize">{p.trigger.replace('_', ' ')}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{p.timestamp}</p>
                    </div>
                    <a
                      href={p.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg"
                      title="Open full image"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
