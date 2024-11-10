export interface Task {
  id: string;
  title: string;
  time: string;
  tag: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface Activity {
  id: string;
  title: string;
  time: string;
  type: 'milestone' | 'content' | 'project';
}

export interface Stats {
  revenue: { value: string; change: string; trend: 'up' | 'down' };
  followers: { value: string; change: string; trend: 'up' | 'down' };
  engagement: { value: string; change: string; trend: 'up' | 'down' };
  tasks: { value: string; change: string; trend: 'up' | 'down' };
}

export interface Invoice {
  id: string;
  client: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

export type TimeRange = '1h' | '24h' | '7d' | '30d' | '90d' | '1y';