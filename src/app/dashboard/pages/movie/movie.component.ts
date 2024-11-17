import { Component } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  nombre: string = 'Tu Nombre'; 
  num: number = 10; 
  movies = Array(6).fill({
    image: 'assets/coraline.jpg',
    title: 'Coraline',
    description: 'Coraline es una niña aburrida y triste en su nuevo hogar...',
    duration: '1 h 40 min',
    year: '2009',
    rating: '13+',
    tags: ['Drama', 'Fantasía']
  });

  showList: boolean = true; // Para mostrar la lista o los detalles
  selectedMovie: any = null; // Película seleccionada

  viewDetails(movie: any) {
    this.selectedMovie = movie;
    this.showList = false;
  }

  goBack() {
    this.showList = true;
    this.selectedMovie = null;
  }
}
