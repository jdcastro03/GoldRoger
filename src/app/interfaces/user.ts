import { Coach } from './coach';
import { Organizer } from './organizer';
import { Player } from './player';
import { Referee } from './referee';
import { UserType } from './userType';
import { UserPermission } from './userPermission';

export interface User {
  userId: number;           // Identificador único del usuario
  username: string;         // Nombre de usuario
  passwordHash: string;     // Contraseña encriptada
  email: string;            // Correo electrónico
  firstName: string;        // Nombre
  lastName: string;         // Apellido
  userType: number;         // Tipo de usuario (Jugador, Árbitro, Organizador, Entrenador)

  // Navegación
  userTypeNavigation?: UserType;    // Referencia a la entidad de tipo de usuario
  coaches?: Coach;                 // Relación uno a uno con Coaches
  players?: Player;                // Relación uno a uno con Players
  organizers?: Organizer;          // Relación uno a uno con Organizers
  referees?: Referee;              // Relación uno a uno con Referees

  userPermission?: UserPermission[];  // Lista de permisos del usuario

  jwToken?: string;                 // Token JWT (no mapeado en la base de datos)
}