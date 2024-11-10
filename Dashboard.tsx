import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from './Stats/StatCard';
import TaskCard from './Tasks/TaskCard';
import ActivityItem from './Activity/ActivityItem';
import AddTaskDialog from './Tasks/AddTaskDialog';
import TimeRangeSelector from './TimeRangeSelector';

const Dashboard = () => {
  const { state } = useApp();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const stats = [
    {
      title: 'Revenue',
      value: state.stats.revenue.value,
      change: state.stats.revenue.change,
      icon: DollarSign,
      trend: state.stats.revenue.trend,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      title: 'Followers',
      value: state.stats.followers.value,
      change: state.stats.followers.change,
      icon: Users,
      trend: state.stats.followers.trend,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      title: 'Engagement',
      value: state.stats.engagement.value,
      change: state.stats.engagement.change,
      icon: TrendingUp,
      trend: state.stats.engagement.trend,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    },
    {
      title: 'Tasks',
      value: state.stats.tasks.value,
      change: state.stats.tasks.change,
      icon: Calendar,
      trend: state.stats.tasks.trend,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
    },
  ];

  const filteredTasks = state.tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      task.tag.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Entrepreneur</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <TimeRangeSelector />
            <button
              onClick={() => setIsAddTaskOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Task
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
          </div>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
          </div>
          <div className="space-y-4">
            {state.activities.map((activity) => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </div>
        </div>
      </div>

      <AddTaskDialog isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
    </div>
  );
};

export default Dashboard;