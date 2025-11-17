import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, Divider } from 'react-native-paper';
import { useAuth } from '../shared/contexts/AuthContext';
import { ROLES, ROLE_NAMES } from '../shared/constants/roles';

export default function PerfilScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header con Avatar */}
        <Card style={styles.headerCard}>
          <Card.Content style={styles.headerContent}>
            <Avatar.Text 
              size={80} 
              label={user.nombre.substring(0, 2).toUpperCase()}
              style={styles.avatar}
            />
            <Text variant="headlineSmall" style={styles.name}>
              {user.nombre}
            </Text>
            <Text variant="bodyMedium" style={styles.role}>
              {ROLE_NAMES[user.rol]}
            </Text>
          </Card.Content>
        </Card>

        {/* Información del usuario */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información de contacto
            </Text>
            <Divider style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>

            {user.telefono && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Teléfono:</Text>
                <Text style={styles.infoValue}>{user.telefono}</Text>
              </View>
            )}

            {user.rating !== undefined && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Calificación:</Text>
                <Text style={styles.infoValue}>
                  ⭐ {user.rating.toFixed(1)} / 5.0
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Estadísticas según rol */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Estadísticas
            </Text>
            <Divider style={styles.divider} />

            {user.rol === ROLES.SOLICITANTE && (
              <>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Servicios publicados</Text>
                  <Text style={styles.statValue}>0</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Servicios completados</Text>
                  <Text style={styles.statValue}>0</Text>
                </View>
              </>
            )}

            {user.rol === ROLES.PROVEEDOR_SERVICIO && (
              <>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Cotizaciones enviadas</Text>
                  <Text style={styles.statValue}>0</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Servicios asignados</Text>
                  <Text style={styles.statValue}>0</Text>
                </View>
              </>
            )}

            {user.rol === ROLES.PROVEEDOR_INSUMOS && (
              <>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Insumos en catálogo</Text>
                  <Text style={styles.statValue}>0</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Packs ofrecidos</Text>
                  <Text style={styles.statValue}>0</Text>
                </View>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Botón de logout */}
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor="#d32f2f"
        >
          Cerrar Sesión
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    backgroundColor: '#2D7CF6',
    marginBottom: 16,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    color: '#666',
  },
  infoCard: {
    marginBottom: 16,
  },
  statsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    color: '#666',
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D7CF6',
  },
  logoutButton: {
    marginTop: 8,
  },
});

