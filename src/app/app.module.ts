import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserService } from 'src/app/services/user.service';
import { AppRoutingModule } from './modules/app-routing.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from './modules/material.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginPageFormComponent } from './pages/login-page/login-page-form/login-page-form.component';
import { LoginComponent } from './components/login/login.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageComponent } from './pages/home-page/home-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginPageFormComponent,
    LoginComponent,
    NavigationComponent,
    DashboardComponent,
    NavigationComponent,
    HomePageComponent
    

  
    // otros componentes
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MaterialModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserService, provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }