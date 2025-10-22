export type UserRole = 'solicitante' | 'proveedor-servicio' | 'proveedor-insumos';

export type EstadoServicio = 'publicado' | 'asignado' | 'completado' | 'borrador';
export type EstadoCotizacion = 'enviada' | 'retirada' | 'aceptada';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  telefono?: string;
  rating?: number;
}

export interface Insumo {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
}

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  direccion: string;
  ciudad: string;
  fecha: string;
  categoria: string;
  estado: EstadoServicio;
  insumos: Insumo[];
  solicitanteId: string;
  cotizaciones?: Cotizacion[];
  ofertas?: OfertaInsumos[];
  cotizacionSeleccionada?: string;
}

export interface Cotizacion {
  id: string;
  servicioId: string;
  proveedorId: string;
  proveedorNombre: string;
  proveedorRating: number;
  precio: number;
  plazo: string;
  notas: string;
  itemsIncluidos: string[];
  itemsExcluidos: string[];
  estado: EstadoCotizacion;
  fechaEnvio: string;
}

export interface InsumosCatalogo {
  id: string;
  nombre: string;
  categoria: string;
  unidad: string;
  precioUnitario: number;
  stock: number;
  proveedorId: string;
}

export interface OfertaInsumos {
  id: string;
  servicioId: string;
  proveedorId: string;
  proveedorNombre: string;
  items: {
    insumoId: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
  total: number;
  notas: string;
  fechaEnvio: string;
}
