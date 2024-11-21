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
  teams: { teamName: string; coachUsername: string; teamId: number }[] = []; // Ahora incluye teamId
  filteredTeams: { teamName: string; coachUsername: string; teamId: number }[] = []; // Equipos filtrados por búsqueda
  paginatedTeams: { teamName: string; coachUsername: string; teamId: number }[] = []; // Equipos paginados
  isLoading: boolean = true; // Indicador de carga
  errorMessage: string = ''; // Para mostrar errores en la interfaz

  // Variables de búsqueda
  searchQuery: string = ''; // Consulta de búsqueda

  // Variables de paginación
  pageSize: number = 3; // Número de elementos por página
  currentPage: number = 0; // Página actual

  constructor(private playerService: PlayerService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.playerService.getAllTeams().subscribe({
      next: (response: APIResponse<{ teamName: string; coachUsername: string; teamId: number }[]>) => {
        if (response.success && response.data) {
          this.teams = response.data; // Asigna los datos obtenidos, ahora incluye teamId
          this.filteredTeams = [...this.teams]; // Inicializa los equipos filtrados
          this.updatePaginatedTeams(); // Actualiza los equipos paginados
        } else {
          this.errorMessage = response.message || 'No se pudieron cargar los equipos. Intente nuevamente.'; // Usar el mensaje de error de la API
        }
        this.isLoading = false; // Desactiva el indicador de carga
      },
      error: (error) => {
        console.error('Error al cargar los equipos:', error);
        this.errorMessage = 'No se pudieron cargar los equipos. Intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.filteredTeams = this.teams.filter((team) =>
      team.teamName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      team.coachUsername.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 0; // Reinicia la página actual
    this.updatePaginatedTeams(); // Actualiza los equipos paginados
  }

  clearSearch(): void {
    this.searchQuery = ''; // Limpia la consulta de búsqueda
    this.filteredTeams = [...this.teams]; // Restablece los equipos filtrados
    this.updatePaginatedTeams(); // Actualiza los equipos paginados
  }

  updatePaginatedTeams(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTeams = this.filteredTeams.slice(startIndex, endIndex); // Actualiza los equipos para la página actual
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // Actualiza la página actual
    this.pageSize = event.pageSize; // Actualiza el tamaño de página
    this.updatePaginatedTeams(); // Refresca los datos paginados
  }

  joinTeam(teamId: number): void {
    this.playerService.updatePlayerTeam(teamId).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('¡Te has unido al equipo con éxito!', 'Cerrar', {
            duration: 3000,
          });
        } else {
          this.snackBar.open(`Error: ${response.message}`, 'Cerrar', {
            duration: 3000,
          });
        }
      },
      error: (error) => {
        console.error('Error al unirse al equipo:', error);
        this.snackBar.open('No se pudo unir al equipo. Intente nuevamente.', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
 
}