import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TimeRange } from '../types';

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: '1h', label: 'Last hour' },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' },
];

const TimeRangeSelector = () => {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = timeRangeOptions.find(option => option.value === state.timeRange);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {currentOption?.label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-20">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  dispatch({ type: 'SET_TIME_RANGE', payload: option.value });
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  state.timeRange === option.value
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                } first:rounded-t-lg last:rounded-b-lg`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TimeRangeSelector;