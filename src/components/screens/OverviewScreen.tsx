import React from 'react';
import { 
  FileText, 
  Clock, 
  Users, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Shield, 
  Info, 
  FileWarning
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const OverviewScreen: React.FC = () => {
  const { setCurrentScreen, setSelectedApplicationId } = useApp();

  // 1. Exact 6 KPI Cards from the image
  const kpis = [
    {
      title: 'Total Applications',
      value: '1,284',
      sub: 'All applications in the system',
      icon: FileText,
      iconColor: 'text-[#2563eb]',
      iconBg: 'bg-[#eff6ff]',
      borderColor: 'border-l-[#2563eb]',
      route: 'applications'
    },
    {
      title: 'In Progress',
      value: '386',
      sub: 'Under review and processing',
      icon: Clock,
      iconColor: 'text-[#0284c7]',
      iconBg: 'bg-[#f0f9ff]',
      borderColor: 'border-l-[#0284c7]',
      route: 'workflow'
    },
    {
      title: 'Awaiting Review',
      value: '142',
      sub: 'Pending officer review',
      icon: Users,
      iconColor: 'text-[#d97706]',
      iconBg: 'bg-[#fffbeb]',
      borderColor: 'border-l-[#d97706]',
      route: 'applications'
    },
    {
      title: 'EVC Pending',
      value: '58',
      sub: 'Awaiting EVC scheduling',
      icon: Calendar,
      iconColor: 'text-[#7c3aed]',
      iconBg: 'bg-[#f5f3ff]',
      borderColor: 'border-l-[#7c3aed]',
      route: 'evc'
    },
    {
      title: 'Compliance Due Soon',
      value: '76',
      sub: 'Due within 30 days',
      icon: ShieldCheck,
      iconColor: 'text-[#16a34a]',
      iconBg: 'bg-[#f0fdf4]',
      borderColor: 'border-l-[#16a34a]',
      route: 'compliance'
    },
    {
      title: 'Overdue Obligations',
      value: '23',
      sub: 'Past due date',
      icon: AlertTriangle,
      iconColor: 'text-[#dc2626]',
      iconBg: 'bg-[#fef2f2]',
      borderColor: 'border-l-[#dc2626]',
      route: 'compliance'
    }
  ];

  // 2. Application Pendency by Stage - exact data & colors from image
  const pendencyData = [
    { stage: 'Intake', value: 182, fill: '#1e3a8a' },
    { stage: 'Scrutiny', value: 246, fill: '#3b82f6' },
    { stage: 'Verification', value: 198, fill: '#06b6d4' },
    { stage: 'EVC', value: 142, fill: '#10b981' },
    { stage: 'Committee', value: 96, fill: '#f59e0b' },
    { stage: 'Decision', value: 42, fill: '#8b5cf6' },
  ];

  // 3. Approval Workflow Distribution Donut Data
  const approvalDistribution = [
    { name: 'Extension of Approval', value: 38, count: 488, color: '#1e3a8a' },
    { name: 'New Institution', value: 22, count: 282, color: '#06b6d4' },
    { name: 'Increase in Intake', value: 16, count: 205, color: '#3b82f6' },
    { name: 'Change in Course', value: 12, count: 154, color: '#f59e0b' },
    { name: 'Others', value: 12, count: 155, color: '#8b5cf6' },
  ];

  // 4. Compliance Deadline Overview Line Chart Data
  const complianceTimeline = [
    { date: 'May 12', dueSoon: 23, overdue: 11 },
    { date: 'May 19', dueSoon: 22, overdue: 10 },
    { date: 'May 26', dueSoon: 24, overdue: 11 },
    { date: 'Jun 02', dueSoon: 22, overdue: 8 },
    { date: 'Jun 09', dueSoon: 26, overdue: 9 },
    { date: 'Jun 16', dueSoon: 25, overdue: 12 },
  ];

  // 5. EVC Scheduling Status Donut Data
  const evcStatusData = [
    { name: 'Scheduled', value: 32, pct: '55%', color: '#1e3a8a' },
    { name: 'In Progress', value: 14, pct: '24%', color: '#3b82f6' },
    { name: 'Pending', value: 8, pct: '14%', color: '#06b6d4' },
    { name: 'Overdue', value: 4, pct: '7%', color: '#dc2626' },
  ];

  // 6. Recent Activity list from image
  const recentActivities = [
    { id: 'AICTE-2026-00124', name: 'Meridian Institute of Technology', status: 'Under Scrutiny', statusColor: 'bg-slate-100 text-slate-700', time: '2h ago', dotColor: 'bg-purple-600' },
    { id: 'AICTE-2026-00125', name: 'Horizon College of Engineering', status: 'EVC Scheduling', statusColor: 'bg-blue-50 text-blue-700', time: '4h ago', dotColor: 'bg-blue-500' },
    { id: 'AICTE-2026-00126', name: 'Central Institute of Applied Sciences', status: 'Awaiting Review', statusColor: 'bg-amber-50 text-amber-700', time: '6h ago', dotColor: 'bg-amber-500' },
    { id: 'AICTE-2026-00127', name: 'Northstar Technical University', status: 'Approved', statusColor: 'bg-emerald-50 text-emerald-700', time: '1d ago', dotColor: 'bg-emerald-500' },
    { id: 'AICTE-2026-00128', name: 'Sunrise College of Technology', status: 'Compliance Monitoring', statusColor: 'bg-teal-50 text-teal-700', time: '1d ago', dotColor: 'bg-teal-500' },
  ];

  // 7. Critical Alerts list from image
  const criticalAlerts = [
    { id: '1', text: 'Document discrepancy found in AICTE-2026-00124', severity: 'Critical', severityColor: 'bg-rose-50 text-rose-600', icon: AlertTriangle, iconColor: 'text-rose-500', time: '2h ago', appId: 'AZL-2026-00124' },
    { id: '2', text: 'EVC date conflict for AICTE-2026-00126', severity: 'High', severityColor: 'bg-amber-50 text-amber-700', icon: AlertTriangle, iconColor: 'text-amber-500', time: '4h ago', appId: 'AZL-2026-00155' },
    { id: '3', text: 'Compliance due in 7 days (AICTE-2026-00122)', severity: 'Medium', severityColor: 'bg-blue-50 text-blue-700', icon: Info, iconColor: 'text-blue-500', time: '6h ago', appId: 'AZL-2026-00102' },
    { id: '4', text: 'Document expiry for AICTE-2026-00118', severity: 'Medium', severityColor: 'bg-amber-50 text-amber-700', icon: FileWarning, iconColor: 'text-amber-500', time: '8h ago', appId: 'AZL-2026-00147' },
    { id: '5', text: 'Overdue obligation - Infrastructure report', severity: 'High', severityColor: 'bg-amber-50 text-amber-700', icon: FileWarning, iconColor: 'text-amber-600', time: '1d ago', appId: 'AZL-2026-00102' },
  ];

  // 8. Bottleneck Detection rows from image
  const bottlenecks = [
    { stage: 'Document Verification', pending: 68, wait: '4.2 days', trend: 'up', dot: 'bg-amber-500' },
    { stage: 'EVC Scheduling', pending: 58, wait: '3.1 days', trend: 'up', dot: 'bg-amber-500' },
    { stage: 'Committee Review', pending: 42, wait: '2.8 days', trend: 'neutral', dot: 'bg-purple-600' },
    { stage: 'Final Decision', pending: 21, wait: '1.6 days', trend: 'down', dot: 'bg-blue-500' },
  ];

  // 9. Recommended Next Actions from image
  const nextActions = [
    { num: 1, title: 'Review missing supporting document for AICTE-2026-00124', sub: 'Required for document verification completion', appId: 'AZL-2026-00124' },
    { num: 2, title: 'Schedule EVC for AICTE-2026-00126', sub: 'Pending committee availability', appId: 'AZL-2026-00124' },
    { num: 3, title: 'Address compliance deadline (7 days)', sub: 'Faculty undertaking submission required', appId: 'AZL-2026-00102' },
    { num: 4, title: 'Resolve document discrepancies', sub: 'Affecting 3 applications', appId: 'AZL-2026-00124' },
  ];

  return (
    <div className="p-3.5 sm:p-6 space-y-5 sm:space-y-6 max-w-[1400px] mx-auto bg-[#f8fafc] text-slate-800">
      {/* Page Title Bar - Mobile Friendly Flex */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
            Regulatory Operations Overview
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">
            Monitor approval workflows, regulatory pendency, and institutional compliance from one intelligent workspace.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-[#eff6ff] border border-blue-200/80 rounded-md text-[11px] sm:text-[12px] text-slate-700 font-medium">
            <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>SIH 2026 Prototype • Demo Environment</span>
          </div>
        </div>
      </div>

      {/* Row 1: 6 KPI Cards with left colored borders - 2 cols on mobile, 3 on md, 6 on xl */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => setCurrentScreen(kpi.route as any)}
              className={`bg-white rounded-xl border border-slate-200/80 ${kpi.borderColor} border-l-[3.5px] p-3 sm:p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between cursor-pointer`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-[12px] font-medium text-slate-600 line-clamp-1">
                  {kpi.title}
                </span>
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${kpi.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${kpi.iconColor}`} />
                </div>
              </div>

              <div className="mt-2 sm:mt-3">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
                  {kpi.value}
                </div>
                <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-slate-400 flex items-center justify-between group">
                  <span className="truncate">{kpi.sub}</span>
                  <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1">&rarr;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Middle Row 1 (3 Cards) - 1 col on mobile, 3 cols on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Application Pendency by Stage (Bar Chart) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs">
          <h2 className="text-[13px] sm:text-[14px] font-bold text-slate-900 mb-3 sm:mb-4">
            Application Pendency by Stage
          </h2>

          <div className="h-48 sm:h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pendencyData} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 250]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  formatter={(val: any) => [`${val} Applications`, 'Pendency']}
                />
                <Bar 
                  dataKey="value" 
                  radius={[3, 3, 0, 0]} 
                  label={{ position: 'top', fill: '#475569', fontSize: 10, fontWeight: 600 }}
                >
                  {pendencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Approval Workflow Distribution (Donut Chart) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs">
          <h2 className="text-[13px] sm:text-[14px] font-bold text-slate-900 mb-2">
            Approval Workflow Distribution
          </h2>

          <div className="flex flex-col xs:flex-row items-center justify-between min-h-[200px] sm:h-56 gap-3">
            <div className="w-full xs:w-1/2 h-44 sm:h-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={approvalDistribution}
                    innerRadius={46}
                    outerRadius={66}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {approvalDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(val: any) => [`${val}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[15px] font-extrabold text-slate-900 leading-tight">1,284</span>
                <span className="text-[9px] text-slate-400 leading-tight">Total Applications</span>
              </div>
            </div>

            <div className="w-full xs:w-1/2 space-y-1.5 xs:pl-2 text-[11px]">
              {approvalDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 truncate">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900 shrink-0 ml-1">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Compliance Deadline Overview (Line Chart) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-[13px] sm:text-[14px] font-bold text-slate-900">
              Compliance Deadline Overview
            </h2>
            <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px]">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Due Soon
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#dc2626]" /> Overdue
              </span>
            </div>
          </div>

          <div className="h-48 sm:h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTimeline} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 40]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="dueSoon" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} name="Due Soon" />
                <Line type="monotone" dataKey="overdue" stroke="#dc2626" strokeWidth={2} dot={{ r: 3, fill: '#dc2626' }} name="Overdue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Middle Row 2 (3 Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: EVC Scheduling Status */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs">
          <h2 className="text-[13px] sm:text-[14px] font-bold text-slate-900 mb-2">
            EVC Scheduling Status
          </h2>

          <div className="flex flex-col xs:flex-row items-center justify-between min-h-[200px] sm:h-56 gap-3">
            <div className="w-full xs:w-1/2 h-44 sm:h-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={evcStatusData}
                    innerRadius={46}
                    outerRadius={66}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {evcStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[17px] font-extrabold text-slate-900 leading-tight">58</span>
                <span className="text-[9px] text-slate-400 leading-tight">Pending</span>
              </div>
            </div>

            <div className="w-full xs:w-1/2 space-y-2 xs:pl-2 text-[11px]">
              {evcStatusData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-800">{item.value} ({item.pct})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Recent Application Activity */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[13px] sm:text-[14px] font-bold text-slate-900">
                Recent Application Activity
              </h2>
              <button 
                onClick={() => setCurrentScreen('applications')}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-0.5"
              >
                <span>View all</span>
                <span>&rarr;</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentActivities.map((act) => (
                <div 
                  key={act.id} 
                  onClick={() => {
                    setSelectedApplicationId('AZL-2026-00124');
                    setCurrentScreen('application-detail');
                  }}
                  className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-50/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${act.dotColor}`} />
                    <span className="font-mono text-[10px] sm:text-[11px] text-slate-500 shrink-0">{act.id}</span>
                    <span className="font-medium text-slate-800 truncate text-[11px]">{act.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md font-medium ${act.statusColor}`}>
                      {act.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono text-right">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Critical Alerts */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[13px] sm:text-[14px] font-bold text-slate-900">
                Critical Alerts
              </h2>
              <button 
                onClick={() => setCurrentScreen('alerts')}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-0.5"
              >
                <span>View all</span>
                <span>&rarr;</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {criticalAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div 
                    key={alert.id}
                    onClick={() => {
                      if (alert.appId) setSelectedApplicationId(alert.appId);
                      setCurrentScreen('application-detail');
                    }}
                    className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-50/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${alert.iconColor}`} />
                      <span className="text-slate-800 truncate text-[11px] font-medium">{alert.text}</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md font-semibold ${alert.severityColor}`}>
                        {alert.severity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono text-right">{alert.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Bottom Row (3 Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Bottleneck Detection Table */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs">
          <h2 className="text-[13px] sm:text-[14px] font-bold text-slate-900 mb-3">
            Bottleneck Detection
          </h2>

          <div className="overflow-x-auto -mx-1 sm:mx-0">
            <table className="w-full text-left text-xs min-w-[280px]">
              <thead className="text-[11px] text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="pb-2 font-medium">Stage</th>
                  <th className="pb-2 font-medium">Pending</th>
                  <th className="pb-2 font-medium">Avg. Wait Time</th>
                  <th className="pb-2 font-medium text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {bottlenecks.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-800">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${item.dot}`} />
                      <span>{item.stage}</span>
                    </td>
                    <td className="py-2.5 text-[11px] font-semibold text-slate-800">{item.pending}</td>
                    <td className="py-2.5 text-[11px] text-slate-500">{item.wait}</td>
                    <td className="py-2.5 text-right">
                      {item.trend === 'up' && <span className="text-rose-500 font-bold">&uarr;</span>}
                      {item.trend === 'down' && <span className="text-emerald-500 font-bold">&darr;</span>}
                      {item.trend === 'neutral' && <span className="text-slate-400">&rarr;</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 2: Recommended Next Actions */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[13px] sm:text-[14px] font-bold text-slate-900">
                Recommended Next Actions
              </h2>
              <button 
                onClick={() => {
                  setSelectedApplicationId('AZL-2026-00124');
                  setCurrentScreen('application-detail');
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-0.5"
              >
                <span>View all</span>
                <span>&rarr;</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {nextActions.map((action) => (
                <div 
                  key={action.num}
                  onClick={() => {
                    setSelectedApplicationId(action.appId);
                    setCurrentScreen('application-detail');
                  }}
                  className="flex items-start gap-2.5 p-1 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="w-5 h-5 rounded-full bg-[#f0f4f9] text-slate-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {action.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[12px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight truncate">
                      {action.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {action.sub} &rarr;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Government Tech / National Emblem Card & Disclaimer */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              {/* Ashoka Lion Capital SVG Representation */}
              <div className="w-10 h-10 rounded-lg bg-[#f0f4f9] flex items-center justify-center shrink-0 border border-slate-200">
                <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z"/>
                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
                  <path d="M12 7v2"/>
                  <path d="M12 15v2"/>
                  <path d="M7 12H5"/>
                  <path d="M19 12h-2"/>
                </svg>
              </div>

              <div>
                <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                  Building Transparent and Efficient Regulatory Workflows
                </h3>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Aavartan ZeroLoop helps authorized personnel identify discrepancies, coordinate dependencies, reduce avoidable rework, and maintain compliance across the full lifecycle of regulatory approvals.
            </p>

            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f0f4f9] border border-slate-200 rounded-md text-[10px] sm:text-[11px] text-slate-600 font-medium">
                <Shield className="w-3 h-3 text-slate-500 shrink-0" />
                <span className="truncate">SIH 2026 Prototype • Not an official government service</span>
              </span>
            </div>
          </div>

          <div className="mt-3.5 p-2 bg-[#f0f7ff] border border-blue-100 rounded-lg flex items-center gap-2 text-[10px] sm:text-[11px] text-[#2563eb]">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>All data shown is fictional and for demonstration purposes only.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
