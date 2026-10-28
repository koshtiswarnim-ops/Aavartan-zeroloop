import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  Application, 
  Role, 
  Discrepancy, 
  WasteItem, 
  AlertItem, 
  AuditLogEntry, 
  ComplianceObligation,
  EVCSchedule
} from '../types';
import { INITIAL_APPLICATIONS } from '../data/mockApplications';
import { INITIAL_WASTE_ITEMS } from '../data/mockWasteData';
import { INITIAL_ALERTS } from '../data/mockAlerts';
import { INITIAL_AUDIT_LOGS } from '../data/mockAudit';

export type ScreenType = 
  | 'overview' 
  | 'applications' 
  | 'application-detail' 
  | 'workflow' 
  | 'evc' 
  | 'compliance' 
  | 'zeroloop' 
  | 'alerts' 
  | 'analytics' 
  | 'audit' 
  | 'settings';

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  references?: string[];
  confidence?: number;
  isSimulated?: boolean;
}

interface AppContextValue {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  selectedApplicationId: string;
  setSelectedApplicationId: (id: string) => void;
  selectedApplication: Application | undefined;
  applications: Application[];
  wasteItems: WasteItem[];
  alerts: AlertItem[];
  auditLogs: AuditLogEntry[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  copilotMessages: CopilotMessage[];
  scenarioStep: number;
  setScenarioStep: (step: number) => void;
  isTourActive: boolean;
  setIsTourActive: (active: boolean) => void;
  advanceScenarioStep: () => void;
  resetDemoScenario: () => void;
  
  // Interactive mutations
  resolveDiscrepancy: (appId: string, discId: string, resolutionNotes: string) => void;
  requestClarification: (appId: string, discId: string, notes: string) => void;
  scheduleEVC: (appId: string, date: string) => void;
  recordEVCOutcome: (appId: string, recommendation: EVCSchedule['recommendation'], observations: string) => void;
  recordOfficialDecision: (appId: string, outcome: 'Approved' | 'Conditional Approval' | 'Rejected' | 'Rescrutiny', remarks: string, conditions?: string[]) => void;
  addComplianceObligation: (obligation: ComplianceObligation) => void;
  remediateWaste: (wasteId: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
  sendCopilotMessage: (query: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('overview');
  const [currentRole, setCurrentRole] = useState<Role>('Administrator');
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>('AZL-2026-00124');
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [wasteItems, setWasteItems] = useState<WasteItem[]>(INITIAL_WASTE_ITEMS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [scenarioStep, setScenarioStep] = useState<number>(0);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);

  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Greetings. I am ZeroLoop Copilot — an AI Regulatory Operations Assistant for AAVARTAN ZEROLOOP. I provide evidence-grounded insights on workflow bottlenecks, document discrepancies, EVC scheduling, and waste elimination. Ask me any question or pick a suggested prompt below.',
      timestamp: 'Just now',
      confidence: 100,
      isSimulated: true
    }
  ]);

  const selectedApplication = useMemo(() => {
    return applications.find(app => app.id === selectedApplicationId) || applications[0];
  }, [applications, selectedApplicationId]);

