import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  Card,
  Chip,
  SegmentedButtons
} from 'react-native-paper';
import { useAuth } from '../shared/contexts/AuthContext';
import { useServices } from '../shared/contexts/ServicesContext';
import { SERVICE_CATEGORIES } from '../shared/constants/categories';
import { SERVICE_STATES } from '../shared/constants/serviceStates';

export default function PublicarServicioScreen({ navigation }: any) {
  const { user } = useAuth();
  const { addService } = useServices();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState<string>(SERVICE_CATEGORIES.JARDINERIA);
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fecha, setFecha] = useState('');
  const [insumos, setInsumos] = useState<Array<{ nombre: string; cantidad: number; unidad: string }>>([]);
  const [nuevoInsumo, setNuevoInsumo] = useState({ nombre: '', cantidad: '', unidad: 'unidad' });

  const agregarInsumo = () => {
    if (nuevoInsumo.nombre && nuevoInsumo.cantidad) {
      setInsumos([
        ...insumos,
        {
          nombre: nuevoInsumo.nombre,
          cantidad: parseFloat(nuevoInsumo.cantidad),
          unidad: nuevoInsumo.unidad,
        },
      ]);
      setNuevoInsumo({ nombre: '', cantidad: '', unidad: 'unidad' });
    }
  };

  const eliminarInsumo = (index: number) => {
    setInsumos(insumos.filter((_, i) => i !== index));
  };

  const handlePublicar = () => {
    if (!titulo || !descripcion || !ciudad || !direccion || !fecha) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (insumos.length === 0) {
      alert('Debes agregar al menos un insumo');
      return;
    }

    const nuevoServicio: any = {
      id: Date.now().toString(),
      solicitanteId: user!.id,
      titulo,
      descripcion,
      categoria,
      ciudad,
      direccion,
      fechaPreferida: fecha,
      insumosRequeridos: insumos,
      estado: SERVICE_STATES.PUBLICADO,
      cotizacionSeleccionadaId: undefined,
      createdAt: new Date().toISOString(),
    };

    addService(nuevoServicio as any);  
    
    // Navegar de vuelta
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          Publicar Nuevo Servicio
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información básica
            </Text>

            <TextInput
              label="Título del servicio *"
              value={titulo}
              onChangeText={setTitulo}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Descripción *"
              value={descripcion}
              onChangeText={setDescripcion}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.input}
            />

            <Text variant="bodyMedium" style={styles.label}>
              Categoría *
            </Text>
            <SegmentedButtons
              value={categoria}
              onValueChange={setCategoria}
              buttons={[
                { value: SERVICE_CATEGORIES.JARDINERIA, label: 'Jardín' },
                { value: SERVICE_CATEGORIES.PISCINAS, label: 'Piscina' },
                { value: SERVICE_CATEGORIES.LIMPIEZA, label: 'Limpieza' },
              ]}
              style={styles.input}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Ubicación y fecha
            </Text>

            <TextInput
              label="Ciudad *"
              value={ciudad}
              onChangeText={setCiudad}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Dirección *"
              value={direccion}
              onChangeText={setDireccion}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Fecha preferida (YYYY-MM-DD) *"
              value={fecha}
              onChangeText={setFecha}
              mode="outlined"
              placeholder="2025-12-31"
              style={styles.input}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Insumos requeridos
            </Text>

            <View style={styles.insumoForm}>
              <TextInput
                label="Nombre del insumo"
                value={nuevoInsumo.nombre}
                onChangeText={(text) => setNuevoInsumo({ ...nuevoInsumo, nombre: text })}
                mode="outlined"
                style={styles.insumoInput}
              />

              <View style={styles.insumoRow}>
                <TextInput
                  label="Cantidad"
                  value={nuevoInsumo.cantidad}
                  onChangeText={(text) => setNuevoInsumo({ ...nuevoInsumo, cantidad: text })}
                  mode="outlined"
                  keyboardType="numeric"
                  style={styles.cantidadInput}
                />

                <TextInput
                  label="Unidad"
                  value={nuevoInsumo.unidad}
                  onChangeText={(text) => setNuevoInsumo({ ...nuevoInsumo, unidad: text })}
                  mode="outlined"
                  style={styles.unidadInput}
                />
              </View>

              <Button mode="outlined" onPress={agregarInsumo} style={styles.addButton}>
                Agregar insumo
              </Button>
            </View>

            {insumos.length > 0 && (
              <View style={styles.insumosList}>
                <Text variant="bodyMedium" style={styles.insumosTitle}>
                  Insumos agregados:
                </Text>
                {insumos.map((insumo, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    onClose={() => eliminarInsumo(index)}
                    style={styles.chip}
                  >
                    {insumo.nombre} - {insumo.cantidad} {insumo.unidad}
                  </Chip>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>

        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={handlePublicar}
            style={styles.publishButton}
            buttonColor="#2D7CF6"
          >
            Publicar
          </Button>
        </View>
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
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
  },
  insumoForm: {
    marginTop: 8,
  },
  insumoInput: {
    marginBottom: 12,
  },
  insumoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  cantidadInput: {
    flex: 1,
  },
  unidadInput: {
    flex: 1,
  },
  addButton: {
    marginTop: 4,
  },
  insumosList: {
    marginTop: 16,
  },
  insumosTitle: {
    marginBottom: 8,
    fontWeight: '500',
  },
  chip: {
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
  },
  publishButton: {
    flex: 1,
  },
});

