import { Match } from './match';
import { Referee } from './referee';
export interface MatchReferee {
    matchId: number;    // Identificador del partido
    refereeId: number;  // Identificador del árbitro
  
    // Navegación
    match?: Match;      // Relación muchos a uno con Match (opcional)
    referee?: Referee;  // Relación muchos a uno con Referee (opcional)
  }