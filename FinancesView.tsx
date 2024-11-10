import React from 'react';
import { useApp } from '../../context/AppContext';
import BudgetOverview from './BudgetOverview';
import InvoiceList from './InvoiceList';
import TransactionHistory from './TransactionHistory';
import TimeRangeSelector from '../TimeRangeSelector';

const FinancesView = () => {
  const { state } = useApp();

  const totalRevenue = state.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
            <p className="text-gray-600 mt-1">Track your business finances and cash flow</p>
          </div>
          <TimeRangeSelector />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Net Profit</h3>
          <p className="text-2xl font-bold text-indigo-600">
            ${(totalRevenue - totalExpenses).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <BudgetOverview />
        <InvoiceList />
      </div>

      <TransactionHistory />
    </div>
  );
};

export default FinancesView;