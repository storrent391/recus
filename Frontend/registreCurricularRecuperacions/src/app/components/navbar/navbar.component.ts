// src/app/navbar/navbar.component.ts
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showProfileMenu = false;

  constructor(private router: Router) {}

  goDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  goChangeCenter(): void {
    this.router.navigate(['/change-center']);
    this.showProfileMenu = false;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement): void {
    const inside = target.closest('.profile-container');
    if (!inside) {
      this.showProfileMenu = false;
    }
  }
}
