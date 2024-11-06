import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'] // Corregir a 'styleUrls'
})
export class NavigationComponent {

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    isLoggedIn: boolean = false; // Estado de autenticación
  currentUserName: string | null = null; // Nombre del usuario autenticado
    constructor(
      public dialog: MatDialog, 
      private authService: AuthService, // Inyectar AuthService
      private router: Router, // Inyectar Router para redireccionar en logout
      private snackBar: MatSnackBar // Inyectar MatSnackBar
    ) {}
  
    ngOnInit(): void {
      // Verificar si el usuario está autenticado
      this.isLoggedIn = this.authService.isAuthenticated();
      
      // Restaurar el nombre del usuario desde el localStorage si la página se recarga
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        this.currentUserName = parsedUser.username; // Asignar el nombre del usuario desde el localStorage
      
      }
      //actualiza el nombre del usuario
      
     
    }
  
    // Función para abrir el diálogo de login
    openLoginDialog(): void {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: '400px',
        backdropClass: 'custom-backdrop'
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('El diálogo de login ha sido cerrado');
        // Verificar nuevamente si está autenticado después de cerrar el diálogo
        this.isLoggedIn = this.authService.isAuthenticated();
        if (this.isLoggedIn) {
          const currentUser = this.authService.currentUser;
          if (currentUser) {
            this.currentUserName = currentUser.username; // Asegurar que actualizamos correctamente el nombre del usuario
          }
        }
      });
    }
  
    // Función para abrir el diálogo de registro
    openRegisterDialog(): void {
      const dialogRef = this.dialog.open(RegisterDialogComponent, {
        width: '400px',
        backdropClass: 'custom-backdrop'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('El diálogo de registro ha sido cerrado');
      });
    }
  
    // Función para cerrar sesión
    logout(): void {
      this.authService.logout(); // Llamar al método de logout
      this.isLoggedIn = false;
      this.currentUserName = null; // Limpiar el nombre del usuario
      this.router.navigate(['/home']); // Redirigir al inicio
      this.snackBar.open('Sesión cerrada', 'Cerrar', { duration: 3000 }); // Notificación de éxito
      //limpia el local storage todo
      localStorage.clear();
      
    }
}