export interface TournamentInfoDTO {
    tournamentId: number;  // ID del torneo
    tournamentName: string; // Nombre del torneo
    startDate: Date;      // Fecha de inicio (en formato string o ISO 8601)
    endDate: Date;        // Fecha de finalización (en formato string o ISO 8601)
    tournamentTypeId: number; // ID del tipo de torneo
}