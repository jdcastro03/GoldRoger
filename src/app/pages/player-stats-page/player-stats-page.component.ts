import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerStatsDTO } from 'src/app/interfaces/PlayerStatsDTO';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-stats-page',
  templateUrl: './player-stats-page.component.html',
  styleUrls: ['./player-stats-page.component.css']
})
export class PlayerStatsPageComponent implements OnInit {
  statsForm!: FormGroup;
  playerStats: PlayerStatsDTO | null = null;  // Para almacenar la estadística del jugador

  constructor(private fb: FormBuilder, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadPlayerStats();  // Cargar las estadísticas al inicio
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
   * Carga las estadísticas del jugador desde el servicio.
   */
  private loadPlayerStats(): void {
    this.playerService.getPlayerStats().subscribe(
      (playerStatsDTO: PlayerStatsDTO) => {
        // Asignamos directamente el único objeto de estadísticas
        this.playerStats = playerStatsDTO;
        if (this.playerStats) {
          this.populateForm();  // Rellenar el formulario con las estadísticas del jugador
        }
      },
      (error) => {
        console.error('Error al cargar las estadísticas del jugador:', error);
      }
    );
  }

  /**
   * Rellena el formulario con las estadísticas del jugador.
   */
  private populateForm(): void {
    if (this.playerStats) {
      this.statsForm.patchValue({
        goals: this.playerStats.goals,
        yellowCards: this.playerStats.yellowCards,
        redCards: this.playerStats.redCards
      });
    }
  }
}