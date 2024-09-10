import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerUrl, serverConfig } from '../server';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UserService  {

  private baseUrl: string = serverConfig.serverUrl; // Usar el valor de la URL desde serverConfig
  private apiUrl: string = `${this.baseUrl}User/`; // Construcción de la URL API
  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}GetUsers`);
                               

  }

  add(modelo:User):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}CreateUser`,modelo);
  }

  update(userId: number, modelo: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/UpdateUser?id=${userId}`, modelo);
  }
  
  delete(userId: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/DeleteUser?id=${userId}`);

  }
}