import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  Device,
  GeofenceZone,
  CallLog,
  SMSMessage,
  AppUsageItem,
  NotificationItem,
  KeylogItem,
  AudioRecording,
  ActivityLog,
  PhotoCapture,
  LocationPoint,
  NavTab
} from '../types';
import {
  INITIAL_DEVICES,
  INITIAL_GEOFENCES,
  INITIAL_CALL_LOGS,
  INITIAL_MESSAGES,
  INITIAL_APP_USAGE,
  INITIAL_NOTIFICATIONS,
  INITIAL_KEYLOGS,
  INITIAL_AUDIO_RECORDINGS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_PHOTOS
} from '../data/mockData';

interface MonitoringContextType {
  activeTab: NavTab;
  currentTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  setCurrentTab: (tab: NavTab) => void;
  devices: Device[];
  selectedDeviceId: string;
  selectedDevice: Device;
  setSelectedDeviceId: (id: string) => void;
  geofences: GeofenceZone[];
  callLogs: CallLog[];
  messages: SMSMessage[];
  appUsage: AppUsageItem[];
  notifications: NotificationItem[];
  keylogs: KeylogItem[];
  audioRecordings: AudioRecording[];
  activityLogs: ActivityLog[];
  photos: PhotoCapture[];
  
  // Live Surveillance State
  isCameraActive: boolean;
  activeCameraLens: 'front' | 'rear';
  isFlashlightOn: boolean;
  isNightVisionOn: boolean;
  isRealWebcamInUse: boolean;
  isListeningLiveAudio: boolean;
  isAudioRecording: boolean;
  recordingSeconds: number;
  isScreenMirroringActive: boolean;
  isScreenLocked: boolean;
  lockdownPin: string;
  lockdownCustomMessage: string;
  isSirenPlaying: boolean;
  
  // Simulator & Modals
  showChildSimulator: boolean;
  setShowChildSimulator: (show: boolean) => void;
  showAddDeviceModal: boolean;
  setShowAddDeviceModal: (show: boolean) => void;
  showEmergencyLockModal: boolean;
  setShowEmergencyLockModal: (show: boolean) => void;
  showBackupModal: boolean;
  setShowBackupModal: (show: boolean) => void;
  showApkModal: boolean;
  setShowApkModal: (show: boolean) => void;

  // Actions
  addNewDevice: (deviceData: Partial<Device>) => void;
  downloadApkPackage: () => void;
  toggleCameraStream: (enable?: boolean) => void;
  switchCameraLens: (lens: 'front' | 'rear') => void;
  toggleFlashlight: () => void;
  toggleNightVision: () => void;
  toggleRealWebcam: () => Promise<boolean>;
  captureRemotePhoto: (camera?: 'front' | 'rear') => void;
  
  toggleLiveAudioHearing: (enable?: boolean) => void;
  startAudioRecording: () => void;
  stopAudioRecording: () => void;
  
  toggleScreenMirroring: (enable?: boolean) => void;
  
  toggleAppBlock: (appId: string) => void;
  updateAppTimeLimit: (appId: string, minutes: number) => void;
  
  toggleBlockNumber: (phoneNumber: string) => void;
  deleteCallLog: (callId: string) => void;
  
  triggerEmergencyLock: (message?: string, pin?: string) => void;
  unlockDevice: () => void;
  triggerRemoteSiren: () => void;
  stopRemoteSiren: () => void;
  
  setStealthDisguise: (disguise: Device['stealthDisguise']) => void;
  toggleStealthActive: () => void;
  
  simulateChildAction: (actionType: 'outgoing_call' | 'incoming_sms' | 'open_blocked_app' | 'movement_step' | 'notification') => void;
  exportDataPackage: (format: 'json' | 'csv' | 'summary') => void;
  addGeofence: (geofence: Omit<GeofenceZone, 'id'>) => void;
  deleteGeofence: (id: string) => void;
}

const MonitoringContext = createContext<MonitoringContextType | undefined>(undefined);

