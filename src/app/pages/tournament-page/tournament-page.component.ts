import { Component, OnInit } from '@angular/core';
import { CoachService } from 'src/app/services/coach.service';
import { TournamentDTO } from 'src/app/interfaces/TournamentDTO';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css'],
})
export class TournamentPageComponent implements OnInit {
  tournaments: TournamentDTO[] = []; // Lista de todos los torneos
  filteredTournaments: TournamentDTO[] = []; // Lista filtrada
  paginatedTournaments: TournamentDTO[] = []; // Lista paginada
  isLoading = true;
  errorMessage = '';
  searchQuery: string = '';

  // Configuración de paginación
  pageSize = 5;
  pageIndex = 0;

  constructor(private coachService: CoachService) {}

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments(): void {
    this.coachService.getAllTournaments().subscribe({
      next: (data) => {
        this.tournaments = data;
        this.filteredTournaments = data; // Inicialmente muestra todos los torneos
        this.updatePaginatedTournaments();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar torneos:', err);
        this.errorMessage = 'No se pudieron cargar los torneos';
        this.isLoading = false;
      },
    });
  }

  // Filtra los torneos según la búsqueda
  filterTournaments(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredTournaments = this.tournaments;
    } else {
      this.filteredTournaments = this.tournaments.filter((tournament) =>
        tournament.tournamentName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        tournament.organizerUsername
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
    this.pageIndex = 0; // Reinicia a la primera página al filtrar
    this.updatePaginatedTournaments();
  }

  // Limpia la búsqueda
  clearSearch(): void {
    this.searchQuery = '';
    this.filterTournaments();
  }

  // Maneja el cambio de página
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedTournaments();
  }

  // Actualiza la lista paginada según la página actual y el tamaño de página
  updatePaginatedTournaments(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTournaments = this.filteredTournaments.slice(
      startIndex,
      endIndex
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
}