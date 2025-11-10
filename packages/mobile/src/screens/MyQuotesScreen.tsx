import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth, useServices } from '@marketplace/shared';

export default function MyQuotesScreen() {
  const { user } = useAuth();
  const { state } = useServices();

  const misCotizaciones = state.quotes?.filter(q => q.proveedorId === user?.id) || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title>Mis Cotizaciones</Title>
        <Paragraph>{misCotizaciones.length} cotización{misCotizaciones.length !== 1 ? 'es' : ''}</Paragraph>
      </View>

      {misCotizaciones.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Card.Content style={styles.emptyContent}>
            <Icon name="file-document-outline" size={64} color="#ccc" />
            <Title style={styles.emptyTitle}>No has enviado cotizaciones</Title>
            <Paragraph style={styles.emptyText}>
              Busca servicios disponibles y envía tus cotizaciones
            </Paragraph>
          </Card.Content>
        </Card>
      ) : (
        misCotizaciones.map(cotizacion => (
          <Card key={cotizacion.id} style={styles.card}>
            <Card.Content>
              <Title>Servicio ID: {cotizacion.servicioId}</Title>
              <Text style={styles.price}>€{cotizacion.precio.toLocaleString()}</Text>
              <Paragraph>{cotizacion.plazo}</Paragraph>
            </Card.Content>
          </Card>
        ))
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
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D7CF6',
    marginVertical: 8,
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

