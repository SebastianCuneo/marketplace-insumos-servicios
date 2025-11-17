import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../shared/contexts/AuthContext';
import { ROLES } from '../shared/constants/roles';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import PublicarServicioScreen from '../screens/PublicarServicioScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2D7CF6',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ 
          title: user?.rol === ROLES.PROVEEDOR_INSUMOS ? 'Catálogo' : 'Servicios',
          headerShown: true
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ 
          title: 'Perfil',
          headerShown: true
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PublicarServicio" 
          component={PublicarServicioScreen}
          options={{ title: 'Publicar Servicio' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

