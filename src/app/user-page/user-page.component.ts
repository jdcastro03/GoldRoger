import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../interfaces/user';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEditComponent } from '../dialogs/dialog-add-edit/dialog-add-edit.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.showUsers();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showUsers() {
    this.userService.getUsers().subscribe(data => {
      this.dataSource.data = data;
    });
  }
  newUserDialog() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      width: '250px',
      data: { titulo: 'Nuevo Usuario', accion: 'Guardar' }
    }).afterClosed().subscribe(result => {
      if (result === 'creado') {
        this.showUsers();
      }
    }
    )

  }
}