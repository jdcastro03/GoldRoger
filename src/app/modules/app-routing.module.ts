import { NgModule } from "@angular/core";
import { RedirectCommand, RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { LoginPageComponent } from "src/app/pages/login-page/login-page.component";
import { LoginComponent } from "src/app/components/login/login.component";
import { NavigationComponent } from "../components/navigation/navigation.component";
import { LoginPageFormComponent } from "src/app/pages/login-page/login-page-form/login-page-form.component";
import { HomePageComponent } from "../pages/home-page/home-page.component";
import { RegisterComponent } from "../components/register/register.component";
import { TournamentPageComponent } from "../pages/tournament-page/tournament-page.component";
import { AuthGuard } from "../guards/auth.guard";
import { ProfilePageComponent } from "../pages/profile-page/profile-page.component";
import { LoginDialogComponent } from "../components/login-dialog/login-dialog.component";
import { OrganizerPageComponent } from "../pages/organizer-page/organizer-page.component";
import { NoAccessComponent } from "../components/no-access/no-access.component";
import { OrganizerTournamentComponent } from "../pages/organizer-page/organizer-tournament/organizer-tournament.component";
import { CoachPageComponent } from "../pages/coach-page/coach-page.component";
import { CoachTournamentComponent } from "../pages/coach-page/coach-tournament/coach-tournament.component";
import { PlayerPageComponent } from "../pages/player-page/player-page.component";
import { TeamPageComponent } from "../pages/team-page/team-page.component";
import { RefereePageComponent } from "../pages/referee-page/referee-page.component";
import { PlayerStatsPageComponent } from "../pages/player-page/player-stats-page/player-stats-page.component";
import { PlayerTournamentPageComponent } from "../pages/player-page/player-tournament-page/player-tournament-page.component";
import { GlobalPlayerStatsPageComponent } from "../pages/global-player-stats-page/global-player-stats-page.component";
import { MatchDetailsPageComponent } from "../pages/referee-page/match-details-page/match-details-page.component";
const routes: Routes = [

   //even if there is no route for the root path, the router will redirect to the home path


    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomePageComponent },        // Ruta para el componente de Home
    // Puedes agregar otras rutas aquí
    {path: 'login', component: LoginDialogComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'tournament', component: TournamentPageComponent},
    {path: 'profile', component: ProfilePageComponent},
    {path: 'organizer', component: OrganizerPageComponent, canActivate: [AuthGuard]},
    { path: 'sinAcceso', component: NoAccessComponent },
    { path: 'tournament/:id', component: OrganizerTournamentComponent }, // Ruta dinámica
    {path : 'coachTeam', component: CoachPageComponent, canActivate: [AuthGuard]},
    {path: 'coachTournament', component: CoachTournamentComponent},
    {path: 'playerTeam', component: PlayerPageComponent},
    {path: 'teams', component: TeamPageComponent},
    {path: 'referee', component: RefereePageComponent},
    {path: 'playerStats', component: PlayerStatsPageComponent},
    {path: 'playerStats/:id', component: GlobalPlayerStatsPageComponent},
    {path : 'playerTournament', component: PlayerTournamentPageComponent},
    {path: 'coachTournament', component: CoachTournamentComponent},
    {path: 'match/:id', component: MatchDetailsPageComponent}

];
@NgModule({
    imports: [RouterModule.forRoot(routes/*, { enableTracing: true }-*/)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}