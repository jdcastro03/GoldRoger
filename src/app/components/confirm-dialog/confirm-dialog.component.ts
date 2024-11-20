import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent> // Inyectamos el MatDialogRef para cerrar el diálogo
  ) {}

  onCancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo y retorna false
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Cierra el diálogo y retorna true
  }
}