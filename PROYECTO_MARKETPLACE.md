# 📦 MARKETPLACE DE SERVICIOS CON INSUMOS
## Documento Completo para Desarrollo - PM Gema WebMobile

---

## 🎯 RESUMEN EJECUTIVO

**Plataforma:** Marketplace donde Solicitantes publican servicios, Proveedores de Servicio cotizan, y Proveedores de Insumos ofrecen materiales.

**Stack Técnico:**
- **Frontend Web:** React.js + TypeScript
- **Frontend Mobile:** React Native (pendiente)
- **Estado Global:** Context API + useReducer (OBLIGATORIO)
- **UI:** Shadcn/ui + Tailwind CSS
- **Auth:** Hardcodeada (usuarios fijos)
- **Persistencia:** Estado local/mocks (sin backend)

---

## 👥 ROLES Y PERMISOS

### 1. SOLICITANTE
- ✅ Publica servicios con insumos requeridos
- ✅ Recibe cotizaciones de proveedores
- ✅ Visualiza ofertas de insumos
- ✅ Compara cotizaciones (precio, plazo, rating)
- ✅ Selecciona cotización ganadora
- ✅ Gestiona estados: PUBLICADO → EN_EVALUACION → ASIGNADO → COMPLETADO

### 2. PROVEEDOR_SERVICIO
- ✅ Ve servicios publicados (filtros por categoría/ubicación/fecha)
- ✅ Envía cotizaciones (precio, plazo, detalles)
- ✅ Edita/retira cotizaciones (solo en PUBLICADO/EN_EVALUACION)

### 3. PROVEEDOR_INSUMOS
- ✅ Publica insumos en catálogo
- ✅ Ofrece packs de insumos para servicios específicos
- ✅ Ve demanda de insumos

---

## 📊 CONSTANTES DEL SISTEMA

### Roles (src/constants/roles.ts)
```typescript
export const ROLES = {
  SOLICITANTE: 'SOLICITANTE',
  PROVEEDOR_SERVICIO: 'PROVEEDOR_SERVICIO',
  PROVEEDOR_INSUMOS: 'PROVEEDOR_INSUMOS',
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
```

### Estados de Servicio (src/constants/serviceStates.ts)
```typescript
export const SERVICE_STATES = {
  PUBLICADO: 'PUBLICADO',           // Recién creado, acepta cotizaciones
  EN_EVALUACION: 'EN_EVALUACION',   // Tiene ≥1 cotización
  ASIGNADO: 'ASIGNADO',             // Cotización seleccionada
  COMPLETADO: 'COMPLETADO',         // Servicio finalizado
} as const;

export type ServiceState = (typeof SERVICE_STATES)[keyof typeof SERVICE_STATES];
```

**Reglas de Transición:**
- PUBLICADO → EN_EVALUACION: Al recibir primera cotización
- EN_EVALUACION → ASIGNADO: Al seleccionar cotización
- ASIGNADO → COMPLETADO: Al finalizar servicio
- Solo PUBLICADO y EN_EVALUACION aceptan nuevas cotizaciones

### Categorías (src/constants/categories.ts)
```typescript
export const SERVICE_CATEGORIES = {
  JARDINERIA: 'jardineria',
  PISCINAS: 'piscinas',
  LIMPIEZA: 'limpieza',
  CONSTRUCCION: 'construccion',
  ELECTRICIDAD: 'electricidad',
  PLOMERIA: 'plomeria',
  PINTURA: 'pintura',
  OTROS: 'otros',
} as const;

export const SUPPLY_UNITS = {
  LITROS: 'lts',
  KILOGRAMOS: 'kg',
  UNIDAD: 'unidad',
  METROS_CUADRADOS: 'm²',
  SACOS: 'sacos',
  METROS: 'metros',
} as const;
```

---

## 🗂️ MODELO DE DATOS

### Usuario (src/types/models.ts)
```typescript
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  telefono?: string;
  ciudad?: string;
}
```

