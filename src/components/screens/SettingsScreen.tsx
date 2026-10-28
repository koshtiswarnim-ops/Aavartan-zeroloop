import React, { useState } from 'react';
import { 
  Settings, 
  UserCheck, 
  ShieldCheck, 
  Sliders, 
  RotateCcw, 
  CheckCircle2, 
  Play, 
  Check, 
  Zap,
  Lock,
  Cpu,
  FileCode
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { Badge } from '../common/Badge';
import { BENCHMARK_TEST_CASES } from '../../data/mockRegressionTests';

export const SettingsScreen: React.FC = () => {
  const { currentRole, setCurrentRole, resetDemoScenario } = useApp();

  const [ruleFirstEnabled, setRuleFirstEnabled] = useState(true);
  const [strictEvcGate, setStrictEvcGate] = useState(true);
  const [parallelForking, setParallelForking] = useState(true);
  const [cryptoDedup, setCryptoDedup] = useState(true);

  const [testResults, setTestResults] = useState(BENCHMARK_TEST_CASES);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const roles: { role: Role; desc: string }[] = [
    { role: 'Administrator', desc: 'Full authority: grant final approvals, configure rules, and manage all streams.' },
    { role: 'Application Reviewer', desc: 'Verify documents, resolve/flag discrepancies, and compile scrutiny findings.' },
    { role: 'EVC Coordinator', desc: 'Empanel expert committee members, schedule physical visits, and submit inspection checklists.' },
    { role: 'Compliance Officer', desc: 'Monitor post-approval undertakings, review evidence uploads, and trigger renewals.' },
    { role: 'Read-Only Auditor', desc: 'View-only access to all dossiers, audit logs, and compliance records with zero mutation rights.' },
  ];

  const handleRunRegressionTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setTestResults(prev => prev.map(t => ({ ...t, status: 'PASSED' as const, executionTimeMs: Math.floor(Math.random() * 20) + 8 })));
      setIsRunningTests(false);
    }, 600);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Settings & Reliability Architecture
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              System Configuration
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Role-based access simulation, deterministic engine toggles, and regression test benchmark suite.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset prototype to initial state with open discrepancies and blocked EVC?')) {
              resetDemoScenario();
              alert('Synthetic sandbox reset to initial state!');
            }
          }}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Sandbox</span>
        </button>
      </div>

      {/* Role Simulator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <UserCheck className="w-5 h-5 text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900">Role-Aware Authorization Switcher</h2>
        </div>
        <p className="text-xs text-slate-500">
          Switch active user persona to evaluate role-specific views and permission restrictions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {roles.map(({ role, desc }) => (
            <div
              key={role}
              onClick={() => setCurrentRole(role)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                currentRole === role
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{role}</span>
                  {currentRole === role && (
                    <span className="text-[10px] bg-blue-600 text-white px-2 py-0.2 rounded-full font-bold">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{desc}</p>
              </div>

              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                currentRole === role ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
              }`}>
                {currentRole === role && <Check className="w-2.5 h-2.5" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Rule Engine Toggles */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Sliders className="w-5 h-5 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">Deterministic Engine & ZeroLoop Policies</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              title: 'Rule-First Validation Lock (Section 5)',
              desc: 'Enforce deterministic rules (RULE-LR-401, RULE-FS-108) before invoking AI models. Guarantees 0 fabricated checks.',
              enabled: ruleFirstEnabled,
              toggle: () => setRuleFirstEnabled(!ruleFirstEnabled)
            },
            {
              title: 'Strict EVC Prerequisite Dependency Gatekeeper',
              desc: 'Strictly blocks physical inspection mobilization until Land and Fire NOC discrepancies are marked Resolved.',
              enabled: strictEvcGate,
              toggle: () => setStrictEvcGate(!strictEvcGate)
            },
            {
              title: 'ZeroLoop Parallel DAG Forking',
              desc: 'Allows independent checks (Finance & Faculty) to proceed concurrently without waiting for Land clarification.',
              enabled: parallelForking,
              toggle: () => setParallelForking(!parallelForking)
            },
            {
              title: 'Cross-Desk Cryptographic SHA-256 Deduplication',
              desc: 'Auto-passes pre-verified statutory deeds across downstream desks using cached checksums to prevent repeated verification.',
              enabled: cryptoDedup,
              toggle: () => setCryptoDedup(!cryptoDedup)
            }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-[11px] text-slate-500">{item.desc}</p>
              </div>

              <button
                onClick={item.toggle}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                  item.enabled ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`block w-4 h-4 bg-white rounded-full shadow-xs transition-transform transform ${
                    item.enabled ? 'translate-x-6' : 'translate-x-1'
                  } top-1 absolute`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5 Reliability & Trust Architecture: Regression Test Benchmark Suite */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Regression Testing & Model Benchmark Suite (Section 5)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Testing deterministic rules and AI prompts against standardized synthetic test cases before release.
            </p>
          </div>

          <button
            onClick={handleRunRegressionTests}
            disabled={isRunningTests}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Play className={`w-3.5 h-3.5 ${isRunningTests ? 'animate-spin' : ''}`} />
            <span>{isRunningTests ? 'Executing Benchmark Suite...' : 'Run Regression Test Suite'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Test Suite Pass Rate</span>
            <span className="text-xl font-bold font-mono text-emerald-600">100.0%</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">False Positive Rate</span>
            <span className="text-xl font-bold font-mono text-slate-700">0.0%</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Avg Rule Execution Time</span>
            <span className="text-xl font-bold font-mono text-blue-700">14.2 ms</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
          {testResults.map((test) => (
            <div key={test.id} className="p-4 bg-white hover:bg-slate-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                    {test.id}
                  </span>
                  <span className="font-bold text-slate-900">{test.name}</span>
                  <Badge variant="blue" size="sm">{test.category}</Badge>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-slate-400">{test.executionTimeMs}ms</span>
                  <Badge variant="green" size="sm">{test.status}</Badge>
                </div>
              </div>
              <div className="text-[11px] text-slate-600">
                <strong className="text-slate-700">Input: </strong>{test.inputData}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium">
                <strong>Verified Outcome: </strong>{test.actualOutcome}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
