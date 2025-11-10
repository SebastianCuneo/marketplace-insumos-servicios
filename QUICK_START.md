# ⚡ Quick Start - Marketplace Monorepo

## 🚀 Instalación (Una sola vez)

```bash
yarn install
```

Esto instalará las dependencias de los 3 paquetes: `shared`, `web` y `mobile`.

---

## 🌐 Correr Web

```bash
yarn web
```

Abre `http://localhost:3000` en tu navegador.

---

## 📱 Correr Mobile

```bash
yarn mobile
```

**Opciones:**
1. **Expo Go (Recomendado):**
   - Descarga "Expo Go" app en tu teléfono
   - Escanea el QR code

2. **Emulador:**
   - Android: Presiona `a` en la terminal
   - iOS (macOS only): Presiona `i` en la terminal

---

## 🔑 Login Credentials

### Solicitante
```
Email: solicitante@marketplace.com
Password: solicitante123
```

### Proveedor de Servicio
```
Email: proveedor@marketplace.com
Password: proveedor123
```

### Proveedor de Insumos
```
Email: insumos@marketplace.com
Password: insumos123
```

---

## 📁 Estructura Importante

```
packages/
├── shared/      # Código compartido (Contexts, Types, Constants)
├── web/         # React.js app
└── mobile/      # React Native + Expo app
```

---

## 🛠️ Comandos Útiles

```bash
# Instalar dependencias
yarn install

# Correr web
yarn web

# Correr mobile
yarn mobile

# Build web
yarn web:build

# Limpiar todo y reinstalar
rm -rf node_modules packages/*/node_modules
yarn install
```

---

## 📖 Documentación Completa

- **README.md** - Documentación detallada
- **MONOREPO_SETUP.md** - Detalles de la migración

---

## ⚠️ Troubleshooting

### "Cannot find module @marketplace/shared"

```bash
yarn install
```

### Web no inicia

```bash
cd packages/web
rm -rf node_modules
yarn install
yarn start
```

### Mobile no conecta

- Verifica misma red WiFi
- Usa modo Tunnel: Presiona `t` en la terminal de Expo

---

## ✅ Testing Rápido

1. **Instalar:** `yarn install`
2. **Web:** `yarn web` → Login con `solicitante@marketplace.com` / `solicitante123`
3. **Mobile:** `yarn mobile` → Expo Go → Escanear QR → Login

¡Listo! 🎉

