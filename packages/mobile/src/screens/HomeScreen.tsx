import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Badge, FAB } from 'react-native-paper';
import { useAuth } from '../shared/contexts/AuthContext';
import { useServices } from '../shared/contexts/ServicesContext';
import { ROLES } from '../shared/constants/roles';
import { SERVICE_STATES } from '../shared/constants/serviceStates';

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { services } = useServices();

  // Filtrar servicios según el rol
  const getFilteredServices = () => {
    if (user?.rol === ROLES.SOLICITANTE) {
      return services.filter(s => s.solicitanteId === user.id);
    } else if (user?.rol === ROLES.PROVEEDOR_SERVICIO) {
      return services.filter(s => 
        s.estado === SERVICE_STATES.PUBLICADO || 
        s.estado === SERVICE_STATES.EN_EVALUACION
      );
    }
    return services;
  };

  const filteredServices = getFilteredServices();

  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case SERVICE_STATES.PUBLICADO:
        return '#2196F3';
      case SERVICE_STATES.EN_EVALUACION:
        return '#9C27B0';
      case SERVICE_STATES.ASIGNADO:
        return '#FF9800';
      case SERVICE_STATES.COMPLETADO:
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  const renderServiceCard = (servicio: any) => (
    <TouchableOpacity key={servicio.id}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text variant="titleMedium" style={styles.serviceTitle}>
              {servicio.titulo}
            </Text>
            <Badge 
              style={{ 
                backgroundColor: getEstadoBadgeColor(servicio.estado),
              }}
            >
              {servicio.estado}
            </Badge>
          </View>
          
          <Text variant="bodySmall" style={styles.category}>
            {servicio.categoria}
          </Text>
          
          <View style={styles.serviceDetails}>
            <Text variant="bodySmall">📍 {servicio.ciudad}</Text>
            <Text variant="bodySmall">
              📅 {new Date(servicio.fechaPreferida).toLocaleDateString()}
            </Text>
          </View>
          
          <Text variant="bodySmall" style={styles.supplies}>
            {servicio.insumosRequeridos.length} insumos requeridos
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text variant="headlineSmall" style={styles.title}>
            {user?.rol === ROLES.SOLICITANTE && 'Mis Servicios'}
            {user?.rol === ROLES.PROVEEDOR_SERVICIO && 'Servicios Disponibles'}
            {user?.rol === ROLES.PROVEEDOR_INSUMOS && 'Mi Catálogo'}
          </Text>

          {filteredServices.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Card.Content>
                <Text variant="bodyMedium" style={styles.emptyText}>
                  {user?.rol === ROLES.SOLICITANTE && 'No tienes servicios publicados aún'}
                  {user?.rol === ROLES.PROVEEDOR_SERVICIO && 'No hay servicios disponibles para cotizar'}
                  {user?.rol === ROLES.PROVEEDOR_INSUMOS && 'No tienes insumos en tu catálogo'}
                </Text>
              </Card.Content>
            </Card>
          ) : (
            filteredServices.map(renderServiceCard)
          )}
        </View>
      </ScrollView>

      {/* FAB para acciones según rol */}
      {user?.rol === ROLES.SOLICITANTE && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('PublicarServicio')}
          label="Publicar"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 80, // Space for FAB
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceTitle: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 8,
  },
  category: {
    color: '#666',
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  supplies: {
    color: '#2D7CF6',
    fontSize: 12,
  },
  emptyCard: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2D7CF6',
  },
});

