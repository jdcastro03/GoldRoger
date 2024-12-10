import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TimerService } from 'src/app/services/timer.service';
import { RefereeService } from 'src/app/services/referee.service';  // Asegúrate de importar el servicio
import { Subscription } from 'rxjs';
import { MatchTeamDTO } from 'src/app/interfaces/MatchTeamDTO';
import { MatchGoalsDTO } from 'src/app/interfaces/MatchGoalsDTO';
import { APIResponse } from 'src/app/interfaces/APIResponse';
import { ChangeDetectorRef } from '@angular/core';
import { PlayersStateService } from 'src/app/services/player-state.service';

@Component({
  selector: 'app-match-details-page',
  templateUrl: './match-details-page.component.html',
  styleUrls: ['./match-details-page.component.css']
})
export class MatchDetailsPageComponent implements OnInit, OnDestroy {
  matchId: number | undefined;
  team1Name: string = '';  // Para almacenar el nombre del equipo 1
  team2Name: string = '';  // Para almacenar el nombre del equipo 2
  team1Players: MatchTeamDTO[] = [];
  team2Players: MatchTeamDTO[] = [];
  team1DisplayedColumns = ['playerId', 'name', 'position', 'actions'];
  team2DisplayedColumns = ['playerId', 'name', 'position', 'actions'];
  matchGoals: MatchGoalsDTO = { team1Goals: 0, team2Goals: 0, isFinished: false };
  isActive: boolean = false;  // Para almacenar el estado del partido
  clickedPlayers: { [playerId: number]: { clickCount: number, clicked: boolean, redCardClicked: boolean } } = {};

