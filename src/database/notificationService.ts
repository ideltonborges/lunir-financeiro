import * as SQLite from 'expo-sqlite';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getCurrentLocalDate, getMonthBounds } from '../utils/date';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

type NotificationSettings = {
  notifications_enabled: number;
  daily_reminder: number;
  reminder_time: string | null;
  weekly_report: number;
  monthly_report: number;
  budget_alerts: number;
  budget_alert_last_sent_month: string | null;
};

const DEFAULT_CHANNEL_ID = 'lunir-reminders';

function parseReminderTime(time: string | null): { hour: number; minute: number } {
  const [hourValue, minuteValue] = (time || '08:00').split(':').map((part) => Number(part));
  const hour = Number.isInteger(hourValue) && hourValue >= 0 && hourValue <= 23 ? hourValue : 8;
  const minute = Number.isInteger(minuteValue) && minuteValue >= 0 && minuteValue <= 59 ? minuteValue : 0;

  return { hour, minute };
}

async function ensureNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(DEFAULT_CHANNEL_ID, {
      name: 'Lembretes do Lunir',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#3B82F6',
    });
  }

  const current = await Notifications.getPermissionsAsync();
  if (current.granted) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

async function maybeSendBudgetAlert(db: SQLite.SQLiteDatabase, settings: NotificationSettings): Promise<void> {
  if (settings.budget_alerts !== 1) return;

  const today = new Date();
  const monthKey = getCurrentLocalDate().substring(0, 7);
  if (settings.budget_alert_last_sent_month === monthKey) return;

  const { start } = getMonthBounds(today);
  const todayString = getCurrentLocalDate();
  const totals = await db.getFirstAsync<{ income: number; expenses: number }>(
    `SELECT
       COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as income,
       COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as expenses
     FROM transactions
     WHERE date >= ? AND date <= ?`,
    [start, todayString]
  );

  const income = totals?.income ?? 0;
  const expenses = totals?.expenses ?? 0;

  if (income > 0 && expenses / income >= 0.8) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Atenção aos gastos',
        body: 'Suas despesas do mês já chegaram perto das receitas realizadas.',
      },
      trigger: null,
    });

    await db.runAsync(
      `UPDATE user_settings SET budget_alert_last_sent_month = ? WHERE id = 1`,
      [monthKey]
    );
  }
}

export async function syncNotifications(db: SQLite.SQLiteDatabase): Promise<boolean> {
  const settings = await db.getFirstAsync<NotificationSettings>(
    `SELECT notifications_enabled, daily_reminder, reminder_time,
            weekly_report, monthly_report, budget_alerts, budget_alert_last_sent_month
     FROM user_settings
     WHERE id = 1`
  );

  await Notifications.cancelAllScheduledNotificationsAsync();

  if (!settings || settings.notifications_enabled !== 1) {
    return false;
  }

  const hasPermission = await ensureNotificationPermission();
  if (!hasPermission) {
    await db.runAsync(`UPDATE user_settings SET notifications_enabled = 0 WHERE id = 1`);
    return false;
  }

  const { hour, minute } = parseReminderTime(settings.reminder_time);

  if (settings.daily_reminder === 1) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hora de atualizar o Lunir',
        body: 'Registre suas receitas e despesas para manter seu saldo em dia.',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        channelId: DEFAULT_CHANNEL_ID,
        hour,
        minute,
      },
    });
  }

  if (settings.weekly_report === 1) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Resumo semanal disponível',
        body: 'Veja como foram suas movimentações da semana.',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        channelId: DEFAULT_CHANNEL_ID,
        weekday: 2,
        hour: 9,
        minute: 0,
      },
    });
  }

  if (settings.monthly_report === 1) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Resumo mensal disponível',
        body: 'Confira seu fechamento financeiro do mês.',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
        channelId: DEFAULT_CHANNEL_ID,
        day: 1,
        hour: 9,
        minute: 0,
      },
    });
  }

  await maybeSendBudgetAlert(db, settings);
  return true;
}
