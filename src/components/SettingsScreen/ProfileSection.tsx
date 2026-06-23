import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import { UserSettings, ProfileFormData } from './types';
import { isValidCurrencyInput, parseCurrencyInput } from '../../utils/currency';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Mínimo de 2 caracteres')
    .max(50, 'Máximo de 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Apenas letras'),
  salary: z
    .string()
    .refine(
      (val) => !val || (isValidCurrencyInput(val) && parseCurrencyInput(val) >= 0 && parseCurrencyInput(val) <= 999999.99),
      'Valor entre R$ 0 e R$ 999.999,99'
    ),
  salaryDate: z
    .string()
    .refine(
      (val) => !val || (parseInt(val) >= 1 && parseInt(val) <= 31),
      'Dia entre 1 e 31'
    ),
});

interface ProfileSectionProps {
  settings: UserSettings;
  onSave: (data: ProfileFormData) => Promise<void>;
}

export function ProfileSection({ settings, onSave }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const { control, handleSubmit, reset, formState: { errors, isValid } } =
    useForm<ProfileFormData>({
      resolver: zodResolver(profileSchema),
      mode: 'onChange',
      defaultValues: {
        name: settings.name,
        salary: settings.base_salary?.toString() ?? '',
        salaryDate: settings.salary_date?.toString() ?? '',
      },
    });

  const handleCancel = () => {
    setIsEditing(false);
    reset({
      name: settings.name,
      salary: settings.base_salary?.toString() ?? '',
      salaryDate: settings.salary_date?.toString() ?? '',
    });
  };

  const handleSave = async (data: ProfileFormData) => {
    await onSave(data);
    setIsEditing(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <View style={styles.cardTitleRow}>
          <View style={styles.cardIconWrapper}>
            <User size={20} color="#3B82F6" />
          </View>
          <Text style={styles.cardTitle}>Perfil</Text>
        </View>
        <TouchableOpacity onPress={isEditing ? handleCancel : () => setIsEditing(true)}>
          <Text style={styles.editButton}>{isEditing ? 'Cancelar' : 'Editar'}</Text>
        </TouchableOpacity>
      </View>

      {isEditing ? (
        <View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  placeholder="Seu nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor="#94a3b8"
                />
              )}
            />
            {errors.name && (
              <View style={styles.errorRow}>
                <AlertCircle size={12} color="#ef4444" />
                <Text style={styles.errorText}>{errors.name.message}</Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Salário mensal (opcional)</Text>
            <View style={[styles.inputRow, errors.salary && styles.inputError]}>
              <Text style={styles.inputPrefix}>R$</Text>
              <Controller
                control={control}
                name="salary"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputInline}
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
            {errors.salary && (
              <View style={styles.errorRow}>
                <AlertCircle size={12} color="#ef4444" />
                <Text style={styles.errorText}>{errors.salary.message}</Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Dia de pagamento (opcional)</Text>
            <Controller
              control={control}
              name="salaryDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.salaryDate && styles.inputError]}
                  placeholder="Ex: 5"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor="#94a3b8"
                />
              )}
            />
            {errors.salaryDate && (
              <View style={styles.errorRow}>
                <AlertCircle size={12} color="#ef4444" />
                <Text style={styles.errorText}>{errors.salaryDate.message}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
            onPress={handleSubmit(handleSave)}
            disabled={!isValid}
          >
            <LinearGradient
              colors={['#3B82F6', '#10B981']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.saveButtonGradient}
            >
              <Text style={styles.saveButtonText}>Salvar alterações</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.profileField}>
            <Text style={styles.profileLabel}>Nome</Text>
            <Text style={styles.profileValue}>{settings.name}</Text>
          </View>

          {settings.base_salary != null && (
            <View style={styles.profileField}>
              <Text style={styles.profileLabel}>Salário mensal</Text>
              <Text style={styles.profileValue}>
                R$ {settings.base_salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          )}

          {settings.salary_date != null && (
            <View style={styles.profileFieldLast}>
              <Text style={styles.profileLabel}>Dia de pagamento</Text>
              <Text style={styles.profileValue}>Dia {settings.salary_date}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
