import { Tournament } from './tournament';
import { Team } from './team';
import { MatchReferee } from './matchReferee';
export interface Match {
    matchId: number;           // Identificador del partido
    tournamentId: number;      // Identificador del torneo
    team1Id: number;           // Identificador del primer equipo
    team2Id: number;           // Identificador del segundo equipo
    date: Date;                // Fecha del partido
    score: string;             // Resultado del partido
  
    // Navegación
    tournament?: Tournament;   // Relación muchos a uno con Tournament (opcional)
    team1?: Team;              // Relación muchos a uno con Team (primer equipo, opcional)
    team2?: Team;              // Relación muchos a uno con Team (segundo equipo, opcional)
    matchReferees?: MatchReferee[]; // Relación uno a muchos con MatchReferees (opcional)
  }