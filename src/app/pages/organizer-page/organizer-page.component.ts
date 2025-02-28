import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrganizerService } from 'src/app/services/organizer.service';
import { TournamentInfoDTO } from 'src/app/interfaces/TournamentInfoDTO';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-organizer-page',
  templateUrl: './organizer-page.component.html',
  styleUrls: ['./organizer-page.component.css']
})
export class OrganizerPageComponent implements OnInit, AfterViewInit {
  showForm = false;
  tournaments: TournamentInfoDTO[] = [];
  filteredTournaments: TournamentInfoDTO[] = [];
  paginatedTournaments: TournamentInfoDTO[] = [];
  tournamentTypes: { [key: number]: string } = { 
    1: 'Liga', 
    2: 'Eliminatoria 8', 
    3: 'Eliminatoria 16', 
    4: 'Eliminatoria 32' 
  };
  currentUsername: string | null = null;
  searchText: string = '';  // Texto de búsqueda
  pageSize: number = 3;  // Número de torneos por página
  pageIndex: number = 0;  // Índice de la página actual
  // router = Router; // Removed this line
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Referencia al paginador

  

  constructor(private organizerService: OrganizerService, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const organizerId = parsedUser ? parsedUser.userId : null;
    this.currentUsername = parsedUser ? parsedUser.username : null;
    this.loadTournaments(organizerId);
  }

  ngAfterViewInit(): void {
    // Después de la vista, asociamos el paginador con la lista filtrada
    this.paginator.page.subscribe(() => {
      this.updatePaginatedTournaments();
    });
  }

  loadTournaments(organizerId: number): void {
    this.organizerService.getTournamentsByOrganizerId(organizerId).subscribe(
      (tournamentsDTO: TournamentInfoDTO[]) => {
        this.tournaments = tournamentsDTO.map(tournament => ({
          tournamentId: tournament.tournamentId,
          tournamentName: tournament.tournamentName,
          startDate: new Date(tournament.startDate),
          endDate: new Date(tournament.endDate),
          tournamentTypeId: tournament.tournamentTypeId
        }));
        this.filteredTournaments = [...this.tournaments];
        this.updatePaginatedTournaments();
      },
      (error) => {
        console.error('Error al cargar los torneos:', error);
      }
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  navigateToTournamentDetail(tournamentId: number): void {
    this.router.navigate(['/tournament', tournamentId]);
    console.log('Navigating to tournament detail:', tournamentId);
    //inserta en el local storage el torunament
    


    

  }

  updatePaginatedTournaments(): void {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedTournaments = this.filteredTournaments.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedTournaments();
  }

  // Método para filtrar torneos según el texto de búsqueda
  filterTournaments(): void {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredTournaments = this.tournaments.filter(tournament => 
      tournament.tournamentName.toLowerCase().includes(searchTextLower)
    );
    this.updatePaginatedTournaments();
  }

  // Método para limpiar el campo de búsqueda
  clearSearch(): void {
    this.searchText = '';
    this.filteredTournaments = [...this.tournaments];
    this.updatePaginatedTournaments();
  }
  addTournament(newTournament: any): void {
    // Agrega el nuevo torneo a la lista principal
    this.tournaments.push({
      tournamentId: newTournament.tournamentId,
      tournamentName: newTournament.tournamentName,
      startDate: new Date(newTournament.startDate),
      endDate: new Date(newTournament.endDate),
      tournamentTypeId: newTournament.tournamentTypeId
    });
  
    // Actualiza las listas filtradas y paginadas
    this.filteredTournaments = [...this.tournaments];
    this.updatePaginatedTournaments();
  
    // Cierra el formulario después de agregar el torneo
    this.showForm = false;
  }
}