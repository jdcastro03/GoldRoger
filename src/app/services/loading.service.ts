
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  private countRequest = 0; // Contador de solicitudes en cola

  constructor(private spinner: NgxSpinnerService) {}

  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();  // Muestra el spinner

    return next.handle(req).pipe(
      finalize(() => {
        this.spinner.hide();  // Oculta el spinner una vez que la solicitud termine
      }),
      catchError((error) => {
        this.spinner.hide();  // Asegura que se oculte en caso de error
        throw error;
      })
    );
  }
}