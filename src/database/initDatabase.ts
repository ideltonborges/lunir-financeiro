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

    CREATE TABLE IF NOT EXISTS recurring_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL DEFAULT 'expense',
      amount REAL NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      day INTEGER NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME
    );
  `);

  await addColumnIfMissing(db, 'transactions', 'auto_generated', 'INTEGER DEFAULT 0');
  await addColumnIfMissing(db, 'transactions', 'recurring_kind', 'TEXT');
  await addColumnIfMissing(db, 'transactions', 'recurring_transaction_id', 'INTEGER');
  await addColumnIfMissing(db, 'user_settings', 'salary_automation_start_date', 'TEXT');
  await addColumnIfMissing(db, 'user_settings', 'budget_alert_last_sent_month', 'TEXT');

  console.log('Banco de dados inicializado com sucesso!');
}

async function addColumnIfMissing(
  db: SQLite.SQLiteDatabase,
  tableName: string,
  columnName: string,
  columnDefinition: string
) {
  const columns = await db.getAllAsync<{ name: string }>(`PRAGMA table_info(${tableName})`);
  const columnExists = columns.some((column) => column.name === columnName);

  if (!columnExists) {
    await db.execAsync(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDefinition}`);
  }
}
