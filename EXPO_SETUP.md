# 📱 Guía de Setup con Expo Go

Esta guía te muestra cómo probar la app mobile en tu teléfono usando **Expo Go**.

---

## 📲 Paso 1: Descargar Expo Go

### iOS (iPhone/iPad):
1. Abre **App Store**
2. Busca "Expo Go"
3. Descarga e instala la app

### Android:
1. Abre **Google Play Store**
2. Busca "Expo Go"
3. Descarga e instala la app

---

## 💻 Paso 2: Iniciar el Servidor de Desarrollo

En tu computadora, abre la terminal en la carpeta del proyecto y ejecuta:

```bash
yarn mobile
```

O alternativamente:

```bash
cd packages/mobile
yarn start
```

Verás algo como esto:

```
› Metro waiting on exp://192.168.1.100:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press o │ open project code in your editor

› Press ? │ show all commands

Logs for your project will appear below.
```

---

## 📸 Paso 3: Escanear el QR Code

### iPhone (iOS):
1. Abre la app **Cámara** (nativa de iOS)
2. Apunta al QR code en la terminal
3. Tap en la notificación que aparece
4. Se abrirá automáticamente en **Expo Go**

### Android:
1. Abre la app **Expo Go**
2. Tap en "Scan QR Code"
3. Apunta al QR code en la terminal
4. La app se cargará automáticamente

---

## 🔄 Paso 4: Esperar la Compilación

La primera vez tomará ~30-60 segundos mientras se compila el JavaScript bundle.

Verás una pantalla de carga con el logo de Expo.

---

## ✅ Paso 5: ¡App Lista!

Deberías ver la pantalla de **Login** con:
- Logo del marketplace
- Campos de email y password
- Credenciales de prueba al fondo

**Usa estas credenciales para entrar:**

```
Email: solicitante@marketplace.com
Password: solicitante123
```

---

## 🎮 Controles durante el Desarrollo

### Hot Reload:
- Los cambios en el código se reflejan **automáticamente**
- No necesitas recargar manualmente

### Reload Manual:
- **Sacude tu teléfono** (shake gesture)
- O presiona `r` en la terminal

### Abrir Menu de Desarrollo:
- **Sacude tu teléfono**
- Aparecerá un menú con opciones:
  - Reload
  - Debug Remote JS
  - Show Performance Monitor
  - Enable Fast Refresh

---

## 🌐 Conectividad

### ⚠️ Importante: Misma Red WiFi

Tu teléfono y tu computadora **DEBEN estar en la misma red WiFi**.

Si no funciona:

1. **Modo Tunnel (Más lento pero más compatible):**
   ```bash
   yarn mobile
   # Presiona 't' en la terminal
   ```

2. **Verificar IP:**
   - La terminal muestra la IP: `exp://192.168.1.100:8081`
   - Verifica que sea tu IP local correcta

3. **Firewall:**
   - Asegúrate de que el firewall de tu PC permita conexiones en el puerto 8081

---

## 🔐 Credenciales de Prueba

### Solicitante (Publica servicios):
```
Email: solicitante@marketplace.com
Password: solicitante123
```

**Verás:**
- Tab "Servicios": Lista de tus servicios
- Tab "Publicar": Form para publicar nuevo servicio
- Tab "Perfil": Tu información

### Proveedor de Servicio (Envía cotizaciones):
```
Email: proveedor@marketplace.com
Password: proveedor123
```

**Verás:**
- Tab "Servicios": Servicios disponibles
- Tab "Cotizaciones": Tus cotizaciones enviadas
- Tab "Perfil": Tu información

### Proveedor de Insumos (Vende materiales):
```
Email: insumos@marketplace.com
Password: insumos123
```

**Verás:**
- Tab "Catálogo": Tus insumos
- Tab "Perfil": Tu información

---

## 🎨 Pantallas Implementadas

### 1. Login Screen
- Input de email
- Input de password (con toggle de visibilidad)
- Botón de login
- Card con credenciales de prueba

### 2. Home Screen (Servicios)
- Lista de servicios (según rol)
- Badges de estado (Publicado, Asignado, etc.)
- Información: ciudad, fecha, insumos
- Botón "Ver Detalle" (en cada card)
- Pull to refresh

### 3. Publish Service Screen (Solo Solicitante)
- Form completo para publicar servicio:
  - Título
  - Descripción
  - Categoría (dropdown)
  - Fecha
  - Dirección
  - Ciudad
  - Lista de insumos (agregar/eliminar)
- Botón "Publicar Servicio"

