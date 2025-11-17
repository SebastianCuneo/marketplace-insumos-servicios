import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { useAuth } from '../shared/contexts/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, state } = useAuth();

  const handleLogin = () => {
    // Validar campos
    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }
    
    if (!password) {
      setError('Por favor ingresa tu contraseña');
      return;
    }
    
    // Intentar login con el contexto
    const success = login(email, password);
    
    if (success) {
      setError('');
      navigation.replace('Main');
    } else {
      setError(state.error || 'Email o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Marketplace
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Servicios con Insumos
          </Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          {error && (
            <Text style={styles.error}>{error}</Text>
          )}

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
          >
            Iniciar Sesión
          </Button>

          <Text variant="bodySmall" style={styles.hint}>
            Credenciales de prueba:{'\n'}
            solicitante@marketplace.com / solicitante123{'\n'}
            proveedor@marketplace.com / proveedor123{'\n'}
            insumos@marketplace.com / insumos123
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  hint: {
    textAlign: 'center',
    color: '#666',
  },
  error: {
    color: '#d32f2f',
    fontSize: 14,
    marginBottom: 12,
  },
});

