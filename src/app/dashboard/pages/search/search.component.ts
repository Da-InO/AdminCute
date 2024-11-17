import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  peliculas = [
    {
      titulo: 'Coraline',
      imagen: 'assets/coraline.jpg',
      descripcion: 'Coraline es una niña aburrida y triste en su nuevo hogar, con extraños vecinos arriba...',
      tags: ['1 h 40 min', '2009', '13+'],
      categorias: ['Drama', 'Fantasía', 'Animación'],
    },
  ];

  searchQuery: string = '';
  isSearching: boolean = false;
  isExtracting: boolean = false;
  progress: number = 0;
  searchCompleted: boolean = false;
  noResults: boolean = false;
  showError: boolean = false;
  movieName: string = ''; // Variable para el nombre de la película

  constructor() {}

  // Método para filtrar películas por título usando el valor de `searchQuery`
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
    this.showError = false;  // Asegura que no se muestre el error 404
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
    this.showError = false; // Resetear el error antes de empezar la extracción

    const interval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(interval);
        this.isExtracting = false;
        
        // Mostrar el mensaje de error al finalizar la extracción
        this.showError = true;
        this.movieName = 'Nombre de Película'; // Aquí puedes poner el nombre de la película real
      } else {
        this.progress += 10;
      }
    }, 300);
  }
}
