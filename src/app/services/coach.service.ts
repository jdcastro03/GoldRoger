import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServerUrl, serverConfig } from '../server';
import { User } from '../interfaces/user';
import { CreateUserRequestDTO } from '../interfaces/createUserRequestDTO';
import { APIResponse } from '../interfaces/APIResponse';
import { Team } from '../interfaces/team';
import { CreateTeamRequestDTO } from '../interfaces/CreateTeamRequestDTO';
import { Tournament } from '../interfaces/tournament';
import { TournamentDTO } from '../interfaces/TournamentDTO';
@Injectable({
  providedIn: 'root'
})
export class CoachService  {

    private baseUrl: string = serverConfig.serverUrl; // Usar el valor de la URL desde serverConfig
    private apiUrl: string = `${this.baseUrl}Coach/`; // Construcción de la URL API

    constructor(private http: HttpClient) {}

    getCoachLicenseNumberById(coachId: number): Observable<string> {
        const url = `${this.apiUrl}GetCoachLicenseNumberById?coachId=${coachId}`;
        return this.http.get<APIResponse<string>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Solo devuelve la data si es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo obtener el número de licencia del entrenador'); // Lanza un error en caso de fallo
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener el número de licencia del entrenador:', error);
                throw new Error('Error al obtener el número de licencia del entrenador');
            })
        );
    }
    getTeamNames(): Observable<string[]> {
        return this.http.get<APIResponse<string[]>>(`${this.apiUrl}GetTeamNames`).pipe(
          map(response => response.success && response.data ? response.data : [])
        );
      }

      createTeam(requestDTO: CreateTeamRequestDTO): Observable<Team> {
        const url = `${this.apiUrl}CreateTeam`; // URL de la API para crear el equipo
        return this.http.post<APIResponse<Team>>(url, requestDTO).pipe(
          map(response => {
            if (response.success && response.data) {
              return response.data; // Retorna el equipo creado si la respuesta es exitosa
            } else {
              console.error('Error:', response.message);
              throw new Error('No se pudo crear el equipo'); // Lanza un error en caso de fallo
            }
          }),
          catchError((error) => {
            console.error('Error al crear el equipo:', error);
            throw new Error('Error al crear el equipo');
          })
        );
      }

      deleteAllTeams(): Observable<void> {
        const url = `${this.apiUrl}DeleteAllTeams`; // URL del endpoint para eliminar los equipos
        return this.http.delete<APIResponse<void>>(url).pipe(
          map(response => {
            if (!response.success) {
              console.error('Error:', response.message);
              throw new Error('No se pudieron eliminar los equipos asociados'); // Lanza un error si la respuesta no es exitosa
            }
          }),
          catchError((error) => {
            console.error('Error al eliminar los equipos asociados:', error);
            throw new Error('Error al intentar eliminar los equipos asociados');
          })
        );
      }
     
      getAllTournaments(): Observable<TournamentDTO[]> {
        const url = `${this.apiUrl}GetAllTournaments`;
    
        return this.http.get<APIResponse<TournamentDTO[]>>(url).pipe(
          map((response) => {
            if (response.success && response.data) {
              return response.data; // Devuelve el arreglo de torneos si tiene éxito
            } else {
              console.error('Error en la respuesta de la API:', response.message);
              throw new Error('No se pudieron obtener los torneos');
            }
          }),
          catchError((error) => {
            console.error('Error al obtener los torneos:', error);
            throw new Error('Error al intentar obtener los torneos');
          })
        );
      }


      //metodo para obtener el usertype que esta guarado en el local storage
      updateTournamentForTeam(tournamentId: number): Observable<any> {
        const url = `${this.apiUrl}UpdateTournamentForTeam/${tournamentId}`;
        return this.http.put<APIResponse<any>>(url, {}).pipe(
          map(response => {
            if (response.success) {
              return response;
            } else {
              console.error('Error al actualizar el torneo:', response.message);
              throw new Error(response.message || 'No se pudo actualizar el torneo');
            }
          }),
          catchError((error) => {
            console.error('Error en la solicitud para actualizar el torneo:', error);
            throw new Error('Error al actualizar el torneo');
          })
        );
      }

      getTeamTournamentIdByCoachId(): Observable<number | null> {
        const url = `${this.apiUrl}GetTeamTournamentIdByCoachId`;
        return this.http.get<APIResponse<number | null>>(url).pipe(
          map(response => {
            if (response.success) {
              return response.data !== undefined ? response.data : null; // Devuelve el TeamId (puede ser `null` si no hay equipo asignado)
            } else {
              console.error('Error al obtener el torneo del equipo:', response.message);
              throw new Error(response.message || 'No se pudo obtener el torneo del equipo');
            }
          }),
          catchError(error => {
            console.error('Error en la solicitud para obtener el torneo del equipo:', error);
            throw new Error('Error al obtener el torneo del equipo');
          })
        );
      }
}