import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { Controller } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Moon, Sun, Check, AlertCircle } from 'lucide-react-native';
import { styles } from './styles';
import { Shadow } from 'react-native-shadow-2';

interface SetupFormProps {
  control: any;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  errors: any;
  isValid: boolean;
  salary: string | undefined;
  selectedTheme: string | undefined;
  setValue: any;
}

export const SetupForm = ({ control, handleSubmit, onSubmit, errors, isValid, salary, selectedTheme, setValue }: SetupFormProps) => {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-20)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] }}>
          <LinearGradient colors={['#3B82F6', '#10B981']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.header}>
            <Text style={styles.headerTitle}>Vamos começar!</Text>
            <Text style={styles.headerSubtitle}>Configure sua conta em segundos</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={{ opacity: formOpacity, transform: [{ translateY: formTranslateY }] }}>
          <View style={{ marginHorizontal: 16, marginTop: -20, marginBottom: 24 }}>
            <Shadow
              distance={15}
              startColor="rgba(0, 0, 0, 0.05)"
              offset={[0, 4]}
              style={{ width: '100%', borderRadius: 24 }}
            >
              <View style={styles.formContent}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Qual é o seu nome? <Text style={styles.required}>*</Text></Text>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput style={[styles.input, errors.name && styles.inputError]} placeholder="Digite seu nome" onBlur={onBlur} onChangeText={onChange} value={value} />
                    )}
                  />
                  {errors.name && (
                    <View style={styles.errorRow}>
                      <AlertCircle size={14} color="#ef4444" />
                      <Text style={styles.errorText}>{errors.name.message}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Qual é o seu salário mensal? <Text style={styles.optional}>(opcional)</Text></Text>
                  <Controller
                    control={control}
                    name="salary"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput style={[styles.input, errors.salary && styles.inputError]} placeholder="R$ 0,00" keyboardType="numeric" onBlur={onBlur} onChangeText={onChange} value={value} />
                    )}
                  />
                  {errors.salary && (
                    <View style={styles.errorRow}>
                      <AlertCircle size={14} color="#ef4444" />
                      <Text style={styles.errorText}>{errors.salary.message}</Text>
                    </View>
                  )}
                </View>

                {salary && parseFloat(salary) > 0 ? (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Qual dia você recebe? <Text style={styles.optional}>(opcional)</Text></Text>
                    <View style={styles.pickerContainer}>
                      <Controller
                        control={control}
                        name="salaryDate"
                        render={({ field: { onChange, value } }) => (
                          <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
                            <Picker.Item label="Selecione o dia" value="" />
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                              <Picker.Item key={day} label={`Dia ${day}`} value={day.toString()} />
                            ))}
                          </Picker>
                        )}
                      />
                    </View>
                  </View>
                ) : null}

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Escolha seu tema <Text style={styles.optional}>(opcional)</Text></Text>
                  <View style={styles.themeRow}>
                    <TouchableOpacity style={[styles.themeCard, selectedTheme === 'light' && styles.themeCardActive]} onPress={() => setValue('theme', 'light')}>
                      {selectedTheme === 'light' && <View style={styles.checkBadge}><Check size={12} color="#fff" /></View>}
                      <Sun size={32} color={selectedTheme === 'light' ? '#10B981' : '#64748b'} />
                      <Text style={styles.themeText}>Claro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.themeCard, selectedTheme === 'dark' && styles.themeCardActive]} onPress={() => setValue('theme', 'dark')}>
                      {selectedTheme === 'dark' && <View style={styles.checkBadge}><Check size={12} color="#fff" /></View>}
                      <Moon size={32} color={selectedTheme === 'dark' ? '#3b82f6' : '#64748b'} />
                      <Text style={styles.themeText}>Escuro</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Shadow>
          </View>

          <View style={{ marginHorizontal: 16, marginBottom: 40 }}>
            <TouchableOpacity
              style={[!isValid && styles.submitButtonDisabled, { overflow: 'hidden', borderRadius: 16 }]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              <LinearGradient
                colors={['#3B82F6', '#10B981']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ padding: 16, alignItems: 'center' }}
              >
                <Text style={styles.submitButtonText}>Começar a usar</Text>
              </LinearGradient>
            </TouchableOpacity>

            {!isValid && (
              <Text style={{ textAlign: 'center', fontSize: 12, color: '#64748b', marginTop: 12 }}>
                * O nome é obrigatório para continuar
              </Text>
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};