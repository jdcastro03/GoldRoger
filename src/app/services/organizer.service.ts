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
}