import { Device, LocationPoint, GeofenceZone, CallLog, SMSMessage, AppUsageItem, NotificationItem, KeylogItem, AudioRecording, ActivityLog, PhotoCapture } from '../types';

export const INITIAL_DEVICES: Device[] = [
  {
    id: 'dev-galaxy-s22',
    name: "Aarav's Galaxy S22 Ultra",
    childName: 'Aarav Sharma (Age 14)',
    model: 'Samsung Galaxy S22 Ultra (SM-S908E)',
    androidVersion: 'Android 14 (OneUI 6.1)',
    batteryLevel: 86,
    isCharging: false,
    networkType: '5G',
    wifiSsid: 'Home_Fiber_5GHz',
    isOnline: true,
    isStealthActive: true,
    stealthDisguise: 'calculator',
    isDeviceLocked: false,
    screenTimeTodayMinutes: 215,
    lastPing: 'Just now (120ms latency)',
    storageUsage: { usedGb: 74.2, totalGb: 256.0 },
    ramUsage: { usedMb: 4200, totalMb: 8192 },
    avatarColor: 'from-blue-600 to-indigo-600',
    currentLocation: {
      latitude: 28.6139,
      longitude: 77.2090,
      placeName: 'Delhi Public School, Sector 4',
      address: 'Mathura Rd, Sundar Nagar, New Delhi, Delhi 110003',
      accuracyMeters: 2.8,
      speedKmh: 0,
      timestamp: '2 mins ago',
      batteryAtTime: 86,
    }
  },
  {
    id: 'dev-pixel-8',
    name: "Priya's Pixel 8 Pro",
    childName: 'Priya Sharma (Age 11)',
    model: 'Google Pixel 8 Pro (GC3VE)',
    androidVersion: 'Android 15 (Vanilla Vanilla)',
    batteryLevel: 62,
    isCharging: true,
    networkType: 'Wi-Fi',
    wifiSsid: 'DPS_School_Student_WiFi',
    isOnline: true,
    isStealthActive: true,
    stealthDisguise: 'google_services',
    isDeviceLocked: false,
    screenTimeTodayMinutes: 140,
    lastPing: '15s ago',
    storageUsage: { usedGb: 48.5, totalGb: 128.0 },
    ramUsage: { usedMb: 3600, totalMb: 12288 },
    avatarColor: 'from-purple-600 to-pink-600',
    currentLocation: {
      latitude: 28.6219,
      longitude: 77.2185,
      placeName: 'City Central Library & Study Wing',
      address: 'Canaught Place Block C, New Delhi, Delhi 110001',
      accuracyMeters: 4.1,
      speedKmh: 0,
      timestamp: 'Just now',
      batteryAtTime: 62,
    }
  },
  {
    id: 'dev-oneplus-11',
    name: "Rohan's OnePlus 11",
    childName: 'Rohan Sharma (Age 16)',
    model: 'OnePlus 11 5G (CPH2449)',
    androidVersion: 'Android 14 (OxygenOS 14)',
    batteryLevel: 29,
    isCharging: false,
    networkType: '4G',
    wifiSsid: 'None (Cellular Data)',
    isOnline: true,
    isStealthActive: true,
    stealthDisguise: 'hidden',
    isDeviceLocked: false,
    screenTimeTodayMinutes: 325,
    lastPing: '30s ago',
    storageUsage: { usedGb: 112.0, totalGb: 256.0 },
    ramUsage: { usedMb: 6100, totalMb: 16384 },
    avatarColor: 'from-amber-600 to-rose-600',
    currentLocation: {
      latitude: 28.5700,
      longitude: 77.2300,
      placeName: 'South Ex Market Gaming Zone',
      address: 'NDSE Part 1, Ring Road, New Delhi, Delhi 110049',
      accuracyMeters: 5.5,
      speedKmh: 18,
      timestamp: '1 min ago',
      batteryAtTime: 29,
    }
  }
];

export const INITIAL_GEOFENCES: GeofenceZone[] = [
  {
    id: 'geo-1',
    name: 'Home Sanctuary (Safe Zone)',
    type: 'safe',
    latitude: 28.6139,
    longitude: 77.2090,
    radiusMeters: 300,
    alertOnEntry: true,
    alertOnExit: true,
    color: '#10b981'
  },
  {
    id: 'geo-2',
    name: 'Delhi Public School (Safe Zone)',
    type: 'safe',
    latitude: 28.6180,
    longitude: 77.2150,
    radiusMeters: 450,
    alertOnEntry: true,
    alertOnExit: true,
    color: '#3b82f6'
  },
  {
    id: 'geo-3',
    name: 'Gaming Cyber Cafe (Restricted Alert)',
    type: 'restricted',
    latitude: 28.5700,
    longitude: 77.2300,
    radiusMeters: 200,
    alertOnEntry: true,
    alertOnExit: false,
    color: '#ef4444'
  }
];

