import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { CoachService } from 'src/app/services/coach.service'; // Asegúrate de que la ruta es correcta
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerService } from 'src/app/services/player.service'; // Asegúrate de importar el servicio de jugadores
import { PlayerDTO } from 'src/app/interfaces/PlayerDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-page',
  templateUrl: './coach-page.component.html',
  styleUrls: ['./coach-page.component.css']
})
export class CoachPageComponent implements OnInit {
  showForm = false; // Controla la visibilidad del formulario
  teamNames: string[] = []; // Lista de nombres de equipos
  players: PlayerDTO[] = []; // Lista de jugadores
  displayedColumns: string[] = ['playerId', 'firstName', 'lastName', 'position', 'acciones']; // Columnas para la tabla de jugadores
  
  constructor(
    private coachService: CoachService, 
    private snackBar : MatSnackBar, 
    private dialog: MatDialog,
    private playerService: PlayerService,
    private router : Router // Inyectamos el servicio de jugadores
  ) {}

  ngOnInit(): void {
    this.loadTeamNames(); // Llamar al servicio para cargar los nombres de los equipos
  }

  // Método para cargar los nombres de los equipos
  loadTeamNames(): void {
    this.coachService.getTeamNames().subscribe({
      next: (teams) => {
        this.teamNames = teams; // Asignar los nombres de los equipos a la propiedad
        if (this.teamNames.length > 0) {
          this.loadPlayers(this.teamNames[0]); // Llamamos a cargar los jugadores si hay un equipo
        }
      },
      error: (err) => {
        console.error('Error al obtener los nombres de los equipos:', err);
      }
    });
  }

  // Método para cargar los jugadores según el nombre del equipo
  loadPlayers(teamName: string): void {
    this.playerService.getPlayersByTeamName(teamName).subscribe({
      next: (players) => {
        this.players = players; // Asignar los jugadores obtenidos a la lista
      },
      error: (err) => {
        console.error('Error al obtener los jugadores del equipo:', err);
    
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
    this.loadPlayers(newTeam.teamName); // Cargar jugadores para el nuevo equipo
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
            this.players = []; // Limpiar la lista de jugadores si el equipo es eliminado
          },
          error: (err) => {
            this.snackBar.open('Ocurrió un error al eliminar tu equipo', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
  navigateToPlayerDetail(playerId: number): void {
    this.router.navigate(['/playerStats', playerId]);
    
    //inserta en el local storage el torunament
    


    

  }
}