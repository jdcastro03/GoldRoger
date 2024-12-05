import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerStatsDTO } from 'src/app/interfaces/PlayerStatsDTO';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-global-player-stats-page',
  templateUrl: './global-player-stats-page.component.html',
  styleUrls: ['./global-player-stats-page.component.css']
})
export class GlobalPlayerStatsPageComponent implements OnInit {
  statsForm!: FormGroup;
  playerId: number | undefined; // Puedes pasar el ID de jugador dinámicamente o desde la ruta
  playerStats: PlayerStatsDTO | null = null;  // Guardar los datos obtenidos
  constructor(
    private fb: FormBuilder, 
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario
    this.initializeForm();

    // Si el ID del jugador está disponible en la URL, lo obtenemos
    const id = this.route.snapshot.paramMap.get('id');
    this.playerId = id !== null ? +id : undefined;
    

    // Obtenemos las estadísticas del jugador
    this.getPlayerStats();
  }

  /**
   * Inicializa el formulario con valores por defecto (vacío).
   * Los campos estarán deshabilitados, ya que es solo para visualización.
   */
  private initializeForm(): void {
    this.statsForm = this.fb.group({
      goals: [{ value: '', disabled: true }],       // Goles
      yellowCards: [{ value: '', disabled: true }], // Tarjetas amarillas
      redCards: [{ value: '', disabled: true }]     // Tarjetas rojas
    });
  }

  /**
   * Llama al servicio para obtener las estadísticas del jugador y las asigna al formulario.
   */
  private getPlayerStats(): void {
    if (this.playerId !== undefined) {
      this.playerService.getPlayerStatsById(this.playerId).subscribe(
      (playerStats: PlayerStatsDTO) => {
        // Actualizamos los valores del formulario con los datos obtenidos
        this.statsForm.patchValue({
          goals: playerStats.goals,
          yellowCards: playerStats.yellowCards,
          redCards: playerStats.redCards
        });

        // También guardamos los datos en una propiedad para usarlos en la vista
        this.playerStats = playerStats;
      },
      (error) => {
        console.error('Error al obtener las estadísticas del jugador:', error);
      }
    );
  }
}
goBack(): void {
  this.location.back();
}
}
      