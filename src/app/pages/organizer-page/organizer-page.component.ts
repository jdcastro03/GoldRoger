import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organizer-page',
  templateUrl: './organizer-page.component.html',
  styleUrl: './organizer-page.component.css'
})
export class OrganizerPageComponent {
  showForm = false;  // Controla la visibilidad del formulario

  constructor(private fb: FormBuilder) {
    
  }

  toggleForm(): void {
    this.showForm = !this.showForm;  // Cambia el estado de showForm (mostrar/ocultar)
  }

  // Maneja el evento de cierre del formulario


  // Método para limpiar el campo de búsqueda
  clearSearch(): void {
    // Lógica para limpiar la búsqueda
  }

  // Método para enviar el formulario
  onSubmit(): void {
  
  }
}
