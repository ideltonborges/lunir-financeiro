import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Moon, Sun } from 'lucide-react-native';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { UserSettings, NotificationKey, ProfileFormData } from './types';
import { ProfileSection } from './ProfileSection';
import { NotificationsSection } from './NotificationsSection';
import { BackupSection } from './BackupSection';
import { getUserSettings, toggleNotification, updateProfile, updateReminderTime } from '../../database/settingsService';
import { ToggleSwitch } from './ToggleSwitch';
import { parseCurrencyInput } from '../../utils/currency';
import {
  getRecurringExpenses,
  RecurringTransaction,
  RecurringTransactionInput,
  toggleRecurringExpense,
  updateRecurringExpense,
} from '../../database/recurringService';
import { FixedExpensesSection } from './FixedExpensesSection';
import { syncNotifications } from '../../database/notificationService';

export function SettingsScreen() {
  const db = useSQLiteContext();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [recurringExpenses, setRecurringExpenses] = useState<RecurringTransaction[]>([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  const loadSettings = useCallback(async () => {
    try {
      const [data, fixedExpenses] = await Promise.all([
        getUserSettings(db),
        getRecurringExpenses(db),
      ]);
      setSettings(data);
      setRecurringExpenses(fixedExpenses);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      void loadSettings();
    }, [loadSettings])
  );

  useEffect(() => {
    if (!isLoading && settings) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isLoading, settings]);

  const handleSaveProfile = async (data: ProfileFormData) => {
    try {
      const salary = data.salary ? parseCurrencyInput(data.salary) : null;
      const salaryDate = data.salaryDate ? parseInt(data.salaryDate) : null;
      await updateProfile(db, data.name.trim(), salary, salaryDate);
      await loadSettings();
      Toast.show({
        type: 'success',
        text1: 'Perfil atualizado!',
        text2: 'Suas informações foram salvas.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao salvar',
        text2: 'Não foi possível atualizar o perfil.',
      });
    }
  };

  const handleToggleNotification = async (key: NotificationKey) => {
    if (!settings) return;
    try {
      await toggleNotification(db, key, settings[key] as number);
      await syncNotifications(db);
      await loadSettings();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível atualizar a notificação.',
      });
    }
  };

  const handleReminderTimeChange = async (time: string) => {
    try {
      await updateReminderTime(db, time);
      await syncNotifications(db);
      await loadSettings();
    } catch (error) {
      console.error('Erro ao atualizar horário:', error);
    }
  };

  const handleSaveRecurringExpense = async (id: number, input: RecurringTransactionInput) => {
    try {
      await updateRecurringExpense(db, id, input);
      await loadSettings();
      Toast.show({
        type: 'success',
        text1: 'Gasto fixo atualizado!',
        text2: 'A mudança valerá para os próximos lançamentos.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao salvar',
        text2: 'Não foi possível atualizar o gasto fixo.',
      });
    }
  };

  const handleToggleRecurringExpense = async (id: number, isActive: boolean) => {
    try {
      await toggleRecurringExpense(db, id, isActive);
      await loadSettings();
      Toast.show({
        type: 'success',
        text1: isActive ? 'Gasto fixo ativado!' : 'Gasto fixo desativado!',
        text2: 'O histórico já lançado não foi alterado.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível alterar o gasto fixo.',
      });
    }
  };

  if (isLoading || !settings) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 16, paddingBottom: 24 }]}
      >
        <Text style={styles.headerTitle}>Configurações</Text>
      </LinearGradient>

      <Animated.ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        <ProfileSection
          settings={settings}
          onSave={handleSaveProfile}
        />

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <View style={styles.cardIconWrapper}>
              {theme === 'dark'
                ? <Moon size={20} color="#3B82F6" />
                : <Sun size={20} color="#3B82F6" />
              }
            </View>
            <Text style={styles.cardTitle}>Aparência</Text>
          </View>

          <View style={[styles.toggleRow, { marginTop: 16 }]}>
            <View style={styles.toggleLeft}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleTitle}>
                  {theme === 'dark' ? 'Modo escuro' : 'Modo claro'}
                </Text>
                <Text style={styles.toggleSubtitle}>
                  Alterar aparência do app
                </Text>
              </View>
            </View>
            <ToggleSwitch value={theme === 'dark'} onPress={toggleTheme} />
          </View>
        </View>

        <NotificationsSection
          settings={settings}
          onToggle={handleToggleNotification}
          onReminderTimeChange={handleReminderTimeChange}
        />

        <FixedExpensesSection
          expenses={recurringExpenses}
          onSave={handleSaveRecurringExpense}
          onToggle={handleToggleRecurringExpense}
        />

        <BackupSection />

        <View style={styles.appInfoCard}>
          <Text style={styles.appName}>Lunir</Text>
          <Text style={styles.appTagline}>Seu assistente financeiro pessoal</Text>
          <Text style={styles.appVersion}>Versão 1.0.0</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
