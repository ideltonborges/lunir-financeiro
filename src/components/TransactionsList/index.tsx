import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Filter } from 'lucide-react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { FilterType, Transaction } from './types';
import { TransactionCard } from './TransactionCard';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { getAllTransactions, removeTransaction } from '../../database/transactionsListService';

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'income', label: 'Receitas' },
  { id: 'expense', label: 'Despesas' },
];

export function TransactionsList() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const db = useSQLiteContext();
  const insets = useSafeAreaInsets();

  const [filter, setFilter] = useState<FilterType>('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const loadTransactions = useCallback(async () => {
    try {
      const data = await getAllTransactions(db, filter);
      setTransactions(data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    }
  }, [db, filter]);

  useFocusEffect(
    useCallback(() => {
      void loadTransactions();
    }, [loadTransactions])
  );

  const handleDeleteConfirm = async () => {
    if (deleteTargetId === null) return;
    try {
      await removeTransaction(db, deleteTargetId);
      setDeleteTargetId(null);
      await loadTransactions();
      Toast.show({
        type: 'success',
        text1: 'Transação excluída',
        text2: 'A transação foi removida com sucesso.',
      });
    } catch (error) {
      setDeleteTargetId(null);
      Toast.show({
        type: 'error',
        text1: 'Erro ao excluir',
        text2: 'Não foi possível remover a transação.',
      });
    }
  };

  const resultLabel =
    transactions.length === 1
      ? '1 transação encontrada'
      : `${transactions.length} transações encontradas`;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
      >
        <Text style={styles.headerTitle}>Transações</Text>

        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[styles.filterButton, filter === f.id && styles.filterButtonActive]}
              onPress={() => setFilter(f.id)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.filterButtonText,
                filter === f.id && styles.filterButtonTextActive,
              ]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <FlatList
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        ListHeaderComponent={
          <Text style={styles.resultCount}>{resultLabel}</Text>
        }
        renderItem={({ item, index }) => (
          <TransactionCard
            transaction={item}
            index={index}
            onDeletePress={(id) => setDeleteTargetId(id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
              <Filter size={32} color="#94a3b8" />
            </View>
            <Text style={styles.emptyText}>Nenhuma transação encontrada</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <DeleteConfirmModal
        visible={deleteTargetId !== null}
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
      />

    </View>
  );
}