export type UserSettings = {
  name: string;
  theme: string;
  base_salary: number | null;
  salary_date: number | null;
  notifications_enabled: number;
  daily_reminder: number;
  reminder_time: string | null;
  weekly_report: number;
  monthly_report: number;
  budget_alerts: number;
  budget_alert_last_sent_month: string | null;
};

export type NotificationKey =
  | 'notifications_enabled'
  | 'daily_reminder'
  | 'weekly_report'
  | 'monthly_report'
  | 'budget_alerts';

export type ProfileFormData = {
  name: string;
  salary: string;
  salaryDate: string;
};
