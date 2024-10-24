import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service'; 
import { User } from 'src/app/interfaces/user'; 
import { LoginDialogComponent } from '../login-dialog/login-dialog.component'; 

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = {
        userId: 0, // Asumiendo que el ID se asigna automáticamente
        username: this.registerForm.value.username,
        passwordHash: this.registerForm.value.password, // Asegúrate de que esto coincida con tu lógica de hash
        email: this.registerForm.value.email,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        userType: Number(this.registerForm.value.userType), // Convierte a número
        // Resto de propiedades opcionales, si es necesario
      };

      this.userService.add(user).subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          this.dialogRef.close(); // Cierra el diálogo después del registro exitoso
        },
        (error) => {
          console.error('Error al registrar el usuario', error);
          // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
        }
      );
    } else {
      console.log('Formulario inválido');
      // Aquí podrías mostrar algún mensaje o cambiar el estado visual del formulario
    }
  }

  navigateToLogin() {
    this.dialogRef.close(); // Cierra el diálogo de registro
    this.dialog.open(LoginDialogComponent); // Abre el diálogo de inicio de sesión
  }

  closeDialog() {
    this.dialogRef.close(); // Cierra el diálogo
  }
}