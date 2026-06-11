import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { MonthlyData } from './types';

const { width } = Dimensions.get('window');

interface MonthlyChartProps {
  monthlyData: MonthlyData[];
}

export function MonthlyChart({ monthlyData }: MonthlyChartProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const hasData = monthlyData.some((m) => m.income > 0 || m.expense > 0);

  if (!hasData) {
    return (
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Evolução Anual</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Sem movimentações este ano</Text>
        </View>
      </View>
    );
  }

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Evolução Anual</Text>

      <LineChart
        data={{
          labels: monthlyData.map((m) => m.month),
          datasets: [
            {
              data: monthlyData.map((m) => m.income),
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: monthlyData.map((m) => m.expense),
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={width - 80}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
        withDots={false}
      />

      <View style={styles.chartLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Receitas</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
          <Text style={styles.legendText}>Despesas</Text>
        </View>
      </View>
    </View>
  );
}