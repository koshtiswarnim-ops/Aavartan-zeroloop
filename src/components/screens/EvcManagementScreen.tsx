import React, { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Building, 
  ChevronRight, 
  UserPlus, 
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const EvcManagementScreen: React.FC = () => {
  const { 
    applications, 
    setCurrentScreen, 
    setSelectedApplicationId 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'Scheduled' | 'Pending Assignment' | 'Completed'>('ALL');

  const evcList = applications.filter(a => a.evcDetails).map(a => ({
    appId: a.id,
    institutionName: a.institutionName,
    city: a.city,
    state: a.state,
    evc: a.evcDetails!
  }));

  const filteredEvc = evcList.filter(item => {
    if (activeFilter === 'ALL') return true;
    return item.evc.status === activeFilter;
  });

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Expert Visiting Committee (EVC) Management
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-purple-50 text-purple-700 rounded-full border border-purple-200">
              On-Site Inspection Operations
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Empanelling peer experts, scheduling physical inspections, and synchronizing on-site geo-tagged observations with official decisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="purple" size="md">
            {evcList.length} Inspections Tracked
          </Badge>
        </div>
      </div>

      {/* Conflict Warning Box (Required by Section 4C) */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">EVC Scheduling Conflict Detector: </span>
            <span>
              Prof. Milind Deshmukh is empanelled for two concurrent visits in Pune and Ahmedabad on 03-Nov-2026. ZeroLoop flagged double-booking for the EVC Coordinator to reallocate an alternate committee member.
            </span>
          </div>
        </div>
        <button className="px-2.5 py-1 bg-amber-200/60 hover:bg-amber-200 text-amber-900 font-bold rounded text-[11px] shrink-0">
          Reassign Panel
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {(['ALL', 'Scheduled', 'Pending Assignment', 'Completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeFilter === f 
                ? 'bg-purple-900 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {f === 'ALL' ? 'All Inspections' : f}
          </button>
        ))}
      </div>

      {/* EVC Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvc.map(({ appId, institutionName, city, state, evc }) => (
          <div 
            key={evc.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 hover:shadow-xs transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                    {evc.id}
                  </span>
                  <Badge
                    variant={evc.status === 'Completed' ? 'green' : evc.status === 'Scheduled' ? 'purple' : 'amber'}
                    size="sm"
                  >
                    {evc.status}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{institutionName}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{city}, {state}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Visit Date</span>
                <span className="text-xs font-bold font-mono text-slate-800">{evc.scheduledDate}</span>
              </div>
            </div>

            {/* Committee Members list */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Assigned Committee Experts ({evc.committeeMembers.length})
              </span>
              <div className="space-y-1.5">
                {evc.committeeMembers.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-slate-800">{m.name}</div>
                      <div className="text-[10px] text-slate-400">{m.designation} • {m.institution}</div>
                    </div>
                    <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-purple-700 font-semibold">
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist summary */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-500">
                Verification Points: <strong className="text-slate-800">{evc.checklist.length} Standard Checks</strong>
              </span>
              <button
                onClick={() => {
                  setSelectedApplicationId(appId);
                  setCurrentScreen('application-detail');
                }}
                className="text-xs text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-1"
              >
                <span>View Full Checklist & Record Observations</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
