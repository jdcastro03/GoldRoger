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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './services/interceptor.service';
import { TokenService } from './services/token.service';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoadingInterceptor } from './services/loading.service';
import { OrganizerPageComponent } from './pages/organizer-page/organizer-page.component';
import { OrganizerFormComponent } from './pages/organizer-page/organizer-form/organizer-form.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { OrganizerTournamentComponent } from './pages/organizer-page/organizer-tournament/organizer-tournament.component';
import { CoachPageComponent } from './pages/coach-page/coach-page.component';
import { CoachFormComponent } from './pages/coach-page/coach-form/coach-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CoachTournamentComponent } from './pages/coach-page/coach-tournament/coach-tournament.component';
import { PlayerPageComponent } from './pages/player-page/player-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { RefereePageComponent } from './pages/referee-page/referee-page.component';
import { PlayerStatsPageComponent } from './pages/player-page/player-stats-page/player-stats-page.component';
import { PlayerTournamentPageComponent } from './pages/player-page/player-tournament-page/player-tournament-page.component';
import { GlobalPlayerStatsPageComponent } from './pages/global-player-stats-page/global-player-stats-page.component';
import { OrganizerTournamentFormComponent } from './pages/organizer-page/organizer-tournament-form/organizer-tournament-form.component';
import { MatchDetailsPageComponent } from './pages/referee-page/match-details-page/match-details-page.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginPageFormComponent,
    LoginComponent,
    NavigationComponent,
    DashboardComponent,
    NavigationComponent,
    HomePageComponent,
    RegisterComponent,
    TournamentPageComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    ProfilePageComponent,
    OrganizerPageComponent,
    OrganizerFormComponent,
    NoAccessComponent, 
    OrganizerTournamentComponent,
    CoachPageComponent,
    CoachFormComponent,
    ConfirmDialogComponent,
    CoachTournamentComponent,
    PlayerPageComponent,
    TeamPageComponent,
    RefereePageComponent,
    PlayerStatsPageComponent,
    PlayerTournamentPageComponent,
    GlobalPlayerStatsPageComponent,
    OrganizerTournamentFormComponent,
    MatchDetailsPageComponent

    

  
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
    MatMenuModule,
    BrowserModule,
    MatIconModule,
    FormsModule
  
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ TokenService, JwtInterceptor, AuthService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },  UserService, provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }