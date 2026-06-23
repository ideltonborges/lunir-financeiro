import React, { useState, useEffect } from 'react';
import { Splash } from './src/components/Splash';
import { Onboarding } from './src/components/Onboarding/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_700Bold, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { initializeDatabase } from './src/database/initDatabase';
import { checkUserCompletedOnboarding } from './src/database/onboardingService';
import Toast from 'react-native-toast-message';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { processRecurringTransactions } from './src/database/recurringService';
import { syncNotifications } from './src/database/notificationService';

function AppContent() {
  const db = useSQLiteContext();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function setup() {
      try {
        const completed = await checkUserCompletedOnboarding(db);
        setHasCompletedOnboarding(completed);
        if (completed) {
          try {
            await processRecurringTransactions(db);
            await syncNotifications(db);
          } catch (automationError) {
            console.error("Erro nas rotinas automáticas:", automationError);
          }
        }
      } catch (error) {
        console.error("Erro na inicialização:", error);
      } finally {
        setIsReady(true);
      }
    }
    setup();
  }, []);

  if (!isReady) return null;

  if (isSplashVisible) {
    return <Splash onComplete={() => setIsSplashVisible(false)} />;
  }

  return !hasCompletedOnboarding ? (
    <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />
  ) : (
    <AppNavigator />
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_700Bold,
    Manrope_600SemiBold
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SQLiteProvider databaseName="lunir.db" onInit={initializeDatabase}>
          <AppContent />
        </SQLiteProvider>
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
