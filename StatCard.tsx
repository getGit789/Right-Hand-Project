import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  color: string;
}

const StatCard = ({ title, value, change, icon: Icon, trend, color }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={cn('p-2 rounded-lg', color)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className={cn(
          'flex items-center text-sm font-medium',
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        )}>
          <span className="flex items-center">
            {change}
            <span className={cn(
              'ml-1 text-xs',
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
              vs last month
            </span>
          </span>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatCard;