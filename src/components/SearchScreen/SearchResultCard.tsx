import React, { useRef, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { Transaction } from './types';

interface SearchResultCardProps {
  transaction: Transaction;
  index: number;
}

export function SearchResultCard({ transaction, index }: SearchResultCardProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 280,
        delay: index * 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 280,
        delay: index * 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const isIncome = transaction.type === 'income';

  const formattedDate = new Date(transaction.date + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
      ]}
    >
      <View style={styles.cardLeft}>
        <View style={[
          styles.iconWrapper,
          { backgroundColor: isIncome ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)' },
        ]}>
          {isIncome
            ? <TrendingUp size={20} color="#10B981" />
            : <TrendingDown size={20} color="#3B82F6" />
          }
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardDesc} numberOfLines={1}>
            {transaction.description}
          </Text>
          <View style={styles.cardMeta}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{transaction.category}</Text>
            </View>
            <Text style={styles.cardDate}>{formattedDate}</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.cardAmount, { color: isIncome ? '#10B981' : '#EF4444' }]}>
        {isIncome ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </Text>
    </Animated.View>
  );
}