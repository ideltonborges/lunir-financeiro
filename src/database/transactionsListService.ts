import * as SQLite from 'expo-sqlite';
import { FilterType, Transaction } from '../components/TransactionsList/types';

export async function getAllTransactions(
  db: SQLite.SQLiteDatabase,
  filter: FilterType = 'all'
): Promise<Transaction[]> {
  if (filter === 'all') {
    return await db.getAllAsync<Transaction>(
      `SELECT * FROM transactions ORDER BY date DESC, created_at DESC`
    );
  }

  return await db.getAllAsync<Transaction>(
    `SELECT * FROM transactions WHERE type = ? ORDER BY date DESC, created_at DESC`,
    [filter]
  );
}

export async function removeTransaction(
  db: SQLite.SQLiteDatabase,
  id: number
): Promise<void> {
  await db.runAsync(`DELETE FROM transactions WHERE id = ?`, [id]);
}