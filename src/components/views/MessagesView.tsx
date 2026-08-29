import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  MessageSquareText,
  Search,
  AlertTriangle,
  Send,
  MessageCircle,
  Smartphone,
  ShieldAlert,
  Clock,
  CheckCheck,
  Filter,
  Plus
} from 'lucide-react';
import { SMSMessage } from '../../types';

export const MessagesView: React.FC = () => {
  const {
    messages,
    selectedDevice,
    simulateChildAction
  } = useMonitoring();

  const [activeApp, setActiveApp] = useState<'all' | 'whatsapp' | 'sms' | 'instagram' | 'telegram'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMessage, setSelectedMessage] = useState<SMSMessage | null>(messages[0] || null);

  const filteredMessages = messages.filter((msg) => {
    if (activeApp !== 'all' && msg.app !== activeApp) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return msg.content.toLowerCase().includes(q) || msg.sender.toLowerCase().includes(q);
    }
    return true;
  });

  const threatCount = messages.filter(m => m.hasThreatKeyword).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Stats */}
      <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <MessageSquareText className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white">Social Chats & SMS Message Surveillance</h2>
            {threatCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {threatCount} Threat Alert
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Full-text transcript of SMS, WhatsApp, Instagram DMs, and Telegram messages with AI keyword hazard detection.
          </p>
        </div>

        <button
          onClick={() => simulateChildAction('incoming_sms')}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5 self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Simulate Incoming SMS</span>
        </button>
      </div>

      {/* App Switcher & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e293b]/60 p-3 rounded-xl border border-slate-700/60">
        <div className="flex items-center space-x-1 overflow-x-auto text-xs pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Channels' },
            { id: 'whatsapp', label: 'WhatsApp' },
            { id: 'sms', label: 'SMS Messages' },
            { id: 'instagram', label: 'Instagram Direct' },
            { id: 'telegram', label: 'Telegram' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveApp(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition shrink-0 ${
                activeApp === tab.id
                  ? 'bg-blue-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search keywords or sender..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Main Message Split View: List on left, Chat preview on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List Column */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/80 p-4 shadow-xl flex flex-col h-[520px]">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-semibold px-1">
            <span>RECENT CONVERSATIONS ({filteredMessages.length})</span>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
            {filteredMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              const appColor =
                msg.app === 'whatsapp' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                msg.app === 'instagram' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                msg.app === 'telegram' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20';

              return (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left p-3 rounded-xl border transition flex flex-col space-y-1.5 ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500/50 text-white shadow-md'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 min-w-0">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${appColor}`}>
                        {msg.app}
                      </span>
                      <span className="text-xs font-bold truncate text-white">{msg.sender}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{msg.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300 truncate leading-relaxed">
                    {msg.content}
                  </p>

                  {msg.hasThreatKeyword && (
                    <div className="flex items-center space-x-1 text-[10px] font-bold text-amber-400 mt-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Flagged: {msg.threatCategory?.replace('_', ' ').toUpperCase()}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Chat Thread View on Right (2 Cols) */}
        <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-700/80 p-5 shadow-xl flex flex-col justify-between h-[520px]">
          {selectedMessage ? (
            <>
              {/* Chat Header */}
              <div className="border-b border-slate-700/80 pb-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-sm">
                    {selectedMessage.sender.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{selectedMessage.sender}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase font-mono">
                        {selectedMessage.app}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {selectedMessage.senderNumber} • Intercepted on {selectedDevice.name}
                    </p>
                  </div>
                </div>

                {selectedMessage.hasThreatKeyword && (
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-xl border border-amber-500/40 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Hazard Detected
                  </span>
                )}
              </div>

              {/* Chat Bubble History Stream */}
              <div className="flex-1 py-4 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                {/* Threat advisory notice */}
                {selectedMessage.hasThreatKeyword && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Automatic Threat Warning:</strong> This conversation triggered safety policies regarding unapproved school departures or secret meetings.
                    </p>
                  </div>
                )}

                {/* Simulated messages in thread */}
                <div className="flex flex-col space-y-2">
                  <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-xs text-white shadow-sm space-y-1">
                    <p className="font-semibold text-blue-400 text-[10px]">{selectedMessage.sender}</p>
                    <p>{selectedMessage.content}</p>
                    <span className="block text-[9px] text-slate-400 text-right mt-1 font-mono">
                      {selectedMessage.timestamp}
                    </span>
                  </div>

                  {!selectedMessage.isIncoming && (
                    <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none max-w-[80%] ml-auto text-xs text-white shadow-sm space-y-1">
                      <p className="font-semibold text-blue-200 text-[10px]">{selectedDevice.childName} (Child Device)</p>
                      <p>{selectedMessage.content}</p>
                      <div className="flex items-center justify-end space-x-1 text-[9px] text-blue-200 font-mono mt-1">
                        <span>{selectedMessage.timestamp}</span>
                        <CheckCheck className="w-3 h-3 text-blue-200" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Read-only Intercept Footer */}
              <div className="border-t border-slate-700/80 pt-3 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">End-to-End Intercepted • Real-time Mirroring</span>
                <span className="text-emerald-400 font-medium">Synced with Cloud Vault</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <MessageSquareText className="w-12 h-12 mb-2 text-slate-600" />
              <p>Select a message thread to view full conversation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