export const LOCATION_HISTORY_POINTS: Record<string, LocationPoint[]> = {
  'dev-galaxy-s22': [
    { latitude: 28.6139, longitude: 77.2090, placeName: 'Delhi Public School Main Gate', address: 'Mathura Rd, New Delhi', accuracyMeters: 3, speedKmh: 0, timestamp: '10:45 AM', batteryAtTime: 86 },
    { latitude: 28.6150, longitude: 77.2070, placeName: 'Science Block Lab 3', address: 'DPS Campus Block B', accuracyMeters: 4, speedKmh: 3, timestamp: '09:30 AM', batteryAtTime: 89 },
    { latitude: 28.6110, longitude: 77.2010, placeName: 'Bus Route #14 Near Zoo Roundabout', address: 'Mathura Rd Crossing', accuracyMeters: 6, speedKmh: 38, timestamp: '07:45 AM', batteryAtTime: 95 },
    { latitude: 28.6050, longitude: 77.1950, placeName: 'Home Residence Departure', address: 'Defence Colony, New Delhi', accuracyMeters: 2, speedKmh: 0, timestamp: '07:15 AM', batteryAtTime: 100 }
  ]
};

export const INITIAL_CALL_LOGS: CallLog[] = [
  {
    id: 'call-1',
    deviceId: 'dev-galaxy-s22',
    contactName: 'Coach Vikram (Cricket)',
    phoneNumber: '+91 98110 44219',
    type: 'incoming',
    timestamp: '15 mins ago (10:32 AM)',
    durationSeconds: 184,
    hasRecording: true,
    isBlocked: false,
  },
  {
    id: 'call-2',
    deviceId: 'dev-galaxy-s22',
    contactName: 'Unknown Caller (Telemarketing)',
    phoneNumber: '+91 88001 99281',
    type: 'rejected',
    timestamp: '1 hour ago (09:41 AM)',
    durationSeconds: 0,
    hasRecording: false,
    isBlocked: true,
  },
  {
    id: 'call-3',
    deviceId: 'dev-galaxy-s22',
    contactName: 'Mummy (Home)',
    phoneNumber: '+91 99100 88234',
    type: 'outgoing',
    timestamp: '2 hours ago (08:15 AM)',
    durationSeconds: 95,
    hasRecording: true,
    isBlocked: false,
  },
  {
    id: 'call-4',
    deviceId: 'dev-galaxy-s22',
    contactName: 'Samir (Classmate)',
    phoneNumber: '+91 97112 33491',
    type: 'incoming',
    timestamp: 'Yesterday (06:40 PM)',
    durationSeconds: 412,
    hasRecording: true,
    isBlocked: false,
  },
  {
    id: 'call-5',
    deviceId: 'dev-galaxy-s22',
    contactName: 'Unknown Suspicious ID',
    phoneNumber: '+1 800 555 0199',
    type: 'missed',
    timestamp: 'Yesterday (03:10 PM)',
    durationSeconds: 0,
    hasRecording: false,
    isBlocked: false,
  }
];

