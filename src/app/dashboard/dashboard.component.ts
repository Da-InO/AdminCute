import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor (private router: Router) {}

  isCollapsed = false;
  isMenuOpen = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    const mainElement = document.querySelector('main');
    if (mainElement) {
      if (this.isCollapsed) {
          mainElement.classList.add('main-collapsed');
      } else {
          mainElement.classList.remove('main-collapsed');
      }
  }
  
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    localStorage.removeItem('user_authenticated');
    window.location.href = '/login';
  }

}
