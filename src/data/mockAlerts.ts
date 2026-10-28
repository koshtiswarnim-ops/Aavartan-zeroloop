import { AlertItem } from '../types';

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-101',
    title: 'Cross-Document Land Area Discrepancy (0.40 Acre Variance)',
    severity: 'Critical',
    stage: 'Document Scrutiny',
    applicationId: 'AZL-2026-00124',
    applicantName: 'Apex Institute of Technology & Advanced Research',
    assignedTo: 'Dr. Suresh R. Iyer',
    dueDate: '2026-10-30',
    slaRemainingHours: 14,
    explanation: 'Registered deed (4.80 Acres) conflicts with architectural submission (5.20 Acres). EVC visit is blocked until rectified.',
    status: 'Active',
    actionLabel: 'Resolve Discrepancy',
    actionType: 'RESOLVE_DISCREPANCY'
  },
  {
    id: 'ALT-102',
    title: 'Provisional Fire Safety NOC Validity Expired',
    severity: 'High',
    stage: 'Building & Safety Scrutiny',
    applicationId: 'AZL-2026-00124',
    applicantName: 'Apex Institute of Technology & Advanced Research',
    assignedTo: 'Dr. Suresh R. Iyer',
    dueDate: '2026-10-29',
    slaRemainingHours: 6,
    explanation: 'Clearance expired on 15-Sept-2026. NBC 2024 revised staircase guidelines require renewal endorsement.',
    status: 'Active',
    actionLabel: 'Review Safety NOC',
    actionType: 'RESOLVE_DISCREPANCY'
  },
  {
    id: 'ALT-103',
    title: 'Statutory PCI Animal House Concurrence Overdue by 8 Days',
    severity: 'Critical',
    stage: 'Post-Approval Compliance',
    applicationId: 'AZL-2026-00102',
    applicantName: 'National School of Pharmacy & Drug Research',
    assignedTo: 'Compliance Officer Priya Sen',
    dueDate: '2026-10-20',
    slaRemainingHours: -192,
    explanation: 'Statutory post-approval undertaking missed deadline. Escalation notice queued for Chairman sign-off.',
    status: 'Active',
    actionLabel: 'Review Obligation',
    actionType: 'REVIEW_COMPLIANCE'
  },
  {
    id: 'ALT-104',
    title: 'EVC Committee Schedule Conflict: Chairman Double-Booked',
    severity: 'Medium',
    stage: 'EVC Management',
    applicationId: 'AZL-2026-00155',
    applicantName: 'Kalyan Institute of Management Studies',
    assignedTo: 'EVC Coordinator Dr. Priya Nair',
    dueDate: '2026-11-02',
    slaRemainingHours: 48,
    explanation: 'Prof. Milind Deshmukh assigned to two concurrent visits on 03-Nov in Pune and Ahmedabad.',
    status: 'Active',
    actionLabel: 'Reschedule Committee',
    actionType: 'SCHEDULE_EVC'
  },
  {
    id: 'ALT-105',
    title: 'Process Loop Ping-Pong Alert: 3 Consecutive Rectification Rounds',
    severity: 'High',
    stage: 'Scrutiny Deficiency',
    applicationId: 'AZL-2026-00178',
    applicantName: 'Saraswati College of Engineering & AI',
    assignedTo: 'Prof. S. Ranganathan',
    dueDate: '2026-10-31',
    slaRemainingHours: 28,
    explanation: 'Application has bounced 3 times without consolidated checklist. ZeroLoop recommends auto-consolidated deficiency docket.',
    status: 'Active',
    actionLabel: 'Apply ZeroLoop Remedy',
    actionType: 'REMEDIATE_WASTE'
  }
];
