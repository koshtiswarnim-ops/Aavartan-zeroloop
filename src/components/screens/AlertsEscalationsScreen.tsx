import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Filter, 
  Check, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const AlertsEscalationsScreen: React.FC = () => {
  const { 
    alerts, 
    acknowledgeAlert, 
    resolveAlert, 
    setCurrentScreen, 
    setSelectedApplicationId 
  } = useApp();

  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (severityFilter === 'ALL') return true;
    return a.severity === severityFilter;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Alerts & SLA Escalations
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-rose-50 text-rose-700 rounded-full border border-rose-200">
              {alerts.filter(a => a.status === 'Active').length} Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Automated triage for document discrepancies, impending SLA breaches, and post-approval compliance deadlines.
          </p>
        </div>
      </div>

      {/* Severity Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {['ALL', 'Critical', 'High', 'Medium'].map((s) => (
          <button
            key={s}
            onClick={() => setSeverityFilter(s)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              severityFilter === s
                ? 'bg-rose-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {s === 'ALL' ? 'All Alerts' : `${s} Severity`}
          </button>
        ))}
      </div>

      {/* Alerts Cards */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const isResolved = alert.status === 'Resolved';
          const isAcknowledged = alert.status === 'Acknowledged';

          return (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all ${
                isResolved
                  ? 'bg-slate-50/70 border-slate-200 opacity-60'
                  : alert.severity === 'Critical'
                  ? 'bg-rose-50/40 border-rose-200 shadow-2xs'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <Badge
                    variant={alert.severity === 'Critical' ? 'red' : alert.severity === 'High' ? 'amber' : 'blue'}
                    size="sm"
                  >
                    {alert.severity}
                  </Badge>
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {alert.applicationId}
                  </span>
                  <span className="text-xs font-semibold text-slate-800">
                    {alert.applicantName}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400 font-mono">
                    SLA Deadline: <strong className={alert.slaRemainingHours < 0 ? 'text-rose-600' : 'text-slate-700'}>{alert.dueDate}</strong>
                  </span>
                  <Badge variant={isResolved ? 'green' : isAcknowledged ? 'blue' : 'slate'} size="sm">
                    {alert.status}
                  </Badge>
                </div>
              </div>

              <div className="py-3 text-xs space-y-1">
                <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
                <p className="text-slate-600 leading-relaxed">{alert.explanation}</p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Workflow Stage: <strong className="text-slate-700 font-medium">{alert.stage}</strong> • Assigned: <strong className="text-slate-700 font-medium">{alert.assignedTo}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (alert.applicationId) setSelectedApplicationId(alert.applicationId);
                    setCurrentScreen('application-detail');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                >
                  <span>Open Application Workspace</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {!isAcknowledged && !isResolved && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                  {!isResolved && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