### Servicio
```typescript
export interface Servicio {
  id: string;
  solicitanteId: string;
  titulo: string;
  descripcion: string;
  categoria: ServiceCategory;
  direccion: string;
  ciudad: string;
  fechaPreferida: string; // ISO date
  insumosRequeridos: InsumoRequerido[];
  estado: ServiceState;
  cotizacionSeleccionadaId?: string;
  createdAt: string;
}

export interface InsumoRequerido {
  nombre: string;
  cantidad: number;
  unidad: SupplyUnit;
}
```

### Cotización
```typescript
export interface Cotizacion {
  id: string;
  serviceId: string;
  proveedorId: string;
  precio: number;
  plazoDias: number;
  detalle?: string;
  itemsIncluidos?: string[];
  itemsExcluidos?: string[];
  ratingProveedorMock?: number; // 1-5
  estado: 'ENVIADA' | 'ACEPTADA' | 'RECHAZADA' | 'RETIRADA';
  createdAt: string;
}
```

### Insumo en Catálogo
```typescript
export interface InsumoCatalogo {
  id: string;
  vendedorId: string;
  nombre: string;
  categoria: string;
  unidad: SupplyUnit;
  precioUnitario: number;
  stock: number;
  descripcion?: string;
}
```

### Oferta de Pack
```typescript
export interface OfertaInsumos {
  id: string;
  serviceId: string;
  vendedorId: string;
  items: {
    insumoId: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
  }[];
  precioTotal: number;
  notas?: string;
  createdAt: string;
}
```

---

## 🔐 AUTENTICACIÓN

### Usuarios Hardcodeados (src/data/hardcodedUsers.ts)

```typescript
export const HARDCODED_USERS: Usuario[] = [
  {
    id: 'user-1',
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    rol: ROLES.SOLICITANTE,
    telefono: '+598 99 123 456',
    ciudad: 'Montevideo',
  },
  {
    id: 'user-2',
    nombre: 'María González',
    email: 'maria@email.com',
    rol: ROLES.PROVEEDOR_SERVICIO,
    telefono: '+598 99 234 567',
    ciudad: 'Montevideo',
  },
  {
    id: 'user-3',
    nombre: 'Carlos Rodríguez',
    email: 'carlos@email.com',
    rol: ROLES.PROVEEDOR_INSUMOS,
    telefono: '+598 99 345 678',
    ciudad: 'Montevideo',
  },
  // ... más usuarios
];

export const HARDCODED_CREDENTIALS = [
  { email: 'juan@email.com', password: 'password123' },
  { email: 'maria@email.com', password: 'password123' },
  { email: 'carlos@email.com', password: 'password123' },
];
```

**Login:** Solo valida email + password contra lista fija.

---

## 🏗️ ARQUITECTURA DE ESTADO

### Context API + useReducer (OBLIGATORIO)

#### 1. AuthContext (src/contexts/AuthContext.tsx)
```typescript
interface AuthState {
  currentUser: Usuario | null;
  isAuthenticated: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: Usuario }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

// Hook de uso:
const { user, isAuthenticated, login, logout } = useAuth();
```

#### 2. ServicesContext (src/contexts/ServicesContext.tsx)
```typescript
interface ServicesState {
  services: Servicio[];
  quotes: Cotizacion[];
  supplyOffers: OfertaInsumos[];
}

type ServicesAction =
  | { type: 'ADD_SERVICE'; payload: Servicio }
  | { type: 'UPDATE_SERVICE_STATE'; payload: { serviceId: string; newState: ServiceState } }
  | { type: 'ADD_QUOTATION'; payload: Cotizacion }
  | { type: 'SELECT_QUOTATION'; payload: { serviceId: string; quoteId: string } }
  | { type: 'ADD_SUPPLY_OFFER'; payload: OfertaInsumos };

// Hook de uso:
const { services, quotes, addService, addQuotation, selectQuotation } = useServices();
```

**Regla Crítica:** Al agregar primera cotización, el servicio DEBE pasar de PUBLICADO → EN_EVALUACION automáticamente.

