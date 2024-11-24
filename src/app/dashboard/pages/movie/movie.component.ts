import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  nombre: string = 'Tu Nombre';
  num: number = 10;
  movies = Array(20).fill({
    id: 1,
    image: 'assets/coraline.jpg',
    title: 'Coraline',
    original_title: 'Coraline',
    overview: 'Coraline es una niña aburrida y triste en su nuevo hogar...',
    tagline: 'Sé valiente, Coraline.',
    release_date: '2009-02-06',
    runtime: 100,
    vote_average: 7.8,
    vote_count: 4000,
    poster_path: 'assets/coraline.jpg',
    backdrop_path: 'assets/coraline-backdrop.jpg',
    homepage: 'https://www.example.com/coraline',
    imdb_id: 'tt0327597',
    original_language: 'en',
    budget: 60000000,
    revenue: 124600000,
    status: 'Released',
    popularity: 70.5,
    tags: ['Drama', 'Fantasía'],
  });

  // Variables para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 10; // Muestra 10 películas por página
  paginatedMovies: any[] = [];
  pagination: number[] = [];

  showList: boolean = true; // Para mostrar la lista o los detalles
  selectedMovie: any = null; // Película seleccionada

  ngOnInit() {
    this.setupPagination();
  }

  // Configura la paginación inicial
  setupPagination() {
    const totalPages = Math.ceil(this.movies.length / this.itemsPerPage);
    this.pagination = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.changePage(1);
  }

  // Cambia de página en la lista de películas
  changePage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedMovies = this.movies.slice(startIndex, endIndex);
  }

  // Muestra los detalles de una película
  viewDetails(movie: any) {
    this.selectedMovie = movie;
    this.showList = false;
  }

  // Regresa a la lista de películas
  goBack() {
    this.showList = true;
    this.selectedMovie = null;
  }

  // Da "Like" a una película
  likeMovie(movie: any, event: Event) {
    event.stopPropagation(); // Evita que se active el evento "click" del card
    movie.likes = (movie.likes || 0) + 1;
    alert(`¡Te gustó "${movie.title}"!`);
  }

  // Quita una película de la lista
  removeMovie(movie: any, event: Event) {
    event.stopPropagation(); // Evita que se active el evento "click" del card
    this.movies = this.movies.filter(m => m.id !== movie.id);
    this.setupPagination(); // Recalcula la paginación después de eliminar
    alert(`"${movie.title}" ha sido eliminado de tu lista.`);
  }
}
