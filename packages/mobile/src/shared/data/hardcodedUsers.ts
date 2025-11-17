/**
 * Usuarios Hardcodeados para Autenticación
 * Trabajo Práctico: Marketplace de Servicios con Insumos
 * 
 * IMPORTANTE: Estos usuarios son para desarrollo/demo únicamente
 */

import { User } from '../types/models.ts';
import { ROLES } from '../constants/roles.ts';

/**
 * Lista de usuarios del sistema (hardcodeados)
 */
export const HARDCODED_USERS: User[] = [
  {
    id: 'sol-001',
    nombre: 'Juan Pérez',
    email: 'solicitante@marketplace.com',
    password: 'solicitante123',
    rol: ROLES.SOLICITANTE,
  },
  {
    id: 'sol-002',
    nombre: 'María González',
    email: 'maria@marketplace.com',
    password: 'maria123',
    rol: ROLES.SOLICITANTE,
  },
  {
    id: 'prov-serv-001',
    nombre: 'Carlos Rodríguez',
    email: 'proveedor@marketplace.com',
    password: 'proveedor123',
    rol: ROLES.PROVEEDOR_SERVICIO,
  },
  {
    id: 'prov-serv-002',
    nombre: 'Ana García',
    email: 'ana@marketplace.com',
    password: 'ana123',
    rol: ROLES.PROVEEDOR_SERVICIO,
  },
  {
    id: 'prov-ins-001',
    nombre: 'Luis Martínez',
    email: 'insumos@marketplace.com',
    password: 'insumos123',
    rol: ROLES.PROVEEDOR_INSUMOS,
  },
  {
    id: 'prov-ins-002',
    nombre: 'Laura Fernández',
    email: 'laura@marketplace.com',
    password: 'laura123',
    rol: ROLES.PROVEEDOR_INSUMOS,
  },
];

/**
 * Busca un usuario por email y password
 * @returns Usuario si las credenciales son correctas, undefined si no
 */
export const authenticateUser = (
  email: string,
  password: string
): User | undefined => {
  return HARDCODED_USERS.find(
    (user) => user.email === email && user.password === password
  );
};

/**
 * Busca un usuario por ID
 */
export const getUserById = (id: string): User | undefined => {
  return HARDCODED_USERS.find((user) => user.id === id);
};

/**
 * Obtiene usuarios por rol
 */
export const getUsersByRole = (rol: string): User[] => {
  return HARDCODED_USERS.filter((user) => user.rol === rol);
};

/**
 * Credenciales de prueba para el README
 */
export const TEST_CREDENTIALS = `
CREDENCIALES DE PRUEBA:

Solicitantes:
- Email: solicitante@marketplace.com | Password: solicitante123
- Email: maria@marketplace.com | Password: maria123

Proveedores de Servicio:
- Email: proveedor@marketplace.com | Password: proveedor123
- Email: ana@marketplace.com | Password: ana123

Proveedores de Insumos:
- Email: insumos@marketplace.com | Password: insumos123
- Email: laura@marketplace.com | Password: laura123
`;

