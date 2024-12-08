import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TimerService } from 'src/app/services/timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-match-details-page',
  templateUrl: './match-details-page.component.html',
  styleUrls: ['./match-details-page.component.css']
})
export class MatchDetailsPageComponent implements OnInit, OnDestroy {
  matchId: number | undefined;
  team1Players = [
    { playerId: 1, name: 'Jugador 1', position: 'Delantero' },
    { playerId: 2, name: 'Jugador 2', position: 'Defensa' },
  ];
  team2Players = [
    { playerId: 3, name: 'Jugador 3', position: 'Portero' },
    { playerId: 4, name: 'Jugador 4', position: 'Medio' },
  ];
  team1DisplayedColumns = ['playerId', 'name', 'position', 'actions'];
  team2DisplayedColumns = ['playerId', 'name', 'position', 'actions'];

  // Temporizador
  timerSubscription: Subscription;
  timer: number = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public timerService: TimerService
  ) {
    // Suscripción al temporizador
    this.timerSubscription = this.timerService.timer$.subscribe((currentTime: number) => {
      this.timer = currentTime;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.matchId = id !== null ? +id : undefined;
  }

  goBack(): void {
    this.location.back();
  }

  startTimer(): void {
    this.timerService.startTimer();
  }

  pauseTimer(): void {
    this.timerService.pauseTimer();
  }

  stopTimer(): void {
    this.timerService.stopTimer();
  }

  ngOnDestroy(): void {
    // Cancelamos la suscripción cuando el componente se destruya
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
