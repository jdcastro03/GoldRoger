import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private baseUrl: string = 'http://localhost:3000/';

  url: string = '';

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  testConnection(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + 'hello').subscribe(
        (data) => resolve(data),
        (httpError: any) => { reject(httpError.error); }
      );
    });
  }

  /** Function used to get all documents, no params needed */
  get(path: string = ""): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + this.url + path).subscribe(
        (data) => resolve(data),
        (httpError: any) => { reject(httpError.error); }
      );
    });
  }

  getParams(urlParams: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + this.url + urlParams).subscribe(
        (data) => resolve(data),
        (httpError: any) => { reject(httpError.error); }
      );
    });
  }

  getById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + this.url + '/' + id).subscribe(
        (data) => resolve(data),
        (httpError: any) => { reject(httpError.error); }
      );
    });
  }

  /** Posts a body to the server in the route defined by the url set by the service */
  post(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + this.url, body).subscribe(
        (data) => { resolve(data); },
        (httpError: any) => { reject(httpError.error); }
      );
    });
  }

  /** Finds all documents that match the findParams provided */
  find(findParams: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + this.url + '/find', findParams).subscribe(
        (data) => resolve(data),
        (httpError: any) => { reject(httpError.error); }
      );
    });
  }

  /** Updates the document that matches the _id, with the body sent */
  put(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl + this.url, body).subscribe(
        data => { resolve(data); },
        (httpError: any) => { reject(httpError.error); });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseUrl + this.url + '/' + id).subscribe(
        (data) => resolve(data),
        (httpError: any) => { reject(httpError.error); }
      );
    });
  }

  custom(endPoint: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + this.url + '/' + endPoint, body).subscribe(
        (data) => resolve(data),
        (httpError: any) => { reject(httpError.error); }
      );
    });
  }

  /** Form utilities method */
  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

}