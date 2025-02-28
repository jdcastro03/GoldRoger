import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Importar AuthService
import { APIResponse } from 'src/app/interfaces/APIResponse'; // Importar APIResponse
import { User } from 'src/app/interfaces/user'; // Importar User
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginVisible: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService // Inyectar AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const userDetails = {
        email: this.loginForm.value.email, // Cambiar 'username' por 'email'
        password: this.loginForm.value.password
      };
  
      this.authService.logIn(userDetails).then(
        (apiResponse: APIResponse<User>) => { // Asegúrate de que el tipo de respuesta sea APIResponse<User>
          if (apiResponse.success) {
            // Redireccionar si el login es exitoso
            this.router.navigate(['/tournament']);
            console.log('Login exitoso');
            console.log(localStorage.getItem('JWT_Token'));
          
          } else {
            // Manejar el caso de error (mostrar un mensaje o alert)
            console.log('Login fallido:', apiResponse.message);
            // Aquí puedes agregar un mensaje de error en la interfaz de usuario
          }
        }
      ).catch((error: any) => {
        // Manejar cualquier error adicional que ocurra en el proceso
        console.log('Error durante el login', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  onLoginClick() {
    document.querySelector('.overlay')?.classList.add('show');
    document.querySelector('.login-container')?.classList.add('show');
  }
  
  onCloseLogin() {
    document.querySelector('.overlay')?.classList.remove('show');
    document.querySelector('.login-container')?.classList.remove('show');
  }
}