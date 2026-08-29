import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  Download,
  X,
  ShieldCheck,
  FileJson,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const DataBackupModal: React.FC = () => {
  const {
    showBackupModal,
    setShowBackupModal,
    exportDataPackage,
    selectedDevice
  } = useMonitoring();

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'csv' | 'summary'>('json');

  if (!showBackupModal) return null;

  const handleDownload = (format: 'json' | 'csv' | 'summary') => {
    setIsExporting(true);
    setTimeout(() => {
      exportDataPackage(format);
      setIsExporting(false);
      setShowBackupModal(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Export Encrypted Data Backup</h3>
              <p className="text-xs text-slate-400">Download complete audit records for {selectedDevice.childName}</p>
            </div>
          </div>
          <button
            onClick={() => setShowBackupModal(false)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>AES-256-GCM Secure Encryption</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Export includes verified GPS breadcrumbs, call logs, SMS transcripts, audio recordings index, keystrokes, and security alert events.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-slate-300 font-semibold">Select Export Format</label>

            <button
              type="button"
              onClick={() => handleDownload('json')}
              className="w-full p-3 bg-slate-900/70 hover:bg-slate-900 rounded-xl border border-slate-700 text-left flex items-center justify-between transition group"
            >
              <div className="flex items-center space-x-3">
                <FileJson className="w-5 h-5 text-blue-400 group-hover:scale-110 transition" />
                <div>
                  <p className="font-bold text-white text-xs">Full JSON Raw Data Backup</p>
                  <p className="text-[10px] text-slate-400">Machine-readable full telemetry archive</p>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </button>

            <button
              type="button"
              onClick={() => handleDownload('csv')}
              className="w-full p-3 bg-slate-900/70 hover:bg-slate-900 rounded-xl border border-slate-700 text-left flex items-center justify-between transition group"
            >
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition" />
                <div>
                  <p className="font-bold text-white text-xs">CSV Excel Spreadsheets</p>
                  <p className="text-[10px] text-slate-400">Organized tables of calls, messages, and events</p>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-700/60">
          <button
            type="button"
            onClick={() => setShowBackupModal(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
