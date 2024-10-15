import { User } from './user';
import { Team } from './team';
export interface Player {
    playerId: number;  // Identificador del jugador (debe coincidir con el UserId en Usuarios)
    teamId: number;    // Identificador del equipo (debe existir en Equipos)
    position: string;  // Posición en el equipo
  
    // Navegación
    user?: User;       // Relación uno a uno con User (opcional)
    team?: Team;       // Relación muchos a uno con Team (opcional)
  }