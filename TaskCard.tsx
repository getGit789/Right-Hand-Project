import React from 'react';
import { Trash2, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TaskCardProps {
  id: string;
  title: string;
  time: string;
  tag: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const priorityColors = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

const TaskCard = ({ id, title, time, tag, priority, completed }: TaskCardProps) => {
  const { dispatch } = useApp();

  return (
    <div className={`flex items-center justify-between p-4 bg-white rounded-lg border ${
      completed ? 'border-green-200 bg-green-50' : 'border-gray-100'
    } hover:border-indigo-100 transition-colors`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: id })}
          className="flex-shrink-0"
        >
          <CheckCircle 
            className={`w-5 h-5 ${
              completed ? 'text-green-500' : 'text-gray-300'
            } hover:text-green-600`}
            fill={completed ? 'currentColor' : 'none'}
          />
        </button>
        <div>
          <h3 className={`font-medium ${completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600">{time}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
        <span className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
          {tag}
        </span>
        <button
          onClick={() => dispatch({ type: 'DELETE_TASK', payload: id })}
          className="p-1 hover:bg-red-50 rounded-full text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;