#### 3. InsumosContext (src/contexts/InsumosContext.tsx)
```typescript
interface InsumosState {
  catalog: InsumoCatalogo[];
  offers: OfertaInsumos[];
}

type InsumosAction =
  | { type: 'ADD_SUPPLY_TO_CATALOG'; payload: InsumoCatalogo }
  | { type: 'UPDATE_SUPPLY_IN_CATALOG'; payload: InsumoCatalogo }
  | { type: 'DELETE_SUPPLY_FROM_CATALOG'; payload: string }
  | { type: 'ADD_SUPPLY_OFFER'; payload: OfertaInsumos };

// Hook de uso:
const { catalog, addSupply, updateSupply, deleteSupply } = useInsumos();
```

#### AppProvider (src/contexts/AppProvider.tsx)
```typescript
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ServicesProvider>
        <InsumosProvider>
          {children}
        </InsumosProvider>
      </ServicesProvider>
    </AuthProvider>
  );
}
```

---

## 📱 COMPONENTES PRINCIPALES

### Por Rol

#### SOLICITANTE
1. **SolicitanteDashboard** - Lista de servicios propios
2. **PublicarServicio** - Form para crear servicio
3. **DetalleServicio** - Ver servicio + cotizaciones + ofertas
4. **Comparador** - Comparar cotizaciones (tabla/cards)

#### PROVEEDOR_SERVICIO
1. **ProveedorServicioDashboard** - Servicios disponibles
2. **EnviarCotizacion** - Form para cotizar
3. **MisCotizaciones** - Cotizaciones enviadas

#### PROVEEDOR_INSUMOS
1. **ProveedorInsumosDashboard** - Catálogo propio
2. **AgregarInsumo** - Form para agregar insumo
3. **OfrecerPack** - Form para ofrecer pack a servicio

#### COMPARTIDOS
- **Login** - Autenticación
- **Perfil** - Datos del usuario
- **BottomNav** - Navegación adaptada por rol

---

## 🔄 FLUJOS CLAVE

### 1. Publicar Servicio
```
Solicitante → PublicarServicio
  → Completa form (título, descripción, categoría, fecha, ubicación, insumos)
  → dispatch(ADD_SERVICE)
  → Estado inicial: PUBLICADO
  → Navegación: Dashboard
```

### 2. Cotizar Servicio
```
Proveedor Servicio → Ve servicio en Dashboard
  → EnviarCotizacion
  → Completa form (precio, plazo, detalles)
  → dispatch(ADD_QUOTATION)
  → IMPORTANTE: Si es primera cotización, servicio → EN_EVALUACION
```

### 3. Comparar y Seleccionar
```
Solicitante → DetalleServicio → Ver cotizaciones
  → Comparador (tabla comparativa)
  → Selecciona cotización
  → dispatch(SELECT_QUOTATION)
  → Servicio → ASIGNADO
  → Bloquea nuevas cotizaciones
```

### 4. Ofrecer Pack de Insumos
```
Proveedor Insumos → Ve servicio en Dashboard
  → OfrecerPack
  → Selecciona insumos de su catálogo
  → Define cantidades y precio total
  → dispatch(ADD_SUPPLY_OFFER)
```

---

## 🎨 UX Y VALIDACIONES

### Búsqueda y Filtros
- Categoría (dropdown)
- Ciudad (dropdown/search)
- Fecha (date picker)
- Estado del servicio (tabs)

### Validaciones
- ✅ Campos obligatorios
- ✅ Precio > 0
- ✅ Plazo > 0
- ✅ Fecha válida (no pasada)
- ✅ Stock suficiente en ofertas
- ✅ Email válido en login

### Feedback
- Toast/Snackbar para acciones exitosas
- Mensajes de error claros
- Loading states
- Empty states (sin servicios, sin cotizaciones)

