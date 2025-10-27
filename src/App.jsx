// Importaciones principales de React y componentes
import { useState } from 'react';
// Componente para mostrar notificaciones toast
import { Toaster } from './Components/ui/sonner.tsx';
// Componentes de las diferentes pantallas de la aplicación
import { Login } from './Components/Login.tsx';
import { SolicitanteDashboard } from './Components/SolicitanteDashboard.tsx';
import { PublicarServicio } from './Components/PublicarServicio.tsx';
import { DetalleServicio } from './Components/DetalleServicio.tsx';
import { Comparador } from './Components/Comparador.tsx';
import { ProveedorServicioDashboard } from './Components/ProveedorServicioDashboard.tsx';
import { EnviarCotizacion } from './Components/EnviarCotizacion.tsx';
import { MisCotizaciones } from './Components/MisCotizaciones.tsx';
import { ProveedorInsumosDashboard } from './Components/ProveedorInsumosDashboard.tsx';
import { AgregarInsumo } from './Components/AgregarInsumo.tsx';
import { OfrecerPack } from './Components/OfrecerPack.tsx';
import { BottomNav } from './Components/BottomNav.tsx';
import { Perfil } from './Components/Perfil.tsx';
// Tipos de TypeScript para definir la estructura de datos
import { UserRole, Servicio } from './types/index.ts';
import { AuthProvider } from './Context/AuthContext.tsx';

// Definición de todas las pantallas posibles en la aplicación
// type Screen = 'login' | 'dashboard' | 'publicar-servicio' | 'detalle-servicio' | 'comparador' | 'enviar-cotizacion' | 'mis-cotizaciones' | 'agregar-insumo' | 'ofrecer-pack' | 'perfil';

export default function App() {
  // Estados principales de la aplicación
  const [currentScreen, setCurrentScreen] = useState('login'); // Pantalla actual
  const [userRole, setUserRole] = useState('solicitante'); // Rol del usuario
  const [activeTab, setActiveTab] = useState('servicios'); // Pestaña activa en el dashboard
  const [selectedServicio, setSelectedServicio] = useState(null); // Servicio seleccionado

  // Función para manejar el login del usuario
  const handleLogin = (role) => {
    setUserRole(role); // Establece el rol del usuario
    setCurrentScreen('dashboard'); // Va al dashboard principal
    // Configura la pestaña inicial según el rol
    if (role === 'proveedor-insumos') {
      setActiveTab('catalogo'); // Los proveedores de insumos ven el catálogo
    } else {
      setActiveTab('servicios'); // Otros roles ven servicios
    }
  };

  // Función para manejar el logout del usuario
  const handleLogout = () => {
    setCurrentScreen('login'); // Regresa a la pantalla de login
    setUserRole('solicitante'); // Resetea el rol
    setActiveTab('servicios'); // Resetea la pestaña activa
    setSelectedServicio(null); // Limpia el servicio seleccionado
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Handle navigation based on role and tab
    if (userRole === 'solicitante') {
      switch (tab) {
        case 'servicios':
          setCurrentScreen('dashboard');
          break;
        case 'publicar':
          setCurrentScreen('publicar-servicio');
          break;
        case 'perfil':
          setCurrentScreen('perfil');
          break;
      }
    } else if (userRole === 'proveedor-servicio') {
      switch (tab) {
        case 'servicios':
          setCurrentScreen('dashboard');
          break;
        case 'cotizaciones':
          setCurrentScreen('mis-cotizaciones');
          break;
        case 'perfil':
          setCurrentScreen('perfil');
          break;
      }
    } else if (userRole === 'proveedor-insumos') {
      switch (tab) {
        case 'catalogo':
          setCurrentScreen('dashboard');
          break;
        case 'ofertas':
          // Could add a screen for offers
          setCurrentScreen('dashboard');
          break;
        case 'perfil':
          setCurrentScreen('perfil');
          break;
      }
    }
  };

  const handleVerDetalle = (servicio) => {
    setSelectedServicio(servicio);
    setCurrentScreen('detalle-servicio');
  };

  const handleComparar = () => {
    setCurrentScreen('comparador');
  };

  const handleEnviarCotizacion = (servicio) => {
    setSelectedServicio(servicio);
    setCurrentScreen('enviar-cotizacion');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onLogin={handleLogin} />;

      case 'dashboard':
        if (userRole === 'solicitante') {
          return (
            <SolicitanteDashboard
              onPublicarServicio={() => setCurrentScreen('publicar-servicio')}
              onVerDetalle={handleVerDetalle}
            />
          );
        } else if (userRole === 'proveedor-servicio') {
          return (
            <ProveedorServicioDashboard
              onVerServicio={handleVerDetalle}
              onEnviarCotizacion={handleEnviarCotizacion}
              onVerMisCotizaciones={() => setCurrentScreen('mis-cotizaciones')}
            />
          );
        } else {
          return (
            <ProveedorInsumosDashboard
              onAgregarInsumo={() => setCurrentScreen('agregar-insumo')}
              onOfrecerPack={() => setCurrentScreen('ofrecer-pack')}
            />
          );
        }

      case 'publicar-servicio':
        return (
          <PublicarServicio
            onVolver={() => {
              setCurrentScreen('dashboard');
              setActiveTab('servicios');
            }}
          />
        );

      case 'detalle-servicio':
        return selectedServicio ? (
          <DetalleServicio
            servicio={selectedServicio}
            onVolver={() => setCurrentScreen('dashboard')}
            onComparar={userRole === 'solicitante' ? handleComparar : undefined}
          />
        ) : null;

      case 'comparador':
        return selectedServicio ? (
          <Comparador
            servicio={selectedServicio}
            onVolver={() => setCurrentScreen('detalle-servicio')}
          />
        ) : null;

      case 'enviar-cotizacion':
        return selectedServicio ? (
          <EnviarCotizacion
            servicio={selectedServicio}
            onVolver={() => setCurrentScreen('dashboard')}
          />
        ) : null;

      case 'mis-cotizaciones':
        return (
          <MisCotizaciones
            onVolver={() => {
              setCurrentScreen('dashboard');
              setActiveTab('servicios');
            }}
          />
        );

      case 'agregar-insumo':
        return (
          <AgregarInsumo
            onVolver={() => {
              setCurrentScreen('dashboard');
              setActiveTab('catalogo');
            }}
          />
        );

      case 'ofrecer-pack':
        return (
          <OfrecerPack
            onVolver={() => {
              setCurrentScreen('dashboard');
              setActiveTab('catalogo');
            }}
          />
        );

      case 'perfil':
        return (
          <Perfil
            role={userRole}
            onLogout={handleLogout}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
      
      {currentScreen !== 'login' && (
        <BottomNav
          role={userRole}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}