export const INITIAL_MESSAGES: SMSMessage[] = [
  {
    id: 'msg-1',
    deviceId: 'dev-galaxy-s22',
    app: 'whatsapp',
    sender: 'Samir (Study Group)',
    senderNumber: '+91 97112 33491',
    recipient: 'Aarav',
    content: 'Bhai physics homework submit kar diya kya? Teacher test legi aaj.',
    timestamp: '8 mins ago',
    isIncoming: true,
    hasThreatKeyword: false,
  },
  {
    id: 'msg-2',
    deviceId: 'dev-galaxy-s22',
    app: 'whatsapp',
    sender: 'Aarav',
    senderNumber: 'Child Device',
    recipient: 'Samir',
    content: 'Ha maine subah 7 baje upload kar diya tha portal par.',
    timestamp: '6 mins ago',
    isIncoming: false,
    hasThreatKeyword: false,
  },
  {
    id: 'msg-3',
    deviceId: 'dev-galaxy-s22',
    app: 'sms',
    sender: 'Unknown (+91 91200 45892)',
    senderNumber: '+91 91200 45892',
    recipient: 'Aarav',
    content: 'Hey bro, let us bunk period 4 and go to the arcade secretly.',
    timestamp: '42 mins ago',
    isIncoming: true,
    hasThreatKeyword: true,
    threatCategory: 'restricted_meeting'
  },
  {
    id: 'msg-4',
    deviceId: 'dev-galaxy-s22',
    app: 'instagram',
    sender: 'gamer_z_99',
    senderNumber: '@gamer_z_99',
    recipient: 'Aarav',
    content: 'Sent you an invite to the Discord clan war tournament tonight at 11 PM.',
    timestamp: '3 hours ago',
    isIncoming: true,
    hasThreatKeyword: false
  },
  {
    id: 'msg-5',
    deviceId: 'dev-galaxy-s22',
    app: 'telegram',
    sender: 'Class 9th Notes Hub',
    senderNumber: 'Channel',
    recipient: 'Aarav',
    content: 'Uploaded: Chapter 4 Motion & Gravitation sample papers PDF.',
    timestamp: '4 hours ago',
    isIncoming: true,
    hasThreatKeyword: false
  }
];

export const INITIAL_APP_USAGE: AppUsageItem[] = [
  {
    id: 'app-1',
    deviceId: 'dev-galaxy-s22',
    appName: 'YouTube',
    packageName: 'com.google.android.youtube',
    category: 'entertainment',
    usedMinutesToday: 65,
    dailyLimitMinutes: 90,
    isBlocked: false,
    iconColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    lastOpened: '18 mins ago',
    iconName: 'Tv'
  },
  {
    id: 'app-2',
    deviceId: 'dev-galaxy-s22',
    appName: 'WhatsApp',
    packageName: 'com.whatsapp',
    category: 'social',
    usedMinutesToday: 52,
    dailyLimitMinutes: 60,
    isBlocked: false,
    iconColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    lastOpened: '6 mins ago',
    iconName: 'MessageSquare'
  },
  {
    id: 'app-3',
    deviceId: 'dev-galaxy-s22',
    appName: 'Instagram',
    packageName: 'com.instagram.android',
    category: 'social',
    usedMinutesToday: 48,
    dailyLimitMinutes: 45,
    isBlocked: true,
    iconColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    lastOpened: '1 hour ago (Blocked Attempt)',
    iconName: 'Camera'
  },
  {
    id: 'app-4',
    deviceId: 'dev-galaxy-s22',
    appName: 'Free Fire MAX (Battlegrounds)',
    packageName: 'com.dts.freefiremax',
    category: 'games',
    usedMinutesToday: 30,
    dailyLimitMinutes: 30,
    isBlocked: true,
    iconColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    lastOpened: 'Blocked by Parental Schedule',
    iconName: 'Gamepad2'
  },
  {
    id: 'app-5',
    deviceId: 'dev-galaxy-s22',
    appName: 'Google Classroom',
    packageName: 'com.google.android.apps.classroom',
    category: 'education',
    usedMinutesToday: 42,
    isBlocked: false,
    iconColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    lastOpened: '35 mins ago',
    iconName: 'GraduationCap'
  },
  {
    id: 'app-6',
    deviceId: 'dev-galaxy-s22',
    appName: 'Chrome Browser',
    packageName: 'com.android.chrome',
    category: 'productivity',
    usedMinutesToday: 24,
    dailyLimitMinutes: 120,
    isBlocked: false,
    iconColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    lastOpened: '50 mins ago',
    iconName: 'Globe'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    deviceId: 'dev-galaxy-s22',
    appName: 'WhatsApp',
    title: 'Samir: "Physics assignment done"',
    body: 'Bhai physics homework submit kar diya kya? Teacher test legi aaj.',
    timestamp: '8 mins ago',
    isThreat: false
  },
  {
    id: 'notif-2',
    deviceId: 'dev-galaxy-s22',
    appName: 'Messages (SMS)',
    title: 'Suspicious SMS from +91 91200 45892',
    body: 'Hey bro, let us bunk period 4 and go to the arcade secretly.',
    timestamp: '42 mins ago',
    isThreat: true
  },
  {
    id: 'notif-3',
    deviceId: 'dev-galaxy-s22',
    appName: 'Instagram',
    title: 'Instagram Blocked Notification',
    body: 'Parental time limit reached. Instagram is locked for the remainder of school hours.',
    timestamp: '1 hour ago',
    isThreat: false
  },
  {
    id: 'notif-4',
    deviceId: 'dev-galaxy-s22',
    appName: 'Google Classroom',
    title: 'New assignment posted in Mathematics IX',
    body: 'Mr. Verma posted: Circles Theorem Worksheet #3 due tomorrow.',
    timestamp: '2 hours ago',
    isThreat: false
  }
];