### Estados Vacíos
```
"No hay servicios publicados aún"
"Este servicio no ha recibido cotizaciones"
"Tu catálogo está vacío, agrega insumos"
```

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
src/
├── constants/
│   ├── roles.ts              ✅ ROLES
│   ├── serviceStates.ts      ✅ SERVICE_STATES + helpers
│   └── categories.ts         ✅ SERVICE_CATEGORIES + SUPPLY_UNITS
├── types/
│   ├── index.ts              ✅ Re-exports
│   └── models.ts             ✅ Interfaces principales
├── data/
│   ├── hardcodedUsers.ts     ✅ Usuarios + auth
│   └── mockServices.ts       ✅ Servicios, cotizaciones, insumos
├── contexts/
│   ├── AuthContext.tsx       ✅ useReducer
│   ├── ServicesContext.tsx   ✅ useReducer
│   ├── InsumosContext.tsx    ✅ useReducer
│   ├── AppProvider.tsx       ✅ Wrapper
│   └── index.ts              ✅ Exports
├── Components/
│   ├── Login.tsx
│   ├── SolicitanteDashboard.tsx
│   ├── PublicarServicio.tsx
│   ├── DetalleServicio.tsx
│   ├── Comparador.tsx
│   ├── ProveedorServicioDashboard.tsx
│   ├── EnviarCotizacion.tsx
│   ├── MisCotizaciones.tsx
│   ├── ProveedorInsumosDashboard.tsx
│   ├── AgregarInsumo.tsx
│   ├── OfrecerPack.tsx
│   ├── Perfil.tsx
│   ├── BottomNav.tsx
│   └── ui/                   ✅ Shadcn components
├── App.jsx                   ✅ Router/navegación
└── index.js                  ✅ <AppProvider>
```

---

## ✅ ESTADO ACTUAL DE IMPLEMENTACIÓN

### ✅ COMPLETADO (Fase 1-3)

#### Fase 1: Constantes y Tipos
- ✅ `src/constants/roles.ts`
- ✅ `src/constants/serviceStates.ts`
- ✅ `src/constants/categories.ts`
- ✅ `src/types/models.ts`
- ✅ `src/types/index.ts`

#### Fase 2: Datos Mock
- ✅ `src/data/hardcodedUsers.ts` (6 usuarios, 3 roles)
- ✅ `src/data/mockServices.ts` (3 servicios, 3 cotizaciones, 6 insumos, 2 ofertas)

#### Fase 3: Contexts con useReducer
- ✅ `src/contexts/AuthContext.tsx`
- ✅ `src/contexts/ServicesContext.tsx`
- ✅ `src/contexts/InsumosContext.tsx`
- ✅ `src/contexts/AppProvider.tsx`
- ✅ `src/contexts/index.ts`
- ✅ `src/index.js` actualizado con `<AppProvider>`
- ✅ `src/App.jsx` migrado a nuevos contexts
- ✅ `src/Components/Login.tsx` migrado a nuevos contexts

### 🔄 PENDIENTE (Fase 4-5)

#### Fase 4: Migrar Componentes Restantes
- ⏳ `SolicitanteDashboard.tsx` → usar `useServices()`
- ⏳ `PublicarServicio.tsx` → usar `addService()`
- ⏳ `DetalleServicio.tsx` → usar `useServices()`
- ⏳ `Comparador.tsx` → usar `selectQuotation()`
- ⏳ `ProveedorServicioDashboard.tsx` → usar `useServices()`
- ⏳ `EnviarCotizacion.tsx` → usar `addQuotation()`
- ⏳ `MisCotizaciones.tsx` → usar `useServices()`
- ⏳ `ProveedorInsumosDashboard.tsx` → usar `useInsumos()`
- ⏳ `AgregarInsumo.tsx` → usar `addSupply()`
- ⏳ `OfrecerPack.tsx` → usar `addSupplyOffer()`
- ⏳ `Perfil.tsx` → usar `useAuth()`
- ⏳ `BottomNav.tsx` → actualizar tipos de rol

#### Fase 5: Testing y Refinamiento
- ⏳ Probar flujo completo por cada rol
- ⏳ Validar transiciones de estado
- ⏳ Verificar inmutabilidad en reducers
- ⏳ Ajustar UX según feedback
- ⏳ Eliminar archivos legacy (`src/Context/` viejo)

---

## 🚀 CÓMO CORRER EL PROYECTO

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm start
```

### Build
```bash
npm run build
```

---

## 🔑 CREDENCIALES DE PRUEBA

