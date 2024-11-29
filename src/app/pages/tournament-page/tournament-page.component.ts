import { Component, OnInit } from '@angular/core';
import { CoachService } from 'src/app/services/coach.service';
import { TournamentDTO } from 'src/app/interfaces/TournamentDTO';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  currentUserType : number | null = null; // Tipo de usuario autenticado
  // Configuración de paginación
  pageSize = 3;
  pageIndex = 0;
  teamHasTournament: boolean = false; // Indica si el equipo ya tiene torneo

  constructor(private coachService: CoachService, private router: Router, private snackBar: MatSnackBar){}

  
  ngOnInit(): void {
    this.loadTournaments();

    const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        this.currentUserType = parsedUser.userType;
      }
      if (this.currentUserType === 4) {
        this.getTeamTournamentIdByCoachId();
      }
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
  navigateToTournamentDetail(tournamentId: number): void {
    this.router.navigate(['/tournament', tournamentId]);
    console.log('Navigating to tournament detail:', tournamentId);
  }
  //llama el metodo de getusertype de coachservice
 

  updateTournamentForTeam(tournamentId: number): void {
    this.coachService.updateTournamentForTeam(tournamentId).subscribe({
      next: (response) => {
        console.log('Torneo actualizado con éxito:', response);
        // Opcional: Puedes mostrar un mensaje de éxito al usuario
      this.snackBar.open('¡Te has inscrito en el torneo con éxito!', 'Cerrar', { duration: 3000 });
        this.teamHasTournament = true; // Ahora el equipo tiene torneo
      },
      error: (error) => {
        console.error('Error al actualizar el torneo:', error);
        // Opcional: Puedes mostrar un mensaje de error al usuario
       this.snackBar.open('No se pudo inscribir en el torneo. Intente nuevamente.', 'Cerrar', { duration: 3000 });
      },
    });
  }

  getTeamTournamentIdByCoachId(): void {
    this.coachService.getTeamTournamentIdByCoachId().subscribe({
      next: (tournamentId) => {
        this.teamHasTournament = tournamentId !== null; // Si el equipo ya tiene torneo
      },
      error: (error) => {
        console.error('Error al obtener el torneo del equipo:', error);

      },
    });
  }
}