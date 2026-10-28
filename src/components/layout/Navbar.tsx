import React from 'react';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Shield, 
  ChevronDown, 
  CheckCircle2,
  User,
  Menu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    searchQuery, 
    setSearchQuery, 
    setCurrentScreen, 
    setIsCopilotOpen,
    setIsMobileMenuOpen 
  } = useApp();

  const roles: Role[] = [
    'Administrator',
    'Application Reviewer',
    'EVC Coordinator',
    'Compliance Officer',
    'Read-Only Auditor'
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
      {/* Left: Hamburger menu on Mobile + SIH 2026 Prototype Pill */}
      <div className="flex items-center gap-2.5">
        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* SIH 2026 Prototype Pill Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#f0f4f9] border border-slate-200 rounded-md text-[12px] text-slate-700 font-medium">
          <Shield className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">SIH 2026 Prototype • Demo Environment</span>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="flex-1 max-w-xl mx-2 sm:mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications, IDs..."
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Right Side: Copilot, Bell, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* ZeroLoop Copilot Pill */}
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          title="Open ZeroLoop Copilot AI Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
          <span className="hidden xs:inline">Copilot</span>
        </button>

        {/* Bell with red notification badge '3' */}
        <button
          onClick={() => setCurrentScreen('alerts')}
          className="relative p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-rose-500 text-white text-[9px] font-bold rounded-full">
            3
          </span>
        </button>

        {/* User Profile & Role Switcher */}
        <div className="relative group pl-1.5 sm:pl-2 border-l border-slate-200">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
              <User className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                Rahul Sharma
              </div>
              <div className="text-[11px] text-slate-400 leading-tight flex items-center gap-1">
                <span>{currentRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Role Switcher Menu */}
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1 hidden group-hover:block z-50">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              Switch Official Role
            </div>
            {roles.map(r => (
              <button
                key={r}
                onClick={() => setCurrentRole(r)}
                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between ${
                  currentRole === r ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{r}</span>
                {currentRole === r && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
