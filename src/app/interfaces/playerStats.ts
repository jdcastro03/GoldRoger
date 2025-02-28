import { Player } from './player';
export interface PlayerStats {
    playerId: number;     // Identificador del jugador
    goals: number;        // Goles anotados
    yellowCards: number;  // Tarjetas amarillas recibidas
    redCards: number;     // Tarjetas rojas recibidas
  
    // Relación
    player?: Player;      // Relación con la entidad Player (opcional)
  }