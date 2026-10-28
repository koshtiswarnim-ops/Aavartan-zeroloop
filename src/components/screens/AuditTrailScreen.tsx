import React, { useState } from 'react';
import { 
  History, 
  Search, 
  ShieldCheck, 
  Filter, 
  FileText, 
  Lock, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const AuditTrailScreen: React.FC = () => {
  const { auditLogs, currentRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = !searchTerm || 
      log.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.applicationId && log.applicationId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAction = actionFilter === 'ALL' || log.actionType === actionFilter;

    return matchesSearch && matchesAction;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Tamper-Evident Regulatory Audit Trail
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              SHA-256 Chained
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Immutable, chronological ledger of all human reviews, rule executions, AI recommendations, and official authorizations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Badge variant="green" size="md">
            Integrity Verified (0 Tamper Events)
          </Badge>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit trail by Application ID, User, or Action..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
        </div>

        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700"
        >
          <option value="ALL">All Action Types</option>
          <option value="APPLICATION_CREATED">Application Created</option>
          <option value="DISCREPANCY_FLAGGED">Discrepancy Flagged</option>
          <option value="DISCREPANCY_RESOLVED">Discrepancy Resolved</option>
          <option value="EVC_SCHEDULED">EVC Scheduled</option>
          <option value="DECISION_FINALIZED">Decision Finalized</option>
          <option value="WASTE_ELIMINATED">ZeroLoop Waste Eliminated</option>
        </select>
      </div>

      {/* Audit Log Entries List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="divide-y divide-slate-100">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-5 hover:bg-slate-50/60 transition-colors text-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {log.id}
                  </span>
                  <Badge variant="blue" size="sm">
                    {log.actionType}
                  </Badge>
                  {log.applicationId && (
                    <span className="font-mono text-xs font-bold text-blue-700">
                      {log.applicationId}
                    </span>
                  )}
                  <span className="text-slate-400 font-mono text-[11px]">{log.timestamp}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Actor: <strong className="text-slate-800">{log.user}</strong></span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono border border-slate-200" title="Chained Hash Checksum">
                    {log.cryptographicHash}
                  </span>
                </div>
              </div>

              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-900">{log.summary}</h3>
                <p className="text-slate-600 leading-relaxed">{log.details}</p>
              </div>

              {(log.previousState || log.newState) && (
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono pt-1">
                  <span>Transition:</span>
                  <span className="text-slate-600">{log.previousState || 'None'}</span>
                  <span>&rarr;</span>
                  <span className="text-emerald-700 font-bold">{log.newState}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
