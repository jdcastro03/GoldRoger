import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ForStatement } from 'typescript';
@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrl: './dialog-add-edit.component.css'
})
export class DialogAddEditComponent implements OnInit {

  userForm : FormGroup;
  tituloAccion : string = "Nuevo";
  botonAccion : string = "Guardar";

  constructor(private dialogoReferencia : MatDialogRef<DialogAddEditComponent>, private fb : FormBuilder, private _snackbar : MatSnackBar, private userService : UserService){ 

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    
  }
  mostrarAlerta(msg: string, action: string) {
    this._snackbar.open(msg, action,{

      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  addUser(){


    console.log(this.userForm.value);
  const modelo : User = {
    userId: 0,
    name: this.userForm.value.name,
    lastName: this.userForm.value.lastName
  }

  this.userService.add(modelo).subscribe({
    next: data => {
      this.mostrarAlerta('Usuario creado correctamente', 'Cerrar');
      this.dialogoReferencia.close("creado");
    },error: error => {
    this.mostrarAlerta('Error al crear el usuario', 'Cerrar');
    }

  })

  

  
}

ngOnInit(): void {
    
}
}