# 📱 Proyecto Mobile - Instrucciones Completas

## 🎯 **¿Qué se ha creado?**

Se ha desarrollado una **aplicación móvil React Native (Expo)** que funciona como complemento del proyecto web, compartiendo toda la lógica de negocio mediante `@marketplace/shared`.

---

## ✅ **Estado Actual: MVP FUNCIONAL**

### **Lo que YA funciona:**
1. ✅ **Login** con credenciales hardcodeadas
2. ✅ **Dashboard** dinámico según rol
3. ✅ **Perfil de usuario** con información y logout
4. ✅ **Publicar servicios** (para SOLICITANTE)
5. ✅ **Ver lista de servicios** filtrada por rol
6. ✅ **Navegación** completa (Stack + Bottom Tabs)

### **Lo que falta (opcional para MVP):**
- ⏳ Pantalla de detalle de servicio
- ⏳ Comparador de cotizaciones
- ⏳ Enviar cotización (PROVEEDOR_SERVICIO)
- ⏳ Agregar insumos al catálogo (PROVEEDOR_INSUMOS)

---

## 🚀 **Cómo ejecutar el proyecto mobile**

### **Opción 1: Desde la raíz del monorepo**
```bash
npm run mobile
```

### **Opción 2: Directamente en packages/mobile**
```bash
cd packages/mobile
npm start
```

### **Para limpiar la caché (si hay problemas):**
```bash
cd packages/mobile
npm start -- --clear
```

---

## 📱 **Probar en tu teléfono**

1. **Instala Expo Go:**
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Inicia el servidor:**
   ```bash
   npm run mobile
   ```

3. **Escanea el QR:**
   - Android: Abre Expo Go → Scan QR
   - iOS: Abre la cámara → Escanea el QR

4. **Login con credenciales:**
   ```
   SOLICITANTE:          solicitante@marketplace.com / solicitante123
   PROVEEDOR_SERVICIO:   proveedor@marketplace.com / proveedor123
   PROVEEDOR_INSUMOS:    insumos@marketplace.com / insumos123
   ```

---

## 📂 **Estructura del Proyecto**

```
marketplace-insumos-servicios/
├── packages/
│   ├── shared/              # 🔗 Código compartido (Web + Mobile)
│   │   ├── contexts/        # AuthContext, ServicesContext, etc.
│   │   ├── constants/       # ROLES, SERVICE_STATES, etc.
│   │   ├── types/           # Interfaces TypeScript
│   │   └── data/            # Datos hardcodeados
│   │
│   ├── web/                 # 🌐 Proyecto React.js (Ya existente)
│   │   └── src/
│   │       └── Components/
│   │
│   └── mobile/              # 📱 Proyecto React Native (NUEVO)
│       ├── App.tsx          # Entry point
│       ├── metro.config.js  # Configuración monorepo
│       └── src/
│           ├── navigation/
│           │   └── RootNavigator.tsx
│           └── screens/
│               ├── LoginScreen.tsx
│               ├── HomeScreen.tsx
│               ├── PerfilScreen.tsx
│               └── PublicarServicioScreen.tsx
```

---

## 🔗 **Cómo funciona el código compartido**

### **En packages/mobile/package.json:**
```json
{
  "dependencies": {
    "@marketplace/shared": "file:../shared"
  }
}
```

### **En cualquier pantalla mobile:**
```typescript
import { 
  useAuth, 
  useServices, 
  ROLES, 
  SERVICE_STATES 
} from '@marketplace/shared';
```

### **Beneficios:**
- ✅ Misma lógica en web y mobile
- ✅ Tipos compartidos (TypeScript)
- ✅ Un solo lugar para actualizar datos/constantes
- ✅ Fácil mantenimiento

---

## 🎨 **Tecnologías Usadas**

| Tecnología | Propósito |
|------------|-----------|
| **Expo** | Framework React Native |
| **React Navigation** | Navegación entre pantallas |
| **React Native Paper** | Componentes UI (Material Design) |
| **@marketplace/shared** | Lógica compartida con web |
| **TypeScript** | Tipado estático |

---

## 📝 **Cómo agregar nuevas pantallas**

