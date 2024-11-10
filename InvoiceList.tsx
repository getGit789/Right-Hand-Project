import React from 'react';
import { useApp } from '../../context/AppContext';

const statusColors = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  overdue: 'bg-red-100 text-red-700',
};

const InvoiceList = () => {
  const { state } = useApp();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">Create Invoice</button>
      </div>
      <div className="space-y-4">
        {state.invoices.map((invoice) => (
          <div key={invoice.id} className="p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{invoice.client}</h3>
                <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[invoice.status]}`}>
                  {invoice.status}
                </span>
                <span className="font-medium">${invoice.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;