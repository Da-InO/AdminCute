import { Component } from '@angular/core';

@Component({
  selector: 'app-extraction',
  templateUrl: './extraction.component.html',
  styleUrls: ['./extraction.component.css']
})
export class ExtractionComponent {
  tags = ['Drama', 'Comedia', 'Acción', 'Terror', 'Aventura'];
  selectedTags: string[] = [];
  minVotes = 100;
  isExtracting = false;
  progress = 0;
  showMessage = false;
  num_peliculas = 0;
  num_segundos = 0;

  // Aquí defines la lista de películas
  peliculas = [
    {
        titulo: 'Coraline',
        imagen: 'assets/coraline.jpg',
        descripcion: 'Coraline es una niña aburrida y triste en su nuevo hogar, con extraños vecinos arriba...',
        tags: ['1 h 40 min', '2009', '13+'],
        categorias: ['Drama', 'Fantasía', 'Animación']
    },
    {
        titulo: 'El Viaje de Chihiro',
        imagen: 'assets/coraline.jpg',
        descripcion: 'Una niña descubre un mundo secreto mientras intenta salvar a sus padres...',
        tags: ['2 h 5 min', '2001', '7+'],
        categorias: ['Fantasía', 'Aventura', 'Animación']
    },
    {
        titulo: 'Your Name',
        imagen: 'assets/coraline.jpg',
        descripcion: 'Dos adolescentes descubren que están misteriosamente conectados a través de sus sueños...',
        tags: ['1 h 52 min', '2016', '12+'],
        categorias: ['Drama', 'Romance', 'Animación']
    },
    {
        titulo: 'Coco',
        imagen: 'assets/coraline.jpg',
        descripcion: 'Un niño músico descubre la historia de su familia en el mundo de los muertos...',
        tags: ['1 h 49 min', '2017', '7+'],
        categorias: ['Familiar', 'Aventura', 'Animación']
    },
    {
      titulo: 'Your Name',
      imagen: 'assets/coraline.jpg',
      descripcion: 'Dos adolescentes descubren que están misteriosamente conectados a través de sus sueños...',
      tags: ['1 h 52 min', '2016', '12+'],
      categorias: ['Drama', 'Romance', 'Animación']
  },
  {
    titulo: 'Your Name',
    imagen: 'assets/coraline.jpg',
    descripcion: 'Dos adolescentes descubren que están misteriosamente conectados a través de sus sueños...',
    tags: ['1 h 52 min', '2016', '12+'],
    categorias: ['Drama', 'Romance', 'Animación']
},
{
  titulo: 'Your Name',
  imagen: 'assets/coraline.jpg',
  descripcion: 'Dos adolescentes descubren que están misteriosamente conectados a través de sus sueños...',
  tags: ['1 h 52 min', '2016', '12+'],
  categorias: ['Drama', 'Romance', 'Animación']
},
{
  titulo: 'Your Name',
  imagen: 'assets/coraline.jpg',
  descripcion: 'Dos adolescentes descubren que están misteriosamente conectados a través de sus sueños...',
  tags: ['1 h 52 min', '2016', '12+'],
  categorias: ['Drama', 'Romance', 'Animación']
},
{
  titulo: 'Your Name',
  imagen: 'assets/coraline.jpg',
  descripcion: 'Dos adolescentes descubren que están misteriosamente conectados a través de sus sueños...',
  tags: ['1 h 52 min', '2016', '12+'],
  categorias: ['Drama', 'Romance', 'Animación']
},
{
  titulo: 'Your Name',
  imagen: 'assets/coraline.jpg',
  descripcion: 'Dos adolescentes descubren que están misteriosamente conectados a través de sus sueños...',
  tags: ['1 h 52 min', '2016', '12+'],
  categorias: ['Drama', 'Romance', 'Animación']
},
];


  toggleTag(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
  }

  startExtraction() {
    this.isExtracting = true;
    this.showMessage = false;
    this.progress = 0;
    this.num_segundos = 5; // Tiempo en segundos de la simulación de extracción

    const extractionInterval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(extractionInterval);
        this.isExtracting = false;
        this.showMessage = true;
        this.num_peliculas = this.peliculas.length; // Número de películas extraídas
      } else {
        this.progress += 10;
      }
    }, 500);
  }

  updateRange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = ((+input.value - +input.min) / (+input.max - +input.min)) * 100;
    input.style.setProperty('--value', `${value}%`);
    this.minVotes = +input.value;
  }
}
