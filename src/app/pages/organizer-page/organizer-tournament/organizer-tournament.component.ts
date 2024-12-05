import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizerService } from 'src/app/services/organizer.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeamDTO } from 'src/app/interfaces/TeamDTO';
import { MatchInfoDTO } from 'src/app/interfaces/matchInfoDTO';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-organizer-tournament',
  templateUrl: './organizer-tournament.component.html',
  styleUrls: ['./organizer-tournament.component.css']
})
export class OrganizerTournamentComponent implements OnInit {
  tournamentId: number | undefined;
  tournamentName: string = '';
  startDate: string = '';
  endDate: string = '';
  tournamentTypeId: number | undefined;
  tournamentTypeName: string = '';
  organizerId: number | undefined;
  teams: TeamDTO[] = [];
  currentUserID: number | null = null;
  quarterFinals: MatchInfoDTO[] = [];  // Para almacenar los partidos de cuartos de final
  semiFinals: MatchInfoDTO[] = [];  // Para almacenar los partidos de semifinales
  finalMatch: MatchInfoDTO | undefined;  // Para almacenar el partido final

  constructor(
    private route: ActivatedRoute,
    private organizerService: OrganizerService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tournamentId = id !== null ? +id : undefined;
    this.getTournamentDetails();
    this.currentUserID = JSON.parse(localStorage.getItem('userId') || '{}');
    this.loadQuarterfinals();  // Cargar partidos de cuartos si ya existen
    this.loadSemiFinals();  // Cargar partidos de semifinales si ya existen
    this.loadFinalMatch();  // Cargar partido final si ya existe
  }

  getTournamentDetails(): void {
    if (this.tournamentId) {
      this.organizerService.getTournamentById(this.tournamentId).subscribe(
        (tournament) => {
          this.tournamentName = tournament.tournamentName;
          this.startDate = new Date(tournament.startDate).toISOString();
          this.endDate = new Date(tournament.endDate).toISOString();
          this.tournamentTypeId = tournament.tournamentTypeId;
          this.organizerId = tournament.organizerId;
          this.setTournamentTypeName();
          this.getTeams();
        },
        (error) => {
          console.error('Error fetching tournament details:', error);
        }
      );
    }
  }

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
        this.tournamentTypeName = 'Desconocido';
        break;
    }
  }

  getTeams(): void {
    if (this.tournamentId) {
      this.organizerService.getTeamsByTournamentId(this.tournamentId).subscribe(
        (teams) => {
          this.teams = teams;
        },
        (error) => {
          console.error('Error fetching teams:', error);
        }
      );
    }
  }

  // Lógica para generar cuartos de final
  generateQuarterfinals(): void {
    if (this.tournamentId) {
      this.organizerService.createQuarterfinals(this.tournamentId).subscribe(
        (success) => {
          if (success) {
            this.snackBar.open('Cuartos de final generados correctamente', 'Cerrar', { duration: 3000 } );
            this.loadQuarterfinals();  // Cargar los partidos de cuartos de final después de generarlos
          } else {
            this.snackBar.open('Error al generar los cuartos de final', 'Cerrar', { duration: 3000 } );
          }
        },
        (error) => {
          console.error('Error en la generación de cuartos de final:', error);
        }
      );
    }
  }

  // Método para cargar los partidos de cuartos de final
  loadQuarterfinals(): void {
    if (this.tournamentId) {
      this.organizerService.getQuarterFinalsMatches(this.tournamentId).subscribe(
        (matches) => {
          this.quarterFinals = matches;
        },
        (error) => {
          console.error('Error al obtener los partidos de cuartos de final:', error);
        }
      );
    }
  }

  generateSemiFinals(): void {
    if (this.tournamentId) {
      this.organizerService.createSemifinals(this.tournamentId).subscribe(
        (success) => {
          if (success) {
            this.snackBar.open('Semifinales generadas correctamente', 'Cerrar', { duration: 3000 } );
            this.loadSemiFinals();  // Cargar los partidos de semifinales después de generarlos
          } else {
            this.snackBar.open('Error al generar las semifinales', 'Cerrar', { duration: 3000 } );
          }
        },
        (error) => {
          console.error('Error en la generación de semifinales:', error);
        }
      );
    }
  }
  loadSemiFinals(): void {
    if (this.tournamentId) {
      this.organizerService.getSemifinalsMatches(this.tournamentId).subscribe(
        (matches) => {
          this.semiFinals = matches;
        },
        (error) => {
          console.error('Error al obtener los partidos de semifinales:', error);
        }
      );
    }
  }
  
  generateFinalMatch(): void {
    if (this.tournamentId) {
    this.organizerService.createFinal(this.tournamentId).subscribe(
      success => {
        if (success) {
          this.snackBar.open('Partido final generado correctamente', 'Cerrar', { duration: 3000 });
          this.loadFinalMatch();  // Cargar el partido final después de generarlo
        } else {
          this.snackBar.open('Error al generar el partido final', 'Cerrar', { duration: 3000 });
        }
      }
    , error => {
      console.error('Error en la generación del partido final:', error);
    }
  
    );
    }
  }

  loadFinalMatch(): void {
    if (this.tournamentId) {
      this.organizerService.getFinalMatch(this.tournamentId).subscribe(
        (match) => {
          this.finalMatch = match;
        },
        (error) => {
          console.error('Error al obtener el partido final:', error);
        }
      );
    }
  }



  goBack(): void {
    this.location.back();
  }
}