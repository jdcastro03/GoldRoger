import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { OrganizerService } from '../../../services/organizer.service';  // Importa el servicio
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-form.component.html',
  styleUrls: ['./organizer-form.component.css']
})
export class OrganizerFormComponent {
  @Output() formClosed = new EventEmitter<void>();  // Evento para cerrar el formulario
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private organizerService: OrganizerService,  // Inyecta el servicio
    private snackBar: MatSnackBar  // Para mostrar mensajes de retroalimentación
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  // Mapeo de categorías a sus respectivos IDs
  private mapCategoryToId(category: string): number {
    switch (category) {
      case 'Liga': return 1;
      case 'Eliminatorias 8': return 2;
      case 'Eliminatorias 16': return 3;
      case 'Eliminatorias 32': return 4;
      default: return 0;
    }
  }

  // Método para emitir el evento cuando el formulario debe cerrarse
  closeForm(): void {
    this.formClosed.emit();
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formValues = this.eventForm.value;

      // Prepara el objeto DTO para enviar
      const requestDTO = {
        tournamentName: formValues.title,
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        tournamentTypeId: this.mapCategoryToId(formValues.category)  // Convierte categoría a ID
      };

      // Llama al servicio para crear el torneo
      this.organizerService.createTournament(requestDTO).subscribe(
        (tournament: any) => {
          // Muestra un mensaje de éxito
          this.snackBar.open('Torneo creado exitosamente', 'Cerrar', { duration: 3000 });
          this.eventForm.reset();  // Resetea el formulario
          this.closeForm();  // Cierra el formulario después de la creación
        },
        (error: any) => {
          // Muestra un mensaje de error
          this.snackBar.open('Error al crear el torneo', 'Cerrar', { duration: 3000 });
          console.error('Error al crear el torneo:', error);
        }
      );
    }
  }
}