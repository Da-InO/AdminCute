import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from './movie.model';
import { ConfigService } from './config.service'; // Importa ConfigService para obtener los datos iniciales

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies: Movie[] = [];

  constructor(private configService: ConfigService) {}

  // Retorna la lista de películas
  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  // Carga las películas desde ConfigService y las agrega a la lista
  loadMovies(): void {
    this.configService.getMoviesData().subscribe((movies) => {
      this.addMovies(movies);
    });
  }

  // Agrega una sola película
  addMovie(movie: Movie): void {
    this.movies.push({ ...movie, id: this.movies.length + 1 });
  }

  // Agrega múltiples películas
  addMovies(movies: Movie[]): void {
    movies.forEach((movie) => {
      this.movies.push({ ...movie, id: this.movies.length + 1 });
    });
  }

  // Borra todas las películas (reinicia el array)
  clearMovies(): void {
    this.movies = [];
  }
}
