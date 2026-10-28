import React from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  RotateCcw, 
  X,
  PlayCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ScenarioTourBanner: React.FC = () => {
  const { 
    scenarioStep, 
    advanceScenarioStep, 
    resetDemoScenario, 
    setCurrentScreen, 
    setSelectedApplicationId,
    isTourActive,
    setIsTourActive
  } = useApp();

  if (!isTourActive) return null;

  const steps = [
    {
      title: 'Discrepancy Detected & Prerequisite Blocked',
      desc: 'Application AZL-2026-00124 has Land Area mismatch (4.80 vs 5.20 Acres) & Expired Fire NOC. EVC inspection is strictly BLOCKED while Financial & Faculty checks continue in parallel.',
      actionText: 'Resolve Land & Safety Discrepancies',
      targetScreen: 'application-detail',
      badge: 'Step 1 of 6'
    },
    {
      title: 'Discrepancies Resolved — Prerequisites Cleared',
      desc: 'Land rectification affidavit accepted. Notice how Task TSK-103 completes, and Task TSK-106 (EVC Inspection) automatically UNBLOCKS and switches to In Progress.',
      actionText: 'Schedule EVC Committee Inspection',
      targetScreen: 'application-detail',
      badge: 'Step 2 of 6'
    },
    {
      title: 'EVC Inspection Committee Deputed & Scheduled',
      desc: 'Committee panel (Prof. R. Sharma, Ar. K. Verma, Dr. Soundarajan) mobilised. Scheduled date fixed for site verification.',
      actionText: 'Simulate Physical Inspection & Submit Findings',
      targetScreen: 'evc',
      badge: 'Step 3 of 6'
    },
    {
      title: 'EVC Visit Completed — Decision Dossier Compiled',
      desc: 'Committee verified 4.80 Acre boundary, 11,400 sq.m labs, and faculty biometrics. Real-time rollup compiles Executive Decision Dossier.',
      actionText: 'Open Decision Cockpit & Grant Conditional Approval',
      targetScreen: 'application-detail',
      badge: 'Step 4 of 6'
    },
    {
      title: 'Executive Conditional Approval Granted by Official',
      desc: 'Authorized Authority digitally signs conditional approval for 4 UG courses. System automatically activates 3 post-approval compliance obligations.',
      actionText: 'Activate Compliance & Remediate Waste',
      targetScreen: 'compliance',
      badge: 'Step 5 of 6'
    },
    {
      title: 'End-to-End Workflow Concluded | ZeroLoop Waste Eliminated',
      desc: 'ZeroLoop parallelization & cryptographic desk stamps saved an estimated 18.5 days of administrative waiting and prevented 3 avoidable correction loops!',
      actionText: 'Inspect ZeroLoop Waste Intelligence Radar',
      targetScreen: 'zeroloop',
      badge: 'Completed'
    }
  ];

  const current = steps[Math.min(scenarioStep, steps.length - 1)];

  return (
    <div className="bg-[#eff6ff] text-slate-800 border-b border-blue-200 px-6 py-2.5 shadow-2xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 max-w-[1400px] mx-auto">
        <div className="flex items-start gap-2.5 flex-1">
          <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-200/80 text-blue-800">
                SIH Guided Tour: {current.badge}
              </span>
              <h2 className="text-xs md:text-sm font-bold text-slate-900">
                {current.title}
              </h2>
            </div>
            <p className="text-[11px] text-slate-600 max-w-4xl mt-0.5 leading-relaxed">
              {current.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            onClick={() => {
              setSelectedApplicationId('AZL-2026-00124');
              advanceScenarioStep();
              if (current.targetScreen) {
                setCurrentScreen(current.targetScreen as any);
              }
            }}
            disabled={scenarioStep >= 5}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              scenarioStep >= 5
                ? 'bg-slate-200 text-slate-400 cursor-default'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
            }`}
          >
            <span>{current.actionText}</span>
            {scenarioStep < 5 && <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={resetDemoScenario}
            title="Reset Scenario"
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsTourActive(false)}
            title="Dismiss Tour Banner"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-blue-100 rounded-lg transition-colors ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
