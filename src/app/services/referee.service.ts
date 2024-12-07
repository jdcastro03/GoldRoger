import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServerUrl, serverConfig } from '../server';
import { User } from '../interfaces/user';
import { CreateUserRequestDTO } from '../interfaces/createUserRequestDTO';
import { APIResponse } from '../interfaces/APIResponse';
import { RefereeDTO } from '../interfaces/RefereeDTO';

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
    


}