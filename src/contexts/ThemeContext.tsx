import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

type ThemeContextData = {
  theme: Theme;
  toggleTheme: () => void;
  setThemePreference: (theme: Theme) => void;
  colors: typeof lightColors;
};

const lightColors = {
  background: '#f8fafc',
  card: '#ffffff',
  foreground: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  inputBg: '#f8fafc',
  gradientStart: '#3B82F6',
  gradientEnd: '#10B981',
};

const darkColors: typeof lightColors = {
  background: '#0a0a0a',
  card: '#1a1a1a',
  foreground: '#f1f5f9',
  muted: '#94a3b8',
  border: 'rgba(255,255,255,0.1)',
  inputBg: '#1e1e1e',
  gradientStart: '#1e40af',
  gradientEnd: '#047857',
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    AsyncStorage.getItem('lunir-theme').then((saved) => {
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
      }
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('lunir-theme', next);
      return next;
    });
  }, []);

  const setThemePreference = useCallback((nextTheme: Theme) => {
    setTheme(nextTheme);
    AsyncStorage.setItem('lunir-theme', nextTheme);
  }, []);

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemePreference, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