| Rol | Email | Password |
|-----|-------|----------|
| **Solicitante** | juan@email.com | password123 |
| **Solicitante** | ana@email.com | password123 |
| **Proveedor Servicio** | maria@email.com | password123 |
| **Proveedor Servicio** | pedro@email.com | password123 |
| **Proveedor Insumos** | carlos@email.com | password123 |
| **Proveedor Insumos** | lucia@email.com | password123 |

---

## 📝 REGLAS DE DESARROLLO

### 1. NUNCA usar strings hardcodeados para roles/estados
❌ MAL:
```typescript
if (user.rol === 'solicitante') { ... }
if (service.estado === 'PUBLICADO') { ... }
```

✅ BIEN:
```typescript
import { ROLES } from '../constants/roles';
import { SERVICE_STATES } from '../constants/serviceStates';

if (user.rol === ROLES.SOLICITANTE) { ... }
if (service.estado === SERVICE_STATES.PUBLICADO) { ... }
```

### 2. SIEMPRE usar dispatch en lugar de setState
❌ MAL:
```typescript
const [services, setServices] = useState([]);
setServices([...services, newService]);
```

✅ BIEN:
```typescript
const { addService } = useServices();
addService(newService);
```

### 3. INMUTABILIDAD en reducers
❌ MAL:
```typescript
state.services.push(action.payload);
state.services[0].estado = 'ASIGNADO';
```

✅ BIEN:
```typescript
return {
  ...state,
  services: [...state.services, action.payload]
};

return {
  ...state,
  services: state.services.map(s =>
    s.id === serviceId ? { ...s, estado: 'ASIGNADO' } : s
  )
};
```

### 4. Validar transiciones de estado
```typescript
import { isValidTransition } from '../constants/serviceStates';

if (!isValidTransition(currentState, newState)) {
  console.error('Transición de estado inválida');
  return state;
}
```

---

## 🎓 CRITERIOS DE EVALUACIÓN

1. ✅ **Código funcional** - Todo debe correr sin errores
2. ✅ **Context + Reducer** - Obligatorio, sin useState global
3. ✅ **Autenticación hardcodeada** - Login con lista fija
4. ✅ **Roles y permisos** - Render condicional correcto
5. ✅ **Flujo completo** - Publicar → Cotizar → Comparar → Seleccionar
6. ✅ **Estados del servicio** - Transiciones automáticas correctas
7. ✅ **Inmutabilidad** - Reducers sin mutaciones directas
8. ✅ **Validaciones** - Forms con validación básica
9. ✅ **UX** - Feedback, loading, empty states
10. ✅ **Defensa oral** - Entender y explicar el código

---

## 📚 REFERENCIAS RÁPIDAS

### Importar Contexts
```typescript
import { useAuth, useServices, useInsumos } from '../contexts';
```

### Importar Constantes
```typescript
import { ROLES } from '../constants/roles';
import { SERVICE_STATES } from '../constants/serviceStates';
import { SERVICE_CATEGORIES, SUPPLY_UNITS } from '../constants/categories';
```

### Importar Tipos
```typescript
import type { Usuario, Servicio, Cotizacion, InsumoCatalogo } from '../types/models';
```

### Importar Datos Mock
```typescript
import { HARDCODED_USERS } from '../data/hardcodedUsers';
import { MOCK_SERVICES, MOCK_QUOTES } from '../data/mockServices';
```

---

## ⚠️ NOTAS IMPORTANTES

1. **NO hay backend** - Todo en estado local/mocks
2. **Reducers son obligatorios** - No usar useState para estado global
3. **Constantes son la fuente de verdad** - Nunca hardcodear strings
4. **Transición automática** - Primera cotización → EN_EVALUACION
5. **Inmutabilidad estricta** - Siempre retornar nuevos objetos en reducers
6. **Render condicional** - UI debe adaptarse al rol del usuario
7. **Validar permisos** - Proveedores no editan servicios, solicitantes no editan insumos

---

**Última actualización:** Fase 3 completada - Contexts implementados y App/Login migrados
**Próximo paso:** Migrar componentes restantes a nuevos contexts

