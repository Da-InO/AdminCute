import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

interface ExtractionResult {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private configService: ConfigService) {}

  // Obtiene las películas disponibles para búsqueda
  getMovies(): Observable<any[]> {
    return this.configService.getMoviesData();
  }

  // Simula la extracción de una película en caso de no encontrarla
  extractMovie(movieName: string): Observable<ExtractionResult> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({
          success: false,
          message: `No se pudo extraer la película: ${movieName}`,
        });
        observer.complete();
      }, 2000);
    });
  }
}
