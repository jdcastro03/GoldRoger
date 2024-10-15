import { Coach } from './coach';
import { Player } from './player';
export interface Team {
    teamId: number;        // Identificador del equipo
    teamName: string;      // Nombre del equipo
    coachId: number;       // Identificador del entrenador
  
    // Navegación
    coach?: Coach;         // Relación uno a uno con Coach (opcional)
    players?: Player[];    // Relación uno a muchos con Players (opcional)
  }