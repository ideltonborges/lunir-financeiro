import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Animated, Dimensions, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Wallet, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { DashboardProps, DashboardData } from './types';
import {
  getUserSettings,
  getRecentTransactions,
  getLast7DaysTransactions,
  getTotals,
} from '../../database/dashboardService';
import { TransactionCard } from '../TransactionsList/TransactionCard';

const { width } = Dimensions.get('window');

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function Dashboard({ onAddIncome, onAddExpense }: DashboardProps) {
  const db = useSQLiteContext();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    userName: '',
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    recentTransactions: [],
    last7DaysTransactions: [],
  });

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [settings, totals, recent, last7] = await Promise.all([
        getUserSettings(db),
        getTotals(db),
        getRecentTransactions(db),
        getLast7DaysTransactions(db),
      ]);

      setData({
        userName: settings?.name ?? 'Usuário',
        totalIncome: totals.totalIncome,
        totalExpenses: totals.totalExpenses,
        balance: totals.totalIncome - totals.totalExpenses,
        recentTransactions: recent,
        last7DaysTransactions: last7,
      });
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      void loadData();
    }, [loadData])
  );

  useEffect(() => {
    if (!isLoading) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start();
    }
  }, [isLoading]);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const chartLabels = last7Days.map(d => d.substring(8, 10) + '/' + d.substring(5, 7));

  const incomeData = last7Days.map(date =>
    data.last7DaysTransactions
      .filter(t => t.date === date && t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const expenseData = last7Days.map(date =>
    data.last7DaysTransactions
      .filter(t => t.date === date && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const hasChartData = [...incomeData, ...expenseData].some(v => v > 0);

  const categoryTotals = data.recentTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieChartData = Object.keys(categoryTotals).map((key, index) => ({
    name: key,
    population: categoryTotals[key],
    color: COLORS[index % COLORS.length],
    legendFontColor: '#64748b',
    legendFontSize: 12,
  }));

  const chartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.card,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    useShadowColorFromDataset: false,
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer} >
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}> Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }
      }
    >
      < LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header} >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.appName}> Lunir </Text>
          < Text style={styles.greeting} > Olá, {data.userName}! Bem - vindo de volta 👋</Text>
        </Animated.View>

        < Animated.View style={[styles.balanceCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]} >
          <View style={styles.balanceHeader}>
            <Wallet color="rgba(255,255,255,0.8)" size={20} />
            <Text style={styles.balanceLabel}> Saldo Total </Text>
          </View>
          < Text style={styles.balanceValue} >
            R$ {data.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
          < View style={styles.balanceRow} >
            <View>
              <View style={styles.balanceSubHeader}>
                <ArrowUpRight color="rgba(255,255,255,0.8)" size={16} />
                <Text style={styles.balanceSubLabel}> Receitas </Text>
              </View>
              < Text style={styles.incomeValue} >
                R$ {data.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Text>
            </View>
            < View >
              <View style={styles.balanceSubHeader}>
                <ArrowDownRight color="rgba(255,255,255,0.8)" size={16} />
                <Text style={styles.balanceSubLabel}> Despesas </Text>
              </View>
              < Text style={styles.expenseValue} >
                R$ {data.totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      < View style={styles.content} >

        < Animated.View style={[styles.quickActions, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]} >
          <TouchableOpacity style={styles.actionCard} onPress={onAddIncome} >
            <View style={styles.actionHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                <TrendingUp color="#10B981" size={24} />
              </View>
              < Plus color="#94A3B8" size={20} />
            </View>
            < Text style={styles.actionText} > Nova Receita </Text>
          </TouchableOpacity>

          < TouchableOpacity style={styles.actionCard} onPress={onAddExpense} >
            <View style={styles.actionHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                <TrendingDown color="#EF4444" size={24} />
              </View>
              < Plus color="#94A3B8" size={20} />
            </View>
            < Text style={styles.actionText} > Nova Despesa </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.chartContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.sectionTitle}> Últimos 7 dias </Text>
          {
            hasChartData ? (
              <LineChart
                data={{
                  labels: chartLabels,
                  datasets: [
                    { data: incomeData, color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, strokeWidth: 2 },
                    { data: expenseData, color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, strokeWidth: 2 },
                  ],
                  legend: ['Receitas', 'Despesas'],
                }
                }
                width={width - 80}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
              />
            ) : (
              <View style={styles.emptyChart} >
                <Text style={styles.emptyChartText}> Nenhuma movimentação nos últimos 7 dias </Text>
              </View>
            )}
        </Animated.View>
        {
          pieChartData.length > 0 && (
            <Animated.View style={[styles.chartContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <Text style={styles.sectionTitle}> Gastos por Categoria </Text>
              < PieChart
                data={pieChartData}
                width={width - 80
                }
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </Animated.View>
          )}

        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}> Transações Recentes </Text>
            < TouchableOpacity >
              <Text style={styles.seeAllText}> Ver todas </Text>
            </TouchableOpacity>
          </View>

          {
            data.recentTransactions.length === 0 ? (
              <View style={styles.emptyState} >
                <Text style={styles.emptyStateText}> Nenhuma transação ainda </Text>
                < Text style={styles.emptyStateSubText} > Adicione sua primeira receita ou despesa </Text>
              </View>
            ) : (
              data.recentTransactions.map((t, index) => (
                <TransactionCard
                  key={t.id}
                  transaction={t}
                  index={index}
                />
              ))
            )}
        </View>
      </View>
    </ScrollView>
  );
}
