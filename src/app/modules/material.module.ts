import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";


import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";

import { MatSortModule } from "@angular/material/sort";

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormField } from "@angular/material/form-field";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { SidebarModule } from 'primeng/sidebar';
import { AppRoutingModule } from "./app-routing.module";
import { HotToastModule } from '@ngneat/hot-toast';



@NgModule({
    providers: [
    
    ],
    imports: [
      
      MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
    MatMenuModule,
    SidebarModule,
    MatSidenavModule, 
    MatIconModule,
    AppRoutingModule,
    MatDialogModule
      
     
     
    ],
    exports: [
      MatPaginatorModule,
      MatTableModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      MatIconModule,
      MatDialogModule,
      MatGridListModule,
      MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatMenuModule,
  SidebarModule,
  MatSidenavModule, 
MatIconModule,
AppRoutingModule,
MatDialogModule
      
    ]
  })
  export class MaterialModule { }