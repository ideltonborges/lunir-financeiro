export type TypeFilter = 'all' | 'income' | 'expense';

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