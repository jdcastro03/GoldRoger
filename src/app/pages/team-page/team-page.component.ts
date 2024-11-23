import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { PageEvent } from '@angular/material/paginator';
import { APIResponse } from 'src/app/interfaces/APIResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {
  teams: { teamName: string; coachUsername: string; teamId: number }[] = []; // Equipos con teamId
  filteredTeams: { teamName: string; coachUsername: string; teamId: number }[] = [];
  paginatedTeams: { teamName: string; coachUsername: string; teamId: number }[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  searchQuery: string = '';
  pageSize: number = 3;
  currentPage: number = 0;
  playerHasTeam: boolean = false; // Indica si el jugador ya tiene equipo

  constructor(private playerService: PlayerService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTeams();
    this.checkPlayerTeam(); // Verifica si el jugador tiene equipo
  }

  loadTeams(): void {
    this.playerService.getAllTeams().subscribe({
      next: (response: APIResponse<{ teamName: string; coachUsername: string; teamId: number }[]>) => {
        if (response.success && response.data) {
          this.teams = response.data;
          this.filteredTeams = [...this.teams];
          this.updatePaginatedTeams();
        } else {
          this.errorMessage = response.message || 'No se pudieron cargar los equipos. Intente nuevamente.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los equipos:', error);
        this.errorMessage = 'No se pudieron cargar los equipos. Intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  checkPlayerTeam(): void {
    this.playerService.getPlayerTeamId().subscribe({
      next: (teamId) => {
        this.playerHasTeam = teamId !== null; // Si el jugador ya tiene equipo
        if (this.playerHasTeam) {
          this.snackBar.open('Ya tienes un equipo asignado.', 'Cerrar', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('Error al obtener el equipo del jugador:', error);
        this.snackBar.open('No se pudo obtener el equipo del jugador.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onSearch(): void {
    this.filteredTeams = this.teams.filter((team) =>
      team.teamName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      team.coachUsername.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 0;
    this.updatePaginatedTeams();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredTeams = [...this.teams];
    this.updatePaginatedTeams();
  }

  updatePaginatedTeams(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTeams = this.filteredTeams.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedTeams();
  }

  joinTeam(teamId: number): void {
    this.playerService.updatePlayerTeam(teamId).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('¡Te has unido al equipo con éxito!', 'Cerrar', { duration: 3000 });
          this.playerHasTeam = true; // Ahora el jugador tiene equipo
        } else {
          this.snackBar.open(`Error: ${response.message}`, 'Cerrar', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('Error al unirse al equipo:', error);
        this.snackBar.open('No se pudo unir al equipo. Intente nuevamente.', 'Cerrar', { duration: 3000 });
      }
    });
  }
}