### **1. Crear el archivo de la pantalla:**
```typescript
// packages/mobile/src/screens/MiNuevaPantalla.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useAuth, useServices } from '@marketplace/shared';

export default function MiNuevaPantalla({ navigation }: any) {
  const { user } = useAuth();
  const { services } = useServices();

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Mi Nueva Pantalla</Text>
      {/* Tu contenido aquí */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

### **2. Agregar al navegador:**
```typescript
// packages/mobile/src/navigation/RootNavigator.tsx
import MiNuevaPantalla from '../screens/MiNuevaPantalla';

// Dentro de RootNavigator:
<Stack.Screen 
  name="MiNuevaPantalla" 
  component={MiNuevaPantalla}
  options={{ title: 'Mi Pantalla' }}
/>
```

### **3. Navegar desde otra pantalla:**
```typescript
navigation.navigate('MiNuevaPantalla');
```

---

## 🐛 **Solución de Problemas Comunes**

### **Error: "Unable to resolve module"**
```bash
cd packages/mobile
npm install
npm start -- --clear
```

### **Error: "Metro Bundler has encountered an error"**
```bash
# Limpiar caché de Metro
cd packages/mobile
rm -rf .expo
npm start -- --clear
```

### **Error: "Cannot find module @marketplace/shared"**
```bash
# Reinstalar dependencias
cd packages/mobile
rm -rf node_modules
npm install
```

### **La app no carga en Expo Go:**
1. Asegúrate de estar en la misma red WiFi
2. Verifica que el servidor Expo esté corriendo
3. Intenta presionar "r" en la terminal para recargar

---

## 📦 **Comandos Útiles**

```bash
# Iniciar mobile
npm run mobile

# Iniciar web
npm run web

# Limpiar todo y reinstalar
cd packages/mobile
rm -rf node_modules
npm install

# Ver logs de Expo
cd packages/mobile
npm start
# Luego presiona 'j' para abrir debugger
```

---

## 🎯 **Próximos Pasos Sugeridos**

### **Para completar el MVP:**
1. **Crear DetalleServicioScreen** (ver cotizaciones de un servicio)
2. **Crear ComparadorScreen** (comparar cotizaciones)
3. **Crear EnviarCotizacionScreen** (PROVEEDOR_SERVICIO)

### **Para mejorar la experiencia:**
1. Agregar AsyncStorage para persistir sesión
2. Agregar pull-to-refresh en listas
3. Agregar loading states
4. Mejorar validaciones de formularios
5. Agregar notificaciones (push notifications)

### **Para producción:**
1. Configurar variables de entorno
2. Agregar manejo de errores global
3. Optimizar performance
4. Testing (Jest + React Native Testing Library)
5. Build para tiendas (EAS Build)

---

## 📚 **Documentación de Referencia**

- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native](https://reactnative.dev/)

---

## ✨ **Resumen para el Product Manager**

### **¿Qué tenemos?**
- ✅ App mobile funcional en Expo
- ✅ Login con 3 roles diferentes
- ✅ Dashboard personalizado por rol
- ✅ Publicación de servicios
- ✅ Código compartido con el proyecto web

### **¿Cómo está organizado?**
- Monorepo con 3 paquetes: `shared`, `web`, `mobile`
- Toda la lógica en `shared` → reutilizable
- Web y mobile importan de `shared`

### **¿Qué se puede hacer?**
1. **Login** → Autenticación con 3 tipos de usuario
2. **Ver servicios** → Lista filtrada por rol
3. **Publicar servicio** → Formulario completo
4. **Ver perfil** → Información del usuario
5. **Logout** → Cerrar sesión

### **¿Qué falta para estar completo?**
- Detalle de servicio
- Comparar cotizaciones
- Enviar cotizaciones (proveedores)
- Gestión de insumos

**Tiempo estimado para completar:** 4-6 horas de desarrollo adicional.

---

## 🎉 **¡Felicidades!**

Tienes un proyecto mobile funcional que:
- ✅ Usa las mismas credenciales que el web
- ✅ Comparte toda la lógica de negocio
- ✅ Está listo para ser probado en un teléfono real
- ✅ Es fácil de extender con nuevas funcionalidades

**🚀 Para iniciar: `npm run mobile` y escanea el QR con Expo Go!**

