import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse } from 'src/app/interfaces/APIResponse';
import { User } from 'src/app/interfaces/user';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'] // Corregido el nombre del archivo a 'styleUrls'
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup; // Definimos el formulario de login

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>, // Inyecta MatDialogRef
    private dialog: MatDialog // Inyecta MatDialog para abrir otros diálogos
  ) {
    // Inicializamos el formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validaciones para el correo
      password: ['', [Validators.required, Validators.minLength(6)]] // Validaciones para la contraseña
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const userDetails = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      // Llama al servicio de autenticación
      this.authService.logIn(userDetails).then(
        (apiResponse: APIResponse<User>) => {
          if (apiResponse.success) {
            // Cerrar el diálogo en caso de éxito
            this.dialogRef.close();
            // Redireccionar si el login es exitoso
            this.router.navigate(['/home']);
            console.log('Login exitoso');
            console.log(localStorage.getItem('JWT_Token'));
          } else {
            // Manejar el caso de error (mostrar un mensaje o alert)
            console.log('Login fallido:', apiResponse.message);
            // Aquí puedes agregar un mensaje de error en la interfaz de usuario
          }
        }
      );
    } else {
      console.log('Formulario no válido'); // Mensaje de depuración
    }
  }

  navigateToRegister() {
  this.dialogRef.close(); // Cierra el diálogo de inicio de sesión
  this.dialog.open(RegisterDialogComponent); // Abre el diálogo
  }

  closeDialog() {
    this.dialogRef.close(); // Cerrar el diálogo
  }
}