  // Temporizador
  timerSubscription: Subscription;
  timer: number = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private refereeService: RefereeService,  // Servicio para obtener el partido
    public timerService: TimerService,
    private cdr: ChangeDetectorRef,
    private playersStateService: PlayersStateService
  ) {
    // Suscripción al temporizador
    this.timerSubscription = this.timerService.timer$.subscribe((currentTime: number) => {
      this.timer = currentTime;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.matchId = id !== null ? +id : undefined;
    if (this.matchId !== undefined) {
      this.refereeService.isMatchActive(this.matchId).subscribe({
        next: (isActive) => {
          this.isActive = isActive;  // Almacena el estado del partido
        },
        error: (err) => {
          console.error('Error al verificar si el partido está activo:', err);
          this.isActive = false; // Si hay error, asumimos que el partido no está activo
        }
      });
    }

    // Obtener el partido por matchId
    if (this.matchId !== undefined) {
      this.getMatchByMatchId(this.matchId);
      this.getPlayersTeam1ByMatchId(this.matchId);
      this.getPlayer2ByMatchId(this.matchId);
      this.getGoalsByMatchId(this.matchId);

    }
    // Obtener los jugadores y asegurarse de que cada uno tenga redCardClicked
  this.clickedPlayers = this.playersStateService.getClickedPlayers();

  // Asegurarse de que cada jugador tiene la propiedad redCardClicked
  for (let playerId in this.clickedPlayers) {
    const player = this.clickedPlayers[playerId];
    if (player.redCardClicked === undefined) {
      player.redCardClicked = false; // Inicializa la propiedad si no existe
    }
    if (player.clickCount === undefined) {
      player.clickCount = 0; // Inicializa la propiedad si no existe
    }
  }
  }

  get isMatchFinished(): boolean {
    return this.matchGoals.isFinished;
  }
  // Método para obtener los datos del partido
  getMatchByMatchId(matchId: number): void {
    this.refereeService.getMatchByMatchId(matchId).subscribe({
      next: (match) => {
        console.log('Match:', match);
        // Asignamos los nombres de los equipos
        this.team1Name = match.team1Name;
        this.team2Name = match.team2Name;
      },
      error: (err) => {
        console.error('Error al obtener el partido:', err);
      }
    });
  }

  
    
  addGoal(playerId: number): void {
    if (this.matchGoals.isFinished) {
      console.log('El partido ya ha terminado. No se puede agregar un gol.');
      return;
    }
  
    if (this.matchId !== undefined) {
      this.refereeService.addGoal(this.matchId, playerId).subscribe({
        next: (result) => {
          if (result) {
            // Si la respuesta es verdadera, actualiza los goles
            if (this.matchId !== undefined) {
              this.getGoalsByMatchId(this.matchId); // Obtiene los goles actualizados
            }
          }
        },
        error: (err) => {
          console.error('Error al agregar el gol:', err);
        }
      });
    } else {
      console.log('No se ha especificado un matchId.');
    }
  }

  addYellowCard(playerId: number): void {
    if (this.matchGoals.isFinished) {
      console.log('El partido ya ha terminado. No se puede agregar una tarjeta amarilla.');
      return;
    }
  
    if (!this.clickedPlayers[playerId]) {
      this.clickedPlayers[playerId] = { clickCount: 0, clicked: false, redCardClicked: false };
    }
  
    // Incrementamos el contador de clics
    this.clickedPlayers[playerId].clickCount += 1;
  
    // Si el contador llega a 2, deshabilitamos el jugador para que no pueda recibir más tarjetas amarillas
    if (this.clickedPlayers[playerId].clickCount >= 2) {
      this.clickedPlayers[playerId].clicked = true;
    }
  
    // Lógica para agregar la tarjeta amarilla
    if (this.matchId !== undefined) {
      this.refereeService.addYellowCard(this.matchId, playerId).subscribe({
        next: (result) => {
          if (result) {
            // Si la respuesta es verdadera, actualiza los goles
            if (this.matchId !== undefined) {
              this.getGoalsByMatchId(this.matchId);
            }
          }
        },
        error: (err) => {
          console.error('Error al agregar la tarjeta amarilla:', err);
        }
      });
    }
  
    // Guardar el estado actualizado en el servicio
    this.playersStateService.setClickedPlayers(this.clickedPlayers);
  }
  
  addRedCard(playerId: number): void {
    if (this.matchGoals.isFinished) {
      console.log('El partido ya ha terminado. No se puede agregar una tarjeta roja.');
      return;
    }
  
    // Si no tenemos el jugador registrado en clickedPlayers, lo inicializamos
    if (!this.clickedPlayers[playerId]) {
      this.clickedPlayers[playerId] = { clickCount: 0, clicked: false, redCardClicked: false };
    }
  
    // Marcar que el jugador ha recibido una tarjeta roja
    this.clickedPlayers[playerId].redCardClicked = true;
  
    // Lógica para agregar la tarjeta roja
    if (this.matchId !== undefined) {
      this.refereeService.addRedCard(this.matchId, playerId).subscribe({
        next: (result) => {
          if (result) {
            // Actualiza los goles o cualquier otra lógica necesaria
            if (this.matchId !== undefined) {
              this.getGoalsByMatchId(this.matchId);
            }
          }
        },
        error: (err) => {
          console.error('Error al agregar la tarjeta roja:', err);
        }
      });
    }
  
    // Guardar el estado actualizado en el servicio
    this.playersStateService.setClickedPlayers(this.clickedPlayers);
  }

  getPlayer2ByMatchId(matchId: number): void {
    this.refereeService.getPlayersTeam2ByMatchId(matchId).subscribe({
      next: (players) => {
        this.team2Players = players;
      },
      error: (err) => {
        console.error('Error al obtener los jugadores del equipo 2:', err);
      }
    });
  }
  //getgoalsbymatchid usano matchgoalsdto
  getGoalsByMatchId(matchId: number): void {
    this.refereeService.getGoalsByMatchId(matchId).subscribe({
      next: (response: APIResponse<MatchGoalsDTO>) => {
        if (response.success && response.data) {
          this.matchGoals = response.data; // Asignar los goles del partido
        } else {
          console.error('Error al obtener los goles del partido:', response.message);
        }
      },
      error: (err) => {
        console.error('Error al obtener los goles del partido:', err);
      }
    });
  }

  startMatch(matchId: number): void {
    // Llama al servicio para iniciar el partido pasando el matchId
    this.refereeService.startMatch(matchId).subscribe({
      next: (response) => {
        console.log('Match started:', response); // Si el partido se inicia con éxito
        this.isActive = true; // Cambiar el estado de isActive
        this.cdr.detectChanges(); // Forzar la actualización de la vista
      },
      error: (err) => {
        console.error('Error al iniciar el partido:', err); // Si ocurre un error al iniciar el partido
      }
    });
  }
 
  

  endMatch(matchId: number): void {
    this.refereeService.endMatch(matchId).subscribe({
      next: (response) => {
        console.log('Match ended:', response);
        // Actualiza el estado de isFinished inmediatamente después de finalizar el partido
        this.matchGoals.isFinished = true;
        this.cdr.detectChanges(); // Forzar la actualización de la vista
        // Si necesitas obtener los goles actualizados del servidor
        this.getGoalsByMatchId(matchId);
      },
      error: (err) => {
        console.error('Error al finalizar el partido:', err);
      }
    });
  }



    

  goBack(): void {
    this.location.back();
  }

  startTimer(): void {
    if (this.matchId !== undefined) {
      this.startMatch(this.matchId);
    }
    this.timerService.startTimer();
  }

  pauseTimer(): void {
    this.isActive = false; // Cambiar el estado de isActive
    this.cdr.detectChanges(); // Forzar la actualización de la vista
    this.timerService.pauseTimer();
  }

  stopTimer(): void {
    if (this.matchId !== undefined) {
      this.endMatch(this.matchId);
    }
    this.timerService.stopTimer();
  }

  ngOnDestroy(): void {
    // Cancelamos la suscripción cuando el componente se destruya
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  getPlayersTeam1ByMatchId(matchId: number): void {
    this.refereeService.getPlayersTeam1ByMatchId(matchId).subscribe({
      next: (players) => {
        this.team1Players = players;
      },
      error: (err) => {
        console.error('Error al obtener los jugadores del equipo 1:', err);
      }
    });
  }
}
