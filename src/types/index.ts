export type Role = 
  | 'Administrator' 
  | 'Application Reviewer' 
  | 'EVC Coordinator' 
  | 'Compliance Officer' 
  | 'Read-Only Auditor';

export type ApplicationStatus = 
  | 'Submitted'
  | 'Under Scrutiny'
  | 'Information Required'
  | 'Verification In Progress'
  | 'EVC Pending'
  | 'EVC Scheduled'
  | 'EVC Completed'
  | 'Awaiting Decision'
  | 'Approved'
  | 'Conditional Approval'
  | 'Rejected'
  | 'Compliance Due'
  | 'Renewal Pending'
  | 'Closed';

export interface Discrepancy {
  id: string;
  documentId: string;
  documentName: string;
  fieldName: string;
  expectedValue: string;
  foundValue: string;
  explanation: string;
  confidence: number; // 0 - 100
  isAI: boolean;
  status: 'Open' | 'Resolved' | 'Clarification Requested' | 'Overridden';
  ruleCode: string;
  dateDetected: string;
  resolvedBy?: string;
  resolutionNotes?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'Land & Legal' | 'Building & Safety' | 'Academic & Faculty' | 'Financial & Society' | 'Affiliation & NOC';
  status: 'Pending' | 'Verified' | 'Discrepancy' | 'Missing' | 'Repeated Verified';
  uploadDate: string;
  verifiedDate?: string;
  verifiedBy?: string;
  fileHash: string;
  size: string;
  ocrSnippet?: string;
  discrepanciesCount: number;
  confidenceScore: number;
  isRepeatedCheck?: boolean;
  previousDeskCheck?: string;
}

export interface WorkflowNode {
  id: string;
  title: string;
  stage: string;
  ownerRole: Role;
  assignedUser: string;
  status: 'Completed' | 'In Progress' | 'Blocked' | 'Pending' | 'Skipped';
  dependencies: string[]; // Node IDs
  blockReason?: string;
  slaDays: number;
  elapsedDays: number;
  isBottleneck: boolean;
  isParallel: boolean;
  recommendedAction?: string;
  parallelWith?: string[];
}

export interface CommitteeMember {
  name: string;
  designation: string;
  institution: string;
  role: 'Chairman' | 'Expert Member' | 'Architect / Civil Expert' | 'State Govt Representative';
  contact: string;
  avatar?: string;
}

export interface EVCChecklistItem {
  id: string;
  item: string;
  category: 'Infrastructure' | 'Laboratories & Equipment' | 'Faculty & Biometrics' | 'Fire Safety & Exits' | 'Library & Digital Resources';
  status: 'Compliant' | 'Deficiency' | 'Non-Compliant' | 'Pending Verification';
  remarks?: string;
  geoVerified: boolean;
  photoEvidence?: string;
}

export interface EVCSchedule {
  id: string;
  applicationId: string;
  institutionName: string;
  committeeMembers: CommitteeMember[];
  scheduledDate: string;
  status: 'Pending Assignment' | 'Scheduled' | 'In Progress' | 'Completed' | 'Delayed' | 'Rescheduled';
  checklist: EVCChecklistItem[];
  observationsSummary?: string;
  recommendation?: 'Recommended for Approval' | 'Conditional with Rectification' | 'Not Recommended' | 'Pending Completion';
  conflictDetected?: boolean;
  conflictReason?: string;
  visitCompletedDate?: string;
  auditLog: string[];
}

export interface ComplianceObligation {
  id: string;
  applicationId: string;
  institutionName: string;
  title: string;
  description: string;
  category: 'Statutory' | 'Infrastructure' | 'Academic' | 'Safety' | 'Financial';
  dueDate: string;
  status: 'Compliant' | 'Upcoming' | 'Overdue' | 'Submitted for Review' | 'Escalated';
  evidenceFile?: string;
  submissionDate?: string;
  reviewerRemarks?: string;
  penaltyWarning?: string;
  renewalLinked: boolean;
  daysRemaining: number;
}

export interface WasteItem {
  id: string;
  title: string;
  type: 'Repeated Verification' | 'Correction Cycle' | 'Process Loop' | 'Unnecessary Delay' | 'Dependency Bottleneck' | 'Redundant Request';
  stageAffected: string;
  problemDescription: string;
  evidenceData: string;
  estimatedDelayDays: number;
  estimatedHoursSaved: number;
  frictionIndex: number; // 1-100
  recommendedCorrectiveAction: string;
  humanInterventionRequired: boolean;
  status: 'Detected' | 'Remediated' | 'Ignored';
  autoRemediationAvailable: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  applicationId?: string;
  user: string;
  role: Role;
  actionType: 
    | 'APPLICATION_CREATED' 
    | 'DISCREPANCY_FLAGGED' 
    | 'DISCREPANCY_RESOLVED' 
    | 'STATUS_CHANGED' 
    | 'EVC_SCHEDULED' 
    | 'EVC_OUTCOME_RECORDED' 
    | 'DECISION_FINALIZED' 
    | 'COMPLIANCE_CREATED' 
    | 'WASTE_ELIMINATED' 
    | 'AI_RECOMMENDATION_OVERRIDDEN'
    | 'SECURITY_ROLE_SWITCH';
  summary: string;
  details: string;
  previousState?: string;
  newState?: string;
  cryptographicHash: string;
}

export interface AlertItem {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  stage: string;
  applicationId?: string;
  applicantName?: string;
  assignedTo: string;
  dueDate: string;
  slaRemainingHours: number;
  explanation: string;
  status: 'Active' | 'Acknowledged' | 'Resolved';
  actionLabel: string;
  actionType: 'RESOLVE_DISCREPANCY' | 'SCHEDULE_EVC' | 'RECORD_DECISION' | 'REVIEW_COMPLIANCE' | 'REMEDIATE_WASTE';
}

export interface Application {
  id: string;
  institutionName: string;
  instituteType: 'Technical University' | 'Engineering College' | 'Polytechnic Institute' | 'Management Institute' | 'Pharmacy College';
  category: 'New Campus' | 'Extension of Approval' | 'Course Addition' | 'Intake Increase' | 'Campus Relocation';
  state: string;
  city: string;
  submissionDate: string;
  lastUpdated: string;
  currentStage: string;
  status: ApplicationStatus;
  assignedReviewer: string;
  riskScore: number; // 0 - 100
  documents: DocumentItem[];
  discrepancies: Discrepancy[];
  workflowTasks: WorkflowNode[];
  evcDetails?: EVCSchedule;
  complianceItems: ComplianceObligation[];
  decisionDossier?: {
    aiExecutiveSummary: string;
    riskIndicators: { label: string; level: 'Low' | 'Medium' | 'High'; note: string }[];
    recommendation: string;
    officialDecision?: {
      outcome: 'Approved' | 'Conditional Approval' | 'Rejected' | 'Rescrutiny';
      remarks: string;
      signedBy: string;
      timestamp: string;
      conditionsApplied?: string[];
    };
  };
}

export interface RegressionTestCase {
  id: string;
  name: string;
  category: 'Rule Engine' | 'AI OCR Extraction' | 'Dependency Engine' | 'SLA Monitor';
  inputData: string;
  expectedOutcome: string;
  actualOutcome: string;
  status: 'PASSED' | 'FAILED' | 'BENCHMARKED';
  executionTimeMs: number;
  confidence: number;
}
