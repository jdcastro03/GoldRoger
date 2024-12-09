import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizerService } from 'src/app/services/organizer.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeamDTO } from 'src/app/interfaces/TeamDTO';
import { MatchInfoDTO } from 'src/app/interfaces/matchInfoDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatchResultDTO } from 'src/app/interfaces/MatchResultDTO';
import { TournamentPlayerStatsDTO } from 'src/app/interfaces/TournamentPlayerStatsDTO';
import { MatchLeagueInfoDTO } from 'src/app/interfaces/MatchLeagueInfoDTO';
import { MatchLeagueResultDTO } from 'src/app/interfaces/MatchLeagueResultDTO';
import { RefereeDTO } from 'src/app/interfaces/RefereeDTO';
import { RefereeService } from 'src/app/services/referee.service';
import { ChangeDetectorRef } from '@angular/core';
import { LeagueStandingDTO } from 'src/app/interfaces/LeagueStandingDTO';
@Component({
  selector: 'app-organizer-tournament',
  templateUrl: './organizer-tournament.component.html',
  styleUrls: ['./organizer-tournament.component.css']
})
export class OrganizerTournamentComponent implements OnInit {
  tournamentId: number | undefined;
  showForm = false;
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
  quarterFinalsResults: MatchResultDTO[] = [];  // Para almacenar los resultados de los partidos de cuartos de final
  semiFinalsResults: MatchResultDTO[] = [];  // Para almacenar los resultados de los partidos de semifinales
  finalMatchResult: MatchResultDTO | undefined;  // Para almacenar el resultado del partido final
  leagueMatches: MatchLeagueInfoDTO[] = [];  // Para almacenar los partidos de liga
  groupedMatches: { stage: number; matches: MatchLeagueInfoDTO[] }[] = [];
  leagueResults: MatchLeagueResultDTO[] = [];  // Para almacenar los resultados de los partidos de liga
  groupedResults: { stage: number; results: MatchLeagueResultDTO[] }[] = [];
  selectedMatchId: number | null = null; // Para almacenar el matchId seleccionado
  refereesAssigned: { [matchId: number]: RefereeDTO } = {}; 

