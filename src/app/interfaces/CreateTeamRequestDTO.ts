export interface CreateTeamRequestDTO {
    TeamName: string;
    TournamentId?: number | null; // El TournamentId puede ser null o no proporcionado
  }