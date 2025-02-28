import { User } from './user';
import { Permission } from './permission';
export interface UserPermission {
    id: number;               // Identificador único del permiso del usuario
    userId: number;          // Identificador del usuario
    permissionId: number;    // Identificador del permiso
  
    // Navegación
    user?: User;             // Relación uno a uno con User (opcional)
    permission?: Permission;  // Relación uno a uno con Permission (opcional)
  }