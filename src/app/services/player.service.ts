import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServerUrl, serverConfig } from '../server';
import { User } from '../interfaces/user';
import { CreateUserRequestDTO } from '../interfaces/createUserRequestDTO';
import { APIResponse } from '../interfaces/APIResponse';
import { PlayerDTO } from '../interfaces/PlayerDTO';
import { PlayerStatsDTO } from '../interfaces/PlayerStatsDTO';
import { TournamentDTO } from '../interfaces/TournamentDTO';
@Injectable({
  providedIn: 'root'
})
export class PlayerService  {

    private baseUrl: string = serverConfig.serverUrl; // Usar el valor de la URL desde serverConfig
    private apiUrl: string = `${this.baseUrl}Player/`; // Construcción de la URL API


// Método para obtener la posición de un jugador por ID
constructor(private http: HttpClient) {}

getPlayerPositionById(playerId: number): Observable<string> {
    const url = `${this.apiUrl}GetPlayerPositionById?playerId=${playerId}`;
    return this.http.get<APIResponse<string>>(url).pipe(
        map(response => {
            if (response.success && response.data) {
                return response.data; // Solo devuelve la data si es exitosa
            } else {
                console.error('Error:', response.message);
                throw new Error('No se pudo obtener la posición del jugador'); // Lanza un error en caso de fallo
            }
        }),
        catchError((error) => {
            console.error('Error en la solicitud para obtener la posición del jugador:', error);
            throw new Error('Error al obtener la posición del jugador');
        })
    );
    
}

getAllTeams(): Observable<APIResponse<{ teamName: string; coachUsername: string; teamId: number }[]>> {
    const url = `${this.apiUrl}GetAllTeams`;
    return this.http.get<APIResponse<{ teamName: string; coachUsername: string; teamId: number }[]>>(url);
  }

  updatePlayerTeam(teamId: number): Observable<any> {
    const url = `${this.apiUrl}UpdatePlayerTeam/${teamId}`;
    return this.http.put<APIResponse<any>>(url, {}).pipe(
      map(response => {
        if (response.success) {
          return response;
        } else {
          console.error('Error al actualizar el equipo:', response.message);
          throw new Error(response.message || 'No se pudo actualizar el equipo');
        }
      }),
      catchError((error) => {
        console.error('Error en la solicitud para actualizar el equipo:', error);
        throw new Error('Error al actualizar el equipo');
      })
    );
  }

  getPlayerTeamId(): Observable<number | null> {
    const url = `${this.apiUrl}GetPlayerTeamId`;
    return this.http.get<APIResponse<number | null>>(url).pipe(
      map(response => {
        if (response.success) {
          return response.data !== undefined ? response.data : null; // Devuelve el TeamId (puede ser `null` si no hay equipo asignado)
        } else {
          console.error('Error al obtener el equipo del jugador:', response.message);
          throw new Error(response.message || 'No se pudo obtener el equipo del jugador');
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud para obtener el equipo del jugador:', error);
        throw new Error('Error al obtener el equipo del jugador');
      })
    );
  }

  

  getPlayerTeamName(): Observable<string | null> {
    const url = `${this.apiUrl}GetPlayerTeamName`;
    return this.http.get<APIResponse<string | null>>(url).pipe(
      map(response => {
        if (response.success) {
          return response.data !== undefined && response.data !== null ? response.data : null; // Devuelve el nombre del equipo (puede ser `null` si no hay equipo asignado)
        } else {
          console.error('Error al obtener el nombre del equipo del jugador:', response.message);
          throw new Error(response.message || 'No se pudo obtener el nombre del equipo del jugador');
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud para obtener el nombre del equipo del jugador:', error);
        throw new Error('Error al obtener el nombre del equipo del jugador');
      })
    );
  }

  getCoachName(): Observable<string | null> {
    const url = `${this.apiUrl}GetCoachName`;
    return this.http.get<APIResponse<string | null>>(url).pipe(
      map(response => {
        if (response.success) {
          return response.data !== undefined && response.data !== null ? response.data : null; // Devuelve el nombre del coach (puede ser `null` si no hay equipo asignado)
        } else {
          console.error('Error al obtener el nombre del coach del jugador:', response.message);
          throw new Error(response.message || 'No se pudo obtener el nombre del coach del jugador');
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud para obtener el nombre del coach del jugador:', error);
        throw new Error('Error al obtener el nombre del coach del jugador');
      })
    );
  }

  getPlayersByTeamName(teamName: string): Observable<PlayerDTO[]> {
    const url = `${this.apiUrl}GetPlayersByTeamName?teamName=${teamName}`;
    return this.http.get<APIResponse<PlayerDTO[]>>(url).pipe(
      map(response => {
        if (response.success) {
          return response.data || [];
        } else {
          console.error('Error al obtener los jugadores del equipo:', response.message);
          throw new Error(response.message || 'No se pudieron obtener los jugadores del equipo');
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud para obtener los jugadores del equipo:', error);
        throw new Error('Error al obtener los jugadores del equipo');
      })
    );
  }

  //getplayerstats con playerStatsDTO no pide parametro
  getPlayerStats(): Observable<PlayerStatsDTO> {
      const url = `${this.apiUrl}GetPlayerStats`;
      return this.http.get<APIResponse<PlayerStatsDTO>>(url).pipe(
        map(response => {
          if (response.success && response.data) {
            return response.data;
          } else {
            console.error('Error al obtener las estadísticas del jugador:', response.message);
            throw new Error(response.message || 'No se pudieron obtener las estadísticas del jugador');
          }
        }),
        catchError(error => {
          console.error('Error en la solicitud para obtener las estadísticas del jugador:', error);
          throw new Error('Error al obtener las estadísticas del jugador');
        })
      );
    }

    getPlayerTournaments(): Observable<TournamentDTO[]> {
      const url = `${this.apiUrl}GetPlayerTournament`;
      return this.http.get<APIResponse<TournamentDTO>>(url).pipe(
        map(response => {
          if (response.success) {
            // Convertir el objeto único en un array para usarlo fácilmente
            return response.data ? [response.data] : [];
          } else {
            console.error('Error al obtener los torneos del jugador:', response.message);
            throw new Error(response.message || 'No se pudieron obtener los torneos del jugador');
          }
        }),
        catchError(error => {
          console.error('Error en la solicitud para obtener los torneos del jugador:', error);
          throw new Error('Error al obtener los torneos del jugador');
        })
      );
    }

    //removeplayerfromteam no pide parametro
    removePlayerFromTeam(): Observable<APIResponse<any>> {
      const url = `${this.apiUrl}RemovePlayerFromTeam`;
      return this.http.delete<APIResponse<any>>(url).pipe(
        map(response => {
          if (response.success) {
            return response;
          } else {
            console.error('Error al eliminar al jugador del equipo:', response.message);
            throw new Error(response.message || 'No se pudo eliminar al jugador del equipo');
          }
        }),
        catchError(error => {
          console.error('Error en la solicitud para eliminar al jugador del equipo:', error);
          throw new Error('Error al eliminar al jugador del equipo');
        })
      );
    }

}