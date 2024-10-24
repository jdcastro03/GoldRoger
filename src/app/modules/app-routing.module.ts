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
import { AuthGuardService } from "../guards/auth.guard";


const routes: Routes = [

   //even if there is no route for the root path, the router will redirect to the home path


    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomePageComponent },        // Ruta para el componente de Home
    // Puedes agregar otras rutas aquí
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'tournament', component: TournamentPageComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes/*, { enableTracing: true }-*/)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}