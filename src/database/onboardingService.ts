import * as SQLite from 'expo-sqlite';
import { SetupFormData } from '../components/Onboarding/data';

export async function saveOnboardingData(db: SQLite.SQLiteDatabase, data: SetupFormData) {

  const salaryValue = data.salary ? parseFloat(data.salary) : null;
  const salaryDay = data.salaryDate ? parseInt(data.salaryDate) : null;

  await db.runAsync(
    `INSERT OR REPLACE INTO user_settings (id, name, base_salary, salary_date, theme)
     VALUES (1, ?, ?, ?, ?)`,
    [
      data.name.trim(),
      salaryValue,
      salaryDay,
      data.theme || 'light'
    ]
  );

  if (salaryValue && salaryValue > 0) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    
    const dayToUse = salaryDay ? String(salaryDay).padStart(2, '0') : String(today.getDate()).padStart(2, '0');
    
    const transactionDate = `${currentYear}-${currentMonth}-${dayToUse}`;

    await db.runAsync(
      `INSERT INTO transactions (type, amount, description, category, is_fixed, date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        'income',
        salaryValue,
        'Salário mensal',
        'Salário',
        1,
        transactionDate
      ]
    );

    console.log(`Transação de salário gerada para a data: ${transactionDate}`);
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