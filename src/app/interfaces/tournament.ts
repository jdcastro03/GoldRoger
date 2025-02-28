import { TournamentType } from "./tournamentType";
import { Organizer } from "./organizer";
import { Match } from "./match";
export interface Tournament {
    tournamentId: number;         // Identificador del torneo
    organizerId: number;          // Identificador del organizador
    tournamentName: string;       // Nombre del torneo
    startDate: Date;              // Fecha de inicio
    endDate: Date;                // Fecha de finalización
    tournamentTypeId: number;     // Identificador del tipo de torneo
  
    // Navegación
    organizer?: Organizer;        // Relación muchos a uno con Organizer
    tournamentType?: TournamentType;  // Relación muchos a uno con TournamentType
    matches?: Match[];            // Relación uno a muchos con Matches
  }