import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RegisterService } from '../services/register.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  constructor(private registerService: RegisterService, private router: Router) { }

  @ViewChild('nameInput') nameInput: any;
  ngAfterViewInit() {
    this.nameInput.nativeElement.focus();
  }
  name!: string;
  email!: string;
  password!: string;
  repeatPassword!: string;
  emailRegex: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  showError: boolean = false;
  errorMessage!: string;

  onSubmit(): void {
    const name = this.name;
    const email = this.email;
    const password = this.password;
    const data = this.registerService.registerUser(name, email, password);
    if (!data.success) {
      this.showError = true
      this.errorMessage = data.message
    } else {
      this.router.navigate(['/login']);
    }
  }  

}
