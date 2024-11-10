import React from 'react';
import { Circle } from 'lucide-react';

interface ActivityItemProps {
  title: string;
  time: string;
  type: 'milestone' | 'content' | 'project';
}

const typeColors = {
  milestone: 'text-purple-500',
  content: 'text-blue-500',
  project: 'text-green-500',
};

const ActivityItem = ({ title, time, type }: ActivityItemProps) => {
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <Circle className={`w-2 h-2 ${typeColors[type]}`} fill="currentColor" />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">{time}</p>
          <span className={`text-xs font-medium ${typeColors[type]}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;