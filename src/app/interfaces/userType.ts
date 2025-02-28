import { User } from './user';
export interface UserType {
    userTypeId: number;        // Identificador único del tipo de usuario
    userTypeName: string;      // Nombre del tipo de usuario
  
    // Navegación
    users?: User[];            // Relación uno a muchos con usuarios
  }