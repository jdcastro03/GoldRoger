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
  if (this.isRunning) {
    this.isRunning = false;
    this.timerSubject.next(this.currentTime); // Emite el tiempo actual
  }
}

  stopTimer() {
    if (this.isRunning || this.currentTime > 0) { // Asegura que siempre reiniciemos
      this.isRunning = false;
      this.currentTime = 0; // Reinicia el tiempo
      this.timerSubject.next(0); // Emite el estado "reseteado"
    }
  }

  private runTimer() {
    if (!this.isRunning) return; // Detiene la ejecución si el temporizador no está activo
    setTimeout(() => {
      if (!this.isRunning) return; // Previene la continuación si el temporizador se detuvo
      this.currentTime = Date.now() - (this.startTime as number);
      this.timerSubject.next(this.currentTime); // Emite el nuevo tiempo
      this.runTimer();
    }, 1000);
  }

  get timer$() {
    return this.timerSubject.asObservable();
  }

  get isTimerRunning() {
    return this.isRunning;
  }
}
