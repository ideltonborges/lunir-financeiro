import * as SQLite from 'expo-sqlite';

export async function initializeDatabase(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS user_settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      name TEXT NOT NULL,
      theme TEXT DEFAULT 'light',
      base_salary REAL,
      salary_date INTEGER,
      notifications_enabled INTEGER DEFAULT 0,
      daily_reminder INTEGER DEFAULT 0,
      reminder_time TEXT,
      weekly_report INTEGER DEFAULT 0,
      monthly_report INTEGER DEFAULT 0,
      budget_alerts INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      is_fixed INTEGER DEFAULT 0,
      date TEXT NOT NULL, -- Formato YYYY-MM-DD
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Banco de dados inicializado com sucesso!');
}