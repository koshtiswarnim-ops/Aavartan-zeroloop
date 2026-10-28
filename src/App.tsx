import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { ScenarioTourBanner } from './components/layout/ScenarioTourBanner';
import { CopilotDrawer } from './components/copilot/CopilotDrawer';

// Screens
import { OverviewScreen } from './components/screens/OverviewScreen';
import { ApplicationsScreen } from './components/screens/ApplicationsScreen';
import { ApplicationDetailWorkspace } from './components/screens/ApplicationDetailWorkspace';
import { WorkflowIntelligenceScreen } from './components/screens/WorkflowIntelligenceScreen';
import { EvcManagementScreen } from './components/screens/EvcManagementScreen';
import { ComplianceRenewalsScreen } from './components/screens/ComplianceRenewalsScreen';
import { ZeroLoopWasteScreen } from './components/screens/ZeroLoopWasteScreen';
import { AlertsEscalationsScreen } from './components/screens/AlertsEscalationsScreen';
import { AnalyticsReportsScreen } from './components/screens/AnalyticsReportsScreen';
import { AuditTrailScreen } from './components/screens/AuditTrailScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

const MainContent: React.FC = () => {
  const { currentScreen } = useApp();

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full min-w-0">
        {/* Sticky Top Navbar */}
        <Navbar />

        {/* Guided SIH Benchmark Scenario Tour Banner */}
        <ScenarioTourBanner />

        {/* Dynamic Screen View */}
        <main className="flex-1 overflow-y-auto">
          {currentScreen === 'overview' && <OverviewScreen />}
          {currentScreen === 'applications' && <ApplicationsScreen />}
          {currentScreen === 'application-detail' && <ApplicationDetailWorkspace />}
          {currentScreen === 'workflow' && <WorkflowIntelligenceScreen />}
          {currentScreen === 'evc' && <EvcManagementScreen />}
          {currentScreen === 'compliance' && <ComplianceRenewalsScreen />}
          {currentScreen === 'zeroloop' && <ZeroLoopWasteScreen />}
          {currentScreen === 'alerts' && <AlertsEscalationsScreen />}
          {currentScreen === 'analytics' && <AnalyticsReportsScreen />}
          {currentScreen === 'audit' && <AuditTrailScreen />}
          {currentScreen === 'settings' && <SettingsScreen />}
        </main>
      </div>

      {/* Floating ZeroLoop Copilot Drawer */}
      <CopilotDrawer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
