import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FinancesView from './components/Finances/FinancesView';
import { AppProvider, useApp } from './context/AppContext';

function MainContent() {
  const { state } = useApp();

  return (
    <main className="flex-1 overflow-y-auto">
      {state.currentView === 'dashboard' && <Dashboard />}
      {state.currentView === 'finances' && <FinancesView />}
    </main>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <MainContent />
      </div>
    </AppProvider>
  );
}

export default App;