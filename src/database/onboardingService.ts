import * as SQLite from 'expo-sqlite';
import { SetupFormData } from '../components/Onboarding/data';
import { parseCurrencyInput } from '../utils/currency';
import { formatLocalDate, getDateForMonthDay } from '../utils/date';

export async function saveOnboardingData(db: SQLite.SQLiteDatabase, data: SetupFormData) {

  const salaryValue = data.salary ? parseCurrencyInput(data.salary) : null;
  const salaryDay = data.salaryDate ? parseInt(data.salaryDate) : null;
  const today = new Date();
  const currentMonthStart = formatLocalDate(new Date(today.getFullYear(), today.getMonth(), 1));
  const nextMonthStart = formatLocalDate(new Date(today.getFullYear(), today.getMonth() + 1, 1));
  const currentMonthSalaryDate = getDateForMonthDay(today, salaryDay ?? today.getDate());
  const todayString = formatLocalDate(today);
  const salaryAutomationStartDate = data.launchCurrentSalary || todayString < currentMonthSalaryDate
    ? currentMonthStart
    : nextMonthStart;

  await db.runAsync(
    `INSERT OR REPLACE INTO user_settings
      (id, name, base_salary, salary_date, theme, salary_automation_start_date)
     VALUES (1, ?, ?, ?, ?, ?)`,
    [
      data.name.trim(),
      salaryValue,
      salaryDay,
      data.theme || 'light',
      salaryAutomationStartDate
    ]
  );

  if (data.launchCurrentSalary && salaryValue && salaryValue > 0) {
    await db.runAsync(
      `INSERT INTO transactions
        (type, amount, description, category, is_fixed, date, auto_generated, recurring_kind)
       VALUES (?, ?, ?, ?, ?, ?, 1, 'salary')`,
      [
        'income',
        salaryValue,
        'Salário mensal',
        'Salário',
        1,
        currentMonthSalaryDate
      ]
    );

    console.log(`Transação de salário gerada para a data: ${currentMonthSalaryDate}`);
  }
}

export async function checkUserCompletedOnboarding(db: SQLite.SQLiteDatabase): Promise<boolean> {
  try {
    const result = await db.getFirstAsync<{ name: string }>(
      'SELECT name FROM user_settings WHERE id = 1'
    );
    return result !== null && result.name !== null;
  } catch (error) {
    console.error("Erro ao checar usuário:", error);
    return false;
  }
}