export const INITIAL_KEYLOGS: KeylogItem[] = [
  {
    id: 'key-1',
    deviceId: 'dev-galaxy-s22',
    appName: 'Chrome Browser (Search Bar)',
    keystrokes: 'class 9 physics gravitation formulas pdf download',
    timestamp: '22 mins ago',
    isFlagged: false
  },
  {
    id: 'key-2',
    deviceId: 'dev-galaxy-s22',
    appName: 'WhatsApp (Samir Chat)',
    keystrokes: 'ha maine subah 7 baje upload kar diya tha',
    timestamp: '6 mins ago',
    isFlagged: false
  },
  {
    id: 'key-3',
    deviceId: 'dev-galaxy-s22',
    appName: 'Instagram (Search Bar)',
    keystrokes: 'how to bypass parental lock screen',
    timestamp: 'Yesterday 09:12 PM',
    isFlagged: true
  }
];

export const INITIAL_AUDIO_RECORDINGS: AudioRecording[] = [
  {
    id: 'rec-1',
    deviceId: 'dev-galaxy-s22',
    title: 'Ambient Classroom Surroundings',
    source: 'surrounding_mic',
    durationSeconds: 124,
    timestamp: 'Today 10:15 AM',
    fileSizeBytes: 1840000,
    quality: 'HD (128kbps)',
    isEncrypted: true
  },
  {
    id: 'rec-2',
    deviceId: 'dev-galaxy-s22',
    title: 'Call Recording: Coach Vikram',
    source: 'call_recorder',
    durationSeconds: 184,
    timestamp: 'Today 10:32 AM',
    fileSizeBytes: 2450000,
    quality: 'HD (128kbps)',
    isEncrypted: true
  },
  {
    id: 'rec-3',
    deviceId: 'dev-galaxy-s22',
    title: 'Morning Bus Transit Acoustic Log',
    source: 'surrounding_mic',
    durationSeconds: 310,
    timestamp: 'Today 07:30 AM',
    fileSizeBytes: 4200000,
    quality: 'Standard (64kbps)',
    isEncrypted: true
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    deviceId: 'dev-galaxy-s22',
    title: 'High Threat Keyword Detected',
    description: 'SMS from +91 91200 45892 contained flagged keyword "bunk period 4 arcade".',
    type: 'sms',
    severity: 'critical',
    timestamp: '42 mins ago'
  },
  {
    id: 'act-2',
    deviceId: 'dev-galaxy-s22',
    title: 'Safe Zone Entry Confirmed',
    description: 'Aarav entered "Delhi Public School (Safe Zone)" with 2.8m GPS precision.',
    type: 'geofence',
    severity: 'success',
    timestamp: '07:55 AM'
  },
  {
    id: 'act-3',
    deviceId: 'dev-galaxy-s22',
    title: 'Restricted App Block Enforced',
    description: 'Instagram launch blocked due to active School Hours focus policy.',
    type: 'app_block',
    severity: 'warning',
    timestamp: '09:05 AM'
  },
  {
    id: 'act-4',
    deviceId: 'dev-galaxy-s22',
    title: 'Call Wiretap Audio Recorded',
    description: 'Incoming call from Coach Vikram (184s) successfully encrypted and uploaded to vault.',
    type: 'call',
    severity: 'info',
    timestamp: '10:32 AM'
  },
  {
    id: 'act-5',
    deviceId: 'dev-galaxy-s22',
    title: 'Stealth Daemon Heartbeat Verified',
    description: 'Android background service active. Battery consumption: 0.8%/hr. AES-256 sync intact.',
    type: 'security',
    severity: 'info',
    timestamp: 'Just now'
  }
];

export const INITIAL_PHOTOS: PhotoCapture[] = [
  {
    id: 'photo-1',
    deviceId: 'dev-galaxy-s22',
    camera: 'front',
    timestamp: 'Today 10:14 AM',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    trigger: 'manual_admin'
  },
  {
    id: 'photo-2',
    deviceId: 'dev-galaxy-s22',
    camera: 'rear',
    timestamp: 'Today 09:20 AM',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800',
    trigger: 'scheduled'
  }
];
