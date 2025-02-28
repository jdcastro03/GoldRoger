import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse } from 'src/app/interfaces/APIResponse';
import { User } from 'src/app/interfaces/user';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingInterceptor } from 'src/app/services/loading.service';
import { Observable } from 'rxjs';
import { PermissionService } from 'src/app/services/permission.service';
@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loadingService: LoadingInterceptor,
    private permissionService: PermissionService
  ) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
 
  }

  ngOnInit(): void {

   
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userDetails = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
  
      // Realiza la llamada de inicio de sesión
      this.authService.logIn(userDetails).then(
        (apiResponse: APIResponse<User>) => {
          if (apiResponse.success) {
            this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
            console.log('Inicio de sesión exitoso', apiResponse.data);
          
            // Guardar datos del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(apiResponse.data));
            const userId = localStorage.getItem('user.userId');
            
              const permissionKeysResponse = this.permissionService.getUserPermissionKeys(Number(userId));
              console.log('Permisos del usuario:', permissionKeysResponse);
        
            if (apiResponse.data) {
              localStorage.setItem('user.userId', apiResponse.data.userId.toString());
            }
            //imprimeme todo lo que hay en local storage
            console.log('LocalStorage:', localStorage);
  
            this.dialogRef.close();
            this.router.navigate(['/home']); // Redireccionar a la página de perfil
          
          } else {
            this.snackBar.open('Credenciales incorrectas', 'Cerrar', { duration: 3000 });
          }
        },
        (error) => {
          this.snackBar.open('Error al iniciar sesión', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Por favor, rellene todos los campos', 'Cerrar', { duration: 3000 });
    }
  }

  navigateToRegister() {
    this.dialogRef.close();
    this.dialog.open(RegisterDialogComponent);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}