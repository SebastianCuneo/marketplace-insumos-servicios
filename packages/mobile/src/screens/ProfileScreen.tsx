import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, List, Avatar, Divider } from 'react-native-paper';
import { useAuth, ROLES } from '@marketplace/shared';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const getRoleName = (rol: string) => {
    switch (rol) {
      case ROLES.SOLICITANTE:
        return 'Solicitante de Servicios';
      case ROLES.PROVEEDOR_SERVICIO:
        return 'Proveedor de Servicios';
      case ROLES.PROVEEDOR_INSUMOS:
        return 'Proveedor de Insumos';
      default:
        return rol;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Text
            size={80}
            label={getInitials(user?.nombre || 'U')}
            style={styles.avatar}
          />
          <Title style={styles.name}>{user?.nombre}</Title>
          <Paragraph style={styles.role}>{getRoleName(user?.rol || '')}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <List.Item
            title="Email"
            description={user?.email}
            left={props => <List.Icon {...props} icon="email" />}
          />
          <Divider />
          <List.Item
            title="Teléfono"
            description={user?.telefono || 'No especificado'}
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <Divider />
          <List.Item
            title="Valoración"
            description={`${user?.rating || 0} ⭐`}
            left={props => <List.Icon {...props} icon="star" />}
          />
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={logout}
          icon="logout"
          style={styles.logoutButton}
          textColor="#D32F2F"
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
    backgroundColor: '#F5F5F5',
  },
  profileCard: {
    margin: 16,
    marginBottom: 8,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: '#2D7CF6',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    marginBottom: 4,
  },
  role: {
    color: '#666',
  },
  card: {
    margin: 16,
    marginTop: 8,
  },
  actions: {
    padding: 16,
  },
  logoutButton: {
    borderColor: '#D32F2F',
  },
});

