export type PeriodType = 'day' | 'week' | 'month' | 'year';

export type CategoryData = {
  category: string;
  amount: number;
};

export type MonthlyData = {
  month: string;
  income: number;
  expense: number;
};

export type ReportData = {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  fixedExpenses: number;
  variableExpenses: number;
  categoryData: CategoryData[];
  monthlyData: MonthlyData[];
};

export type Transaction = {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  is_fixed: number;
  date: string;
};