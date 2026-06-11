import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Layout } from '../components/Layout';
import { AddTransaction } from '../components/Transaction';

export type RootStackParamList = {
  Main: undefined;
  AddTransaction: { initialType: 'income' | 'expense' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Layout} />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransaction}
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}