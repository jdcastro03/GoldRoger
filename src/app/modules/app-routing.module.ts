import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { UserPageComponent } from "src/app/user-page/user-page.component";


const routes: Routes = [
  { path: 'User', component: UserPageComponent }
    

];
@NgModule({
    imports: [RouterModule.forRoot(routes/*, { enableTracing: true }-*/)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}