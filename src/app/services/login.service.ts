import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  loginUser(email: string, password: string): { data: any, message: string, success: boolean } {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find((user: any) => user.email === email && user.password === password);
    if (user) {
      const token = 'token_example'
      console.log("user", user)
      return { data: {token, user: {name: user.name, email: user.email}}, message: 'Se inició sesión correctamente', success: true };
    } else {
      return { data: {}, message: 'Las credenciales son inválidas', success: false };
    }
  } 
}
