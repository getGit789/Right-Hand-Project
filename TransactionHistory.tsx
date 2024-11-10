import React from 'react';
import { useApp } from '../../context/AppContext';

const TransactionHistory = () => {
  const { state } = useApp();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">Export</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3 text-sm font-medium text-gray-500">Date</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Description</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Category</th>
              <th className="pb-3 text-sm font-medium text-gray-500 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {state.transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-50">
                <td className="py-3 text-sm text-gray-900">{transaction.date}</td>
                <td className="py-3 text-sm text-gray-900">{transaction.description}</td>
                <td className="py-3 text-sm text-gray-900">{transaction.category}</td>
                <td className={`py-3 text-sm font-medium text-right ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;