import React from 'react';
import { View, Text } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
}

export function SummaryCards({ totalIncome, totalExpenses }: SummaryCardsProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  
  return (
    <View style={styles.summaryRow}>
      <View style={[styles.summaryCard, styles.summaryCardIncome]}>
        <View style={styles.summaryIconRow}>
          <View style={[styles.summaryIconWrapper, { backgroundColor: 'rgba(16,185,129,0.15)' }]}>
            <TrendingUp size={16} color="#10B981" />
          </View>
          <Text style={styles.summaryLabel}>Receitas</Text>
        </View>
        <Text style={styles.summaryValue}>
          R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
      </View>

      <View style={[styles.summaryCard, styles.summaryCardExpense]}>
        <View style={styles.summaryIconRow}>
          <View style={[styles.summaryIconWrapper, { backgroundColor: 'rgba(59,130,246,0.15)' }]}>
            <TrendingDown size={16} color="#3B82F6" />
          </View>
          <Text style={styles.summaryLabel}>Despesas</Text>
        </View>
        <Text style={styles.summaryValue}>
          R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </View>
  );
}