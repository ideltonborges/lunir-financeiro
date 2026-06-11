import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { TypeFilter, Transaction } from './types';
import { SearchResultCard } from './SearchResultCard';
import { getAllCategories, searchTransactions } from '../../database/searchService';

const TYPE_FILTERS: { id: TypeFilter; label: string }[] = [
  { id: 'all',     label: 'Todas'    },
  { id: 'income',  label: 'Receitas' },
  { id: 'expense', label: 'Despesas' },
];

export function SearchScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const db = useSQLiteContext();
  const insets = useSafeAreaInsets();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [results, setResults] = useState<Transaction[]>([]);

  const filtersFadeAnim = useRef(new Animated.Value(0)).current;
  const filtersSlideAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(filtersFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(filtersSlideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      const cats = await getAllCategories(db);
      setCategories(cats);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }, [db]);

  const runSearch = useCallback(async () => {
    try {
      const data = await searchTransactions(db, searchTerm, typeFilter, selectedCategory);
      setResults(data);
    } catch (error) {
      console.error('Erro na busca:', error);
    }
  }, [db, searchTerm, typeFilter, selectedCategory]);

  useFocusEffect(
    useCallback(() => {
      void loadCategories();
      void runSearch();
    }, [loadCategories, runSearch])
  );

  useEffect(() => {
    void runSearch();
  }, [searchTerm, typeFilter, selectedCategory]);

  const hasActiveFilters =
    searchTerm.trim() !== '' || typeFilter !== 'all' || selectedCategory !== null;

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setSelectedCategory(null);
  };

  const resultsLabel =
    results.length === 1
      ? '1 resultado encontrado'
      : `${results.length} resultados encontrados`;

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
      >
        <Text style={styles.headerTitle}>Buscar</Text>

        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="rgba(255,255,255,0.6)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar transações..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchTerm}
            onChangeText={setSearchTerm}
            returnKeyType="search"
            autoCorrect={false}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchTerm('')}
            >
              <X size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={{
            opacity: filtersFadeAnim,
            transform: [{ translateY: filtersSlideAnim }],
          }}
        >
          <View style={styles.filterSection}>
            <View style={styles.filterHeaderRow}>
              <Text style={styles.filterLabel}>Tipo</Text>
              {hasActiveFilters && (
                <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
                  <X size={12} color="#3B82F6" />
                  <Text style={styles.clearFiltersText}>Limpar filtros</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.typeRow}>
              {TYPE_FILTERS.map((f) => {
                const isActive = typeFilter === f.id;
                const activeStyle =
                  f.id === 'income'
                    ? styles.typeButtonIncome
                    : f.id === 'expense'
                    ? styles.typeButtonExpense
                    : styles.typeButtonAll;

                return (
                  <TouchableOpacity
                    key={f.id}
                    style={[styles.typeButton, isActive && activeStyle]}
                    onPress={() => setTypeFilter(f.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.typeButtonText, isActive && styles.typeButtonTextActive]}>
                      {f.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {categories.length > 0 && (
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Categorias</Text>
              <View style={{ height: 10 }} />
              <View style={styles.categoryRow}>
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                      onPress={() => setSelectedCategory(isActive ? null : cat)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </Animated.View>

        <View>
          <Text style={styles.resultsLabel}>{resultsLabel}</Text>

          {results.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconWrapper}>
                <SearchIcon size={32} color="#94a3b8" />
              </View>
              <Text style={styles.emptyText}>Nenhuma transação encontrada</Text>
              <Text style={styles.emptySubText}>Tente ajustar os filtros de busca</Text>
            </View>
          ) : (
            results.map((t, index) => (
              <SearchResultCard key={t.id} transaction={t} index={index} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}