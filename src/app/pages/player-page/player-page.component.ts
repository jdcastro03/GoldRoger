import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service'; // Ajusta la ruta a tu servicio
import { PlayerDTO } from 'src/app/interfaces/PlayerDTO';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit {
  teamName: string | null = null; // Nombre del equipo
  coachName: string | null = null; // Nombre del entrenador
  errorMessage: string | null = null; // Mensaje de error
  players: PlayerDTO[] = []; // Lista de jugadores (PlayerDTO)
  displayedColumns: string[] = ['playerId', 'firstName', 'lastName', 'position', 'acciones']; // Columnas de la tabla

  constructor(private playerService: PlayerService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    // Cargar nombre del equipo y jugadores
    this.loadPlayerTeamName();
    this.loadCoachName();
  }

  // Carga el nombre del equipo
  loadPlayerTeamName(): void {
    this.playerService.getPlayerTeamName().subscribe({
      next: (name) => {
        this.teamName = name;
        if (this.teamName) {
          // Cargar jugadores después de obtener el nombre del equipo
          this.loadPlayersByTeamName(this.teamName);
        }
      },
      error: (error) => {
        console.error('Error al cargar el nombre del equipo:', error);
        this.errorMessage = 'No se pudo cargar el nombre del equipo.';
      }
    });
  }

  // Carga el nombre del entrenador
  loadCoachName(): void {
    this.playerService.getCoachName().subscribe({
      next: (name) => {
        this.coachName = name;
      },
      error: (error) => {
        console.error('Error al cargar el nombre del entrenador:', error);
        this.errorMessage = 'No se pudo cargar el nombre del entrenador.';
      }
    });
  }

  // Carga los jugadores por nombre del equipo
  loadPlayersByTeamName(teamName: string): void {
    this.playerService.getPlayersByTeamName(teamName).subscribe({
      next: (players) => {
        this.players = players;
      },
      error: (error) => {
        console.error('Error al cargar los jugadores del equipo:', error);
        this.errorMessage = 'No se pudieron cargar los jugadores del equipo.';
        this.players = [];
      }
    });
  }
  leaveTeam(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar acción',
        message: '¿Estás seguro de que deseas abandonar el equipo?'
      }
    });
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) { // Si el usuario confirma abandonar el equipo
        this.playerService.removePlayerFromTeam().subscribe({
          next: () => {
            this.snackBar.open('Has abandonado el equipo correctamente', 'Cerrar', { duration: 3000 });
  
            // Limpiar los datos locales
            this.players = [];
            this.teamName = null;
  
            // Volver a cargar el nombre del entrenador
            this.loadCoachName();
          },
          error: (err) => {
            console.error('Error al abandonar el equipo:', err);
            this.snackBar.open('Ocurrió un error al intentar abandonar el equipo', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  navigateToPlayerDetail(playerId: number): void {
    this.router.navigate(['/playerStats', playerId]);

  }
    
  
  
}