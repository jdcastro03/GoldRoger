import { Team } from './team';
export interface TeamStats {
    teamId: number;        // Identificador del equipo
    goalsFor: number;      // Goles a favor
    goalsAgainst: number;  // Goles en contra
  
    // Relación
    team?: Team;           // Relación con la entidad Team (opcional)
  }