import { Injectable } from '@angular/core';
import { SimulatorService } from './simulador.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private simulatorService: SimulatorService) {}

  // Obtiene los datos simulados de usuarios
  getUsersData(): Observable<any> {
    return this.simulatorService.simulateUsers();
  }

  // Obtiene los datos simulados de métricas
  getMetricsData(): Observable<any> {
    return this.simulatorService.simulateMetrics();
  }

  // Obtiene datos simulados de películas
  getMoviesData(): Observable<any[]> {
    return this.simulatorService.simulateMovies();
  }

  // Obtiene datos simulados del dashboard
  getDashboardData(): Observable<any> {
    return this.simulatorService.simulateDashboardData();
  }
}
