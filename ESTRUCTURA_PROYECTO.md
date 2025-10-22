# Estructura del Proyecto - Marketplace Insumos y Servicios

## 📁 Estructura de Carpetas

```
marketplace-insumos-servicios/
├── public/                    # Archivos públicos (HTML, favicon, etc.)
│   └── index.html            # Plantilla HTML principal
├── src/                      # Código fuente de la aplicación
│   ├── Components/           # Componentes React
│   │   ├── ui/              # Componentes de interfaz reutilizables
│   │   ├── Login.tsx       # Pantalla de login
│   │   ├── SolicitanteDashboard.tsx
│   │   ├── ProveedorServicioDashboard.tsx
│   │   ├── ProveedorInsumosDashboard.tsx
│   │   └── ... (otros componentes)
│   ├── types/               # Definiciones de tipos TypeScript
│   │   └── index.ts
│   ├── styles/              # Archivos de estilos
│   │   └── globals.css      # Estilos globales con variables CSS
│   ├── App.js              # Componente principal de la aplicación
│   ├── index.js            # Punto de entrada de la aplicación
│   └── index.css           # Estilos base con Tailwind CSS
├── package.json             # Dependencias y scripts del proyecto
├── tailwind.config.js       # Configuración de Tailwind CSS
└── postcss.config.js       # Configuración de PostCSS
```

## 🎨 Sistema de Estilos

### ¿Por qué usar la carpeta `ui` en lugar de CSS normal?

La carpeta `ui` contiene **componentes de interfaz reutilizables** basados en **shadcn/ui**, que es un sistema de componentes moderno que combina:

1. **Radix UI** - Componentes accesibles y sin estilos
2. **Tailwind CSS** - Framework de utilidades CSS
3. **TypeScript** - Tipado estático para mejor desarrollo

### Ventajas del sistema actual:

- ✅ **Consistencia**: Todos los componentes tienen el mismo estilo
- ✅ **Accesibilidad**: Los componentes de Radix UI son accesibles por defecto
- ✅ **Reutilización**: Un componente se puede usar en toda la aplicación
- ✅ **Mantenimiento**: Cambios en un lugar afectan toda la app
- ✅ **Tipado**: TypeScript previene errores

### ¿Se puede usar CSS normal?

**Sí, pero no es recomendable** porque:
- ❌ Tendrías que escribir CSS desde cero
- ❌ Perderías la consistencia visual
- ❌ Tendrías que manejar la accesibilidad manualmente
- ❌ Sería más difícil mantener el código

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca principal para la interfaz
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de utilidades CSS
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos

### Herramientas de Desarrollo
- **React Scripts** - Herramientas de desarrollo y build
- **PostCSS** - Procesador de CSS
- **Autoprefixer** - Agrega prefijos CSS automáticamente

## 🚀 Cómo Funciona la Aplicación

### 1. Flujo de Navegación
```
Login → Dashboard (según rol) → Pantallas específicas
```

### 2. Roles de Usuario
- **Solicitante**: Publica servicios y busca proveedores
- **Proveedor de Servicios**: Ve servicios y envía cotizaciones
- **Proveedor de Insumos**: Gestiona catálogo de insumos

### 3. Estados Principales
- `currentScreen`: Pantalla actual de la aplicación
- `userRole`: Rol del usuario logueado
- `activeTab`: Pestaña activa en el dashboard
- `selectedServicio`: Servicio seleccionado para ver detalles

## 📝 Archivos que se pueden eliminar

### Archivos innecesarios:
- `src/App.css` - No se usa (se usa Tailwind + globals.css)
- `src/styles/globals.css` - Se puede integrar en index.css

### Archivos importantes:
- `src/Components/ui/` - **NO ELIMINAR** - Componentes base del sistema
- `src/types/index.ts` - **NO ELIMINAR** - Definiciones de tipos
- `tailwind.config.js` - **NO ELIMINAR** - Configuración de Tailwind

## 🎯 Próximos Pasos

1. **Comentar código** - Agregar explicaciones a los componentes
2. **Optimizar estructura** - Eliminar archivos innecesarios
3. **Agregar funcionalidad** - Implementar lógica de negocio
4. **Testing** - Agregar pruebas unitarias
5. **Deploy** - Configurar para producción
