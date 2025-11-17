import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/shared/contexts/AppProvider';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <PaperProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </PaperProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
