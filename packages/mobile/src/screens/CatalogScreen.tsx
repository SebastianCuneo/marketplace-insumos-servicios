import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InsumosCatalogo, useInsumos } from '@marketplace/shared';

export default function CatalogScreen() {
  const { state } = useInsumos();
  const insumos = state.insumos || [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Title>Mi Catálogo de Insumos</Title>
          <Paragraph>{insumos.length} insumo{insumos.length !== 1 ? 's' : ''}</Paragraph>
        </View>

        {insumos.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <Icon name="package-variant" size={64} color="#ccc" />
              <Title style={styles.emptyTitle}>No tienes insumos en tu catálogo</Title>
              <Paragraph style={styles.emptyText}>
                Agrega insumos para ofrecerlos a los solicitantes
              </Paragraph>
            </Card.Content>
          </Card>
        ) : (
          insumos.map((insumo: InsumosCatalogo) => (
            <Card key={insumo.id} style={styles.card}>
              <Card.Content>
                <Title>{insumo.nombre}</Title>
                <Paragraph>Stock: {insumo.stock} {insumo.unidad}</Paragraph>
                <Paragraph style={styles.price}>
                  €{insumo.precioUnitario.toFixed(2)} / {insumo.unidad}
                </Paragraph>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {/* TODO: Add insumo */}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D7CF6',
    marginTop: 8,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2D7CF6',
  },
});

