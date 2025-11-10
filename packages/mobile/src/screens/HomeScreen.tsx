import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Chip, Text, Button, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth, useServices, ROLES, SERVICE_STATES } from '@marketplace/shared';

export default function HomeScreen() {
  const { user } = useAuth();
  const { services } = useServices();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Filtrar servicios según el rol
  const filteredServices = React.useMemo(() => {
    if (user?.rol === ROLES.SOLICITANTE) {
      // Solicitante ve solo sus servicios
      return services.filter(s => s.solicitanteId === user.id);
    } else if (user?.rol === ROLES.PROVEEDOR_SERVICIO) {
      // Proveedor ve servicios publicados o en evaluación
      return services.filter(
        s => s.estado === SERVICE_STATES.PUBLICADO || s.estado === SERVICE_STATES.EN_EVALUACION
      );
    }
    return [];
  }, [services, user]);

  const getEstadoBadge = (estado: string) => {
    const badges: Record<string, { color: string; text: string }> = {
      [SERVICE_STATES.PUBLICADO]: { color: '#2196F3', text: 'Publicado' },
      [SERVICE_STATES.EN_EVALUACION]: { color: '#FF9800', text: 'En Evaluación' },
      [SERVICE_STATES.ASIGNADO]: { color: '#4CAF50', text: 'Asignado' },
      [SERVICE_STATES.COMPLETADO]: { color: '#9E9E9E', text: 'Completado' },
    };
    return badges[estado] || badges[SERVICE_STATES.PUBLICADO];
  };

  const renderServiceCard = (servicio: any) => {
    const badge = getEstadoBadge(servicio.estado);
    
    return (
      <Card key={servicio.id} style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>{servicio.titulo}</Title>
            <Chip
              style={[styles.badge, { backgroundColor: badge.color }]}
              textStyle={styles.badgeText}
            >
              {badge.text}
            </Chip>
          </View>

          <Paragraph numberOfLines={2} style={styles.description}>
            {servicio.descripcion}
          </Paragraph>

          <View style={styles.infoRow}>
            <Icon name="map-marker" size={16} color="#666" />
            <Text style={styles.infoText}>
              {servicio.ciudad}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="calendar" size={16} color="#666" />
            <Text style={styles.infoText}>
              {new Date(servicio.fechaPreferida || servicio.fecha).toLocaleDateString('es-ES')}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="package-variant" size={16} color="#666" />
            <Text style={styles.infoText}>
              {(servicio.insumosRequeridos || servicio.insumos || []).length} insumos
            </Text>
          </View>

          {user?.rol === ROLES.SOLICITANTE && (
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>
                  {servicio.cotizaciones?.length || 0}
                </Text>
                <Text style={styles.statLabel}>Cotizaciones</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>
                  {servicio.ofertas?.length || 0}
                </Text>
                <Text style={styles.statLabel}>Ofertas</Text>
              </View>
            </View>
          )}
        </Card.Content>

        <Card.Actions>
          <Button
            mode="contained"
            buttonColor="#2D7CF6"
            onPress={() => {/* TODO: Navigate to detail */}}
          >
            Ver Detalle
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Title>
          {user?.rol === ROLES.SOLICITANTE ? 'Mis Servicios' : 'Servicios Disponibles'}
        </Title>
        <Paragraph>
          {filteredServices.length} servicio{filteredServices.length !== 1 ? 's' : ''}
        </Paragraph>
      </View>

      {filteredServices.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Card.Content style={styles.emptyContent}>
            <Icon name="briefcase-outline" size={64} color="#ccc" />
            <Title style={styles.emptyTitle}>
              {user?.rol === ROLES.SOLICITANTE
                ? 'No tienes servicios publicados'
                : 'No hay servicios disponibles'}
            </Title>
            <Paragraph style={styles.emptyText}>
              {user?.rol === ROLES.SOLICITANTE
                ? 'Publica tu primer servicio usando el botón "Publicar"'
                : 'Los servicios publicados aparecerán aquí'}
            </Paragraph>
          </Card.Content>
        </Card>
      ) : (
        filteredServices.map(renderServiceCard)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    height: 24,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
  },
  description: {
    color: '#666',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D7CF6',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  emptyCard: {
    margin: 16,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    marginTop: 16,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
  },
});

