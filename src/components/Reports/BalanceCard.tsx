import React from 'react';
import { View, Text } from 'react-native';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';

interface BalanceCardProps {
  balance: number;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const isPositive = balance >= 0;

  return (
    <View style={[
      styles.balanceCard,
      isPositive ? styles.balanceCardPositive : styles.balanceCardNegative,
    ]}>
      <Text style={styles.balanceLabel}>Saldo do Período</Text>
      <Text style={[styles.balanceValue, isPositive ? styles.balancePositive : styles.balanceNegative]}>
        {!isPositive && '-'} R$ {Math.abs(balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </Text>
    </View>
  );
}