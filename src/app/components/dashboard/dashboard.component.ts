import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild('matchCardsContainer') matchCardsContainer!: ElementRef;

  showLeftArrow = false;  // Inicialmente ocultar la flecha izquierda
  showRightArrow = false; // Inicialmente ocultar la flecha derecha
  
  ngAfterViewInit() {
    this.updateArrowVisibility(); // Actualiza la visibilidad al inicializar
  }
  
  scroll(direction: 'left' | 'right') {
    const container = this.matchCardsContainer.nativeElement;
    const scrollAmount = 500; // Ajusta el desplazamiento aquí
  
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); // Desplazamiento suave hacia la izquierda
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' }); // Desplazamiento suave hacia la derecha
    }
    
    // Esperar a que el desplazamiento termine y luego actualizar la visibilidad
    setTimeout(() => {
      this.updateArrowVisibility(); // Actualiza la visibilidad de las flechas después del desplazamiento
    }, 300); // Tiempo de espera para que coincida con la duración del desplazamiento
  }
  
  updateArrowVisibility() {
    const container = this.matchCardsContainer.nativeElement;
  
    // La flecha izquierda se muestra si hay espacio para desplazarse hacia la izquierda
    this.showLeftArrow = container.scrollLeft > 0;
  
    // La flecha derecha se muestra si hay espacio para desplazarse hacia la derecha
    this.showRightArrow = container.scrollLeft < (container.scrollWidth - container.clientWidth);
  }
}