import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa tus componentes y el guard
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { SearchComponent } from './dashboard/pages/search/search.component';
import { MovieComponent } from './dashboard/pages/movie/movie.component';
import { ExtractionComponent } from './dashboard/pages/extraction/extraction.component';

const routes: Routes = [
  // Ruta principal redirigiendo al login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rutas del login y registro
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Ruta protegida para el dashboard (requiere autenticación)
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard], // Protege las rutas dentro de dashboard
    children: [
      { path: '', component: HomeComponent }, // Ruta por defecto del dashboard
      { path: 'users', component: UsersComponent },
      { path: 'search', component: SearchComponent },
      { path: 'movie', component: MovieComponent },
      { path: 'extraction', component: ExtractionComponent }
    ]
  },

  // Rutas adicionales
  { path: 'extraccion', component: ExtractionComponent },
  { path: 'busqueda', component: SearchComponent },

  // Ruta de captura de errores (cualquier ruta no definida)
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuración de rutas
  exports: [RouterModule] // Exportación para que se pueda usar en el módulo principal
})
export class AppRoutingModule { }
