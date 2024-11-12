import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-form.component.html',
  styleUrl: './organizer-form.component.css'
})
export class OrganizerFormComponent {
  @Output() formClosed = new EventEmitter<void>();  // Evento para cerrar el formulario
  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      organizerName: ['', Validators.required],
      organizerEmail: ['', [Validators.required, Validators.email]],
      organizerAddress: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  // Método para emitir el evento cuando el formulario debe cerrarse
  closeForm(): void {
    this.formClosed.emit();  // Emite el evento para indicar que el formulario debe cerrarse
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      console.log(this.eventForm.value);
      // Aquí puedes agregar lógica para enviar los datos del formulario al backend
    }
  }
}
