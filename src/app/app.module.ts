import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/components/header/header.component';
import { ExtractionComponent } from './dashboard/pages/extraction/extraction.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { MovieComponent } from './dashboard/pages/movie/movie.component';
import { SearchComponent } from './dashboard/pages/search/search.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    ExtractionComponent,
    HomeComponent,
    MovieComponent,
    SearchComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgApexchartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
