# 🛒 Marketplace de Servicios con Insumos

**Trabajo Práctico 2025 - Monorepo React.js + React Native**

Plataforma donde Solicitantes publican servicios, Proveedores de Servicio envían cotizaciones, y Proveedores de Insumos ofrecen materiales necesarios.

---

## 📁 Estructura del Proyecto (Monorepo)

```
marketplace-insumos-servicios/
├── packages/
│   ├── shared/          # 🔄 Código compartido (Contexts, Types, Constants, Data)
│   │   ├── contexts/    # AuthContext, ServicesContext, InsumosContext
│   │   ├── types/       # Interfaces TypeScript
│   │   ├── constants/   # Roles, Estados, Categorías
│   │   └── data/        # Usuarios hardcodeados, Mock data
│   │
│   ├── web/             # 🌐 Aplicación Web (React.js + Shadcn/ui)
│   │   └── src/
│   │       ├── Components/  # Componentes UI web
│   │       └── App.jsx
│   │
│   └── mobile/          # 📱 Aplicación Móvil (React Native + Expo)
│       └── src/
│           ├── screens/     # Pantallas mobile
│           ├── navigation/  # React Navigation
│           └── App.tsx
│
├── package.json         # Root con Yarn Workspaces
└── README.md
```

---

## 🚀 Instalación

### Prerrequisitos

- **Node.js** >= 18.x
- **Yarn** >= 1.22.x
- **Expo Go** app en tu teléfono (iOS/Android)

### Instalación de Dependencias

```bash
# Instalar todas las dependencias del monorepo
yarn install
```

Esto instalará las dependencias de los 3 paquetes:
- `@marketplace/shared`
- `@marketplace/web`
- `@marketplace/mobile`

---

## 🌐 Correr la Aplicación Web

```bash
# Desde la raíz del proyecto
yarn web

# O directamente en el paquete web
cd packages/web
yarn start
```

La aplicación web se abrirá en `http://localhost:3000`

### Tecnologías Web:
- **React.js** 18
- **Shadcn/ui** (componentes basados en Radix UI)
- **Tailwind CSS**
- **Context API + useReducer**

---

## 📱 Correr la Aplicación Mobile

```bash
# Desde la raíz del proyecto
yarn mobile

# O directamente en el paquete mobile
cd packages/mobile
yarn start
```

Se abrirá **Expo Dev Tools** en tu navegador.

### Opciones de Testing:

1. **Expo Go (Recomendado para desarrollo):**
   - Descarga **Expo Go** desde App Store (iOS) o Google Play (Android)
   - Escanea el QR code que aparece en la terminal o navegador
   - La app se cargará automáticamente en tu teléfono

2. **Emulador Android:**
   ```bash
   yarn mobile
   # Presiona 'a' en la terminal
   ```

3. **Simulador iOS (solo macOS):**
   ```bash
   yarn mobile
   # Presiona 'i' en la terminal
   ```

### Tecnologías Mobile:
- **React Native** 0.76
- **Expo** ~52.0
- **React Native Paper** (Material Design)
- **React Navigation** 7
- **Context API + useReducer** (compartido con web)

---

## 🔑 Credenciales de Prueba

La autenticación es **hardcodeada** (sin backend). Usa estas credenciales:

### Solicitante
- **Email:** `solicitante@marketplace.com`
- **Password:** `solicitante123`
- **Permisos:** Publicar servicios, comparar cotizaciones, seleccionar proveedor

### Proveedor de Servicio
- **Email:** `proveedor@marketplace.com`
- **Password:** `proveedor123`
- **Permisos:** Ver servicios publicados, enviar cotizaciones

### Proveedor de Insumos
- **Email:** `insumos@marketplace.com`
- **Password:** `insumos123`
- **Permisos:** Publicar insumos, ofrecer packs para servicios

---

## 🧩 Arquitectura: Código Compartido

El paquete `@marketplace/shared` contiene **toda la lógica de negocio**, permitiendo reutilización del 70% del código:

### ✅ Compartido entre Web y Mobile:

- **Contexts (Estado Global):**
  - `AuthContext`: Login, logout, usuario actual
  - `ServicesContext`: CRUD de servicios, cotizaciones, transiciones de estado
  - `InsumosContext`: Catálogo de insumos, ofertas

- **Types (TypeScript):**
  - `Usuario`, `Servicio`, `Cotizacion`, `InsumoCatalogo`, `OfertaInsumos`

- **Constants:**
  - `ROLES`: `SOLICITANTE`, `PROVEEDOR_SERVICIO`, `PROVEEDOR_INSUMOS`
  - `SERVICE_STATES`: `PUBLICADO`, `EN_EVALUACION`, `ASIGNADO`, `COMPLETADO`
  - `SERVICE_CATEGORIES`: Categorías de servicios

- **Data:**
  - `hardcodedUsers.ts`: Lista de usuarios con credenciales
  - `mockData.ts`: Servicios, cotizaciones y ofertas de ejemplo

### ⚡ Ventajas:

- **DRY:** Lógica escrita una sola vez
- **Consistencia:** Mismo comportamiento en web y mobile
- **Mantenibilidad:** Fix bugs en un solo lugar
- **Testing:** Testear lógica de negocio independiente de UI

---

## 📦 Flujo de Datos

### Ejemplo: Publicar un Servicio

**Web (`PublicarServicio.tsx`):**
```tsx
import { useAuth, useServices } from '@marketplace/shared';

const { user } = useAuth();
const { addService } = useServices();

const nuevoServicio = { ...data, solicitanteId: user.id };
addService(nuevoServicio); // ← Mismo método que en mobile
```

