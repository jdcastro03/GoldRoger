import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { serverConfig } from '../server';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private baseUrl: string = `${serverConfig.serverUrl}Security/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserPermissionKeys(userId: number): Observable<{ [key: number]: string }> {
    const url = `${this.baseUrl}CheckPermission`;
    return this.http.post<{ [key: number]: string }>(url, { userId }).pipe(
      map(response => {
        console.log('Permisos obtenidos del servidor:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error fetching user permissions:', error);
        return of({});
      })
    );
  }
}