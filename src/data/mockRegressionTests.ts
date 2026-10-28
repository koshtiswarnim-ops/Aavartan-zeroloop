import { RegressionTestCase } from '../types';

export const BENCHMARK_TEST_CASES: RegressionTestCase[] = [
  {
    id: 'REG-001',
    name: 'Deterministic Cross-Document Land Contiguity Validator',
    category: 'Rule Engine',
    inputData: 'Deed Area: 4.80 Acres | Site Plan: 5.20 Acres | Urban Norm: 4.0 Acres',
    expectedOutcome: 'Flag Discrepancy (Variance 0.40 Acres); Do NOT fail eligibility since 4.80 >= 4.0 norm.',
    actualOutcome: 'Discrepancy flagged under RULE-LR-401. Status: Discrepancy. Non-blocking for parallel financial checks.',
    status: 'PASSED',
    executionTimeMs: 14,
    confidence: 100
  },
  {
    id: 'REG-002',
    name: 'OCR Fire Clearance NBC 2024 Date Clause Extraction',
    category: 'AI OCR Extraction',
    inputData: 'Provisional NOC dated 16-Sept-2025 with 1-year validity stamp',
    expectedOutcome: 'Detect expiration (Expired 15-Sept-2026). Flag lack of permanent DFO endorsement.',
    actualOutcome: 'Expired status detected. Flagged under RULE-FS-108. Suggested human review.',
    status: 'PASSED',
    executionTimeMs: 240,
    confidence: 98
  },
  {
    id: 'REG-003',
    name: 'Workflow DAG Dependency Blocker for EVC Inspection',
    category: 'Dependency Engine',
    inputData: 'Task TSK-103 has unresolved critical safety/title discrepancies; EVC scheduled',
    expectedOutcome: 'Strict Block: Prevent committee deputation until prerequisites marked RESOLVED.',
    actualOutcome: 'EVC state locked to BLOCKED. Reason surfaced to coordinator. Direct bypass disallowed.',
    status: 'PASSED',
    executionTimeMs: 8,
    confidence: 100
  },
  {
    id: 'REG-004',
    name: 'ZeroLoop Repeated Verification Hash Deduplication',
    category: 'SLA Monitor',
    inputData: 'Same file SHA-256 uploaded to 2 distinct scrutiny desks across 7-day interval',
    expectedOutcome: 'Auto-verify second desk using cryptographic trust stamp; save 3.5 review days.',
    actualOutcome: 'Trust stamp verified. Repetition detected and bypassed with logged audit hash.',
    status: 'PASSED',
    executionTimeMs: 19,
    confidence: 99
  },
  {
    id: 'REG-005',
    name: 'AI Risk Summarizer Hallucination Prevention Guardrail',
    category: 'AI OCR Extraction',
    inputData: 'Synthetic institution with missing Faculty Cadre EPF records',
    expectedOutcome: 'Explicitly state "Faculty records missing" without fabricating compliance statements.',
    actualOutcome: 'Ground truth bounds enforced. Zero fabricated faculty records. Uncertain status flagged.',
    status: 'PASSED',
    executionTimeMs: 310,
    confidence: 96
  }
];
