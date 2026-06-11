import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { expenseCategories, incomeCategories, TransactionFormData, transactionSchema } from './data';
import { useSQLiteContext } from 'expo-sqlite';
import { saveTransaction } from '../../database/transactionService';
import Toast from 'react-native-toast-message';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type RouteProps = RouteProp<RootStackParamList, 'AddTransaction'>;

export function AddTransaction() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const initialType = route.params?.initialType ?? 'expense';

  const db = useSQLiteContext();
  const insets = useSafeAreaInsets();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const headerAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;
  const formSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(formAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(formSlide, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const { control, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<TransactionFormData>({
      resolver: zodResolver(transactionSchema),
      mode: 'onChange',
      defaultValues: {
        type: initialType,
        amount: '',
        description: '',
        category: '',
        expenseType: 'variable',
        date: new Date().toISOString().split('T')[0],
      },
    });

  const type = watch('type');
  const category = watch('category');
  const expenseType = watch('expenseType');
  const categories = type === 'income' ? incomeCategories : expenseCategories;

  const onSubmit = async (data: TransactionFormData) => {
    try {
      await saveTransaction(db, data);
      Toast.show({
        type: 'success',
        text1: 'Transação salva!',
        text2: `${data.type === 'income' ? 'Receita' : 'Despesa'} de R$ ${parseFloat(data.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} registrada.`,
      });
      console.log('Transação salva com sucesso!');
      navigation.goBack()
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao salvar',
        text2: 'Não foi possível registrar a transação.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: headerAnim }}>

        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 16 }]}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nova Transação</Text>
          </View>

          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}
              onPress={() => {
                setValue('type', 'income', { shouldValidate: true });
                setValue('category', '');
              }}
            >
              <Text style={[styles.typeButtonText, type === 'income' && styles.typeButtonTextActive]}>
                Receita
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}
              onPress={() => {
                setValue('type', 'expense', { shouldValidate: true });
                setValue('category', '');
              }}
            >
              <Text style={[styles.typeButtonText, type === 'expense' && styles.typeButtonTextActive]}>
                Despesa
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        style={styles.form}
        contentContainerStyle={[styles.formContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: formAnim, transform: [{ translateY: formSlide }] }}>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Valor *</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>R$</Text>
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.amountInput, errors.amount && styles.inputError]}
                    placeholder="0,00"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor="#94a3b8"
                  />
                )}
              />
            </View>
            {errors.amount && <ErrorMessage message={errors.amount.message!} />}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição *</Text>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.description && styles.inputError]}
                  placeholder="Ex: Salário mensal"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor="#94a3b8"
                />
              )}
            />
            {errors.description && <ErrorMessage message={errors.description.message!} />}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoria *</Text>
            <View style={styles.grid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryCard, category === cat && styles.categoryCardActive]}
                  onPress={() => setValue('category', cat, { shouldValidate: true })}
                >
                  {category === cat && (
                    <View style={styles.checkBadge}>
                      <Check size={10} color="#fff" />
                    </View>
                  )}
                  <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.category && <ErrorMessage message={errors.category.message!} />}
          </View>

          {type === 'expense' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo de Despesa *</Text>
              <View style={styles.expenseTypeRow}>
                <TouchableOpacity
                  style={[styles.expenseTypeButton, expenseType === 'fixed' && styles.expenseTypeFixed]}
                  onPress={() => setValue('expenseType', 'fixed', { shouldValidate: true })}
                >
                  <Text style={[styles.expenseTypeText, expenseType === 'fixed' && styles.expenseTypeTextActive]}>
                    Fixo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.expenseTypeButton, expenseType === 'variable' && styles.expenseTypeVariable]}
                  onPress={() => setValue('expenseType', 'variable', { shouldValidate: true })}
                >
                  <Text style={[styles.expenseTypeText, expenseType === 'variable' && styles.expenseTypeTextActive]}>
                    Variável
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data *</Text>
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={{ fontSize: 16, color: value ? '#0f172a' : '#94a3b8', fontFamily: 'Manrope_400Regular' }}>
                      {value
                        ? new Date(value + 'T00:00:00').toLocaleDateString('pt-BR')
                        : 'Selecione uma data'}
                    </Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={value ? new Date(value + 'T00:00:00') : new Date()}
                      mode="date"
                      display="default"
                      locale="pt-BR"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (event.type === 'set' && selectedDate) {
                          onChange(selectedDate.toISOString().split('T')[0]);
                        }
                      }}
                    />
                  )}
                </>
              )}
            />
            {errors.date && <ErrorMessage message={errors.date.message!} />}
          </View>

          <TouchableOpacity
            style={{ borderRadius: 16, overflow: 'hidden', marginTop: 8 }}
            onPress={handleSubmit(onSubmit)}
          >
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Adicionar Transação</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

function ErrorMessage({ message }: { message: string }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.errorRow}>
      <AlertCircle size={14} color="#ef4444" />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}