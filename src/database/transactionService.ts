import * as SQLite from 'expo-sqlite';
import { TransactionFormData } from '../components/Transaction/data';

export async function saveTransaction(db: SQLite.SQLiteDatabase, data: TransactionFormData): Promise<void> {
  const isFixed = data.expenseType === 'fixed' ? 1 : 0;

  await db.runAsync(
    `INSERT INTO transactions (type, amount, description, category, is_fixed, date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.type,
      parseFloat(data.amount),
      data.description.trim(),
      data.category,
      isFixed,
      data.date,
    ]
  );
}

export async function getTransactions(db: SQLite.SQLiteDatabase) {
  return await db.getAllAsync<{
    id: number;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    category: string;
    is_fixed: number;
    date: string;
    created_at: string;
  }>(`SELECT * FROM transactions ORDER BY date DESC, created_at DESC`);
}

export async function deleteTransaction(db: SQLite.SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync(`DELETE FROM transactions WHERE id = ?`, [id]);
}