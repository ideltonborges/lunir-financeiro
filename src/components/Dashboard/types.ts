export type Transaction = {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  is_fixed: number;
  date: string;
  created_at: string;
};

export type DashboardData = {
  userName: string;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  recentTransactions: Transaction[];
  last7DaysTransactions: Transaction[];
};

export interface DashboardProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
}