import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    let authenticated = localStorage.getItem('user_authenticated') ? true : false
    if (authenticated) {
      this.router.navigate(['/dashboard']);
    }
  }

  @ViewChild('emailInput') nameInput: any;
  ngAfterViewInit() {
    this.nameInput.nativeElement.focus();
  }

  email: string = localStorage.getItem('email') || '';
  password: string = localStorage.getItem('password') || '';
  rememberPassword: boolean = this.email !== '' ? true : false
  emailRegex: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  showError: boolean = false;
  errorMessage!: string;

  onSubmit(): void {
    const authenticated = this.loginService.loginUser(this.email, this.password);
    if (authenticated.success) {
      if (this.rememberPassword) {
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      localStorage.setItem('user_authenticated', JSON.stringify({token: authenticated.data.token, email: this.email, name: authenticated.data.user.name}));
      // Si las credenciales son válidas, redirige al usuario a la página de dashboard.
      this.router.navigate(['/dashboard']);
    } else {
      // Si las credenciales no son válidas, muestra un mensaje de error al usuario.
      this.showError = true;
      this.errorMessage = authenticated.message;
    }
  }
}
