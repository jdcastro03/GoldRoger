import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServerUrl, serverConfig } from '../server';
import { User } from '../interfaces/user';
import { CreateUserRequestDTO } from '../interfaces/createUserRequestDTO';
import { APIResponse } from '../interfaces/APIResponse';
import { UpdateUserRequestDTO } from '../interfaces/updateUserRequestDTO';
import { Organizer } from '../interfaces/organizer';
import { CreateTournamentRequestDTO } from '../interfaces/CreateTournamentRequestDTO';
import { Tournament } from '../interfaces/tournament';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TournamentInfoDTO } from '../interfaces/TournamentInfoDTO';
import { TeamDTO } from '../interfaces/TeamDTO';
import { MatchInfoDTO } from '../interfaces/matchInfoDTO';
import { MatchResultDTO } from '../interfaces/MatchResultDTO';
import { TournamentPlayerStatsDTO } from '../interfaces/TournamentPlayerStatsDTO';
import { MatchLeagueInfoDTO } from '../interfaces/MatchLeagueInfoDTO';


@Injectable({
  providedIn: 'root'
})
export class OrganizerService  {

    private baseUrl: string = serverConfig.serverUrl; // Usar el valor de la URL desde serverConfig
    private apiUrl: string = `${this.baseUrl}Organizer/`; // Construcción de la URL API

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    
    ) {}


    getOrganizerNameById(organizerId: number): Observable<string> {
        const url = `${this.apiUrl}GetOrganizerNameById?organizerId=${organizerId}`;
        return this.http.get<APIResponse<string>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Solo devuelve la data si es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo obtener el nombre del organizador'); // Lanza un error en caso de fallo
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener el nombre del organizador:', error);
                throw new Error('Error al obtener el nombre del organizador');
            })
        );
        
        


    }

    createTournament(requestDTO: CreateTournamentRequestDTO): Observable<Tournament> {
        const url = `${this.apiUrl}CreateTournament`;
        return this.http.post<APIResponse<Tournament>>(url, requestDTO).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve los datos del torneo si la creación es exitosa
                    this.snackBar.open('Torneo creado exitosamente', 'Cerrar', { duration: 3000 });
                } else {
                    console.error('Error:', response.message);
                    this.snackBar.open('No se pudo crear el torneo', 'Cerrar', { duration: 3000 });
                    throw new Error('No se pudo crear el torneo');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para crear el torneo:', error);
                throw new Error('Error al crear el torneo');
            })
        );

        
    }
    getTournamentsByOrganizerId(organizerId: number): Observable<TournamentInfoDTO[]> {
        const url = `${this.apiUrl}GetTournamentsByOrganizerId?organizerId=${organizerId}`;
        return this.http.get<APIResponse<TournamentInfoDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve la lista de torneos si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los torneos');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los torneos:', error);
                throw new Error('Error al obtener los torneos');
            })
        );
    }

    getTournamentNameById(tournamentId: number): Observable<string> {
        const url = `${this.apiUrl}GetTournamentNameById?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<string>>(url).pipe(
            map(response => {
                // Verificamos si la respuesta es exitosa y contiene datos
                if (response.success && response.data) {
                    return response.data; // Devuelve el nombre del torneo
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo obtener el nombre del torneo'); // Lanza error en caso de fallo
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener el nombre del torneo:', error);
                throw new Error('Error al obtener el nombre del torneo');
            })
        );
    }

    getTournamentById(tournamentId: number): Observable<Tournament> {

        const url = `${this.apiUrl}GetTournamentInfoById?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<Tournament>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve el torneo si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo obtener el torneo');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener el torneo:', error);
                throw new Error('Error al obtener el torneo');
            })
        );
    }

    getTeamsByTournamentId(tournamentId: number): Observable<TeamDTO[]> {
        const url = `${this.apiUrl}GetTeamsByTournamentId?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<TeamDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve los equipos si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los equipos');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los equipos:', error);
                throw new Error('Error al obtener los equipos');
            })
        );
    }

    //createQu
    createQuarterfinals(tournamentId: number): Observable<boolean> {
        const url = `${this.apiUrl}CreateQuarterfinals?tournamentId=${tournamentId}`;
        return this.http.post<APIResponse<boolean>>(url, null).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve true si la creación es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron generar los cuartos de final');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para generar los cuartos de final:', error);
                throw new Error('Error al generar los cuartos de final');
            })
        );
    }

    //getQuarterFinalsMatches con el dto de matchInfoDTO
    getQuarterFinalsMatches(tournamentId: number): Observable<MatchInfoDTO[]> {
        const url = `${this.apiUrl}GetQuarterFinalsMatches?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<MatchInfoDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve los partidos si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los partidos de cuartos de final');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los partidos de cuartos de final:', error);
                throw new Error('Error al obtener los partidos de cuartos de final');
            })
        );
    }
    
    createSemifinals(tournamentId: number): Observable<boolean> {
        const url = `${this.apiUrl}CreateSemifinals?tournamentId=${tournamentId}`;
        return this.http.post<APIResponse<boolean>>(url, null).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve true si la creación es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron generar las semifinales');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para generar las semifinales:', error);
                throw new Error('Error al generar las semifinales');
            })
        );
    }

    getSemifinalsMatches(tournamentId: number): Observable<MatchInfoDTO[]> {
        const url = `${this.apiUrl}GetSemifinalsMatches?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<MatchInfoDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve los partidos si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los partidos de semifinales');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los partidos de semifinales:', error);
                throw new Error('Error al obtener los partidos de semifinales');
            })
        );
    }

    createFinal(tournamentId: number): Observable<boolean> {
        const url = `${this.apiUrl}CreateFinal?tournamentId=${tournamentId}`;
        return this.http.post<APIResponse<boolean>>(url, null).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve true si la creación es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo generar la final');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para generar la final:', error);
                throw new Error('Error al generar la final');
            })
        );
    }

    getFinalMatch(tournamentId: number): Observable<MatchInfoDTO> {
        const url = `${this.apiUrl}GetFinalMatch?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<MatchInfoDTO>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve el partido si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo obtener el partido de la final');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener el partido de la final:', error);
                throw new Error('Error al obtener el partido de la final');
            })
        );
    }
    getQuarterFinalsResults(tournamentId: number): Observable<MatchResultDTO[]> {
        const url = `${this.apiUrl}GetQuarterFinalsResults?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<MatchResultDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve los resultados si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los resultados de cuartos de final');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los resultados de cuartos de final:', error);
                throw new Error('Error al obtener los resultados de cuartos de final');
            })
        );
    }
    getSemifinalsResults(tournamentId: number): Observable<MatchResultDTO[]> {
        const url = `${this.apiUrl}GetSemifinalsResults?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<MatchResultDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve los resultados si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los resultados de semifinales');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los resultados de semifinales:', error);
                throw new Error('Error al obtener los resultados de semifinales');
            })
        );
    }
    getFinalMatchResult(tournamentId: number): Observable<MatchResultDTO> {
        const url = `${this.apiUrl}GetFinalResult?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<MatchResultDTO>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve el resultado si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudo obtener el resultado de la final');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener el resultado de la final:', error);
                throw new Error('Error al obtener el resultado de la final');
            })
        );
    }

    getPlayerStatsByTournamentId(tournamentId: number): Observable<TournamentPlayerStatsDTO[]> {
        const url = `${this.apiUrl}GetPlayerStatsByTournamentId?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<TournamentPlayerStatsDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve las estadísticas si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener las estadísticas de los jugadores');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener las estadísticas de los jugadores:', error);
                throw new Error('Error al obtener las estadísticas de los jugadores');
            })
        );
    }


    //createleaguematches
    createLeagueMatches(tournamentId: number): Observable<boolean> {
        const url = `${this.apiUrl}CreateLeagueMatches?tournamentId=${tournamentId}`;
        return this.http.post<APIResponse<boolean>>(url, null).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve true si la creación es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron generar los partidos de liga');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para generar los partidos de liga:', error);
                throw new Error('Error al generar los partidos de liga');
            })
        );
    }

    getLeagueMatches(tournamentId: number): Observable<MatchLeagueInfoDTO[]> {
        const url = `${this.apiUrl}GetLeagueMatches?tournamentId=${tournamentId}`;
        return this.http.get<APIResponse<MatchLeagueInfoDTO[]>>(url).pipe(
            map(response => {
                if (response.success && response.data) {
                    return response.data; // Devuelve los partidos si la solicitud es exitosa
                } else {
                    console.error('Error:', response.message);
                    throw new Error('No se pudieron obtener los partidos de liga');
                }
            }),
            catchError((error) => {
                console.error('Error en la solicitud para obtener los partidos de liga:', error);
                throw new Error('Error al obtener los partidos de liga');
            })
        );
    }
}