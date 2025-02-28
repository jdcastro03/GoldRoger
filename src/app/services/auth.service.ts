import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { serverConfig } from '../server'; // Importar serverConfig para obtener la URL del servidor
import { HttpHeaders } from '@angular/common/http';
import { APIResponse } from '../interfaces/APIResponse';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = serverConfig.serverUrl; // Usar la URL base del servidor
  private apiUrl: string = `${this.baseUrl}Session/`; // Construcción de la URL API para autenticación

  isLoggedIn: boolean = false;
  currentUser: any;
   

constructor(private http: HttpClient, private router: Router) {
  // Restaurar sesión desde localStorage si existe
  const storedUser = localStorage.getItem('currentUser');
  const storedToken = localStorage.getItem('JWT_Token');
  if (storedUser && storedToken) {
    this.currentUser = JSON.parse(storedUser);  // Asigna el usuario almacenado
    this.isLoggedIn = true;  // Marca como autenticado
  }
}

  async logIn(data: { email: string; password: string }, options?: any): Promise<APIResponse<User>> {
    const apiResponse: APIResponse<User> = {
      success: false,
      message: '',
      data: null,
    };
  
    // Asigna valores vacíos si el correo electrónico o la contraseña no están definidos
    data.email = data.email || ""; 
    data.password = data.password || ""; 
  
    try {
      // Llamar al método post y obtener la respuesta
      const response = await this.http.post<APIResponse<User>>(`${this.apiUrl}Login`, data).toPromise();
  
    
      // Asignar el usuario actual y guardar en localStorage
      if (response && response.data) {
        this.currentUser = response.data;
      }
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      localStorage.setItem("JWT_Token", this.currentUser.jwToken); // Guardar el token JWT
      this.isLoggedIn = true;
  
      // Redirigir si se proporciona la opción
      if (options && options.redirect) {
        this.router.navigateByUrl('/');
      }
  
      // Configurar la respuesta exitosa
      apiResponse.success = true;
      apiResponse.message = 'Inicio de sesión exitoso';
      apiResponse.data = this.currentUser; // Asignar el usuario a la respuesta
      return apiResponse;
  
    } catch (error) {
      // Manejar errores y configurar la respuesta
      apiResponse.success = false;
      apiResponse.message = error instanceof Error ? error.message : 'Error al iniciar sesión';
      return apiResponse;
    }
  }

  logout(): void {
    localStorage.removeItem('JWT_Token');
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}