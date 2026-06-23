import * as SQLite from 'expo-sqlite';
import { TransactionFormData } from '../components/Transaction/data';
import { parseCurrencyInput } from '../utils/currency';
import { createRecurringExpense } from './recurringService';
import { getDayFromDateString } from '../utils/date';

export async function saveTransaction(db: SQLite.SQLiteDatabase, data: TransactionFormData): Promise<void> {
  const isFixed = data.expenseType === 'fixed' ? 1 : 0;
  const amount = parseCurrencyInput(data.amount);
  let recurringTransactionId: number | null = null;

  if (data.type === 'expense' && isFixed === 1) {
    recurringTransactionId = await createRecurringExpense(db, {
      amount,
      description: data.description,
      category: data.category,
      day: getDayFromDateString(data.date),
    });
  }

  await db.runAsync(
    `INSERT INTO transactions
      (type, amount, description, category, is_fixed, date, auto_generated, recurring_kind, recurring_transaction_id)
     VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)`,
    [
      data.type,
      amount,
      data.description.trim(),
      data.category,
      isFixed,
      data.date,
      recurringTransactionId ? 'fixed_expense' : null,
      recurringTransactionId,
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
    auto_generated: number;
    recurring_kind: string | null;
    recurring_transaction_id: number | null;
  }>(`SELECT * FROM transactions ORDER BY date DESC, created_at DESC`);
}

export async function deleteTransaction(db: SQLite.SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync(`DELETE FROM transactions WHERE id = ?`, [id]);
}
