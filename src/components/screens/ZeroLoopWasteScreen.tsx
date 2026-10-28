import React, { useState } from 'react';
import { 
  Zap, 
  RotateCcw, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  TrendingDown,
  Activity,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const ZeroLoopWasteScreen: React.FC = () => {
  const { 
    wasteItems, 
    remediateWaste, 
    setIsCopilotOpen 
  } = useApp();

  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredWaste = wasteItems.filter(item => {
    if (filterType === 'ALL') return true;
    if (filterType === 'DETECTED') return item.status === 'Detected';
    if (filterType === 'REMEDIATED') return item.status === 'Remediated';
    return item.type === filterType;
  });

  const totalHoursSaved = wasteItems
    .filter(w => w.status === 'Remediated')
    .reduce((acc, w) => acc + w.estimatedHoursSaved, 0);

  const totalDaysSaved = wasteItems
    .filter(w => w.status === 'Remediated')
    .reduce((acc, w) => acc + w.estimatedDelayDays, 0);

  const activeWasteCount = wasteItems.filter(w => w.status === 'Detected').length;

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              ZeroLoop Waste Intelligence Engine
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-teal-500/10 text-teal-700 border border-teal-500/30 rounded-full">
              SIGNATURE DIFFERENTIATOR
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Continuous detection of invisible process waste: redundant verification, ping-pong deficiency loops, and sequential stalls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Ask Copilot for Waste Audit</span>
          </button>
        </div>
      </div>

      {/* Signature Metrics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-gradient-to-br from-indigo-900 via-blue-950 to-slate-900 text-white rounded-2xl border border-indigo-800 shadow-md">
          <div className="flex items-center justify-between text-teal-300">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Waste Remediated</span>
            <Zap className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold font-mono text-teal-300">
              {wasteItems.filter(w => w.status === 'Remediated').length} Loops
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Active Detected: <strong className="text-white">{activeWasteCount}</strong>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Delay Eliminated</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold font-mono text-slate-900">
              {totalDaysSaved.toFixed(1)} Days
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Turnaround reduced across 6 desks</span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Reviewer Hours Saved</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold font-mono text-slate-900">
              {totalHoursSaved.toFixed(0)} Hours
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Est. administrative efficiency +₹3.4L
            </div>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Process Friction Index</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold font-mono text-indigo-700">
              28 / 100
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">
              Dropped from 84/100 baseline
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 flex-wrap">
        {[
          { id: 'ALL', label: 'All Detected Waste' },
          { id: 'DETECTED', label: 'Open Opportunities', badge: `${activeWasteCount}` },
          { id: 'REMEDIATED', label: 'Remediated & Saved' },
          { id: 'Repeated Verification', label: 'Repeated Verification' },
          { id: 'Dependency Bottleneck', label: 'Dependency Bottlenecks' },
          { id: 'Correction Cycle', label: 'Correction Ping-Pong' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              filterType === f.id
                ? 'bg-blue-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{f.label}</span>
            {f.badge && (
              <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                {f.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Waste Items Detailed Cards */}
      <div className="space-y-4">
        {filteredWaste.map((item) => {
          const isRemediated = item.status === 'Remediated';

          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all ${
                isRemediated
                  ? 'bg-emerald-50/30 border-emerald-200'
                  : 'bg-white border-slate-200 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {item.id}
                    </span>
                    <Badge variant={isRemediated ? 'green' : 'amber'} size="sm">
                      {item.status}
                    </Badge>
                    <span className="text-xs font-bold text-slate-800 px-2 py-0.5 bg-slate-100 rounded">
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-400">
                      Stage: <strong className="text-slate-700">{item.stageAffected}</strong>
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 pt-0.5">{item.title}</h3>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Delay Impact</span>
                    <span className="font-extrabold font-mono text-slate-800 text-sm">
                      ~{item.estimatedDelayDays} Days
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Hours Saved</span>
                    <span className="font-extrabold font-mono text-teal-700 text-sm">
                      {item.estimatedHoursSaved}h
                    </span>
                  </div>
                </div>
              </div>

              {/* Problem & Evidence Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    1. What the Problem Is:
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">{item.problemDescription}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    2. Supporting Evidence & Case Log:
                  </span>
                  <p className="text-slate-600 leading-relaxed">{item.evidenceData}</p>
                </div>
              </div>

              {/* Recommended Action & 1-Click Remediation Button */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>ZeroLoop Recommended Corrective Action:</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
                    {item.recommendedCorrectiveAction}
                  </p>
                </div>

                <div className="shrink-0">
                  {isRemediated ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1.5 rounded-lg border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Remediation Active</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => remediateWaste(item.id)}
                      className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                    >
                      <Zap className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Apply 1-Click ZeroLoop Fix</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
