import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { CoachService } from 'src/app/services/coach.service'; // Asegúrate de que la ruta es correcta
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-coach-page',
  templateUrl: './coach-page.component.html',
  styleUrls: ['./coach-page.component.css']
})
export class CoachPageComponent implements OnInit {
  showForm = false; // Controla la visibilidad del formulario
  teamNames: string[] = []; // Lista de nombres de equipos

  constructor(private coachService: CoachService, private snackBar : MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTeamNames(); // Llamar al servicio para cargar los nombres de los equipos
  }

  // Método para cargar los nombres de los equipos
  loadTeamNames(): void {
    this.coachService.getTeamNames().subscribe({
      next: (teams) => {
        this.teamNames = teams; // Asignar los nombres de los equipos a la propiedad
      },
      error: (err) => {
        console.error('Error al obtener los nombres de los equipos:', err);
      }
    });
  }

  // Alterna la visibilidad del formulario
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  onTeamCreated(newTeam: Team): void {
    // Agregar el nuevo equipo a la lista sin necesidad de recargar la página
    this.teamNames.push(newTeam.teamName); // Solo agregamos el nombre del equipo a la lista
    this.showForm = false; // Ocultar el formulario después de crear el equipo
  }
  deleteTeams() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de que deseas eliminar tu equipo?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Si el usuario confirma la eliminación
        // Aquí eliminamos el equipo de la lista localmente
        this.teamNames = []; // Suponiendo que solo hay un equipo o que eliminamos todos
  
        // Llamamos al servicio para eliminar el equipo en el backend
        this.coachService.deleteAllTeams().subscribe({
          next: () => {
            this.snackBar.open('Equipo eliminado correctamente', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Ocurrió un error al eliminar tu equipo', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
}