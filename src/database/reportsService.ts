import * as SQLite from 'expo-sqlite';
import { PeriodType, ReportData, Transaction } from '../components/Reports/types';

async function getTransactionsByPeriod(
  db: SQLite.SQLiteDatabase,
  period: PeriodType
): Promise<Transaction[]> {
  const now = new Date();
  let fromDate: string;

  switch (period) {
    case 'day':
      fromDate = now.toISOString().split('T')[0];
      return await db.getAllAsync<Transaction>(
        `SELECT * FROM transactions WHERE date = ?`,
        [fromDate]
      );

    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      fromDate = weekAgo.toISOString().split('T')[0];
      break;

    case 'month':
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      fromDate = monthStart.toISOString().split('T')[0];
      break;

    case 'year':
      fromDate = `${now.getFullYear()}-01-01`;
      break;
  }

  return await db.getAllAsync<Transaction>(
    `SELECT * FROM transactions WHERE date >= ? ORDER BY date ASC`,
    [fromDate]
  );
}

async function getAllTransactionsForYear(
  db: SQLite.SQLiteDatabase,
  year: number
): Promise<Transaction[]> {
  return await db.getAllAsync<Transaction>(
    `SELECT * FROM transactions WHERE date >= ? AND date <= ?`,
    [`${year}-01-01`, `${year}-12-31`]
  );
}

export async function getReportData(
  db: SQLite.SQLiteDatabase,
  period: PeriodType
): Promise<ReportData> {
  const now = new Date();
  const filtered = await getTransactionsByPeriod(db, period);

  const totalIncome = filtered
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filtered
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const fixedExpenses = filtered
    .filter((t) => t.type === 'expense' && t.is_fixed === 1)
    .reduce((sum, t) => sum + t.amount, 0);

  const variableExpenses = filtered
    .filter((t) => t.type === 'expense' && t.is_fixed === 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryMap: Record<string, number> = {};
  filtered
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

  const categoryData = Object.entries(categoryMap)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  let monthlyData: ReportData['monthlyData'] = [];
  if (period === 'year') {
    const yearTransactions = await getAllTransactionsForYear(db, now.getFullYear());
    monthlyData = Array.from({ length: 12 }, (_, i) => {
      const monthStr = String(i + 1).padStart(2, '0');
      const yearStr = String(now.getFullYear());
      const monthTx = yearTransactions.filter((t) =>
        t.date.startsWith(`${yearStr}-${monthStr}`)
      );
      const income = monthTx
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = monthTx
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      const monthLabel = new Date(now.getFullYear(), i, 1).toLocaleDateString('pt-BR', {
        month: 'short',
      });
      return { month: monthLabel, income, expense };
    });
  }

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    fixedExpenses,
    variableExpenses,
    categoryData,
    monthlyData,
  };
}