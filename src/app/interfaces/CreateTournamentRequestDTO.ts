export interface CreateTournamentRequestDTO {
    tournamentName: string;
    startDate: Date;
    endDate: Date;
    tournamentTypeId: number;
}