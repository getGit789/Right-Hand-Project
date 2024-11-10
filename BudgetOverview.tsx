import React from 'react';
import { useApp } from '../../context/AppContext';

const BudgetOverview = () => {
  const { state } = useApp();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Budget Overview</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">Add Budget</button>
      </div>
      <div className="space-y-4">
        {state.budgets.map((budget) => (
          <div key={budget.id} className="p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">{budget.category}</h3>
              <span className="text-sm text-gray-500">{budget.period}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Spent: ${budget.spent.toLocaleString()}
              </span>
              <span className="text-gray-600">
                Remaining: ${budget.remaining.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetOverview;