import * as SQLite from 'expo-sqlite';
import { getCurrentLocalDate, getDateForMonthDay, getMonthBounds } from '../utils/date';

export type RecurringTransaction = {
  id: number;
  type: 'expense';
  amount: number;
  description: string;
  category: string;
  day: number;
  is_active: number;
  created_at: string;
  updated_at: string | null;
};

export type RecurringTransactionInput = {
  amount: number;
  description: string;
  category: string;
  day: number;
  isActive?: boolean;
};

async function hasSalaryForMonth(db: SQLite.SQLiteDatabase, monthStart: string, monthEnd: string): Promise<boolean> {
  const result = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count
     FROM transactions
     WHERE type = 'income'
       AND category = 'Salário'
       AND auto_generated = 1
       AND date >= ?
       AND date <= ?`,
    [monthStart, monthEnd]
  );

  return (result?.count ?? 0) > 0;
}

async function hasRecurringTransactionForMonth(
  db: SQLite.SQLiteDatabase,
  recurringId: number,
  monthStart: string,
  monthEnd: string
): Promise<boolean> {
  const result = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count
     FROM transactions
     WHERE recurring_transaction_id = ?
       AND date >= ?
       AND date <= ?`,
    [recurringId, monthStart, monthEnd]
  );

  return (result?.count ?? 0) > 0;
}

export async function createRecurringExpense(
  db: SQLite.SQLiteDatabase,
  input: RecurringTransactionInput
): Promise<number> {
  const result = await db.runAsync(
    `INSERT INTO recurring_transactions (type, amount, description, category, day, is_active)
     VALUES ('expense', ?, ?, ?, ?, ?)`,
    [
      input.amount,
      input.description.trim(),
      input.category,
      input.day,
      input.isActive === false ? 0 : 1,
    ]
  );

  return result.lastInsertRowId;
}

export async function getRecurringExpenses(db: SQLite.SQLiteDatabase): Promise<RecurringTransaction[]> {
  return await db.getAllAsync<RecurringTransaction>(
    `SELECT *
     FROM recurring_transactions
     ORDER BY is_active DESC, day ASC, description ASC`
  );
}

export async function updateRecurringExpense(
  db: SQLite.SQLiteDatabase,
  id: number,
  input: RecurringTransactionInput
): Promise<void> {
  await db.runAsync(
    `UPDATE recurring_transactions
     SET amount = ?, description = ?, category = ?, day = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      input.amount,
      input.description.trim(),
      input.category,
      input.day,
      input.isActive === false ? 0 : 1,
      id,
    ]
  );
}

export async function toggleRecurringExpense(
  db: SQLite.SQLiteDatabase,
  id: number,
  isActive: boolean
): Promise<void> {
  await db.runAsync(
    `UPDATE recurring_transactions
     SET is_active = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [isActive ? 1 : 0, id]
  );
}

export async function processRecurringTransactions(db: SQLite.SQLiteDatabase): Promise<void> {
  const today = new Date();
  const todayString = getCurrentLocalDate();
  const { start: monthStart, end: monthEnd } = getMonthBounds(today);

  const settings = await db.getFirstAsync<{
    base_salary: number | null;
    salary_date: number | null;
    salary_automation_start_date: string | null;
  }>(
    `SELECT base_salary, salary_date, salary_automation_start_date FROM user_settings WHERE id = 1`
  );

  const salaryAutomationCanRun =
    !settings?.salary_automation_start_date || monthStart >= settings.salary_automation_start_date;

  if (salaryAutomationCanRun && settings?.base_salary && settings.base_salary > 0 && settings.salary_date) {
    const salaryDate = getDateForMonthDay(today, settings.salary_date);
    const alreadyPaid = await hasSalaryForMonth(db, monthStart, monthEnd);

    if (todayString >= salaryDate && !alreadyPaid) {
      await db.runAsync(
        `INSERT INTO transactions
          (type, amount, description, category, is_fixed, date, auto_generated, recurring_kind)
         VALUES ('income', ?, 'Salário mensal', 'Salário', 1, ?, 1, 'salary')`,
        [settings.base_salary, salaryDate]
      );
    }
  }

  const recurringExpenses = await db.getAllAsync<RecurringTransaction>(
    `SELECT *
     FROM recurring_transactions
     WHERE is_active = 1`
  );

  for (const expense of recurringExpenses) {
    const dueDate = getDateForMonthDay(today, expense.day);
    const alreadyCreated = await hasRecurringTransactionForMonth(db, expense.id, monthStart, monthEnd);

    if (todayString >= dueDate && !alreadyCreated) {
      await db.runAsync(
        `INSERT INTO transactions
          (type, amount, description, category, is_fixed, date, auto_generated, recurring_kind, recurring_transaction_id)
         VALUES ('expense', ?, ?, ?, 1, ?, 1, 'fixed_expense', ?)`,
        [expense.amount, expense.description, expense.category, dueDate, expense.id]
      );
    }
  }
}