**Mobile (`PublishServiceScreen.tsx`):**
```tsx
import { useAuth, useServices } from '@marketplace/shared';

const { user } = useAuth();
const { addService } = useServices();

const nuevoServicio = { ...data, solicitanteId: user.id };
addService(nuevoServicio); // ← Mismo método que en web
```

**Ambos usan el mismo `ServicesContext.tsx` de `@marketplace/shared`!**

---

## 🎯 Funcionalidades Implementadas

### ✅ Solicitante
- [x] Login con credenciales hardcodeadas
- [x] Publicar servicio (título, descripción, ubicación, fecha, insumos)
- [x] Ver mis servicios publicados
- [x] Ver cotizaciones recibidas
- [x] Comparar cotizaciones (precio, plazo, rating)
- [x] Seleccionar cotización → cambia estado a ASIGNADO
- [x] Ver ofertas de insumos asociadas

### ✅ Proveedor de Servicio
- [x] Ver servicios publicados (filtro por categoría/ciudad)
- [x] Enviar cotización (precio, plazo, notas)
- [x] Ver mis cotizaciones enviadas

### ✅ Proveedor de Insumos
- [x] Ver catálogo de insumos
- [x] Publicar nuevo insumo (nombre, precio, stock)
- [x] Ofrecer packs de insumos para servicios

### 🔄 Transiciones de Estado Automáticas
- `PUBLICADO` → `EN_EVALUACION` (al recibir primera cotización)
- `EN_EVALUACION` → `ASIGNADO` (al seleccionar cotización)
- `ASIGNADO` → `COMPLETADO` (manual por el solicitante)

---

## 🛠️ Scripts Disponibles

Desde la raíz del proyecto:

```bash
# Correr aplicación web
yarn web

# Correr aplicación mobile (Expo)
yarn mobile

# Build web para producción
yarn web:build

# Build mobile para Android/iOS
yarn mobile:build
```

---

## 📚 Tecnologías Utilizadas

| Categoría | Web | Mobile | Shared |
|-----------|-----|--------|--------|
| **Framework** | React.js 18 | React Native 0.76 | - |
| **UI Library** | Shadcn/ui + Radix | React Native Paper | - |
| **Styling** | Tailwind CSS | StyleSheet | - |
| **Navegación** | Estado local | React Navigation 7 | - |
| **Estado Global** | Context + Reducer | Context + Reducer | ✅ |
| **TypeScript** | ✅ | ✅ | ✅ |
| **Icons** | Lucide React | Vector Icons | - |
| **Build Tool** | React Scripts (CRA) | Expo CLI | - |

---

## 🔧 Configuración del Monorepo

Este proyecto usa **Yarn Workspaces** para gestionar múltiples paquetes:

```json
// package.json (root)
{
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "web": "yarn workspace @marketplace/web start",
    "mobile": "yarn workspace @marketplace/mobile start"
  }
}
```

### Cómo funcionan los imports:

```tsx
// En packages/web/src/App.jsx
import { useAuth } from '@marketplace/shared';

// En packages/mobile/src/screens/LoginScreen.tsx
import { useAuth } from '@marketplace/shared';

// Ambos resuelven a packages/shared/
```

---

## 📝 Decisiones Técnicas

### ¿Por qué Monorepo?
- **Reutilización de código:** 70% del código es compartido
- **Consistencia:** Misma lógica de negocio en web y mobile
- **Mantenibilidad:** Cambios en lógica se reflejan automáticamente en ambas plataformas

### ¿Por qué Context API + useReducer?
- **Requisito del TP:** Usar Context API obligatoriamente
- **Escalabilidad:** Reducers facilitan transiciones de estado complejas
- **Inmutabilidad:** Garantiza predictibilidad del estado

### ¿Por qué Expo?
- **Desarrollo rápido:** Setup en minutos vs. días
- **Testing fácil:** Expo Go para probar en dispositivo real sin compilar
- **Hot Reload:** Cambios instantáneos durante desarrollo

### Persistencia de Datos
- **Estado:** Solo en memoria (Context)
- **No hay backend:** Datos mock se cargan al iniciar
- **Limitación:** Al refrescar se pierden cambios (servicios nuevos, cotizaciones)
- **Futuro:** Agregar localStorage (web) o AsyncStorage (mobile)

---

## 🐛 Troubleshooting

### Web no inicia
```bash
cd packages/web
rm -rf node_modules
yarn install
yarn start
```

### Mobile no encuentra módulo @marketplace/shared
```bash
# Desde la raíz
yarn install
cd packages/mobile
rm -rf node_modules
yarn install
yarn start
```

### Expo Go no se conecta
- Asegúrate de estar en la misma red WiFi
- Verifica el firewall de tu PC
- Usa el modo Tunnel: `yarn mobile` → presiona `t`

---

## 👨‍💻 Desarrollo

### Agregar nueva funcionalidad compartida:

1. **Crear lógica en `packages/shared/`**
   ```bash
   # Ejemplo: Nuevo context
   packages/shared/contexts/NotificationsContext.tsx
   ```

2. **Exportar en `packages/shared/index.ts`**
   ```ts
   export * from './contexts/NotificationsContext';
   ```

3. **Usar en web y mobile:**
   ```tsx
   import { useNotifications } from '@marketplace/shared';
   ```

---

## 📄 Entregables del TP

- ✅ **Web (React.js):** Portal principal para todos los roles
- ✅ **Mobile (React Native):** App Expo para todos los roles
- ✅ **README:** Instrucciones de instalación y ejecución
- ✅ **Credenciales hardcodeadas:** Listadas arriba
- ✅ **Context + Reducer:** Implementado en `packages/shared/contexts/`
- ✅ **Demo:** Screenshots y videos en carpeta `/docs` (TODO)

---

## 🎓 Autores

**Trabajo Práctico 2025 - Marketplace de Servicios con Insumos**

---

## 📖 Licencia

MIT
