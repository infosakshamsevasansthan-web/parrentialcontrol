import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Smartphone, ShieldCheck } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('GuardianLink Uncaught Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('guardian_app_mode');
    } catch {}
    window.location.reload();
  };

  private handleSwitchMode = (mode: 'parent' | 'child') => {
    try {
      localStorage.setItem('guardian_app_mode', mode);
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090e1a] text-slate-100 flex items-center justify-center p-4 select-none">
          <div className="bg-[#131d35] border border-red-500/40 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-white">App Display Recovery</h2>
              <p className="text-xs text-slate-300">
                ऐप लोड करते समय कोई समस्या आई। नीचे दिए गए बटन दबाकर आप तुरंत सही मोड में जा सकते हैं:
              </p>
            </div>

            {this.state.error && (
              <div className="bg-black/50 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-red-300 max-h-24 overflow-y-auto">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                onClick={() => this.handleSwitchMode('parent')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>👑 Parent Admin Dashboard खोलें</span>
              </button>

              <button
                onClick={() => this.handleSwitchMode('child')}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow"
              >
                <Smartphone className="w-4 h-4" />
                <span>📱 Child Target Phone Mode खोलें</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset & Reload App</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
