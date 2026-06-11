import React from 'react';
import { View, Text } from 'react-native';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { CategoryData } from './types';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

interface CategoryChartProps {
  categoryData: CategoryData[];
}

export function CategoryChart({ categoryData }: CategoryChartProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  
  if (categoryData.length === 0) {
    return (
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Top 5 Categorias</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Sem despesas no período</Text>
        </View>
      </View>
    );
  }

  const maxAmount = categoryData[0].amount;

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Top 5 Categorias</Text>

      {categoryData.map((item, index) => {
        const pct = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;
        const color = COLORS[index % COLORS.length];

        return (
          <View key={item.category} style={styles.categoryItem}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{item.category}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.categoryPercentage}>
                  {maxAmount > 0
                    ? ((item.amount / categoryData.reduce((s, c) => s + c.amount, 0)) * 100).toFixed(0)
                    : 0}%
                </Text>
                <Text style={styles.categoryValue}>
                  R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </View>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressBarFixed,
                  { width: `${pct}%`, backgroundColor: color },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}