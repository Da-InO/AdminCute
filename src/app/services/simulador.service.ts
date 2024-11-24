import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulatorService {
  // Simula datos de usuarios
  simulateUsers(): Observable<any> {
    return of({
      users: [
        {
          id: 1,
          name: 'Carlos Daniel',
          email: 'carlos@example.com',
          phone_number: '123456789',
          birth_date: '1990-05-20',
          roles: ['Admin', 'Editor'],
          is_verified: true,
          last_login: '2024-11-20',
          is_active: true,
        },
        {
          id: 2,
          name: 'María López',
          email: 'maria@example.com',
          phone_number: '987654321',
          birth_date: '1995-08-15',
          roles: ['Viewer'],
          is_verified: false,
          last_login: '2024-11-18',
          is_active: false,
        },
      ],
      totalUsers: 2,
      totalLikes: 1500,
      totalComments: 300,
      totalShares: 120,
      avgInteractions: 567,
    });
  }

  // Simula datos de películas
  simulateMovies(): Observable<any[]> {
    return of([
      {
        id: 1,
        titulo: 'Coraline',
        imagen: 'assets/coraline.jpg',
        descripcion: 'Coraline descubre un mundo alternativo...',
        categorias: ['Drama', 'Fantasía', 'Animación'],
        vote_count: 200,
        tags: ['1 h 40 min', '2009', '13+'],
        release_date: '2009-02-05',
      },
      {
        id: 2,
        titulo: 'El Viaje de Chihiro',
        imagen: 'assets/chihiro.jpg',
        descripcion: 'Una niña se adentra en un mundo mágico...',
        categorias: ['Fantasía', 'Aventura'],
        vote_count: 150,
        tags: ['2 h 5 min', '2001', '7+'],
        release_date: '2001-07-20',
      },
      {
        id: 3,
        titulo: 'Your Name',
        imagen: 'assets/yourname.jpg',
        descripcion: 'Dos adolescentes conectados a través de sueños...',
        categorias: ['Drama', 'Romance', 'Animación'],
        vote_count: 120,
        tags: ['1 h 52 min', '2016', '12+'],
        release_date: '2016-08-26',
      },
      {
        id: 4,
        titulo: 'Coco',
        imagen: 'assets/coco.jpg',
        descripcion: 'Un niño explora el mundo de los muertos...',
        categorias: ['Familiar', 'Aventura', 'Animación'],
        vote_count: 300,
        tags: ['1 h 49 min', '2017', '7+'],
        release_date: '2017-11-22',
      },
      {
        id: 5,
        titulo: 'Interstellar',
        imagen: 'assets/interstellar.jpg',
        descripcion: 'Un grupo de astronautas explora un agujero de gusano...',
        categorias: ['Ciencia ficción', 'Drama', 'Aventura'],
        vote_count: 500,
        tags: ['2 h 49 min', '2014', '13+'],
      },
      {
        id: 6,
        titulo: 'Inception',
        imagen: 'assets/inception.jpg',
        descripcion: 'Dom Cobb, un ladrón de sueños, realiza el trabajo más difícil...',
        categorias: ['Ciencia ficción', 'Acción', 'Thriller'],
        vote_count: 450,
        tags: ['2 h 28 min', '2010', '13+'],
      },
      {
        id: 7,
        titulo: 'Parasite',
        imagen: 'assets/parasite.jpg',
        descripcion: 'Una familia pobre se infiltra en la vida de una familia rica...',
        categorias: ['Drama', 'Thriller', 'Comedia'],
        vote_count: 400,
        tags: ['2 h 12 min', '2019', '16+'],
      },
      {
        id: 8,
        titulo: 'Avengers: Endgame',
        imagen: 'assets/avengers_endgame.jpg',
        descripcion: 'Los Vengadores intentan revertir los efectos del chasquido de Thanos...',
        categorias: ['Acción', 'Aventura', 'Ciencia ficción'],
        vote_count: 600,
        tags: ['3 h 2 min', '2019', '13+'],
      },
      {
        id: 9,
        titulo: 'Joker',
        imagen: 'assets/joker.jpg',
        descripcion: 'La historia de Arthur Fleck, un comediante con problemas mentales...',
        categorias: ['Drama', 'Thriller'],
        vote_count: 550,
        tags: ['2 h 2 min', '2019', '18+'],
      },
      {
        id: 10,
        titulo: 'Spirited Away',
        imagen: 'assets/spirited_away.jpg',
        descripcion: 'Chihiro debe sobrevivir en un mundo lleno de espíritus...',
        categorias: ['Fantasía', 'Animación', 'Aventura'],
        vote_count: 700,
        tags: ['2 h 5 min', '2001', '7+'],
      },
      {
        id: 11,
        titulo: 'Toy Story',
        imagen: 'assets/toy_story.jpg',
        descripcion: 'Un grupo de juguetes cobra vida cuando los humanos no están...',
        categorias: ['Familiar', 'Animación', 'Comedia'],
        vote_count: 900,
        tags: ['1 h 21 min', '1995', '6+'],
      },
      {
        id: 12,
        titulo: 'Frozen',
        imagen: 'assets/frozen.jpg',
        descripcion: 'Anna y Elsa enfrentan aventuras mágicas en el reino de Arendelle...',
        categorias: ['Familiar', 'Fantasía', 'Musical'],
        vote_count: 850,
        tags: ['1 h 42 min', '2013', '7+'],
      },
    ]);
  }

  // Simula métricas generales
  simulateMetrics(): Observable<any> {
    return of({
      totalUsers: 2,
      totalLikes: 1500,
      totalComments: 300,
      totalShares: 120,
      avgInteractions: 567,
      totalMovies: 4,
      popularCategories: [
        { name: 'Drama', value: 10 },
        { name: 'Fantasía', value: 8 },
        { name: 'Aventura', value: 6 },
      ],
    });
  }

  // Simula datos del dashboard
  simulateDashboardData(): Observable<any> {
    return of({
      totalSurveysCompleted: 1234,
      popularCategories: [
        { name: 'Línea Familiar', value: 3124213 },
        { name: 'Línea Terror', value: 1523100 },
        { name: 'Línea Fantasía', value: 948213 },
      ],
      onlineUsers: 179,
      offlineUsers: 394,
      topMovies: [
        { title: 'Película 1', rating: 9.8 },
        { title: 'Película 2', rating: 9.5 },
        { title: 'Película 3', rating: 9.2 },
        { title: 'Película 4', rating: 8.7 },
        { title: 'Película 5', rating: 8.3 },
      ],
    });
  }
}
