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

  showLeftArrow = false;
  showRightArrow = true;

  ngAfterViewInit() {
    this.updateArrowVisibility();
  }

  scroll(direction: 'left' | 'right') {
    const container = this.matchCardsContainer.nativeElement;
    const scrollAmount = 250; // Ajusta según el ancho deseado

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
    
    this.updateArrowVisibility();
  }

  updateArrowVisibility() {
    const container = this.matchCardsContainer.nativeElement;
    this.showLeftArrow = container.scrollLeft > 0;
    this.showRightArrow = container.scrollLeft < (container.scrollWidth - container.clientWidth);
  }
}