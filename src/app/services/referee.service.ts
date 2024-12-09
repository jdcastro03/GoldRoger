import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServerUrl, serverConfig } from '../server';
import { User } from '../interfaces/user';
import { CreateUserRequestDTO } from '../interfaces/createUserRequestDTO';
import { APIResponse } from '../interfaces/APIResponse';
import { RefereeDTO } from '../interfaces/RefereeDTO';
import { MatchRefereeDTO } from '../interfaces/MatchRefereeDTO';
import { MatchTeamDTO } from '../interfaces/MatchTeamDTO';
import { MatchGoalsDTO } from '../interfaces/MatchGoalsDTO';
import { MatchHomeDTO } from '../interfaces/MatchHomeDTO';

@Injectable({
  providedIn: 'root'
})
export class RefereeService  {

    private baseUrl: string = serverConfig.serverUrl; // Usar el valor de la URL desde serverConfig
    private apiUrl: string = `${this.baseUrl}Referee/`; // Construcción de la URL API

    constructor(private http: HttpClient) {}

    getRefereeLicenseNumberById(refereeId: number): Observable<string> {
        const url = `${this.apiUrl}GetRefereeLicenseNumberById?refereeId=${refereeId}`;
        return this.http.get<APIResponse<string>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Solo devuelve la data si es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo obtener el número de licencia del árbitro'); // Lanza un error en caso de fallo
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener el número de licencia del árbitro:', error);
                throw new Error('Error al obtener el número de licencia del árbitro');
            })
        );
    }


    getAllReferees(): Observable<RefereeDTO[]> {
        const url = `${this.apiUrl}GetAllReferees`;
        return this.http.get<APIResponse<RefereeDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Solo devuelve la data si es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los árbitros'); // Lanza un error en caso de fallo
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los árbitros:', error);
                throw new Error('Error al obtener los árbitros');
            })
        );
    }


    insertMatchReferee(matchId: number, refereeId: number): Observable<boolean> {
        const url = `${this.apiUrl}InsertMatchReferee`;
        const body = { matchId, refereeId };
        return this.http.post<APIResponse<boolean>>(url, body).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Solo devuelve la data si es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo insertar el árbitro en el partido'); // Lanza un error en caso de fallo
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para insertar el árbitro en el partido:', error);
                throw new Error('Error al insertar el árbitro en el partido');
            })
        );
    }

    getRefereeByMatchId(matchId: number): Observable<RefereeDTO> {
        const url = `${this.apiUrl}GetRefereeByMatchId?matchId=${matchId}`;
        return this.http.get<APIResponse<RefereeDTO[]>>(url).pipe(  // Esperamos un arreglo de árbitros
            map(response => {
                if (response.success && response.data && response.data.length > 0) {
                    return response.data[0];  // Si hay al menos un árbitro, devuelve el primero
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo obtener el árbitro del partido');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener el árbitro del partido:', error);
                throw new Error('Error al obtener el árbitro del partido');
            })
        );
    }


    //getmatchesbyrefereeid
    getMatchesByRefereeId(refereeId: number): Observable<MatchRefereeDTO[]> {
        const url = `${this.apiUrl}GetMatchesByRefereeId?refereeId=${refereeId}`;
        return this.http.get<APIResponse<MatchRefereeDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Solo devuelve la data si es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los partidos del árbitro'); // Lanza un error en caso de fallo
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los partidos del árbitro:', error);
                throw new Error('Error al obtener los partidos del árbitro');
            })
        );
    }

    getMatchByMatchId(matchId: number): Observable<MatchRefereeDTO> {

        const url = `${this.apiUrl}GetMatchByMatchId?matchId=${matchId}`;
        return this.http.get<APIResponse<MatchRefereeDTO>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Solo devuelve la data si es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo obtener el partido'); // Lanza un error en caso de fallo
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener el partido:', error);
                throw new Error('Error al obtener el partido');
            })
        );
    }
    
    getPlayersTeam1ByMatchId(matchId: number): Observable<MatchTeamDTO[]> {
        const url = `${this.apiUrl}GetPlayersByMatchId?matchId=${matchId}`;
        return this.http.get<APIResponse<MatchTeamDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Solo devuelve la data si es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los jugadores del partido'); // Lanza un error en caso de fallo
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los jugadores del partido:', error);
                throw new Error('Error al obtener los jugadores del partido');
            })
        );
    }



    getPlayersTeam2ByMatchId(matchId: number): Observable<MatchTeamDTO[]> {
        const url = `${this.apiUrl}GetPlayers2ByMatchId?matchId=${matchId}`;
        return this.http.get<APIResponse<MatchTeamDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Solo devuelve la data si es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los jugadores del partido'); // Lanza un error en caso de fallo
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los jugadores del partido:', error);
                throw new Error('Error al obtener los jugadores del partido');
            })
        );
    }

    getGoalsByMatchId(matchId: number): Observable<APIResponse<MatchGoalsDTO>> {
        const url = `${this.apiUrl}GetGoalsByMatchId?matchId=${matchId}`;
        return this.http.get<APIResponse<MatchGoalsDTO>>(url).pipe(
          map(response => {
            if (response.success && response.data) {
              return response; // Devuelve la respuesta completa si es exitosa
            } else {
              console.error('Error:', response.message);
              throw new Error('No se pudieron obtener los goles del partido'); // Lanza un error en caso de fallo
            }
          }),
          catchError((error) => {
            console.error('Error en la solicitud para obtener los goles del partido:', error);
            throw new Error('Error al obtener los goles del partido');
          })
        );
      }


      //startmatch
        startMatch(matchId: number): Observable<boolean> {
            const url = `${this.apiUrl}StartMatch?matchId=${matchId}`;
            
            return this.http.post<APIResponse<boolean>>(url, null).pipe(
                map(response => {
                    if (response.success && response.data) {
                        return response.data; // Solo devuelve la data si es exitosa
                    } else {
                        console.error('Error:', response.message);
                        throw new Error('No se pudo iniciar el partido'); // Lanza un error en caso de fallo
                    }
                }),
                catchError((error) => {
                    console.error('Error en la solicitud para iniciar el partido:', error);
                    throw new Error('Error al iniciar el partido');
                })
            );
        }

       
    

        endMatch(matchId: number): Observable<boolean> {
            const url = `${this.apiUrl}EndMatch?matchId=${matchId}`;

            return this.http.post<APIResponse<boolean>>(url, null).pipe(
                map(response => {
                    if (response.success && response.data) {
                        return response.data; // Solo devuelve la data si es exitosa
                    } else {
                        console.error('Error:', response.message);
                        throw new Error('No se pudo finalizar el partido'); // Lanza un error en caso de fallo
                    }
                }),
                catchError((error) => {
                    console.error('Error en la solicitud para finalizar el partido:', error);
                    throw new Error('Error al finalizar el partido');
                })
            );
            
           

        }


        addGoal(matchId: number, playerId: number): Observable<boolean> {
            const url = `${this.apiUrl}AddGoal`; // La URL base ya está correcta
            const params = new HttpParams()
                .set('playerId', playerId.toString())
                .set('matchId', matchId.toString()); // Agrega los parámetros a la URL
        
            return this.http.post<APIResponse<boolean>>(url, null, { params }).pipe( // Aquí pasas null como cuerpo
                map(response => {
                    if (response.success && response.data) {
                        return response.data; // Solo devuelve la data si es exitosa
                    } else {
                        console.error('Error:', response.message);
                        throw new Error('No se pudo agregar el gol');
                    }
                }),
                catchError((error) => {
                    console.error('Error en la solicitud para agregar el gol:', error);
                    throw new Error('Error al agregar el gol');
                })
            );
        }

        isMatchActive(matchId: number): Observable<boolean> {
            const url = `${this.apiUrl}IsMatchActive?matchId=${matchId}`;
            return this.http.get<APIResponse<boolean>>(url).pipe(
                map(response => {
                    if (response.success && response.data) {
                        return response.data; // Solo devuelve la data si es exitosa
                    } else {
                        console.error('Error:', response.message);
                        throw new Error('No se pudo verificar si el partido está activo'); // Lanza un error en caso de fallo
                    }
                }),
                catchError((error) => {
                    console.error('Error en la solicitud para verificar si el partido está activo:', error);
                    throw new Error('Error al verificar si el partido está activo');
                })
            );
        }

        getActiveMatches(): Observable<MatchHomeDTO[]> {
            const url = `${this.apiUrl}GetActiveMatches`;
            return this.http.get<APIResponse<MatchHomeDTO[]>>(url).pipe(
                map(response => {
                    if (response.success && response.data) {
                        return response.data; // Solo devuelve la data si es exitosa
                    } else {
                        console.error('Error:', response.message);
                        throw new Error('No se pudieron obtener los partidos activos'); // Lanza un error en caso de fallo
                    }
                }),
                catchError((error) => {
                    console.error('Error en la solicitud para obtener los partidos activos:', error);
                    throw new Error('Error al obtener los partidos activos');
                })
            );
        }
}