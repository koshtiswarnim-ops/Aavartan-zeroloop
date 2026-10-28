import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Zap, 
  Clock, 
  UserCheck 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Badge } from '../common/Badge';

export const AnalyticsReportsScreen: React.FC = () => {
  // Monthly throughput
  const throughputData = [
    { month: 'Jun', intake: 210, approved: 160, rejected: 18 },
    { month: 'Jul', intake: 280, approved: 220, rejected: 24 },
    { month: 'Aug', intake: 340, approved: 290, rejected: 32 },
    { month: 'Sep', intake: 410, approved: 360, rejected: 28 },
    { month: 'Oct', intake: 490, approved: 440, rejected: 35 },
  ];

  // Recurring discrepancies Pareto
  const discrepanciesPareto = [
    { code: 'Land Area Mismatch', count: 184, pct: '38%' },
    { code: 'Fire NOC Expired', count: 142, pct: '29%' },
    { code: 'Faculty EPF Returns Missing', count: 78, pct: '16%' },
    { code: 'Building Floor Height NBC', count: 46, pct: '10%' },
    { code: 'Bank FDR Lien Deficit', count: 32, pct: '7%' },
  ];

  // Processing cycle times
  const cycleTimes = [
    { stage: 'Intake to Scrutiny', traditional: 7.2, zeroloop: 1.8 },
    { stage: 'Document Rectification', traditional: 18.5, zeroloop: 6.2 },
    { stage: 'EVC Mobilization', traditional: 14.1, zeroloop: 5.4 },
    { stage: 'Docket to Decision', traditional: 8.6, zeroloop: 2.1 },
    { stage: 'Compliance Activation', traditional: 12.0, zeroloop: 3.5 },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Regulatory Operations Analytics & Reports
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              Evaluation Metrics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Stage-wise throughput, recurring discrepancy Pareto analysis, and ZeroLoop cycle-time reductions.
          </p>
        </div>

        <button 
          onClick={() => alert('Synthetic PDF Report exported successfully: AZL_Audit_Report_2026.pdf')}
          className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Executive Audit PDF</span>
        </button>
      </div>

      {/* Cycle Time Comparison Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Processing Duration (Days): Traditional vs ZeroLoop</h2>
            <p className="text-xs text-slate-400">Benchmarked across representative regulatory approval cycles</p>
          </div>
          <Badge variant="teal" size="sm">60% Average Reduction</Badge>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cycleTimes} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                formatter={(val: any, name: any) => [`${val} Days`, name === 'traditional' ? 'Traditional Pipeline' : 'ZeroLoop DAG']}
              />
              <Bar dataKey="traditional" fill="#94a3b8" radius={[4, 4, 0, 0]} name="traditional" />
              <Bar dataKey="zeroloop" fill="#0d9488" radius={[4, 4, 0, 0]} name="zeroloop" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2-Column: Throughput Trends & Discrepancies Pareto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Throughput Trend */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Monthly Application Throughput</h2>
            <Badge variant="blue" size="sm">Approvals vs Intake</Badge>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughputData}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="intake" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} name="Intake" />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Approved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recurring Discrepancies Pareto */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Top Recurring Document Discrepancies</h2>
            <Badge variant="amber" size="sm">Pareto Analysis</Badge>
          </div>

          <div className="space-y-2.5">
            {discrepanciesPareto.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-800">{item.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono">{item.count} cases</span>
                  <span className="font-bold text-blue-700 bg-white border border-slate-200 px-1.5 py-0.2 rounded text-[10px]">
                    {item.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
