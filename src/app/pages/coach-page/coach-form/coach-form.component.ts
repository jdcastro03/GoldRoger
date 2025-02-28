import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { CoachService } from '../../../services/coach.service'; // Importa el servicio
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateTeamRequestDTO } from 'src/app/interfaces/CreateTeamRequestDTO';
import { Team } from 'src/app/interfaces/team';

@Component({
  selector: 'app-coach-form',
  templateUrl: './coach-form.component.html',
  styleUrls: ['./coach-form.component.css']
})
export class CoachFormComponent {
  @Output() formClosed = new EventEmitter<void>(); // Evento para cerrar el formulario
  @Output() teamCreated = new EventEmitter<Team>(); // Evento para notificar que se creó un equipo
  teamForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private coachService: CoachService, // Inyecta el servicio
    private snackBar: MatSnackBar // Para mostrar mensajes de retroalimentación
  ) {
    this.teamForm = this.fb.group({
      teamName: ['', [Validators.required, Validators.minLength(3)]], // Validación mínima de longitud
    });
  }

  // Este es el método que se llama cuando se envía el formulario
  onSubmit(): void {
    if (this.teamForm.invalid) {
      return; // Evita que el formulario se envíe si es inválido
    }

    // Crear el DTO con los datos del formulario
    const requestDTO: CreateTeamRequestDTO = {
      TeamName: this.teamForm.value.teamName,
      // El TournamentId puede ser null o no incluido, como lo mencionaste
    };

    // Llamar al servicio para crear el equipo
    this.coachService.createTeam(requestDTO).subscribe({
      next: (team: Team) => {
        // Si la creación fue exitosa, muestra un mensaje y emite el evento
        this.snackBar.open('Equipo creado exitosamente', 'Cerrar', { duration: 3000 });
        this.teamCreated.emit(team); // Emitir el equipo creado al componente padre
        this.closeForm(); // Cerrar el formulario
      },
      error: (error) => {
        // Si hubo un error, muestra un mensaje de error
        this.snackBar.open('Error al crear el equipo: ' + error.message, 'Cerrar', { duration: 3000 });
      }
    });
  }

  // Método para cerrar el formulario
  closeForm(): void {
    this.formClosed.emit();
  }
}