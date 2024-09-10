import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { UserService } from 'src/app/services/user.service';
import { AppRoutingModule } from './modules/app-routing.module';
import { RouterModule } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from './modules/material.module';
import { DialogAddEditComponent } from './dialogs/dialog-add-edit/dialog-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserPageComponent,
    DialogAddEditComponent

  
    // otros componentes
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MaterialModule
  
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserService, provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
  exports: [RouterModule, UserPageComponent]
})
export class AppModule { }