import * as SQLite from 'expo-sqlite';
import { UserSettings, NotificationKey } from '../components/SettingsScreen/types';

export async function getUserSettings(db: SQLite.SQLiteDatabase): Promise<UserSettings | null> {
  return await db.getFirstAsync<UserSettings>(
    `SELECT name, theme, base_salary, salary_date,
            notifications_enabled, daily_reminder, reminder_time,
            weekly_report, monthly_report, budget_alerts
     FROM user_settings WHERE id = 1`
  );
}

export async function updateProfile(
  db: SQLite.SQLiteDatabase,
  name: string,
  salary: number | null,
  salaryDate: number | null
): Promise<void> {
  await db.runAsync(
    `UPDATE user_settings
     SET name = ?, base_salary = ?, salary_date = ?
     WHERE id = 1`,
    [name, salary, salaryDate]
  );
}

export async function toggleNotification(
  db: SQLite.SQLiteDatabase,
  key: NotificationKey,
  currentValue: number
): Promise<void> {
  const newValue = currentValue === 1 ? 0 : 1;
  await db.runAsync(
    `UPDATE user_settings SET ${key} = ? WHERE id = 1`,
    [newValue]
  );
}

export async function updateReminderTime(
  db: SQLite.SQLiteDatabase,
  time: string
): Promise<void> {
  await db.runAsync(
    `UPDATE user_settings SET reminder_time = ? WHERE id = 1`,
    [time]
  );
}