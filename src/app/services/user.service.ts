import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerUrl, serverConfig } from '../server';
import { User } from '../interfaces/user';
import { CreateUserRequestDTO } from '../interfaces/createUserRequestDTO';
import { APIResponse } from '../interfaces/APIResponse';
import { UpdateUserRequestDTO } from '../interfaces/updateUserRequestDTO';

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

  createUser(requestDTO: CreateUserRequestDTO): Observable<APIResponse<User>> {
    return this.http.post<APIResponse<User>>(`${this.apiUrl}CreateUser`, requestDTO);
  }
  updateUser(userId: number, userData: UpdateUserRequestDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}UpdateUser?id=${userId}`, userData);
  }
  
  
  delete(userId: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}DeleteUser?id=${userId}`);

  }
}