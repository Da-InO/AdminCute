import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private configService: ConfigService) {}

  // Obtiene la lista de usuarios
  getUsers(): Observable<any> {
    return this.configService.getUsersData();
  }

  // Elimina un usuario (solo simula el proceso)
  deleteUser(userId: number): Observable<any> {
    return new Observable((observer) => {
      // Simula la eliminación del usuario
      setTimeout(() => {
        observer.next({ success: true });
        observer.complete();
      }, 500);
    });
  }
}
