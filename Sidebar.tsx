import React from 'react';
import { Calendar, BarChart3, Briefcase, Settings, BrainCircuit, Bell, Search, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { state, dispatch } = useApp();

  const navItems = [
    { icon: BarChart3, label: 'dashboard' },
    { icon: DollarSign, label: 'finances' },
    { icon: Calendar, label: 'schedule' },
    { icon: Briefcase, label: 'projects' },
    { icon: Settings, label: 'settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <BrainCircuit className="w-8 h-8 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">Right Hand</h1>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => dispatch({ type: 'SET_VIEW', payload: item.label as any })}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  state.currentView === item.label
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="capitalize">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-200">
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
            <span className="ml-auto bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs">
              3
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;