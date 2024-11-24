import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

interface ExtractionResult {
  success: boolean;
  message?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  peliculas: any[] = [];
  searchQuery: string = '';
  isSearching: boolean = false;
  isExtracting: boolean = false;
  progress: number = 0;
  searchCompleted: boolean = false; 
  noResults: boolean = false;
  showError: boolean = false;
  movieName: string = '';

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  // Carga las películas desde el servicio
  loadMovies(): void {
    this.searchService.getMovies().subscribe((data: any) => {
      this.peliculas = data;
    });
  }

  // Método para filtrar películas por título usando el valor de searchQuery
  get filteredPeliculas() {
    return this.peliculas.filter((pelicula) =>
      pelicula.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Simula la búsqueda con barra de carga
  simulateSearch() {
    if (!this.searchQuery.trim()) return;

    this.isSearching = true;
    this.searchCompleted = false;
    this.noResults = false;
    this.showError = false;
    this.progress = 0;

    const interval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(interval);
        this.isSearching = false;
        this.searchCompleted = true;

        const hasResults = this.filteredPeliculas.length > 0;
        this.noResults = !hasResults;
      } else {
        this.progress += 10;
      }
    }, 300);
  }

  // Simula la extracción con barra de carga
  startExtraction() {
    this.isExtracting = true;
    this.progress = 0;
    this.showError = false;

    const interval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(interval);
        this.isExtracting = false;

        // Simula la extracción de la película
        this.searchService.extractMovie(this.searchQuery).subscribe((result: ExtractionResult) => {
          this.showError = !result.success;
          this.movieName = this.searchQuery;
        });
      } else {
        this.progress += 10;
      }
    }, 300);
  }
}
