import { User } from './user';
import { Tournament } from './tournament';
export interface Organizer {
    organizerId: number;      // Identificador del organizador (debe coincidir con el UserId en Usuarios)
    organizationName: string;  // Nombre de la organización
  
    // Navegación
    user?: User;              // Relación uno a uno con User (opcional)
    tournaments?: Tournament[]; // Relación uno a muchos con Tournaments (opcional)
  }