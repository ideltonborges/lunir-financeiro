import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { TrendingUp, TrendingDown, Trash2 } from 'lucide-react-native';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { Transaction } from './types';

interface TransactionCardProps {
  transaction: Transaction;
  index: number;
  onDeletePress?: (id: number) => void;
}

export function TransactionCard({ transaction, index, onDeletePress }: TransactionCardProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const isIncome = transaction.type === 'income';
  const accentColor = isIncome ? '#10B981' : '#3B82F6';

  const formattedDate = new Date(transaction.date + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={[styles.cardAccent, { backgroundColor: accentColor }]} />

      <View style={styles.cardBody}>
        <View style={[styles.iconWrapper, { backgroundColor: isIncome ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)' }]}>
          {isIncome
            ? <TrendingUp size={20} color="#10B981" />
            : <TrendingDown size={20} color="#3B82F6" />
          }
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.cardDescription} numberOfLines={1}>
            {transaction.description}
          </Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{transaction.category}</Text>
            </View>

            {transaction.type === 'expense' && (
              <View style={[
                styles.badge,
                transaction.is_fixed ? styles.badgeFixed : styles.badgeVariable,
              ]}>
                <Text style={[
                  styles.badgeText,
                  transaction.is_fixed ? styles.badgeFixedText : styles.badgeVariableText,
                ]}>
                  {transaction.is_fixed ? 'Fixo' : 'Variável'}
                </Text>
              </View>
            )}

            <Text style={styles.cardDate}>{formattedDate}</Text>
          </View>
        </View>

        <View style={styles.cardRight}>
          <Text style={[styles.cardAmount, { color: isIncome ? '#10B981' : '#EF4444' }]}>
            {isIncome ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>

          {onDeletePress && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDeletePress(transaction.id)}
              activeOpacity={0.7}
            >
              <Trash2 size={16} color="#ef4444" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
}
