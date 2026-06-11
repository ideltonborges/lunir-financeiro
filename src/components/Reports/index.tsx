import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef, useEffect } from 'react';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { PeriodType, ReportData } from './types';
import { SummaryCards } from './SummaryCards';
import { BalanceCard } from './BalanceCard';
import { FixedVsVariable } from './FixedVsVariable';
import { CategoryChart } from './CategoryChart';
import { MonthlyChart } from './MonthlyChart';
import { getReportData } from '../../database/reportsService';

const PERIODS: { id: PeriodType; label: string }[] = [
  { id: 'day', label: 'Hoje' },
  { id: 'week', label: 'Semana' },
  { id: 'month', label: 'Mês' },
  { id: 'year', label: 'Ano' },
];

export function Reports() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const db = useSQLiteContext();
  const insets = useSafeAreaInsets();

  const [period, setPeriod] = useState<PeriodType>('month');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ReportData>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    fixedExpenses: 0,
    variableExpenses: 0,
    categoryData: [],
    monthlyData: [],
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      fadeAnim.setValue(0);
      slideAnim.setValue(16);
      const result = await getReportData(db, period);
      setData(result);
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    } finally {
      setIsLoading(false);
    }
  }, [db, period]);

  useFocusEffect(
    useCallback(() => {
      void loadData();
    }, [loadData])
  );

  useEffect(() => {
    if (!isLoading) {
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
  }, [isLoading]);

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
      >
        <Text style={styles.headerTitle}>Relatórios</Text>

        <View style={styles.periodRow}>
          {PERIODS.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[styles.periodButton, period === p.id && styles.periodButtonActive]}
              onPress={() => setPeriod(p.id)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.periodButtonText,
                period === p.id && styles.periodButtonTextActive,
              ]}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : (
        <Animated.ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
          showsVerticalScrollIndicator={false}
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <SummaryCards
            totalIncome={data.totalIncome}
            totalExpenses={data.totalExpenses}
          />

          <BalanceCard balance={data.balance} />

          <FixedVsVariable
            fixedExpenses={data.fixedExpenses}
            variableExpenses={data.variableExpenses}
            totalExpenses={data.totalExpenses}
          />

          <CategoryChart categoryData={data.categoryData} />

          {period === 'year' && (
            <MonthlyChart monthlyData={data.monthlyData} />
          )}
        </Animated.ScrollView>
      )}
    </View>
  );
}