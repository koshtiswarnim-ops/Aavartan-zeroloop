import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  FileCheck, 
  Upload, 
  Search, 
  CheckCircle2, 
  ChevronRight,
  ShieldAlert,
  Building,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const ComplianceRenewalsScreen: React.FC = () => {
  const { 
    applications, 
    setCurrentScreen, 
    setSelectedApplicationId 
  } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const allComplianceItems = applications.flatMap(app => 
    app.complianceItems.map(item => ({
      ...item,
      institutionName: app.institutionName,
      appId: app.id,
      categoryType: app.category
    }))
  );

  const filteredItems = allComplianceItems.filter(item => {
    if (filterCategory === 'ALL') return true;
    if (filterCategory === 'OVERDUE') return item.status === 'Overdue';
    if (filterCategory === 'UPCOMING') return item.status === 'Upcoming';
    if (filterCategory === 'SUBMITTED') return item.status === 'Submitted for Review';
    return item.category === filterCategory;
  });

  const overdueCount = allComplianceItems.filter(i => i.status === 'Overdue').length;

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Continuous Compliance & Renewals
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-teal-50 text-teal-700 rounded-full border border-teal-200">
              Lifecycle Governance
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Connecting initial regulatory approvals with post-approval undertakings, annual renewals, and statutory affidavits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {overdueCount > 0 && (
            <Badge variant="red" size="md">
              {overdueCount} Overdue Regulatory Undertakings
            </Badge>
          )}
        </div>
      </div>

      {/* Overdue Notice Alert Banner */}
      {overdueCount > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start justify-between gap-3 text-xs text-rose-900">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Automated Statutory Escalation Notice: </span>
              <span>
                National School of Pharmacy (AZL-2026-00102) has an overdue PCI Inspection Compliance report (overdue by 8 days). AICTE/PCI joint regulatory hearing notice has been drafted for Chairman sign-off.
              </span>
            </div>
          </div>
          <button 
            onClick={() => {
              setSelectedApplicationId('AZL-2026-00102');
              setCurrentScreen('application-detail');
            }}
            className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-bold text-xs shrink-0"
          >
            Review Defaulter Case
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 flex-wrap">
        {[
          { id: 'ALL', label: 'All Active Obligations' },
          { id: 'OVERDUE', label: 'Overdue Items', badge: `${overdueCount}` },
          { id: 'UPCOMING', label: 'Upcoming Deadlines' },
          { id: 'SUBMITTED', label: 'Submitted Proofs' },
          { id: 'Safety', label: 'Fire & Safety' },
          { id: 'Academic', label: 'Faculty & Biometrics' },
          { id: 'Statutory', label: 'Statutory & PCI' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterCategory(f.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              filterCategory === f.id
                ? 'bg-teal-800 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{f.label}</span>
            {f.badge && (
              <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                {f.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Obligations Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="divide-y divide-slate-100">
          {filteredItems.map((item) => (
            <div key={item.id} className="p-5 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {item.id}
                  </span>
                  <Badge
                    variant={item.status === 'Overdue' ? 'red' : item.status === 'Compliant' ? 'green' : 'amber'}
                    size="sm"
                    dot
                  >
                    {item.status}
                  </Badge>
                  <span className="text-slate-400">•</span>
                  <span className="font-bold text-slate-900">{item.institutionName}</span>
                  <span className="text-slate-400 font-mono text-[11px]">({item.appId})</span>
                </div>

                <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.description}</p>

                {item.penaltyWarning && (
                  <p className="text-rose-700 font-semibold text-[11px] bg-rose-50 p-2 rounded border border-rose-200 w-fit">
                    {item.penaltyWarning}
                  </p>
                )}

                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                  <span>Category: <strong className="text-slate-700 font-sans">{item.category}</strong></span>
                  <span>Due Date: <strong className="text-slate-700 font-mono">{item.dueDate}</strong></span>
                  <span className={item.daysRemaining < 0 ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                    {item.daysRemaining < 0 ? `${Math.abs(item.daysRemaining)} Days Overdue` : `${item.daysRemaining} Days Left`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => {
                    setSelectedApplicationId(item.appId);
                    setCurrentScreen('application-detail');
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 rounded-lg font-semibold transition-colors shadow-2xs"
                >
                  View Case Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
