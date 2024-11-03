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

}