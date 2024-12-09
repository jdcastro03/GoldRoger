import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';
import { Subscription } from 'rxjs';
import { MatchHomeDTO } from 'src/app/interfaces/MatchHomeDTO';
import { RefereeService } from 'src/app/services/referee.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('matchCardsContainer') matchCardsContainer!: ElementRef;

  showLeftArrow = false;
  showRightArrow = false;
  activeMatches: MatchHomeDTO[] = [];
  
  isTimerRunning = false;
  elapsedTime = 0; // Almacenará el tiempo transcurrido

  private timerSubscription!: Subscription;

  constructor(private timerService: TimerService, private refereeService: RefereeService) {}

  ngOnInit() {
    this.getActiveMatches();
  }
  ngAfterViewInit() {
    this.updateArrowVisibility();

    this.isTimerRunning = this.timerService.isTimerRunning;

    // Suscripción al tiempo transcurrido
    this.timerSubscription = this.timerService.timer$.subscribe(time => {
      this.elapsedTime = time;
    });
  }

  ngOnDestroy() {
    // Limpieza de la suscripción
    this.timerSubscription.unsubscribe();
  }

  scroll(direction: 'left' | 'right') {
    const container = this.matchCardsContainer.nativeElement;
    const scrollAmount = 500;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    setTimeout(() => {
      this.updateArrowVisibility();
    }, 300);
  }

  updateArrowVisibility() {
    const container = this.matchCardsContainer.nativeElement;

    this.showLeftArrow = container.scrollLeft > 0;
    this.showRightArrow = container.scrollLeft < container.scrollWidth - container.clientWidth;
  }

  
  
  getActiveMatches(): void {
    this.refereeService.getActiveMatches().subscribe({
      next: (matches) => {
        this.activeMatches = matches;
      },
      error: (err) => {
        console.error('Error al obtener los partidos activos:', err);
      }
    });
  }
    
    

}