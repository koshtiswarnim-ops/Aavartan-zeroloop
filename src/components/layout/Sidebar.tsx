import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Network, 
  UserCheck, 
  ShieldCheck, 
  Zap, 
  Bell, 
  BarChart3, 
  History, 
  Settings,
  PlayCircle,
  ChevronDown,
  User,
  X
} from 'lucide-react';
import { useApp, ScreenType } from '../../context/AppContext';
import { AavartanLogo } from '../common/Logo';

export const Sidebar: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    scenarioStep,
    advanceScenarioStep,
    setSelectedApplicationId,
    setIsTourActive,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useApp();

  const navItems: { id: ScreenType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'workflow', label: 'Workflow Intelligence', icon: Network },
    { id: 'evc', label: 'EVC Management', icon: UserCheck },
    { id: 'compliance', label: 'Compliance & Renewals', icon: ShieldCheck },
    { id: 'zeroloop', label: 'ZeroLoop Waste Intel', icon: Zap },
    { id: 'alerts', label: 'Alerts & Escalations', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'audit', label: 'Audit Trail', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id: ScreenType) => {
    setCurrentScreen(id);
    setIsMobileMenuOpen(false); // Auto-close drawer on mobile
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container: Persistent on lg+, Sliding Drawer on Mobile */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white text-slate-700 flex flex-col shrink-0 border-r border-slate-200 select-none h-screen transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header - Exact Deep Dark Navy Block matching reference image */}
        <div className="bg-[#0b1a30] text-white px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-white shrink-0">
              <AavartanLogo size={28} className="w-7 h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-[15px] tracking-tight text-white leading-tight">
                Aavartan ZeroLoop
              </h1>
              <p className="text-[11px] text-slate-300 font-normal leading-tight mt-0.5 truncate">
                Regulatory Workflow Intelligence
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 text-slate-400 hover:text-white lg:hidden"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links List */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id || (item.id === 'applications' && currentScreen === 'application-detail');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-[#2563eb]' : 'text-slate-500'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Area */}
        <div className="p-3 border-t border-slate-100 space-y-3">
          {/* Start Guided Demo Button */}
          <button
            onClick={() => {
              setIsTourActive(true);
              setSelectedApplicationId('AZL-2026-00124');
              setCurrentScreen('application-detail');
              advanceScenarioStep();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#f0f5ff] hover:bg-blue-100/70 border border-blue-200/80 text-[#2563eb] font-semibold text-xs transition-colors shadow-2xs"
          >
            <PlayCircle className="w-4 h-4 text-[#2563eb] shrink-0" />
            <span>Start Guided Demo</span>
          </button>

          {/* User Profile Block */}
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  Rahul Sharma
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  Regulatory Officer
                </div>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
};
