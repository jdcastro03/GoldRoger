import { NgModule } from "@angular/core";
import { RedirectCommand, RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { LoginPageComponent } from "src/app/pages/login-page/login-page.component";
import { LoginComponent } from "src/app/components/login/login.component";
import { NavigationComponent } from "../components/navigation/navigation.component";
import { LoginPageFormComponent } from "src/app/pages/login-page/login-page-form/login-page-form.component";
import { HomePageComponent } from "../pages/home-page/home-page.component";


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirige a /home cuando la URL es vacía
    { path: 'home', component: HomePageComponent },        // Ruta para el componente de Home
    // Puedes agregar otras rutas aquí
    {path: 'login', component: LoginComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes/*, { enableTracing: true }-*/)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}