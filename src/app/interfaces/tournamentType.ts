import { Tournament } from './tournament';
export interface TournamentType {
    tournamentTypeId: number;        // Identificador del tipo de torneo
    tournamentTypeName: string;      // Nombre del tipo de torneo
  
    // Navegación
    tournaments?: Tournament[];      // Relación uno a muchos con torneos
  }