  matchDateAssigned: { [matchId: number]: Date | null } = {};
  leagueStandings: LeagueStandingDTO[] = [];
  displayedLeagueStandings: string[] = ['teamName', 'points', 'matchesPlayed', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst'];



  

  referees: { matchId: number, referee: RefereeDTO | null }[] = [];
  matchDates: { [matchId: number]: Date | null } = {}; 


  players: TournamentPlayerStatsDTO[] = [];  // Para almacenar las estadísticas de los jugadores

  // Definimos las columnas que se van a mostrar en la tabla
  displayedColumns: string[] = ['playerId', 'firstName', 'lastName', 'teamName', 'goals', 'yellowCards', 'redCards'];

  constructor(
    private route: ActivatedRoute,
    private organizerService: OrganizerService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
    private refereeService: RefereeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tournamentId = id !== null ? +id : undefined;
    this.getTournamentDetails();
    this.currentUserID = JSON.parse(localStorage.getItem('userId') || '{}');
    this.loadQuarterfinals();  // Cargar partidos de cuartos si ya existen
    this.loadSemiFinals();  // Cargar partidos de semifinales si ya existen
    this.loadFinalMatch();  // Cargar partido final si ya existe
    this.getQuarterFinalsResults();  // Cargar resultados de cuartos de final si ya existen
    this.getSemiFinalsResults();  // Cargar resultados de semifinales si ya existen
    this.getFinalMatchResult();  // Cargar resultado del partido final si ya
    this.getPlayerStatsByTournamentId();
    this.getLeagueMatches();  // Cargar partidos de liga si ya existen
    this.getLeagueResults();  // Cargar resultados de liga si ya existen
    //verificame en cuanto entra a la pagina si el current user es igual al organizador del torneo
    this.getLeagueStandings();
    this.updateLeagueStandings();
    
    // Llamar a getRefereeByMatchId para cada partido
    

    // Llamar a getRefereeByMatchId para cada partido **después** de haber cargado los partidos
    
  

  }
  

  getLeagueStandings(): void {
    if (this.tournamentId) {
      this.organizerService.getLeagueStandings(this.tournamentId).subscribe(
        (standings: LeagueStandingDTO[]) => {  // Asegúrate de que el tipo de respuesta sea LeagueStandingDTO[]
          this.leagueStandings = standings; // Los datos ya están tipados correctamente
        },
        (error) => {
          console.error('Error fetching league standings:', error);
        }
      );
    }
  }

  updateLeagueStandings(): void {
    if (this.tournamentId) {
      this.organizerService.updateLeagueStandings(this.tournamentId).subscribe(
        (success) => {
          if (success) {
            this.getLeagueStandings();  // Actualizar la clasificación después de actualizarla
          } else {
            console.error('Error al actualizar la clasificación');
          }
        },
        (error) => {
          console.error('Error al actualizar la clasificación:', error);
        }
      );
    }
  }


  

  
 
 

  getPlayerStatsByTournamentId(): void {
    if (this.tournamentId) {
      this.organizerService.getPlayerStatsByTournamentId(this.tournamentId).subscribe(
        (players) => {
          this.players = players;
        },
        (error) => {
          console.error('Error fetching player stats:', error);
        }
      );
    }

  } 
  toggleForm(matchId: number | null = null): void {
    this.selectedMatchId = matchId; // Almacena el matchId seleccionado al hacer clic
    this.showForm = !this.showForm; // Alterna la visibilidad del formulario
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
          this.snackBar.open('Error al generar las semifinales', 'Cerrar', { duration: 3000 } );
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
  getFinalMatchResult(): void {
    if (this.tournamentId) {
      this.organizerService.getFinalMatchResult(this.tournamentId).subscribe(
        (result) => {
          this.finalMatchResult = result;
        },
        (error) => {
          console.error('Error fetching final match result:', error);
        }
      );
    }
  }

  getQuarterFinalsResults(): void {
    if (this.tournamentId) {
      this.organizerService.getQuarterFinalsResults(this.tournamentId).subscribe(
        (results) => {
          this.quarterFinalsResults = results;
        },
        (error) => {
          console.error('Error fetching quarterfinals results:', error);
        }
      );
    }
  }

  getSemiFinalsResults(): void {
    if (this.tournamentId) {
      this.organizerService.getSemifinalsResults(this.tournamentId).subscribe(
        (results) => {
          this.semiFinalsResults = results;
        },
        (error) => {
          console.error('Error fetching semifinals results:', error);
        }
      );
    }
  }

  createLeagueMatches(): void {
    if (this.tournamentId) {
      this.organizerService.createLeagueMatches(this.tournamentId).subscribe(
        (success) => {
          if (success) {
            this.snackBar.open('Partidos de liga generados correctamente', 'Cerrar', { duration: 3000 } );
            this.getLeagueMatches();  // Cargar los partidos de liga después de generarlos
          } else {
            this.snackBar.open('Error al generar los partidos de liga', 'Cerrar', { duration: 3000 } );
          }
        },
        (error) => {
          console.error('Error en la generación de partidos de liga:', error);
        }
      );
    }
  }

  getLeagueMatches(): void {
    if (this.tournamentId) {
      this.organizerService.getLeagueMatches(this.tournamentId).subscribe(
        (matches) => {
          // Almacena los partidos obtenidos en leagueMatches
          this.leagueMatches = matches;
          
          // Agrupa los partidos por fase o etapa
          this.groupMatchesByStage();
    
          // Llamar a getRefereeByMatchId para cada partido después de haber cargado los partidos
          this.leagueMatches.forEach(match => {
            // Verifica que cada match tenga un matchId antes de hacer la consulta
            if (match.matchId) {
              // Llamamos a getRefereeByMatchId para cada partido
              this.getRefereeByMatchId(match.matchId);
              
              // Llamamos a getMatchDate para obtener la fecha del partido
              this.getMatchDate(match.matchId);
            }
          });
        },
        (error) => {
          console.error('Error fetching league matches:', error);
        }
      );
    }
  }
  onRefereeAssigned(event: { matchId: number, referee: RefereeDTO }): void {
    const { matchId, referee } = event;
  
    // Verifica si el árbitro ya está asignado a este partido
    const existingReferee = this.referees.find(r => r.matchId === matchId);
  
    if (existingReferee) {
      // Si ya existe, actualiza el árbitro
      existingReferee.referee = referee;
    } else {
      // Si no existe, agrega el árbitro
      this.referees.push({ matchId, referee });
    }
  
    // Forzar la actualización de la vista si es necesario
    this.cdr.detectChanges();
  }

  groupMatchesByStage(): void {
    const grouped = this.leagueMatches.reduce((acc, match) => {
      const stageIndex = acc.findIndex(group => group.stage === match.stage);
      if (stageIndex === -1) {
        acc.push({ stage: match.stage, matches: [match] });
      } else {
        acc[stageIndex].matches.push(match);
      }
      return acc;
    }, [] as { stage: number; matches: MatchLeagueInfoDTO[] }[]);
  
    // Ordena las jornadas por número de stage
    this.groupedMatches = grouped.sort((a, b) => a.stage - b.stage);
  }

  getLeagueResults(): void {
    if (this.tournamentId) {
      this.organizerService.getMatchLeagueResults(this.tournamentId).subscribe(
        (results) => {
          this.leagueResults = results;
          this.groupResultsByStage(); // Agrupa los resultados después de obtenerlos
        },
        (error) => {
          console.error('Error fetching league results:', error);
        }
      );
    }
  }
  
  groupResultsByStage(): void {
    const grouped = this.leagueResults.reduce((acc, result) => {
      const stageIndex = acc.findIndex(group => group.stage === result.stage);
      if (stageIndex === -1) {
        acc.push({ stage: result.stage, results: [result] });
      } else {
        acc[stageIndex].results.push(result);
      }
      return acc;
    }, [] as { stage: number; results: MatchLeagueResultDTO[] }[]);
  
    // Ordena los resultados por número de stage
    this.groupedResults = grouped.sort((a, b) => a.stage - b.stage);
  }

  getRefereeByMatchId(matchId: number): void {
    this.refereeService.getRefereeByMatchId(matchId).subscribe(
        (referee: RefereeDTO) => {
            console.log('Referee data:', referee);  // Ahora se obtiene un solo objeto RefereeDTO
            
            // Encuentra el árbitro existente para este matchId
            const existingReferee = this.referees.find(r => r.matchId === matchId);

            if (existingReferee) {
                existingReferee.referee = referee;  // Si ya existe, actualiza el árbitro
            } else {
                this.referees.push({ matchId, referee });  // Si no existe, lo agrega
            }

            this.cdr.detectChanges();  // Fuerza la actualización del UI
        },
        (error) => {
            console.error('Error fetching referee:', error);
        }
    );
}
getRefereeName(matchId: number): string {
  const referee = this.referees.find(r => r.matchId === matchId);
  if (referee && referee.referee) {
    return ` Arbitro: ${referee.referee.firstName} ${referee.referee.lastName}`;
  } else {
    return 'Árbitro no asignado';  // Si no hay árbitro asignado
  }
}

getMatchDate(matchId: number): void {
  this.organizerService.getMatchDate(matchId).subscribe(
    (date) => {
      // Asegurarse de que la fecha esté disponible
      if (date) {
        this.matchDates[matchId] = new Date(date);  // Guardamos la fecha en el diccionario
      } else {
        this.matchDates[matchId] = null;  // Si no tiene fecha, lo dejamos como null
      }
    },
    (error) => {
      console.error('Error fetching match date for', matchId, ':', error);
      this.matchDates[matchId] = null;  // En caso de error, asignar null
    }
  );
}

// Método para actualizar la fecha cuando se emite el evento en el hijo
matchDateUpdated(event: { matchId: number, newDate: Date }): void {
  const { matchId, newDate } = event;
  // Actualizamos el diccionario con la nueva fecha
  this.matchDates[matchId] = newDate;
}




  

  goBack(): void {
    this.location.back();
  }
}