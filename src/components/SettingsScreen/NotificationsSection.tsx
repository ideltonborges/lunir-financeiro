import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Bell, Clock, FileText } from 'lucide-react-native';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { ToggleSwitch } from './ToggleSwitch';
import { UserSettings, NotificationKey } from './types';

interface NotificationsSectionProps {
  settings: UserSettings;
  onToggle: (key: NotificationKey) => Promise<void>;
  onReminderTimeChange: (time: string) => Promise<void>;
}

export function NotificationsSection({
  settings,
  onToggle,
  onReminderTimeChange,
}: NotificationsSectionProps) {
  const notificationsOn = settings.notifications_enabled === 1;
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const rows: {
    key: NotificationKey;
    icon: any;
    title: string;
    subtitle: string;
  }[] = [
      {
        key: 'daily_reminder',
        icon: Clock,
        title: 'Lembrete diário',
        subtitle: 'Registre suas transações',
      },
      {
        key: 'weekly_report',
        icon: FileText,
        title: 'Relatório semanal',
        subtitle: 'Resumo da semana',
      },
      {
        key: 'monthly_report',
        icon: FileText,
        title: 'Relatório mensal',
        subtitle: 'Resumo do mês',
      },
      {
        key: 'budget_alerts',
        icon: Bell,
        title: 'Alertas de orçamento',
        subtitle: 'Avisos sobre gastos altos',
      },
    ];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <View style={styles.cardTitleRow}>
          <View style={styles.cardIconWrapper}>
            <Bell size={20} color="#3B82F6" />
          </View>
          <Text style={styles.cardTitle}>Notificações</Text>
        </View>
      </View>

      <View style={[styles.toggleRow, styles.toggleRowBorder]}>
        <View style={styles.toggleLeft}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleTitle}>Ativar notificações</Text>
            <Text style={styles.toggleSubtitle}>Receber lembretes e alertas</Text>
          </View>
        </View>
        <ToggleSwitch
          value={notificationsOn}
          onPress={() => onToggle('notifications_enabled')}
        />
      </View>

      {rows.map((row) => {
        const Icon = row.icon;
        const isOn = settings[row.key] === 1;

        return (
          <View key={row.key}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <Icon size={18} color="#94a3b8" />
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleTitle}>{row.title}</Text>
                  <Text style={styles.toggleSubtitle}>{row.subtitle}</Text>
                </View>
              </View>
              <ToggleSwitch
                value={isOn && notificationsOn}
                onPress={() => onToggle(row.key)}
                disabled={!notificationsOn}
              />
            </View>

            {row.key === 'daily_reminder' && isOn && notificationsOn && (
              <View style={styles.reminderTimeRow}>
                <Text style={styles.reminderTimeLabel}>Horário:</Text>
                <TextInput
                  style={styles.reminderTimeInput}
                  value={settings.reminder_time ?? '08:00'}
                  onChangeText={onReminderTimeChange}
                  placeholder="08:00"
                  placeholderTextColor="#94a3b8"
                  keyboardType="numbers-and-punctuation"
                  maxLength={5}
                />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}