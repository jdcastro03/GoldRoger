import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServerUrl, serverConfig } from '../server';
import { User } from '../interfaces/user';
import { CreateUserRequestDTO } from '../interfaces/createUserRequestDTO';
import { APIResponse } from '../interfaces/APIResponse';

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



}