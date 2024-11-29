import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service'; // Cambia según tu estructura
import { TournamentDTO } from 'src/app/interfaces/TournamentDTO';
import { Player } from 'src/app/interfaces/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-tournament-page',
  templateUrl: './player-tournament-page.component.html',
  styleUrls: ['./player-tournament-page.component.css']
})
export class PlayerTournamentPageComponent implements OnInit {
  tournaments: TournamentDTO[] = []; // Almacena los torneos del jugador
  isLoading: boolean = true; // Indicador de carga
  errorMessage: string | null = null; // Mensaje de error
  

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments(): void {
    this.playerService.getPlayerTournaments().subscribe({
      next: (data) => {
        this.tournaments = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Hubo un problema al cargar los torneos';
        this.isLoading = false;
      }
    });
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
}