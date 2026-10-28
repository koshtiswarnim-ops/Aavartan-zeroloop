import React, { useState } from 'react';
import { 
  Network, 
  GitMerge, 
  Clock, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Layers,
  Sparkles,
  Lock,
  Unlock,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const WorkflowIntelligenceScreen: React.FC = () => {
  const { 
    selectedApplication, 
    setCurrentScreen, 
    setSelectedApplicationId,
    applications 
  } = useApp();

  const [compareMode, setCompareMode] = useState<boolean>(true);
  const app = selectedApplication || applications[0];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Dependency-Aware Workflow Intelligence
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
              DAG Orchestrator
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Dynamic Directed Acyclic Graph (DAG) replacing rigid linear approvals with parallel execution and intelligent blockers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <GitMerge className="w-3.5 h-3.5 text-indigo-600" />
            <span>{compareMode ? 'Hide Comparison' : 'Compare Traditional vs ZeroLoop'}</span>
          </button>
        </div>
      </div>

      {/* Sequential vs ZeroLoop Comparison Banner */}
      {compareMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Traditional Sequential Workflow
              </span>
              <span className="text-xs font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/40">
                Avg: 48 Business Days
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every step is forced sequentially. A tiny land boundary clarification halts all downstream financial, faculty, and committee preparations, leaving desks idle for weeks.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <span>Intake</span> &rarr; <span>Land Check (18d stall)</span> &rarr; <span>Finance (waiting)</span> &rarr; <span>EVC</span> &rarr; <span>Decision</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl border border-indigo-700/70 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-teal-300" />
                <span>ZeroLoop Dependency-Aware DAG</span>
              </span>
              <span className="text-xs font-mono bg-teal-400/20 text-teal-300 px-2 py-0.5 rounded border border-teal-400/40 font-bold">
                Avg: 19 Business Days (60% Faster)
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Forks independent checks in parallel (Financial solvency + Faculty qualifications proceed concurrently). Mandatory prerequisites strictly block only the dependent node (EVC) without stalling the entire institution!
            </p>
            <div className="flex items-center gap-1 text-[11px] text-teal-300 font-mono">
              <span>Intake</span> &rarr; <span className="underline">Parallel [Land | Finance | Faculty]</span> &rarr; <span>EVC Trigger</span> &rarr; <span>Decision</span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Active Workflow Graph for Selected App */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {app.id}
              </span>
              <h2 className="text-sm font-bold text-slate-900">{app.institutionName}</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live dependency tracking across 9 lifecycle workflow nodes.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedApplicationId(app.id);
              setCurrentScreen('application-detail');
            }}
            className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Open Application Workspace</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Workflow Nodes Grid with Dependency Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {app.workflowTasks.map((task) => {
            const isBlocked = task.status === 'Blocked';
            const isCompleted = task.status === 'Completed';
            const isInProgress = task.status === 'In Progress';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isBlocked
                    ? 'border-rose-300 bg-rose-50/60 shadow-xs'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : isInProgress
                    ? 'border-blue-400 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 opacity-80'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                      {task.id}
                    </span>
                    <Badge
                      variant={isCompleted ? 'green' : isBlocked ? 'red' : isInProgress ? 'blue' : 'slate'}
                      size="sm"
                    >
                      {task.status}
                    </Badge>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug">{task.title}</h3>
                  <div className="text-[11px] text-slate-500">
                    Stage: <span className="font-semibold text-slate-700">{task.stage}</span>
                  </div>

                  {task.dependencies.length > 0 && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      Prerequisites: {task.dependencies.join(', ')}
                    </div>
                  )}

                  {task.isParallel && (
                    <div className="text-[10px] text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded w-fit border border-indigo-200">
                      Parallel Processing Track
                    </div>
                  )}

                  {isBlocked && task.blockReason && (
                    <div className="p-2.5 bg-rose-100/90 border border-rose-300 rounded-lg text-[11px] text-rose-900 mt-2 flex items-start gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-rose-700 shrink-0 mt-0.5" />
                      <span>{task.blockReason}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">
                    SLA: {task.elapsedDays}/{task.slaDays}d
                  </span>
                  <span className="text-slate-600 font-medium truncate max-w-[120px]">
                    {task.assignedUser}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
