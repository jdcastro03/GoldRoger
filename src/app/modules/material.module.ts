import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

// PrimeNG
import { SidebarModule } from 'primeng/sidebar';

// Toast Notifications
import { ToastrModule } from 'ngx-toastr';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  imports: [
    // Angular Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    MatDatepickerModule,
    MatListModule,
    MatTabsModule,
    MatNativeDateModule,
    MatSortModule,
    MatSidenavModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    // PrimeNG Module
    SidebarModule,
    NgxSpinnerModule,
    MatPaginatorModule,

    // Routing and Animations
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,

    // Toast Modules
    ToastrModule.forRoot(),
    HotToastModule.forRoot({
      position: 'top-right' // Posición en la esquina superior derecha
    }),

    // Reactive Forms
    ReactiveFormsModule
  ],
  exports: [
    // Angular Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    MatDatepickerModule,
    MatListModule,
    MatTabsModule,
    MatNativeDateModule,
    MatSortModule,
    MatSidenavModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableModule,
    // PrimeNG Module
    SidebarModule,
    MatIconModule,

    // Routing and Animations
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
  

    // Toast Modules
    ToastrModule, 
    HotToastModule,

    // Reactive Forms
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MaterialModule { }