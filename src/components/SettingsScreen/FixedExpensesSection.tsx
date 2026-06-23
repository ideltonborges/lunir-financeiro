import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AlertCircle, CalendarDays, Check, Pencil, Power, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { RecurringTransaction, RecurringTransactionInput } from '../../database/recurringService';
import { parseCurrencyInput } from '../../utils/currency';

type FixedExpensesSectionProps = {
  expenses: RecurringTransaction[];
  onSave: (id: number, input: RecurringTransactionInput) => Promise<void>;
  onToggle: (id: number, isActive: boolean) => Promise<void>;
};

type EditState = {
  amount: string;
  description: string;
  category: string;
  day: string;
  isActive: boolean;
};

function toEditState(expense: RecurringTransaction): EditState {
  return {
    amount: expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
    description: expense.description,
    category: expense.category,
    day: expense.day.toString(),
    isActive: expense.is_active === 1,
  };
}

export function FixedExpensesSection({ expenses, onSave, onToggle }: FixedExpensesSectionProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startEditing = (expense: RecurringTransaction) => {
    setEditingId(expense.id);
    setEditState(toEditState(expense));
    setError(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditState(null);
    setError(null);
  };

  const saveEditing = async (id: number) => {
    if (!editState) return;

    const amount = parseCurrencyInput(editState.amount);
    const day = parseInt(editState.day);

    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Informe um valor válido.');
      return;
    }

    if (!editState.description.trim() || !editState.category.trim()) {
      setError('Preencha descrição e categoria.');
      return;
    }

    if (!day || day < 1 || day > 31) {
      setError('Informe um dia entre 1 e 31.');
      return;
    }

    await onSave(id, {
      amount,
      description: editState.description,
      category: editState.category,
      day,
      isActive: editState.isActive,
    });
    cancelEditing();
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardTitleRow}>
        <View style={styles.cardIconWrapper}>
          <CalendarDays size={20} color="#3B82F6" />
        </View>
        <View>
          <Text style={styles.cardTitle}>Gastos fixos</Text>
          <Text style={styles.cardSubtitle}>Gerencie despesas lançadas todo mês</Text>
        </View>
      </View>

      {expenses.length === 0 ? (
        <Text style={styles.emptyFixedText}>Nenhuma despesa fixa cadastrada.</Text>
      ) : (
        expenses.map((expense) => {
          const isEditing = editingId === expense.id && editState;
          const isActive = expense.is_active === 1;

          return (
            <View key={expense.id} style={styles.fixedExpenseItem}>
              {isEditing ? (
                <View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Descrição</Text>
                    <TextInput
                      style={styles.input}
                      value={editState.description}
                      onChangeText={(value) => setEditState({ ...editState, description: value })}
                      placeholderTextColor="#94a3b8"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Categoria</Text>
                    <TextInput
                      style={styles.input}
                      value={editState.category}
                      onChangeText={(value) => setEditState({ ...editState, category: value })}
                      placeholderTextColor="#94a3b8"
                    />
                  </View>

                  <View style={styles.fixedEditRow}>
                    <View style={styles.fixedEditColumn}>
                      <Text style={styles.inputLabel}>Valor</Text>
                      <View style={styles.inputRow}>
                        <Text style={styles.inputPrefix}>R$</Text>
                        <TextInput
                          style={styles.inputInline}
                          value={editState.amount}
                          keyboardType="numeric"
                          onChangeText={(value) => setEditState({ ...editState, amount: value })}
                          placeholderTextColor="#94a3b8"
                        />
                      </View>
                    </View>

                    <View style={styles.fixedEditColumn}>
                      <Text style={styles.inputLabel}>Dia</Text>
                      <TextInput
                        style={styles.input}
                        value={editState.day}
                        keyboardType="numeric"
                        onChangeText={(value) => setEditState({ ...editState, day: value })}
                        placeholderTextColor="#94a3b8"
                      />
                    </View>
                  </View>

                  {error && (
                    <View style={styles.errorRow}>
                      <AlertCircle size={12} color="#ef4444" />
                      <Text style={styles.errorText}>{error}</Text>
                    </View>
                  )}

                  <View style={styles.fixedActions}>
                    <TouchableOpacity style={styles.fixedSecondaryButton} onPress={cancelEditing}>
                      <X size={16} color={colors.foreground} />
                      <Text style={styles.fixedSecondaryText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fixedPrimaryButton} onPress={() => saveEditing(expense.id)}>
                      <LinearGradient
                        colors={[colors.gradientStart, colors.gradientEnd]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.fixedPrimaryGradient}
                      >
                        <Check size={16} color="#fff" />
                        <Text style={styles.fixedPrimaryText}>Salvar</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.fixedHeader}>
                    <View style={styles.fixedInfo}>
                      <Text style={styles.fixedTitle}>{expense.description}</Text>
                      <Text style={styles.fixedMeta}>
                        Dia {expense.day} - {expense.category}
                      </Text>
                    </View>
                    <Text style={styles.fixedAmount}>
                      R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Text>
                  </View>

                  <View style={styles.fixedActions}>
                    <TouchableOpacity style={styles.fixedSecondaryButton} onPress={() => startEditing(expense)}>
                      <Pencil size={16} color={colors.foreground} />
                      <Text style={styles.fixedSecondaryText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.fixedSecondaryButton, !isActive && styles.fixedDisabledButton]}
                      onPress={() => onToggle(expense.id, !isActive)}
                    >
                      <Power size={16} color={isActive ? '#ef4444' : '#10B981'} />
                      <Text style={styles.fixedSecondaryText}>{isActive ? 'Desativar' : 'Ativar'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          );
        })
      )}
    </View>
  );
}
