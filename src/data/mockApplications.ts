import { Application } from '../types';

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'AZL-2026-00124',
    institutionName: 'Apex Institute of Technology & Advanced Research',
    instituteType: 'Engineering College',
    category: 'New Campus',
    state: 'Karnataka',
    city: 'Bengaluru Urban',
    submissionDate: '2026-10-10',
    lastUpdated: '2026-10-28',
    currentStage: 'Document Scrutiny & EVC Staging',
    status: 'Verification In Progress',
    assignedReviewer: 'Dr. Suresh R. Iyer (Lead Scrutinizer)',
    riskScore: 78,
    documents: [
      {
        id: 'DOC-124-01',
        name: 'Registered Sale Deed & Land Conversion Order',
        category: 'Land & Legal',
        status: 'Discrepancy',
        uploadDate: '2026-10-10',
        verifiedDate: '2026-10-14',
        verifiedBy: 'Deterministic Rule Engine + Dr. Suresh Iyer',
        fileHash: 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        size: '14.2 MB',
        ocrSnippet: 'Registered Deed No. 4412/2021 dated 14/06/2021 executed at Sub-Registrar Office, Bangalore South. Total contiguous parcel: 4.80 Acres (19,425 sq.m). Zone: Educational/Institutional.',
        discrepanciesCount: 1,
        confidenceScore: 96,
        isRepeatedCheck: false
      },
      {
        id: 'DOC-124-02',
        name: 'Master Architectural Site Plan & Built-up Area Schedule',
        category: 'Building & Safety',
        status: 'Discrepancy',
        uploadDate: '2026-10-10',
        verifiedDate: '2026-10-15',
        verifiedBy: 'AI Vision OCR + Architect K. Verma',
        fileHash: 'sha256-ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
        size: '28.6 MB',
        ocrSnippet: 'Plot Area indicated in Title Block: 5.20 Acres (21,043 sq.m). Proposed Ground Coverage: 24%. Built-up Area Phase-1: 11,400 sq.m across G+3 floors.',
        discrepanciesCount: 1,
        confidenceScore: 94,
        isRepeatedCheck: false
      },
      {
        id: 'DOC-124-03',
        name: 'Fire & Emergency Safety NOC Certificate',
        category: 'Building & Safety',
        status: 'Discrepancy',
        uploadDate: '2026-10-10',
        verifiedDate: '2026-10-15',
        verifiedBy: 'Deterministic Rule Engine',
        fileHash: 'sha256-5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
        size: '4.1 MB',
        ocrSnippet: 'Provisional Fire Clearance Certificate issued by Karnataka Fire and Emergency Services Dept. Valid until: 15-Sept-2026. NBC 2024 revised staircase riser clause unverified.',
        discrepanciesCount: 1,
        confidenceScore: 98,
        isRepeatedCheck: true,
        previousDeskCheck: 'Regional Fire Bureau Scrutiny Desk (Checked 12-Oct-2026)'
      },
      {
        id: 'DOC-124-04',
        name: 'Audited Financial Statements & Society Bank Fixed Deposits',
        category: 'Financial & Society',
        status: 'Verified',
        uploadDate: '2026-10-10',
        verifiedDate: '2026-10-16',
        verifiedBy: 'Automated Financial Rule Verifier',
        fileHash: 'sha256-3b6920f666f21c25ff743453b3fb3ff475b7a13c90cb7c82a4d34a413d56f5a3',
        size: '8.7 MB',
        ocrSnippet: 'Apex Educational Trust. FDR Account #4099238910 in State Bank of India. Total Corpus Fund: INR 2.50 Crores in joint lien with Approval Bureau. Current ratio: 2.14.',
        discrepanciesCount: 0,
        confidenceScore: 99,
        isRepeatedCheck: false
      },
      {
        id: 'DOC-124-05',
        name: 'Society Registration Certificate & Trust Deed',
        category: 'Financial & Society',
        status: 'Verified',
        uploadDate: '2026-10-10',
        verifiedDate: '2026-10-16',
        verifiedBy: 'State Registrar API + Dr. Suresh Iyer',
        fileHash: 'sha256-a94a8fe5ccb19ba61c4c0873d391e987982fbbd3fc90a5c4e97973715c678a16',
        size: '6.2 MB',
        ocrSnippet: 'Karnataka Societies Registration Act 1960. Reg. No. BLR-S-192-2018. Aims include non-profit technical education dissemination.',
        discrepanciesCount: 0,
        confidenceScore: 97,
        isRepeatedCheck: false
      },
      {
        id: 'DOC-124-06',
        name: 'Proposed Faculty Cadre Ratio & Principal Appointment',
        category: 'Academic & Faculty',
        status: 'Verified',
        uploadDate: '2026-10-10',
        verifiedDate: '2026-10-18',
        verifiedBy: 'Academic Scrutiny Committee',
        fileHash: 'sha256-628d08794821a7c5ea2163b7e7ec9df34226cfd5b7cb347ecf3be1897d8122d2',
        size: '9.5 MB',
        ocrSnippet: 'Principal Designate: Prof. (Dr.) Ananya Sen, Ph.D. IISc. 18 Core Faculty appointments confirmed across CSE, AI&DS, and ECE. Cadre ratio 1:2:6 adhered.',
        discrepanciesCount: 0,
        confidenceScore: 95,
        isRepeatedCheck: false
      }
    ],
    discrepancies: [
      {
        id: 'DISC-124-01',
        documentId: 'DOC-124-01',
        documentName: 'Registered Sale Deed vs Architectural Site Plan',
        fieldName: 'Contiguous Land Parcel Area',
        expectedValue: 'Equal or greater than Master Plan declaration (5.20 Acres)',
        foundValue: 'Registered Sale Deed states 4.80 Acres (0.40 Acre deficit in title)',
        explanation: 'Deterministic Rule RULE-LR-401 detected cross-document variance. Building Plan indicates 5.20 Acres (21,043 sq.m) while Registered Deed No. 4412/2021 only covers 4.80 Acres. Institutional minimum for Urban Metro is 4.0 Acres, so eligibility is met, but building footprint boundary survey must be revised to match actual deed.',
        confidence: 96,
        isAI: false,
        status: 'Open',
        ruleCode: 'RULE-LR-401',
        dateDetected: '2026-10-15',
      },
      {
        id: 'DISC-124-02',
        documentId: 'DOC-124-03',
        documentName: 'Fire & Emergency Safety NOC Certificate',
        fieldName: 'Validity Period & NBC 2024 Staging Clause',
        expectedValue: 'Active Certificate valid through academic year 2026-27 with NBC 2024 compliance',
        foundValue: 'Certificate validity expired on 15-Sept-2026; renewal receipt attached without final endorsement',
        explanation: 'Rule RULE-FS-108 flag: Fire NOC expired prior to scrutiny date. Applicant submitted temporary acknowledgement slip without final joint inspection seal by District Fire Officer.',
        confidence: 98,
        isAI: true,
        status: 'Open',
        ruleCode: 'RULE-FS-108',
        dateDetected: '2026-10-15',
      }
    ],
    workflowTasks: [
      {
        id: 'TSK-101',
        title: 'Application Intake & Scrutiny Fee Clearance',
        stage: 'Application Intake',
        ownerRole: 'Administrator',
        assignedUser: 'Central Intake Desk (K. Rao)',
        status: 'Completed',
        dependencies: [],
        slaDays: 2,
        elapsedDays: 1,
        isBottleneck: false,
        isParallel: false
      },
      {
        id: 'TSK-102',
        title: 'Deterministic Rule Engine Validation',
        stage: 'Document Scrutiny',
        ownerRole: 'Application Reviewer',
        assignedUser: 'ZeroLoop Automated Rule Runner',
        status: 'Completed',
        dependencies: ['TSK-101'],
        slaDays: 1,
        elapsedDays: 1,
        isBottleneck: false,
        isParallel: false
      },
      {
        id: 'TSK-103',
        title: 'Legal Land Title & Contiguity Verification',
        stage: 'Document Scrutiny',
        ownerRole: 'Application Reviewer',
        assignedUser: 'Dr. Suresh R. Iyer',
        status: 'In Progress',
        dependencies: ['TSK-102'],
        blockReason: 'Flagged for Land Area Mismatch (4.80 Acres deed vs 5.20 Acres site plan). Rectification pending.',
        slaDays: 4,
        elapsedDays: 6,
        isBottleneck: true,
        isParallel: true,
        parallelWith: ['TSK-104', 'TSK-105'],
        recommendedAction: 'Review applicant submitted land rectification affidavit or issue standard discrepancy notice.'
      },
      {
        id: 'TSK-104',
        title: 'Financial Solvency & Society Deed Scrutiny',
        stage: 'Document Scrutiny',
        ownerRole: 'Application Reviewer',
        assignedUser: 'Finance Officer M. Chawla',
        status: 'Completed',
        dependencies: ['TSK-102'],
        slaDays: 5,
        elapsedDays: 3,
        isBottleneck: false,
        isParallel: true,
        parallelWith: ['TSK-103', 'TSK-105']
      },
      {
        id: 'TSK-105',
        title: 'Academic Cadre & Faculty Qualification Check',
        stage: 'Document Scrutiny',
        ownerRole: 'Application Reviewer',
        assignedUser: 'Prof. Hemant Joshi',
        status: 'Completed',
        dependencies: ['TSK-102'],
        slaDays: 5,
        elapsedDays: 4,
        isBottleneck: false,
        isParallel: true,
        parallelWith: ['TSK-103', 'TSK-104']
      },
      {
        id: 'TSK-106',
        title: 'Expert Visiting Committee (EVC) Physical Inspection',
        stage: 'EVC Review',
        ownerRole: 'EVC Coordinator',
        assignedUser: 'EVC Cell - Dr. Priya Nair',
        status: 'Blocked',
        dependencies: ['TSK-103', 'TSK-104', 'TSK-105'],
        blockReason: 'Mandatory prerequisite blocked: Task TSK-103 (Land Title Verification) has 2 unresolved safety/title discrepancies. EVC inspection cannot be deputed until safety & land title are verified.',
        slaDays: 7,
        elapsedDays: 0,
        isBottleneck: true,
        isParallel: false,
        recommendedAction: 'Resolve discrepancies in TSK-103 to unblock committee mobilization.'
      },
      {
        id: 'TSK-107',
        title: 'Consolidated Scrutiny & EVC Findings Dossier Compilation',
        stage: 'Official Decision',
        ownerRole: 'Application Reviewer',
        assignedUser: 'Regional Joint Director Desk',
        status: 'Pending',
        dependencies: ['TSK-106'],
        slaDays: 3,
        elapsedDays: 0,
        isBottleneck: false,
        isParallel: false
      },
      {
        id: 'TSK-108',
        title: 'Competent Authority Hearing & Final Decision',
        stage: 'Official Decision',
        ownerRole: 'Administrator',
        assignedUser: 'Chairman / Member Secretary Approval Committee',
        status: 'Pending',
        dependencies: ['TSK-107'],
        slaDays: 3,
        elapsedDays: 0,
        isBottleneck: false,
        isParallel: false
      },
      {
        id: 'TSK-109',
        title: 'Post-Approval Statutory Compliance Calendar Activation',
        stage: 'Continuous Compliance',
        ownerRole: 'Compliance Officer',
        assignedUser: 'Continuous Compliance Monitoring Cell',
        status: 'Pending',
        dependencies: ['TSK-108'],
        slaDays: 10,
        elapsedDays: 0,
        isBottleneck: false,
        isParallel: false
      }
    ],
    evcDetails: {
      id: 'EVC-2026-0042',
      applicationId: 'AZL-2026-00124',
      institutionName: 'Apex Institute of Technology & Advanced Research',
      status: 'Pending Assignment',
      scheduledDate: '2026-11-04',
      committeeMembers: [
        {
          name: 'Prof. (Dr.) Raghuram Sharma',
          designation: 'Senior Professor & Dean of Academics',
          institution: 'National Institute of Technology Karnataka (NITK)',
          role: 'Chairman',
          contact: '+91 98450-29182'
        },
        {
          name: 'Ar. Kavita Verma, FIIA',
          designation: 'Chief Council Architect & Urban Planner',
          institution: 'Council of Architecture Emplanelled Expert',
          role: 'Architect / Civil Expert',
          contact: '+91 98211-54091'
        },
        {
          name: 'Dr. V. K. Soundarajan',
          designation: 'Joint Director of Technical Education',
          institution: 'Department of Technical Education, GoK',
          role: 'State Govt Representative',
          contact: '+91 94481-99201'
        }
      ],
      checklist: [
        {
          id: 'EVC-CHK-01',
          item: 'Contiguous 4.80 Acre boundary fencing & geo-referenced plot demarcation',
          category: 'Infrastructure',
          status: 'Pending Verification',
          geoVerified: false
        },
        {
          id: 'EVC-CHK-02',
          item: '11,400 sq.m Built-up area with dedicated Computer Science & AI Laboratories',
          category: 'Laboratories & Equipment',
          status: 'Pending Verification',
          geoVerified: false
        },
        {
          id: 'EVC-CHK-03',
          item: 'Fire safety escape staircases (width min 2.0m) and automated hydrant pressure test',
          category: 'Fire Safety & Exits',
          status: 'Pending Verification',
          geoVerified: false
        },
        {
          id: 'EVC-CHK-04',
          item: 'Biometric registration verification of 18 joined faculty members and Principal',
          category: 'Faculty & Biometrics',
          status: 'Pending Verification',
          geoVerified: false
        },
        {
          id: 'EVC-CHK-05',
          item: 'Central Library holding 3,200 titles and subscribed IEEE / ACM digital repository access',
          category: 'Library & Digital Resources',
          status: 'Pending Verification',
          geoVerified: false
        }
      ],
      auditLog: [
        '2026-10-18: Committee provisional panel empanelled by EVC Coordinator Dr. Priya Nair.',
        '2026-10-20: Inspection placed on HOLD pending resolution of Land & Fire NOC discrepancies.'
      ]
    },
    complianceItems: [
      {
        id: 'CMP-124-01',
        applicationId: 'AZL-2026-00124',
        institutionName: 'Apex Institute of Technology & Advanced Research',
        title: 'Submission of Final Permanent Fire NOC from State Fire Services DG',
        description: 'Permanent endorsement certificate must be submitted within 90 days of campus operation commencement.',
        category: 'Safety',
        dueDate: '2027-01-28',
        status: 'Upcoming',
        renewalLinked: true,
        daysRemaining: 92
      },
      {
        id: 'CMP-124-02',
        applicationId: 'AZL-2026-00124',
        institutionName: 'Apex Institute of Technology & Advanced Research',
        title: 'Anti-Ragging Committee & Internal Complaints Committee Constitution',
        description: 'Statutory compliance upload of gazetted committee members, student representatives, and contact helplines.',
        category: 'Statutory',
        dueDate: '2026-12-15',
        status: 'Upcoming',
        renewalLinked: false,
        daysRemaining: 48
      },
      {
        id: 'CMP-124-03',
        applicationId: 'AZL-2026-00124',
        institutionName: 'Apex Institute of Technology & Advanced Research',
        title: 'Faculty Biometric Attendance Integration with AICTE/Affiliating Portal',
        description: 'Real-time API push setup for daily faculty attendance logs to prevent ghost faculty malpractice.',
        category: 'Academic',
        dueDate: '2026-11-30',
        status: 'Upcoming',
        renewalLinked: true,
        daysRemaining: 33
      }
    ],
    decisionDossier: {
      aiExecutiveSummary: 'Apex Institute of Technology has fulfilled 92% of statutory eligibility criteria. Financial viability is strong (Corpus INR 2.50 Cr verified). Faculty cadre meets requirements. However, 2 discrepancies remain in Land area documentation (0.40 Acre plan vs deed variance) and provisional Fire NOC expiry. Recommendation: Conditional approval can be considered subject to submission of certified rectified site plan and renewal fire endorsement before academic inauguration.',
      riskIndicators: [
        { label: 'Land Title Contiguity', level: 'Medium', note: 'Deed is 4.80 Acres, master plan drawn for 5.20 Acres. Surplus 0.4 Acre not registered.' },
        { label: 'Fire Safety Compliance', level: 'High', note: 'Provisional NOC expired 15-Sep-2026. Non-negotiable life-safety requirement.' },
        { label: 'Financial Solvency', level: 'Low', note: 'INR 2.50 Cr FDR verified with SBI lien; adequate for 4 undergraduate courses.' },
        { label: 'Faculty Cadre Adherence', level: 'Low', note: '18 qualified teaching staff onboarded, cadre ratio 1:2:6 verified.' }
      ],
      recommendation: 'Conditionally Eligible for EVC Verification once Fire NOC receipt is validated. Final Approval subject to registered land boundary affidavit.'
    }
  },
  {
    id: 'AZL-2026-00089',
    institutionName: 'Dr. B.R. Ambedkar Institute of Technology & Data Science',
    instituteType: 'Engineering College',
    category: 'Extension of Approval',
    state: 'Maharashtra',
    city: 'Pune',
    submissionDate: '2026-09-18',
    lastUpdated: '2026-10-25',
    currentStage: 'EVC Review Completed',
    status: 'Awaiting Decision',
    assignedReviewer: 'Prof. Ramesh K. Kulkarni',
    riskScore: 24,
    documents: [
      {
        id: 'DOC-89-01',
        name: 'NBA Accreditation Certificate for 3 UG Programs',
        category: 'Affiliation & NOC',
        status: 'Verified',
        uploadDate: '2026-09-18',
        verifiedDate: '2026-09-22',
        verifiedBy: 'NBA Live API Gateway',
        fileHash: 'sha256-118833aabbcc',
        size: '3.4 MB',
        discrepanciesCount: 0,
        confidenceScore: 99
      },
      {
        id: 'DOC-89-02',
        name: 'Faculty Cadre & EPF Electronic Challan Returns (ECR)',
        category: 'Academic & Faculty',
        status: 'Verified',
        uploadDate: '2026-09-18',
        verifiedDate: '2026-09-24',
        verifiedBy: 'EPFO Verifier Service',
        fileHash: 'sha256-445566ddeeff',
        size: '12.1 MB',
        discrepanciesCount: 0,
        confidenceScore: 98
      }
    ],
    discrepancies: [],
    workflowTasks: [
      {
        id: 'TSK-89-01',
        title: 'Scrutiny & EPF Verification',
        stage: 'Document Scrutiny',
        ownerRole: 'Application Reviewer',
        assignedUser: 'Prof. Ramesh Kulkarni',
        status: 'Completed',
        dependencies: [],
        slaDays: 5,
        elapsedDays: 4,
        isBottleneck: false,
        isParallel: false
      },
      {
        id: 'TSK-89-02',
        title: 'EVC Physical Inspection (Completed)',
        stage: 'EVC Review',
        ownerRole: 'EVC Coordinator',
        assignedUser: 'Dr. Priya Nair',
        status: 'Completed',
        dependencies: ['TSK-89-01'],
        slaDays: 7,
        elapsedDays: 5,
        isBottleneck: false,
        isParallel: false
      },
      {
        id: 'TSK-89-03',
        title: 'Executive Council Review & Final Grant',
        stage: 'Official Decision',
        ownerRole: 'Administrator',
        assignedUser: 'Approval Authority Board',
        status: 'In Progress',
        dependencies: ['TSK-89-02'],
        slaDays: 4,
        elapsedDays: 2,
        isBottleneck: false,
        isParallel: false
      }
    ],
    evcDetails: {
      id: 'EVC-2026-0031',
      applicationId: 'AZL-2026-00089',
      institutionName: 'Dr. B.R. Ambedkar Institute of Technology & Data Science',
      status: 'Completed',
      scheduledDate: '2026-10-14',
      visitCompletedDate: '2026-10-14',
      committeeMembers: [
        {
          name: 'Prof. Milind Deshmukh',
          designation: 'Professor, COEP Tech Pune',
          institution: 'College of Engineering Pune',
          role: 'Chairman',
          contact: '+91 94220-11234'
        }
      ],
      checklist: [
        { id: 'EVC-89-01', item: 'AI Robotics Lab infrastructure with 60 high-performance GPU nodes', category: 'Laboratories & Equipment', status: 'Compliant', geoVerified: true }
      ],
      observationsSummary: 'Outstanding lab facilities, 100% biometric faculty authentication verified. All 3 UG disciplines comply with NBA benchmarks.',
      recommendation: 'Recommended for Approval',
      auditLog: ['2026-10-14: Visit successfully completed and signed off with geo-tagged images.']
    },
    complianceItems: [
      {
        id: 'CMP-89-01',
        applicationId: 'AZL-2026-00089',
        institutionName: 'Dr. B.R. Ambedkar Institute of Technology & Data Science',
        title: 'Annual Audited Financial Statement Submission',
        description: 'Financial year balance sheet submission for continued approval.',
        category: 'Financial',
        dueDate: '2026-11-15',
        status: 'Upcoming',
        renewalLinked: true,
        daysRemaining: 18
      }
    ],
    decisionDossier: {
      aiExecutiveSummary: 'Zero discrepancies across documentation, NBA compliance verified, clean EVC inspection report. Application has cleared all prerequisite checks with zero pending objections.',
      riskIndicators: [
        { label: 'Overall Risk', level: 'Low', note: 'Institution maintains high compliance score (96/100) over 8 consecutive approval cycles.' }
      ],
      recommendation: 'Unconditional Approval for 3 Academic Years (2026-2029) recommended.'
    }
  },
  {
    id: 'AZL-2026-00102',
    institutionName: 'National School of Pharmacy & Drug Research',
    instituteType: 'Pharmacy College',
    category: 'New Campus',
    state: 'Telangana',
    city: 'Hyderabad',
    submissionDate: '2026-08-12',
    lastUpdated: '2026-10-22',
    currentStage: 'Post-Approval Compliance Monitoring',
    status: 'Approved',
    assignedReviewer: 'Dr. K. Srinivas Rao',
    riskScore: 15,
    documents: [],
    discrepancies: [],
    workflowTasks: [],
    complianceItems: [
      {
        id: 'CMP-102-01',
        applicationId: 'AZL-2026-00102',
        institutionName: 'National School of Pharmacy & Drug Research',
        title: 'PCI (Pharmacy Council of India) Inspection Compliance Report',
        description: 'Submission of statutory PCI concurrence letter and animal house ethical clearance.',
        category: 'Statutory',
        dueDate: '2026-10-20',
        status: 'Overdue',
        penaltyWarning: 'Grace period ends in 48 hours; regulatory notice issuance queued.',
        renewalLinked: true,
        daysRemaining: -8
      },
      {
        id: 'CMP-102-02',
        applicationId: 'AZL-2026-00102',
        institutionName: 'National School of Pharmacy & Drug Research',
        title: 'Machine Room Equipment Calibration Certificate',
        description: 'Rotary tablet punching machine & HPLC calibration certs upload.',
        category: 'Infrastructure',
        dueDate: '2026-11-05',
        status: 'Submitted for Review',
        evidenceFile: 'Calibration_Report_Batch26.pdf',
        renewalLinked: false,
        daysRemaining: 8
      }
    ]
  },
  {
    id: 'AZL-2026-00147',
    institutionName: 'Vidyapeeth Polytechnic College',
    instituteType: 'Polytechnic Institute',
    category: 'Intake Increase',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    submissionDate: '2026-10-02',
    lastUpdated: '2026-10-26',
    currentStage: 'Scrutiny Deficiency Resolution',
    status: 'Information Required',
    assignedReviewer: 'Er. Alok Tripathi',
    riskScore: 62,
    documents: [
      {
        id: 'DOC-147-01',
        name: 'Land Registry Deed of Lease Parcel B',
        category: 'Land & Legal',
        status: 'Repeated Verified',
        uploadDate: '2026-10-02',
        verifiedDate: '2026-10-08',
        verifiedBy: 'State Scrutiny Desk',
        fileHash: 'sha256-ff99aa112233',
        size: '5.1 MB',
        discrepanciesCount: 0,
        confidenceScore: 92,
        isRepeatedCheck: true,
        previousDeskCheck: 'Regional Land Records Cell (Checked twice already)'
      }
    ],
    discrepancies: [
      {
        id: 'DISC-147-01',
        documentId: 'DOC-147-01',
        documentName: 'Land Lease Deed Parcel B',
        fieldName: 'Remaining Lease Term',
        expectedValue: 'Minimum 30 years unexpired lease',
        foundValue: '26 years remaining (lease expires 2052)',
        explanation: 'Institutional norms require a minimum 30-year lease from the date of application for intake increase. 4 years deficiency identified.',
        confidence: 99,
        isAI: false,
        status: 'Clarification Requested',
        ruleCode: 'RULE-LR-205',
        dateDetected: '2026-10-08'
      }
    ],
    workflowTasks: [],
    complianceItems: []
  },
  {
    id: 'AZL-2026-00155',
    institutionName: 'Kalyan Institute of Management Studies',
    instituteType: 'Management Institute',
    category: 'Course Addition',
    state: 'Gujarat',
    city: 'Ahmedabad',
    submissionDate: '2026-09-29',
    lastUpdated: '2026-10-27',
    currentStage: 'Appellate Hearing & Authority Review',
    status: 'Awaiting Decision',
    assignedReviewer: 'Dr. Meena Patel',
    riskScore: 45,
    documents: [],
    discrepancies: [],
    workflowTasks: [],
    complianceItems: []
  },
  {
    id: 'AZL-2026-00178',
    institutionName: 'Saraswati College of Engineering & AI',
    instituteType: 'Engineering College',
    category: 'Campus Relocation',
    state: 'Tamil Nadu',
    city: 'Coimbatore',
    submissionDate: '2026-10-05',
    lastUpdated: '2026-10-28',
    currentStage: 'Process Loop Detection Alert',
    status: 'Information Required',
    assignedReviewer: 'Prof. S. Ranganathan',
    riskScore: 82,
    documents: [],
    discrepancies: [
      {
        id: 'DISC-178-01',
        documentId: 'DOC-178-01',
        documentName: 'Pollution Control Board Consent to Establish (CTE)',
        fieldName: 'Effluent Treatment Plant Capacity',
        expectedValue: 'ETP capacity min 25 KLD',
        foundValue: 'ETP plan missing in third submission cycle',
        explanation: 'Process Loop Alert: Application has been returned to applicant 3 times for the exact same document deficiency without joint desk reconciliation.',
        confidence: 95,
        isAI: true,
        status: 'Open',
        ruleCode: 'RULE-PCB-302',
        dateDetected: '2026-10-12'
      }
    ],
    workflowTasks: [],
    complianceItems: []
  },
  {
    id: 'AZL-2026-00192',
    institutionName: 'Meghalaya Regional Institute of Polytechnic',
    instituteType: 'Polytechnic Institute',
    category: 'New Campus',
    state: 'Meghalaya',
    city: 'Shillong',
    submissionDate: '2026-07-15',
    lastUpdated: '2026-10-20',
    currentStage: 'Post-Approval Compliance Monitoring',
    status: 'Compliance Due',
    assignedReviewer: 'Shri T. Sangma',
    riskScore: 38,
    documents: [],
    discrepancies: [],
    workflowTasks: [],
    complianceItems: [
      {
        id: 'CMP-192-01',
        applicationId: 'AZL-2026-00192',
        institutionName: 'Meghalaya Regional Institute of Polytechnic',
        title: 'Hill Area Seismic & Slope Stability Certificate',
        description: 'Submission of geotech slope stabilization survey by CBRI / IIT Roorkee.',
        category: 'Safety',
        dueDate: '2026-11-02',
        status: 'Upcoming',
        renewalLinked: true,
        daysRemaining: 5
      }
    ]
  }
];
