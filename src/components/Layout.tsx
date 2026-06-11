import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Home, ArrowLeftRight, FileText, Search, Settings } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Dashboard } from './Dashboard/';
import { TransactionsList } from './TransactionsList/';
import { Reports } from './Reports/';
import { SearchScreen } from './SearchScreen/';
import { SettingsScreen } from './SettingsScreen/index';
import { getStyles } from './styles';
import { useTheme } from '../contexts/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TabId = 'home' | 'transactions' | 'reports' | 'search' | 'settings';

const navItems: { id: TabId; icon: any; label: string }[] = [
  { id: 'home', icon: Home, label: 'Início' },
  { id: 'transactions', icon: ArrowLeftRight, label: 'Transações' },
  { id: 'reports', icon: FileText, label: 'Relatórios' },
  { id: 'search', icon: Search, label: 'Buscar' },
  { id: 'settings', icon: Settings, label: 'Config' },
];

export function Layout() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const iconScales = useRef(navItems.map(() => new Animated.Value(1))).current;

  const handleTabPress = (id: TabId, index: number) => {
    Animated.sequence([
      Animated.timing(iconScales[index], {
        toValue: 0.75,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(iconScales[index], {
        toValue: 1,
        friction: 4,
        tension: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setActiveTab(id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Dashboard
            onAddIncome={() =>
              navigation.navigate('AddTransaction', { initialType: 'income' })
            }
            onAddExpense={() =>
              navigation.navigate('AddTransaction', { initialType: 'expense' })
            }
          />
        );
      case 'transactions':
        return <TransactionsList />;
      case 'reports':
        return <Reports />;
      case 'search':
        return <SearchScreen />;
      case 'settings':
          return <SettingsScreen />;
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        {renderContent()}
      </View>

      <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 6 }]}>
        {navItems.map((item, index) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => handleTabPress(item.id, index)}
              activeOpacity={0.8}
            >
              <Animated.View
                style={[
                  styles.iconPill,
                  isActive && styles.iconPillActive,
                  { transform: [{ scale: iconScales[index] }] },
                ]}
              >
                <Icon size={22} color={isActive ? '#3B82F6' : '#94A3B8'} />
              </Animated.View>

              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}