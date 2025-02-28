import { User } from './user';
import { MatchReferee } from './matchReferee';
export interface Referee {
    refereeId: number;              // Identificador del árbitro
    licenseNumber: string;          // Número de licencia
  
    // Navegación
    user?: User;                    // Relación uno a uno con User (opcional)
    matchReferees?: MatchReferee[]; // Relación uno a muchos con MatchReferees (opcional)
  }