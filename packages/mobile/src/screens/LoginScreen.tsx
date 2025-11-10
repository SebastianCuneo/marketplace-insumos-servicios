import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Card, Title, Paragraph, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '@marketplace/shared';

export default function LoginScreen() {
  const { login, state } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }
    if (!password) {
      setError('Por favor ingresa tu contraseña');
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError(state.error || 'Email o contraseña incorrectos');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="store" size={48} color="#fff" />
          </View>
          <Title style={styles.title}>Marketplace de Servicios</Title>
          <Paragraph style={styles.subtitle}>
            Conecta con proveedores de servicios e insumos
          </Paragraph>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email" />}
              style={styles.input}
            />

            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
            />

            {error && (
              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>
            )}

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
              buttonColor="#2D7CF6"
              loading={state.loading}
            >
              Ingresar
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.credentialsCard}>
          <Card.Content>
            <Text style={styles.credentialsTitle}>🔑 Credenciales de prueba:</Text>
            <Text style={styles.credentialText}>
              <Text style={styles.bold}>Solicitante:</Text> solicitante@marketplace.com / solicitante123
            </Text>
            <Text style={styles.credentialText}>
              <Text style={styles.bold}>Proveedor Servicio:</Text> proveedor@marketplace.com / proveedor123
            </Text>
            <Text style={styles.credentialText}>
              <Text style={styles.bold}>Proveedor Insumos:</Text> insumos@marketplace.com / insumos123
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: '#2D7CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
  credentialsCard: {
    backgroundColor: '#E3F2FD',
  },
  credentialsTitle: {
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 8,
  },
  credentialText: {
    fontSize: 12,
    color: '#1976D2',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
});

