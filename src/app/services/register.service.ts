import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  registerUser(name: string, email: string, password: string): { data: any, message: string, success: boolean } {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar si el correo electrónico ya existe en el arreglo de usuarios
    let userExists = users.some((user: any) => user.email === email);
  
    if (userExists) {
      return { data: {}, message: "El email ya existe en la base de datos", success: false };
    } else {
      let newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      return { data: { name, email }, message: "El usuario se ha registrado correctamente", success: true };
    }
  }
  
  
}