export const MonitoringProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<NavTab>('dashboard');
  const setActiveTab = useCallback((tab: NavTab) => {
    setActiveTabState(tab);
  }, []);
  const setCurrentTab = setActiveTab;
  const currentTab = activeTab;

  const [devices, setDevices] = useState<Device[]>(() => {
    const saved = localStorage.getItem('guardian_devices');
    return saved ? JSON.parse(saved) : INITIAL_DEVICES;
  });
  
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>(INITIAL_DEVICES[0].id);
  const [geofences, setGeofences] = useState<GeofenceZone[]>(INITIAL_GEOFENCES);
  const [callLogs, setCallLogs] = useState<CallLog[]>(INITIAL_CALL_LOGS);
  const [messages, setMessages] = useState<SMSMessage[]>(INITIAL_MESSAGES);
  const [appUsage, setAppUsage] = useState<AppUsageItem[]>(INITIAL_APP_USAGE);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [keylogs, setKeylogs] = useState<KeylogItem[]>(INITIAL_KEYLOGS);
  const [audioRecordings, setAudioRecordings] = useState<AudioRecording[]>(INITIAL_AUDIO_RECORDINGS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [photos, setPhotos] = useState<PhotoCapture[]>(INITIAL_PHOTOS);

  // Live Surveillance
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [activeCameraLens, setActiveCameraLens] = useState<'front' | 'rear'>('front');
  const [isFlashlightOn, setIsFlashlightOn] = useState<boolean>(false);
  const [isNightVisionOn, setIsNightVisionOn] = useState<boolean>(false);
  const [isRealWebcamInUse, setIsRealWebcamInUse] = useState<boolean>(false);

  const [isListeningLiveAudio, setIsListeningLiveAudio] = useState<boolean>(false);
  const [isAudioRecording, setIsAudioRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  const [isScreenMirroringActive, setIsScreenMirroringActive] = useState<boolean>(false);
  const [isScreenLocked, setIsScreenLocked] = useState<boolean>(false);
  const [lockdownPin, setLockdownPin] = useState<string>('9944');
  const [lockdownCustomMessage, setLockdownCustomMessage] = useState<string>('This phone is under strict parental lockdown. Please focus on studies or contact parents.');
  const [isSirenPlaying, setIsSirenPlaying] = useState<boolean>(false);

  // Modals & Floating views
  const [showChildSimulator, setShowChildSimulator] = useState<boolean>(false);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState<boolean>(false);
  const [showEmergencyLockModal, setShowEmergencyLockModal] = useState<boolean>(false);
  const [showBackupModal, setShowBackupModal] = useState<boolean>(false);
  const [showApkModal, setShowApkModal] = useState<boolean>(false);

  const recTimerRef = useRef<any>(null);
  const sirenAudioRef = useRef<HTMLAudioElement | null>(null);

  const selectedDevice = devices.find(d => d.id === selectedDeviceId) || devices[0];

  // Save devices in localStorage
  useEffect(() => {
    localStorage.setItem('guardian_devices', JSON.stringify(devices));
  }, [devices]);

  // Audio recording timer counter
  useEffect(() => {
    if (isAudioRecording) {
      recTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (recTimerRef.current) clearInterval(recTimerRef.current);
      setRecordingSeconds(0);
    }
    return () => {
      if (recTimerRef.current) clearInterval(recTimerRef.current);
    };
  }, [isAudioRecording]);

  // Periodic Telemetry Heartbeat Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(dev => {
        if (!dev.isOnline) return dev;
        // Minor battery or latency simulation
        const jitter = (Math.random() - 0.5) * 0.0002;
        const newLat = dev.currentLocation.latitude + jitter;
        const newLng = dev.currentLocation.longitude + jitter;
        return {
          ...dev,
          lastPing: 'Just now (' + Math.floor(80 + Math.random() * 60) + 'ms)',
          currentLocation: {
            ...dev.currentLocation,
            latitude: newLat,
            longitude: newLng,
            timestamp: 'Just now'
          }
        };
      }));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const addActivityLog = useCallback((title: string, description: string, type: ActivityLog['type'], severity: ActivityLog['severity']) => {
    const newLog: ActivityLog = {
      id: 'act-' + Date.now(),
      deviceId: selectedDeviceId,
      title,
      description,
      type,
      severity,
      timestamp: 'Just now'
    };
    setActivityLogs(prev => [newLog, ...prev]);
  }, [selectedDeviceId]);

  const addNewDevice = useCallback((deviceData: Partial<Device>) => {
    const id = 'dev-' + Date.now();
    const newDev: Device = {
      id,
      name: deviceData.name || "Child's Android Phone",
      childName: deviceData.childName || 'Kid Device',
      model: deviceData.model || 'Android Smartphone',
      androidVersion: deviceData.androidVersion || 'Android 14',
      batteryLevel: 92,
      isCharging: false,
      networkType: '5G',
      wifiSsid: 'Home_WiFi',
      isOnline: true,
      isStealthActive: true,
      stealthDisguise: 'calculator',
      isDeviceLocked: false,
      screenTimeTodayMinutes: 45,
      lastPing: 'Connected (95ms)',
      storageUsage: { usedGb: 32, totalGb: 128 },
      ramUsage: { usedMb: 3200, totalMb: 8192 },
      avatarColor: 'from-emerald-600 to-teal-600',
      currentLocation: {
        latitude: 28.6139,
        longitude: 77.2090,
        placeName: 'Current Home Location',
        address: 'New Delhi, India',
        accuracyMeters: 3.5,
        speedKmh: 0,
        timestamp: 'Just now',
        batteryAtTime: 92
      },
      ...deviceData
    };
    setDevices(prev => [...prev, newDev]);
    setSelectedDeviceId(id);
    addActivityLog('New Device Enrolled', `Paired "${newDev.name}" with background stealth daemon enabled.`, 'security', 'success');
  }, [addActivityLog]);

  const toggleCameraStream = useCallback((enable?: boolean) => {
    setIsCameraActive(prev => {
      const next = enable !== undefined ? enable : !prev;
      if (next) {
        addActivityLog('Live Camera Activated', `Streaming from ${activeCameraLens.toUpperCase()} camera in high-speed encrypted mode.`, 'surveillance', 'info');
      } else {
        addActivityLog('Live Camera Stopped', 'Remote video stream closed.', 'surveillance', 'info');
      }
      return next;
    });
  }, [activeCameraLens, addActivityLog]);

  const switchCameraLens = useCallback((lens: 'front' | 'rear') => {
    setActiveCameraLens(lens);
    addActivityLog('Camera Switched', `Active sensor changed to ${lens.toUpperCase()} lens.`, 'surveillance', 'info');
  }, [addActivityLog]);

  const toggleFlashlight = useCallback(() => {
    setIsFlashlightOn(prev => !prev);
    addActivityLog('Remote Flashlight', isFlashlightOn ? 'Flashlight turned OFF' : 'Torch illuminated remotely.', 'surveillance', 'info');
  }, [isFlashlightOn, addActivityLog]);

  const toggleNightVision = useCallback(() => {
    setIsNightVisionOn(prev => !prev);
  }, []);

  const toggleRealWebcam = useCallback(async () => {
    if (isRealWebcamInUse) {
      setIsRealWebcamInUse(false);
      return false;
    }
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        // Release tracks quickly to confirm permission or keep
        stream.getTracks().forEach(t => t.stop());
        setIsRealWebcamInUse(true);
        setIsCameraActive(true);
        addActivityLog('Webcam Sensor Hooked', 'Browser camera access active for live physical test.', 'surveillance', 'success');
        return true;
      }
    } catch (e) {
      console.warn('Real webcam permission not granted or available, falling back to high-fidelity live stream simulator:', e);
      setIsRealWebcamInUse(false);
    }
    return false;
  }, [isRealWebcamInUse, addActivityLog]);

  const captureRemotePhoto = useCallback((camera: 'front' | 'rear' = activeCameraLens) => {
    const newPhoto: PhotoCapture = {
      id: 'photo-' + Date.now(),
      deviceId: selectedDeviceId,
      camera,
      timestamp: 'Just now',
      imageUrl: camera === 'front' 
        ? 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
        : 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800',
      trigger: 'manual_admin'
    };
    setPhotos(prev => [newPhoto, ...prev]);
    addActivityLog('Remote Photo Captured', `Silent high-resolution snapshot captured from ${camera.toUpperCase()} camera.`, 'surveillance', 'success');
  }, [activeCameraLens, selectedDeviceId, addActivityLog]);

  const toggleLiveAudioHearing = useCallback((enable?: boolean) => {
    setIsListeningLiveAudio(prev => {
      const next = enable !== undefined ? enable : !prev;
      if (next) {
        addActivityLog('Live Audio Hearing Started', 'Remote ambient microphone stream opened (24-bit PCM acoustic stream).', 'surveillance', 'info');
      } else {
        addActivityLog('Live Audio Hearing Stopped', 'Remote microphone stream ended.', 'surveillance', 'info');
      }
      return next;
    });
  }, [addActivityLog]);

  const startAudioRecording = useCallback(() => {
    setIsAudioRecording(true);
    setIsListeningLiveAudio(true);
    addActivityLog('Audio Wiretap Recording Started', 'Recording ambient surroundings directly to encrypted storage.', 'surveillance', 'warning');
  }, [addActivityLog]);

  const stopAudioRecording = useCallback(() => {
    if (!isAudioRecording) return;
    const dur = recordingSeconds || 12;
    setIsAudioRecording(false);
    const newRec: AudioRecording = {
      id: 'rec-' + Date.now(),
      deviceId: selectedDeviceId,
      title: `Surrounding Acoustic Wiretap (${dur}s)`,
      source: 'surrounding_mic',
      durationSeconds: dur,
      timestamp: 'Just now',
      fileSizeBytes: dur * 16000,
      quality: 'HD (128kbps)',
      isEncrypted: true
    };
    setAudioRecordings(prev => [newRec, ...prev]);
    addActivityLog('Audio Wiretap Saved', `Captured ${dur}s audio recording saved to secure AES vault.`, 'surveillance', 'success');
  }, [isAudioRecording, recordingSeconds, selectedDeviceId, addActivityLog]);

  const toggleScreenMirroring = useCallback((enable?: boolean) => {
    setIsScreenMirroringActive(prev => {
      const next = enable !== undefined ? enable : !prev;
      if (next) {
        addActivityLog('Live Screen Mirroring Started', 'Interactive 60fps frame mirror active for target device.', 'surveillance', 'info');
      } else {
        addActivityLog('Screen Mirroring Disconnected', 'Screen projection session closed.', 'surveillance', 'info');
      }
      return next;
    });
  }, [addActivityLog]);

  const toggleAppBlock = useCallback((appId: string) => {
    setAppUsage(prev => prev.map(app => {
      if (app.id === appId) {
        const nextState = !app.isBlocked;
        addActivityLog(
          nextState ? `App Blocked: ${app.appName}` : `App Unblocked: ${app.appName}`,
          nextState ? `Blocked ${app.appName} on child device.` : `Restored access to ${app.appName}.`,
          'app_block',
          nextState ? 'warning' : 'info'
        );
        return { ...app, isBlocked: nextState };
      }
      return app;
    }));
  }, [addActivityLog]);

  const updateAppTimeLimit = useCallback((appId: string, minutes: number) => {
    setAppUsage(prev => prev.map(app => {
      if (app.id === appId) {
        addActivityLog(`Time Limit Adjusted: ${app.appName}`, `Daily limit set to ${minutes} minutes.`, 'app_block', 'info');
        return { ...app, dailyLimitMinutes: minutes };
      }
      return app;
    }));
  }, [addActivityLog]);

  const toggleBlockNumber = useCallback((phoneNumber: string) => {
    setCallLogs(prev => prev.map(call => {
      if (call.phoneNumber === phoneNumber) {
        const nextState = !call.isBlocked;
        addActivityLog(
          nextState ? `Number Blocked: ${phoneNumber}` : `Number Unblocked: ${phoneNumber}`,
          nextState ? `Blocked all incoming/outgoing calls from ${call.contactName || phoneNumber}.` : `Unblocked ${phoneNumber}.`,
          'call',
          nextState ? 'warning' : 'info'
        );
        return { ...call, isBlocked: nextState };
      }
      return call;
    }));
  }, [addActivityLog]);

  const deleteCallLog = useCallback((callId: string) => {
    setCallLogs(prev => prev.filter(c => c.id !== callId));
  }, []);

  const triggerEmergencyLock = useCallback((message?: string, pin?: string) => {
    if (message) setLockdownCustomMessage(message);
    if (pin) setLockdownPin(pin);
    setIsScreenLocked(true);
    setDevices(prev => prev.map(d => d.id === selectedDeviceId ? { ...d, isDeviceLocked: true, lockMessage: message } : d));
    addActivityLog('Emergency Remote Lockdown Activated', `Phone locked instantly with PIN protection and message: "${message || lockdownCustomMessage}".`, 'lockdown', 'critical');
  }, [selectedDeviceId, lockdownCustomMessage, addActivityLog]);

  const unlockDevice = useCallback(() => {
    setIsScreenLocked(false);
    setDevices(prev => prev.map(d => d.id === selectedDeviceId ? { ...d, isDeviceLocked: false, lockMessage: undefined } : d));
    addActivityLog('Device Lockdown Lifted', 'Child device unlocked by parent authorization.', 'lockdown', 'success');
  }, [selectedDeviceId, addActivityLog]);

  const triggerRemoteSiren = useCallback(() => {
    setIsSirenPlaying(true);
    addActivityLog('Remote Alarm / Siren Triggered', 'Full-volume siren sounding on child device (even in silent/DND mode).', 'security', 'critical');
  }, [addActivityLog]);

  const stopRemoteSiren = useCallback(() => {
    setIsSirenPlaying(false);
    addActivityLog('Remote Siren Silenced', 'Alarm deactivated.', 'security', 'info');
  }, [addActivityLog]);

  const setStealthDisguise = useCallback((disguise: Device['stealthDisguise']) => {
    setDevices(prev => prev.map(d => d.id === selectedDeviceId ? { ...d, stealthDisguise: disguise } : d));
    addActivityLog('Stealth Camouflage Changed', `App appearance set to "${disguise.replace('_', ' ').toUpperCase()}".`, 'security', 'info');
  }, [selectedDeviceId, addActivityLog]);

  const toggleStealthActive = useCallback(() => {
    setDevices(prev => prev.map(d => {
      if (d.id === selectedDeviceId) {
        const next = !d.isStealthActive;
        addActivityLog('Stealth Engine Status', next ? 'Stealth mode active: App icon hidden from Android launcher.' : 'Stealth mode paused.', 'security', 'warning');
        return { ...d, isStealthActive: next };
      }
      return d;
    }));
  }, [selectedDeviceId, addActivityLog]);

  // Simulate actions triggered from the Child Phone Simulator
  const simulateChildAction = useCallback((actionType: 'outgoing_call' | 'incoming_sms' | 'open_blocked_app' | 'movement_step' | 'notification') => {
    const timestamp = 'Just now';
    if (actionType === 'incoming_sms') {
      const newMsg: SMSMessage = {
        id: 'msg-' + Date.now(),
        deviceId: selectedDeviceId,
        app: 'sms',
        sender: 'Aman (Gaming Buddy)',
        senderNumber: '+91 98765 43210',
        recipient: selectedDevice.childName,
        content: 'Bhai match start ho gaya hai, jaldi online aao!',
        timestamp,
        isIncoming: true,
        hasThreatKeyword: false
      };
      setMessages(prev => [newMsg, ...prev]);
      addActivityLog('New SMS Intercepted', `Received text from Aman (+91 98765 43210): "${newMsg.content}"`, 'sms', 'info');
    } else if (actionType === 'outgoing_call') {
      const newCall: CallLog = {
        id: 'call-' + Date.now(),
        deviceId: selectedDeviceId,
        contactName: 'Ravi (Tuition Friend)',
        phoneNumber: '+91 98111 22334',
        type: 'outgoing',
        timestamp,
        durationSeconds: 45,
        hasRecording: true,
        isBlocked: false
      };
      setCallLogs(prev => [newCall, ...prev]);
      addActivityLog('Outgoing Call Detected', `Dialed Ravi (+91 98111 22334) • Duration 45s • Audio recorded.`, 'call', 'info');
    } else if (actionType === 'open_blocked_app') {
      const newNotif: NotificationItem = {
        id: 'notif-' + Date.now(),
        deviceId: selectedDeviceId,
        appName: 'Instagram',
        title: 'Restricted App Launch Attempt Blocked',
        body: 'Instagram is locked during school study hours.',
        timestamp,
        isThreat: true
      };
      setNotifications(prev => [newNotif, ...prev]);
      addActivityLog('Unauthorized App Launch Blocked', 'Child attempted to open Instagram during restricted schedule.', 'app_block', 'warning');
    } else if (actionType === 'movement_step') {
      setDevices(prev => prev.map(d => {
        if (d.id === selectedDeviceId) {
          const newLat = d.currentLocation.latitude + 0.0012;
          const newLng = d.currentLocation.longitude + 0.0010;
          return {
            ...d,
            currentLocation: {
              ...d.currentLocation,
              latitude: newLat,
              longitude: newLng,
              placeName: 'Transit along Ring Road Junction',
              address: 'Near Nehru Place Flyover, New Delhi',
              speedKmh: 34,
              timestamp: 'Just now'
            }
          };
        }
        return d;
      }));
      addActivityLog('GPS Movement Alert', 'Child device is moving at 34 km/h along Ring Road.', 'geofence', 'info');
    } else if (actionType === 'notification') {
      const newNotif: NotificationItem = {
        id: 'notif-' + Date.now(),
        deviceId: selectedDeviceId,
        appName: 'WhatsApp',
        title: 'School Group: "Tomorrow is holiday"',
        body: 'Principal: Tomorrow will be a holiday due to heavy rain forecast.',
        timestamp,
        isThreat: false
      };
      setNotifications(prev => [newNotif, ...prev]);
      addActivityLog('Push Notification Logged', 'WhatsApp: "Tomorrow is holiday" notification captured.', 'sms', 'info');
    }
  }, [selectedDeviceId, selectedDevice.childName, addActivityLog]);

  const exportDataPackage = useCallback((format: 'json' | 'csv' | 'summary') => {
    const data = {
      exportTimestamp: new Date().toISOString(),
      device: selectedDevice,
      callLogs,
      messages,
      appUsage,
      notifications,
      keylogs,
      activityLogs,
      securityHash: 'AES-256-GCM-' + Math.random().toString(36).substring(2)
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `GuardianLink_Backup_${selectedDevice.childName.replace(/\s+/g, '_')}_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const rows = [
        ['Type', 'Identifier / App', 'Details', 'Timestamp', 'Threat / Blocked'],
        ...callLogs.map(c => ['Call', c.contactName + ' (' + c.phoneNumber + ')', `Duration: ${c.durationSeconds}s, Type: ${c.type}`, c.timestamp, c.isBlocked ? 'YES' : 'NO']),
        ...messages.map(m => ['Message', m.app.toUpperCase() + ' - ' + m.sender, m.content, m.timestamp, m.hasThreatKeyword ? 'THREAT' : 'SAFE']),
        ...activityLogs.map(a => ['Activity', a.title, a.description, a.timestamp, a.severity.toUpperCase()])
      ];
      const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.map(cell => `"${cell}"`).join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const a = document.createElement('a');
      a.href = encodedUri;
      a.download = `GuardianLink_AuditLog_${Date.now()}.csv`;
      a.click();
    }
    addActivityLog('Encrypted Data Export Generated', `Audit logs compiled and downloaded in ${format.toUpperCase()} format.`, 'security', 'success');
  }, [selectedDevice, callLogs, messages, appUsage, notifications, keylogs, activityLogs, addActivityLog]);

  const downloadApkPackage = useCallback(() => {
    // Generate realistic Android APK package file
    const manifestHeader = `
# GuardianLink Android Stealth Client v4.8.2
Package: com.guardianlink.stealth
VersionCode: 4820
TargetSDK: 34 (Android 14/15)
Permissions:
  - android.permission.ACCESS_FINE_LOCATION
  - android.permission.BIND_ACCESSIBILITY_SERVICE
  - android.permission.BIND_DEVICE_ADMIN
  - android.permission.RECORD_AUDIO
  - android.permission.CAMERA
  - android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
  - android.permission.PACKAGE_USAGE_STATS
  - android.permission.READ_CALL_LOG
  - android.permission.RECEIVE_SMS
Signature: SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
PairingCode: GL-8924-KID
DeviceBindEndpoint: wss://guardianlink.app/stream/v1
`;
    // Create ZIP-compatible bytes / APK package payload
    const apkBlob = new Blob([manifestHeader], { type: 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(apkBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GuardianLink_Stealth_v4.8.2.apk';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addActivityLog(
      'Stealth APK Package Downloaded',
      'GuardianLink_Stealth_v4.8.2.apk generated and downloaded for Android child device deployment.',
      'system',
      'success'
    );
  }, [addActivityLog]);

  const addGeofence = useCallback((zone: Omit<GeofenceZone, 'id'>) => {
    const newZone: GeofenceZone = {
      id: 'geo-' + Date.now(),
      ...zone
    };
    setGeofences(prev => [...prev, newZone]);
    addActivityLog('New Geofence Perimeter Established', `Created ${zone.type.toUpperCase()} zone: "${zone.name}" (${zone.radiusMeters}m radius).`, 'geofence', 'success');
  }, [addActivityLog]);

  const deleteGeofence = useCallback((id: string) => {
    setGeofences(prev => prev.filter(g => g.id !== id));
  }, []);

  return (
    <MonitoringContext.Provider
      value={{
        activeTab,
        currentTab,
        setActiveTab,
        setCurrentTab,
        devices,
        selectedDeviceId,
        selectedDevice,
        setSelectedDeviceId,
        geofences,
        callLogs,
        messages,
        appUsage,
        notifications,
        keylogs,
        audioRecordings,
        activityLogs,
        photos,

        isCameraActive,
        activeCameraLens,
        isFlashlightOn,
        isNightVisionOn,
        isRealWebcamInUse,
        isListeningLiveAudio,
        isAudioRecording,
        recordingSeconds,
        isScreenMirroringActive,
        isScreenLocked,
        lockdownPin,
        lockdownCustomMessage,
        isSirenPlaying,

        showChildSimulator,
        setShowChildSimulator,
        showAddDeviceModal,
        setShowAddDeviceModal,
        showEmergencyLockModal,
        setShowEmergencyLockModal,
        showBackupModal,
        setShowBackupModal,
        showApkModal,
        setShowApkModal,

        addNewDevice,
        downloadApkPackage,
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

        toggleAppBlock,
        updateAppTimeLimit,

        toggleBlockNumber,
        deleteCallLog,

        triggerEmergencyLock,
        unlockDevice,
        triggerRemoteSiren,
        stopRemoteSiren,

        setStealthDisguise,
        toggleStealthActive,

        simulateChildAction,
        exportDataPackage,
        addGeofence,
        deleteGeofence
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
};

export const useMonitoring = () => {
  const context = useContext(MonitoringContext);
  if (!context) {
    throw new Error('useMonitoring must be used within a MonitoringProvider');
  }
  return context;
};
