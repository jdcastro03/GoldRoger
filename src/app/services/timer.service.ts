// timer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private startTime: number | null = null;
  private currentTime: number = 0;
  private isRunning: boolean = false;
  private timerSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startTime = Date.now() - this.currentTime; // Ajusta el tiempo base si hay una pausa
      this.runTimer();
    }
  }

  pauseTimer() {
    this.isRunning = false;
  }

  stopTimer() {
    this.isRunning = false;
    this.currentTime = 0;
    this.timerSubject.next(0);
  }

  private runTimer() {
    if (this.isRunning) {
      setTimeout(() => {
        this.currentTime = Date.now() - (this.startTime as number);
        this.timerSubject.next(this.currentTime); // Emitir el tiempo actualizado
        this.runTimer();
      }, 1000);
    }
  }

  get timer$() {
    return this.timerSubject.asObservable();
  }

  get isTimerRunning() {
    return this.isRunning;
  }
}
