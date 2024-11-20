export interface TournamentDTO {
    tournamentId: number;         // Identificador del torneo
    tournamentName: string;       // Nombre del torneo
    startDate: Date;              // Fecha de inicio
    endDate: Date;                // Fecha de finalización
    tournamentTypeId: number;     // Identificador del tipo de torneo
    organizerUsername:String;
}