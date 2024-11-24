import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExtractionService {
  constructor(private configService: ConfigService) {}

  // Obtiene todas las películas desde el simulador/configuración
  getPeliculas(): Observable<any[]> {
    return this.configService.getMoviesData();
  }

  // Extrae las películas basadas en los filtros aplicados
  extractPeliculas(searchQuery: string, minVotes: number): Observable<any> {
    // Simula la lógica de extracción con ambos argumentos
    return of({
      success: true, // O false en caso de error simulado
      data: [], // Resultados simulados de la extracción
    });
  }
}