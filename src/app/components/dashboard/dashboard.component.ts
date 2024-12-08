import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('matchCardsContainer') matchCardsContainer!: ElementRef;

  showLeftArrow = false;
  showRightArrow = false;
  
  isTimerRunning = false;
  elapsedTime = 0; // Almacenará el tiempo transcurrido

  constructor(private timerService: TimerService) {}

  ngAfterViewInit() {
    this.updateArrowVisibility(); // Actualiza la visibilidad al inicializar

    // Escuchar cambios en el estado del timer
    this.isTimerRunning = this.timerService.isTimerRunning;
    
    // Suscribirse al tiempo transcurrido
    this.timerService.timer$.subscribe(time => {
      this.elapsedTime = time;
    });
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
}
