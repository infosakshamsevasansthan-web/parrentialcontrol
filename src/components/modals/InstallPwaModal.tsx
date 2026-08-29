import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  CheckCircle2,
  X,
  Share2,
  MoreVertical,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

interface InstallPwaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPwaModal: React.FC<InstallPwaModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [activeBrowserTab, setActiveBrowserTab] = useState<'chrome' | 'samsung' | 'other' | 'ios'>('chrome');
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallSuccess(true);
        setDeferredPrompt(null);
      }
    } else {
      // Show manual guide tab
      setActiveBrowserTab('chrome');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#1e293b] border border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-700/80 bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                फोन में ऐप इंस्टॉल करें (Install App)
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  No Parse Error
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                सीधे अपने स्मार्टफोन की होम स्क्रीन पर ऐप की तरह चलाएँ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 custom-scrollbar text-sm">
          {/* Direct One-Click Install Button if supported */}
          {deferredPrompt ? (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 text-white shadow-lg shadow-blue-600/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-200">
                  Direct One-Click Install
                </span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <p className="text-sm font-semibold mb-3">
                आपका ब्राउज़र 1-क्लिक इंस्टॉलेशन सपोर्ट करता है!
              </p>
              <button
                onClick={handleNativeInstall}
                className="w-full py-2.5 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition flex items-center justify-center space-x-2 text-sm shadow"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>📲 अभी फ़ोन में इंस्टॉल करें (Install Now)</span>
              </button>
            </div>
          ) : (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3.5 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <p className="font-semibold text-white mb-1">
                  अगर "Install App" का पॉपअप नहीं दिख रहा है:
                </p>
                <p>
                  आप नीचे अपने ब्राउज़र के अनुसार 2 आसान स्टेप्स में इसे होम स्क्रीन पर जोड़ सकते हैं:
                </p>
              </div>
            </div>
          )}

          {/* Browser Selection Tabs */}
          <div className="flex border-b border-slate-700 space-x-2 pb-1">
            <button
              onClick={() => setActiveBrowserTab('chrome')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeBrowserTab === 'chrome'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Google Chrome (Android)
            </button>
            <button
              onClick={() => setActiveBrowserTab('samsung')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeBrowserTab === 'samsung'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Samsung Internet
            </button>
            <button
              onClick={() => setActiveBrowserTab('other')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeBrowserTab === 'other'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Mi / Vivo / Oppo
            </button>
            <button
              onClick={() => setActiveBrowserTab('ios')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeBrowserTab === 'ios'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              iPhone (Safari)
            </button>
          </div>

          {/* Guide Content based on selected browser */}
          <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-4 space-y-3">
            {activeBrowserTab === 'chrome' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                  Chrome ब्राउज़र में ऊपर दाएँ कोने में 3 डॉट्स (⋮) पर क्लिक करें:
                </h4>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-xs text-slate-300 flex items-center space-x-3">
                  <MoreVertical className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>Chrome मेनू (⋮ Top-Right Corner) खोलें</span>
                </div>

                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                  मेनू में से यह ऑप्शन चुनें:
                </h4>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-xs text-slate-200 space-y-1.5">
                  <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    "Install app" (ऐप इंस्टॉल करें)
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    (यदि Install app न दिखे, तो <strong>"Add to Home screen" / "होम स्क्रीन में जोड़ें"</strong> पर टैप करें)
                  </p>
                </div>
              </div>
            )}

            {activeBrowserTab === 'samsung' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                  Samsung Internet में नीचे दाएँ ☰ (Tools Menu) पर टैप करें।
                </h4>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <strong>"Add page to"</strong> &gt; <strong>"Home screen"</strong> चुनें।
                </h4>
              </div>
            )}

            {activeBrowserTab === 'other' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                  अपने मोबाइल ब्राउज़र (Mi Browser, Vivo Browser या Opera) का मेनू खोलें।
                </h4>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <strong>"Add to Desktop"</strong> या <strong>"Add Shortcut to Home screen"</strong> पर क्लिक करें।
                </h4>
              </div>
            )}

            {activeBrowserTab === 'ios' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                  Safari में नीचे <strong>Share (शेयर आइकन <Share2 className="inline w-3.5 h-3.5" />)</strong> पर टैप करें।
                </h4>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                  नीचे स्क्रॉल करके <strong>"Add to Home Screen"</strong> पर टैप करें।
                </h4>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/50 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>फुल स्क्रीन ऐप मोड (No URL Bar)</span>
            </div>
            <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/50 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>बिना किसी Parse Error के चलेगा</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-700/80 bg-slate-900/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition"
          >
            समझ गया / Close
          </button>
        </div>
      </div>
    </div>
  );
};
