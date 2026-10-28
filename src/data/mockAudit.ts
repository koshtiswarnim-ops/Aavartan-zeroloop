import { AuditLogEntry } from '../types';

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-991',
    timestamp: '2026-10-10 09:30:15 IST',
    applicationId: 'AZL-2026-00124',
    user: 'Apex Educational Trust (Applicant)',
    role: 'Administrator',
    actionType: 'APPLICATION_CREATED',
    summary: 'New Technical Campus application registered and submitted.',
    details: 'Application submitted with 6 uploaded statutory documents and fee receipt #SBI-2026-99120.',
    previousState: 'Draft',
    newState: 'Submitted',
    cryptographicHash: '0x8f12a9c3729e41b2e88a09b3d4f18c21a8f9024c'
  },
  {
    id: 'AUD-992',
    timestamp: '2026-10-12 11:15:00 IST',
    applicationId: 'AZL-2026-00124',
    user: 'ZeroLoop Rule Engine v4.2',
    role: 'Administrator',
    actionType: 'DISCREPANCY_FLAGGED',
    summary: 'Cross-document discrepancy flagged: Land Deed area vs Architectural Site Plan.',
    details: 'Rule RULE-LR-401 triggered: 4.80 Acres in Deed vs 5.20 Acres in Site Plan. AI confidence 96%.',
    previousState: 'Under Scrutiny',
    newState: 'Verification In Progress',
    cryptographicHash: '0x4c2b9a7812de84091ca2e0571b69f83a42d991b1'
  },
  {
    id: 'AUD-993',
    timestamp: '2026-10-12 11:18:22 IST',
    applicationId: 'AZL-2026-00124',
    user: 'ZeroLoop Rule Engine v4.2',
    role: 'Administrator',
    actionType: 'DISCREPANCY_FLAGGED',
    summary: 'Fire Safety NOC expired validity detected.',
    details: 'Rule RULE-FS-108 triggered: Certificate expired on 15-Sept-2026 without formal renewal endorsement.',
    previousState: 'Verification In Progress',
    newState: 'Verification In Progress',
    cryptographicHash: '0x2a9d8810fcba4419b782c918a098ef1240b9c33e'
  },
  {
    id: 'AUD-994',
    timestamp: '2026-10-14 14:00:10 IST',
    applicationId: 'AZL-2026-00124',
    user: 'Finance Officer M. Chawla',
    role: 'Application Reviewer',
    actionType: 'STATUS_CHANGED',
    summary: 'Parallel Task TSK-104 (Financial Solvency) verified and passed.',
    details: 'Verified INR 2.50 Cr joint fixed deposit with SBI. ZeroLoop executed parallel branch while Land verification remained under scrutiny.',
    previousState: 'In Progress',
    newState: 'Completed',
    cryptographicHash: '0x99e1208fb3c2a1078b541d2c67fe9984aa0921bb'
  },
  {
    id: 'AUD-995',
    timestamp: '2026-10-18 16:45:00 IST',
    applicationId: 'AZL-2026-00124',
    user: 'ZeroLoop Waste Monitor',
    role: 'Administrator',
    actionType: 'WASTE_ELIMINATED',
    summary: 'Sequential wait bottleneck eliminated via parallel DAG branching.',
    details: 'Parallelized financial and faculty scrutiny saved an estimated 11 business days of sequential idle latency.',
    previousState: 'Sequential Pipeline',
    newState: 'Parallel Fork Active',
    cryptographicHash: '0x77c24f8101da99b24ce8a0112fbcd8723901ac88'
  }
];
