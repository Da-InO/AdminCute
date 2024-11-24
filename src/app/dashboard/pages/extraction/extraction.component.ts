import { Component, OnInit } from '@angular/core';
import { ExtractionService } from 'src/app/services/extraction.service';

@Component({
  selector: 'app-extraction',
  templateUrl: './extraction.component.html',
  styleUrls: ['./extraction.component.css'],
})
export class ExtractionComponent implements OnInit {
  peliculas: any[] = [];
  filteredPeliculas: any[] = [];
  displayedPeliculas: any[] = []; // Películas que se muestran en la página actual
  searchQuery: string = '';
  isSearching: boolean = false;
  isExtracting: boolean = false;
  progress: number = 0;
  searchCompleted: boolean = false;
  noResults: boolean = false;
  showError: boolean = false;
  movieName: string = '';
  showMessage: boolean = false;
  startDate: string = '';
  endDate: string = '';
  num_peliculas: number = 0;
  num_segundos: number = 0;
  categories: string[] = ['Drama', 'Comedia', 'Acción', 'Terror', 'Aventura', 'Romance'];
  selectedCategories: string[] = [];
  cart: any[] = [];
  isCartVisible: boolean = false;

  // Paginación
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 10; // Cantidad de películas por página
  totalPages: number = 1; // Número total de páginas

  constructor(private extractionService: ExtractionService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  // Carga todas las películas
  loadMovies(): void {
    this.extractionService.getPeliculas().subscribe((data: any) => {
      this.peliculas = data;
      this.filteredPeliculas = data;
      this.updatePagination(); // Actualiza los datos para la paginación
    });
  }

  // Actualiza los datos de paginación
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPeliculas.length / this.itemsPerPage);
    this.changePage(1); // Cambia a la primera página por defecto
  }

  // Cambia la página actual
  changePage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedPeliculas = this.filteredPeliculas.slice(startIndex, endIndex);
  }

  // Simula la búsqueda con filtros de nombre, categorías y fechas
  simulateSearch(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.searchQuery.trim()) {
      this.filteredPeliculas = this.peliculas.filter((pelicula) => {
        const matchesName = pelicula.titulo.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory =
          this.selectedCategories.length === 0 ||
          this.selectedCategories.some((category) => pelicula.categorias.includes(category));
        const releaseDate = pelicula.release_date ? new Date(pelicula.release_date) : null;
        const startDate = this.startDate ? new Date(this.startDate) : null;
        const endDate = this.endDate ? new Date(this.endDate) : null;
        const matchesDate =
          (!startDate || (releaseDate && releaseDate >= startDate)) &&
          (!endDate || (releaseDate && releaseDate <= endDate));
        return matchesName && matchesCategory && matchesDate;
      });

      this.noResults = this.filteredPeliculas.length === 0;
      this.updatePagination(); // Actualiza la paginación después de buscar
    }
  }

  // Maneja la selección de categorías
  toggleCategory(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter((c) => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }

  // Filtra las películas según fechas y categorías seleccionadas
  applyFilters(): void {
    const startDate = this.startDate ? new Date(this.startDate) : null;
    const endDate = this.endDate ? new Date(this.endDate) : null;

    this.filteredPeliculas = this.peliculas.filter((pelicula) => {
      const matchesCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.some((category) => pelicula.categorias.includes(category));
      const releaseDate = pelicula.release_date ? new Date(pelicula.release_date) : null;
      const matchesDate =
        (!startDate || (releaseDate && releaseDate >= startDate)) &&
        (!endDate || (releaseDate && releaseDate <= endDate));
      return matchesCategory && matchesDate;
    });

    this.updatePagination(); // Actualiza la paginación después de aplicar filtros
  }

  // Maneja el cambio de fechas
  handleDateChange(): void {
    this.applyFilters();
  }

  // Borra los filtros aplicados
  clearFilters(): void {
    this.searchQuery = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedCategories = [];
    this.filteredPeliculas = [...this.peliculas];
    this.noResults = false;
    this.showMessage = false;
    this.updatePagination(); // Actualiza la paginación después de borrar filtros
  }

  // Simula la extracción con barra de carga
  startExtraction(): void {
    if (this.cart.length === 0) {
      alert('El carrito está vacío. Agrega películas antes de extraer.');
      return;
    }

    this.isExtracting = true;
    this.showMessage = false;
    this.progress = 0;

    const interval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(interval);
        this.isExtracting = false;

        this.num_peliculas = this.cart.length;
        this.num_segundos = 5; // Simula el tiempo de extracción
        this.showMessage = true;

        // Vaciar el carrito después de la extracción
        this.cart = [];
      } else {
        this.progress += 20;
      }
    }, 300);
  }

  // Agrega una película al carrito
  addMovie(movie: any): void {
    if (!this.cart.includes(movie)) {
      this.cart.push(movie);
      alert(`Película "${movie.titulo}" añadida al carrito.`);
    } else {
      alert(`La película "${movie.titulo}" ya está en el carrito.`);
    }
  }

  // Muestra/oculta el carrito
  toggleCartVisibility(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  // Elimina una película del carrito
  removeMovie(movie: any): void {
    this.cart = this.cart.filter((m) => m !== movie);
  }

  // Cierra el mensaje de extracción completa
  closeMessage(): void {
    this.showMessage = false;
  }
}
