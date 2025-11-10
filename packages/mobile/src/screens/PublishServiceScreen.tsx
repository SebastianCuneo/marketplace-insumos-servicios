import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Card, Title, Menu, Divider, IconButton } from 'react-native-paper';
import { useAuth, useServices, SERVICE_STATES, SERVICE_CATEGORIES, Servicio, Insumo } from '@marketplace/shared';

export default function PublishServiceScreen() {
  const { user } = useAuth();
  const { addService } = useServices();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [fecha, setFecha] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [insumos, setInsumos] = useState<Insumo[]>([
    { id: '1', nombre: '', cantidad: 0, unidad: '' }
  ]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { label: 'Construcción', value: SERVICE_CATEGORIES.CONSTRUCCION },
    { label: 'Electricidad', value: SERVICE_CATEGORIES.ELECTRICIDAD },
    { label: 'Plomería', value: SERVICE_CATEGORIES.PLOMERIA },
    { label: 'Jardinería', value: SERVICE_CATEGORIES.JARDINERIA },
    { label: 'Limpieza', value: SERVICE_CATEGORIES.LIMPIEZA },
    { label: 'Pintura', value: SERVICE_CATEGORIES.PINTURA },
    { label: 'Piscinas', value: SERVICE_CATEGORIES.PISCINAS },
    { label: 'Otros', value: SERVICE_CATEGORIES.OTROS },
  ];

  const agregarInsumo = () => {
    setInsumos([...insumos, { id: Date.now().toString(), nombre: '', cantidad: 0, unidad: '' }]);
  };

  const eliminarInsumo = (id: string) => {
    if (insumos.length > 1) {
      setInsumos(insumos.filter(i => i.id !== id));
    }
  };

  const actualizarInsumo = (id: string, campo: keyof Insumo, valor: string | number) => {
    setInsumos(insumos.map(i => (i.id === id ? { ...i, [campo]: valor } : i)));
  };

  const handlePublicar = async () => {
    // Validaciones
    if (!titulo || !descripcion || !direccion || !ciudad || !fecha || !categoria) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const insumosValidos = insumos.filter(i => i.nombre && i.cantidad > 0 && i.unidad);
    if (insumosValidos.length === 0) {
      alert('Debes agregar al menos un insumo válido');
      return;
    }

    if (!user) {
      alert('Debes estar logueado para publicar un servicio');
      return;
    }

    setLoading(true);

    const nuevoServicio: Servicio = {
      id: `srv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      solicitanteId: user.id,
      titulo,
      descripcion,
      categoria,
      direccion,
      ciudad,
      fecha,
      fechaPreferida: fecha,
      insumos: insumosValidos,
      insumosRequeridos: insumosValidos,
      estado: SERVICE_STATES.PUBLICADO,
    };

    addService(nuevoServicio);

    // Limpiar formulario
    setTitulo('');
    setDescripcion('');
    setDireccion('');
    setCiudad('');
    setFecha('');
    setCategoria('');
    setInsumos([{ id: '1', nombre: '', cantidad: 0, unidad: '' }]);
    setLoading(false);

    alert('Servicio publicado exitosamente');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Información del Servicio</Title>

            <TextInput
              label="Título del servicio *"
              value={titulo}
              onChangeText={setTitulo}
              mode="outlined"
              style={styles.input}
              placeholder="ej. Remodelación de cocina"
            />

            <TextInput
              label="Descripción *"
              value={descripcion}
              onChangeText={setDescripcion}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.input}
              placeholder="Describe en detalle el servicio..."
            />

            <Menu
              visible={categoryMenuVisible}
              onDismiss={() => setCategoryMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setCategoryMenuVisible(true)}
                  style={styles.input}
                  contentStyle={styles.menuButton}
                >
                  {categoria
                    ? categories.find(c => c.value === categoria)?.label
                    : 'Selecciona una categoría *'}
                </Button>
              }
            >
              {categories.map(cat => (
                <Menu.Item
                  key={cat.value}
                  onPress={() => {
                    setCategoria(cat.value);
                    setCategoryMenuVisible(false);
                  }}
                  title={cat.label}
                />
              ))}
            </Menu>

            <TextInput
              label="Fecha deseada *"
              value={fecha}
              onChangeText={setFecha}
              mode="outlined"
              style={styles.input}
              placeholder="YYYY-MM-DD"
            />

            <TextInput
              label="Dirección *"
              value={direccion}
              onChangeText={setDireccion}
              mode="outlined"
              style={styles.input}
              placeholder="Calle y número"
            />

            <TextInput
              label="Ciudad *"
              value={ciudad}
              onChangeText={setCiudad}
              mode="outlined"
              style={styles.input}
              placeholder="ej. Madrid"
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Title>Insumos Requeridos</Title>
              <IconButton
                icon="plus"
                mode="contained"
                onPress={agregarInsumo}
                size={20}
              />
            </View>

            {insumos.map((insumo, index) => (
              <View key={insumo.id} style={styles.insumoRow}>
                <TextInput
                  label="Nombre"
                  value={insumo.nombre}
                  onChangeText={text => actualizarInsumo(insumo.id, 'nombre', text)}
                  mode="outlined"
                  style={styles.insumoInput}
                  placeholder="ej. Cemento"
                />
                <TextInput
                  label="Cant."
                  value={insumo.cantidad ? insumo.cantidad.toString() : ''}
                  onChangeText={text => actualizarInsumo(insumo.id, 'cantidad', parseFloat(text) || 0)}
                  mode="outlined"
                  keyboardType="numeric"
                  style={styles.cantidadInput}
                />
                <TextInput
                  label="Unidad"
                  value={insumo.unidad}
                  onChangeText={text => actualizarInsumo(insumo.id, 'unidad', text)}
                  mode="outlined"
                  style={styles.unidadInput}
                  placeholder="kg"
                />
                {insumos.length > 1 && (
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => eliminarInsumo(insumo.id)}
                  />
                )}
              </View>
            ))}
          </Card.Content>
        </Card>

        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={handlePublicar}
            loading={loading}
            disabled={loading}
            buttonColor="#2D7CF6"
            style={styles.publishButton}
          >
            Publicar Servicio
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  card: {
    margin: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
  },
  menuButton: {
    justifyContent: 'flex-start',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insumoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insumoInput: {
    flex: 1,
    marginRight: 8,
  },
  cantidadInput: {
    width: 70,
    marginRight: 8,
  },
  unidadInput: {
    width: 70,
    marginRight: 8,
  },
  actions: {
    padding: 16,
    paddingBottom: 32,
  },
  publishButton: {
    paddingVertical: 6,
  },
});

