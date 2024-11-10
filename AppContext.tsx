import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task, Activity, Stats, TimeRange, Invoice, Budget, Transaction } from '../types';

interface AppState {
  currentView: 'dashboard' | 'schedule' | 'projects' | 'settings' | 'finances';
  tasks: Task[];
  activities: Activity[];
  stats: Stats;
  searchQuery: string;
  timeRange: TimeRange;
  invoices: Invoice[];
  budgets: Budget[];
  transactions: Transaction[];
}

type AppAction =
  | { type: 'SET_VIEW'; payload: AppState['currentView'] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_TIME_RANGE'; payload: TimeRange }
  | { type: 'ADD_INVOICE'; payload: Invoice }
  | { type: 'UPDATE_INVOICE_STATUS'; payload: { id: string; status: Invoice['status'] } }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_BUDGET'; payload: Budget };

const initialState: AppState = {
  currentView: 'dashboard',
  searchQuery: '',
  timeRange: '7d',
  tasks: [
    { id: '1', title: 'Record podcast episode', time: '2:00 PM', tag: 'Content', priority: 'high', completed: false },
    { id: '2', title: 'Social media planning', time: '4:00 PM', tag: 'Marketing', priority: 'medium', completed: false },
    { id: '3', title: 'Client consultation', time: '5:30 PM', tag: 'Business', priority: 'low', completed: false },
  ],
  activities: [
    { id: '1', title: 'New follower milestone reached', time: '1 hour ago', type: 'milestone' },
    { id: '2', title: 'Published new blog post', time: '3 hours ago', type: 'content' },
    { id: '3', title: 'Completed client project', time: '5 hours ago', type: 'project' },
  ],
  stats: {
    revenue: { value: '$12,426', change: '+16%', trend: 'up' },
    followers: { value: '48.2K', change: '+12%', trend: 'up' },
    engagement: { value: '24.8%', change: '+4%', trend: 'up' },
    tasks: { value: '12/15', change: '+8%', trend: 'up' },
  },
  invoices: [
    {
      id: '1',
      client: 'Tech Corp',
      amount: 2500,
      date: '2024-03-15',
      dueDate: '2024-04-15',
      status: 'pending',
      items: [
        { id: '1', description: 'Website Development', quantity: 1, rate: 2500 }
      ]
    },
    {
      id: '2',
      client: 'Marketing Agency',
      amount: 1800,
      date: '2024-03-10',
      dueDate: '2024-04-10',
      status: 'paid',
      items: [
        { id: '1', description: 'Social Media Management', quantity: 1, rate: 1800 }
      ]
    }
  ],
  budgets: [
    {
      id: '1',
      category: 'Marketing',
      allocated: 5000,
      spent: 3200,
      remaining: 1800,
      period: 'March 2024'
    },
    {
      id: '2',
      category: 'Operations',
      allocated: 3000,
      spent: 1500,
      remaining: 1500,
      period: 'March 2024'
    }
  ],
  transactions: [
    {
      id: '1',
      date: '2024-03-15',
      description: 'Client Payment - Tech Corp',
      amount: 2500,
      type: 'income',
      category: 'Services'
    },
    {
      id: '2',
      date: '2024-03-14',
      description: 'Software Subscription',
      amount: 99,
      type: 'expense',
      category: 'Tools'
    }
  ]
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_TIME_RANGE':
      return { ...state, timeRange: action.payload };
    case 'ADD_INVOICE':
      return { ...state, invoices: [...state.invoices, action.payload] };
    case 'UPDATE_INVOICE_STATUS':
      return {
        ...state,
        invoices: state.invoices.map((invoice) =>
          invoice.id === action.payload.id
            ? { ...invoice, status: action.payload.status }
            : invoice
        ),
      };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map((budget) =>
          budget.id === action.payload.id ? action.payload : budget
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}