import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronRight,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { ApplicationStatus } from '../../types';

export const ApplicationsScreen: React.FC = () => {
  const { 
    applications, 
    setCurrentScreen, 
    setSelectedApplicationId,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [onlyDiscrepancies, setOnlyDiscrepancies] = useState<boolean>(false);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      // Search text match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        app.id.toLowerCase().includes(query) ||
        app.institutionName.toLowerCase().includes(query) ||
        app.city.toLowerCase().includes(query) ||
        app.state.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query);

      // Status filter
      const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;

      // Category filter
      const matchesCategory = categoryFilter === 'ALL' || app.category === categoryFilter;

      // Discrepancies toggle
      const matchesDiscrepancies = !onlyDiscrepancies || app.discrepancies.some(d => d.status === 'Open');

      return matchesSearch && matchesStatus && matchesCategory && matchesDiscrepancies;
    });
  }, [applications, searchQuery, statusFilter, categoryFilter, onlyDiscrepancies]);

  const statuses: ApplicationStatus[] = [
    'Submitted',
    'Under Scrutiny',
    'Information Required',
    'Verification In Progress',
    'EVC Pending',
    'EVC Scheduled',
    'Awaiting Decision',
    'Approved',
    'Compliance Due'
  ];

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Regulatory Application Management
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              {filteredApplications.length} Loaded
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Intake registration, document scrutiny, and dependency-linked stage tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedApplicationId('AZL-2026-00124');
              setCurrentScreen('application-detail');
            }}
            className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>Open Flagship Case (AZL-2026-00124)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Application ID, Institution Name, City, or Category..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            >
              <option value="ALL">All Statuses</option>
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            >
              <option value="ALL">All Categories</option>
              <option value="New Campus">New Campus</option>
              <option value="Extension of Approval">Extension of Approval</option>
              <option value="Intake Increase">Intake Increase</option>
              <option value="Course Addition">Course Addition</option>
              <option value="Campus Relocation">Campus Relocation</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Quick Filters:</span>
          
          <button
            onClick={() => setOnlyDiscrepancies(!onlyDiscrepancies)}
            className={`px-2.5 py-1 text-xs rounded-full border transition-colors flex items-center gap-1.5 ${
              onlyDiscrepancies
                ? 'bg-rose-100 text-rose-800 border-rose-300 font-semibold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            <span>Has Active Discrepancies</span>
          </button>

          <button
            onClick={() => setStatusFilter(statusFilter === 'EVC Scheduled' ? 'ALL' : 'EVC Scheduled')}
            className={`px-2.5 py-1 text-xs rounded-full border transition-colors flex items-center gap-1.5 ${
              statusFilter === 'EVC Scheduled'
                ? 'bg-purple-100 text-purple-800 border-purple-300 font-semibold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>EVC Scheduled</span>
          </button>

          <button
            onClick={() => setStatusFilter(statusFilter === 'Approved' ? 'ALL' : 'Approved')}
            className={`px-2.5 py-1 text-xs rounded-full border transition-colors flex items-center gap-1.5 ${
              statusFilter === 'Approved'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>Approved Applications</span>
          </button>

          {(statusFilter !== 'ALL' || categoryFilter !== 'ALL' || onlyDiscrepancies || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('ALL');
                setCategoryFilter('ALL');
                setOnlyDiscrepancies(false);
                setSearchQuery('');
              }}
              className="text-[11px] text-blue-600 hover:underline ml-auto font-medium"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Application ID</th>
                <th className="px-5 py-3.5">Institution & Details</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Location</th>
                <th className="px-5 py-3.5">Current Stage</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Discrepancies</th>
                <th className="px-5 py-3.5">Reviewer</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredApplications.map((app) => {
                const openDiscs = app.discrepancies.filter(d => d.status === 'Open').length;
                return (
                  <tr 
                    key={app.id} 
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    onClick={() => {
                      setSelectedApplicationId(app.id);
                      setCurrentScreen('application-detail');
                    }}
                  >
                    <td className="px-5 py-3.5 font-mono font-bold text-blue-700 group-hover:underline">
                      {app.id}
                    </td>
                    <td className="px-5 py-3.5 max-w-xs">
                      <div className="font-semibold text-slate-900 truncate">{app.institutionName}</div>
                      <div className="text-[11px] text-slate-400">{app.instituteType}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px]">
                        {app.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {app.city}, {app.state}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-800">
                      {app.currentStage}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge
                        variant={
                          app.status === 'Approved' ? 'green' :
                          app.status === 'Verification In Progress' ? 'blue' :
                          app.status === 'EVC Scheduled' ? 'purple' :
                          app.status === 'Information Required' ? 'amber' :
                          'slate'
                        }
                        size="sm"
                        dot
                      >
                        {app.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      {openDiscs > 0 ? (
                        <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-full font-semibold text-[11px] flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>{openDiscs} Open</span>
                        </span>
                      ) : (
                        <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Clean</span>
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 truncate max-w-[150px]">
                      {app.assignedReviewer}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApplicationId(app.id);
                          setCurrentScreen('application-detail');
                        }}
                        className="px-3 py-1 bg-white hover:bg-blue-600 text-blue-700 hover:text-white rounded-md font-semibold text-xs border border-slate-200 hover:border-blue-600 transition-colors shadow-2xs"
                      >
                        Workspace
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">No applications found matching your criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the filters or modifying your search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};
