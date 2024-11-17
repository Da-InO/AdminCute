import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor() {}

  // Obtener el nombre del usuario desde localStorage
  getUsername(): string {
    const userData = JSON.parse(localStorage.getItem('user_authenticated') || '{}');
    return userData.name || 'Invitado';
  }

  // Obtener la imagen de perfil
  getProfileImage(): string {
    // Aquí puedes cambiar la lógica para obtener la imagen, por ejemplo, desde localStorage
    return 'assets/Perfil.jpg';  // Usar imagen predeterminada o cambiarla según tu lógica
  }
}