  const addAuditEntry = (
    appId: string | undefined, 
    actionType: AuditLogEntry['actionType'], 
    summary: string, 
    details: string,
    previousState?: string,
    newState?: string
  ) => {
    const newEntry: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST',
      applicationId: appId,
      user: `${currentRole} (Active Session)`,
      role: currentRole,
      actionType,
      summary,
      details,
      previousState,
      newState,
      cryptographicHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // 1. Resolve Discrepancy & Unblock Dependent Tasks
  const resolveDiscrepancy = (appId: string, discId: string, resolutionNotes: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;

      const updatedDiscrepancies = app.discrepancies.map(d => {
        if (d.id === discId) {
          return {
            ...d,
            status: 'Resolved' as const,
            resolvedBy: `${currentRole}`,
            resolutionNotes
          };
        }
        return d;
      });

      const allResolved = updatedDiscrepancies.every(d => d.status === 'Resolved');

      // Update documents
      const updatedDocs = app.documents.map(doc => {
        const remainingDiscs = updatedDiscrepancies.filter(d => d.documentId === doc.id && d.status === 'Open');
        return {
          ...doc,
          discrepanciesCount: remainingDiscs.length,
          status: remainingDiscs.length === 0 ? ('Verified' as const) : doc.status
        };
      });

      // Update Workflow Tasks: If all discrepancies in TSK-103 are resolved, complete TSK-103 and unblock TSK-106 (EVC)
      const updatedTasks = app.workflowTasks.map(task => {
        if (task.id === 'TSK-103' && allResolved) {
          return {
            ...task,
            status: 'Completed' as const,
            blockReason: undefined,
            isBottleneck: false
          };
        }
        if (task.id === 'TSK-106' && allResolved) {
          return {
            ...task,
            status: 'In Progress' as const,
            blockReason: undefined,
            recommendedAction: 'Prerequisites cleared! Schedule physical inspection committee.'
          };
        }
        return task;
      });

      return {
        ...app,
        status: allResolved ? ('EVC Pending' as const) : app.status,
        currentStage: allResolved ? 'EVC Mobilization Staging' : app.currentStage,
        riskScore: Math.max(10, app.riskScore - 30),
        documents: updatedDocs,
        discrepancies: updatedDiscrepancies,
        workflowTasks: updatedTasks,
        evcDetails: app.evcDetails ? {
          ...app.evcDetails,
          status: allResolved ? 'Scheduled' : app.evcDetails.status
        } : undefined
      };
    }));

    // Resolve matching alert
    setAlerts(prev => prev.map(a => {
      if (a.applicationId === appId && (a.actionType === 'RESOLVE_DISCREPANCY')) {
        return { ...a, status: 'Resolved' as const };
      }
      return a;
    }));

    addAuditEntry(
      appId,
      'DISCREPANCY_RESOLVED',
      `Discrepancy ${discId} resolved by ${currentRole}`,
      `Resolution Notes: ${resolutionNotes}. Dependent EVC check re-evaluated.`,
      'Open',
      'Resolved'
    );
  };

  const requestClarification = (appId: string, discId: string, notes: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      return {
        ...app,
        status: 'Information Required' as const,
        discrepancies: app.discrepancies.map(d => d.id === discId ? { ...d, status: 'Clarification Requested' as const, resolutionNotes: notes } : d)
      };
    }));
    addAuditEntry(appId, 'DISCREPANCY_FLAGGED', `Clarification requested for discrepancy ${discId}`, notes);
  };

  // 2. Schedule EVC
  const scheduleEVC = (appId: string, date: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId || !app.evcDetails) return app;
      return {
        ...app,
        status: 'EVC Scheduled' as const,
        currentStage: 'EVC Inspection Staged',
        evcDetails: {
          ...app.evcDetails,
          scheduledDate: date,
          status: 'Scheduled'
        }
      };
    }));
    addAuditEntry(appId, 'EVC_SCHEDULED', `EVC Inspection scheduled for ${date}`, `Committee members notified.`);
  };

  // 3. Record EVC Outcome
  const recordEVCOutcome = (
    appId: string, 
    recommendation: EVCSchedule['recommendation'], 
    observations: string
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const updatedTasks = app.workflowTasks.map(t => {
        if (t.id === 'TSK-106') {
          return { ...t, status: 'Completed' as const };
        }
        if (t.id === 'TSK-107' || t.id === 'TSK-108') {
          return { ...t, status: 'In Progress' as const };
        }
        return t;
      });

      const updatedChecklist = app.evcDetails?.checklist.map(item => ({
        ...item,
        status: 'Compliant' as const,
        geoVerified: true
      })) || [];

      return {
        ...app,
        status: 'Awaiting Decision' as const,
        currentStage: 'Official Decision Docket Ready',
        workflowTasks: updatedTasks,
        evcDetails: app.evcDetails ? {
          ...app.evcDetails,
          status: 'Completed',
          recommendation,
          observationsSummary: observations,
          checklist: updatedChecklist,
          visitCompletedDate: new Date().toISOString().split('T')[0]
        } : undefined
      };
    }));

    addAuditEntry(
      appId,
      'EVC_OUTCOME_RECORDED',
      `EVC Physical Inspection report recorded: ${recommendation}`,
      `Observations: ${observations}. Docket compiled for Executive Approval Authority.`
    );
  };

  // 4. Record Official Decision
  const recordOfficialDecision = (
    appId: string, 
    outcome: 'Approved' | 'Conditional Approval' | 'Rejected' | 'Rescrutiny', 
    remarks: string,
    conditions?: string[]
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;

      const newStatus = outcome === 'Approved' ? 'Approved' 
        : outcome === 'Conditional Approval' ? 'Conditional Approval' 
        : outcome === 'Rejected' ? 'Rejected' 
        : 'Under Scrutiny';

      const updatedTasks = app.workflowTasks.map(t => {
        if (t.id === 'TSK-108') return { ...t, status: 'Completed' as const };
        if (t.id === 'TSK-109') return { ...t, status: 'In Progress' as const };
        return t;
      });

      return {
        ...app,
        status: newStatus as any,
        currentStage: outcome.includes('Approval') ? 'Post-Approval Compliance Monitoring' : 'Decision Concluded',
        workflowTasks: updatedTasks,
        decisionDossier: app.decisionDossier ? {
          ...app.decisionDossier,
          officialDecision: {
            outcome,
            remarks,
            signedBy: `${currentRole} (Digitally Signed Token 0x7A9B)`,
            timestamp: new Date().toLocaleString('en-IN'),
            conditionsApplied: conditions || ['Annual Fire NOC renewal submission', 'Faculty biometric API stream integration']
          }
        } : undefined
      };
    }));

    addAuditEntry(
      appId,
      'DECISION_FINALIZED',
      `Official Executive Decision recorded: ${outcome}`,
      `Remarks: ${remarks}. Digital signature affixed by ${currentRole}.`
    );
  };

  // 5. Add Compliance Obligation
  const addComplianceObligation = (obligation: ComplianceObligation) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== obligation.applicationId) return app;
      return {
        ...app,
        complianceItems: [obligation, ...app.complianceItems]
      };
    }));
    addAuditEntry(obligation.applicationId, 'COMPLIANCE_CREATED', `Compliance Obligation added: ${obligation.title}`, `Due date: ${obligation.dueDate}`);
  };

  // 6. Remediate Waste (Signature ZeroLoop action)
  const remediateWaste = (wasteId: string) => {
    setWasteItems(prev => prev.map(w => {
      if (w.id === wasteId) {
        return {
          ...w,
          status: 'Remediated',
          frictionIndex: Math.max(10, w.frictionIndex - 60)
        };
      }
      return w;
    }));

    addAuditEntry(
      undefined,
      'WASTE_ELIMINATED',
      `ZeroLoop Automated Waste Remediation executed for ${wasteId}`,
      `Applied automated cross-desk cryptographic handshake. Friction reduced.`
    );
  };

  // 7. Acknowledge / Resolve Alerts
  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Acknowledged' } : a));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Resolved' } : a));
  };

  // 8. Scenario Walkthrough Controls
  const advanceScenarioStep = () => {
    const nextStep = scenarioStep + 1;
    setScenarioStep(nextStep);

    if (nextStep === 1) {
      // Step 1: Resolve the land discrepancy and fire NOC
      resolveDiscrepancy(
        'AZL-2026-00124', 
        'DISC-124-01', 
        'Applicant submitted registered boundary survey affidavit verifying 4.80 contiguous acres. Satisfies metro norm of 4.0 Acres. Site plan footprint realigned.'
      );
      resolveDiscrepancy(
        'AZL-2026-00124',
        'DISC-124-02',
        'Applicant submitted renewed provisional endorsement with Fire Station Officer receipt #FSO-2026-881. Undertaking given for final cert before inauguration.'
      );
    } else if (nextStep === 2) {
      // Step 2: Schedule EVC
      scheduleEVC('AZL-2026-00124', '2026-11-04');
    } else if (nextStep === 3) {
      // Step 3: Record EVC Outcome
      recordEVCOutcome(
        'AZL-2026-00124',
        'Recommended for Approval',
        'Physical site inspection completed. Boundaries verified via geo-fencing (4.80 Acres). Built-up area 11,400 sq.m verified. 18 Faculty biometrics verified.'
      );
    } else if (nextStep === 4) {
      // Step 4: Grant Official Conditional Approval
      recordOfficialDecision(
        'AZL-2026-00124',
        'Conditional Approval',
        'Approved for 4 UG courses (CSE, AI&DS, ECE, Mechanical) with 240 total intake. Conditional on submission of permanent Fire NOC endorsement within 90 days.'
      );
    } else if (nextStep === 5) {
      // Step 5: Remediate remaining waste
      remediateWaste('WST-2026-001');
      remediateWaste('WST-2026-005');
    }
  };

  const resetDemoScenario = () => {
    setApplications(INITIAL_APPLICATIONS);
    setWasteItems(INITIAL_WASTE_ITEMS);
    setAlerts(INITIAL_ALERTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setScenarioStep(0);
    setSelectedApplicationId('AZL-2026-00124');
    addAuditEntry(undefined, 'SECURITY_ROLE_SWITCH', 'Demo Scenario Reset to Initial State', 'All synthetic records restored.');
  };

  // 9. Copilot Chat Response Logic
  const sendCopilotMessage = (query: string) => {
    const userMsg: CopilotMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setCopilotMessages(prev => [...prev, userMsg]);

    // Generate intelligent, evidence-based contextual response
    setTimeout(() => {
      let reply = '';
      let refs: string[] = [];
      const qLower = query.toLowerCase();

      if (qLower.includes('why') && (qLower.includes('delayed') || qLower.includes('blocked'))) {
        reply = `Application AZL-2026-00124 (Apex Institute) experienced delays due to two prerequisite blockers in Document Scrutiny:
1. Land Deed Area Variance (RULE-LR-401): Registered deed shows 4.80 Acres while architectural submission indicated 5.20 Acres.
2. Expired Fire NOC (RULE-FS-108): Expired on 15-Sept-2026.

These blockers kept Task TSK-106 (EVC Physical Inspection) BLOCKED because safety and title are non-negotiable statutory prerequisites. Meanwhile, independent tasks TSK-104 (Financial Solvency) and TSK-105 (Faculty Cadre) were parallelized by ZeroLoop, saving 11 days.`;
        refs = ['AZL-2026-00124', 'RULE-LR-401', 'RULE-FS-108', 'TSK-106'];
      } else if (qLower.includes('evc') || qLower.includes('committee')) {
        reply = `EVC Inspection status for ${selectedApplication?.institutionName}:
- Committee: Prof. Raghuram Sharma (Chairman, NITK), Ar. Kavita Verma (Council of Architecture), Dr. V.K. Soundarajan (GoK).
- Status: ${selectedApplication?.evcDetails?.status || 'Scheduled'}.
- Key Verification Points: 4.80 Acre boundary fencing, 11,400 sq.m built-up area, biometric faculty checks, and automated fire hydrants.
- Audit Link: Linked to final decision docket TSK-107.`;
        refs = [selectedApplication?.id || 'AZL-2026-00124', 'EVC-2026-0042'];
      } else if (qLower.includes('bottleneck') || qLower.includes('waste')) {
        reply = `ZeroLoop Waste Engine has identified 3 active bottlenecks:
1. Repeated Verification: Land & Fire NOC re-checked across 3 desks (estimated 6.5 days lost).
2. Recurring Correction Cycle: Saraswati College (AZL-2026-00178) bounced 3 times without consolidated checklist.
3. Post-Inspection Latency: 9.2 days average idle handoff between EVC completion and docket compilation.

Remediation: Apply ZeroLoop Cryptographic Handshake and Consolidated Deficiency Dockers to eliminate 58.5 operational hours.`;
        refs = ['WST-2026-001', 'WST-2026-003', 'WST-2026-005'];
      } else if (qLower.includes('recommend') || qLower.includes('next action')) {
        reply = `Recommended next action for ${selectedApplication?.institutionName} (${selectedApplication?.id}):
${selectedApplication?.discrepancies.some(d => d.status === 'Open') 
  ? `Action: Review and accept the Land Area Rectification Affidavit and Fire NOC renewal receipt in the Verification Tab. This will immediately unblock Task TSK-106 (EVC Inspection).`
  : selectedApplication?.status === 'EVC Scheduled' 
  ? `Action: Depute committee and conduct simulated EVC inspection with geo-verified checklist in the EVC Management Tab.`
  : selectedApplication?.status === 'Awaiting Decision'
  ? `Action: Authorized Approval Authority should review the consolidated executive summary in Decision Support and record official approval.`
  : `Action: Monitor post-approval statutory compliance deadlines in Compliance & Renewals.`}`;
        refs = [selectedApplication?.id || 'AZL-2026-00124'];
      } else if (qLower.includes('compliance') || qLower.includes('obligation')) {
        reply = `Active Compliance Obligations for ${selectedApplication?.institutionName}:
1. Final Permanent Fire NOC submission (Due 2027-01-28, 92 days remaining).
2. Anti-Ragging Committee Constitution (Due 2026-12-15, 48 days remaining).
3. Faculty Biometric API push setup (Due 2026-11-30, 33 days remaining).

Notice: AZL-2026-00102 has an OVERDUE obligation (PCI Animal House Concurrence, 8 days overdue). Regulatory escalation notice is queued.`;
        refs = ['CMP-124-01', 'CMP-102-01'];
      } else {
        reply = `ZeroLoop Analysis for "${query}":
Based on current regulatory records for application ${selectedApplication?.id} (${selectedApplication?.institutionName}):
- Current Status: ${selectedApplication?.status}
- Stage: ${selectedApplication?.currentStage}
- Unresolved Discrepancies: ${selectedApplication?.discrepancies.filter(d => d.status === 'Open').length}
- Risk Index: ${selectedApplication?.riskScore}/100

Deterministic checks are verified first. Would you like to inspect document discrepancies, workflow dependencies, EVC observations, or ZeroLoop waste remediation options?`;
        refs = [selectedApplication?.id || 'AZL-2026-00124'];
      }

      const botMsg: CopilotMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: 'Just now',
        references: refs,
        confidence: 96,
        isSimulated: true
      };

      setCopilotMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        currentRole,
        setCurrentRole,
        selectedApplicationId,
        setSelectedApplicationId,
        selectedApplication,
        applications,
        wasteItems,
        alerts,
        auditLogs,
        searchQuery,
        setSearchQuery,
        isCopilotOpen,
        setIsCopilotOpen,
        copilotMessages,
        scenarioStep,
        setScenarioStep,
        isTourActive,
        setIsTourActive,
        advanceScenarioStep,
        resetDemoScenario,
        resolveDiscrepancy,
        requestClarification,
        scheduleEVC,
        recordEVCOutcome,
        recordOfficialDecision,
        addComplianceObligation,
        remediateWaste,
        acknowledgeAlert,
        resolveAlert,
        sendCopilotMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
