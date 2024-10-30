import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service'; 
import { User } from 'src/app/interfaces/user'; 
import { LoginDialogComponent } from '../login-dialog/login-dialog.component'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserRequestDTO } from 'src/app/interfaces/createUserRequestDTO'; // Asegúrate de importar la interfaz
import { APIResponse } from 'src/app/interfaces/APIResponse'; // Asegúrate de importar tu interfaz de respuesta

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  registerForm!: FormGroup;
  userTypes = [
    { value: 1, label: 'Jugador' },
    { value: 2, label: 'Árbitro' },
    { value: 3, label: 'Organizador' },
    { value: 4, label: 'Entrenador' }
  ];
  
  additionalField: string | null = null; // Almacena el tipo de campo adicional a mostrar

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userType: ['', Validators.required],
        additionalInfo: [''] // Se define sin validaciones inicialmente
    });

    // Configurar validaciones dinámicas según el tipo de usuario
    this.registerForm.get('userType')?.valueChanges.subscribe(value => {
        this.onUserTypeChange(value);
    });
}

onUserTypeChange(value: number) {
    const additionalInfoControl = this.registerForm.get('additionalInfo');

    // Limpiar validaciones anteriores
    additionalInfoControl?.clearValidators();
    additionalInfoControl?.setValue(''); // Reiniciar el valor de 'additionalInfo'

    // Asignar validaciones basadas en el tipo de usuario
    switch (value) {
      case 1: // Jugador
          this.additionalField = 'position';
          // No se requiere validación, el campo puede quedar null
          additionalInfoControl?.clearValidators(); // Limpiar validaciones anteriores
          break;
      case 2: // Árbitro
          this.additionalField = 'licenseNumber';
          // No se requiere validación, el campo puede quedar null
          additionalInfoControl?.clearValidators(); // Limpiar validaciones anteriores
          break;
      case 4: // Entrenador
          this.additionalField = 'licenseNumber';
          // No se requiere validación, el campo puede quedar null
          additionalInfoControl?.clearValidators(); // Limpiar validaciones anteriores
          break;
      case 3: // Organizador
          this.additionalField = 'organizationName';
          // No se requiere validación, el campo puede quedar null
          additionalInfoControl?.clearValidators(); // Limpiar validaciones anteriores
          break;
      default:
          this.additionalField = null;
          break; // Sin validación adicional si no se selecciona tipo de usuario
  }
  
  // Actualizar validez después de aplicar nuevas validaciones
  additionalInfoControl?.updateValueAndValidity();
}
  onSubmit() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
  
      // Construir el objeto CreateUserRequestDTO con valores específicos según el tipo de usuario
      const requestDTO: CreateUserRequestDTO = {
        username: formValues.username,
        passwordHash: formValues.password,
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        userType: formValues.userType,
        position: null, // Inicializa como null
        licenseNumber: null, // Inicializa como null
        organizationName: null // Inicializa como null
      };
  
      // Asignar valores específicos solo si corresponden al tipo de usuario
      if (formValues.userType === 1) { // Jugador
        requestDTO.position = formValues.additionalInfo;
      } else if (formValues.userType === 2) { // Árbitro
        requestDTO.licenseNumber = formValues.additionalInfo;
      } else if (formValues.userType === 4) { // Entrenador
        requestDTO.licenseNumber = formValues.additionalInfo;
      } else if (formValues.userType === 3) { // Organizador
        requestDTO.organizationName = formValues.additionalInfo;
      }
  
      // Llamar al servicio para crear el usuario
      this.userService.createUser(requestDTO).subscribe(
        (response: APIResponse<User>) => {
          if (response.success) {
            this.snackBar.open('Usuario creado con éxito', 'Cerrar', { duration: 3000 });
            this.closeDialog(); // Cierra el diálogo
          } else {
            this.snackBar.open(`Error: ${response.message}`, 'Cerrar', { duration: 3000 });
          }
        },
        (error) => {
          console.error('Error al crear el usuario:', error);
          this.snackBar.open('Error en la solicitud. Intente de nuevo.', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Por favor, completa todos los campos requeridos.', 'Cerrar', { duration: 3000 });
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