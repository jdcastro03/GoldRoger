import { Component, OnInit } from '@angular/core';
import { CoachService } from 'src/app/services/coach.service';
import { TournamentDTO } from 'src/app/interfaces/TournamentDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-tournament',
  templateUrl: './coach-tournament.component.html',
  styleUrls: ['./coach-tournament.component.css']
})
export class CoachTournamentComponent implements OnInit {
  tournaments: TournamentDTO[] = []; // Para almacenar los torneos
  isLoading = false;
  errorMessage = '';
  searchQuery: string = '';

  constructor(private coachService: CoachService, private router: Router) {}

  ngOnInit(): void {
    this.loadTournaments();
  }

  /**
   * Carga los torneos asociados al entrenador.
   */
  private loadTournaments(): void {
    this.isLoading = true;
    this.coachService.getTeamTournamentInfoByCoachId().subscribe(
      (tournament: TournamentDTO | null) => {
        this.isLoading = false;
        if (tournament) {
          this.tournaments = [tournament]; // Si hay un torneo, lo añadimos al arreglo
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'No tienes equipo';
        console.error(error);
      }
    );
  }

  getTournamentTypeName(typeId: number): string {
    switch (typeId) {
      case 1:
        return 'Liga';
      case 2:
        return 'Eliminatorias 8';
      case 3:
        return 'Eliminatorias 16';
      default:
        return 'Tipo desconocido'; // Opcional, para manejar valores inesperados
    }
  }
  navigateToTournamentDetail(tournamentId: number): void {
    this.router.navigate(['/tournament', tournamentId]);
    console.log('Navigating to tournament detail:', tournamentId);
  }
  clear() {
    this.searchQuery = '';
  }
}