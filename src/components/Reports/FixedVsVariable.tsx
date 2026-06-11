import React from 'react';
import { View, Text } from 'react-native';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';

interface FixedVsVariableProps {
  fixedExpenses: number;
  variableExpenses: number;
  totalExpenses: number;
}

export function FixedVsVariable({ fixedExpenses, variableExpenses, totalExpenses }: FixedVsVariableProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const fixedPct = totalExpenses > 0 ? (fixedExpenses / totalExpenses) * 100 : 0;
  const variablePct = totalExpenses > 0 ? (variableExpenses / totalExpenses) * 100 : 0;

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Despesas Fixas vs Variáveis</Text>

      <View style={styles.expenseRow}>
        <View style={styles.expenseRowHeader}>
          <Text style={styles.expenseRowLabel}>Fixas</Text>
          <Text style={styles.expenseRowValue}>
            R$ {fixedExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBarFixed, { width: `${fixedPct}%` }]} />
        </View>
      </View>

      <View style={[styles.expenseRow, { marginBottom: 0 }]}>
        <View style={styles.expenseRowHeader}>
          <Text style={styles.expenseRowLabel}>Variáveis</Text>
          <Text style={styles.expenseRowValue}>
            R$ {variableExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBarVariable, { width: `${variablePct}%` }]} />
        </View>
      </View>
    </View>
  );
}