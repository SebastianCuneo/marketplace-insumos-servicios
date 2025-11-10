import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth, ROLES } from '@marketplace/shared';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import PublishServiceScreen from '../screens/PublishServiceScreen';
import MyQuotesScreen from '../screens/MyQuotesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CatalogScreen from '../screens/CatalogScreen';

export type TabParamList = {
  Home: undefined;
  Publish: undefined;
  Quotes: undefined;
  Catalog: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabNavigator() {
  const { user } = useAuth();

  if (user?.rol === ROLES.SOLICITANTE) {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2D7CF6',
          tabBarInactiveTintColor: '#666',
          headerShown: true,
          headerStyle: { backgroundColor: '#2D7CF6' },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Mis Servicios',
            tabBarLabel: 'Servicios',
            tabBarIcon: ({ color, size }) => (
              <Icon name="briefcase" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Publish"
          component={PublishServiceScreen}
          options={{
            title: 'Publicar Servicio',
            tabBarLabel: 'Publicar',
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus-circle" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Mi Perfil',
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <Icon name="account" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  if (user?.rol === ROLES.PROVEEDOR_SERVICIO) {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2D7CF6',
          tabBarInactiveTintColor: '#666',
          headerShown: true,
          headerStyle: { backgroundColor: '#2D7CF6' },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Servicios Disponibles',
            tabBarLabel: 'Servicios',
            tabBarIcon: ({ color, size }) => (
              <Icon name="briefcase-search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Quotes"
          component={MyQuotesScreen}
          options={{
            title: 'Mis Cotizaciones',
            tabBarLabel: 'Cotizaciones',
            tabBarIcon: ({ color, size }) => (
              <Icon name="file-document" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Mi Perfil',
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <Icon name="account" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  // PROVEEDOR_INSUMOS
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2D7CF6',
        tabBarInactiveTintColor: '#666',
        headerShown: true,
        headerStyle: { backgroundColor: '#2D7CF6' },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Catalog"
        component={CatalogScreen}
        options={{
          title: 'Mi Catálogo',
          tabBarLabel: 'Catálogo',
          tabBarIcon: ({ color, size }) => (
            <Icon name="package-variant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Mi Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

