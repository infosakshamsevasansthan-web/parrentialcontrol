import React, { useState } from 'react';
import { useMonitoring } from '../../context/MonitoringContext';
import {
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  PhoneOff,
  Search,
  Play,
  Pause,
  ShieldBan,
  ShieldCheck,
  Trash2,
  Filter,
  Clock,
  Volume2
} from 'lucide-react';

export const CallLogsView: React.FC = () => {
  const {
    callLogs,
    selectedDevice,
    toggleBlockNumber,
    deleteCallLog,
    simulateChildAction
  } = useMonitoring();

  const [filterType, setFilterType] = useState<'all' | 'incoming' | 'outgoing' | 'missed' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingCallId, setPlayingCallId] = useState<string | null>(null);

  const filteredLogs = callLogs.filter(log => {
    if (filterType !== 'all' && log.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return log.contactName.toLowerCase().includes(q) || log.phoneNumber.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Quick Filter Bar */}
      <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <PhoneCall className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white">Call Logs & Automatic Call Wiretap</h2>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 text-[10px] font-mono font-bold">
              {callLogs.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time intercept of all dialed, answered, and missed phone calls with dual-channel audio recordings.
          </p>
        </div>

        <button
          onClick={() => simulateChildAction('outgoing_call')}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5 self-start md:self-auto"
        >
          <PhoneOutgoing className="w-3.5 h-3.5" />
          <span>Simulate New Call Intercept</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e293b]/60 p-3 rounded-xl border border-slate-700/60">
        <div className="flex items-center space-x-1 overflow-x-auto text-xs pb-1 sm:pb-0">
          {(['all', 'incoming', 'outgoing', 'missed', 'rejected'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition shrink-0 ${
                filterType === type
                  ? 'bg-blue-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search contact or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Call Logs Table */}
      <div className="bg-[#1e293b] rounded-2xl border border-slate-700/80 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700/80">
              <tr>
                <th className="p-4">Contact / Phone Number</th>
                <th className="p-4">Call Type</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Audio Wiretap</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  const isPlaying = playingCallId === log.id;
                  return (
                    <tr key={log.id} className="hover:bg-slate-800/40 transition">
                      {/* Contact Info */}
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs shrink-0">
                            {log.contactName.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white truncate">{log.contactName}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{log.phoneNumber}</p>
                          </div>
                        </div>
                      </td>

                      {/* Call Type Badge */}
                      <td className="p-4">
                        {log.type === 'incoming' && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            <PhoneIncoming className="w-3 h-3" />
                            <span>Incoming</span>
                          </span>
                        )}
                        {log.type === 'outgoing' && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                            <PhoneOutgoing className="w-3 h-3" />
                            <span>Outgoing</span>
                          </span>
                        )}
                        {log.type === 'missed' && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 text-[10px] font-bold border border-rose-500/30">
                            <PhoneMissed className="w-3 h-3" />
                            <span>Missed</span>
                          </span>
                        )}
                        {log.type === 'rejected' && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                            <PhoneOff className="w-3 h-3" />
                            <span>Rejected</span>
                          </span>
                        )}
                      </td>

                      {/* Timestamp */}
                      <td className="p-4 font-mono text-[11px] text-slate-400">
                        {log.timestamp}
                      </td>

                      {/* Duration */}
                      <td className="p-4 font-mono text-[11px]">
                        {log.durationSeconds > 0 ? (
                          <span className="text-white">
                            {Math.floor(log.durationSeconds / 60)}m {log.durationSeconds % 60}s
                          </span>
                        ) : (
                          <span className="text-slate-500">0s</span>
                        )}
                      </td>

                      {/* Audio Wiretap Player */}
                      <td className="p-4">
                        {log.hasRecording ? (
                          <button
                            onClick={() => setPlayingCallId(isPlaying ? null : log.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                              isPlaying
                                ? 'bg-rose-600 text-white animate-pulse'
                                : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30'
                            }`}
                          >
                            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                            <span>{isPlaying ? 'Playing Audio' : 'Listen Recording'}</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500 italic">No audio recorded</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => toggleBlockNumber(log.phoneNumber)}
                            className={`p-1.5 rounded-lg border transition ${
                              log.isBlocked
                                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 hover:bg-rose-500/30'
                                : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                            }`}
                            title={log.isBlocked ? 'Number is Blocked (Click to Unblock)' : 'Block this phone number'}
                          >
                            {log.isBlocked ? <ShieldBan className="w-4 h-4 text-rose-400" /> : <ShieldCheck className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => deleteCallLog(log.id)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-700 transition"
                            title="Delete call log"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No call logs matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
