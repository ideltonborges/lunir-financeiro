import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';

import { styles } from './styles';
import { slides, setupSchema, SetupFormData } from './data';
import { SlideItem } from './SlideItem';
import { SetupForm } from './SetupForm';
import { saveOnboardingData } from '../../database/onboardingService';
import { useSQLiteContext } from 'expo-sqlite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';


const { width } = Dimensions.get('window');

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const insets = useSafeAreaInsets();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSetup, setShowSetup] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const db = useSQLiteContext();
  const { setThemePreference } = useTheme();

  const { control, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
    mode: 'onChange',
    defaultValues: { name: '', salary: '', salaryDate: '', launchCurrentSalary: false, theme: 'light' },
  });

  const selectedTheme = watch('theme');
  const salary = watch('salary');

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlide + 1, animated: true });
    } else {
      setShowSetup(true);
    }
  };

  const onSubmit = async (data: SetupFormData) => {
    console.log('Dados salvos (pronto para o SQLite!):', data);
    try {
      await saveOnboardingData(db, data);
      setThemePreference(data.theme || 'light');
      console.log('Dados salvos e banco atualizado!');

      onComplete();
    } catch (error) {
      console.error('Erro ao salvar os dados do onboarding:', error);
    }
  };

  if (showSetup) {
    return (
      <SetupForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isValid={isValid}
        salary={salary}
        selectedTheme={selectedTheme}
        setValue={setValue}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentSlide(index);
        }}
        renderItem={({ item, index }) => <SlideItem item={item} index={index} currentSlide={currentSlide} />}
        keyExtractor={(item) => item.id}
      />

      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View key={index} style={[styles.dot, currentSlide === index && styles.dotActive]} />
          ))}
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.skipButton} onPress={() => setShowSetup(true)}>
            <Text style={styles.skipButtonText}>Pular</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <LinearGradient colors={['#3B82F6', '#10B981']} style={styles.nextButtonGradient} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
              <Text style={styles.nextButtonText}>
                {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
              </Text>
              <ArrowRight size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