### 4. My Quotes Screen (Solo Proveedor Servicio)
- Lista de tus cotizaciones enviadas
- Estado de cada cotización
- Precio y plazo

### 5. Profile Screen (Todos)
- Avatar con iniciales
- Nombre del usuario
- Email
- Teléfono
- Rating
- Botón "Cerrar Sesión"

### 6. Catalog Screen (Solo Proveedor Insumos)
- Lista de insumos en tu catálogo
- Precio por unidad
- Stock disponible
- FAB para agregar nuevo insumo

---

## 🐛 Troubleshooting Común

### "Unable to resolve module"

```bash
# En la terminal de tu PC:
Ctrl + C  (detener el servidor)
yarn install
yarn mobile
```

### App se congela o crashea

1. Sacude el teléfono
2. Selecciona "Reload"
3. Si persiste, cierra Expo Go y vuelve a escanear el QR

### QR Code no se escanea

**iOS:**
- Asegúrate de usar la app Cámara nativa (no Expo Go)
- Acerca el teléfono al QR

**Android:**
- Abre Expo Go primero
- Usa el botón "Scan QR Code" dentro de la app

### "Network response timed out"

1. Verifica misma red WiFi
2. Cambia a modo Tunnel:
   ```bash
   # Presiona 't' en la terminal
   ```
3. Desactiva VPN si tienes una activa
4. Verifica firewall de Windows:
   - Busca "Firewall de Windows Defender"
   - Permite Node.js en redes privadas

---

## 📊 Logs y Debugging

### Ver Logs en la Terminal:

Todos los `console.log()` de la app aparecen en la terminal de tu PC.

```javascript
// En cualquier screen:
console.log('Usuario actual:', user);
console.log('Servicios:', services);
```

### React DevTools:

```bash
# En otra terminal:
npx react-devtools
```

Luego sacude el teléfono → "Open React DevTools"

---

## 🚀 Workflow de Desarrollo Recomendado

1. **Iniciar servidor:**
   ```bash
   yarn mobile
   ```

2. **Abrir en Expo Go** (una sola vez)

3. **Editar código** en tu editor favorito

4. **Ver cambios automáticamente** en el teléfono (Hot Reload)

5. **Si algo falla:**
   - Presiona `r` en la terminal para reload
   - O sacude el teléfono → Reload

6. **Cerrar servidor:**
   - `Ctrl + C` en la terminal

---

## 💡 Tips Útiles

### Hot Reload Inteligente:
- **Fast Refresh** está habilitado por defecto
- Cambios en componentes → Reload instantáneo SIN perder estado
- Cambios en navegación → Reload completo

### Desarrollo Multi-Dispositivo:
- Puedes escanear el mismo QR en múltiples teléfonos
- Todos verán los cambios simultáneamente

### Testing en iOS y Android:
- Expo Go funciona igual en ambos
- Prueba en ambas plataformas si es posible

### Performance:
- Modo "Production" para testing de performance:
  ```bash
  expo start --no-dev --minify
  ```

---

## 📦 Construir APK/IPA (Opcional)

Si quieres generar un archivo instalable:

### Android (APK):
```bash
cd packages/mobile
eas build --platform android --profile preview
```

### iOS (IPA - requiere cuenta de Apple Developer):
```bash
cd packages/mobile
eas build --platform ios --profile preview
```

**Nota:** Necesitas configurar Expo Application Services (EAS) primero.

---

## ✅ Checklist de Testing

Cuando pruebes la app, verifica:

- [ ] Login funciona con las 3 credenciales
- [ ] Dashboard muestra servicios según rol
- [ ] Tabs de navegación aparecen correctamente
- [ ] Form de publicar servicio funciona
- [ ] Puedes agregar/eliminar insumos
- [ ] Perfil muestra información del usuario
- [ ] Logout regresa a pantalla de login
- [ ] Pull to refresh funciona en listas
- [ ] Hot reload funciona al editar código

---

## 🎓 Recursos Adicionales

- **Expo Docs:** https://docs.expo.dev/
- **React Navigation:** https://reactnavigation.org/
- **React Native Paper:** https://callstack.github.io/react-native-paper/
- **Troubleshooting Expo:** https://docs.expo.dev/troubleshooting/overview/

---

## 🎉 ¡Todo Listo!

Ahora tienes la app mobile funcionando en tu teléfono. Puedes:
- Probar todas las funcionalidades
- Editar código y ver cambios al instante
- Testear en dispositivo real (mejor que emulador)
- Mostrar el proyecto a tu profesor/PM

**¡Disfruta desarrollando!** 📱🚀

