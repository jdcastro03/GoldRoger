import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizerService } from 'src/app/services/organizer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizer-tournament',
  templateUrl: './organizer-tournament.component.html',
  styleUrl: './organizer-tournament.component.css'
})
export class OrganizerTournamentComponent implements OnInit {
  tournamentId: number | undefined;
  tournamentName: string = '';
  startDate: string = '';
  endDate: string = '';
  tournamentTypeId: number | undefined;
  tournamentTypeName: string = ''; // Nueva propiedad para el nombre del tipo de torneo
  organizerId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private organizerService: OrganizerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tournamentId = id !== null ? +id : undefined;
    this.getTournamentDetails();
  }

  // Obtenemos los detalles del torneo
  getTournamentDetails(): void {
    if (this.tournamentId) {
      this.organizerService.getTournamentById(this.tournamentId).subscribe(
        (tournament) => {
          // Asignamos los datos obtenidos
          this.tournamentName = tournament.tournamentName;
          this.startDate = new Date(tournament.startDate).toISOString();
          this.endDate = new Date(tournament.endDate).toISOString();
          this.tournamentTypeId = tournament.tournamentTypeId;
          this.organizerId = tournament.organizerId;

          // Llamamos a la función para asignar el nombre del tipo de torneo
          this.setTournamentTypeName();
        },
        (error) => {
          console.error('Error fetching tournament details:', error);
          this.tournamentName = 'Error al obtener los detalles del torneo';
        }
      );
    } else {
      console.warn('No tournament ID provided');
    }
  }

  // Función para asignar el nombre del tipo de torneo basado en el ID
  setTournamentTypeName(): void {
    switch (this.tournamentTypeId) {
      case 1:
        this.tournamentTypeName = 'Liga';
        break;
      case 2:
        this.tournamentTypeName = 'Eliminatoria 8';
        break;
      case 3:
        this.tournamentTypeName = 'Eliminatoria 16';
        break;
      case 4:
        this.tournamentTypeName = 'Eliminatoria 32';
        break;
      default:
        this.tournamentTypeName = 'Desconocido'; // Valor por defecto en caso de no coincidir
        break;
    }
  }

  goBack(): void {
    this.router.navigate(['/organizer']);
  }
}