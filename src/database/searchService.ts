import * as SQLite from 'expo-sqlite';
import { TypeFilter, Transaction } from '../components/SearchScreen/types';

export async function searchTransactions(
  db: SQLite.SQLiteDatabase,
  searchTerm: string,
  typeFilter: TypeFilter,
  categoryFilter: string | null
): Promise<Transaction[]> {
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (searchTerm.trim()) {
    conditions.push(`(LOWER(description) LIKE ? OR LOWER(category) LIKE ?)`);
    const term = `%${searchTerm.toLowerCase().trim()}%`;
    params.push(term, term);
  }

  if (typeFilter !== 'all') {
    conditions.push(`type = ?`);
    params.push(typeFilter);
  }

  if (categoryFilter) {
    conditions.push(`category = ?`);
    params.push(categoryFilter);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  return await db.getAllAsync<Transaction>(
    `SELECT * FROM transactions ${where} ORDER BY date DESC, created_at DESC`,
    params
  );
}

export async function getAllCategories(db: SQLite.SQLiteDatabase): Promise<string[]> {
  const rows = await db.getAllAsync<{ category: string }>(
    `SELECT DISTINCT category FROM transactions ORDER BY category ASC`
  );
  return rows.map((r) => r.category);
}