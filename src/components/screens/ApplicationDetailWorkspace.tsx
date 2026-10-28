import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Network, 
  UserCheck, 
  ShieldCheck, 
  History, 
  Sparkles, 
  Building, 
  MapPin, 
  Calendar, 
  ExternalLink,
  ShieldAlert,
  Clock,
  Check,
  X,
  FileCheck2,
  Lock,
  Unlock,
  AlertCircle,
  FileCode,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Discrepancy, DocumentItem, WorkflowNode, CommitteeMember } from '../../types';

export const ApplicationDetailWorkspace: React.FC = () => {
  const { 
    selectedApplication, 
    setCurrentScreen, 
    resolveDiscrepancy, 
    requestClarification,
    scheduleEVC,
    recordEVCOutcome,
    recordOfficialDecision,
    currentRole,
    setIsCopilotOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'verification' | 'workflow' | 'evc' | 'decision' | 'compliance' | 'audit'>('verification');

  // Modals state
  const [resolvingDiscrepancy, setResolvingDiscrepancy] = useState<Discrepancy | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  
  const [showEvcModal, setShowEvcModal] = useState(false);
  const [evcRecommendation, setEvcRecommendation] = useState<'Recommended for Approval' | 'Conditional with Rectification' | 'Not Recommended'>('Recommended for Approval');
  const [evcObservations, setEvcObservations] = useState('All 5 on-site verification criteria verified. 4.80 Acre contiguous boundary confirmed via geo-coordinates. Infrastructure built-up area and computer laboratories fully equipped.');

  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [decisionOutcome, setDecisionOutcome] = useState<'Approved' | 'Conditional Approval' | 'Rejected' | 'Rescrutiny'>('Conditional Approval');
  const [decisionRemarks, setDecisionRemarks] = useState('Approved for 4 Undergraduate disciplines (240 intake). Conditional upon submission of permanent Fire NOC endorsement within 90 days of academic commencement.');

  if (!selectedApplication) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">No application selected.</p>
        <button 
          onClick={() => setCurrentScreen('applications')} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
        >
          Return to Applications
        </button>
      </div>
    );
  }

  const app = selectedApplication;
  const openDiscs = app.discrepancies.filter(d => d.status === 'Open');
  const resolvedDiscs = app.discrepancies.filter(d => d.status === 'Resolved');

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingDiscrepancy) return;
    resolveDiscrepancy(
      app.id, 
      resolvingDiscrepancy.id, 
      resolutionNotes || 'Applicant submitted verified rectification document matching statutory requirements.'
    );
    setResolvingDiscrepancy(null);
    setResolutionNotes('');
  };

  const handleRecordEvcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordEVCOutcome(app.id, evcRecommendation, evcObservations);
    setShowEvcModal(false);
  };

  const handleDecisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordOfficialDecision(app.id, decisionOutcome, decisionRemarks);
    setShowDecisionModal(false);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Back and Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('applications')}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Applications List</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Operating Role:</span>
          <Badge variant="blue" size="sm">{currentRole}</Badge>
        </div>
      </div>

      {/* Application Master Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-sm font-mono font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                {app.id}
              </span>
              <Badge
                variant={
                  app.status === 'Approved' ? 'green' :
                  app.status === 'Verification In Progress' ? 'blue' :
                  app.status === 'EVC Scheduled' ? 'purple' :
                  app.status === 'Information Required' ? 'amber' :
                  'slate'
                }
                size="md"
                dot
              >
                {app.status}
              </Badge>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {app.category}
              </span>
              <span className="text-xs text-slate-400">
                Submitted on {app.submissionDate}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {app.institutionName}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {app.instituteType}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {app.city}, {app.state}
              </span>
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                Lead Reviewer: <strong className="text-slate-700 font-semibold">{app.assignedReviewer}</strong>
              </span>
            </div>
          </div>

          {/* Risk Score & Actions */}
          <div className="flex items-center gap-4 shrink-0 self-stretch sm:self-auto justify-between sm:justify-start border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Risk & Attention Index
              </div>
              <div className="flex items-center gap-2 justify-end mt-0.5">
                <span className={`text-xl font-extrabold font-mono ${
                  app.riskScore > 60 ? 'text-rose-600' : app.riskScore > 30 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {app.riskScore}/100
                </span>
                <Badge
                  variant={app.riskScore > 60 ? 'red' : app.riskScore > 30 ? 'amber' : 'green'}
                  size="sm"
                >
                  {app.riskScore > 60 ? 'High Attention' : app.riskScore > 30 ? 'Moderate' : 'Low Risk'}
                </Badge>
              </div>
            </div>

            <button
              onClick={() => setIsCopilotOpen(true)}
              className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl border border-blue-200 transition-colors"
              title="Ask ZeroLoop Copilot about this case"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center gap-1 mt-6 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Profile', icon: FileText },
            { id: 'documents', label: 'Document Checklist', icon: FileCheck2, badge: `${app.documents.length}` },
            { id: 'verification', label: 'Verification & Discrepancies', icon: AlertTriangle, badge: openDiscs.length > 0 ? `${openDiscs.length}` : undefined, badgeColor: 'bg-rose-100 text-rose-700' },
            { id: 'workflow', label: 'Workflow DAG & Dependencies', icon: Network },
            { id: 'evc', label: 'EVC Management', icon: UserCheck, badge: app.evcDetails?.status },
            { id: 'decision', label: 'Decision Cockpit', icon: Award },
            { id: 'compliance', label: 'Post-Compliance', icon: ShieldCheck, badge: `${app.complianceItems.length}` },
            { id: 'audit', label: 'Audit Trail', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${tab.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: OVERVIEW & PROFILE */}
      {/* ============================================================== */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h2 className="text-sm font-bold text-slate-800">Application Institutional Profile</h2>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Legal Sponsoring Body:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">Apex Educational & Charitable Trust (Reg. 2018)</p>
                </div>
                <div>
                  <span className="text-slate-400">Head of Institution / Principal:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">Prof. (Dr.) Ananya Sen, Ph.D. IISc Bengaluru</p>
                </div>
                <div>
                  <span className="text-slate-400">Campus Land Title Parcel:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">Survey Nos. 104/1 & 104/2, Electronic City Phase-2</p>
                </div>
                <div>
                  <span className="text-slate-400">Proposed Annual Intake:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">240 Undergraduate Seats across 4 AI/Tech disciplines</p>
                </div>
              </div>
            </div>

            {/* AI Executive Summary Card */}
            {app.decisionDossier && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-xl border border-blue-200/80 p-5 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider">ZeroLoop AI Scrutiny Synthesis</h3>
                  <span className="text-[10px] bg-blue-200/60 text-blue-800 px-1.5 py-0.5 rounded font-mono font-medium">96% Evidence Match</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {app.decisionDossier.aiExecutiveSummary}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Risk Radar Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Risk Indicators</h3>
              <div className="space-y-2">
                {app.decisionDossier?.riskIndicators.map((risk, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-slate-800">{risk.label}</span>
                      <Badge
                        variant={risk.level === 'High' ? 'red' : risk.level === 'Medium' ? 'amber' : 'green'}
                        size="sm"
                      >
                        {risk.level}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500">{risk.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: DOCUMENTS CHECKLIST */}
      {/* ============================================================== */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Submitted Statutory Document Checklist</h2>
              <p className="text-xs text-slate-400">Deterministic checksum verification & AI OCR text extraction snippets</p>
            </div>
            <Badge variant="blue" size="sm">{app.documents.length} Uploaded Documents</Badge>
          </div>

          <div className="divide-y divide-slate-100">
            {app.documents.map((doc) => (
              <div key={doc.id} className="p-5 hover:bg-slate-50/50 transition-colors space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <FileText className={`w-4 h-4 ${doc.status === 'Discrepancy' ? 'text-rose-600' : 'text-blue-600'}`} />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{doc.name}</h3>
                      <div className="text-[11px] text-slate-400">{doc.category} • File Size: {doc.size}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.isRepeatedCheck && (
                      <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-medium" title={doc.previousDeskCheck}>
                        Repeated Check Detected
                      </span>
                    )}
                    <Badge
                      variant={doc.status === 'Verified' ? 'green' : doc.status === 'Discrepancy' ? 'red' : 'amber'}
                      size="sm"
                    >
                      {doc.status}
                    </Badge>
                  </div>
                </div>

                {doc.ocrSnippet && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-600 font-mono leading-relaxed">
                    <span className="text-slate-400 font-semibold mr-1 font-sans">AI OCR Snippet:</span>
                    “{doc.ocrSnippet}”
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="font-mono truncate max-w-md">Checksum: {doc.fileHash}</span>
                  <span>Confidence: <strong className="text-slate-700">{doc.confidenceScore}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: VERIFICATION & DISCREPANCY ENGINE */}
      {/* ============================================================== */}
      {activeTab === 'verification' && (
        <div className="space-y-6">
          {/* Rules First Architecture Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Reliability Architecture: Rule-First Deterministic Engine
                </h2>
              </div>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                Predictable checks (dates, required fields, land contiguity calculations) are validated strictly via deterministic rule codes. Complex unstructured documents are parsed by AI as <strong>suggestions requiring authorized official review</strong>.
              </p>
            </div>
            <Badge variant="teal" size="sm">SIH Reliability Guarantee</Badge>
          </div>

          {/* Active Discrepancies List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span>Active Flagged Discrepancies</span>
                <span className="px-2 py-0.5 text-xs bg-rose-100 text-rose-700 font-bold rounded-full">
                  {openDiscs.length} Open
                </span>
              </h2>
              <span className="text-xs text-slate-400">
                Mandatory resolution required before EVC unblocking
              </span>
            </div>

            {openDiscs.map((disc) => (
              <div 
                key={disc.id}
                className="bg-white rounded-xl border-2 border-rose-200/90 p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {disc.ruleCode}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">{disc.documentName}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {disc.isAI ? 'AI Vision Assisted' : 'Deterministic Rule'}
                    </span>
                    <Badge variant={disc.confidence > 90 ? 'green' : 'amber'} size="sm">
                      {disc.confidence}% Confidence
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-medium">Statutory Requirement / Expected:</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{disc.expectedValue}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Extracted Value / Deficiency Found:</span>
                    <p className="font-semibold text-rose-700 mt-0.5">{disc.foundValue}</p>
                  </div>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                  <strong className="text-slate-800">Clear Explanation & Root Cause: </strong>
                  {disc.explanation}
                </div>

                {/* Reviewer Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    Detected on {disc.dateDetected} • Blocking downstream EVC inspection
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => requestClarification(app.id, disc.id, 'Notice issued for land boundary survey.')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Request Clarification
                    </button>
                    <button
                      onClick={() => {
                        setResolvingDiscrepancy(disc);
                        setResolutionNotes(
                          disc.id === 'DISC-124-01' 
                            ? 'Applicant submitted registered boundary survey affidavit verifying 4.80 contiguous acres. Meets urban norm of 4.0 Acres. Footprint aligned.' 
                            : 'Renewed provisional endorsement with Fire Station receipt #FSO-2026-881 verified.'
                        );
                      }}
                      className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Resolve with Rectification</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {openDiscs.length === 0 && (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="text-sm font-bold text-emerald-900">All Document Discrepancies Resolved</h3>
                <p className="text-xs text-emerald-700 max-w-lg mx-auto">
                  Deterministic prerequisites cleared. Dependent Expert Visiting Committee (EVC) task is UNBLOCKED and ready for scheduling.
                </p>
              </div>
            )}

            {/* Resolved History */}
            {resolvedDiscs.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Resolved Discrepancies History ({resolvedDiscs.length})
                </h3>
                {resolvedDiscs.map(disc => (
                  <div key={disc.id} className="p-3.5 bg-white rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-700">{disc.ruleCode}</span>
                        <span className="font-semibold text-slate-800">{disc.documentName}</span>
                        <Badge variant="green" size="sm">Resolved</Badge>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Resolution Note: {disc.resolutionNotes}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400">By {disc.resolvedBy || 'Reviewer'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: DEPENDENCY WORKFLOW DAG */}
      {/* ============================================================== */}
      {activeTab === 'workflow' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Dependency-Aware Workflow Visualizer</h2>
                <p className="text-xs text-slate-400">Visualizing parallel processing tracks, dependency blockers, and SLA duration</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Parallel Branching Active
                </span>
              </div>
            </div>

            {/* Visual Task Graph representation */}
            <div className="space-y-4">
              {app.workflowTasks.map((task, idx) => {
                const isBlocked = task.status === 'Blocked';
                const isCompleted = task.status === 'Completed';
                const isInProgress = task.status === 'In Progress';

                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isBlocked
                        ? 'border-rose-300 bg-rose-50/50 shadow-2xs'
                        : isCompleted
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : isInProgress
                        ? 'border-blue-300 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 bg-slate-50/60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isBlocked
                            ? 'bg-rose-600 text-white'
                            : isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isInProgress
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isCompleted ? <Check className="w-4 h-4" /> : isBlocked ? <Lock className="w-4 h-4" /> : idx + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs text-slate-400">{task.id}</span>
                            <h3 className="text-xs font-bold text-slate-900">{task.title}</h3>
                            {task.isParallel && (
                              <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.2 rounded font-semibold">
                                Parallel Track
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Stage: <strong className="text-slate-700">{task.stage}</strong> • Assigned: {task.assignedUser} ({task.ownerRole})
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <div className="text-right text-[11px] font-mono">
                          <span className="text-slate-400">SLA: </span>
                          <span className={`font-semibold ${task.elapsedDays > task.slaDays ? 'text-rose-600' : 'text-slate-700'}`}>
                            {task.elapsedDays}/{task.slaDays} Days
                          </span>
                        </div>

                        <Badge
                          variant={isCompleted ? 'green' : isBlocked ? 'red' : isInProgress ? 'blue' : 'slate'}
                          size="sm"
                        >
                          {task.status}
                        </Badge>
                      </div>
                    </div>

                    {isBlocked && task.blockReason && (
                      <div className="mt-3 p-3 bg-rose-100/70 border border-rose-300 rounded-lg text-xs text-rose-900 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                        <div>
                          <strong>Strict Dependency Blocker: </strong>
                          {task.blockReason}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: EVC MANAGEMENT */}
      {/* ============================================================== */}
      {activeTab === 'evc' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-800">Expert Visiting Committee (EVC) Inspection</h2>
                  <Badge variant={app.evcDetails?.status === 'Completed' ? 'green' : 'purple'} size="sm">
                    {app.evcDetails?.status || 'Scheduled'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Physical infrastructure, laboratory, and biometric faculty on-site verification.
                </p>
              </div>

              {app.evcDetails?.status !== 'Completed' && (
                <button
                  onClick={() => setShowEvcModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Simulate & Record Physical Visit Outcome</span>
                </button>
              )}
            </div>

            {/* Committee Members Roster */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Empanelled Committee Roster
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {app.evcDetails?.committeeMembers.map((member, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{member.name}</span>
                      <span className="text-[10px] bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded border border-purple-200">
                        {member.role}
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px]">{member.designation}</div>
                    <div className="text-slate-400 text-[10px]">{member.institution}</div>
                    <div className="text-slate-500 font-mono text-[10px] pt-1">{member.contact}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Mandatory Physical Inspection Points
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {app.evcDetails?.checklist.map((item) => (
                  <div key={item.id} className="p-3.5 bg-white hover:bg-slate-50/50 flex items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {item.category}
                      </span>
                      <p className="font-medium text-slate-800">{item.item}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.geoVerified && (
                        <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded font-mono">
                          Geo-Verified
                        </span>
                      )}
                      <Badge
                        variant={item.status === 'Compliant' ? 'green' : 'amber'}
                        size="sm"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Observations if completed */}
            {app.evcDetails?.observationsSummary && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    EVC Visit Signed Observation Report
                  </h4>
                  <Badge variant="green" size="sm">{app.evcDetails.recommendation}</Badge>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {app.evcDetails.observationsSummary}
                </p>
                <div className="text-[10px] font-mono text-emerald-600">
                  Completed on {app.evcDetails.visitCompletedDate} • Signed off by Committee Chairman
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 6: CONNECTED DECISION SUPPORT */}
      {/* ============================================================== */}
      {activeTab === 'decision' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Executive Approval Authority Decision Cockpit</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Consolidated dossier bringing Document Scrutiny, EVC Findings, and AI Synthesis for Official Decision.
                </p>
              </div>

              {!app.decisionDossier?.officialDecision && (
                <button
                  onClick={() => setShowDecisionModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Record Official Authority Decision</span>
                </button>
              )}
            </div>

            {/* Signed Decision Record if Finalized */}
            {app.decisionDossier?.officialDecision ? (
              <div className="p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 rounded-xl border border-emerald-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-sm font-extrabold text-emerald-950 uppercase tracking-wide">
                      Official Regulatory Decision Finalized
                    </h3>
                  </div>
                  <Badge variant="green" size="md">{app.decisionDossier.officialDecision.outcome}</Badge>
                </div>

                <div className="text-xs text-slate-800 space-y-2">
                  <p><strong>Official Justification / Order: </strong>{app.decisionDossier.officialDecision.remarks}</p>
                  <div>
                    <span className="font-semibold text-slate-700">Conditions Imposed:</span>
                    <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[11px] text-slate-600">
                      {app.decisionDossier.officialDecision.conditionsApplied?.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-emerald-700 font-mono">
                  <span>Signed by: {app.decisionDossier.officialDecision.signedBy}</span>
                  <span>Timestamp: {app.decisionDossier.officialDecision.timestamp}</span>
                </div>
              </div>
            ) : (
              /* Decision Summary Dossier */
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">1. Scrutiny Status</span>
                    <p className="font-bold text-slate-800">
                      {openDiscs.length === 0 ? 'All Documents Passed' : `${openDiscs.length} Discrepancies Open`}
                    </p>
                    <p className="text-[11px] text-slate-500">Land Title 4.80 Acres verified with rectification.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">2. EVC Outcome</span>
                    <p className="font-bold text-slate-800">
                      {app.evcDetails?.status === 'Completed' ? 'Recommended for Approval' : 'Visit Staged / Completed'}
                    </p>
                    <p className="text-[11px] text-slate-500">11,400 sq.m built-up area and 18 faculty verified.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">3. Statutory Norms</span>
                    <p className="font-bold text-emerald-700">92% Compliance Index</p>
                    <p className="text-[11px] text-slate-500">FDR corpus INR 2.50 Cr lien active with SBI.</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Human Authorization Rule (Section 4D): </strong>
                    ZeroLoop Copilot synthesizes findings, but AI does NOT independently grant approvals. Authorized official must sign off.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 7: POST-APPROVAL COMPLIANCE */}
      {/* ============================================================== */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Post-Approval Continuous Compliance Obligations</h2>
                <p className="text-xs text-slate-400">Tracking post-approval undertakings and statutory annual renewal deadlines</p>
              </div>
              <Badge variant="teal" size="sm">{app.complianceItems.length} Active Obligations</Badge>
            </div>

            <div className="divide-y divide-slate-100">
              {app.complianceItems.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                        {item.id}
                      </span>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <Badge variant={item.status === 'Overdue' ? 'red' : item.status === 'Compliant' ? 'green' : 'amber'} size="sm">
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500">{item.description}</p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Category: {item.category} • Due Date: {item.dueDate} ({item.daysRemaining} days remaining)
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg font-semibold text-xs transition-colors">
                      Upload Proof
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 8: AUDIT TRAIL */}
      {/* ============================================================== */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Application Audit & Event Stream</h2>
            <p className="text-xs text-slate-400">Cryptographically verifiable, tamper-evident log of all actions on {app.id}</p>
          </div>

          <div className="space-y-3">
            {[
              { time: 'Today 21:50 IST', action: 'DISCREPANCY_RESOLVED', desc: 'Land rectification affidavit accepted by Reviewer.', user: currentRole, hash: '0x8f2a11b9' },
              { time: 'Today 21:48 IST', action: 'PARALLEL_TASK_COMPLETED', desc: 'Financial solvency passed in parallel branch.', user: 'Finance Desk', hash: '0x3c990a42' },
              { time: '2026-10-15 11:30 IST', action: 'DISCREPANCY_FLAGGED', desc: 'RULE-LR-401 Land Area mismatch detected by Deterministic Rule Engine.', user: 'Rule Engine', hash: '0x12bb45ca' },
              { time: '2026-10-10 09:30 IST', action: 'APPLICATION_CREATED', desc: 'Application AZL-2026-00124 registered with fee clearance.', user: 'Applicant', hash: '0x098ff412' }
            ].map((log, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400">{log.time}</span>
                    <span className="font-bold text-slate-800">{log.action}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                      {log.hash}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{log.desc}</p>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold shrink-0">{log.user}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 1: RESOLVE DISCREPANCY */}
      {/* ============================================================== */}
      {resolvingDiscrepancy && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Resolve Document Discrepancy</h3>
              </div>
              <button 
                onClick={() => setResolvingDiscrepancy(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg text-xs space-y-1">
              <div className="flex items-center gap-2 font-semibold text-blue-900">
                <span className="font-mono">{resolvingDiscrepancy.ruleCode}</span>
                <span>{resolvingDiscrepancy.documentName}</span>
              </div>
              <p className="text-[11px] text-blue-700">{resolvingDiscrepancy.explanation}</p>
            </div>

            <form onSubmit={handleResolveSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Rectification & Resolution Notes
                </label>
                <textarea
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  placeholder="Record verification notes, survey affidavit acceptance, or receipt number..."
                  required
                />
              </div>

              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Resolving this will immediately unblock Task TSK-106 (EVC Inspection) in the workflow DAG!
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setResolvingDiscrepancy(null)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-sm"
                >
                  Confirm Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: RECORD EVC VISIT */}
      {/* ============================================================== */}
      {showEvcModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900">Record EVC Physical Inspection Outcome</h3>
              </div>
              <button onClick={() => setShowEvcModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecordEvcSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Committee Recommendation</label>
                <select
                  value={evcRecommendation}
                  onChange={(e) => setEvcRecommendation(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="Recommended for Approval">Recommended for Approval (Full Compliance)</option>
                  <option value="Conditional with Rectification">Conditional with Rectification</option>
                  <option value="Not Recommended">Not Recommended (Substantial Deficiencies)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Committee Observations Summary</label>
                <textarea
                  value={evcObservations}
                  onChange={(e) => setEvcObservations(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  required
                />
              </div>

              <div className="p-2.5 bg-purple-50 rounded-lg border border-purple-200 text-[11px] text-purple-900 flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 shrink-0" />
                <span>
                  All 5 geo-tagged criteria will be marked Compliant and decision docket compiled.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEvcModal(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg shadow-sm"
                >
                  Submit Inspection Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: OFFICIAL DECISION */}
      {/* ============================================================== */}
      {showDecisionModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Record Competent Authority Decision</h3>
              </div>
              <button onClick={() => setShowDecisionModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDecisionSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Decision Outcome</label>
                <select
                  value={decisionOutcome}
                  onChange={(e) => setDecisionOutcome(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="Approved">Grant Approval (Unconditional)</option>
                  <option value="Conditional Approval">Grant Conditional Approval (Under Taking Required)</option>
                  <option value="Rescrutiny">Refer Back for Re-Scrutiny</option>
                  <option value="Rejected">Reject Application with Stated Reasons</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Order Justification</label>
                <textarea
                  value={decisionRemarks}
                  onChange={(e) => setDecisionRemarks(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  required
                />
              </div>

              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Affixes digital token signature for role: <strong>{currentRole}</strong>.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowDecisionModal(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-sm"
                >
                  Sign & Finalize Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
