import * as SQLite from 'expo-sqlite';

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

export type UserSettings = {
  name: string;
  theme: string;
  base_salary: number | null;
};

export async function getUserSettings(db: SQLite.SQLiteDatabase): Promise<UserSettings | null> {
  return await db.getFirstAsync<UserSettings>(
    `SELECT name, theme, base_salary FROM user_settings WHERE id = 1`
  );
}

export async function getRecentTransactions(db: SQLite.SQLiteDatabase, limit = 6): Promise<Transaction[]> {
  return await db.getAllAsync<Transaction>(
    `SELECT * FROM transactions ORDER BY date DESC, created_at DESC LIMIT ?`,
    [limit]
  );
}

export async function getLast7DaysTransactions(db: SQLite.SQLiteDatabase): Promise<Transaction[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const fromDate = sevenDaysAgo.toISOString().split('T')[0];

  return await db.getAllAsync<Transaction>(
    `SELECT * FROM transactions WHERE date >= ? ORDER BY date ASC`,
    [fromDate]
  );
}

export async function getTotals(db: SQLite.SQLiteDatabase): Promise<{ totalIncome: number; totalExpenses: number }> {
  const result = await db.getFirstAsync<{ totalIncome: number; totalExpenses: number }>(`
    SELECT
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as totalIncome,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as totalExpenses
    FROM transactions
  `);
  return result ?? { totalIncome: 0, totalExpenses: 0 };
}